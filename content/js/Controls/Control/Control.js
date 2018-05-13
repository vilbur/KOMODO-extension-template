/** Control
*/
ko.extensions.TemplateExtension.Control = (function()
{
		
	function Control()
	{

		
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
		/** setAttributes
		 *
		 * @return	self
		 */
		this.attributes = function(attributes)
		{
			for(var attribute in attributes)
				if (attributes.hasOwnProperty(attribute))
					node.setAttribute( attribute,attributes[attribute] );
					
			return this; 
		};
		/** get
		 */
		this.get = function()
		{
			return node;
		}; 
		
	}
	return Control;

})();