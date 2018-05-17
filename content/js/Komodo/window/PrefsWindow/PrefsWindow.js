/** PrefsWindow
*/
(function()
{
	function PrefsWindow()
	{ 
		var prefs	= ko.prefs;
		var pref_types	= ['String', 'Long', 'Boolean'];
		this.UI = {};
 
		/** init
		 */
		this.init = function()
		{
			//ko.statusBar.AddMessage('TemplateExtension.PrefsWindow.init()', 'Extension');
			var document_prefs	= ko.extensions.TemplateExtension.Komodo.Document.get('preferences');
			
			this.UI  = ko.extensions.TemplateExtension._new('UI').document(document_prefs);
		}; 
		
		/** test
		 */ 
		this.test = function()
		{
			alert( 'PrefsWindow.test()' );
			//this.UI.parent('#te_pref_box').append( 'checkbox', ['Checkbox B 1', 'Checkbox B 2'] );
		};
	
	}
	return PrefsWindow;

})().apply(ko.extensions.TemplateExtension.Komodo.PrefsWindow);


function PrefsWindow()
{
	return ko.windowManager.getMainWindow().ko.extensions.TemplateExtension.Komodo.PrefsWindow;
}