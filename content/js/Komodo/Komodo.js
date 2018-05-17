/** Komodo
 */
(function()
{
	function Komodo()
	{
		/** test
		 */
		this.test = function()
		{
			alert( 'Komodo' );
			return new ko.extensions.TemplateExtension.Komodo();
		}; 
	}
	return Komodo;

})().apply(ko.extensions.TemplateExtension.Komodo);