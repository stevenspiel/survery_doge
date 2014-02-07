require 'faker'

# create a few users
user = User.create!(name:"Mr. Doge", email: "email@email.com", password: 'password')

4.times do
  survey = user.surveys.create!(name: Faker::Lorem.word)
  10.times do
    question = survey.questions.create!(content: Faker::Lorem.sentence)
    (rand(6) + 2).times do
      question.answers.create!(content: Faker::Lorem.sentence)
    end
  end
end

3.times do
  user = User.create(name: Faker::Name.name, email: Faker::Internet.email, password: Faker::Internet.password)

  (rand(5)).times do
    survey = user.surveys.create(name: Faker::Lorem.word)
    (rand(10)).times do
      question = survey.questions.create(content: Faker::Lorem.sentence)
      (rand(6) + 2).times do
        question.answers.create(content: Faker::Lorem.sentence)
      end
    end
  end
end
