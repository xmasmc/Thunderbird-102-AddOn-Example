//==============================================================================
async function load() {
	// The user clicked our button, get the active tab in the current window using
	// the tabs API.
	let tabs = await messenger.tabs.query({active: true, currentWindow: true});
	
	// Get the message currently displayed in the active tab, using the
	// messageDisplay API. Note: This needs the messagesRead permission.
	// The returned message is a MessageHeader object with the most relevant
	// information.
	let message = await messenger.messageDisplay.getDisplayedMessage(tabs[0].id);
	// Request the full message to access its full set of headers.

	let full = await messenger.messages.getFull(message.id);
	mailbody = String(messageParser.getPartTexts(full));

	let mailadr_from = extract_email(message.author);

	executable_name = "d:\\Sample_call.bat";
	// remove all linefeeds and compress whitespace from mailbody
	var args = [ String(mailadr_from), mailbody.replace(/\n/g," ").replace(/\s+/g, " ") ];

	console.log( "call " + executable_name + " with args = " + args);

	await messenger.xmasapi.call_batch(executable_name, args);
}

document.addEventListener("DOMContentLoaded", load);
