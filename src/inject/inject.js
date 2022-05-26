/*

 Todo -- Find out how to get the div that holds the search result container and remove/hide it
      -- Send the list of urls we *dont* want to see and remove/hide them from the page


 */


//https://github.com/nyu-dl/dl4ir-searchQA/blob/master/qacrawler/google_dom_info.py
// GoogleDomInfoBase:
    var RESULT_TITLE_CLASS = 'r'
    var RESULT_URL_CLASS = '_Rm'
    var RESULT_DESCRIPTION_CLASS = 'st'
    var RESULT_RELATED_LINKS_DIV_CLASS = 'osl'
    var RESULT_RELATED_LINK_CLASS = 'fl'
   var  NEXT_PAGE_ID = 'pnnext'
// GoogleDomInfoWithJS:
    var RESULT_DIV_CLASS = 'rc'
    var SEARCH_BOX_XPATH = '//*[@id="lst-ib"]'
// GoogleDomInfoWithoutJS:
    var RESULT_DIV_CLASS = 'g'
    var SEARCH_BOX_XPATH = '//*[@id="sbhost"]'
   var  NAVIGATION_LINK_CLASS = 'fl'
   var  PREFERENCES_BUTTON_ID = 'gbi5'
   var  NUMBER_OF_RESULTS_SELECT_ID = 'numsel'
    var SAVE_PREFERENCES_BUTTON_NAME = 'submit2'


const current = location;
const hideElements = (elms) => elms.forEach(el => el.style.display = 'none');

if(current.host === 'www.google.com'){
	// hide ads stolen from
	// https://github.com/SimaAmini/hide-ads/blob/master/app.js
    hideElements( document.querySelectorAll(".ads-ad") );
}

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------

		urlsOnPage = allUrlsOnPage(document);
	}
	}, 10);
});



function allUrlsOnPage(content){
	var found = [];
	var links = content.getElementById('main').getElementsByTagName('a');
	for (var i = 0; i < a.length; i++) {
		var link = links[i];
		// get the actual target from the weird google redirect link
		var actualLink = getUrlFromLink(link)
		found.push(actualLink)
	}
	return found;
}

function getUrlFromLink(link){
	const urlParams = new URLSearchParams(link)
	return urlParams.get("url")
}

function getTitles() {
   // stolen from https://www.codingexercises.com/filter-google-search-results-with-javascript
    var arr = [...document.getElementsByTagName('h3')];

    var filtered = [];
    arr.forEach(x => filtered.push(x.innerText))

    var printToScreen = "";

    for(let i = 0; i < filtered.length; i++) {
      printToScreen += `${filtered[i]} <br>`;
    }

    return printToScreen;
}
