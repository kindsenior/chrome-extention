//動画特定プレーヤーの準備が整うとこの関数が実行される▼B-1
function onYouTubePlayerReady(playerId) {
		//alert(playerId);
		console.log("ready");
		console.log(playerId);

		if(playerId == "ytplayer1"){
				ytplayer1 = document.getElementById("myytplayer1");

				//「onStateChange」というイベントに、「onytplayerStateChage」という関数を登録
				//document.getElementById(playerId).addEventListener("onStateChange","onytplayerStateChange");
				ytplayer1.addEventListener("onStateChange","onytplayerStateChange");

		}

		//if(playerId == "ytplayer2"){
    //ytplayer2 = document.getElementById("myytplayer2"); //動画２
		//}

}

//動画コントロール▼B-2
function play1() {
		console.log("play");
		if (ytplayer1) {
				ytplayer1.playVideo();//再生開始
				ytplayer1.setVolume(100);//再生音量を20に設定
		}
}

//再生が終了した時だったら次のビデオを読み込んで再生する
function onytplayerStateChange(newState) { 
		console.log("state");
    if (newState == 0) {
				console.log("video ended");
				skip();
    }
}

// 次の曲
function skip(){
		console.log("next video");
		var video_urls = getCheckedListVideos();
		var next_video_idx = Math.floor(Math.random()*video_urls.length);
		// console.log(video_titles[next_video_idx]);
		console.log(video_urls[next_video_idx]);
		//document.getElementById("myytplayer1").loadVideoById(video_urls[Math.floor(Math.random()*video_urls.length)]);
		document.getElementById("myytplayer1").loadVideoByUrl(video_urls[next_video_idx]); 

}

