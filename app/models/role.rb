class Role < ActiveRecord::Base
  has_many :users
  validates_length_of :name, :minimum => 1
  validates_uniqueness_of :name
  def to_s
    name
  end
end
