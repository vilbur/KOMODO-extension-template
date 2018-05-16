/** TemplateExtension
 */
if( typeof ko.extensions.TemplateExtension === 'undefined'  )
	ko.extensions.TemplateExtension = {};

	
//var TemplateExtension = (function()
(function()
{
	function TemplateExtension()
	{
		var _this	= this;
		var Logger	= ko.extensions.Logger_v3 ? new ko.extensions.Logger_v3(this).clear(true).off(false) : require('ko/console');
	
		
		/** localizedTest
		 */
		this.localizedTest = function(string)
		{
			var bundleSvc = Components.classes["@mozilla.org/intl/stringbundle;1"].getService(Components.interfaces.nsIStringBundleService);
			var _locale = bundleSvc.createBundle("chrome://TemplateExtension/locale/TemplateExtension.properties");
			
			/** GetLocalizedString
			 */
			var GetLocalizedString = function(str) {
				return _locale.GetStringFromName(str);
			};
			
			alert('ko.extensions.TemplateExtension.Test("'+string+'")\n\n'+GetLocalizedString('property.property_test') );
			
		};
		///** Register preferences
		// *
		// */
		//var registerPreferences = function()
		//{
		//	alert( 'registerPreferences' );
		//	require("ko/prefs").registerCategory('TemplateExtension', 'chrome://TemplateExtension/content/xul/preferences/preferences.xul', '#Environment');
		//
		//}; 
		/** Get new instance of object in this
		 * @example _new('UI') get new instance of this.UI()  
		 */
		this._new = function(_class)
		{
			return new this[_class]();
		};
		/** 
		 */ 
		this.test = function(value='')
		{
			alert( 'TemplateExtension.test()' );
		};
		
		//registerPreferences();
	}

	return TemplateExtension;

})().apply(ko.extensions.TemplateExtension);
//TemplateExtension.apply(ko.extensions.TemplateExtension);