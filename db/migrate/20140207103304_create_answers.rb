class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.string :content
      t.integer :order
      t.belongs_to :question

      t.timestamps
    end
  end
end
