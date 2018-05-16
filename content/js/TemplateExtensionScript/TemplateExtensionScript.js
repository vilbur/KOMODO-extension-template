
if( typeof ko.extensions.TemplateExtension === 'undefined'  )
	ko.extensions.TemplateExtension = {};
	
ko.extensions.TemplateExtension.TemplateExtensionScript = {};



/** TemplateExtensionScript
 */
var TemplateExtensionScript = (function()
{
	function TemplateExtensionScript()
	{
		/** test
		 */
		this.test = function()
		{
			alert( 'TemplateExtensionScript' );
			return new ko.extensions.TemplateExtension.UI();
		}; 
	}
	return TemplateExtensionScript;
})();

TemplateExtensionScript.apply(ko.extensions.TemplateExtension.TemplateExtensionScript);