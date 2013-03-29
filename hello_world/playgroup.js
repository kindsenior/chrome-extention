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

		window.close();
		// changeRdbutton();
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

		// 追加 & 保存
		localStorage['playgroups'] = JSON.stringify(playgroups);

		window.close();
		// changeRdbutton();
}

// チェックボックスの表示を変更 (playgroup編集時)
function changeChbox(){
		console.log("changeChbox");

		var target = document.getElementById("current_contents_of_playgroup");

		var iti = document.selection.playgroup_to_edit.selectedIndex-1;
		console.log(iti);

		var playgroups = JSON.parse(localStorage['playgroups']);
		var playlists = playgroups[iti].playlists;
		var chbox_html="";
		for(var list_idx = 0; list_idx < playlists.length; ++list_idx){
			  chbox_html += '<input type="checkbox" value=""\/>' + playlists[list_idx].title + "<br\/>";
    }

		target.innerHTML = '<form name="chbox">' + chbox_html + '<\/form>';

}

// ラジオボタンの表示を更新 (playgroups編集時)
function changeRdbutton(){
		console.log("changeRdbutton");

		// var parent_win = window.open("","Google Chrome");
		// var target = parent_win.document.getElementById("current_contents_of_playgroups");// ウィンドウが異なる場合どうする？
		var target = document.getElementById("current_contents_of_playgroups");// ウィンドウが異なる場合どうする？

		var rdbutton_html = '<input type="radio" name="playgroup" value="not_saved" checked="checked"\/>Playgroup Not Saved<br\/>'

		var playlists = JSON.parse(localStorage['playlists']);
		for(var list_idx = 0; list_idx < playlists.length; ++list_idx){
				rdbutton_html += '&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" value="" checked="checked"\/>'
						+ playlists[list_idx].title + "&nbsp;" + playlists[list_idx].url + "<br\/>";
		}

		var playgroups = JSON.parse(localStorage['playgroups']);
		for(var list_idx = 0; list_idx < playgroups.length; ++list_idx){
			  rdbutton_html += '<input type="radio" value=""\/>' + playgroups[list_idx].title + "<br\/>";
    }

		target.innerHTML = '<form name="playgroup_selection">' + rdbutton_html + '<\/form>';

}

// playgroupのチェックリストを表示
function writePlaygroupChbox(playgroup_id){
		console.log("writePlaygroupChbox");
		var playgroups = JSON.parse(localStorage['playgroups']);
		var playlists = playgroups[playgroup_id].playlists;
		for(var list_idx = 0; list_idx < playlists.length; ++list_idx){
			  document.write('<input type="checkbox" value=""/>');
			  document.write(playlists[list_idx].title + "<br/>");
    }
}
