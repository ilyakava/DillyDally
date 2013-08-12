class AddPublicToComment < ActiveRecord::Migration
  def change
    add_column :comments, :public, :boolean
  end
end
