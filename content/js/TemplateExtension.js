/** TemplateExtension
 */
(function()
{
	function TemplateExtension()
	{
		var self	= this;
	
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
		/** Get new instance of object in this.Komodo 
		 * @example _new('UI') get new instance of this.UI()  
		 */
		this._new = function(_class)
		{
			return new this.Komodo[_class]();
		};
		
		/** Access to UI class
		 * @param	object	_document	Document where UI is working
		 */
		this.UI = function(_document=null)
		{
			return  new ko.extensions.TemplateExtension.Komodo.UI().document(_document ? _document : document);			
		}; 
		/** 
		 */ 
		this.test = function()
		{
			alert( 'TemplateExtension.test()' );
			console.log( window.frameElement.contentWindow.document.location );
		};
		
	}

	return TemplateExtension;

})().apply(ko.extensions.TemplateExtension);

/** Access to extension from UI 
 *	Access from preference.xul
 */
function TemplateExtension()
{
	return ko.windowManager.getMainWindow().ko.extensions.TemplateExtension;
}