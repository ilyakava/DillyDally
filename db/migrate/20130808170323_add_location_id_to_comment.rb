class AddLocationIdToComment < ActiveRecord::Migration
  def change
    add_column :comments, :location_id, :integer
  end
end
