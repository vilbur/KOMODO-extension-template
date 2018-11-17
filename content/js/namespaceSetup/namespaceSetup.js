/** Setup hierarchy of objects where are scripts applied
 * 
 * Include this file in *.xul files as FIRST
 *
 * @example __[ overlay.xul ](../../xul/overlay.xul#L12)__
 */
ko.extensions.TemplateExtension = {
	Komodo:
	{
		Document:	{},
		Prefs:	{},
		Pane:	{},
		PrefsWindow:	{},
		Controls:	{},
	},
};