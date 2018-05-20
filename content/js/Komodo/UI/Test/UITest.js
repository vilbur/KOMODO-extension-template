/** Test controls in pane
 *
 */
ko.extensions.TemplateExtension.UITest = {};
(function()
{
	function UITest()
	{
		var self	= this;
		var paneUI	= null;

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
		
		/*---------------------------------------
			VALUES & PREFS TEST
		-----------------------------------------
		*/
		/** Get values
		 */
		this.PrefsTest_getAllValuesTest = function()
		{
			console.log('getAllValuesTest'); 
			console.log( paneUI.values( '#TemplateExtension-pane') );	
		}; 
		/** Get prefs values
		 */
		this.PrefsTest_getPrefsValuesTest = function()
		{
			console.log('getPrefsValuesTest'); 
			console.log( paneUI.values( '#TemplateExtension-pane', 'prefs' ) );
		};
		/** PrefsTest_SavePrefs
		 */
		this.PrefsTest_SavePrefs = function()
		{
			var values	= paneUI.values( '#TemplateExtension-pane', 'prefs' ) ;
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
			if( paneUI.exists('#'+id) )
				return;
					
			paneUI.append( '#TemplateExtension-pane > hbox',
				paneUI.create('vbox', {id: id, style:"padding:5px" })
			);
			
			if( caption )
			paneUI.append( '#'+id,
				paneUI.create( 'caption', {label: caption} )
			);
		}; 
		/**  Loop this object and get functions wich has format of name: 'UiBoxName_ButtonName'
		 */
		var AddRunTestButtons = function()
		{
			for(var key in self)
				if (self.hasOwnProperty(key) && typeof self[key] === 'function' && key.match(/_/gi)  )
					{
						var key_split	= key.split('_');
						var box_id	=  key_split[0].toLowerCase();

						createVbox( box_id, key_split[0].replace(/(\w)([A-Z])/g, '$1 $2') );
						
						paneUI.append( '#'+box_id, [
							paneUI.create('button',	{label:	key_split[1].replace(/\s*Test/g, '').replace(/(\w)([A-Z])/g, '$1 $2'), oncommand: 'UITest().'+key+'()', tooltip:key+'()'}),
						]);
					}
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
			setPaneUI();
			
			clearPane();
			
			consoleClear();

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