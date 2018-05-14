if( typeof ko.extensions.TemplateExtension === 'undefined'  )
	ko.extensions.TemplateExtension = {};
	
/** UI
*/
ko.extensions.TemplateExtension.UI = (function()
{
		
	function UI(_parent_selector=null)
	{
		var Logger	= ko.extensions.Logger_v3 ? new ko.extensions.Logger_v3(this).clear(false).off(false) : require('ko/console');
		
		//var parent_node	= typeof _parent_node === 'string' ? document.getElementById(_parent_node) : _parent_node;
		var $	= require('ko/dom');
		var parent_selector	= _parent_selector;
		var prefix	= 'te';
		var values	= {};

		/** Get values of uI in parent node
		 * @return	{id: value}	Object of control`s ids and values
		 */
		this.getUIValues = function()
		{
			values	= {};
			
			setValuesFormChildNodes(parent_node.childNodes);
			
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
		this.add = function(type, attributes)
		{
			console.log( this.constructor.parent );
			
			if( ! Array.isArray(attributes) )
				attributes = [attributes];
			
			for(let a=0; a<attributes.length;a++)
				addControlToParent(type, attributes[a]);
		};
		/** remove
		 */
		this.remove = function(node)
		{

		}; 
		/** Remove all child nodes from parent_node
		 */
		this.empty = function()
		{
			//alert( 'empty()' );  
			//$(parent_selector).empty();
			require('ko/dom')(parent_selector, document).empty();			
			//require("ko/dom")('#switch_uI').empty();
			//console.log( '*/UI.empty()' );
			//var elementList = parent_node.childNodes;
			//
			//for(let i=elementList.length-1; i>-1;i--)
			//	parent_node.removeChild(elementList[i]);
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
			alert('ko.extensions.TemplateExtension.UI("'+string+'")');
		};
		
		/** addControl
		 */
		var addControlToParent = function(type, attributes)
		{
			var control	= new ko.extensions.TemplateExtension.Control()
													 .prefix(prefix)
													 .type(type)													 
												 	 .attributes(attributes)
													 .get();
			Logger.info(control, 'UI: '+'control'); 
			parent_node.appendChild(control);
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