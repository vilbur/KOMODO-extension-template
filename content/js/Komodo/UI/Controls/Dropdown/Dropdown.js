/** Dropdown element
*
*/
ko.extensions.TemplateExtension.Komodo.Controls.Dropdown = (function()
{
	function Dropdown()
	{
		var self	= this;
		//var $	= require('ko/dom');
		var document	= document;		
		var dropdown;	// main element
		var menupopup;	// menupopup element

		/** Set document where Dropdown is working, pane or preferences document
		 *
		 * @param	string	_document
		 * @return	self 
		 */
		this.document = function(_document)
		{
			document = _document;
			return this;
		};
		/** Set dropdown element
		 *
		 * @param	string|element	selector_or_element
		 * @return	self 
		 */
		this.element = function(selector_or_element)
		{
			dropdown	= require('ko/dom')( selector_or_element, document );
			menupopup	= dropdown.find('menupopup').first();
			return this;
		};

		/** Create dropdown element
		 * @param	string	id	Id of dropdown element
		 * @param	object	items	Items for dropdown 
		 * @param	string	[menu_text=null]	Text in dropdown menu button, if null then current item is shown
		 *
		 * @return	[element](https://developer.mozilla.org/en-US/docs/Web/API/Element)
		 *
		 * @example dropdown('#dropdown_test',	{'Item A':'alert("A")','Item B':'alert("B")'})
		 * @example dropdown('#dropdown_text_test',	{'Item A':{tooltip: 'Item A'},'Item B':{style: 'border:green;'}}, 'Attributes & label')
		 *
		 */
		this.create = function(id, items, menu_text=null)
		{
			dropdown	= menu_text ? newNode('button', {label: menu_text, type: "menu", id: sanitizeId(id) }) : newNode('menulist', {id: sanitizeId(id)});
			menupopup	= newNode('menupopup');

			/** Get item simple
			 */
			var getItemSimple = function(label, _attributes)
			{
				var attributes = {label: label};
				
				if( typeof _attributes === 'object' )
				{
					for(var attr in _attributes)
						if (_attributes.hasOwnProperty(attr))
							attributes[attr] = _attributes[attr];
							//var value = _attributes[attr];
				}else
					attributes.oncommand = _attributes;
				
				return newNode('menuitem', attributes );
			}; 
			
			for(var label in items)
				if (items.hasOwnProperty(label))
					menupopup.appendChild( getItemSimple(label, items[label]) );
					
			dropdown.appendChild( menupopup );
			
			return dropdown;
		};
		
		/** Select item in dropdown menu
		 * @param	int	index	Index of menu element, last item if index < 0
		 *
		 * @return	self
		 */
		this.select = function(index=null)
		{
			dropdown.element().selectedIndex = this.getIndex(index, 'loop');
			
			return this;
		};
		/** Add item to menu
		 *
		 * @param	{attr:value}|string	attributes	Attributes for menu item, or separator if '-'
		 * @param	int	index	Index where to insert item, 'null' & '-1' append at last position
		 * @param	mixed	select	Select item after insertion if not false
		 * @return self
		 *
		 * @example .add({ label: "Item Last & S" },   -1, "select")
		 * 
		 */
		this.add = function(attributes, index=null, select=false)
		{
			var is_separator	= attributes==='-';
			var menuitem	= is_separator ? newNode('menuseparator') : newNode('menuitem', attributes);
			
			index 	=  index > -1 ? this.getIndex(index) : null;
			
			var item_current	= index ? this.getMenuElement( index ) : null;

			if( ( is_separator && index === 0 ) || (is_separator && item_current.element().nodeName === 'menuseparator') )
				return this; 
			
			if( item_current )
				item_current.before( menuitem );
			
			else if( ! is_separator )
				menupopup[ index===null || index===-1 ? 'append' : 'prepend']( menuitem );

			
			if( select!==false )
				this.select(index===null ? -1 : index); 	
				
			return this;
		}; 
		/** Delete item at index
		 *  Next item is selected after delete, if last item is deleted then previous item is selected
		 * @param	int	index	Index of menu element, last item if index < 0
		 * @return self
		 */
		this.delete = function(_index=null)
		{
			index = _index ?  this.getIndex(_index) : this.current();

			dropdown.element().removeItemAt( index );
			
			removeDoubleSeparators();
			
			this.select( index );
			
			return this;
		};

		/** Count of items, including separators
		 * @return	int Count of items in menu
		 */
		this.count = function()
		{
			return dropdown.find( 'menupopup' )._elements[0].childNodes.length; 
		};
		/** Get all elements from menupopup element
		 * @return	array Array of elements
		 */
		this.menuElements = function()
		{
			return dropdown.find( 'menupopup' )._elements[0].childNodes;
		};
		/** Get item, including separators
		 * 
		 * @param	int	index	Index of menu element
		 * @return	type	[QueryObject](https://docs.activestate.com/komodo/11/sdk/api/module-ko_dom-QueryObject.html)
		 */
		this.getMenuElement = function(index)
		{
			return require('ko/dom')( dropdown.find( 'menupopup' )._elements[0].childNodes[index] );
		};
		/** Get index of current selected item 
		 * @return	int	
		 */
		this.current = function()
		{
			return dropdown.element().selectedIndex;
		};
		/** Get index value
		 * @param	int	index	Index of menu element
		 * @param	mixed	loop	If not null, then return first item if index is bigger then max index
		 * @return	int		Return index, last index if 'index < 0', null if more then max index
		 */
		this.getIndex = function(index, loop=null)
		{
			var menu_elements	= dropdown.find( 'menupopup' )._elements[0].childNodes;
			var max_index	= menu_elements.length -1;

			if( index < 0 )
				return max_index; // return last element 
				
			else if( index > max_index )
				return loop ? 0 : null; // return first element
			
			return index;
		};
		
		/*---------------------------------------
			PRIVATE
		-----------------------------------------*/

		/** create node
		 */
		var newNode = function(type, attributes)
		{
			return new ko.extensions.TemplateExtension.Komodo.Node()
										 .type(type)													 
										 .attributes(attributes)
										 .get();
		};
		
		/** Remove double separators
		 *
		 * Avoid first or last item to be <menuseparator/>
		 * Avoid double <menuseparator/><menuseparator/> 
		 *
		 */
		var removeDoubleSeparators = function()
		{
			var elements	= self.menuElements();
			
			for(let i = elements.length-1; i > -1 ;i--)
			{
				var is_separator	= elements[i].nodeName === 'menuseparator';
				var is_first_separator	= is_separator && i === 0;
				var if_prev_separator	= is_separator && elements[i-1] && elements[i-1].nodeName === 'menuseparator';
				var is_last_separator	= is_separator && i === elements.length-1;
				//console.log(  'is_first_separator: ' + is_first_separator );
				//console.log(  'if_prev_separator: ' + if_prev_separator );
				//console.log(  'is_last_separator: ' + is_last_separator );
				
				if( is_first_separator || is_last_separator || if_prev_separator )
				{
					dropdown.element().removeItemAt( i );
					elements	= self.menuElements();
				}
			}
		}; 
		
		/** Get sanitized id
		 */
		var sanitizeId = function(id)
		{
			return id.replace(/[^a-z0-9\s-_]/gi, '').replace(/\s+/gi, '_').trim().toLowerCase();
		};
		
		/** test
		 */
		this.test = function()
		{
			alert( 'Dropdown.test()' );
		};
	}
	return Dropdown;

})();