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
			//console.log( 'UI.create()' );
			/** Sanitize attributes
			 */
			attributes = (function()
			{
				return ! attributes ? [{}] : ( ! Array.isArray(attributes) ? [attributes] : attributes );				
			})();

			var created_nodes = attributes.map(function(node_attributes)
			{
				return new ko.extensions.TemplateExtension.Komodo.Node()
											 .type(type)													 
											 .attributes(node_attributes)
				 							 .get();
			});
			//console.log( created_nodes );
			/** Last node
			 */
			var lastNode = created_nodes[created_nodes.length-1];
			
			if( children )
				this.append( lastNode, this.create(children[0], children[1], children[2]) );
			
			return created_nodes.length > 1 ? created_nodes : created_nodes.pop() ;
		}; 

		/** Get values of parent node controls
		 * @param	string	selector
		 * @param	mixed	only_prefs	if not false, then take only nodes without attribute prefs="false"
		 * @return	{id: value}	Object of node ids and values
		 */
		this.values = function(selector, only_prefs=false)
		{
			var values	= {};

			/** Get values form child nodes
			 * @param	array	child_nodes	Element list of child nodes
			 */
			var setValuesFormChildNodes = function(child_nodes)
			{
				/** Test if getting only preferences,
				 * 		if so, then if control has not attribute prefs="false"
				 */
				var preference = function(element)
				{
					return only_prefs===false || element.getAttribute('prefs')!=='false';
				}; 
				
				child_nodes.each(function()
				{
					if( ! Object.keys(this.childNodes).length ){
						//console.log(  this.id +':'+ preference(this) );
						if( this.id && preference(this) )
							values[this.id] = this.nodeName == 'checkbox' ? this.checked : this.value;
							
					}else
						setValuesFormChildNodes( $(this.childNodes) );
				});
			}; 

			setValuesFormChildNodes( this.$(selector).children() );
			
			return values;
		};

		/** Append new children to node
		 *
		 * @param	node|string 	parent	Node element or selector of parent to append children
		 * @param	element|array	elements	Element to append
		 * 
		 * @return	self 
		 */
		this.append = function( parent, elements )
		{
			//console.log( 'UI.append()' );
			//console.log( elements );
			parent = this.$(parent);
			
			if( ! Array.isArray(elements) )
				elements = [elements];	
			
			for(let e=0; e<elements.length;e++)
				parent.append( elements[e] );

			return this;
		};
		
		/** Remove child element
		 * @param	string	selector	Selector of node
		 * @return	self
		 */
		this.empty = function(selector=null)
		{
			this.$(selector, parent).empty();
			
			return this;
		};
		
		/** Create prefset dom with menu and toggable containers with controls
		 *
		 * @param	string	prefset_selector	Id of dom wrapper where menu abd all containers are inserted
		 * @param	object	perfset_template	Representation of container xul structure
		 * @param	object	perfset_values	Data for pref set`s controls
		 *
		 * @example
		 *		perfset_template = {
		 *			pref_set_test:{ groupbox: ['checkbox', 'checkbox'] }
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
			var container_type	= Object.keys(perfset_template).pop();			
			var control_types	= perfset_template[container_type];
			var containers_ids	= Object.keys(perfset_values);		
			console.log(  'prefset_selector: ' + prefset_selector );
			/** prefset_menu
			 */
			var addMenu = (function()
			{
				self.append( prefset_selector, self.create('menulist', null, ['menupopup']) );
			})(); 

			/** Create perfset_template
			 *
			 * @param	object	controls_data	Container-id: {control id-label: value}
			 */
			var createContainer = function(container_index, container_label, controls_data)
			{
				var class_shown	= prefset_selector+'-shown';
				var controls_labels	= Object.keys(controls_data);
				
				/** container
				 */
				var container = (function()
				{
					var _class	= container_index===0 ? class_shown 	: '';
					var display	= container_index===0 ? 'block'	: 'none';
					var element	= self.create(container_type, { 'label': container_label, 'class':class_shown , 'style':'display:'+display});
					//var element	= self.create(container_type, { id:container_label.replace(/[\s-]/gi, '_').toLowerCase(), label: container_label, class:class_shown , style:'display:'+display });					
					
					self.append( prefset_selector, element);
					return element;
				})(); 
				
				/** addMenuItem
				 */
				var addMenuItem = (function()
				{
					var toggle_containers =
					[
						"var class_shown='"+class_shown+"'",
						"var element_hide=document.getElementsByClassName(class_shown)[0]",
						"var element_show=document.getElementById('"+container.getAttribute('id')+"')",
						
						"if(element_hide==element_show)return", // return if clicked same element
						
						"element_show.classList.add(class_shown)", // show new container
						"element_show.style.display = 'block'",

						"element_hide.classList.remove(class_shown)", // hide old element
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
					
					//self.append( '#'+container.getAttribute('id'), control );					
				}; 
				
				for(let c=0; c<controls_labels.length;c++)
					appendControlToContainer(c);
			};
			
			console.log( containers_ids );
			for(let i=0; i<containers_ids.length;i++)
				createContainer(i, containers_ids[i], perfset_values[containers_ids[i]] );
				
			self.$( prefset_selector + ' menulist' ).element().selectedIndex = 0;

		};
	
		/** Test
		 */
		this.test = function(string='')
		{
			alert('UI.test('+string+')');
		};
		
	}
	return UI;

})();