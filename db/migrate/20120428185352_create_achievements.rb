class CreateAchievements < ActiveRecord::Migration
  def change
    create_table :achievements do |t|
      t.string :name
      t.integer :num_to_complete
      t.integer :achievement_category_id

      t.timestamps
    end
  end
end
