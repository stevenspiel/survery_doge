get "/upload" do
  @user_albums = Album.where('user_id = ?', session[:user_id])
  erb :upload
end

post "/upload" do
  File.open('db/uploads/' + params['myfile'][:filename], "w") do |f|
    f.write(params['myfile'][:tempfile].read)
  end

  # Photo.create!(title: params[:filename], album: params[:album_id])

  return "The file was successfully uploaded!"
end

post '/photo/new' do
end
