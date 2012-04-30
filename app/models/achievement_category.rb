class AchievementCategory < ActiveRecord::Base
  validates_presence_of :name
  validates_presence_of :description
  has_many :achievements
  def to_s
    name
  end


end
