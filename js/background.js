// just for fun, change icons all 2 seconds
(async () => {
	var sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
	while(true) {
		await sleep(2000);
		messenger.browserAction.setIcon({path: "images/symbol_xmas_rot.gif"});
		messenger.browserAction.setTitle({title: "icon now red"});
		messenger.messageDisplayAction.setIcon({path: "images/symbol_xmas_gelb.gif"});
		await sleep(2000);
		messenger.browserAction.setIcon({path: "images/symbol_xmas_gelb.gif"});
		messenger.browserAction.setTitle({title: "icon now gelb"});
		messenger.messageDisplayAction.setIcon({path: "images/symbol_xmas_rot.gif"});
	}
})()
