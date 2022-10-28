//==============================================================================
var messageParser = {
	getPartTexts: function(messagePart) {
		console.log(messagePart.contentType);
		switch (messagePart.contentType) {
 			case "multipart/related":
			case "message/rfc822":
			case "multipart/mixed":
			case "multipart/digest":
			case "multipart/parallel": {
				return messagePart.parts.map(x => this.getPartTexts(x));
			}
			case "multipart/alternative": {
				var part = messagePart.parts.find(x => x.contentType.startsWith("text/plain"));
				if (part) return part.body;
				part = messagePart.parts.find(x => x.contentType.startsWith("text/html"));
				if (part) return part.body;
				return [];
			}
			case "text/plain": {
				return messagePart.body;
			}
			case "text/html":
			case "text/xml":
			case "application/xml":
			case "application/xhtml+xml": {
				const doc = this.domParser.parseFromString(messagePart.body, messagePart.contentType);
				return doc.body.innerText;
			}
			default: {
				console.warn("Ignoring part with contentType", messagePart.contentType);
			}
		}
	},
	domParser: new DOMParser()
}

//==============================================================================
function extract_email(adr) {
	let email=adr.match(/[^< ]+(?=>)/g);
	if (!email) return adr;
	return email;
}
