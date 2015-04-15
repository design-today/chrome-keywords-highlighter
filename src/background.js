chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if ("getOptions" == request.message) {
		if ("undefined" != typeof localStorage) {
			chrome.tabs.query({
					"active": true,
					"currentWindow": true
				},
				function(tabs) {
					if ("undefined" != typeof tabs[0].id && tabs[0].id) {
						var showOccurrences = localStorage.getItem("showOccurrences");
						showOccurrences = "true" == showOccurrences || null == showOccurrences;

						chrome.tabs.sendMessage(tabs[0].id, {
							"message": "returnOptions",
							"remove": request.remove,
							"keywords": localStorage.getItem("keywords"),
							"color": localStorage.getItem("color") || "#000000",
							"backgroundColor": localStorage.getItem("backgroundColor") || "#ffff00",
							"showOccurrences": showOccurrences
						});
					}
				}
			);
		}
	}
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if ("setHighlightsCount" == request.message) {
		var showOccurrences = localStorage.getItem("showOccurrences");
		showOccurrences = "true" == showOccurrences || null == showOccurrences;

		chrome.browserAction.setBadgeText({
			"text": showOccurrences && request.highlightsCount ? String(request.highlightsCount) : "",
			"tabId": sender.tab.id
		});
	}
});
