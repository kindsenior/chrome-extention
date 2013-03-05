function ylistrandom(youtube) {
		// document.write("hoge");
		var entries = youtube.feed.entry;
		var url = [];
		var video_title = [];
		for (var i = 0; i < entries.length; ++i) {
		// for (var i = 0; i < 1; ++i) {
				// url.push(entries[i].media$group.media$player[0].url.substr(31,11));
				document.write(entries[i].title.$t);
				document.write("</br>");
				// var list_url = entries[i].content.src + '&alt=json-in-script&callback=?';
				var list_url = entries[i].content.src + '&alt=json&callback=?';
				document.write(list_url);
				document.write("</br>");

				// $(document).ready(function() {
				$.ajaxSetup({async: false});
				$.getJSON(list_url,
									function(data) {
											var video_entries = data.feed.entry;
											for ( var j = 0; j < video_entries.length; ++j){
													// document.write(video_entries[j].title.$t);
													// document.write("</br>");
													// alert(video_entries[j].title.$t);
													// video_title.push(video_entries[j].title.$t);
											}
											video_title.push("hoge");
									});
				// });
				$.ajaxSetup({async: true});
				document.write(video_title[0]);
				$.each( video_title, function(i, val){
						document.write(val);
				});
				document.write("</br>");
		}

		// document.ready( function() {
		// document.write("fuga ");
		// $.getJSON('http://gdata.youtube.com/feeds/api/playlists/PLRBIThknUR5njNuJjtQ9Y_g8ETDdkr9CT?v=2&alt=json&callback=?',
		// 					function(data) {
		// 							var video_entries = data.feed.entry;
		// 							document.write("hoge");
		// 							for ( var j = 0; j < video_entries.length; ++j){
		// 									document.write(video_entries[j].title.$t);
		// 							}
		// 					});
		// });


		var src= url[Math.floor(Math.random()*url.length)];
		// document.write('<embed src="http://www.youtube.com/v/' + src + '&hl=ja_JP&fs=1&" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="200" height="165"></embed>')
}

