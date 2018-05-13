 /** Controls
 */
ko.extensions.TemplateExtension.Controls = (function()
{
		
	function Controls(_parent_node=null)
	{
		var Logger	= ko.extensions.Logger_v3 ? new ko.extensions.Logger_v3(this).clear(false).off(false) : require('ko/console');
		
		var parent_node = _parent_node;
		//this.Control	= {};
		/** initPane
		 */
		this.getControlsValues = function()
		{
			console.log( 'Controls.getControlsValues()' );
			console.log( parent_node );

			//var pane	= document.getElementById('TemplateExtension-pane');			
			
			var elementList = parent_node.childNodes;
			console.log( elementList[4] );
			
			
			var elementList_hbox = elementList[4].childNodes;
			console.log( elementList_hbox );
			
		};
		
		/** Test
		 */
		this.toggleCheckbox = function(id)
		{
			var checkbox 	= window.getElementById(id);	
			checkbox.checked = ! checkbox.checked ;
		};
		/** add
		 */
		this.add = function(type, attributes)
		{
			if( ! Array.isArray(controls) )
				attributes = [attributes];
			
			for(let a=0; a<attributes.length;a++)
				addControlToParent(type, attributes[a]);
		};
		
		/** addControl
		 */
		var addControlToParent = function(type, attributes)
		{
			var control	= new ko.extensions.TemplateExtension.Control()
													 .type(type)
												 	 .attributes(attributes)
													 .get();
			parent_node.appendChild(control);
		}; 
		
		/** remove
		 */
		this.remove = function(node)
		{

		}; 
		/** Remove all child nodes from parent_node
		 */
		this.empty = function()
		{
			//console.log( '*/Controls.empty()' );
			var elementList = parent_node.childNodes;
			
			for(let i=elementList.length-1; i>-1;i--)
				parent_node.removeChild(elementList[i]);
		};

		/** getPane
		 */
		var getPane = function()
		{
			//console.log( require("ko/windows").getMain().extension_panes.TemplateExtension  );
			//console.log( document );
			//console.log( document.location.host );
			
			//return (document.location.host = 'komodo' ? window.extension_panes.TemplateExtension : document).getElementById('TemplateExtension-pane');
		}; 
		/** Test
		 */
		this.test = function(string='node') {
			alert('ko.extensions.TemplateExtension.Controls("'+string+'")');
		};
	}
	return Controls;

})();