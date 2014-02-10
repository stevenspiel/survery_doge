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
    window.Answers.answers.push($("input[type=radio]:checked").last().attr("value"));
    $(".doge-frames").css("left", "-=" + 400);
    $("#next-question").attr("disabled", true);
  });

  $(".doge-frames").css("width", ($(".doge-item").length * 100) + "%");

  $(".doge-item").css("width", (100 / $(".doge-item").length) + "%");

  $('#submit').click(function(){

  });

// Survey creation functions

  var iO = 1;
  var iQ = 1;
  var dogeFrame = 
          "<div class='doge-item' id='doge-item-1'> \
            <input type='text' class='new-question' placeholder='Question "+iQ+"' tag='question' name='question"+iQ+"' id='question"+iQ+"'><br> \
            <div id='options-for-question-"+iQ+"'> \
              <p><input type='text' class='new-answer' placeholder='Option "+iO+"' name='option"+iO+"'></p> \
              <p><input type='text' class='new-answer' placeholder='Option "+ (iO + 1) +"' name='option"+ (iO + 1) +"'></p> \
            </div> \
            <a href='#' id='new-option-for-question-"+iQ+"' class='next-option'><img src='/add.png' alt='add'></a><br> \
          </div>";
  
  $("#new-survey").html(dogeFrame);
});



// Survey creation functions


var currentQuestion = function(){
  var leftIndent = parseInt($(".doge-frames").css('left').replace("px",""));
  var carouselWidth = $(".doge-carousel").width()
  return (((leftIndent * -1) / carouselWidth) + 1);
};

var numberOfQuestions = function(){
  return ($("#new-survey .doge-item").length + 1);
};

$(document).on('click','a[id^="new-option-for-question"]',function(e){
  var iO = $('#doge-item-'+currentQuestion()+' p').length + 1;
  $('<p><input type="text" class="new-answer" name="answer'+iO+'" value="" placeholder="Option '+iO+'" /><a href="#" class="remove" id="remove'+iO+'"><img class="minus" alt="remove" src="/remove.png"></a> </p>').appendTo($("#options-for-question-"+currentQuestion()));
  iO++;
  $(".remove").click(function(e){
    $(e.currentTarget).parent().remove();
  });
  return false;
});


$(document).on('click','#next',function(){
  $("#previous").removeAttr('disabled');
  $(".doge-frames").css("left", "-=" + $(".doge-carousel").width());
  var iO = $('.doge-item-'+currentQuestion()+' p').length + 1;
  console.log(currentQuestion());
  console.log(numberOfQuestions());
  if(currentQuestion() === numberOfQuestions()) {
    var dogeFrame = 
      "<div class='doge-item' id='doge-item-"+currentQuestion()+"'> \
        <input type='text' class='new-question' placeholder='Question "+currentQuestion()+"' tag='question' name='question"+currentQuestion()+"' id='question"+currentQuestion()+"'><br> \
        <div id='options-for-question-"+currentQuestion()+"'> \
          <p><input type='text' class='new-answer' placeholder='Option "+iO+"' name='"+ currentQuestion() + '-' + iO +"'></p> \
          <p><input type='text' class='new-answer' placeholder='Option "+ (iO + 1) +"' name='"+ currentQuestion() + '-' + iO +"'></p> \
        </div> \
        <a href='#' id='new-option-for-question-"+currentQuestion()+"' class='next-option'><img src='/add.png' alt='add'></a><br> \
      </div>";
    $(dogeFrame).appendTo($("#new-survey"));
  };
  $(".doge-frames").css('width', (($(".doge-item").length + 1) * 100) + "%");
  $(".doge-item").css("width", (100 / ($(".doge-item").length + 1)) + "%");
});

$(document).on('click','#previous',function(){
  $(".doge-frames").css('width', (($(".doge-item").length + 1) * 100) + "%");
  $(".doge-item").css("width", (100 / ($(".doge-item").length + 1)) + "%");
  $(".doge-frames").css("left", "+=" + $(".doge-carousel").width());
  if(currentQuestion() === 1){
    console.log($("#previous"));
    $("#previous").attr('disabled','disabled');
  }
});

$(document).on("click", "#submit", function(e) {
  e.preventDefault();

  var completeSurvey = {};

  completeSurvey.title = $("#title").val();

  for(var i=0; i<numberOfQuestions(); i++){
    var questionsArray = [];

    $('#options-for-question-'+i+' input').each( function( index ){
      questionsArray.push($(this).val() );
      console.log(questionsArray);
    });
    var question = $("#question"+i).val()
    completeSurvey.question = questionsArray;
    console.log(completeSurvey);
  }

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