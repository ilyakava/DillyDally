class AddIsPrivateToComment < ActiveRecord::Migration
  def change
    add_column :comments, :is_private, :boolean
  end
end
