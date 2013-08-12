class AddUserIdToLocationTag < ActiveRecord::Migration
  def change
    add_column :location_tags, :user_id, :integer
  end
end
