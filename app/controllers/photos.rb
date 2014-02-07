get '/users/:user_id/albums' do
  erb :user_albums
end

get '/albums/:album_id' do
  @albums = Album.all
  erb :albums
end

get '/albums/:album_id/:photo_id' do
  erb :photo
end
