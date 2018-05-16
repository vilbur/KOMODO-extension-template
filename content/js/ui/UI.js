if( typeof ko.extensions.TemplateExtension === 'undefined'  )
	ko.extensions.TemplateExtension = {};
	
/** UI
 * 
*/
ko.extensions.TemplateExtension.UI = (function()
{
		
	function UI(_document=null)
	{
		var Logger	= ko.extensions.Logger_v3 ? new ko.extensions.Logger_v3(this).clear(false).off(false) : require('ko/console');
		
		var $	= require('ko/dom');
		var document	= _document ? _document : document;
		var parent	= $(document);		
		var prefix	= 'te';
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
		/** Set parent element e.g.: for adding of nodes
		 *
		 * @param	string	parent_selector
		 * @return	self 
		 */
		this.parent = function(parent_selector)
		{
			parent = $(parent_selector, document);
			return this;
		};
		/** Set prefix for uI id`s
		 *
		 * @param	string	prefix
		 * @return	self 
		 */
		this.prefix = function(_prefix='')
		{
			prefix = _prefix;
			return this;
		};
		
		/** Get values of parent node controls
		 * @param	string	parent_selector
		 * @return	{id: value}	Object of node ids and values
		 */
		this.values = function(parent_selector)
		{
			values	= {};

			setValuesFormChildNodes( $(parent_selector, document).children() );
			
			return values;
		};
		/** Test
		 */
		this.toggleCheckbox = function(id)
		{ 
			var checkbox 	= window.getElementById(id);	
			checkbox.checked = ! checkbox.checked ;
		};
		/** add uI to parent node
		 */
		this.append = function(type, attributes)
		{
			console.log( 'UI.append()' );
			
			if( ! Array.isArray(attributes) )
				attributes = [attributes];
			
			for(let a=0; a<attributes.length;a++)
				addControlToParent(type, attributes[a]);

		};
		/** Test
		 */
		this.test = function(string='node') {
			alert('UI.test("'+string+'")');
		};
		/** Add controls to parent element
		 * Adding has smart features E.G.: auto adding of id
		 */
		var addControlToParent = function(type, attributes)
		{
			console.log( 'UI.addControlToParent()' );

			var node	= new ko.extensions.TemplateExtension.Node()
													 .prefix(prefix)
													 .type(type)													 
												 	 .attributes(attributes)
													 .get();

			parent.append( node );
		};
		/** Get values form child nodes
		 * @param	array	child_nodes	Element list of child nodes
		 */
		var setValuesFormChildNodes = function(child_nodes)
		{
			//console.log( child_nodes._elements );
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