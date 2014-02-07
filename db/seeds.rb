require 'faker'

# create a few users
user = User.create :name => 'name', :email => 'email@email.com', :password => 'password'

user.albums.create(title: "First album")
