class CreateSurveyEvents < ActiveRecord::Migration
  def change
    create_Table :survey_events do |t|
      t.text :results
      t.belongs_to :survey
      # if tracking survey taker, do
      # t.belongs_to :user
      t.timestamps
    end
  end
end
