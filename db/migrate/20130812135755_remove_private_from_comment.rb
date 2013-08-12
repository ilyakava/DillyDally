class RemovePrivateFromComment < ActiveRecord::Migration
  def change
    remove_column :comments, :private, :boolean
  end
end
