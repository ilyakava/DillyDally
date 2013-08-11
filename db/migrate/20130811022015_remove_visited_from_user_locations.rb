class RemoveVisitedFromUserLocations < ActiveRecord::Migration
  def change
    remove_column :user_locations, :visited, :boolean
  end
end
