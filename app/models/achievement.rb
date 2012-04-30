class Achievement < ActiveRecord::Base
  validates_presence_of :name
  validates_presence_of :num_to_complete
  validates_presence_of :achievement_category

  belongs_to :achievement_category

  def return_progress(progress)
    if progress < num_to_complete
      "#{progress} / #{num_to_complete}"
    else
      "#{num_to_complete} / #{num_to_complete}"
    end
  end

  def return_complete(progress)
    if progress.to_i < num_to_complete.to_i
      '<i class="icon-remove"></i>'
    else
      '<i class="icon-ok"></i>'
    end
  end

  def return_complete?(progress)
    if progress.to_i < num_to_complete.to_i
      false
    else
      true
    end
  end
end
