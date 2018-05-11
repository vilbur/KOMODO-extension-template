/** TemplateExtension
 */
ko.extensions.TemplateExtension = {};
(function()
{

	function TemplateExtension()
	{


		
		/*--------   PRIVATE PROPERTIES   -------------------------------------------------------------------------------------*/
		var _this	= this;
		var Logger	= ko.extensions.Logger_v3 ? new ko.extensions.Logger_v3(this).clear(true).off(false) : require('ko/console');
				
		/*--------   PUBLIC METHODS   --------------------------------------------------------------------------------------*/
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
		/** 
		 */
		this.callbackTest = function(value='')
		{
			//alert( value );
			alert( 'callbackTest' );

			this.Prefs.test();
		};
		
	}

	return TemplateExtension;

})().apply(ko.extensions.TemplateExtension);
