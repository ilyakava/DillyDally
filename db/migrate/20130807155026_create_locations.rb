class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.string :address
      t.integer :lat
      t.integer :lng
      t.string :name

      t.timestamps
    end
  end
end
