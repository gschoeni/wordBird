class AddPointsEggsHeartsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :eggs, :integer, :default => 0
    add_column :users, :points, :integer, :default => 0
    add_column :users, :hearts, :integer, :default => 0
  end
end
