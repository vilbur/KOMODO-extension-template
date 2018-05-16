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
		 
		/** QUery selector in document
		 */
		this.$ = function(selector)
		{
			return $(selector, document);
		};
		/** Set parent element e.g.: fori adding of controls
		 *
		 * @param	string	parent_selector
		 * @return	self 
		 */
		this.parent = function(parent_selector)
		{
			parent = $(parent_selector, document);
			return this;
		};
		
		/** Get values of uI in parent node
		 * @return	{id: value}	Object of control`s ids and values
		 */
		this.values = function()
		{
			values	= {};
			
			setValuesFormChildNodes(parent.children());
			
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
		
		/** Test
		 */
		this.test = function(string='node') {
			alert('UI.test("'+string+'")');
		};
		
		/** addControl
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
			for(let i=0; i<child_nodes.length;i++)
			{				
				if( ['textbox', 'checkbox'].indexOf( child_nodes[i].nodeName ) > -1 )
					values[child_nodes[i].id] = child_nodes[i].nodeName == 'checkbox' ? child_nodes[i].checked : child_nodes[i].value;
				
				else if( child_nodes[i].childNodes )
					setValuesFormChildNodes(child_nodes[i].childNodes);
			}
		}; 

	}
	return UI;

})();