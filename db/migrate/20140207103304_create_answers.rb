class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.string :content
      t.integer :order
      t.integer :vote_count, default: 0
      t.belongs_to :question

      t.timestamps
    end
  end
end
