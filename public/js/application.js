$(document).ready(function () {

  // send an HTTP DELETE request for the sign-out link
  $('a#sign-out').on("click", function (e) {
    e.preventDefault();
    var request = $.ajax({ url: $(this).attr('href'), type: 'delete' });
    request.done(function () { window.location = "/"; });
  });

  // survey taking actions

  var answers = {};

  $(".answer").click(function(){
    // console.log("MUCH CLICKS");
    $("#next-question").removeAttr("disabled");
    if (parseInt($(".doge-frames").css("left").replace("px", "")) === ($(".doge-item").length * -400 + 400)) {
      $("#next-question").html("Submit");
      answers.title = $("#survey-title").html();
      $("#next-question").click(function(){
        $.ajax({
          type: "POST",
          url: "/survey",
          data: answers,
          success: function(){
            window.location.href = "/thanks"
          },
          dataType: "json"
        });
      });
    }
  });

  $("#next-question").click(function(){
    // console.log("MANY NEXT");
    $(".doge-frames").css("left", "-=" + 400);
    $("#next-question").attr("disabled", true);
  });

  $(".doge-frames").css("width", ($(".doge-item").length * 100) + "%");

  $(".doge-item").css("width", (100 / $(".doge-item").length) + "%");

  // survey creating actions


});
