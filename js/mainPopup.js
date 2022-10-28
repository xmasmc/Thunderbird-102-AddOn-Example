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
	
	// Update the HTML fields with the message subject and sender.
	document.getElementById("subject").textContent = 	message.subject;
	document.getElementById("from").textContent =    	message.author;
	document.getElementById("date").textContent =    	message.date;
	document.getElementById("to").textContent =      	message.recipients.join();
	document.getElementById("received").textContent =	full.headers.received[0];
	document.getElementById("e_size").textContent =		full.size;
	document.getElementById("e_body").textContent = 	String(messageParser.getPartTexts(full));
	document.getElementById("e_raw").textContent = 		await messenger.messages.getRaw(message.id);  		
}

document.addEventListener("DOMContentLoaded", load);
