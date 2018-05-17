/** UI
 * 
*/
ko.extensions.TemplateExtension.Komodo.UI = (function()
{
		
	function UI(_document=null)
	{
		//var Logger	= ko.extensions.Logger_v3 ? new ko.extensions.Logger_v3(this).clear(false).off(false) : require('ko/console');
		
		var $	= require('ko/dom');
		var document	= document;
		var node	= null;
		var parent	= $(document);				
		var values	= {};

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
		 * @param	string	selector	Selector of node
		 * @return	type	[QueryObject](https://docs.activestate.com/komodo/11/sdk/api/module-ko_dom-QueryObject.html)
		 */
		this.$ = function(selector)
		{
			return $(selector, document);
		};
		/** Set node element 
		 *
		 * @param	string	parent_selector
		 * @return	self 
		 */
		this.node = function(selector)
		{
			if( selector )
				node = $(selector, document);
			
			return this;
		};
		/** Get values of parent node controls
		 * @param	string	parent_selector
		 * @return	{id: value}	Object of node ids and values
		 */
		this.values = function(selector=null)
		{
			this.node(selector);
			//alert('UI.values()');
			//console.log(  document );
			values	= {};

			setValuesFormChildNodes( $(parent_selector, document).children() );
			
			return values;
		};

		/** Append new nodes to node
		 *  If children are defined, then parent node became this.node
		 *
		 * @example 
		 *		.append('checkbox', 'Checkbox 1')	// single node, attribute is label
		 *		.append('checkbox', {label: 'Checkbox 1'})	// single node with attributes		 
		 *		.append('checkbox', ['Checkbox 1', 'Checkbox 2'])	// multiple nodes
		 *		.append('checkbox', [{label: 'Checkbox 1'}, {label: 'Checkbox 2'}])	// multiple nodes with attributes
		 *
		 *		.append('groupbox')	// append node without attributes
		 *		.append('groupbox', {id: 'gp_id'})	// parent node with attributes
		 *		.append('groupbox', null, ['checkbox', ['Checkbox 1', 'Checkbox 2']] )	// parent node with children
		 *		.append('groupbox', {id: 'gp_id'}, ['checkbox', ['Checkbox 1', 'Checkbox 2']] )	// parent node with attributes and children
		 *
		 * @param	string	type	Type of node to append
		 * @param	null|string|object|[object] 	[attributes]	Attributes for controls, define array of strings or array of objects for adding multiple nodes* 
		 * @param	[type, attributes]	children	Array of these parameters for repeating append() function
		 *
		 * @return	self 
		 */
		this.append = function(type, attributes=null, children=null)
		{
			console.log( 'UI.append()' );
			var node_new	= null;
			/** Sanitize attributes
			 */
			var sanitizeAttributes = (function()
			{
				if( ! attributes )
					attributes = {};
				
				if( ! Array.isArray(attributes) )
					attributes = [attributes];				
			})(); 
			
			for(let a=0; a<attributes.length;a++)
				node_new = addControlToParent(type, typeof attributes[a] !== 'undefined' ? attributes[a] : null );
			
			if( children )
				this.node(node_new).append(children[0], children[1], children[2]);
			
			return this;
		};
		/** Remove child element
		 * @param	string	selector	Selector of node
		 * @return	self
		 */
		this.empty = function(selector=null)
		{
			console.log( 'UI.append()' );
			this.node(selector);

			node.empty();
			
			return this;
		};
		
		/*---------------------------------------
			PRIVATE
		-----------------------------------------
		*/
		/** Add controls to parent element
		 * Adding has smart features E.G.: auto adding of id
		 */
		var addControlToParent = function(type, attributes)
		{
			console.log( 'UI.addControlToParent()' );

			var node_new	= new ko.extensions.TemplateExtension.Komodo.Node()
													 .type(type)													 
												 	 .attributes(attributes)
													 .get();
			node.append( node_new );
			
			return node_new;
		};
		/** Get values form child nodes
		 * @param	array	child_nodes	Element list of child nodes
		 */
		var setValuesFormChildNodes = function(child_nodes)
		{
			//console.log( child_nodes );
			//Logger.info(child_nodes, 'UI: '+'child_nodes'); 
			
			child_nodes.each(function()
			{
				if( ! Object.keys(this.childNodes).length ){
					if( this.id )
						values[this.id] = this.nodeName == 'checkbox' ? this.checked : this.value;					
				}else
					setValuesFormChildNodes( $(this.childNodes) );
			});
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