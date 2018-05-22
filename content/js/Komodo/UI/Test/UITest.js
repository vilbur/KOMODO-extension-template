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
		
		var prefs	= ko.extensions.TemplateExtension.Komodo.Prefs.prefix('ui-test-');
		var paneUI	= null;
		
		/** Test box selectors
		 */				
		var document_id	= '#TemplateExtension-'; 
		var cotrols_box_id	= '#generated_examples';
		var document_name	= ''; // 'pane|preferences'
		var document_selector	= '';	// E.G.: '#TemplateExtension-preferences'
		var cotrols_box	= ''; // final selector of test box element E.G.: '#TemplateExtension-preferences #generated_example'

		/*---------------------------------------
			UITest TEST CONTROLS
		-----------------------------------------
		*/
		/** Test controls init pane
		 */
		this.TestUiTest_ReinitPane = function()
		{
			this.init();
		};
		/** Test controls init pane
		 */
		this.TestUiTest_ClearConsole = function(clear_message='')
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
			VALUES TESTS
		-----------------------------------------
		*/
		/** Get values
		 */
		this.ValuesTest_getValuesFromDocumentTest = function()
		{
			console.log( paneUI.values() );	
		};
		/** Get values
		 */
		this.ValuesTest_getValuesFromElementTest = function()
		{
			console.log( paneUI.values( document_selector) );	
		}; 
		/** Get prefs values
		 */
		this.ValuesTest_setValueToElementTest = function()
		{
			//console.log('getPrefsValuesTest'); 
			console.log( paneUI.values( document_selector, 'only-prefs' ) );
		};
		/** Get prefs values
		 */
		this.ValuesTest_setValuesByObjectTest = function()
		{
			//console.log('getPrefsValuesTest'); 
			console.log( paneUI.values( document_selector, 'only-prefs' ) );
		};
		/*---------------------------------------
			PREFS TESTS
		-----------------------------------------
		*/
		/** PrefsTest_SavePrefs
		 */
		this.PrefsTest_SavePrefs = function()
		{
			var values	= paneUI.values( document_selector, 'only-prefs' );
			console.log( values );
			prefs.set(values);
		}; 
		/** PrefsTest_SavePrefs
		 */
		this.PrefsTest_LoadPrefs = function()
		{
			//var prefs	= ko.extensions.TemplateExtension.Komodo.Prefs.prefix('ui-test-');

			//var values_data	= paneUI.values( '#TemplateExtension-'+document_name, 'prefs' );
			var values	= prefs.get();
			console.log( values );
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
			var _document	= ko.extensions.TemplateExtension.Komodo.Document.get( document_name );
			
			paneUI = new ko.extensions.TemplateExtension.Komodo.UI().document(_document);
			
			return paneUI;
		};
		/** Clear pane
		 */
		var clearPane = function()
		{
			
			if( ! paneUI.exists(cotrols_box) )
				paneUI.append( document_selector,
					paneUI.create('hbox', {id: 'generated_examples', style:"padding:5px" })
				);
				
			//paneUI.$( document_selector +' hbox:first-of-type' ).empty();
			//paneUI.append( '#TemplateExtension-'+document_name, [
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
				paneUI.append( cotrols_box,
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
						var method_name_split	= method_name.replace(/^test|test$/gi, '').replace(/(\w)([A-Z])/g, '$1 $2').split('_');
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
		this.init = function(_document_name)
		{
			document_name	= _document_name;
			document_selector	= document_id + document_name; 
			cotrols_box	= document_selector +' '+cotrols_box_id; // final selector of test box element
		
			setPaneUI();
			
			clearPane();
			
			//this.TestUiTest_ClearConsole();

			AddRunTestButtons();
			/* INIT TESTS */
			//this.ControlTest_AddMainControls();
		};
 
		
	}
	return UITest;

})().apply(ko.extensions.TemplateExtension.UITest);


function UITest()
{
	return ko.extensions.TemplateExtension.UITest;
}

//setTimeout( function(){
	//ko.extensions.TemplateExtension.UITest.init('pane');
//}, 1000); 