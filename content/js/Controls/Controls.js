
 /** Controls
 */
ko.extensions.TemplateExtension.Controls = (function()
{
		
	function Controls()
	{

		/** initPane
		 */
		this.getControlsValues = function()
		{
			console.log( 'Controls.getControlsValues' );

			var pane	= document.getElementById('TemplateExtension-pane');
			var elementList = pane.childNodes;
			console.log( pane );
			console.log( elementList );			

			
		};
		
		/** Test
		 */
		this.toggleCheckbox = function(id)
		{
			var checkbox 	= document.getElementById(id);	
			checkbox.checked = ! checkbox.checked ;
		};
	}
	return Controls;

})();