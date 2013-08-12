class AddPrivateToComment < ActiveRecord::Migration
  def change
    add_column :comments, :private, :boolean
  end
end
