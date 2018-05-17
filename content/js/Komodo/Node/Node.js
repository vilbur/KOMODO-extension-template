/** Node
*/
ko.extensions.TemplateExtension.Komodo.Node = (function()
{
		
	function Node()
	{
		var $	= require('ko/dom');
		var node	= null;
		
		/** Set type of node
		 * @param	string	type	Type of node
		 * @return	self
		 */
		this.type = function(type)
		{
			node = document.createElement(type);						

			return this;
		}; 
		/** Set attributes of node
		 * @param	object|string	attributes	Object of attributes for element, STRING is treated as label
		 *
		 * @return	self 
		 */
		this.attributes = function(attributes)
		{
			if( ! attributes )
				return this; 
			
			if( typeof attributes === 'string' )
				attributes = {label: attributes};	
			
			for(var attribute in attributes)
				if (attributes.hasOwnProperty(attribute))
					node.setAttribute( attribute, attributes[attribute] );
		
			setDefaultId();

			return this;  
		};
		/** Set default Id by sanitized label if not id defined
		 */
		var setDefaultId = function()
		{
			/** Get Label
			 */
			var getLabel = function()
			{
				return node.getAttribute('label').replace(/[\s-]/gi, '_').toLowerCase();
			};
			
			if( ! node.hasAttribute('id') )
				node.setAttribute( 'id', getLabel() );
		}; 
		
		
		/** get
		 */
		this.get = function()
		{
			console.log( node );
			return node;
		}; 
		/** test
		 */ 
		this.test = function()
		{
			alert( 'TemplateExtension.Node.test()' ); 
		}; 
	}
	return Node;

})();