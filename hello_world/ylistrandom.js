function test(){
		var playgroups = JSON.parse(localStorage['playgroups']);
		console.log(playgroups.length);
		for(var list_idx = 0; list_idx < playgroups.length; ++list_idx){
				console.log(playgroups[list_idx].title);
		}
}



// チェックが入っているリスト内のビデオを抽出
function getCheckedPlaygroupVideos(){
		console.log("getCheckedPlaygroupVideos");
		var checked_playgroup_videos = [];
		var selections = document.playgroup_selection.playgroup;
		num_selections = selections.length	? selections.length : 1;
		// console.log(num_selections);
		for(var i = 0; i < num_selections; ++i){
				if( num_selections == 1 || selections[i].checked ){
						if ( num_selections == 1 || selections[i].value == "not_saved" ){// 非保存のリストセット選択時
								var playlists = JSON.parse(localStorage['playlists']);
								for(var list_idx = 0; list_idx < playlists.length; ++list_idx){
										var flag = document.playgroup_selection.elements[list_idx+1].checked;// 1足すのを忘れない
										if (flag)	Array.prototype.push.apply(checked_playgroup_videos,playlists[list_idx].videos);
								}
								console.log("not saved group selected");
								return checked_playgroup_videos;// チェックされたリスト内のvideoのシーケンス
						}else{// 保存されたリストセット選択時
								var playgroups = JSON.parse(localStorage['playgroups']);
								var selected_playgroup = playgroups[i-1];// 1引くのを忘れない
								for(var list_idx = 0; list_idx < selected_playgroup.playlists.length; ++list_idx){
										Array.prototype.push.apply(checked_playgroup_videos, selected_playgroup.playlists[list_idx].videos);
								}
								console.log("saved group selected");
								return checked_playgroup_videos;
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

		// for (var i = 0; i < entries.length; ++i){
		for(var i = 0; i < 5; ++i){

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

				// console.log(entries[i].title.$t);
				// $.each( videos, function(i, val){
				// 		console.log(val.title);
				// 		document.write(val.title);
				// 		document.write("<br/>");
				// });

		}
		
		// LocalStorage保存
		localStorage['playlists'] = JSON.stringify(playlists);		
		
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