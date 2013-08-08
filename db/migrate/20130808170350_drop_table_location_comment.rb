class DropTableLocationComment < ActiveRecord::Migration
  def up
  	drop_table :location_comments
  end

  def down
  	create_table :location_comments do |t|
      t.integer :location_id
      t.integer :comment_id

      t.timestamps
    end
  end
end
