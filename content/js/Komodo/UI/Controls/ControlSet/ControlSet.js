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
			document = _document;
			return this;
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
		 * @param	object	perfset_template	Representation of container xul structure
		 * @param	object	perfset_values	Data for pref set`s controls
		 *
		 * @example
		 *		perfset_template = { 'Prefset Caption': ['checkbox', 'textbox'] };
		 * 
		 * 		perfset_values = {
		 *			'Container A':{
		 * 				'Control A':	true,
		 * 				Enter Text A':	'Foo Text A',
		 * 			}
		 * 		};
		 * 
		 */
		this.load = function(prefset_selector, perfset_template, perfset_values)
		{
			var containers	= [];
			
			var prefset_caption	= Object.keys(perfset_template).pop();						
			var control_types	= perfset_template[prefset_caption];
			var containers_ids	= Object.keys(perfset_values);		
			var container_class_shown	= prefset_selector+'-shown';
			
			/* ELEMENTS */
			var menu	= self.create('menulist');
			var menupopup	= self.create('menupopup');
			var caption	= self.create('caption', prefset_caption );

			/** Create perfset_template
			 *
			 * @param	object	controls_data	Container-id: {control id-label: value}
			 */
			var createContainerAndMenuItem = function(container_index, container_label, controls_data)
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
					
					var menu_item	= self.create('menuitem', { 'id': container_label+'item', 'label': container_label, 'oncommand': toggle_containers.join(';')} );
				
					console.log( menu_item );
					menupopup.appendChild( menu_item );
				})(); 
				  
				/** Append control to container
				 */
				var appendControlToContainer = function(index)
				{
					//var control_type	= control_types[index];
					var control_data	= {'label': controls_labels[index], 'value':controls_data[controls_labels[index]] };
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
				
				containers.push( container );
			};
			
			for(let i=0; i<containers_ids.length;i++)
				createContainerAndMenuItem(i, containers_ids[i], perfset_values[containers_ids[i]] );
			
			menu.appendChild( menupopup );
			
			return [].concat.apply([caption,menu], containers);

		};

	}
	return ControlSet;

})();