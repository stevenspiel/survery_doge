require 'pry'

get '/survey/:id' do
  @survey = Survey.find(params[:id])
  erb :survey
end

get '/new/survey' do
  if session[:user_id]
    erb :new_survey
  else
    redirect '/users/new'
  end
end

post '/survey/new' do
  # get stuff from front end
  # as JSON
  survey = JSON.parse(request.body.read)
  new_survey = Survey.new
  new_survey.user_id = session[:user_id]
  survey.each do |key, value|
    if key == "title"
      new_survey.name = value
    else
      # write questions
      q = Question.create(content: key)
      new_survey.questions << q
      # write poss. answers
      value.each do |answer|
        q.answers << Answer.create(content: answer)
      end
    end
  end
  # store into database
  new_survey.save!
  {user_id: session[:user_id]}.to_json
end

get '/survey/stats/:id' do
  @survey = Survey.find(params[:id])
  erb :stats
end

post '/survey' do
  puts params
  puts params[:answers]
  # we expect array in param
  params[:answers].each do |id|
    # increment vote count on each answer based on ques. number coming in
    Answer.find(id.to_i).increment!(:vote_count)
  end
  {survey_id: Answer.find(params[:answers].first).question.survey_id}.to_json
end

get '/thanks/:id' do
  # Pass survey to view, so I can display survey title.
  # There's probably a better way to do this
  # puts "------ param id -------"
  # puts params[:id]
  # p params[:id]
  @survey = Survey.find(params[:id])
  erb :thanks
end
