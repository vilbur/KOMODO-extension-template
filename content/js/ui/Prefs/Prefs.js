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
		var prefs	= require("ko/prefs");
		this.UI = {};

		/** init
		 */
		this.init = function()
		{
			console.log( window );
			console.log( window.frameElement.contentWindow.document );			
			alert( komodoWindow().ko.extensions.TemplateExtension.constructor.name );  
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
				/** Set prefix for nodes id`s
		 *
		 * @param	string	prefix
		 * @return	self 
		 */
		this.prefix = function(_prefix='')
		{
			prefix = _prefix;
			return this;
		};
		/**  
		 */
		var setKomodoPreferences = (function(key, value)
		{
			var type = typeof value;

			if ( key && value !== null )
				if      ( type=="string" ) prefs.setString	( key,	value);
				else if ( type=="number" ) prefs.setLong	( key,	parseInt(value));
				else if ( type=="boolean") prefs.setBoolean	( key,	value == 1 ? true : false );
		});
		/**  
		 */
		var getKomodoPreferences = (function(key, value_default)
		{
			var type	= typeof value_default;
			
			if(prefs.hasPref(key))
				try {
					if      ( type=="string" ) return prefs.getString	(key);
					else if ( type=="number" ) return prefs.getLong	(key);
					else if ( type=="boolean") return prefs.getBoolean	(key);			
				}
				catch(e) {
					alert( 'Function ko.extensions.getKomodoPreferences()\n\nkey = '+key+'\nvalue_default = '+value_default+'\n\n value_default has wrong DATATYPE ');
				}
			return value_default;
		});
		
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



