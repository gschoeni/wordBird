class User < ActiveRecord::Base
  acts_as_authentic
  has_many :scores
  belongs_to :role

  has_attached_file :photo, 
                  :styles => { :medium => "160x120>", :small => "100x100>"},
                  :default_url => 'http://placehold.it/160x120'

  def calc_level
    (points.to_i/10000).floor+1
  end

  #POINTS
  def points_til_next_level
    10000-current_level_points
  end

  def current_level_points
    points.to_i-(calc_level-1)*10000
  end

  def level_points_percent
    current_level_points/10000.0*100
  end

  #EGGS
  def eggs_in_dozen
    eggs.to_i%12
  end

  def eggs_in_dozen_percent
    eggs_in_dozen/12.0*100
  end

  def dozens_of_eggs
    (eggs/12).floor
  end

  #achievements
  def achievement_progress(achievement)
    #check which category an achievement is so we can pass in the correct instance variable
    if achievement.achievement_category == AchievementCategory.find_by_name('Words Solved')
      achievement.return_progress(words_solved)
    elsif achievement.achievement_category == AchievementCategory.find_by_name('Points All Time')
      achievement.return_progress(points)
    else
      achievement.return_progress(self.scores.maximum("level"))
    end
  end

  def achievement_completed(achievement)
    if achievement.achievement_category == AchievementCategory.find_by_name('Words Solved')
      achievement.return_complete(words_solved)
    elsif achievement.achievement_category == AchievementCategory.find_by_name('Points All Time')
      achievement.return_complete(points)
    else
      achievement.return_complete(self.scores.maximum("level"))
    end
  end

  def achievement_completed?(achievement)
    if achievement.achievement_category == AchievementCategory.find_by_name('Words Solved')
      achievement.return_complete?(words_solved)
    elsif achievement.achievement_category == AchievementCategory.find_by_name('Points All Time')
      achievement.return_complete?(points)
    else
      achievement.return_complete?(self.scores.maximum("level"))
    end
  end




  def role_symbols
    if role
      [role.name.downcase.to_sym]
    else
      [:guest]
    end
  end

  def to_s
    username
  end
end
