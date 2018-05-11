
 /** Pane
 */
ko.extensions.TemplateExtension.Pane = {};
(function()
{
	
	
	
	function Pane()
	{
		//var Controls	= new ko.extensions.TemplateExtension.Controls();
		
		this.test_prop = 'Pane property';
		
		
		///** Test
		// */
		//this.toggleCheckbox = function()
		//{
		//	var checkbox 	= document.getElementById('te_cbx_text');
		//	//alert( checkbox.getAttribute('checked') );
		//	checkbox.setAttribute('checked', (checkbox.getAttribute('checked') ? false : true)  );
		//	//checkbox.setAttribute('checked', false  );			
		//};

		/** initPane
		 */
		this.initPane = function()
		{
			console.log( 'Pane.initPane()' );
			
			var Controls	= new ko.extensions.TemplateExtension.Controls();
			Controls.getControlsValues();
			
			//var pane	= document.getElementById('TemplateExtension-pane');
			//var elementList = pane.childNodes;
			//console.log( pane );
			//console.log( elementList );	
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

