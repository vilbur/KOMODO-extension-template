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
		}; 
	}
	return TemplateExtensionScript;
})();
TemplateExtensionScript.apply(ko.extensions.TemplateExtension.TemplateExtensionScript);