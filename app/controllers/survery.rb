get '/survey/:id' do
  @survey = Survey.find(params[:id])
  erb :survey
end

get '/new/survey' do
  erb :new_survey
end

post '/survey/new' do
  # get stuff from front end
  # as JSON
  survey = JSON.parse(params[:survey])
  new_survey = Survey.new
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
  new_survey.save
end

get '/survey/stats/:id' do
  @survey = Survey.find(params[:id])
  erb :stats
end

post '/survey' do
  # we expect array in param
  params[:answers].each do |id|
    # increment vote count on each answer based on ques. number coming in
    a = Answer.find(id).vote_count+=1
    a.save
  end
end
