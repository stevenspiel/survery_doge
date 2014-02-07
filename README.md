Survey Doge
============

This is our Survey Monkey clone, totally doge-ified. Users can create multiple-choice surveys for others to vote in them.


### Schema

Uses have many surveys.

Surveys have many questions.

Questions have many answers.

Answers have a vote count.

Answers have an order value, for tracking order of answers displayed per question.

1. users

  + username
  + password

2. surveys

  + user_id
  + name

3. questions

  + survey_id
  + content

4. answers

  + question_id
  + content
  + vote_count
  + order 
