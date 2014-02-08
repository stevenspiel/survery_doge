

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
    window.Answers.answers.push($("input[type=radio]:checked").last().attr("value"));
    $(".doge-frames").css("left", "-=" + 400);
    $("#next-question").attr("disabled", true);
  });

  $(".doge-frames").css("width", ($(".doge-item").length * 100) + "%");

  $(".doge-item").css("width", (100 / $(".doge-item").length) + "%");

// Survey creation functions

  var iO = 1;
  var iQ = 1;
  var dogeFrame = 
          "<div class='doge-item' id='doge-item-1'> \
            <input type='text' class='new-question' placeholder='Question "+iQ+"' tag='question' name='question"+iQ+"'><br> \
            <div id='options-for-question-"+iQ+"'> \
              <p><input type='text' class='new-answer' placeholder='Option "+iO+"' name='option"+iO+"'></p> \
              <p><input type='text' class='new-answer' placeholder='Option "+ (iO + 1) +"' name='option"+ (iO + 1) +"'></p> \
            </div> \
            <a href='#' id='new-option-for-question-"+iQ+"' class='next-option'><img src='/add.png' alt='add'></a><br> \
          </div>";
  
  $("#new-survey").html(dogeFrame);
});

var currentQuestion = function(){
  var leftIndent = parseInt($(".doge-frames").css('left').replace("px",""));
  var carouselWidth = $(".doge-carousel").width()
  return (((leftIndent * -1) / carouselWidth) + 1);
};

var numberOfQuestions = function(){
  return ($("#new-survey .doge-item").length + 1);
};

$(document).on('click','a[id^="new-option-for-question"]',function(){
  var iO = $('#doge-item-'+currentQuestion()+' p').length + 1;
  $('<p><input type="text" class="answer_new" name="answer'+iO+'" value="" placeholder="Option '+iO+'" /><a href="#" class="remove" id="remove'+iO+'"><img class="minus" alt="remove" src="/remove.png"></a> </p>').appendTo($('div[id^="options-for-question"]'));
  iO++;
  $(".remove").click(function(e){
    $(e.currentTarget).parent().remove();
  });
  return false;
});


$(document).on('click','#next',function(){
  $("#previous").removeAttr('disabled');
  $(".doge-frames").css('width', (($(".doge-item").length + 1) * 100) + "%");
  $(".doge-item").css("width", (100 / ($(".doge-item").length + 1)) + "%");
  $(".doge-frames").css("left", "-=" + $(".doge-carousel").width());
  var iO = $('.doge-item-'+currentQuestion()+' p').length + 1;
  console.log(currentQuestion());
  console.log(numberOfQuestions());
  if(currentQuestion() === numberOfQuestions()) {
    var dogeFrame = 
      "<div class='doge-item' id='doge-item-"+currentQuestion()+"'> \
        <input type='text' class='new-question' placeholder='Question "+currentQuestion()+"' tag='question' name='question"+currentQuestion()+"'><br> \
        <div id='options-for-question-"+currentQuestion()+"'> \
          <p><input type='text' class='new-answer' placeholder='Option "+iO+"' name='"+ currentQuestion() + '-' + iO +"'></p> \
          <p><input type='text' class='new-answer' placeholder='Option "+ (iO + 1) +"' name='"+ currentQuestion() + '-' + iO +"'></p> \
        </div> \
        <a href='#' id='new-option-for-question-"+currentQuestion()+"' class='next-option'><img src='/add.png' alt='add'></a><br> \
      </div>";
    $(dogeFrame).appendTo($("#new-survey"));
  };
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
