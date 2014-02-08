require 'faker'

# create a few users
user = User.create!(name:"Mr. Doge", email: "email@email.com", password: 'password')

4.times do
  survey = user.surveys.create!(name: Faker::Commerce.product_name)
  10.times do
    question = survey.questions.create!(content: Faker::Company.bs)
    (rand(6) + 2).times do |n|
      question.answers.create!(content: Faker::Company.catch_phrase, order: n + 1)
    end
  end
end

4.times do
  user = User.create(name: Faker::Name.name, email: Faker::Internet.email, password: Faker::Internet.password)

  (rand(5)).times do
    survey = user.surveys.create(name: Faker::Commerce.product_name)
    (rand(10)).times do
      question = survey.questions.create(content: Faker::Company.bs)
      (rand(6) + 2).times do |n|
        question.answers.create(content: Faker::Company.catch_phrase, order: n + 1)
      end
    end
  end
end

50.times do
  Survey.all.each do |survey|
    survey.questions.each do |question|
      answer_count = question.answers.count
      upvote = rand(answer_count)
      question.answers[upvote].increment!(:vote_count)
    end
  end
end
