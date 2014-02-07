Survey Doge
============

This is our Survey Monkey clone, totally doge-ified. Users can create multiple-choice surveys for others to vote in them.


### Schema

Uses have many surverys.
Surveys have many questions.
Questions have many answers.
Answers have a vote count.
Answers have an order value, for tracking order of answers displayed per question.

users
+ username
+ password

surveys
+ user_id
+ name

questions
+ survey_id
+ content

answers
+ question_id
+ content
+ vote_count
+ order 
