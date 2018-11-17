/** Container for classes which are related to Komodo
 * 
 */
(function()
{
	function Komodo()
	{
		///** init Document
		// */
		//this.initDocument = function()
		//{
		//	ko.statusBar.AddMessage('ko.extensions.TemplateExtension.Komodo.initDocument()', 'Extension');
		//	this.Komodo.Document.hostName('TemplateExtension');
		//}; 
		/** savePreferences
		 */
		this.savePreferences = function(window_class)
		{
			
		}; 
		
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