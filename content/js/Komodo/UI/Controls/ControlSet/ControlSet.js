/** ControlSet
* Manage extension`s ui elements
*
*/
ko.extensions.TemplateExtension.Komodo.Controls.ControlSet = (function()
{
	function ControlSet()
	{
		var self	= this;
		var $	= require('ko/dom');
		var document	= document;		

		/** Set document where ControlSet is operating, pane or preferences window
		 *
		 * @param	string	_document
		 * @return	self 
		 */
		this.document = function(_document)
		{
			alert( 'ControlSet.document()' );
			
			//document = _document;
			//return this;
		};

		/** Query selector in document
		 * 
		 * @param	string	selector	Selector of node
		 * @param	string	selector	Selector of parent, if null, then current document is used
		 * 
		 * @return	type	[QueryObject](https://docs.activestate.com/komodo/11/sdk/api/module-ko_dom-QueryObject.html)
		 */
		this.$ = function(selector, parent=null)
		{
			//if( ! selector.match(/^[#\.]/) )
			//	selector = '#' +selector;
			parent = parent ? this.$(parent).element() : document;

			return $(selector, parent);
		};

		
		/** create node
		 */
		this.create = function(type, attributes)
		{
			return new ko.extensions.TemplateExtension.Komodo.Node()
										 .type(type)													 
										 .attributes(attributes)
										 .get();
		};
		
		/** Create prefset dom with menu and toggable containers with controls.
		 * If exist, then prefset will be refreshed
		 *
		 * @param	string	prefset_selector	Id of wrapper element where menu and all containers are inserted
		 * @param	object	markup_template	Representation of container xul structure
		 * @param	object	containers_data	Data for pref set`s controls
		 *
		 * @example
		 *		markup_template = { 'Prefset Caption': ['checkbox', 'textbox'] };
		 * 
		 * 		containers_data = {
		 *			'Container A':{
		 * 				'Control A':	true,
		 * 				Enter Text A':	'Foo Text A',
		 * 			}
		 * 		};
		 * 
		 */
		this.load = function(prefset_selector, markup_template, containers_data)
		{
			var containers	= [];
			
			var prefset_caption	= Object.keys(markup_template).pop();						
			var container_labels	= Object.keys(containers_data);		
			var container_class_shown	= prefset_selector+'-shown';
			markup_template	= markup_template[prefset_caption];
			
			/* ELEMENTS */
			var menu_box	= self.create('hbox');
			var menu	= self.create('menulist');
			var menupopup	= self.create('menupopup');
			var caption	= self.create('caption', prefset_caption );

			/** Add remove container dropdown
			 */
			var add_remove_container_menu = (function()
			{
				var menu	= self.create('button', { type: 'menu' });
				var menupopup	= self.create('menupopup');
				
					var command_add =
					[
						'var UI = TemplateExtension().UI(document)',
						//'UI.append( "'+prefset_selector+'", UI.create("button", "Test Append") )',
						'UI.controlsetAddRemove( "'+prefset_selector+'","add")',
						//'',
						//"alert('menu_item_add')"
					];
					var command_remove =
					[
						//"if('command_remove')"
					];
					var menu_item_add	= self.create('menuitem', { 'label': '+', 'oncommand': command_add.join(';')} );
					var menu_item_remove	= self.create('menuitem', { 'label': '-', 'oncommand': command_remove.join(';')} );
				
					//console.log( menu_item );
					//console.log( menu_item );
					menupopup.appendChild( menu_item_add );
					menupopup.appendChild( menu_item_remove );
					menu.appendChild( menupopup );
					
					return menu;
			})(); 
			/** Create markup_template
			 *
			 * @param	object	controls_data	Container-id: {control id-label: value}
			 */
			var addMenuItem = function( container )
			{
				/** addMenuItem
				 */
				var addMenuItem = (function()
				{
					var toggle_containers =
					[
						"var container_class_shown='"+container_class_shown+"'",
						"var element_hide=document.getElementsByClassName(container_class_shown)[0]",
						"var element_show=document.getElementById('"+container.getAttribute('id')+"')",
						
						"if(element_hide==element_show)return", // return if clicked same element
						
						"element_show.classList.add(container_class_shown)", // show new container
						"element_show.style.display = 'block'",
				
						"element_hide.classList.remove(container_class_shown)", // hide old element
						"element_hide.style.display = 'none'",
					];
					
					var menu_item	= self.create('menuitem', { 'id': container.getAttribute('id')+'-item', 'label': container.getAttribute('label'), 'oncommand': toggle_containers.join(';')} );
				
					console.log( menu_item );
					menupopup.appendChild( menu_item );
				})(); 
				
			};
			/** Compose menu
			 */
			var composeMenuBox = function()
			{
				menu.appendChild( menupopup );
				menu_box.appendChild( menu );
				menu_box.appendChild( add_remove_container_menu );
			}; 
			/** Create containers
			 */
			var createContainers = function()
			{ 
				for(let i=0; i<container_labels.length;i++){
					var container	=  self.container( container_labels[i], markup_template, containers_data[container_labels[i]] );
					containers.push( container );
					addMenuItem(container);
				}
			}; 
			
			createContainers();
			composeMenuBox();
			
			return [].concat.apply([caption,menu_box], containers);
		};
		/**  
		 *	
		 */
		this.container = function(container_label, markup_template, controls_data)
		{
			var controls_labels	= Object.keys(controls_data);
			
			/** container
			 */
			var container = (function()
			{
				var container	= self.create( 'groupbox', {
										'label': container_label,	// sanitized label become id attribute, label is for save and restore element from prefs
										'class': 'controlset-container',	// class 'prefset-container' is for identification of container in prefset DOM
								 });
				return container;
			})();
			
			/** Append control to container
			 */
			var appendControlToContainer = function(index)
			{
				//var control_type	= markup_template[index];
				var control_data	= {'label': controls_labels[index], 'value':controls_data[controls_labels[index]] };
				var control	= self.create(markup_template[index], control_data);
				
				/** Add label if not checkbox 
				 */
				var label_box = (function()
				{
					if( control.nodeName === 'checkbox' )
						return;
					
					var hbox	= self.create( 'hbox' );
					var label	= self.create('label', {'value': controls_labels[index], 'control': control.getAttribute('id')});
				
					hbox.appendChild( label );
					hbox.appendChild( control );
					
					return hbox;
				})(); 
				
				container.appendChild( label_box ? label_box : control );
			};
			
			for(let c=0; c<controls_labels.length;c++)
				appendControlToContainer(c);
				
			return container;
		};
		/** test
		 */
		this.test = function()
		{
			alert( 'ControlSet.test()' );
		}; 
	}
	return ControlSet;

})();