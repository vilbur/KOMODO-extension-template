/** Dropdown
*
*/
ko.extensions.TemplateExtension.Komodo.Controls.Dropdown = (function()
{
	function Dropdown()
	{
		var self	= this;
		var $	= require('ko/dom');
		var document	= document;		
		var dropdown; // main element
		//var controlset_element;
		/** Set document where Dropdown is operating, pane or preferences window
		 *
		 * @param	string	_document
		 * @return	self 
		 */
		this.document = function(_document)
		{
			document = _document;
			return this;
		};
		/** Set controlset_element
		 *
		 * @param	string	controlset_element
		 * @return	self 
		 */
		this.element = function(dropdown_selector)
		{
			dropdown = self.$( dropdown_selector );
			//dropdown_selector = dropdown.element();
			return this;
		};
		
		/** Query selector in document
		 * 
		 * @param	string	selector	Selector of node
		 * @param	string	selector	Selector of parent, if null, then current document is used
		 * 
		 * @return	type	[QueryObject](https://docs.activestate.com/komodo/11/sdk/api/module-ko_dom-QueryObject.html)
		 */
		this.$ = function(selector)
		{
			//parent = parent ? this.$(parent).element() : document;

			return $(selector, document);
		};
		
		/** create node
		 */
		this.newNode = function(type, attributes)
		{
			return new ko.extensions.TemplateExtension.Komodo.Node()
										 .type(type)													 
										 .attributes(attributes)
										 .get();
		};

		/** Create dropdown element
		 * @param	string	id	Id of dropdown element
		 * @param	object	items	Items for dropdown 
		 * @param	string	[menu_text]	Text in dropdown menu button, if null then current item is shown
		 *
		 * @return	[element](https://developer.mozilla.org/en-US/docs/Web/API/Element)
		 *
		 * @example dropdown('#dropdown_test',	{'Item A':'alert("A")','Item B':'alert("B")'})
		 * @example dropdown('#dropdown_text_test',	{'Item A':{tooltip: 'Item A'},'Item B':{style: 'border:green;'}}, 'Attributes & label')
		 *
		 */
		this.create = function(id, items, menu_text=null)
		{
			dropdown	= menu_text ? self.newNode('button', {label: menu_text, type: "menu", id: sanitizeId(id) }) : self.newNode('menulist', {id: sanitizeId(id)});
			var menupopup	= self.newNode('menupopup');

			/** Get item simple
			 */
			var getItemSimple = function(label, _attributes)
			{
				var attributes = {label: label};
				
				if( typeof _attributes === 'object' ){
					for(var attr in _attributes)
						if (_attributes.hasOwnProperty(attr))
							attributes[attr] = _attributes[attr];
							//var value = _attributes[attr];
				}else
					attributes.oncommand = _attributes;
				
				return self.newNode('menuitem', attributes );
			}; 
			
			for(var label in items)
				if (items.hasOwnProperty(label))
					menupopup.appendChild( getItemSimple(label, items[label]) );
					
			dropdown.appendChild( menupopup );
			
			return  dropdown;
		};
		/** Get sanitized id
		 */
		var sanitizeId = function(id)
		{
			return id.replace(/[^a-z0-9\s-_]/gi, '').replace(/\s+/gi, '_').trim().toLowerCase();
		};
	}
	return Dropdown;

})();