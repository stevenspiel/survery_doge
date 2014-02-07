class Survey < ActiveRecord::Base
  belongs_to :user
  has_many :questions
  has_many :survey_events
  has_many :answers, through: :questions
  validates :user_id, presence: true
  validates :name, presence: true
end
