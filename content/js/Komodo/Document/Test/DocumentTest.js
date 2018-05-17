/** Get document of extension`s pane
 */
var getPaneDocument = function()
{
	console.log( ko.extensions.TemplateExtension.Komodo.Document.get('pane') );
};

getPaneDocument();