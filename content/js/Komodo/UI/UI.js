/** UI
* Manage extension`s ui elements
*
*/
ko.extensions.TemplateExtension.Komodo.UI = (function()
{
		
	function UI()
	{
		//var Logger	= ko.extensions.Logger_v3 ? new ko.extensions.Logger_v3(this).clear(false).off(false) : require('ko/console');
		var self	= this;
		var $	= require('ko/dom');
		var document	= document;		

		/*---------------------------------------
			SETUP
		-----------------------------------------
		*/
		/** Set document where UI is operating, pane or preferences window
		 *
		 * @param	string	_document
		 * @return	self 
		 */
		this.document = function(_document)
		{
			document = _document;
			return this;
		};

		/** Query selector in document
		 * 
		 * @param	string	selector	Selector of node
		 * @param	string	selector	Selector of parent, if null, then current document is used
		 * 
		 * @return	type	[QueryObject](https://docs.activestate.com/komodo/11/sdk/api/module-ko_dom-QueryObject.html)
		 */
		this.$ = function(selector, parent=null)
		{
			//if( ! selector.match(/^[#\.]/) )
			//	selector = '#' +selector;
			parent = parent ? this.$(parent).element() : document;

			return $(selector, parent);
		};
		/** Exists
		 */
		this.exists = function(selector, parent=null)
		{
			return typeof this.$(selector, parent).element()!=='undefined'; 
		}; 
		/** Create dom element or array of elements
		 * 
		 * @example 
		 *		.create('checkbox', 'Checkbox 1')	// single node, attribute is label
		 *		.create('checkbox', {label: 'Checkbox 1'})	// single node with attributes		 
		 *		.create('checkbox', ['Checkbox 1', 'Checkbox 2'])	// multiple nodes
		 *		.create('checkbox', [{label: 'Checkbox 1'}, {label: 'Checkbox 2'}])	// multiple nodes with attributes
		 *
		 *		.create('groupbox')	// node without attributes
		 *		.create('groupbox', {id: 'gp_id'})	// node with attributes
		 *		.create('groupbox', null, ['checkbox', ['Checkbox 1', 'Checkbox 2']] )	// node with children
		 *		.create('groupbox', {id: 'gp_id'}, ['checkbox', ['Checkbox 1', 'Checkbox 2']] )	// node with attributes and children
		 *
		 * @param	string	type	Type of node to append
		 * @param	null|string|object|[object] 	[attributes]	Attributes for controls, define array of strings or array of objects for adding multiple nodes 
		 * @param	[type, attributes]	children	Array of attributes [type, attributes, create] for nested loop of create() function
		 * 
		 * @return element|[elements] created node or array of created nodes
		 */
		this.create = function(type, attributes=null, children=null)
		{
			//console.log('---------------'); 
			/** Sanitize attributes
			 */
			attributes = (function()
			{
				return ! attributes ? [{}] : ( ! Array.isArray(attributes) ? [attributes] : attributes );				
			})();

			var created_nodes = attributes.map(function(node_attributes)
			{
				//console.log(  'created_nodes: ' + type +' '+node_attributes.id );
				return new ko.extensions.TemplateExtension.Komodo.Node()
											 .type(type)													 
											 .attributes(node_attributes)
				 							 .get();
			});

			/** Last node
			 */
			var lastNode = created_nodes[created_nodes.length-1];
			
			if( children )
				lastNode.appendChild ( this.create(children[0], children[1], children[2]) );
			
			return created_nodes.length > 1 ? created_nodes : lastNode ;
		};
		/** Delete Node
		 */
		this.delete = function(selector_or_element, parent=null)
		{
			var element	= typeof selector_or_element === 'string' ? this.$(selector_or_element, parent) : selector_or_element;
			element.parentNode.removeChild(element);
		}; 
		/** Get element value
		 */
		this.value = function(selector_or_element)
		{
			var element	= typeof selector_or_element === 'string' ? this.$(selector_or_element) : selector_or_element;
			
			/** Test if getting only preferences,
			* 		if so, then if control has not attribute prefs="false"
			*/
			var preference_test = only_prefs===false || element.getAttribute('prefs')!=='false';
			
			/** I control type node
			*/
			var is_control_node = ['checkbox','textbox','radio'].indexOf( element.nodeName ) > -1;
			
			//if( element.id && is_control_node && preference_test )
			if( element.id && is_control_node )
				return element.nodeName == 'checkbox' ? element.checked : element.value;
			
			return null;
		}; 
		/** Get values of parent node controls
		 * @param	string	param1
		 * @param	mixed	param2	if not false, then take only nodes without attribute prefs="false"
		 * @return	{id: value}	Object of node ids and values
		 *
		 * @example values()	// get all values from docuent
		 * @example values('#element')	// get all values from element
		 * @example values('only-prefs')	// get prefs values from docuent
		 * @example values('#element', 'only-prefs')	// get prefs values from element
		 * 
		 * @example values('#control', 'value to set')	// set value to control
		 * @example values({'#control': 'value to set'})	// mass set values by object
		 * 
		 */
		this.values = function(param1, param2=false)
		{
			//console.log(  'UI.values(): ' + param1 );
			console.log( document.childNodes );

			return getValues(param1, param2);
		};

		/** Append new children to node
		 *
		 * @param	node|string 	parent	Node element or selector of parent to append children
		 * @param	element|array	elements	Element to append
		 * 
		 * @return	self 
		 */
		this.append = function( parent_selector, elements )
		{
			//console.log( 'UI.append()' );
			//console.log( elements );
			parent = this.$(parent_selector);
			
			/** Parent id exists
			 *  it should EXISTS
			 */
			var parentIdExists = function()
			{
				if( self.exists(parent_selector) )
					return true;
				
				alert( 'UI.append()\n\nPARENT ELEMENT DOES NOT EXISTS: '+parent_selector );
				return false;
			}; 
			
			///** Id not exists
			// *  it should NOT EXISTS
			// */
			//var childIdExists = function(id)
			//{
			//	console.log('childIdExists: '+id); 
			//	//if( ! id || ! self.exists('#'+id, parent) )
			//	if( ! self.exists('#'+id) )			
			//		return false;
			//	
			//	//alert( 'UI.append()\n\nCHILD ID ALREADY EXISTS: #'+id );
			//	alert( 'UI.append()\n\nChild in parent alerady exists\n\nPARENT: '+parent_selector+'\nCHILD:    #'+id );				
			//	return true;
			//};
			
			if( ! parentIdExists() )
				return;
			 
			if( ! Array.isArray(elements) )
				elements = [elements];	
			
			for(let e=0; e<elements.length;e++)
				parent.element().appendChild( elements[e] );				
			
			return this;
		};
		
		/** Remove child element
		 * @param	string	selector	Selector of node
		 * @return	self
		 */
		this.empty = function(selector, parent=null)
		{
			this.$(selector, parent).empty();
			
			return this;
		};
		/*---------------------------------------
			PREFSET DOM
		-----------------------------------------
		*/
		/** Create prefset dom with menu and toggable containers with controls.
		 * If exist, then prefset will be refreshed
		 *
		 * @param	string	prefset_selector	Id of dom wrapper where menu abd all containers are inserted
		 * @param	object	perfset_template	Representation of container xul structure
		 * @param	object	perfset_values	Data for pref set`s controls
		 *
		 * @example
		 *		perfset_template = {
		 *			pref_set_test:{ 'Prefset Caption': ['checkbox', 'checkbox'] }
		 * 		}
		 * 
		 * 		perfset_values = {
		 *			'conteiner-A':{
		 * 				'Control 1': true,
		 * 				'Control 2': false,
		 * 			}
		 * 		}
		 * 
		 */
		this.createPrefSet = function(prefset_selector, perfset_template, perfset_values)
		{
			var prefset_caption	= Object.keys(perfset_template).pop();						
			var control_types	= perfset_template[prefset_caption];
			var containers_ids	= Object.keys(perfset_values);		
			var container_class_shown	= prefset_selector+'-shown'; 

			/** Add prefset attribute prefsaet="true"
			 * For identification for get\set values
			 */
			var addPrefsetAttribute = (function()
			{
				self.$( prefset_selector ).element().setAttribute('prefset', true);
			})();
			/** Add caption
			 */
 			var addCaption = (function()
			{
				self.$( prefset_selector +' > caption').delete(); // delete menu if exists
				
				self.append( prefset_selector, self.create('caption', prefset_caption ) );
			})();
			
			/** Ad Menu
			 */
 			var addMenu = (function()
			{
				self.$( prefset_selector +' menulist').delete(); // delete menu if exists
				
				self.append( prefset_selector, self.create('menulist', null, ['menupopup']) );
			})();

			/** Create perfset_template
			 *
			 * @param	object	controls_data	Container-id: {control id-label: value}
			 */
			var createContainer = function(container_index, container_label, controls_data)
			{
				var controls_labels	= Object.keys(controls_data);
				//console.log(  'PREFSET_SELECTOR: ' + prefset_selector );
				/** container
				 */
				var container = (function()
				{
					var display	= container_index===0 ? 'block'	: 'none';
					var container	= self.create( 'groupbox', {
											'label': container_label,	// sanitized label become id attribute, label is for save and restore element from prefs
											'class': 'prefset-container',	// class 'prefset-container' is for identification of container in prefset DOM
											//'style': 'display:' + display
									 });
					
					self.$( '#'+container.getAttribute('id') ).delete(); // delete container if exists
					
					self.append( prefset_selector, container);
						
					return container;
				})(); 
				
				/** addMenuItem
				 */
				var addMenuItem = (function()
				{
					var toggle_containers =
					[
						"var container_class_shown='"+container_class_shown+"'",
						"var element_hide=document.getElementsByClassName(container_class_shown)[0]",
						"var element_show=document.getElementById('"+container.getAttribute('id')+"')",
						
						"if(element_hide==element_show)return", // return if clicked same element
						
						"element_show.classList.add(container_class_shown)", // show new container
						"element_show.style.display = 'block'",
				
						"element_hide.classList.remove(container_class_shown)", // hide old element
						"element_hide.style.display = 'none'",
					];
					
					var menu_item	= self.create('menuitem', { 'id': container_label+'item', 'label': container_label, 'oncommand': toggle_containers.join(';')} );
				
					self.append( prefset_selector + ' menupopup', menu_item );
				})(); 
				  
				/** Append control to container
				 */
				var appendControlToContainer = function(index)
				{
					var control_type	= control_types[index];
					var control_data	= {'label': controls_labels[index], 'value':controls_data[controls_labels[index]] };
					var control	= self.create(control_type, control_data);
					//console.log('control');
					//console.log( control );
					/** Add label if not checkbox 
					 */
					var label = (function()
					{
						if( control_type==='checkbox' )
							return;
						
						var hbox_label = self.create( 'hbox', null,[ 'label', {'value': controls_labels[index], 'control': control.getAttribute('id')} ] );
									 
						self.append( '#'+container.getAttribute('id'), hbox_label );
						
						return hbox_label;
					})(); 
					
					var parent	= label ? label : self.$('#'+container.getAttribute('id'));
					
					self.$(parent).append( control );
					
					self.append( '#'+container.getAttribute('id'), control );					
				}; 
				
				for(let c=0; c<controls_labels.length;c++)
					appendControlToContainer(c);
			};
			
			for(let i=0; i<containers_ids.length;i++)
				createContainer(i, containers_ids[i], perfset_values[containers_ids[i]] );
			
			/* SELECT MENU ITEM */
			/** Select container
			 */
			var selectContainer = (function()
			{
				self.$( prefset_selector + ' menulist' ).element().selectedIndex = 1;
				/* Hide containers  */
				self.$(prefset_selector +' .prefset-container').each(function(index)
				{
					//console.log( this.getAttribute('id') + ' '+index );
					if( index>0 )
						this.setAttribute('style', this.getAttribute('id') +';display:none;');
					else
						this.classList.add( container_class_shown );
					
					//console.log( self.values( '#' + this.getAttribute('id') ) );					
				});
			})(); 
			
			console.log( self.$( prefset_selector ).element().outerHTML ); // DEBUG: get element as plain text
		};
		/** Create dropdown element
		 * @param	string	id	Id of dropdown element
		 * @param	object	items	Items for dropdown 
		 * @param	string	[menu_text]	Text in dropdown menu button, if null then current item is shown
		 *
		 * @return	[element](https://developer.mozilla.org/en-US/docs/Web/API/Element)
		 *
		 * @example dropdown('#dropdown_test',	{'Item A':'alert("A")','Item B':'alert("B")'})
		 * @example dropdown('#dropdown_text_test',	{'Item A':{tooltip: 'Item A'},'Item B':{style: 'border:green;'}}, 'Attributes & label')
		 *
		 */
		this.dropdown = function(id, items, menu_text=null)
		{
			var menulist	= menu_text ? self.create('button', {label: menu_text, type: "menu", id: sanitizeId(id) }) : self.create('menulist', {id: sanitizeId(id)});
			var menupopup	= self.create('menupopup');

			/** Get item simple
			 */
			var getItemSimple = function(label, _attributes)
			{
				var attributes = {label: label};
				
				if( typeof _attributes === 'object' ){
					for(var attr in _attributes)
						if (_attributes.hasOwnProperty(attr))
							attributes[attr] = _attributes[attr];
							//var value = _attributes[attr];
				}else
					attributes.oncommand = _attributes;
				
				return self.create('menuitem', attributes );
			}; 
			
			for(var label in items)
				if (items.hasOwnProperty(label))
					menupopup.appendChild( getItemSimple(label, items[label]) );
					
			menulist.appendChild( menupopup );
			
			//console.log( menulist.outerHTML ); // DEBUG: get element as plain text

			return  menulist;
		}; 
		
		/*---------------------------------------
			PRIVATE
		-----------------------------------------
		*/
		/** Get values from controls
		 */
		var getValues = function(selector, only_prefs=false)
		{
			console.log(  'getValues(): ' + selector );
			var values	= {};

			/** Set to value to values object
			 */
			var setToValues = function(id, value)
			{
				if( value!==null )
					values[id] = value;
			};
			
			///** Get element value
			// */
			//var value = function(element)
			//{
			//	/** Test if getting only preferences,
			//	* 		if so, then if control has not attribute prefs="false"
			//	*/
			//	var preference_test = only_prefs===false || element.getAttribute('prefs')!=='false';
			//	
			//	/** I control type node
			//	*/
			//	var is_control_node = ['checkbox','textbox','radio'].indexOf( element.nodeName ) > -1;
			//	
			//	//if( element.id && is_control_node && preference_test )
			//	if( element.id && is_control_node )
			//		return element.nodeName == 'checkbox' ? element.checked : element.value;
			//	
			//	return null;
			//}; 

			/** Get prefset values
			 */
			var getPrefsetValues = function(prefset_id)
			{
				var prefset_values	= {};

				/** Loop containers
				 */
				var loopContainers = function()
				{
					/** Get elements values
					 */
					var getElementsValues = function(container)
					{
						var prefset_values	= {};

						$(container).children().each(function()
						{
							var value = this.value( self );
							if( value!==null )
								prefset_values[self.id] = value;
						});
						return prefset_values;
					}; 
					
					self.$('#'+prefset_id +' .prefset-container').each(function()
					{	
						prefset_values[self.getAttribute('label')] = getElementsValues(self);
						
					});
				}; 
				loopContainers();

				return prefset_values;
			};
			
			/** Get values form child nodes
			 * @param	array	child_nodes	Element list of child nodes
			 */
			var loopNestedElements = function(child_nodes)
			{
				child_nodes.each(function()
				{
					var id	= this.getAttribute('id');
					
					if( ! Object.keys(this.childNodes).length )
						setToValues( id, this.value(this) );
								
					else if( this.hasAttribute('prefset') )
						setToValues( id, getPrefsetValues(id) );
		
					else
						loopNestedElements( $(this.childNodes) );
				});
			}; 

			loopNestedElements( self.$(selector).children() );
			
			return values;
		};

		/** Get sanitized id
		 */
		var sanitizeId = function(id)
		{
			return id.replace(/[^a-z0-9\s-_]/gi, '').replace(/\s+/gi, '_').trim().toLowerCase();
		};
	
	}
	return UI;

})();