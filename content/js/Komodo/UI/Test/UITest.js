/** Test controls in pane
 *
 * Steps how to init in UI in documentation of method 'UITest.init()'
 *
 * Methods with suffix '_btn' became buttons in UI.	Methods with same prefix belongs to same section <box>
 * Methods with suffix '_dd'  became Items in dropdoen menu.	Methods with same prefix belongs to same dropdown menu
 *
 */
ko.extensions.TemplateExtension.UITest = {};
(function()
{
	function UITest()
	{
		var $	= require('ko/dom');
		var self	= this;
		
		var prefs	= ko.extensions.TemplateExtension.Komodo.Prefs.prefset('ui-test');
		var paneUI	= null;
		
		/** Test box selectors
		 */				
		var controls_box_id	= 'generated_examples';
		var main_element	= '';	// E.G.: '#TemplateExtension-preferences'
		var controls_box	= ''; // final selector of test box element E.G.: '#TemplateExtension-preferences #generated_example'

		/*---------------------------------------
			UITest TEST CONTROLS
		-----------------------------------------
		*/
		/** Test controls init pane
		 */
		this.InitUiTest_UiTest_btn = function()
		{
			console.log( 'InitUiTest_UiTest_btn' );  
			initControlTestBox();
			//this.init();
			AddUiTestButtons();
			
			/* INIT TESTS */
			this.AddMainControls_ControlTest_dd();
		};
		/** Test controls init pane
		 */
		this.ClearConsole_UiTest_btn = function(clear_message='')
		{
			var consoleEL = ko.windowManager.getMainWindow().document.getElementById('console-widget');
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
		/** Add controls
		 */
		this.AddMainControls_ControlTest_dd = function()
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
		
		/** Create controlset
		 */
		this.CreateControlset_ControlTest_dd = function()
		{
			createVbox('ui_test_controlset_wrapper','', {caption: "Prefset test", template: '["checkbox", "textbox"]'});
			
			var perfset_values   = {  
									'Container A':{  
										'Control A':    false,  
										'Enter Text A': 'Foo Text A',  
									},  
									'Container B':{  
										'Control B':    true,  
										'Enter Text B': '',  
									}
								};
			paneUI.controlset()
					.element( '#ui_test_controlset_wrapper' )
					.load( perfset_values)
					.select(0);

		};
		/** Create controlset
		 */
		this.CreateControlsetAdjustable_ControlTest_dd = function()
		{
			createVbox('ui_test_controlset_adjustable','', {caption: "Prefset Adjustable", template: '{"checkbox":{"label":"Checkbox"}, "textbox":{"label":"Enter Text"}}'});
			
			//var perfset_template = {'Prefset test': ['checkbox', 'textbox']};
			var perfset_values   = {  
									'Container A':{  
										'Checkbox':    false,  
										'Enter Text': 'A',  
									},  
									'Container B':{  
										'Checkbox':    true,  
										'Enter Text': 'B',  
									},  
									'Container C':{  
										'Checkbox':    true,  
										'Enter Text': 'C',  
									}
									
								};
								
			paneUI.controlset()
					.element( '#ui_test_controlset_adjustable' )
					.load( perfset_values)
					.select(1);
		};

		/** Create pref set
		 */
		this.CreateDopdown_ControlTest_dd = function()
		{
			createVbox('ui_test_dropdown','Dropdown');
			
			paneUI.append('#ui_test_dropdown',
				paneUI.dropdown('#dropdown_test',	{'Item A':'alert("A")','Item B':'alert("B")'})
			);
			
			paneUI.append('#ui_test_dropdown',
				paneUI.dropdown('#dropdown_text_test', {'Item A':{tooltip: 'Item A'},'Item B':{tooltip: 'Item B'}}, 'Attributes & label')
			);
		};
		/** Try add control to element which not exist
		 * It throws error
		 *	
		 */
		this.AddExistingControls_ControlTest_dd = function()
		{
			createVbox('box_controls_exists', 'Controls exist');

			var control	= paneUI.create('caption',	{label:	'ControlsExistsTest'});
			
			//console.log( control );
			paneUI.append( '#this.should_not_exists_parent_dd',	control );
			paneUI.append( '#box_controls_exists',	control );
		};
		/*---------------------------------------
			VALUES TESTS
		-----------------------------------------
		*/
		/** Get values
		 */
		this.getValuesFromDocumentTest_ValuesTest_dd = function()
		{
			console.log( paneUI.values() );	
		};
		/** Get values
		 */
		this.getValuesFromControlTest_ValuesTest_dd = function()
		{
			console.log( paneUI.value( '#checkbox_1' ) );	
		};
		/** Get values
		 */
		this.getValuesFromMainElementTest_ValuesTest_dd = function()
		{
			console.log( paneUI.values( main_element ) );	
		}; 
		/** Get prefs values
		 */
		this.getPrefsValuesFromMainElementTest_ValuesTest_dd = function()
		{
			//console.log('getPrefsValuesTest'); 
			console.log( paneUI.values( main_element, 'only-prefs' ) );
		};

		/*---------------------------------------
			PREFS TESTS
		-----------------------------------------
		*/
		/** PrefsTest_SavePrefs
		 */
		this.SavePrefs_PrefsTest_dd = function()
		{
			var values	= paneUI.values( main_element, 'only-prefs' );
			console.log( values );
			prefs.set(values);
		}; 
		/** PrefsTest_SavePrefs
		 */
		this.LoadPrefs_PrefsTest_dd = function()
		{
			//console.log('PrefsTest_btn()'); 
			var values	= prefs.get();
			console.log( values );
			paneUI.values( values );
		}; 

		/*---------------------------------------
			PREPARE TEST CLASS AND PANE UI
		-----------------------------------------
		*/
		/** Pane ui
		 * @return	object	UI class in pane
		 */
		var setPaneUI = function(_document)
		{
			console.log('UITest.setPaneUI()' + _document.location.href); 
			paneUI = new ko.extensions.TemplateExtension.Komodo.UI().document(_document);
			
			return paneUI;
		};
		/** Clear pane
		 */
		var initControlTestBox = function()
		{
			controls_box = main_element + ' #' + controls_box_id;
			console.log(  'initControlTestBox: ' + controls_box );
			
			paneUI.$( controls_box  ).delete();
			
			if( ! paneUI.exists(controls_box) )
				paneUI.append( main_element,
					paneUI.create('hbox', {id: controls_box_id, style:"padding:5px; border: 1px solid lightblue" })
				);
				
			//paneUI.$( controls_box  ).empty();
		}; 

		/** Create vbox
		 */
		var createVbox = function(id, caption=null, attributes={})
		{

			var selector	= '#'+id;
			
			attributes.id	= id;
			attributes.style	= "padding:5px";
			
			if( paneUI.exists(selector) )
				paneUI.$(selector).empty();
			
			else
				paneUI.append( controls_box,
					paneUI.create('vbox', attributes )
				);
			
			if( caption )
				paneUI.append( selector,
					paneUI.create( 'caption', caption )
				);
		}; 
		/**  Loop this object and get functions wich has format of name: 'UiBoxName_ButtonName'
		 */
		var AddUiTestButtons = function()
		{
			var controls	= {button:[], dropdown:[]};

			for(var method_name in self)
				if (self.hasOwnProperty(method_name) && typeof self[method_name] === 'function' && method_name.match(/_/gi)  )
				{
					var control_type	= /_(btn|dd)/gi.exec(method_name).pop() === 'dd' ? 'dropdown' : 'button';
					var method_name_split	= method_name.replace(/^test|test$/gi, '').replace(/(\w)([A-Z])/g, '$1 $2').split('_');
					var method_prefix	= method_name_split[1].trim();
					var attributes	= {label: method_name_split[0].trim(), oncommand: 'UITest().'+method_name+'()', tooltip: 'UITest.'+method_name+'()'};
					
					
					if( ! controls[control_type][method_prefix] )
						controls[control_type][method_prefix] = [];
					
					controls[control_type][method_prefix].push(attributes);
					
				}
			/** Add btunttons
			 */
			var addBtunttons = (function()
			{

				for(var control_box_label in controls.button)
					if (controls.button.hasOwnProperty(control_box_label))
					{
						var control_box	= control_box_label.replace(/\s/g, '_').toLowerCase();
						
						createVbox( control_box, control_box_label );
						
						paneUI.append( '#'+control_box,
							paneUI.create( 'button', controls.button[control_box_label] )
						);
					}
						
			})(); 
			
			/** Add dropdowns
			 */
			var addDropdowns = (function()
			{
				createVbox( 'ui_test_methods', 'UITest methods' );

				for(var dropdown in controls.dropdown)
					if (controls.dropdown.hasOwnProperty(dropdown))
						paneUI.append( '#ui_test_methods',
							paneUI.dropdown( dropdown, controls.dropdown[dropdown], dropdown )
						);
			})(); 
		};

		/** Remove controls
		 *  MUST BE EXECUTED BEFORE TEST
		 */
		var removeControls = function()
		{
			paneUI.$( '#extension_test_controls' ).empty();
			paneUI.$( '#ui_test_controls' ).empty();			
		};
		
		/** Find page element or first box|hbox|vbox in preferences window
		 */
		var getMainElementId = function(element)
		{
			var _document	= element.ownerDocument;
			
			if( element.parentNode.hasAttribute('id') )
				return '#'+ element.parentNode.getAttribute('id');
			
			/** Find page or window in document 
			 */
			var page_or_window = (function()
			{
				for(let i=0; i<_document.childNodes.length;i++)
					if( _document.childNodes[i].nodeName.match(/window|page/gi)  )
						return _document.childNodes[i];
			})(); 
			/** Find main box
			 * If not exits, then create 
			 */
			var findMainBoxId = function()
			{
				for(let i=0; i<page_or_window.childNodes.length;i++)
					if( page_or_window.childNodes[i].nodeName.match(/.box/gi) && page_or_window.childNodes[i].hasAttribute('id') )
						return page_or_window.childNodes[i].getAttribute('id');
					
				/* Create box if not found */
				var vbox	= _document.createElement("vbox");
				vbox.setAttribute("id", "UITest-preference");
				page_or_window.appendChild( vbox );
				return 'UITest-preference';
			}; 
			
			return '#'+( page_or_window.nodeName==='page' ? page_or_window.getAttribute('id') : findMainBoxId() );
		};
		
		/** init UITest controls with button
		 *
		 * @example markup in pane.xul or preferences.xul
		 * 
		 * 	<vbox id="UiTest-pane"><!-- UiTest wrapper with id attribute - Not required, but bettwer if exists -->
		 * 		<button 
		 * 			label="UITest.ini()"
		 * 			style="border:1px solid lightblue"
		 * 			oncommand="ko.windowManager.getMainWindow().ko.extensions.TemplateExtension.UITest.init(this);"/>
		 * 	</vbox>
		 *
		 */
		this.init = function(init_button)
		{
			main_element = getMainElementId(init_button);

			setPaneUI(init_button.ownerDocument);
			
			paneUI.delete(init_button);

			initControlTestBox();
			
			this.ClearConsole_UiTest_btn();

			AddUiTestButtons();
			
			/* INIT TESTS */
			this.AddMainControls_ControlTest_dd();
			//this.CreateControlset_ControlTest_dd();
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

/** Acces to class from UI 
 *	
 */
function UITest()
{
	return ko.windowManager.getMainWindow().ko.extensions.TemplateExtension.UITest;
}