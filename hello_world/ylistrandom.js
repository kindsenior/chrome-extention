function test(){
		var playlist_sets = JSON.parse(localStorage['playlist_sets']);
		console.log(playlist_sets.length);
		for(var list_idx = 0; list_idx < playlist_sets.length; ++list_idx){
				console.log(playlist_sets[list_idx].title);
		}
}


// チェックのついているプレイリストのセットを追加
function addPlaylistSet(){
		var checked_playlists = [];
		var playlists = JSON.parse(localStorage['playlists']);
		console.log("add to PlaylistSet");
		for(var list_idx = 0; list_idx < document.chbox.elements.length; ++list_idx){
				var flag = document.chbox.elements[list_idx].checked;
				if (flag){
						checked_playlists.push(playlists[list_idx]);
						console.log(playlists[list_idx].title);
				}
		}

		// 登録済みのプレイリストセットを取得
		var playlist_sets = [];
		try{
				playlist_sets = JSON.parse(localStorage['playlist_sets']);
		}catch(e){
				console.log("playlistsSets not exists");
		}
		console.log(document.textinput.title.value);
		// 追加 & 保存
		playlist_sets.push({
				title: document.textinput.title.value,
				playlists: checked_playlists
		});

		localStorage['playlist_sets'] = JSON.stringify(playlist_sets);

		// window.close();
}


// チェックが入っているリスト内のビデオを抽出
function getCheckedPlaylistSetVideos(){
		var checked_playlist_set_videos = [];
		var selections = document.playlist_set_selection.playlist_set;
		for(var i = 0; i < selections.length; ++i){
				if( selections[i].checked ){
						
						if ( selections[i].value == "not_saved" ){// 非保存のリストセット選択時
								var playlists = JSON.parse(localStorage['playlists']);
								for(var list_idx = 0; list_idx < playlists.length; ++list_idx){
										var flag = document.playlist_set_selection.elements[list_idx+1].checked;// 1足すのを忘れない
										if (flag)	Array.prototype.push.apply(checked_playlist_set_videos,playlists[list_idx].videos);
								}
								return checked_playlist_set_videos;// チェックされたリスト内のvideoのシーケンス
						}else{// 保存されたリストセット選択時
								var playlist_sets = JSON.parse(localStorage['playlist_sets']);
								var selected_playlist_set = playlist_sets[i-1];// 1引くのを忘れない
								for(var list_idx = 0; list_idx < selected_playlist_set.playlists.length; ++list_idx){
										Array.prototype.push.apply(checked_playlist_set_videos, selected_playlist_set.playlists[list_idx].videos);
								}
								return checked_playlist_set_videos;
						}
				}
		}

}

// 特定ユーザのプレイリスト内のビデオを取得
function getYoutubePlaylist(youtube){
		var entries = youtube.feed.entry;
		var videos = [];// video_lists = [];
		var max_results = 50;
		var turn_num;
		var playlists = [];

		for (var i = 0; i < entries.length; ++i){
		// for(var i = 0; i < 3; ++i){

				var list_url = entries[i].content.src + '&alt=json';

				// ターン数計算
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

				// リスト内全動画情報取得
				videos = [];
				for( var turn = 0; turn < turn_num; ++turn ){
						list_url = entries[i].content.src + '&alt=json' + '&max-results=' + String(max_results)
								+ '&start-index=' + String(max_results*turn+1);
						$.ajax({
								type: "GET",
								url: list_url,
								async: false,
								success: function(data) {
										var video_entries = data.feed.entry;
										for ( var j = 0; j < video_entries.length; ++j ){
												try{
														videos.push({url:video_entries[j].content.src, title:video_entries[j].title.$t});
												}catch(e){
														// document.write("hoge");// 要素がなかった場合の例外処理
												}

										}
								},
								error: function(XMLHttpRequest,textStatus,errorThrown){
										document.write(textStatus);
								}
						});
				}

				// プレイリスト情報のシーケンス
				playlists.push({
						url: entries[i].content.src+'&alt=json',
						title: entries[i].title.$t,
						videos: videos
				});


		}
		
		// LocalStorage保存
		localStorage['playlists'] = JSON.stringify(playlists);		
		document.write("hoge");
		$.each( video_titles, function(i, val){
				document.write(val);
				document.write("</br>");
		});
		document.write("hoge");

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