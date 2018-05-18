/** Node
*/
ko.extensions.TemplateExtension.Komodo.Node = (function()
{
		
	function Node()
	{
		var $	= require('ko/dom');
		var type	= '';
		var node	= null;		
		
		/** Set type of node
		 * @param	string	_type	Type of node
		 * @return	self
		 */
		this.type = function(_type)
		{
			type = _type;
			
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
					setAttribute( attribute, attributes[attribute] );
		
			setDefaultId();

			return this;  
		};
		/** Set attribute
		 */
		var setAttribute = function(attribute, value)
		{
			if( type=='checkbox' && attribute=='value' )
				attribute = 'checked';
			
			
			node.setAttribute( attribute, value );

		}; 
		/** Set default Id by sanitized label if not id defined
		 */
		var setDefaultId = function()
		{
			/** Get Label
			 */
			var sanitizeId = function(id)
			{
				return id.replace(/[^a-z0-9]/gi, '').replace(/\s+/gi, ' ').replace(/[\s-]+/gi, '_').trim().toLowerCase();
			};

			var id	= node.hasAttribute('id') ?  node.getAttribute('id') :  node.getAttribute('label');
			
			node.setAttribute( 'id', sanitizeId(id) );
		}; 
		
		/** get
		 */
		this.get = function()
		{
			//console.log( node );
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