/** getControlsBox
 */
var UI = function()
{
	return new ko.extensions.TemplateExtension.UI( ko.extensions.TemplateExtension.Document.get('pane')); 
}; 
/** getControlsBox
 */
var getControlsBox = function()
{
	return UI().$('#te_controls_box'); 
}; 

/** addUI
 */
var addUI = function()
{
	//getControlsBox().append( 'button', {label: 'Single button', oncommand: 'alert("TEST")'} );
	//getControlsBox().append( 'button', [{label: 'Button A'}, {label: 'Button B'}] );
	
	getControlsBox().append( 'checkbox', ['Checkbox A', {label: 'Checkbox B', checked:true}] );  		
};

/** emptyElement
 */
var emptyElement = function()
{
	getControlsBox().empty();  
	
};

/** getUIValues
 */
var getUIValues = function()
{
	var values = getControlsBox().values();
	console.log( values );
};
//ko.extensions.TemplateExtension.test("TEST")
/*---------------------------------------
	RUN TESTS
-----------------------------------------
*/
//getControlsBox()
emptyElement();
//addUI();
//getUIValues();