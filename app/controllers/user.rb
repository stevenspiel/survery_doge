get 'user/:id' do
  if current_user
    @user = User.find(session[:id])
    @username = @user.name
    @surveys = @user.surveys
    erb :all_surveys
  else
    redirect '/'
  end
end
