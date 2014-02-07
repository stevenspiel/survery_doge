class Survey < ActiveRecord::Base
  belongs_to :user
  has_many :questions
  has_many :survey_events
  has_many :answers, through: :questions
end
