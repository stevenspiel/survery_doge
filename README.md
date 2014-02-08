Survey Doge
============

This is our Survey Monkey clone, totally doge-ified. Users can create multiple-choice surveys for others to vote in them.


### How to Run

Requirements: working postgres installed.


First, clone the repo to your local machine. Copy the HTTP Clone URL on the right, then in your terminal type:
```
git clone <paste url you copied> survey_doge
```
Run bundle to get all the gems setup:
```
bundle
```
Setup the database it uses with the following commands:
```
rake db:create
rake db:migrate
```
Optionally (and recommended), you can seed the database with some fake data:
```
rake db:seed
```
Then run shotgun to start the http server:
```
shotgun
```
That should get the site running locally on your machine.
Then in your browser, visit the local host address it shows you. It's usually "localhost:9393".


### Schema

Uses have many surveys.

Surveys have many questions.

Questions have many answers.

Answers have a vote count.

Answers have an order value, for tracking order of answers displayed per question.

1\. users

  + username
  + password

2\. surveys

  + user_id
  + name

3\. questions

  + survey_id
  + content

4\. answers

  + question_id
  + content
  + vote_count
  + order 
