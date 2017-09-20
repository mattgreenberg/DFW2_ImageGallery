/*
	minisplash.js - The Mini Unsplash Library
	Author : Matt Greenberg
*/

var unspalsh = (function(){

	/*
		DEFAULT CONSTRUCTOR
	*/
	function Unspalsh(){
		this.API = 'https://api.unsplash.com/';
	};

	/*
		Method Name : encodeParams()
		Description : 
		@param params - Object - A list of key value pairs
		@returns - String - An encoded URI compontent
	*/
	Unspalsh.prototype.encodeParams = function(params){
		var encodedString = '';
		for(var prop in params){
			if(params.hasOwnProperty(prop)){
				if(encodedString.length>0){
					encodedString += '&';
				}
				encodedString += encodeURI(prop + '=' + params[prop]);
			}
		}
		return encodedString;
	};

	/*
		Return a 'new' Unspalsh library object
	*/
	return new Unspalsh();

});