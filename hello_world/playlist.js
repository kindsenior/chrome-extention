function test(){
		var playgroups = JSON.parse(localStorage['playgroups']);
		console.log(playgroups.length);
		for(var list_idx = 0; list_idx < playgroups.length; ++list_idx){
				console.log(playgroups[list_idx].title);
		}
}

function makeUrlFromUserID(user_id){
		return "http://gdata.youtube.com/feeds/api/users/" + user_id + "/playlists?v=2&alt=json";
}

// ラジオボタンの表示を更新 (playlistのリストの編集時)
function changeRdbuttonOfNotSavedPlaygroup(){
		console.log("changeRdbutton");

		var target = window.opener.document.getElementById("current_contents_of_playgroups");// 親ウィンドに対して

		// 非保存のplaygroup
		var rdbutton_html = '<input type="radio" name="playgroup" value="not_saved" checked="checked"\/>Playgroup Not Saved<br\/>'
		var playlists = JSON.parse(localStorage['playlists']);
		for(var list_idx = 0; list_idx < playlists.length; ++list_idx){
				rdbutton_html += '&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" value="" checked="checked"\/>'
						+ playlists[list_idx].title + "&nbsp;" + playlists[list_idx].url + "<br\/>";
		}

		// 保存済みのplaygroup
		var playgroups = JSON.parse(localStorage['playgroups']);
		for(var list_idx = 0; list_idx < playgroups.length; ++list_idx){
			  rdbutton_html += '<input type="radio" value=""\/>' + playgroups[list_idx].title + "<br\/>";
    }

		target.innerHTML = '<form name="playgroup_selection">' + rdbutton_html + '<\/form>';

}

// UserIDによる追加とPlaylistIDによる追加を判断
function addPlaylist(){
		var selected_method_idx = document.selection.method_to_add_playlist.selectedIndex;
		var selected_method_value = document.selection.method_to_add_playlist.options[selected_method_idx].value;
		if( selected_method_value == "playlist" ){
				addPlaylistFromPlaylistID();
		}else if( selected_method_value == "user"){
				addPlaylistFromUserID();
		}else{
				console.log("Unsupported method to add playlist");
		}
}

// Playlistを1個LocalStorageに追加
function addPlaylistToLocalStorage(playlist_id){
		console.log(addPlaylistToLocalStorage);

		var videos = [];
		var max_results = 50;
		var turn_num;
		var playlists = [];
		// var playlist_id = document.from_playlist_id.playlist_id.value;
		var playlist_url = "http://gdata.youtube.com/feeds/api/playlists/" + playlist_id + "?v=2&alt=json";
		var playlsit_url_;
		var playlist_title;

		try{
				playlists = JSON.parse(localStorage['playlists']);
		}catch(e){
		}

		// ターン数計算
		// 50個ずつしか動画情報を取得できないので先に再生リスト内の全動画数からターン数を計算
		$.ajax({
				type: "GET",
				url: playlist_url,
				async: false,
				success: function(data){
						turn_num = Math.ceil( Number(data.feed.openSearch$totalResults.$t)/max_results );
						playlist_title = data.feed.title.$t;
				},
				error: function(XMLHttpRequest,textStatus,errorThrown){ document.write(textStatus); }
		});

		// リスト内全動画情報取得
		videos = [];
		for( var turn = 0; turn < turn_num; ++turn ){
				playlist_url_ = "http://gdata.youtube.com/feeds/api/playlists/" + playlist_id + '?v=2&alt=json'
						+ '&max-results=' + String(max_results)
						+ '&start-index=' + String(max_results*turn+1);
				$.ajax({
						type: "GET",
						url: playlist_url,
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
				url: playlist_url,
				title: playlist_title,
				videos: videos
		});

		// LocalStorage保存
		localStorage['playlists'] = JSON.stringify(playlists);		
}

// playlistをPlayistのIDからplaylistsに追加
function addPlaylistFromPlaylistID(){
		console.log("addPlaylistFromPlaylistID");
		var playlist_id = document.from_playlist_id.playlist_id.value;

		addPlaylistToLocalStorage(playlist_id);

		changeRdbuttonOfNotSavedPlaygroup();
		window.close();
}

// playlistをUserIDからplaylistsに追加
function addPlaylistFromUserID(){
		console.log("addPlaylistFromUserID");
		var user_id = document.from_user_id.user_id.value;
		// url = "http://gdata.youtube.com/feeds/api/users/" + user_id + "/playlists?v=2&alt=json";
		url = makeUrlFromUserID(user_id);

		$.ajax({
				type: "GET",
				url: url,
				async: false,
				success: function(data){
						console.log(url);
						var entries = data.feed.entry;
						for(var i = 0; i < entries.length; ++i){
								console.log("add playlist below");
								if( document.chbox.elements[i].checked ){
										// console.log(entries[i].title.&t);
										addPlaylistToLocalStorage(entries[i].yt$playlistId.$t);
								}
						}
				},
				error: function(XMLHttpRequest,textStatus,errorThrown){ console.log("GET error");console.log(textStatus); }
		});

		changeRdbuttonOfNotSavedPlaygroup();
		window.close();

}

// チェックのついているplaylistを削除
// playgroupに含まれるplaylistは削除しないのでいい？？
function removePlaylist(){
		var playlists = JSON.parse(localStorage['playlists']);
		console.log("removePlaylist");
		var num_removed = 0;
		if(document.chbox.elements.length){
				for(var list_idx = 0; list_idx < document.chbox.elements.length; ++list_idx){
						var flag = document.chbox.elements[list_idx].checked;
						if (flag){
								console.log(playlists[list_idx-num_removed].title);
								playlists.splice(list_idx-num_removed,1);
								++num_removed;
						}
				}
		}else{
				var flag = document.chbox.elements.checked;
				if (flag){
						console.log(playlists.title);
						playlists.splice(0,1);
				}
		}

		// 追加 & 保存
		localStorage['playlists'] = JSON.stringify(playlists);

		changeRdbuttonOfNotSavedPlaygroup();
		window.close();
}

// playlistの情報を表示(playlist追加時)
function showPlaylistContents(){
		console.log("showPlaylistContents");

		var playlist_id = document.from_playlist_id.playlist_id.value;
		var playlist_url = "http://gdata.youtube.com/feeds/api/playlists/" + playlist_id + "?v=2&alt=json";
		var playlist_title;
		$.ajax({
				type: "GET",
				url: playlist_url,
				async: false,
				success: function(data){
						console.log(playlist_url);
						console.log(data.feed.title.$t);
						playlist_title = data.feed.title.$t;
				},
				error: function(XMLHttpRequest,textStatus,errorThrown){ console.log("GET error");console.log(textStatus); }
		});
		document.getElementById("contents_of_paylist").innerHTML = "Title:&nbsp;" + playlist_title + "<br/>Url:&nbsp;" + playlist_url + "<br/>";

}

// Userのplaylist表示用チェックボックスを更新 (UserIDからplaylist追加時)
function changePlaylistChboxOfUser(){
		console.log("changePlaylistChboxOfUser");

		var target = document.getElementById("playlists_of_user");

		var user_id = document.from_user_id.user_id.value;
		// url = "http://gdata.youtube.com/feeds/api/users/" + user_id + "/playlists?v=2&alt=json";
		url = makeUrlFromUserID(user_id);
		var chbox_html="";
		$.ajax({
				type: "GET",
				url: url,
				async: false,
				success: function(data){
						console.log(url);
						var entries = data.feed.entry;
						for(var i = 0; i < entries.length; ++i){
								chbox_html += '<input type="checkbox" value=""\/>' + entries[i].title.$t + "<br\/>";
						}
				},
				error: function(XMLHttpRequest,textStatus,errorThrown){ console.log("GET error");console.log(textStatus); }
		});

		target.innerHTML = '<form name="chbox">' + chbox_html + '<\/form>';
}

// チェックが入っているリスト内のビデオを抽出(再生時に使用)
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