/*
	Load the images
	by : Matthew Greenberg
*/

/*
	Simple bracket like template engine
*/
function bracket(template, data){
	var html = template;
	for(var x in data){
		var re = "{{\\s?" + x + "\\s?}}";
		html = html.replace(new RegExp(re, "ig"), data[x]);
	}
	return html;
}

// template
var picStruct = '<picture><source media="(max-width:300px)" srcset="{{small}}"/><source media="(max-width:600px)" srcset="{{medium}}"/><source media="(min-width:601px)" srcset="{{large}}"/><img src="{{small}}" alt="{{desc}}"/></picture>';

window.addEventListener('load',function(){

	unsplash.photoSearch('dog', function(data){
		
		if(data){

			var pics = data.results;
			var content = document.getElementById('content');
			for(var i=0; i<9; i++){

				var ele = pics[i].urls;
				content.insertAdjacentHTML('afterbegin', bracket(picStruct,{
					small: ele.small,
					medium: ele.regular,
					large: ele.full,
					desc: 'Photo of dog by ' + pics[i].user.name
				}));

			};

		};

	});

});