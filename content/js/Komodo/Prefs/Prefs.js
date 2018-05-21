/** Prefs
 *
 * FULL LIST OF ko.prefs METHODS
 *		clone
 *		deletePref
 *		dump
 *		getAllPrefIds
 *		getBoolean
 *		getBooleanPref
 *		getDouble
 *		getDoublePref
 *		getLong
 *		getLongPref
 *		getPref
 *		getPrefIds
 *		getPrefType
 *		getString
 *		getStringPref
 *		hasBooleanPref
 *		hasDoublePref
 *		hasLongPref
 *		hasPref
 *		hasPrefHere
 *		hasStringPref
 *		id
 *		inheritFrom
 *		isVital
 *		parent
 *		prefObserverService
 *		QueryInterface
 *		reset
 *		serialize
 *		serializeToFile
 *		serializeToFileFast 
 *		setBoolean
 *		setBooleanPref
 *		setDouble
 *		setDoublePref
 *		setLong
 *		setLongPref
 *		setNonVital
 *		setPref
 *		setString
 *		setStringPref
 *		setValidation
 *		update
 *		validateLong
 *		validateString
*/
(function() 
{
	function Prefs()
	{ 
		var prefs	= require("ko/prefs");
		var self	= this;
		//var prefs	= ko.prefs ? ko.prefs : require("ko/prefs");
		//var prefs	= ko.prefs;		
		//var prefs	= Components.classes['@activestate.com/koPrefService;1'].getService(Components.interfaces.koIPrefService).prefs;
		
		var pref_types	= ['String', 'Boolean', 'Long', 'Double'];
 
		/** test
		 */ 
		this.test = function()
		{
			alert( 'Prefs.test()' );
		};
		
		/**   
		 */
		this.set = (function(key, value)
		{
			var type = typeof value;

			if( type==='object' )
				value = JSON.stringify(value);
			
			if ( type==="number" || type==='string' && value.match( /^\d+(\.\d+)?$/) ){
				if(value == Math.floor(value))
					prefs.setLong(key, value );
					
				else
					prefs.setDouble(key, value);
						
			}else if ( type=="boolean")
				prefs.setBoolean( key,	value );
			
			else
				prefs.setString( key,	value );
		});
		/**  
		 */
		this.get = (function(key, value_default)
		{
			/** Get string or object\array value 
			 *	@return	string|array|object  
			 */
			this.getString = function()
			{
				//console.log('prefs.getString()');
				if( ! prefs.hasStringPref(key) )
					return; 
				
				var value = prefs.getString(key);
				
				if( ! value.match(/^[{\[]/) )
					return value;
				
				return JSON.parse(value);

			}; 
			this.getLong = function()
			{
				//console.log('prefs.getLong()');
				if( prefs.hasLongPref(key) )
					return prefs.getLong(key);
			};
			this.getDouble = function()
			{
				//console.log('prefs.getLong()');
				if( prefs.hasDoublePref(key) )
					return prefs.getDouble(key);
			}; 
			this.getBoolean = function()
			{
				//console.log('prefs.getBoolean()');
				if( prefs.hasBooleanPref(key) )
					return prefs.getBoolean(key);
			};
			
			return (function()
			{
				for(let i=0; i<pref_types.length;i++)
				{
					var value	= self['get'+pref_types[i]]();
					//console.log( typeof value );
					if(typeof value !== 'undefined')
						return value;
				}
				//console.log(  'value_default: ' + value_default );
				return value_default;
			})(); 
		
		});
		/** delete
		 */
		this.delete = function(key)
		{
			if( prefs.hasPref(key) )
				prefs.deletePref(key);
		}; 
		
		/** test
		 */
		this.test = function()
		{
			alert( 'Prefs.test()' ); 
		}; 
		
	}
	return Prefs;

})().apply(ko.extensions.TemplateExtension.Komodo.Prefs);