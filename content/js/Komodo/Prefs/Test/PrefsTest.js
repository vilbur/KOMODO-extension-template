{"keyboard_shortcut":"","name":"Prefs","language":"JavaScript","trigger_enabled":false,"value":["/** Prefs\r","*/\r","(function()\r","{\r","\tfunction Prefs()\r","\t{ \r","\t\t//var prefs\t= require(\"ko/prefs\");\r","\t\tvar prefs\t= ko.prefs;\t\t\r","\t\tvar pref_types\t= ['String', 'Long', 'Boolean'];\r"," \r","\t\t/** test\r","\t\t */ \r","\t\tthis.test = function()\r","\t\t{\r","\t\t\talert( 'Prefs.test()' );\r","\t\t};\r","\t\t/**  \r","\t\t */\r","\t\tthis.setPrefs = (function(key, value)\r","\t\t{\r","\t\t\tvar type = typeof value;\r","\t\t\t\r","\t\t\t if ( type===\"number\" || /^\\d+(\\.\\d+)?$/.match(value) )\r","\t\t\t\tprefs.setLong( key,\tNumber(value));\r","\t\t\r","\t\t\telse if ( type==\"boolean\")\r","\t\t\t\tprefs.setBoolean( key,\tvalue );\r","\t\t\t\r","\t\t\telse\r","\t\t\t\tprefs.setString( key,\tvalue);\r","\t\t});\r","\t\t/**  \r","\t\t */\r","\t\tthis.getPrefs = (function(key, value_default)\r","\t\t{\r","\t\t\t\r","\t\t\tthis.getString = function()\r","\t\t\t{\r","\t\t\t\treturn prefs.getString(key);\r","\t\t\t}; \r","\t\t\tthis.getLong = function()\r","\t\t\t{\r","\t\t\t\treturn prefs.getLong(key);\r","\t\t\t}; \r","\t\t\tthis.getBoolean = function()\r","\t\t\t{\r","\t\t\t\treturn prefs.getBoolean(key);\r","\t\t\t};\r","\t\t\t\r","\t\t\treturn function()\r","\t\t\t{\r","\t\t\t\tfor(let i=0; i<pref_types.length;i++)\r","\t\t\t\t{\r","\t\t\t\t\tvar value\t= this['get'+pref_types[i]];\r","\t\t\t\t\tif(typeof value !== 'undefined')\r","\t\t\t\t\t\treturn value;\r","\t\t\t\t}\r","\t\t\t\treturn value_default;\r","\t\t\t}; \r","\t\t\r","\t\t});\r","\t\t\r","\t}\r","\treturn Prefs;\r","\r","})().apply(ko.extensions.TemplateExtension.Komodo.Prefs);"],"version":"1.0.12","rank":100,"async":false,"type":"macro","trigger":"trigger_postopen"}