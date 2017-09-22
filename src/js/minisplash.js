/*
	minisplash.js - The Mini Unsplash Library
	Author : Matt Greenberg
*/

(function(window, document, undefined){

	/*
		DEFAULT CONSTRUCTOR
	*/
	function Minsplash(){
		this.API = 'https://api.unsplash.com/';
		this.clientId = '1b9b505c574eeaf4e4886e38a603eb5c9a4a7cf9cd46a9426d1ec0c9a5a1abd2';
	};

	/*
		Method Name : encodeParams()
		Description : Takes an object of key value pairs and returns and encoded URI component.
		@param params - Object - A list of key value pairs
		@returns - String - An encoded URI compontent
	*/
	Minsplash.prototype.encodeParams = function(params){
		var encodedString = '';
		for(var prop in params){
			if(params.hasOwnProperty(prop)){
				if(encodedString.length>0){
					encodedString += '&';
				}
				encodedString += encodeURI(prop + '=' + params[prop]);
			}
		}
		if(encodedString.length>0){
			encodedString += '&';
		}
		encodedString += 'client_id=' + this.clientId;
		return '?' + encodedString;
	};

	/*
		Method Name : GET()
		Description : Simple AJAX style GET request
		@param url - String - A Url you wish to GET
		@param next - Function - A callback function that runs when the request is done
	*/
	Minsplash.prototype.GET = function(url, next){
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.onload = function(){
			if(xhr.status === 200){
				var data = JSON.parse(xhr.responseText);
				next(data, xhr.status);
			} else {
				next(false, xhr.status);
			}
		};
		xhr.send();
	};

	/*
		Method Name : photoSearch
		Description : Search for photos
		@param term - String - A term to your watch to search for
		@param callback - Function - A callback that runs when the request is done
	*/
	Minsplash.prototype.photoSearch = function(term, callback){
		var uri = this.encodeParams({
			query: term
		});
		var Url = this.API + 'search/photos' + uri;
		this.GET(Url, callback);
	}

	/*
		Expose Unspalsh library object
	*/
	window.unsplash = new Minsplash();

})(window, document);