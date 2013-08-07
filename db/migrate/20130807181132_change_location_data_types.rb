class ChangeLocationDataTypes < ActiveRecord::Migration
  def change
  	change_column :locations, :lat, :float
  	change_column :locations, :lng, :float
  end
end
