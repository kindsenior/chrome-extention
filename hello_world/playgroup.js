// チェックのついているプレイリストのセットを追加
function addPlaygroup(){
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
		var playgroups = [];
		try{
				playgroups = JSON.parse(localStorage['playgroups']);
		}catch(e){
				console.log("playlistsSets not exists");
		}
		console.log(document.textinput.title.value);
		// 追加 & 保存
		playgroups.push({
				title: document.textinput.title.value,
				playlists: checked_playlists
		});

		localStorage['playgroups'] = JSON.stringify(playgroups);

		window.close();
}

// チェックボックスの中身を変更
function changeChbox(){
		console.log("changeChbox");
		iti=document.selection.playgroup_to_remove.selectedIndex;
		// document.chbox.elements[0]=document.selection.playgroup_to_remove.options[iti].value;
}