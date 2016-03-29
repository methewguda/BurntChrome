function redirect(url) {
    chrome.tabs.getSelected(null, function (tab) {
        d = document;
        var f = d.createElement('form');
        f.action = url;
        f.method = 'post';
        d.body.appendChild(f);
        f.submit();
    });
}

function submitData(fdata) {
    var mydata = new FormData(fdata);
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
       location.reload();
    }
    xhttp.open(fdata.method, fdata.action, true);
    xhttp.send(new FormData(fdata));
    return false;
}

function makeL(link)
{
  return (link.indexOf('://') == -1) ? 'http://' + link : link;
}

$(document).ready(function(){
  $('#loginButton').click(function(){
    redirect("login.html");
  });
  $('#goBackButton').click(function(){
    redirect("popup.html");
  });
  $('#logoutButton').click(function(){
    localStorage.clear();
    redirect("popup.html");
  });
  $('#closeButton').click(function(){
    window.close();
  });
  $("#submitURL").click(function(){
    $('#webFrame').attr('src', makeL($('#inputURL').val()));
  });
  $("#submitURL2").click(function(){
    $('#webFrame').attr('src', makeL($('#inputURL2').val()));
  });
  $('#submitPrev').click(function(){
    window.history.back();
  });
  $('#submitFwd').click(function(){
    window.history.forward();
  });
});
