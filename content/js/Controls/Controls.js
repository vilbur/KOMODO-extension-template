 /** Controls
 */
ko.extensions.TemplateExtension.Controls = (function()
{
		
	function Controls(_parent_node)
	{
		var parent_node = _parent_node;
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
			var checkbox 	= document.getElementById(id);	
			checkbox.checked = ! checkbox.checked ;
		};
		/** add
		 */
		this.add = function()
		{
			
		}; 
		/** remove
		 */
		this.remove = function(node)
		{
			
		}; 
		/** empty
		 */
		this.empty = function(_parent_node=null)
		{
			//console.log( 'Controls.empty()' );
			//var elementList = getParentNode(_parent_node).childNodes;
			//
			//for(let c=0; c<elementList.length;c++)
			//	getParentNode(_parent_node).removeChild(elementList[c]);

		};
		/** getParentNode
		 */
		var getParentNode = function(_parent_node)
		{
			//return _parent_node ? _parent_node : this.parent_node;
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
		
	}
	return Controls;

})();