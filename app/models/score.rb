class Score < ActiveRecord::Base
  belongs_to :user

  def date
    created_at.localtime.strftime("%m/%d/%Y at %I:%M%p")
  end
end
