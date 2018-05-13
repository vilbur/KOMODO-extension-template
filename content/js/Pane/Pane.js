
 /** Pane
 */
ko.extensions.TemplateExtension.Pane = {};
(function()
{
	
	
	
	function Pane()
	{
		this.Controls = {};
		
		
		/** init
		 */
		this.init = function()
		{
			console.log( 'Pane.initPane()' );
			this.Controls	= new ko.extensions.TemplateExtension.Controls(document.getElementById('TemplateExtension-pane'));
		}; 

		///** initPane
		// */
		//this.initPane = function()
		//{
		//	console.log( 'Pane.initPane()' );
		//	this.Controls	= new ko.extensions.TemplateExtension.Controls(document.getElementById('TemplateExtension-pane'));
		//
		//	//var Controls	= new ko.extensions.TemplateExtension.Controls(document.getElementById('TemplateExtension-pane'));
		//	//Controls.getControlsValues();
		//	
		//	this.Controls.getControlsValues();
		//	
		//}; 
		
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

