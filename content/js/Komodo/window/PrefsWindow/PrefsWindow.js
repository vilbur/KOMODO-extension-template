/** PrefsWindow
 *
 *
 *
 *
 * 
 */
(function()
{
	function PrefsWindow()
	{ 
		//var prefs	= ko.prefs;
		var self	= this;
		var koPrefs	= require("ko/prefs");
		var pref_types	= ['String', 'Long', 'Boolean'];
		
		this.UI = {};
 
		this.data = {
			pref_set_test: {
				'conteiner-A':{
					'Control 1': true,
					'Control 2': false,
				},
				'conteiner-B':{
					'Control 1': false,
					'Control 2': true,
				},
			}
			
		}
		/** init
		 */
		this.init = function()
		{
			console.log('PrefsWindow.init()'); 
			var document_prefs	= TemplateExtension().Komodo.Document.get('preferences');
			
			this.UI  = TemplateExtension()._new('UI').document(document_prefs);
			//console.log( document_prefs );
			//console.log( TemplateExtension() );
			//console.log( this.UI );			
			
			createPrefSetTemplates();
			
		}; 
		/** save
		 */ 
		this.save = function()
		{
			alert( 'PrefsWindow.save()' );
			TemplateExtension().Komodo.savePreferences('PrefsWindow');
		};
		/** Pref set
		 */
		var createPrefSetTemplates = function()
		{
			/** 
			 */
			var templates =
			{
				pref_set_test:{
					groupbox: ['checkbox', 'checkbox'],
					//['textbox']
				}
			};
			
			/** Set pref set
			 */
			var createPrefSet = function(prefset_id)
			{
				var container_type = Object.keys(templates[prefset_id]).pop();
				var control_types	= templates[prefset_id][container_type];
				var prefset_node	= self.UI.node('#'+prefset_id);
				/** Create template
				 *
				 * @param	object	controls_data	Container-id: {control id-label: value}
				 * @example	controls_data =
				 * 	{
				 *		'conteiner-A':{
				 * 			'Control 1': true,
				 * 			'Control 2': false,
				 * 		}
				 * 	}
				 */
				var createContainer = function(container_id, controls_data)
				{
					var controls_labels	= Object.keys(controls_data);
					var container_node	= prefset_node.append(container_type);
					//console.log('createContainer');
					//console.log( container_id );
					//console.log( controls_data );					
					//console.log( controls_labels );
					
					for(let c=0; c<controls_labels.length;c++)
						container_node = container_node.append(control_types[c], {'label': controls_labels[c], 'checked':controls_data[controls_labels[c]] });
				};
				var prefsets_data	= self.data[prefset_id];
				var containers_ids	= Object.keys(prefsets_data);
				//console.log('createPrefSet:'+prefset_id);
				//console.log( prefsets_data );
				//console.log( containers_ids );				

				for(let i=0; i<containers_ids.length;i++)
					createContainer( containers_ids[i], prefsets_data[containers_ids[i]] );
			};
			
			/** Iterate templates
			 */
			var pref_set_ids = Object.keys(templates);
			for(let i=0; i<pref_set_ids.length;i++)
				createPrefSet(pref_set_ids[i]);
				
		};
		
		/** test
		 */ 
		this.test = function()
		{
			alert( 'PrefsWindow.test()' );
		};
		/** Template extension
		 * @return	ko.extensions.TemplateExtension
		 */
		var TemplateExtension = function()
		{
			return ko.extensions.TemplateExtension;
		}; 
	
	}
	return PrefsWindow;

})().apply(ko.extensions.TemplateExtension.Komodo.PrefsWindow);


function PrefsWindow()
{
	return ko.windowManager.getMainWindow().ko.extensions.TemplateExtension.Komodo.PrefsWindow;
}