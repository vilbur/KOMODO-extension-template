/** get UI class
 */
var UI = function()
{
	return new ko.extensions.TemplateExtension.UI( ko.extensions.TemplateExtension.Komodo.Document.get('pane')); 
}; 
/** get te_controls_box element
 */
var controlsBoxParent = function()
{
	return UI().parent('#te_controls_box');
}; 

/** addUI
 */
var addUI = function()
{
	//controlsBoxParent().append( 'button', {label: 'Single button', oncommand: 'alert("TEST")'} )
	//controlsBoxParent().append( 'button', [{label: 'Button A'}, {label: 'Button B'}] );
	
	controlsBoxParent().append( 'checkbox', ['Checkbox A', {label: 'Checkbox B', checked:true}] );  		
};

/** emptyElement
 */
var emptyElement = function()
{
	UI().$('#te_controls_box').empty();  
	
};

/** getValuesFromAllPane
 */
var getValuesFromPane = function()
{
	var values = UI().values('#TemplateExtension-pane');
	console.log( values );
};
/** getValuesFromParentNode
 */
var getValuesFromParentNode = function()
{
	var values = UI().values('#te_controls_box');
	console.log( values );
};
//ko.extensions.TemplateExtension.test("TEST")
/*---------------------------------------
	RUN TESTS
-----------------------------------------
*/
//controlsBoxParent()
//emptyElement();
//addUI();
getValuesFromPane();
getValuesFromParentNode();