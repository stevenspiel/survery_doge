get '/survey/:id' do
  @survey = Survey.find(params[:id])
  erb :survey
end

get '/survey/new' do
  erb :new_survey
end

get 'survey/stats/:id' do
  @survey = Survey.find(params[:id])
  erb :stats
end
