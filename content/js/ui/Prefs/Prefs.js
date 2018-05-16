if( typeof window.Prefs === 'undefined'  )
	window.Prefs = {};
		
//window.Prefs.test();

 /** Prefs
 */
//ko.extensions.TemplateExtension.Prefs = {};
var Prefs = (function()
{
	function Prefs()
	{ 
		this.UI = {};
		 
		/** init
		 */
		this.init = function()
		{
			console.log( window );
			console.log( window.frameElement.contentWindow.document );			
			
			this.UI  = komodoWindow().ko.extensions.TemplateExtension._new('UI').document(window.frameElement.contentWindow.document);
			//this.UI.test();
		}; 
   
		/** test
		 */ 
		this.test = function()
		{
			//alert( 'Prefs.test()' );
			//this.UI.parent('#te_pref_box').append( 'checkbox', ['Checkbox B 1', 'Checkbox B 2'] );

		};
		/** Get Komodo main window 
		 * chrome://komodo/content/library/windowManager.js mus be imported in preferences.xul
		 *
		 * @return object komodo main window
		 */
		var komodoWindow = function()
		{
			return ko.windowManager.getMainWindow();
		}; 
		/** Test
		 */
		this.toggleCheckbox = function(id)
		{
			console.log( 'Prefs.toggleCheckbox()' );
			var checkbox 	= document.getElei
			mentById(id);	
			checkbox.checked = ! checkbox.checked ;
		};
	}
	return Prefs;

})();
	
Prefs.apply(window.Prefs);



function onLoad()
{
	if( typeof window.Prefs === 'undefined'  )
		window.Prefs = {};
		
	Prefs.apply(window.Prefs);
	
	window.Prefs.test();

}

function addControl()
{
	//var node = document.createElement('textbox');						
	//
	//document.getElementById('TemplateExtension_pref_box').appendChild(node);
	//
	//console.log( 'ko.windowManager.getMainWindow().ko.extensions.test' );
	//console.log( ko.windowManager.getMainWindow().ko.extensions.test );
	//console.log( 'ko.windowManager.getMainWindow().ko.TemplateExtension.test' );	
	ko.windowManager.getMainWindow().ko.extensions.TemplateExtension.test();	

	//ko.windowManager.getMainWindow().ko.extensions.TemplateExtension.Pref.UI.parent('#TemplateExtension_pref_box').append( 'checkbox', ['Checkbox B 1', 'Checkbox B 2'] );

}




