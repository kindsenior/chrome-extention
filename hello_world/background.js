chrome.browserAction.onClicked.addListener(function(tab) {
		// var action_url = "javascript:window.print();";
		// chrome.tabs.update(tab.id, {url: action_url});

		// chrome.browserAction.setTitle( {title:"aaa", tabId: tab.id} );
		// chrome.tabs.create( {url:"http://www.google.com"} );

		// chrome.tabs.create( {url:"http://kindsenior.6.ql.bz/hello_world/playlist.html"} );
		// chrome.tabs.create( {url:"http://s2.muryo-de.mydns.jp/~kindsenior/hello_world/playlist.html"} );
		chrome.tabs.create( {url:"http://kindsenior.web.fc2.com/hello_world/playlist.html"} );

		// alert(chrome.extension.getURL('playlist.html'));
		// chrome.tabs.create( chrome.extension.getURL('playlist.html') );
		// chrome.tabs.update( tab.id, {url:"http://www.google.com"} );

});