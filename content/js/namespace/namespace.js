/** Setup hierarchy of objects where scripts are applied
 * 
 * IMPORTANT: Include this file in *.xul files as FIRST
 *
 * @example __[ overlay.xul ](../../xul/overlay.xul#L12)__
 */
ko.extensions.TemplateExtension =
{
	/* ========= KOMODO SCRIPTS ========= */
	Komodo:
	{
		Document:	{},
		Prefs:	{},
		Pane:	{},
		PrefsWindow:	{},
		Controls:	{},
	},
	
	/* ========= EXTENSIONS SCRIPTS ========= */
	TemplateExtensionScript: {},
	
};