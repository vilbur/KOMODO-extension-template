if( typeof ko.extensions.TemplateExtension === 'undefined'  )
	ko.extensions.TemplateExtension = {};

/** Pane
*/
ko.extensions.TemplateExtension.Pane = {};

(function()
{
	function Pane()
	{
		this.UI = {};
		/** init
		 */
		this.init = function()
		{
			
			ko.statusBar.AddMessage('Pane.init()', 'TemplateExtension');
			this.UI  = new ko.extensions.TemplateExtension.UI(document).prefix('te'); 
		}; 
		/** test
		 */
		this.test = function()
		{ 
			alert( 'TemplateExtension.Document.test()' ); 
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
})().apply(ko.extensions.TemplateExtension.Pane);