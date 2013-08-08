class CreateLocationComments < ActiveRecord::Migration
  def change
    create_table :location_comments do |t|
      t.integer :location_id
      t.integer :comment_id

      t.timestamps
    end
  end
end
