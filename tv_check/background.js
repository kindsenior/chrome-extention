// 一回だけ読み込み
chrome.browserAction.onClicked.addListener(function(tab) {
		chrome.tabs.create( {url:"index.html"} );
});

periodicCheck();
function periodicCheck(){
		var date = new Date();
		var weekDay = date.getDay();

		try{
				checkDays = JSON.parse(localStorage['checkDays']);
		}catch(e){ checkDays = ["0"];}

		if( !(lastCheckDate = parseInt(localStorage['lastCheckDate'])) )lastCheckDate=0;

		for( var i in checkDays ){
				console.log("weekDay:"+weekDay+" checkDay:"+checkDays[i]+" date:"+date.getDate()+" lastCheckDate:"+lastCheckDate);
				if( weekDay == checkDays[i] && date.getDate() != lastCheckDate ){
						console.log("execute check");
						chrome.tabs.create( {url:"index.html"} );
						localStorage['lastCheckDate'] = date.getDate();
				}
		}

		setTimeout( function(){periodicCheck();},30*1000 );// 30秒ごと
		// setTimeout( function(){periodicCheck();},30*60*1000 );// 30分ごと
}
