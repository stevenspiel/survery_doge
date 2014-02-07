class Answer < ActiveRecord::Base
  belongs_to :question
  # Each question cannot have repeated answers
  # validates :content, uniqueness: {scope: :question_id}
end
