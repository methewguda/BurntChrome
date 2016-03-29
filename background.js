var file = "";
//blocks all downloads
chrome.downloads.onCreated.addListener
(
    function(download)
    {
        if(!(isLoggedIn()))
            {
                chrome.downloads.cancel(download.id);
                alert("Access Denied;Downloads are unavaliable!");
            }
    }
);

//blocks all sites
chrome.webRequest.onBeforeRequest.addListener
(
    function(details)
    {
        if(!(isLoggedIn()))
        {
            var pageURL = details['url'];
            if(!(inWhitelist(pageURL)))
            {
                return {redirectUrl : chrome.extension.getURL("denied.html")};
            }
        }
    },
    {urls: ["<all_urls>"], types: ["main_frame", "sub_frame"]},
    ["blocking"]
);

function inWhitelist(u)
{
    var r = document.createElement('a');
    r.href = u;

    var wL = JSON.parse(localStorage.getItem("whitelist"));
    

    if(r.hostname.indexOf(chrome.runtime.id) > -1)
    {
        return true;
    }
    var i = 0;
    for (i; i < wL.length; i++)
    {
        var w = document.createElement('a');
        w.href = wL[i].list_URL;
        var hasPath = false;
        var goodPath = false;
        var goodHost = false;
        if(w.pathname.length > 1)
        {
            hasPath = true;
            var rP = r.pathname;
            if(rP.charAt(rP.length-1) != "/")
            {
                rP += "/";
            }
            if (rP.indexOf(w.pathname) > -1)
            {
                goodPath = true;
            }

        }
        //hostname sees '*' as %2A so look for that instead
        //and chop it all off accordingly
        if (w.hostname.indexOf("%2A") == 0)
        {
            var wH = w.hostname.substr(4);
            if(r.hostname.indexOf(wH) > -1)
            {
                goodHost = true;
            }
        }
        else
        {
            if(r.hostname == w.hostname)
            {
                goodHost = true;
            }
        }
        if(goodHost)
        {
            if(hasPath && goodPath)
            {
                return true;
            }
            else if(!hasPath)
            {
                return true;
            }
        }
    }
    return false;
}
