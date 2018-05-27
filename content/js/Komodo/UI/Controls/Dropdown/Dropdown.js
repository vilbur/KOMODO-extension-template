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
		 * @param	{attr:value}	attributes	Attributes for menu item
		 * @param	int	index	Index where to insert item, 'null' & '-1' append at last position
		 * @return self
		 */
		this.add = function(attributes, index=null, select=false)
		{
			var menuitem	= this.newNode('menuitem', attributes);
			
			index 	=  index > -1 ? this.getIndex(index) : null;
			console.log(  'Dropdown.add(): index=' + index );

			if( index && index>0 )
				this.getItem(index).before( menuitem );
				
			else
			{
				console.log(  index===null || index===-1 ? 'append' : 'prepend' );
				menupopup[ index===null || index===-1 ? 'append' : 'prepend']( menuitem );
			}
			
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
			//index	= this.getIndex(index);
			index = _index ?  this.getIndex(_index) : this.current();

			var is_last	= this.count() === index +1;
			
			dropdown.element().removeItemAt( index );
			
			this.select( is_last ? index-1 : index );
			
			return this;
		};
		/** Count of items
		 */
		this.count = function()
		{
			return dropdown.find( 'menupopup' )._elements[0].childNodes.length;
		}; 
		/** Get item
		 * 
		 */
		this.getItem = function(index)
		{
			//console.log(  'index: ' + index );
			return this.$( dropdown.find( 'menuitem' )._elements[index] );
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
			var max_index	= self.count() -1;
			
			if( index < 0 )
				return max_index;
				
			else if( index > max_index )
				return loop ? 0 : null;
				
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