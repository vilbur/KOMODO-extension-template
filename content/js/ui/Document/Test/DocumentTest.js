/** Get document of extension`s pane
 */
var getPaneDocument = function()
{
	console.log( ko.extensions.TemplateExtension.Document.get('pane') );
};

getPaneDocument();