/** PrefsWindow
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
		/** 
		 */
		var perfset_templates =
		{
			pref_set_test:{
				groupbox: ['checkbox', 'checkbox'],
				//['textbox']
			}
		};
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
			
		};
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
			/** Iterate perfset_templates
			 */
			var pref_set_ids = Object.keys(perfset_templates);
			
			for(let i=0; i<pref_set_ids.length;i++)
				self.UI.createPrefSet( pref_set_ids[i], perfset_templates[pref_set_ids[i]], self.data[pref_set_ids[i]] );
				
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