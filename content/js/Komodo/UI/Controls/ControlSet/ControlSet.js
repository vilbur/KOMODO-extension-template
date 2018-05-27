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
		var controlset;
		var dropdown;

		/** Set document where ControlSet is operating, pane or preferences window
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
		this.element = function(controlset_selector)
		{
			controlset	= self.$( controlset_selector );
			//dropdown	= controlset.find('menupopup').parent();
			
			//controlset_element	= controlset.element();
			return this;
		};
		/** Dropdown
		 */
		this.dropdown = function()
		{
			return new ko.extensions.TemplateExtension.Komodo.Controls.Dropdown()
																.element( controlset.find( 'menupopup').parent() );
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
		 * @param	string	controlset_id	Id of wrapper element where menu and all containers are inserted
		 * @param	object	markup_template	Representation of container xul structure
		 * @param	object	containers_data	Data for pref set`s controls
		 * @return	self	
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
		this.load = function(containers_data)
		{
			var containers	= [];

			var controlset_id	= controlset.attr('id');
			var prefset_caption	= controlset.attr('caption');					
						
			var markup_template	= JSON.parse( controlset.attr('template') );
			var is_adjustable	= typeof markup_template === 'object' && ! Array.isArray(markup_template);
			
			//var container_labels	= Array.isArray(markup_template) ? Object.keys(containers_data) : Object.keys(markup_template);		
			var container_labels	= Object.keys(containers_data).sort();
			//var container_class_shown	= 'shown';
			//console.log(  'container_class_shown: ' + container_class_shown );
			/* MENU ELEMENTS ELEMENTS */
			var menu_box	= self.create('hbox');
			var menu_main	= self.create('menulist');
			var menu_adjust	= self.create('button', { type: 'menu' });
			
			/** Create containers
			 */
			var createContainers = function()
			{
				for(let i=0; i<container_labels.length;i++)
					containers.push( self.container( container_labels[i], markup_template, containers_data[container_labels[i]] ) );
			}; 
			/** Create main menu
			 */
			var createMainMenu = function()
			{
				var menupopup	= self.create('menupopup');
				
				for(let i=0; i<containers.length;i++)
					menupopup.appendChild( self.getMenuItem(containers[i]) );

				menu_main.appendChild(menupopup);
			}; 
			
			/** Compose menu
			 */
			var createAdjustMenu = function()
			{
				if( ! is_adjustable )
					return; 
				
				var menupopup	= self.create('menupopup');
			
				var command_add = [
					'var UI = TemplateExtension().UI(document)',
					'UI.controlset().element( "#'+controlset_id+'" ).addContainer()',
				];
				
				var command_remove = [
					'var UI = TemplateExtension().UI(document)',
					'UI.controlset().element( "#'+controlset_id+'" ).removeContainer()',
				];
				
				var menu_item_add	= self.create('menuitem', { 'label': '+', 'oncommand': command_add.join(';')} );
				var menu_item_remove	= self.create('menuitem', { 'label': '-', 'oncommand': command_remove.join(';')} );
			
				menupopup.appendChild( menu_item_add );
				menupopup.appendChild( menu_item_remove );
				
				menu_adjust.appendChild( menupopup );
			};
			/** Add caption
			 */
			var addCaption = function()
			{
				controlset.append( self.create('caption', prefset_caption));
			}; 
			/** Compose menu
			 */
			var addMenus = function()
			{
				menu_box.appendChild( menu_main );
				
				if( is_adjustable )
					menu_box.appendChild( menu_adjust );
				
				controlset.append( menu_box );
			};
			/** Add containers
			 */
			var addContainers = function()
			{
				for(let i=0; i<containers.length;i++)
					controlset.append(containers[i]);
			}; 
			
			createContainers();
			createMainMenu();
			createAdjustMenu();
			
			controlset.empty();
			
			addCaption();
			addMenus();
			addContainers();

			return this; 
		};

		/**  
		 *	
		 */
		this.container = function(container_label, markup_template, controls_data=null)
		{			
			var control_types	= Array.isArray(markup_template) ? markup_template	: Object.keys(markup_template);
			
			//console.log('---markup_template');
			//console.log( markup_template );
			/** Container_labels
			 */
			var controls_labels = (function()
			{
				if( controls_data )
					return Object.keys(controls_data);
				//console.log('Object.values(markup_template)');
				//console.log( Object.keys(markup_template) );
				return Object.keys(markup_template).map(function(key){
					return markup_template[key].label;
				}); 

			})(); 

			/** container
			 */
			var container = (function()
			{
				var container	= self.create( 'groupbox', {
										'label': container_label,	// sanitized label become id attribute, label is for save and restore element from prefs
										'class': 'controlset-container',	// class 'prefset-container' is for identification of container in prefset DOM
								 });
				
				container.classList.add( container.getAttribute('id') );
				
				return container;
			})();
			
			/** Append control to container
			 */
			var appendControlToContainer = function(index)
			{
				//var control_type	= control_types[index];
				var control_data	= {'label': controls_labels[index], 'value': controls_data ? controls_data[controls_labels[index]] : '' };
				var control	= self.create(control_types[index], control_data);
				
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
		
		/** Add container 
		 */
		this.addContainer  = function(container_label=null)
		{
			var dropdown	= this.dropdown();

			if( ! container_label )
				container_label	= require("ko/dialogs").prompt('Add new set name');
				
			if( ! container_label )
				return;
			
			var markup_template	= JSON.parse( controlset.attr('template') );

			var container = this.container(container_label, markup_template);
			
			controlset.find('menupopup').first().append( self.getMenuItem(container) );
			//dropdown().add( self.getMenuItemAttributes(container) );

			controlset.append( container );
			
			this.select(-1);
		}; 
		/** Add container 
		 */
		this.removeContainer  = function()
		{
			console.log('removeContainer()');

			//var menulist	= controlset.find( 'menulist' ).first();
			//var current_index	= menulist.element().selectedIndex;
			//var current_label	= menulist.find( 'menupopup' )._elements[0].childNodes[current_index].label;
			var dropdown	= this.dropdown();

			//var menulist	= controlset.find( 'menulist' ).first();
			var current_index	= dropdown.current();
			var current_label	= dropdown.current('label');
			
			console.log(  'current_index: ' + current_index );
			console.log(  'current_label: ' + current_label );

			if( ! require("ko/dialogs").confirm("Remove set '" + current_label +"' ?") )
				return; 
			
			dropdown.delete();
			
			controlset.find('.controlset-container')._elements[current_index].remove();
			
			this.select(current_index);
			
		}; 
		/** select item in menu and change visible container
		 * @param	int	select_index	Index of menu element, select last item if select_index < 0
		 */
		this.select = function(index)
		{
			var dropdown	= this.dropdown();
			//alert( 'ControlSet.select()' );
			index = dropdown.getIndex(index, 'loop');
			
			dropdown.select( index );
			
			/* Hide containers  */
			controlset.find('.controlset-container').each(function(i) // class 'controlset-container' is important, it is defined in ControlSet class
			{
				var display	= index==i ? 'block' : 'none';
				
				if( index==i )
					this.classList.add( 'shown' );

				this.setAttribute('style', this.getAttribute('style') +';display:'+display+';');
			});
		}; 

		/** Create markup_template
		 *
		 * @param	object	controls_data	Container-id: {control id-label: value}
		 */
		this.getMenuItemAttributes = function( container )
		{
			var toggle_containers =
			[
				"var controlset	= document.getElementById('"+controlset.attr('id')+"')",
				"var containers	= controlset.getElementsByClassName('controlset-container')",
				"var element_show	= containers['"+container.getAttribute('id')+"']",
				"var element_hide	= controlset.getElementsByClassName('shown')[0]",
	
				"if(element_hide==element_show)return", // return if clicked same element
				
				"element_show.classList.add('shown')", // show new container
				"element_show.style.display = 'block'",
				
				"element_hide.classList.remove('shown')", // hide old element
				"element_hide.style.display = 'none'",
			];
			
			return {
				'id': container.getAttribute('id')+'-item',
				'label': container.getAttribute('label'),
				'oncommand': toggle_containers.join(';')};
		};
		/** Create markup_template
		 *
		 * @param	object	controls_data	Container-id: {control id-label: value}
		 */
		this.getMenuItem = function( container )
		{
			return self.create('menuitem', this.getMenuItemAttributes(container) );
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