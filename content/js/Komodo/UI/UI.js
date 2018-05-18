/** UI
 * 
*/
ko.extensions.TemplateExtension.Komodo.UI = (function()
{
		
	function UI(_document=null)
	{
		//var Logger	= ko.extensions.Logger_v3 ? new ko.extensions.Logger_v3(this).clear(false).off(false) : require('ko/console');
		var self	= this;
		var $	= require('ko/dom');
		var document	= document;		

		/*---------------------------------------
			SETUP
		-----------------------------------------
		*/
		/** Set document
		 *
		 * @param	string	document
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
		 * @param	null|string|object|[object] 	[attributes]	Attributes for controls, define array of strings or array of objects for adding multiple nodes* 
		 * @param	[type, attributes]	children	Array of these parameters for repeating append() function
		 * 
		 * @return array created nodes
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
			
			return created_nodes;
		}; 
		/** Get values of parent node controls
		 * @param	string	parent_selector
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
		
		/** Vreate prefset dom
		 *
		 * @param	string	prefset_id	Id of dom container where all containers are inserted
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
		this.createPrefSet = function(prefset_id, perfset_template, perfset_values)
		{
			var container_type = Object.keys(perfset_template).pop();
			var control_types	= perfset_template[container_type];
			//var prefset_node	= this.node('#'+prefset_id);
			
			//////var prefset_menu	= this.$('menupopup', '#'+prefset_id);
			//////var prefset_menu	= this.$('menupopup', '#'+prefset_id);
			
			///** prefset_menu
			// */
			//var prefset_menu = (function()
			//{
			//	self.node(prefset_id).append('menulist',null, ['menupopup'] );
			//
			//	return self.$('menupopup', prefset_id);
			//})(); 

			//console.log('UI.createPrefSet: ' +prefset_id);
			//console.log( perfset_template );
			//console.log( perfset_values );
			//console.log( 'prefset_menu' );
			//console.log( prefset_menu );			
			
			/** Create perfset_template
			 *
			 * @param	object	controls_data	Container-id: {control id-label: value}
			 */
			var createContainer = function(container_id, controls_data)
			{
				//console.log('UI.createContainer: ' +container_id);
				//console.log( 'menuitem' );
				//console.log( this.create('menuitem', container_id ) );				
				
				//prefset_menu.append( self.create('menuitem', container_id ) );
				
				var controls_labels	= Object.keys(controls_data);
				self.node(prefset_id).append(container_type);
				
				for(let c=0; c<controls_labels.length;c++)
					self.node(prefset_id).append(control_types[c], {'label': controls_labels[c], 'checked':controls_data[controls_labels[c]] });

			};
			
			//var prefset_node	= this.node(prefset_id);
			var containers_ids	= Object.keys(perfset_values);		
			//console.log( containers_ids );
			for(let i=0; i<containers_ids.length;i++)
				createContainer( containers_ids[i], perfset_values[containers_ids[i]] );
		};
	
		/** Test
		 */
		this.test = function()
		{
			alert('UI.test()');
		};
		
	}
	return UI;

})();