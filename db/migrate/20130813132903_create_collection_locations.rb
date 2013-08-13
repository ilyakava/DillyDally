class CreateCollectionLocations < ActiveRecord::Migration
  def change
    create_table :collection_locations do |t|
      t.integer :location_id
      t.integer :collection_id

      t.timestamps
    end
  end
end
