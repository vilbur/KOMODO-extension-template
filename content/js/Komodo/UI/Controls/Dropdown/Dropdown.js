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
		var dropdown;	// main element
		var menupopup;	// menupopup element

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
		 * @param	string|element	selector_or_element
		 * @return	self 
		 */
		this.element = function(selector_or_element)
		{
			dropdown	= self.$( selector_or_element );
			menupopup	= dropdown.find('menupopup').first();
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
			menupopup	= self.newNode('menupopup');

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
				
				return self.newNode('menuitem', attributes );
			}; 
			
			for(var label in items)
				if (items.hasOwnProperty(label))
					menupopup.appendChild( getItemSimple(label, items[label]) );
					
			dropdown.appendChild( menupopup );
			
			return  dropdown;
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
		 * @return self
		 *
		 * @example .add({ label: "Item Last & S" },   -1, "select")
		 * 
		 */
		this.add = function(attributes, index=null, select=false)
		{
			var is_separator	= attributes==='-';
			var menuitem	= is_separator ? this.newNode('menuseparator') : this.newNode('menuitem', attributes);
			
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
		 *  
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
		/** Remove double separators
		 *
		 * Avoid first or last item to be <menuseparator/>
		 * Avoid double <menuseparator/><menuseparator/> 
		 *
		 */
		var removeDoubleSeparators = function()
		{
			//console.log('removeDoubleSeparators()'); 
			var elements	= self.menuElements();
			//console.log( elements );
			
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
		/** Count of items
		 */
		this.count = function()
		{
			return dropdown.find( 'menupopup' )._elements[0].childNodes.length; 
			//return dropdown.find( 'menuitem' )._elements.length;
		};
		/** Get item
		 * 
		 */
		this.menuElements = function()
		{
			//console.log(  'index: ' + index );
			//return this.$( dropdown.find( 'menuitem' )._elements[index] );
			return dropdown.find( 'menupopup' )._elements[0].childNodes;
			//return dropdown.find( 'menuitem' )._elements[index];
		};
		/** Get item
		 * 
		 */
		this.getMenuElement = function(index)
		{
			//console.log(  'index: ' + index );
			//return this.$( dropdown.find( 'menuitem' )._elements[index] );
			return this.$( dropdown.find( 'menupopup' )._elements[0].childNodes[index] );
			//return dropdown.find( 'menuitem' )._elements[index];
		};
		/** Current index
		 * @return	int	
		 */
		this.current = function(property='selectedIndex')
		{
			return dropdown.element()[property];
		}; 
		/*---------------------------------------
			PRIVATE
		-----------------------------------------*/
		/** Get index value
		 * @param	int	index	Index of menu element
		 * @param	mixed	loop	If not null, then return first item if index is bigger then max index
		 * @return	int		Return index, last index if 'index < 0', null if more then max index
		 */
		this.getIndex = function(index, loop=null)
		{
			var menu_elements	= dropdown.find( 'menupopup' )._elements[0].childNodes;
			var max_index	= menu_elements.length -1;
			//console.log(  'getIndex(' + index+')' );
			//console.log( menu_elements );
			if( index < 0 )
				return max_index; // return last element 
				
			else if( index > max_index )
				return loop ? 0 : null; // return first element
			
			//var i	= 0;
			//if( index )
			//	while( i < index )
			//	{
			//		console.log( menu_elements[i] );
			//		if( menu_elements[i].nodeName === 'menuseparator' )
			//			index++;
			//		i++;
			//	}
			
			//console.log(  'getIndex() = ' + index );
			
			return index;
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