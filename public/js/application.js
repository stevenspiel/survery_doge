

$(document).ready(function () {

  // send an HTTP DELETE request for the sign-out link
  $('a#sign-out').on("click", function (e) {
    e.preventDefault();
    var request = $.ajax({ url: $(this).attr('href'), type: 'delete' });
    request.done(function () { window.location = "/"; });
  });

  // survey taking actions

  window.Answers = {
    answers: []
  }

  $(".answer").click(function(){
    // console.log("MUCH CLICKS");

    $("#next-question").removeAttr("disabled");
    if (parseInt($(".doge-frames").css("left").replace("px", "")) === ($(".doge-item").length * -400 + 400)) {
      $("#next-question").html("Submit");
      $("#next-question").click(function(){
        $.ajax({
          type: "POST",
          url: "/survey",
          data: window.Answers,
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
    // window.Answers.
    window.Answers.answers.push($("input[type=radio]:checked").last().attr("value"));
    $(".doge-frames").css("left", "-=" + 400);
    $("#next-question").attr("disabled", true);
  });

  $(".doge-frames").css("width", ($(".doge-item").length * 100) + "%");

  $(".doge-item").css("width", (100 / $(".doge-item").length) + "%");



  // Survey creation functions
  var completeSurvey = {title: "A Doges Life"};

  var addDiv = $('#new-question-container');
  var i = $('#new-question-container p').length + 1;
  $('#new-answer').click(function() {
    $('<p><input type="text" class="answer_new" size="40" name="answer' + i +'" value="" placeholder="I am New" /><a href="#" class="remove" id="remove' + i + '">Remove</a> </p>').appendTo(addDiv);
    i++;
    $(".remove").click(function(e){
      $(e.currentTarget).parent().remove();
    });
    return false;
  });


  // Send completed survey object to server as json

  $("#submit").click(function(e) {
    e.preventDefault();
    console.log(completeSurvey);
 $.ajax({url: "/survey/new", type: 'post', data: JSON.stringify(completeSurvey), contentType: 'application/json', dataType: 'json' });
  })




});
