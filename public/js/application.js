

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
          success: function(response){
            // console.log(response.survey_id);
            // console.log(window.Answers);
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
    $(".remove").click(function(e){
      $(e.currentTarget).parent().remove();
    });
    return false;
});

$(document).on('click','#next',function(){
  var q_name = $(".new-question ").val();
  console.log("Length of new answers is" + $(".new-answer").length);
  for (var i = 0; i < $(".new-answer").length; i++) {;
    questionsArray[i] = $($(".new-answer")[i]).val();
  };
  console.log(questionsArray);
  completeSurvey[q_name] = questionsArray;
  console.log(completeSurvey);
  window.newSurveyHTML = $("#question-and-buttons").html();
  var iQ = parseInt($("input[tag='question']").attr('name').replace('question',''));
  $("#question-and-buttons").html(window.newSurveyHTML);
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
    console.log(completeSurvey);
 $.ajax({url: "/survey/new", type: 'post', data: JSON.stringify(completeSurvey), contentType: 'application/json', dataType: 'json' });
  });


