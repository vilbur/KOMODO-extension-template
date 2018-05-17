/** Pane
*/
//ko.extensions.TemplateExtension.Komodo.Pane = {};

(function()
{
	function Pane()
	{
		this.UI = {};
		/** init
		 */
		this.init = function()
		{
			ko.statusBar.AddMessage('TemplateExtension.Komodo.Pane.init()', 'Extension');
			this.UI  = new ko.extensions.TemplateExtension.Komodo.UI().document(document);			
		}; 
		/** test
		 */
		this.test = function() 
		{ 
			alert( 'TemplateExtension.Komodo.Pane.test()' ); 
		}; 
		/** Test
		 */
		this.toggleCheckbox = function(id)
		{
			console.log( 'Pane.toggleCheckbox()' );
			var checkbox 	= document.getElementById(id);	
			checkbox.checked = ! checkbox.checked ;
		};
	}
	return Pane;

})().apply(ko.extensions.TemplateExtension.Komodo.Pane);