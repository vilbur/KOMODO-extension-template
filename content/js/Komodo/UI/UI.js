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
		/** Set parent element e.g.: for adding of nodes
		 *
		 * @param	string	selector
		 * @return	self 
		 */
		this.parent = function(selector=null)
		{
			alert( 'UI.parent() DEPRECATED use .node()' );
			//parent = $(parent_selector, document);
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

		/** Append nodes to  node
		 */
		this.append = function(type, attributes)
		{
			console.log( 'UI.append()' );
			
			if( ! Array.isArray(attributes) )
				attributes = [attributes];
			
			for(let a=0; a<attributes.length;a++)
				addControlToParent(type, attributes[a]);

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
		
		/** Test
		 */
		this.toggleCheckbox = function(id)
		{ 
			var checkbox 	= window.getElementById(id);	
			checkbox.checked = ! checkbox.checked ;
		};
		/** Test
		 */
		this.test = function() {
			alert('UI.test()');
		};
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

	}
	return UI;

})();