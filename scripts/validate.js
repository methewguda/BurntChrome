var file = 'data/login.json';
var CryptoJS = new Crypt();

function validate(){
    var num = document.forms["login"]["snumber"].value;
    var pass = document.forms["login"]["password"].value;

    if(num != '' && pass != ''){
        if(num.search('s') != 0 || num.length != 8){
            return false;
        }
        return true;
    }

    return false;
}

document.addEventListener('DOMContentLoaded', function() {
    var submitButton = document.getElementById('submitButton');

    submitButton.addEventListener('click', function() {
        if(validate()){
            var url = "";
            var num = document.forms["login"]["snumber"].value;
            var pass = document.forms["login"]["password"].value;
            var userRole = "";
            var http = new XMLHttpRequest();
            var obj;
            var i = 0;

            //load login data from login.json file
            http.open("GET", chrome.extension.getURL("data/login.json"), true);
            http.setRequestHeader("content-type", "application/json");
            http.onreadystatechange = function(){
                if(http.readyState == 4 && http.status ==200){
                    obj = JSON.parse(http.responseText);
                    while(i < obj.login.length){
                        if(CryptoJS.AES.decrypt(obj.login[i].snumber) == num && CryptoJS.AES.decrypt(obj.login[i].password) == pass){
                            url = "teacher.html";

                            //store login status into local storage
                            var loginObject = {"sNumber" : num, "status": true};
                            localStorage.setItem('loginStatus', JSON.stringify(loginObject));
                            break;
                        }
                        i++;
                    }
                }
            }

            http.send(null);
            redirect(url);
        }
        if(!validate()){
            alert('Please check your S-Number & Password.');
        }
    }, false);
}, false);