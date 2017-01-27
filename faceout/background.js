/* Background script

Listen for tab changes. If we're on Facebook set an 
alarm for 5 minutes. After that time redirect tab to 
5calls.org

*/

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        var checkstring = 'facebook.com';
      
        if (tab.url.search(checkstring) > 0)  {
            chrome.alarms.create("facebook", {when: Date.now() + 300000});
        } else {
            chrome.alarms.clearAll();
        } 
    } 
});

/* Redirect current tab to 5calls.org */
var lastTabId = -1;
function redirect() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    console.log(tabs);
    lastTabId = tabs[0].id;
    chrome.tabs.update(lastTabId, {url: "http://5calls.org"});
  });
}

/* Listen for alarm completions */
chrome.alarms.onAlarm.addListener(function(alarm) {
  redirect();  
});
