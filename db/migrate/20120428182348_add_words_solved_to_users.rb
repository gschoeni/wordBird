class AddWordsSolvedToUsers < ActiveRecord::Migration
  def change
    add_column :users, :words_solved, :integer, :default => 0
  end
end
