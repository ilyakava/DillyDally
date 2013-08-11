class AddVisitedColumnToUserLocations < ActiveRecord::Migration
  def change
    add_column :user_locations, :visited, :boolean
  end
end
