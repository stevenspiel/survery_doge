class Question < ActiveRecord::Base
  belongs_to :survey
  has_many :answers
  validates :content, presence: true
  # Survey can't have same question repeated,
  # but different surveys can have same question
  # valdiates :content, uniqueness: {scope: :suvery_id}
end
