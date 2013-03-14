function ylistrandom(youtube) {
		var entries = youtube.feed.entry;
		list_titles = [];
		video_titles = [];
		video_urls = [];
		var max_results = 50;
		var turn_num;
		// for (var i = 0; i < entries.length; ++i) {
		for (var i = 0; i < 3; ++i) {
				// document.write(entries[i].title.$t);
				// document.write("</br>");

				// var list_url = entries[i].content.src + '&alt=json-in-script&callback=?';
				// var list_url = entries[i].content.src + '&alt=json&callback=?';
				var list_url = entries[i].content.src + '&alt=json';
				list_titles.push(entries[i].title.$t);

				// document.write(list_url);
				// document.write("</br>");

				// video_titles = [];
				// video_urls = [];

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
				// document.write(String(turn_num)); document.write("</br>");

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

												try{
														// document.write(video_entries[j].content.src);
														video_urls.push(video_entries[j].content.src);
														video_titles.push(video_entries[j].title.$t);
												}catch(e){
														// document.write("hoge");// 要素がなかった場合の例外処理
												}
												// document.write("</br>");

										}
								},
								error: function(XMLHttpRequest,textStatus,errorThrown){
										document.write(textStatus);
								}
						});
				}

				// document.write("</br>");
		}

		// $.each( video_titles, function(i, val){
		// 		document.write(val);
		// 		document.write("</br>");
		// });

		// video_url = video_urls[Math.floor(Math.random()*video_urls.length)];
		// video_title = video_titles[Math.floor(Math.random()*video_titles.length)];


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

// document.write('<embed src="http://www.youtube.com/v/' + src + '&hl=ja_JP&fs=1&" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="200" height="165"></embed>')