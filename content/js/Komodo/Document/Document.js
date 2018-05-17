/** Get extension`s window.document
 *
 * @example  Document.get('preferences') return document of preferences.xul
 *
 */
ko.extensions.TemplateExtension.Komodo.Document = {};
(function()
{
	function Document()
	{
		var host_name	= 'TemplateExtension';
		
		/** Get window.document of extension
		 * 
		 * @example  get('preferences') return document of preferences.xul
		 * 
		 * @param	string	filename	Basename of *.xul file
		 * @return	object	document
		 */
		this.get = function(filename)
		{
			var windows	= require("ko/windows").getAll();
			var rx_host_name	= new RegExp( host_name, 'gi');
			var rx_filename	= new RegExp( filename + '.xul$', 'gi');			
			
			for(let w=0; w<windows.length;w++)
			{
				var window_frame	= windows[w].frameElement;
				var window_location	= window_frame ? window_frame.contentWindow.document.location : null;
				
				if( window_frame && window_location.host.match(rx_host_name) && window_location.pathname.match( rx_filename ) )
					return  windows[w].frameElement.contentWindow.document;		
			}
		};
		/** test
		 */
		this.test = function()
		{
			alert( 'TemplateExtension.Komodo.Document.test()' ); 
		}; 
	}
	return Document;

})().apply(ko.extensions.TemplateExtension.Komodo.Document);