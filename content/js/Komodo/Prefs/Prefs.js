/** Get\set\delete preferece data
 * 
 * NOTE: !!! Get values from prefs works after restart of Komodo after first setting
 * 
 * @method	self	prefix( string prefix )	Set prefix for all keys
 * 
 * @method	void	set( string|object param1[, mixed param2] )	Set prefs values
 * @method	void	get( string|array|object param1[, mixed param2] )	Get prefs values
 * @method	void	delete( string|array|object param1 )	Delete prefs
 * 
 */
(function() 
{
	function Prefs()
	{ 
		var prefs	= require("ko/prefs");
		var self	= this;
		var pref_types	= ['String', 'Boolean', 'Long', 'Double'];
		var prefix	= '';		
		//var prefs	= ko.prefs ? ko.prefs : require("ko/prefs");
	
		/** Set prefix for every key
		 * Allow to all prefs keys to be prefixed
		 *
		 * @param	string	prefix
		 * @return	self 
		 */
		this.prefix = function(_prefix='')
		{
			prefix = _prefix;
			return this;
		};
		/** Set prefs values
		 * @param	string|object	param1	Key or object with keys & values {key:'value'} for mass setting
		 * @param	mixed	param2	Value if param1 is not object
		 *
		 * @example set('key')	// set by key
		 * @example set({key1:'default', key2:'default'})	// set by object keys
		 */
		this.set = function(param1, param2=null)
		{
			call('set', param1, param2 );
		};
		/** Get prefs values
		 * 
		 * @param	null|string|array|object	param1	Key, array or object of keys for mass getting, if null then get all prefs with prefix
		 * @param 	mixed	param2	Default value if param1 is not object
		 * return	mixed
		 *
		 * @example get()	// get by all ids with prefix
		 * @example get('key')	// get by key
		 * @example get(['key1', 'key2'])	// get by array of keys
		 * @example get({key1:'default', key2:'default'})	// get by object keys	
		 * 
		 */
		this.get = function(param1=null, param2=null)
		{
			if( ! param1 )
				return this.get(getIdsByPrefix());
			
			if( Array.isArray(param1)  )
				param1 = getObjectOfKeys(param1);
			
			return call('get', param1, param2 );			
		};
		/** Delete prefs
		 * @param	string|object	param1	Key, array or object with keys & values {key:'value'} for mass setting, if null then delete all prefs with prefix
		 *
		 * @example delete()	// delete by all ids with prefix
		 * @example delete('key')	// delete by key
		 * @example delete(['key1', 'key2'])	// delete by array of keys
		 * @example delete({key1:'', key2:''})	// delete by object keys	
		 */
		this.delete = function(param1=null)
		{
			if( ! param1 )
				return this.delete(getIdsByPrefix());
			
			if( Array.isArray(param1)  )
				param1 = getObjectOfKeys(param1);
			
			call( 'delete', param1 );
		};
		
		/** Call method
		 */
		var call = function(method, param1, param2=null)
		{
			var result	= {};

			/** Call with prefix
			 */
			var callWithPrefix = function(key, value)
			{
				return self[method+'Pref']( prefix + key, value );
			}; 
			
			if( typeof param1 === 'object' ){
				for(var key in param1)
					if (param1.hasOwnProperty(key))
						result[key] = callWithPrefix( key, param1[key] );
			}else
				return callWithPrefix( param1, param2 );

			return result;
		}; 
		/*---------------------------------------
			GET\SET\DELETE pref per key
		-----------------------------------------
		*/
		/** Set single pref
		 */
		this.setPref = function(key, value)
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
		};
		/** Get single pref
		 */
		this.getPref = function(key, value_default)
		{
			/** Get string or object\array value 
			 *	@return	string|array|object  
			 */
			this.getString = function()
			{
				if( ! prefs.hasStringPref(key) )
					return; 
				
				var value = prefs.getString(key);
				
				if( ! value.match(/^[{\[]/) )
					return value;
				
				return JSON.parse(value);

			}; 
			this.getLong = function()
			{
				if( prefs.hasLongPref(key) )
					return prefs.getLong(key);
			};
			this.getDouble = function()
			{
				if( prefs.hasDoublePref(key) )
					return prefs.getDouble(key);
			}; 
			this.getBoolean = function()
			{
				if( prefs.hasBooleanPref(key) )
					return prefs.getBoolean(key);
			};
			
			return (function()
			{
				for(let i=0; i<pref_types.length;i++)
				{
					var value	= self['get'+pref_types[i]]();

					if(typeof value !== 'undefined')
						return value;
				}
				return value_default;
			})(); 
		
		};
		/** Delete single pref
		 */
		this.deletePref = function(key)
		{
			if( prefs.hasPref(key) )
				prefs.deletePref(key);
		};
		/*---------------------------------------
			PRIVATE
		-----------------------------------------
		*/
		/** Get all ids from prefs which match prefix
		 * @return	array Array of ids without prefix (prefix is added in this.get function)
		 * 
		 */
		var getIdsByPrefix = function()
		{
			var string	= prefs.dump();
			var matches_all	= [];
			var last_match_end	= 0; // end position of last match
		
			while((match = new RegExp( ''+prefix + '([^\\s]+)', 'g').exec(string)) !== null)
			{
				string	= string.substring(match.index + match[0].length);
				match.index	= last_match_end = last_match_end + match.index + match[0].length;
				matches_all.push(match.pop());
			}
			return matches_all;
		};  
		/** Convert array to object keys
		 *  @example  getObjectOfKeys(['key1', 'key2']) // return {key1:'', key2:''}
		 *
		 * @return	object	
		 */
		var getObjectOfKeys = function(array)
		{
			var keys	= {}; 
			for(let i=0; i<array.length;i++)
				keys[array[i]] = '';
			
			return keys;
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


/* NOTES:
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







