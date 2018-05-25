/** TemplateExtension
 */
(function()
{
	function TemplateExtension()
	{
		var _this	= this;
		var Logger	= ko.extensions.Logger_v3 ? new ko.extensions.Logger_v3(this).clear(false).off(false) : require('ko/console');
	
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
		/** Get new instance of object in this
		 * @example _new('UI') get new instance of this.UI()  
		 */
		this._new = function(_class)
		{
			return new this.Komodo[_class]();
		};
		
		/** UI
		 */
		this.UI = function(_document)
		{
			return  new ko.extensions.TemplateExtension.Komodo.UI().document(_document);			
		}; 
		/** 
		 */ 
		this.test = function(value='')
		{
			alert( 'TemplateExtension.test()' );
			console.log( window.frameElement.contentWindow.document.location );
		};
		
		//registerPreferences();
	}

	return TemplateExtension;

})().apply(ko.extensions.TemplateExtension);

/** Access to extension from UI 
 *	
 */
function TemplateExtension()
{
	return ko.extensions.TemplateExtension;
}