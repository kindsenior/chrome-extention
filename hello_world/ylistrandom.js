function ylistrandom(youtube) {
		// document.write("hoge");
		var entries = youtube.feed.entry;
		var url = [];
		var video_title = [];
		var max_results = 50;
		var turn_num;
		for (var i = 0; i < entries.length; ++i) {
				// for (var i = 0; i < 3; ++i) {
				document.write(entries[i].title.$t);
				document.write("</br>");
				// var list_url = entries[i].content.src + '&alt=json-in-script&callback=?';
				// var list_url = entries[i].content.src + '&alt=json&callback=?';
				var list_url = entries[i].content.src + '&alt=json';
				document.write(list_url);
				document.write("</br>");

				video_titles = [];
				video_urls = [];

				// 50個ずつしか動画情報を取得できないので先に再生リスト内の全動画数からターン数を計算
				$.ajax({
						type: "GET",
						url: list_url,
						async: false,
						success: function(data){
								turn_num = Math.ceil( Number(data.feed.openSearch$totalResults.$t)/max_results );
						},
						error: function(XMLHttpRequest,textStatus,errorThrown){ document.write(textStatus); }
				});
				document.write(String(turn_num)); document.write("</br>");

				// 全動画情報取得
				for( var turn = 0; turn < turn_num; ++turn ){
						list_url = entries[i].content.src + '&alt=json' + '&max-results=' + String(max_results)
								+ '&start-index=' + String(max_results*turn+1);
						$.ajax({
								type: "GET",
								url: list_url,
								async: false,
								success: function(data) {
										var video_entries = data.feed.entry;
										// document.write(data.feed.openSearch$totalResults.$t);
										// document.write("</br>");
										for ( var j = 0; j < video_entries.length; ++j ){
												// document.write(video_entries[j].title.$t);
												// document.write(video_entries[j].content.src);
												// document.write("</br>");

												// 要素がなかった場合の例外処理が必要
												video_titles.push(video_entries[j].title.$t);
												video_urls.push(video_entries[j].content.src);
										}
								},
								error: function(XMLHttpRequest,textStatus,errorThrown){
										document.write(textStatus);
								}
						});
				}

				$.each( video_urls, function(i, val){
						document.write(val);
						document.write("</br>");
				});


				document.write("</br>");
		}

		// var src= url[Math.floor(Math.random()*url.length)];
		document.write(video_urls[Math.floor(Math.random()*video_urls.length)]);
		// document.write('<embed src="http://www.youtube.com/v/' + src + '&hl=ja_JP&fs=1&" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="200" height="165"></embed>')
}

// $(document).ready(function() {
// $.ajaxSetup({async: false});
// $.getJSON(list_url,
// 					function(data) {
// 							var video_entries = data.feed.entry;
// 							for ( var j = 0; j < video_entries.length; ++j){
// 									// document.write(video_entries[j].title.$t);
// 									// document.write("</br>");
// 									// alert(video_entries[j].title.$t);
// 									video_title.push(video_entries[j].title.$t);
// 							}
// 							// video_title.push("hoge");
// 					});
// });
// $.ajaxSetup({async: true});
// document.write(video_title[0]);
