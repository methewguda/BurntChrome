$(document).ready(function(){
    var file = 'http://burntchrome.methewguda.com/getData.php';

    $.ajax({
        type: 'GET',
        url: file,
        success: function(response){
            localStorage.setItem("whitelist", JSON.stringify(response) );
            $.each(response, function(index) {
                $('#studentList').append('<tr><td><a href="' + response[index].list_URL + '" id= "clickLink"' + 'target="webFrame">'
                    + response[index].list_URL
                    + '</a></td><tr>');
                $('#teacherList').append('<tr><td><a href="' + response[index].list_URL + '" id= "clickLink"' + 'target="webFrame">'
                    + response[index].list_URL
                    + '</a></td><td><input id="del" name ="del" type="radio" value="'+ response[index].list_ID +'"></td><tr>');
            });
        }
    });
});


$('#sendlist').submit(function() {
        if($('#addList').val() != ''){
          $("#sendlist").attr("action", "http://burntchrome.methewguda.com/setData.php");
          $("#sendlist").attr("method", "POST");
          return submitData(this);
        }else{
          alert("Please enter an URL");
        }
});

$("#delListButton").click(function() {
  // validate and process form here
  var radio_button_value;

  if ($("input[name='del']:checked").length > 0){
    radio_button_value = $('input:radio[name=del]:checked').val();
  }
  else{
    alert("No list is selected, try again!");
    return false;
  }
  $.ajax({
    type: "POST",
    url: "http://burntchrome.methewguda.com/delData.php",
    data: {"del":radio_button_value},
    success: function() {
      location.reload();
    }
  });
  return false;
});
