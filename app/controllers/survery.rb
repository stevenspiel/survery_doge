get '/survey/:id' do
  @survey = Survey.find(params[:id])
  erb :survey
end

get '/new/survey' do
  erb :new_survey
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
