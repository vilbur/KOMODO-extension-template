if( typeof window.Prefs === 'undefined'  )
	window.Prefs = {};
		
/** Prefs
*/
var Prefs = (function()
{
	function Prefs()
	{ 
		//var prefs	= require("ko/prefs");
		var prefs	= ko.prefs;		
		var pref_types	= ['String', 'Long', 'Boolean'];
		this.UI = {};
 
		/** init
		 */
		this.init = function()
		{
			this.UI  = komodoWindow().ko.extensions.TemplateExtension._new('UI').document(window.frameElement.contentWindow.document);
		
		}; 
		
		/** test
		 */ 
		this.test = function()
		{
			alert( 'Prefs.test()' );
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

		/**  
		 */
		this.setPrefs = (function(key, value)
		{
			var type = typeof value;
			
			 if ( type==="number" || /^\d+(\.\d+)?$/.match(value) )
				prefs.setLong( key,	Number(value));
		
			else if ( type=="boolean")
				prefs.setBoolean( key,	value );
			
			else
				prefs.setString( key,	value);
			
		});
		/**  
		 */
		this.getPrefs = (function(key, value_default)
		{
			
			this.getString = function()
			{
				return prefs.getString(key);
			}; 
			this.getLong = function()
			{
				return prefs.getLong(key);
			}; 
			this.getBoolean = function()
			{
				return prefs.getBoolean(key);
			};
			
			return function()
			{
				for(let i=0; i<pref_types.length;i++)
				{
					var value	= this['get'+pref_types[i]];
					if(typeof value !== 'undefined')
						return value;
				}
				return value_default;
			}; 
		
		});
		
	}
	return Prefs;

})();
	
Prefs.apply(window.Prefs);

function onloadTest(){
	
	alert( 'onloadTest' );
	//Prefs.apply(window.Prefs);
	//window.Prefs.init();
}

