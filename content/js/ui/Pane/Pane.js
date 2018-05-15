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
			ko.statusBar.AddMessage('Pane.initPane()', 'TemplateExtension');
			this.UI	= new ko.extensions.TemplateExtension.UI(document).prefix('te');
			//this.UI.test();
		}; 

		///** initPane
		// */
		//this.initPane = function()
		//{
		//	console.log( 'Pane.initPane()' );
		//	this.UI	= new ko.extensions.TemplateExtension.UI(document.getElementById('TemplateExtension-pane'));
		//
		//	//var UI	= new ko.extensions.TemplateExtension.UI(document.getElementById('TemplateExtension-pane'));
		//	//UI.getControlsValues();
		//	
		//	this.UI.getControlsValues();
		//	
		//}; 
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

