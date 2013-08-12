class CreateLocationTags < ActiveRecord::Migration
  def change
    create_table :location_tags do |t|
      t.integer :location_id
      t.integer :tag_id

      t.timestamps
    end
  end
end
