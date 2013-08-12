class RemovePublicFromComment < ActiveRecord::Migration
  def change
    remove_column :comments, :public, :boolean
  end
end
