/* Background script

Listen for tab changes. If we're on Facebook set an 
alarm for 5 minutes. After that time redirect tab to 
5calls.org

*/

const five_minutes = 300000

/* Listen for any changes to the URL of any tab. */
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    var checkstring = 'facebook.com';      
    if (tab.url.search(checkstring) > 0) {
        chrome.alarms.getAll(function(alarms) {
          var hasAlarm = alarms.some(function(a) {
            return a.name == "facebook";
          });
        if (!hasAlarm) {
          chrome.alarms.create("facebook", {
            when: Date.now() + five_minutes});
        }
      });
    } else {
        chrome.alarms.clearAll();
    } 
});

/* Redirect current tab to 5calls.org */
var lastTabId = -1;
function redirect() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    lastTabId = tabs[0].id;
    chrome.tabs.update(lastTabId, {url: "https://5calls.org"});
  });
}

/* Listen for alarm completions */
chrome.alarms.onAlarm.addListener(function(alarm) {
  redirect();  
});
