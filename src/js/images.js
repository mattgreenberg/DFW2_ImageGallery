/*
	Main script to load the images
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

/*
	Template div.frame
*/
var pframe = '<div class="frame" onclick=\'location.href=\"{{loc}}\";\'><picture><source media="(max-width:300px)" srcset="{{small}}"/><source media="(max-width:600px)" srcset="{{medium}}"/><source media="(min-width:601px)" srcset="{{large}}"/><img src="{{small}}" alt="{{desc}}"/></picture><div class="overlay"><h2>{{by}}</h2><p class="likes">{{likes}}</p></div></div>';

/*
	Window load event
*/
window.addEventListener('load',function(){

	var page = Math.floor(Math.random()*50)+1;
	unsplash.photoSearch('dog', page, function(data){
		
		if(data){

			console.dir(data);
			var pics = data.results;
			var content = document.getElementById('content');
			for(var i=0; i<9; i++){

				var ele = pics[i].urls;
				content.insertAdjacentHTML('afterbegin', bracket(pframe,{
					small: ele.small,
					medium: ele.regular,
					large: ele.full,
					desc: 'Photo of dog by ' + pics[i].user.name,
					by: pics[i].user.name,
					likes: pics[i].likes,
					loc: pics[i].user.links.html
				}));
				console.log(pics[i].user.links.html);

			};

		};

	});

});