// チェックのついているplaygroupを追加
function addPlaygroup(){
		var checked_playlists = [];
		var playlists = JSON.parse(localStorage['playlists']);
		console.log("add Playgroup");
		for(var list_idx = 0; list_idx < document.chbox.elements.length; ++list_idx){
				var flag = document.chbox.elements[list_idx].checked;
				if (flag){
						checked_playlists.push(playlists[list_idx]);
						console.log(playlists[list_idx].title);
				}
		}

		// 登録済みのプレイリストセットを取得
		var playgroups = [];
		try{
				playgroups = JSON.parse(localStorage['playgroups']);
		}catch(e){
				console.log("playgroups not exists");
		}
		console.log(document.textinput.title.value);
		// 追加 & 保存
		playgroups.push({
				title: document.textinput.title.value,
				playlists: checked_playlists
		});

		localStorage['playgroups'] = JSON.stringify(playgroups);

		changeRdbutton();
		window.close();
}

// チェックのついているplaygroupを削除
function removePlaygroup(){
		var playgroups = JSON.parse(localStorage['playgroups']);
		console.log("remove Playgroup");
		var num_removed = 0;
		if(document.chbox.elements.length){
				for(var list_idx = 0; list_idx < document.chbox.elements.length; ++list_idx){
						var flag = document.chbox.elements[list_idx].checked;
						if (flag){
								console.log(playgroups[list_idx-num_removed].title);
								playgroups.splice(list_idx-num_removed,1);
								++num_removed;
						}
				}
		}else{
				var flag = document.chbox.elements.checked;
				if (flag){
						console.log(playgroups.title);
						playgroups.splice(0,1);
				}
		}

		// 保存
		localStorage['playgroups'] = JSON.stringify(playgroups);

		changeRdbutton();
		window.close();
}

// playgroupのplaylist表示用チェックボックスを更新 (playgroupの編集時)
function changeChbox(){
		console.log("changeChbox");

		var target = document.getElementById("current_contents_of_playgroup");

		var iti = document.selection.playgroup_to_edit.selectedIndex - 1;// -1
		console.log(iti);

		var playgroups = JSON.parse(localStorage['playgroups']);
		var playlists = playgroups[iti].playlists;
		var chbox_html="";
		for(var list_idx = 0; list_idx < playlists.length; ++list_idx){
			  chbox_html += '<input type="checkbox" value=""\/>' + playlists[list_idx].title + "<br\/>";
    }

		target.innerHTML = '<form name="chbox">' + chbox_html + '<\/form>';

}

// 削除候補プルダウンを更新
function changeRemovePulldown(){
		console.log("changeRemovePulldown");

		var target = document.getElementById("remove_pulldown");

		var selected_playgroup_idx = document.selection.playgroup_to_edit.selectedIndex - 1;// -1
		var playgroups = JSON.parse(localStorage['playgroups']);
		var playlists = playgroups[selected_playgroup_idx].playlists;
		var pulldown_html = "";
		for(var list_idx = 0; list_idx < playlists.length; ++list_idx){
			  pulldown_html += '<option value=""/>' + playlists[list_idx].title;
		}

		target.innerHTML = '<select name="playlist_to_remove"><option selected value=""\/>Select Playgroup to Remove' + pulldown_html + '<\/select>'

}

// playgroupタイトルボックス更新
function changeTextinput(){
		console.log("changeTextinput");

		var playgroups = JSON.parse(localStorage['playgroups']);
		selected_playgroup_idx =  document.selection.playgroup_to_edit.selectedIndex - 1;// -1
		document.textinput.title.value = playgroups[selected_playgroup_idx].title;
}


// ラジオボタンの表示を更新 (playgroupのリストの編集時)
function changeRdbutton(){
		console.log("changeRdbutton");

		var target = window.opener.document.getElementById("current_contents_of_playgroups");// 親ウィンドに対して
		var selected_playgroup_idx = window.opener.document.playgroup_selection.playgroup.selectedIndex;

		// 更新するたびにNotSavedPlaygroupが前チェック状態に戻る

		// 非保存のplaygroup
		// var rdbutton_html = '<input type="radio" name="playgroup" value="not_saved" checked="checked"\/>Playgroup Not Saved<br\/>'
		var rdbutton_html = (selected_playgroup_idx == 0) ?
				'<input type="radio" name="playgroup" onClick="updateVideosOfSelectedPlaygroup()" value="not_saved" checked="checked"\/>Playgroup Not Saved<br\/>'
				: '<input type="radio" name="playgroup" onClick="updateVideosOfSelectedPlaygroup()" value="not_saved"\/>Playgroup Not Saved<br\/>';
		var playlists = JSON.parse(localStorage['playlists']);
		for(var list_idx = 0; list_idx < playlists.length; ++list_idx){
				rdbutton_html += '&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" value="" checked="checked"\/>'
						+ playlists[list_idx].title + "&nbsp;" + playlists[list_idx].url + "<br\/>";
		}

		// 保存済みのplaygroup
		var playgroups = JSON.parse(localStorage['playgroups']);
		for(var list_idx = 0; list_idx < playgroups.length; ++list_idx){
			  // rdbutton_html += '<input type="radio" value=""\/>' + playgroups[list_idx].title + "<br\/>";
				if( selected_playgroup_idx == list_idx + 1 ){// +1
						rdbutton_html += '<input type="radio" onClick="updateVideosOfSelectedPlaygroup()" value="" checked="checked"\/>' + playgroups[list_idx].title + "<br\/>";
				}else{
						rdbutton_html += '<input type="radio" onClick="updateVideosOfSelectedPlaygroup()" value=""\/>' + playgroups[list_idx].title + "<br\/>";
				}

    }

		target.innerHTML = '<form name="playgroup_selection">' + rdbutton_html + '<\/form>';

}

// playlistをplaygroupに追加
function addPlaylistToPlaygroup(){
		var selected_playgroup_idx = document.selection.playgroup_to_edit.selectedIndex - 1;// -1
		var selected_playlist_idx = document.add.playlist_to_add.selectedIndex - 1;// -1

		var playlists = JSON.parse(localStorage['playlists']);
		console.log("add Playgroup");

		// 登録済みのplaygroupを取得
		var playgroups = [];
		try{
				playgroups = JSON.parse(localStorage['playgroups']);
		}catch(e){
				console.log("playgroups not exists");
		}

		// 追加 & 保存
		playgroups[selected_playgroup_idx].playlists.push(playlists[selected_playlist_idx]);
		localStorage['playgroups'] = JSON.stringify(playgroups);

		changeChbox();
		changeRemovePulldown();
}

// playlistをplaygroupから削除
function removePlaylistFromPlaygroup(){
		var selected_playgroup_idx = document.selection.playgroup_to_edit.selectedIndex - 1;// -1
		var selected_playlist_idx = document.remove.playlist_to_remove.selectedIndex - 1;// -1

		var playlists = JSON.parse(localStorage['playlists']);
		console.log("add Playgroup");

		// 登録済みのplaygroupを取得
		var playgroups = [];
		try{
				playgroups = JSON.parse(localStorage['playgroups']);
		}catch(e){
				console.log("playgroups not exists");
		}

		// 追加 & 保存
		playgroups[selected_playgroup_idx].playlists.splice(selected_playlist_idx,1);
		localStorage['playgroups'] = JSON.stringify(playgroups);

		changeChbox();
		changeRemovePulldown();
}

// playgroupのTitleを変更
function renamePlaygroup(){
		var selected_playgroup_idx = document.selection.playgroup_to_edit.selectedIndex - 1;// -1

		console.log("rename Playgroup");

		// 登録済みのプレイリストセットを取得
		var playgroups = [];
		try{
				playgroups = JSON.parse(localStorage['playgroups']);
		}catch(e){
				console.log("playgroups not exists");
		}

		// 追加 & 保存
		playgroups[selected_playgroup_idx].title = document.textinput.title.value;
		localStorage['playgroups'] = JSON.stringify(playgroups);

}

// 編集を終了
function exitPlaygroupEdit(){
		changeRdbutton();
		window.close();
}

// // playgroupのチェックリストを表示
// function writePlaygroupChbox(playgroup_id){
// 		console.log("writePlaygroupChbox");
// 		var playgroups = JSON.parse(localStorage['playgroups']);
// 		var playlists = playgroups[playgroup_id].playlists;
// 		for(var list_idx = 0; list_idx < playlists.length; ++list_idx){
// 			  document.write('<input type="checkbox" value=""/>');
// 			  document.write(playlists[list_idx].title + "<br/>");
//     }
// }
