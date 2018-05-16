if( typeof ko.extensions.TemplateExtension === 'undefined'  )
	ko.extensions.TemplateExtension = {};

/** Get extension`s window.document
 *  Used for testing for example
 * 
 */
ko.extensions.TemplateExtension.Document = {};
(function()
{
	function Document()
	{
		var extension_name	= 'TemplateExtension';
		
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
			var rx_extension	= new RegExp( extension_name, 'gi');
			var rx_filename	= new RegExp( filename + '.xul$', 'gi');			
			
			for(let w=0; w<windows.length;w++)
			{
				var window_frame	= windows[w].frameElement;
				var window_location	= window_frame ? window_frame.contentWindow.document.location : null;
				
				if( window_frame && window_location.host.match(rx_extension) && window_location.pathname.match( rx_filename ) )
					return  windows[w].frameElement.contentWindow.document;		
			}
		};
		/** test
		 */
		this.test = function()
		{
			alert( 'TemplateExtension.Document.test()' ); 
		}; 
	}
	return Document;

})().apply(ko.extensions.TemplateExtension.Document);