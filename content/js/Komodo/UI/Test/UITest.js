/** Test controls in pane
 *
 */
ko.extensions.TemplateExtension.UITest = {};
(function()
{
	function UITest()
	{
		var $	= require('ko/dom');
		var self	= this;
		var paneUI	= null;
		
		var prefs	= ko.extensions.TemplateExtension.Komodo.Prefs.prefix('ui-test-');

		/*---------------------------------------
			UITest TEST CONTROLS
		-----------------------------------------
		*/
		/** Test controls init pane
		 */
		this.TestControls_ReinitPane = function()
		{
			this.init();
		};
		/** Test controls init pane
		 */
		this.TestControls_ClearConsole = function(clear_message='')
		{
			var consoleEL = document.getElementById('console-widget');
			if(consoleEL)
			{
				consoleEL.contentWindow.document.getElementById('output').innerHTML = '';
				if(clear_message)
					require('ko/console').info(clear_message);	
			}
		};
		/*---------------------------------------
			VALUES TESTS
		-----------------------------------------
		*/
		/** Get values
		 */
		this.PrefsTest_getValuesFromDocumentTest = function()
		{
			console.log( paneUI.values() );	
		};
		/** Get values
		 */
		this.PrefsTest_getValuesFromElementTest = function()
		{
			console.log( paneUI.values( '#TemplateExtension-pane') );	
		}; 
		/** Get prefs values
		 */
		this.PrefsTest_setValueToElementTest = function()
		{
			//console.log('getPrefsValuesTest'); 
			console.log( paneUI.values( '#TemplateExtension-pane', 'only-prefs' ) );
		};
		/** Get prefs values
		 */
		this.PrefsTest_setValuesByObjectTest = function()
		{
			//console.log('getPrefsValuesTest'); 
			console.log( paneUI.values( '#TemplateExtension-pane', 'only-prefs' ) );
		};
		/*---------------------------------------
			PREFS TESTS
		-----------------------------------------
		*/
		/** PrefsTest_SavePrefs
		 */
		this.PrefsTest_SavePrefs = function()
		{
			var values	= paneUI.values( '#TemplateExtension-pane', 'only-prefs' );
			console.log( values );
			prefs.set(values);
		}; 
		/** PrefsTest_SavePrefs
		 */
		this.PrefsTest_LoadPrefs = function()
		{
			//var prefs	= ko.extensions.TemplateExtension.Komodo.Prefs.prefix('ui-test-');

			//var values_data	= paneUI.values( '#TemplateExtension-pane', 'prefs' );
			var values	= prefs.get();
			console.log( values );
		}; 
		
		/*---------------------------------------
			CONTROL TESTS
		-----------------------------------------
		*/
		this.ControlTest_AddExistingControls = function()
		{
			createVbox('box_controls_exists', 'Controls exist');

			var control	= paneUI.create('caption',	{label:	'ControlsExistsTest'});
			
			console.log( control );
			paneUI.append( '#this_parent_should_not_exists',	control );
			paneUI.append( '#box_controls_exists',	control );
		};
		/** Add controls
		 */
		this.ControlTest_AddMainControls = function()
		{
			//paneUI.append('#controls_box', paneUI.create('textbox') );
			createVbox('main_controls', 'Main controls');
			
			paneUI.append('#main_controls',
				paneUI.create('textbox', {id: 'pref-test-string', value:'lorem ipsum'})
			)
			.append('#main_controls',
				paneUI.create('checkbox', [
					{label: 'Checkbox 1', prefs:false, value:true},					
					{label: 'Checkbox 2', prefs:false},
				])
			)
			.append('#main_controls',
				paneUI.create('checkbox', [
					{label: 'Checkbox prefs 1', checked:true},
					{label: 'Checkbox prefs 2', prefs:true},
				])
			);
		};
		
		/** Create pref set
		 */
		this.ControlTest_CreatePrefset = function()
		{
			createVbox('ui_test_prefset');
			
			var template = {'Prefset test': ['checkbox', 'textbox']};
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
		
		/** Create pref set
		 */
		this.ControlTest_CreateDopdown = function()
		{
			createVbox('ui_test_dropdown','Dropdown');
			
			paneUI.append('#ui_test_dropdown',
				paneUI.dropdown('#dropdown_test',	{'Item A':'alert("A")','Item B':'alert("B")'})
			);
			
			paneUI.append('#ui_test_dropdown',
				paneUI.dropdown('#dropdown_text_test', {'Item A':{tooltip: 'Item A'},'Item B':{tooltip: 'Item B'}}, 'Attributes & label')
			);

		};
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
		/** Clear pane
		 */
		var clearPane = function()
		{
			paneUI.$( '#TemplateExtension-pane > hbox:first-of-type' ).empty();
			//paneUI.append( '#TemplateExtension-pane', [
			//	paneUI.create('hbox'),
			//]);
		}; 

		/** Create vbox
		 */
		var createVbox = function(id, caption=null)
		{
			var selector	= '#'+id;
			
			if( paneUI.exists(selector) )
				paneUI.$(selector).empty();
			
			else
				paneUI.append( '#TemplateExtension-pane > hbox',
					paneUI.create('vbox', {id: id, style:"padding:5px" })
				);
			
			if( caption )
				paneUI.append( selector,
					paneUI.create( 'caption', {label: caption} )
				);
		}; 
		/**  Loop this object and get functions wich has format of name: 'UiBoxName_ButtonName'
		 */
		var AddRunTestButtons = function()
		{
			var dropdowns	= {};

			createVbox( 'ui_test_methods', 'UITest methods' );
				
			for(var method_name in self)
				if (self.hasOwnProperty(method_name) && typeof self[method_name] === 'function' && method_name.match(/_/gi)  )
					{
						var method_name_split	= method_name.replace(/\s*Test/g, '').replace(/(\w)([A-Z])/g, '$1 $2').split('_');
						var dropdown_name	= method_name_split[0].trim();
						
						if( ! dropdowns[dropdown_name] )
							dropdowns[dropdown_name] = [];
						
						dropdowns[dropdown_name].push({label: method_name_split[1].trim(), oncommand: 'UITest().'+method_name+'()', tooltip: 'UITest.'+method_name+'()'});
					}
				for(var dropdown in dropdowns)
					if (dropdowns.hasOwnProperty(dropdown))
						paneUI.append( '#ui_test_methods',
							paneUI.dropdown( dropdown, dropdowns[dropdown], dropdown )
						);
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
			setPaneUI();
			
			clearPane();
			
			this.TestControls_ClearConsole();

			AddRunTestButtons();
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