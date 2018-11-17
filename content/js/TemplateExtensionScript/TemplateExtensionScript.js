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
			alert( 'TemplateExtensionScript.test()' );
			return new ko.extensions.TemplateExtension.UI();
		}; 
	}
	return TemplateExtensionScript;
})();

/** Apply to namespace 
 */
TemplateExtensionScript.apply(ko.extensions.TemplateExtension.TemplateExtensionScript);