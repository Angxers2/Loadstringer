document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('button');
  const urlDisplay = document.getElementById('url');

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentUrl = tabs[0].url;
    urlDisplay.textContent = currentUrl;

    button.addEventListener('click', function () {
      let formattedString;

      if (currentUrl.startsWith('https://pastebin.com/')) {
        // Extract endpoint and convert to raw URL
        const endpoint = currentUrl.split('/').pop(); // Extract the part after the last '/'
        const rawUrl = `https://pastebin.com/raw/${endpoint}`;
        formattedString = `loadstring(game:HttpGet("${rawUrl}",true))()`;
        urlDisplay.textContent = "Detected Pastebin URL auto raw URL"
      } else {
        // Handle other URLs
        formattedString = `loadstring(game:HttpGet("${currentUrl}",true))()`;
      }

      // Display the formatted string in the text box
      urlDisplay.textContent = formattedString

      // Change button text to "Copy"
      button.textContent = "Copied";
      
      // Copy the formatted string to clipboard
      navigator.clipboard.writeText(formattedString).then(function () {
        // Show notification
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'icon.png',
          title: 'Success',
          message: 'Loadstring copied to clipboard!'
        });

        // Change button text back to "Loadstring!" after 1 second
        setTimeout(function() {
          button.textContent = "Loadstring!";
        }, 1000); // Change text back after 1 second
      }, function (err) {
        console.error('Could not copy text: ', err);
      });

      // Check for raw script links
      if (currentUrl.match(/\.(lua|txt)$/i)) {
        chrome.runtime.sendMessage({ type: 'alert', message: 'Raw script link detected!' });
      }
    });
  });
});
