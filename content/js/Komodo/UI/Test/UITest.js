/** Test controls in pane
 *
 */
ko.extensions.TemplateExtension.UITest = {};
(function()
{
	function UITest()
	{
		var paneUI	= null;
		/*---------------------------------------
			PREPARE TEST CLASS AND PANE UI
		-----------------------------------------
		*/
		/** Pane ui
		 * @return	object	UI class in pane
		 */
		var setPaneUI = function()
		{
			var document_pane	= ko.extensions.TemplateExtension.Komodo.Document.get('pane');
			
			paneUI = new ko.extensions.TemplateExtension.Komodo.UI().document(document_pane);
			
			return paneUI;
		};
		/**  
		 */
		var addExtensionTestControls = function()
		{
			createVbox('extension_test_controls', 'Extension test controls');

			paneUI.append( '#extension_test_controls', [
				//paneUI.create('caption', {label: 'Extension test controls'}),
				paneUI.create('button',	{label:	'TemplateExtension.test()', oncommand: 'TemplateExtension().test()'}),
				paneUI.create('button',	{label:	'Komodo.Pane.test()',       oncommand: 'TemplateExtension().Komodo.Pane.test()', tooltip: 'TemplateExtension.Komodo.Pane.test()'}),					   
				paneUI.create('button',	{label:	'UITest().createPrefSetTest()', oncommand: 'UITest().createPrefSetTest()'}),
				//paneUI.create('button',	{label:	'UITest().test()', oncommand: 'UITest().test()'}),				
			]);
		};
		/** Clear pane
		 */
		var clearPane = function()
		{
			paneUI.$( '#TemplateExtension-pane' ).empty();
			paneUI.append( '#TemplateExtension-pane', [
				paneUI.create('hbox'),
			]);
		}; 
		/** Create vbox
		 */
		var createVbox = function(id, caption)
		{

			//consoleClear(); //!!!!!
			paneUI.$( '#'+id ).empty();
				
			if( ! paneUI.exists('#'+id) )
				paneUI.append( '#TemplateExtension-pane > hbox', [
					//paneUI.create('vbox', {id: id }),
					//paneUI.create('caption', {label: caption}),
					paneUI.create('vbox', {id: id, style:"border:1px solid lightblue" },[ 'caption', {label: caption} ]),
				]);
				
		
		}; 
		/**  
		 */
		var addUiTestControls = function()
		{
			createVbox('ui_test_controls', 'UI test controls');
			
			paneUI.append( '#ui_test_controls', [
				paneUI.create('button',	{label:	'Add Controls', oncommand: 'UITest().addControlsTest()'}),				
				paneUI.create('button',	{label:	'UITest().test', oncommand: 'UITest().test'}),			
			]);
		
		};
		/** Add test parent element
		 *  MUST BE EXECUTED BEFORE TEST
		 */
		var addTestControlsBoxElement = function()
		{
			createVbox('controls_box', 'Test controls box');
			//if( ! paneUI.exists('#controls_box') )
			//	paneUI.append( '#TemplateExtension-pane > hbox',	paneUI.create('vbox',	{id:	'controls_box'}) );
			//	
			//paneUI.append( '#controls_box', [
			//	paneUI.create('caption',	{label:	'Test controls box'}),
			//]);
		};

		/** Clear Komodo Console pane
		 *  IF CONSOLE IS NOT DETACHED
		 */
		var consoleClear = function(clear_message='UITest')
		{
			var consoleEL = document.getElementById('console-widget');
			if(consoleEL)
			{
				consoleEL.contentWindow.document.getElementById('output').innerHTML = '';
				if(clear_message)
					require('ko/console').info(clear_message);	
			}
		};
		/** Remove controls
		 *  MUST BE EXECUTED BEFORE TEST
		 */
		var removeControls = function()
		{
			paneUI.$( '#extension_test_controls' ).empty();
			paneUI.$( '#ui_test_controls' ).empty();			
		};
		/** init
		 */
		this.init = function()
		{
			//alert( 'init' ); 
			consoleClear();
			
			setPaneUI();
			
			clearPane();			
			//removeControls();
			//refreshPane();
			addExtensionTestControls();
			//addUiTestControls();
		};
		/** Refresh pane
		 */
		var refreshPane = function()
		{
			paneUI.$( '#controls_box' ).empty();
			addTestControlsBoxElement();
		};
		/*---------------------------------------
			TESTS
		-----------------------------------------
		*/
		this.ControlsExistsTest = function()
		{
			var control	= paneUI.create('caption',	{label:	'ControlsExistsTest'});
			
			console.log( control );
			paneUI.append( '#this_should_not_exists',	control );
			paneUI.append( '#controls_box',	control );	
		};
		/** Add controls
		 */
		this.addControlsTest = function()
		{
			//paneUI.append('#controls_box', paneUI.create('textbox') );
			refreshPane();
			
			paneUI.append('#controls_box',
				paneUI.create('checkbox', [
					{label: 'Checkbox 1', prefs:false, value:true},
					{label: 'Checkbox 2', prefs:false},
				])
			)
			.append('#controls_box',
				paneUI.create('checkbox', [
					{label: 'Checkbox prefs 1', checked:true},
					{label: 'Checkbox prefs 2', prefs:true},
				])
			);
		};
		
		/** Create pref set
		 */
		this.createPrefSetTest = function()
		{
			createVbox('ui_test_prefset', 'Prefset test');
			
			var template = {groupbox: ['checkbox', 'textbox']};
			var values   = {  
								'Container A':{  
									'Control A':    false,  
									'Enter Text A':   'Foo Text A',  
								},  
								'Container B':{  
									'Control B':    true,  
									'Enter Text B':   '',  
								}  
							};  
		
			paneUI.createPrefSet('#ui_test_prefset', template, values );
		}; 

		/** Get values
		 */
		this.getAllValuesTest = function()
		{
			console.log('getAllValuesTest'); 
			console.log( paneUI.values( '#controls_box') );	
		}; 
		/** Get prefs values
		 */
		this.getPrefsValuesTest = function()
		{
			console.log('getPrefsValuesTest'); 
			console.log( paneUI.values( '#controls_box', 'prefs' ) );
		};
		
		/** test
		 */ 
		this.test = function()
		{
			alert( 'UITest.test()' ); 
		}; 
		
	}
	return UITest;

})().apply(ko.extensions.TemplateExtension.UITest);


function UITest()
{
	return ko.extensions.TemplateExtension.UITest;
}

setTimeout( function(){
	ko.extensions.TemplateExtension.UITest.init();
}, 1000); 