class CreateSurveys < ActiveRecord::Migration
  def change
    create_table :surveys do |t|
      t.string :name
      t.belongs_to :user

      t.timestamps
    end

    add_index :surveys, :name
  end
end
