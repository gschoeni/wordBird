class CreateAchievementCategories < ActiveRecord::Migration
  def change
    create_table :achievement_categories do |t|
      t.string :name
      t.string :description

      t.timestamps
    end
  end
end
