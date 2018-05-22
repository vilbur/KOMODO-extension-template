/** Test controls in pane
 *
 * For run UITest in UI place in *xul file buttons with oncommand 
 *		pane.xul:	oncommand="ko.extensions.TemplateExtension.UITest.init('pane')";
 *		preferences.xul:	oncommand="ko.windowManager.getMainWindow().ko.extensions.TemplateExtension.UITest.init('preferences')";
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
		var controls_box_id	= 'generated_examples';
		var main_element	= '';	// E.G.: '#TemplateExtension-preferences'
		var controls_box	= ''; // final selector of test box element E.G.: '#TemplateExtension-preferences #generated_example'

		/*---------------------------------------
			UITest TEST CONTROLS
		-----------------------------------------
		*/
		/** Test controls init pane
		 */
		this.InitUiTest_UiTest_dd = function()
		{
			//alert( 'initControlTestBox' );  
			initControlTestBox();
			//this.init();
			AddRunTestButtons();

		};
		/** Test controls init pane
		 */
		this.ClearConsole_UiTest_dd = function(clear_message='')
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
		this.AddExistingControls_ControlTest_dd = function()
		{
			createVbox('box_controls_exists', 'Controls exist');

			var control	= paneUI.create('caption',	{label:	'ControlsExistsTest'});
			
			//console.log( control );
			paneUI.append( '#this.should_not_exists_parent_dd',	control );
			paneUI.append( '#box_controls_exists',	control );
		};
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
		
		/** Create pref set
		 */
		this.CreatePrefset_ControlTest_dd = function()
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
		this.getValuesFromElementTest_ValuesTest_dd = function()
		{
			console.log( paneUI.values( main_element) );	
		}; 
		/** Get prefs values
		 */
		this.setValueToElementTest_ValuesTest_dd = function()
		{
			//console.log('getPrefsValuesTest'); 
			console.log( paneUI.values( main_element, 'only-prefs' ) );
		};
		/** Get prefs values
		 */
		this.setValuesByObjectTest_ValuesTest_dd = function()
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
		var setPaneUI = function(_document)
		{
			//var _document	= ko.extensions.TemplateExtension.Komodo.Document.get( document_name );
			//console.log('setPaneUI'); 
			//console.log( _document );
			paneUI = new ko.extensions.TemplateExtension.Komodo.UI().document(_document);
			
			return paneUI;
		};
		/** Clear pane
		 */
		var initControlTestBox = function()
		{
			controls_box = main_element + ' #' + controls_box_id;
			//console.log(  'controls_box: ' + controls_box );
			
			if( ! paneUI.exists(controls_box) )
				paneUI.append( main_element,
					paneUI.create('hbox', {id: controls_box_id, style:"padding:5px" })
				);
				
			paneUI.$( controls_box  ).empty();
		}; 

		/** Create vbox
		 */
		var createVbox = function(id, caption=null)
		{
			//console.log(  'createVbox: ' + id );
			var selector	= '#'+id;
			
			//paneUI.append( main_element,
			//		paneUI.create( 'caption', {label: 'CAPTION TEST'} )
			//	);
			//console.log(  'selector: ' + selector );
			if( paneUI.exists(selector) )
				paneUI.$(selector).empty();
			
			else
				paneUI.append( controls_box,
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
						var dropdown_name	= method_name_split[1].trim();
						
						if( ! dropdowns[dropdown_name] )
							dropdowns[dropdown_name] = [];
						
						dropdowns[dropdown_name].push({label: method_name_split[0].trim(), oncommand: 'UITest().'+method_name+'()', tooltip: 'UITest.'+method_name+'()'});
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
		
		/** Find page element or first box|hbox|vbox in preferences window
		 * page or 'window > box' must has id attribute
		 */
		var getMainElementId = function(_document)
		{
			//console.log( _document );
			/** Find page or window in document 
			 */
			var page_or_window = (function()
			{
				for(let i=0; i<_document.childNodes.length;i++)
					if( _document.childNodes[i].nodeName.match(/window|page/gi)  )
						return _document.childNodes[i];
			})(); 
			//console.log( page_or_window );
			/** Find main box
			 */
			var findMainBoxId = function()
			{
				for(let i=0; i<page_or_window.childNodes.length;i++)
					if( page_or_window.childNodes[i].nodeName.match(/.box/gi) && page_or_window.childNodes[i].hasAttribute('id') )
						return page_or_window.childNodes[i].getAttribute('id');
			}; 
			
			return '#'+( page_or_window.nodeName==='page' ? page_or_window.getAttribute('id') : findMainBoxId() );
		};
		
		/** init
		 */
		this.init = function(_document_name, element)
		{
			main_element = getMainElementId(element.ownerDocument);

			setPaneUI(element.ownerDocument);
			
			paneUI.delete(element);

			initControlTestBox();
			
			this.ClearConsole_UiTest_dd();

			AddRunTestButtons();
			
			/* INIT TESTS */
			this.AddMainControls_ControlTest_dd();
		};
 
		
	}
	return UITest;

})().apply(ko.extensions.TemplateExtension.UITest);


function UITest()
{
	return ko.windowManager.getMainWindow().ko.extensions.TemplateExtension.UITest;
}

//setTimeout( function(){
	//ko.extensions.TemplateExtension.UITest.init('pane');
//}, 1000); 