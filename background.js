chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === 'alert') {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon.png',
        title: 'Raw Script Detected',
        message: request.message
      });
    }
  });
  