function ylistrandom(youtube) {
		var entries = youtube.feed.entry;
		var url = [];
		for (var i = 0; i < entries.length; ++i) {
				url.push(entries[i].media$group.media$player[0].url.substr(31,11));
		}
		document.write("aaa");
		var src= url[Math.floor(Math.random()*url.length)];
		document.write('<embed src="http://www.youtube.com/v/' + src + '&hl=ja_JP&fs=1&" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="200" height="165"></embed>')
}