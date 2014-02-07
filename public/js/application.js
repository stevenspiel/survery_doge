$(document).ready(function () {

  // send an HTTP DELETE request for the sign-out link
  $('a#sign-out').on("click", function (e) {
    e.preventDefault();
    var request = $.ajax({ url: $(this).attr('href'), type: 'delete' });
    request.done(function () { window.location = "/"; });
  });

  $(".answer").click(function(){
    console.log("MUCH CLICKS");
    $("#next-question").removeAttr("disabled");
  });

  $("#next-question").click(function(){
    console.log("MANY NEXT");
    $(".doge-frames").css("left", "-=" + 400);
    $("#next-question").attr("disabled", true);
  });

});
