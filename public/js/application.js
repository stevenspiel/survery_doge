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
    // Line below changed to "+ 800" so that final frame could be a submission message/animation
    if (parseInt($(".doge-frames").css("left").replace("px", "")) === ($(".doge-item").length * -400 + 800)) {
      $("#next-question").html("Submit");
      $("#next-question").click(function(){
        $.ajax({
          type: "POST",
          url: "/survey",
          data: window.Answers,
          success: function(response){
            window.location.href = "/thanks/" + response.survey_id;
          },
          dataType: "json"
        });
      });
    }
  });

  $("#next-question").click(function(){
    console.log("MANY NEXT");
    // window.Answers.
    window.Answers.answers.push($("input[type=radio]:checked").last().attr("value"));
    $(".doge-frames").css("left", "-=" + 400);
    $("#next-question").attr("disabled", true);
  });

  $(".doge-frames").css("width", ($(".doge-item").length * 100) + "%");

  $(".doge-item").css("width", (100 / $(".doge-item").length) + "%");
});



// Survey creation functions

var completeSurvey = {};

var questionsArray = [];

$(document).on('click','#new-option',function(){
  var iO = $('#new-question-container p').length + 1;
  $('<p><input type="text" class="new-answer" name="answer'+iO+'" value="" placeholder="Option '+iO+'" /><a href="#" class="remove" id="remove'+iO+'"><img class="minus" alt="remove" src="/remove.png"></a> </p>').appendTo($('#new-question-container'));
  iO++;
  return false;
});

$(document).on('click','#question-and-buttons p .remove',function(e){
  console.log(e);
  $(e.currentTarget).parent().remove();
});

$(document).on('click','#next',function(){
  var q_name = $(".new-question ").val();
  console.log("Length of new answers is" + $(".new-answer").length);
  for (var i = 0; i < $(".new-answer").length; i++) {;
    questionsArray[i] = $($(".new-answer")[i]).val();
  };
  completeSurvey[q_name] = questionsArray;
  window.newSurveyHTML = $("#new-question-container").html();
  var iQ = parseInt($("input[tag='question']").attr('name').replace('question',''));
  $("#new-question-container").html(window.newSurveyHTML);
  $("input[tag='question']").attr('placeholder',function(){
    iQ ++
    console.log(iQ);
    return 'Question ' + iQ;
  });
  $("input[tag='question']").attr('name',('question'+iQ));
});

$(document).on("click", "#submit", function(e) {
  e.preventDefault();
  completeSurvey.title = $("#title").val();
  $.ajax({
    url: "/survey/new",
    type: 'post',
    data: JSON.stringify(completeSurvey),
    success: function(response){
      window.location.href = "/user/" + response.user_id;
    },
    contentType: 'application/json',
    dataType: 'json'
  });
});


