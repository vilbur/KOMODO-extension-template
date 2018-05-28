/** Create sets of controls switchable with dropdown menu
 * 
 *
 * 
 */
ko.extensions.TemplateExtension.Komodo.Controls.ControlSet = (function()
{
	function ControlSet()
	{
		var self	= this;		
		var document	= document;		
		var controlset;

		/** Set document where ControlSet is working, pane or preferences document
		 *
		 * @param	string	_document
		 * @return	self 
		 */
		this.document = function(_document)
		{
			document = _document;
			return this;
		};
		/** Set controlset_selector
		 *
		 * @param	string	controlset_selector
		 * @return	self 
		 */
		this.element = function(controlset_selector)
		{
			controlset	= require('ko/dom')(controlset_selector, document);

			return this;
		};

		/** Create controlset dom with menu and toggable containers with controls.
		 * If exist, then controlset is refreshed
		 *
		 * @param	object	containers_data	Data for controlset`s controls
		 * @return	self	
		 *
		 * @example
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
			var strToJson = function(str) {
				try {
					return JSON.parse(str);
				} catch (e) {
					alert( "Controlset: #" + controlset_id + " \n\nNot valid attibute 'template':\n\ntemplate="+controlset.attr('template') );
				}
				return null;
			};
			//console.log('ControlSet.load()'); 
			var containers	= [];

			var controlset_id	= controlset.attr('id');
			var prefset_caption	= controlset.attr('caption');					
			var is_adjustable	= controlset.attr('adjust') === 'true';
						
			var markup_template	= strToJson( controlset.attr('template') );

			var container_labels	= Object.keys(containers_data).sort();
			
			/* MENU ELEMENTS ELEMENTS */
			var menu_box	= newNode('hbox');
			var menu_main	= newNode('menulist');
			var menu_adjust	= newNode('button', { type: 'menu' });
			
			/** Create containers
			 */
			var createContainers = function()
			{
				for(let i=0; i<container_labels.length;i++)
					containers.push( createContainer( container_labels[i], markup_template, containers_data[container_labels[i]] ) );
			}; 
			/** Create main menu
			 */
			var createMainMenu = function()
			{
				var menupopup	= newNode('menupopup');
				
				for(let i=0; i<containers.length;i++)
					menupopup.appendChild( getMenuItem(containers[i]) );

				menu_main.appendChild(menupopup);
			}; 
			
			/** Compose menu
			 */
			var createAdjustMenu = function()
			{
				if( ! is_adjustable )
					return; 
				
				var menupopup	= newNode('menupopup');
			
				var command_add = [
					'var UI = TemplateExtension().UI(document)',
					'UI.controlset().element( "#'+controlset_id+'" ).add()',
				];
				
				var command_remove = [
					'var UI = TemplateExtension().UI(document)',
					'UI.controlset().element( "#'+controlset_id+'" ).remove()',
				];
				
				var menu_item_add	= newNode('menuitem', { 'label': '+', 'oncommand': command_add.join(';')} );
				var menu_item_remove	= newNode('menuitem', { 'label': '-', 'oncommand': command_remove.join(';')} );
			
				menupopup.appendChild( menu_item_add );
				menupopup.appendChild( menu_item_remove );
				
				menu_adjust.appendChild( menupopup );
			};
			/** Add caption
			 */
			var addCaption = function()
			{
				controlset.append( newNode('caption', prefset_caption));
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

			console.log( controlset.element().outerHTML ); // DEBUG: get element as plain text

			return this; 
		};

		/** Add new container by markup template
		 * @param	string	container_label	Label of container shown in dropdown
		 * @return	self 
		 */
		this.add  = function(container_label=null)
		{
			//var dropdown	= this.dropdown();

			if( ! container_label )
				container_label	= require("ko/dialogs").prompt('Add new set name');
				
			if( ! container_label )
				return;
			
			var markup_template	= JSON.parse( controlset.attr('template') );

			var container = createContainer(container_label, markup_template);
			
			this.dropdown().add( getMenuItemAttributes(container) );
			//dropdown().add( self.getMenuItemAttributes(container) );

			controlset.append( container );
			
			this.select(-1);
			
			return this; 
		}; 
		/** Remove container
		 * @param	int	index	Index of container to remove, if null, then current is removed
		 * @return	self
		 */
		this.remove  = function(index=null)
		{
			var dropdown	= this.dropdown();

			var current_index	= index ? index : dropdown.current();
			var current_label	= dropdown.getMenuElement(current_index).attr('label');
			//console.log(  'current_index: ' + current_index );
			//console.log(  'current_label: ' + current_label );

			if( ! require("ko/dialogs").confirm("Remove set '" + current_label +"' ?") )
				return; 
			
			dropdown.delete();
			
			controlset.find('.controlset-container')._elements[current_index].remove();
			
			this.select(current_index);
			
			return this; 
		}; 
		/** Select item in menu and change visible container
		 * @param	int	index	Index of menu element, select last item if select_index < 0
		 * @return	self
		 */
		this.select = function(index)
		{
			var dropdown	= this.dropdown();

			index = dropdown.getIndex(index, 'loop'); 
			
			dropdown.select( index );
			
			/* Hide containers  */
			controlset.find('.controlset-container').each(function(i) // class 'controlset-container' is important, it is defined in ControlSet class
			{
				var display	= index==i ? 'block' : 'none';
				
				this.classList.remove( 'shown' );

				this.setAttribute('style', this.getAttribute('style').replace(/display:\s*(none|block);/gi, '') + 'display:'+display+';');

				if( index==i )
					this.classList.add( 'shown' );
			});
			return this; 
		};
		/** Get dropdown in control set
		 *
		 * @return	object [Dropdown](../Dropdown)
		 */
		this.dropdown = function()
		{
			return new ko.extensions.TemplateExtension.Komodo.Controls.Dropdown()
																.element( controlset.find( 'menupopup').parent() );
		};
		
		/** test
		 */
		this.test = function()
		{
			alert( 'ControlSet.test()' );
		};
		
		/** create node
		 */
		var newNode = function(type, attributes)
		{
			return new ko.extensions.TemplateExtension.Komodo.Node()
										 .type(type)													 
										 .attributes(attributes)
										 .get();
		};

		/**  Get container dom
		 *
		 * @param	string	container_label	Label of container used in dropdown menu
		 * @param	array	markup_template	Array of control types of attribute objects for controls 
		 * @param	object	controls_data	Values for controls {'control label': 'value'}
		 *
		 * @return element
		 * 
		 * @example markup_template=["checkbox", "textbox"]
		 * @example markup_template=[{"type": "checkbox": "label":"Checkbox" }, {"type": "textbox": "label":"Enter Text"}]
		 * 
		 */
		var createContainer = function(container_label, markup_template, controls_data=null)
		{			
			//console.log('ControlSet.container()'); 
			var controls_data_labels = controls_data ? Object.keys(controls_data) : null;
			
			/* Merge markup_template & controls_data to one object 
			 */
			markup_template = markup_template.map(function(attributes, index)
			{
				if( typeof attributes === 'string'   )
					attributes = {type: attributes};
				
				if( controls_data )
					attributes.label = controls_data_labels[index];
				
				if( controls_data )
					attributes.value = controls_data[controls_data_labels[index]];
				
				return attributes;
			});
			//console.log( markup_template );
		
			/** container
			 */
			var container = (function()
			{
				var container	= newNode( 'groupbox', {
										'label': container_label,	// sanitized label become id attribute, label is for save and restore element from prefs
										'class': 'controlset-container',	// class 'controlset-container' is for identification of container in controlset DOM
								 });
				
				container.classList.add( container.getAttribute('id') );
				
				return container;
			})();
			
			/** Append control to container
			 */
			var appendControlToContainer = function(index)
			{
				//var type	= markup_template[index].type;
				var control	= newNode(markup_template[index].type, markup_template[index]);
				
				/** Add label if not checkbox 
				 */
				var label_box = (function()
				{
					if( markup_template[index].type === 'checkbox' )
						return;
					
					var hbox	= newNode( 'hbox' );
					var label	= newNode( 'label', {'value': markup_template[index].label, 'control': control.getAttribute('id') });
				
					hbox.appendChild( label );
					hbox.appendChild( control );
					
					return hbox;
				})(); 
				
				container.appendChild( label_box ? label_box : control );
			};
			
			for(let c=0; c<markup_template.length;c++)
				appendControlToContainer(c);
				
			return container;
		};
		
		/** Create markup_template
		 *
		 * @param	object	controls_data	Container-id: {control id-label: value}
		 */
		var getMenuItemAttributes = function( container )
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
		var getMenuItem = function( container )
		{
			return newNode('menuitem', getMenuItemAttributes(container) );
		};
		/** Get sanitized id
		 */
		var sanitizeId = function(id)
		{
			return id.replace(/[^a-z0-9\s-_]/gi, '').replace(/\s+/gi, '_').trim().toLowerCase();
		};
		 
	}
	return ControlSet;

})();