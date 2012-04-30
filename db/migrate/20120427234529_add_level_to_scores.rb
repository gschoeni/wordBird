class AddLevelToScores < ActiveRecord::Migration
  def change
    add_column :scores, :level, :integer, :default => 0
  end
end
