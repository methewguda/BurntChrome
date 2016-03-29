document.addEventListener('DOMContentLoaded', function() {
    //this page will check the login status when popup.html loads.
    var loginObj;
    var url = "";

    if(localStorage.key('loginStatus') != null){
        loginObj = JSON.parse(localStorage.getItem('loginStatus'));
        //check if the user is already logged in
        if(loginObj["status"] == true){
            //if logged in
            url = "teacher.html"
            redirect(url);
        }
    }
}, false);



function isLoggedIn()
{
    var loginObj;
    if(localStorage.getItem('loginStatus') != null){
        loginObj = JSON.parse(localStorage.getItem('loginStatus'));
        //check if the user is already logged in
        if(loginObj["status"] == true){
            //if logged in
            return true;
        }
        else
        {
            return false;
        }
    }
    else
    {
        return false;
    }
}
