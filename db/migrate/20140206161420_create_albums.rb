class CreateAlbums < ActiveRecord::Migration
  def change
    create_table :albums do |t|
      t.belongs_to :user
      t.string :title
      t.timestamps
    end
  end
end
