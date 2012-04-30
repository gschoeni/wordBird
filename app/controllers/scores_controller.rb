class ScoresController < ApplicationController
  def index
    # @scores = current_user.scores.all(:order => "score DESC", :limit => 7)
    respond_to do |format|
      format.html { 
        @scores = Score.paginate page: params[:page], per_page: 10, order: 'score desc'
        render  action: "index" 
      }
      format.json {
        @scores = Score.all(:order => 'score DESC', :limit => 7)
        render json: @scores 
      }
    end
  end

  def my_scores
    @scores = current_user.scores.paginate page: params[:page], per_page: 10, order: 'score desc'
    respond_to do |format|
      format.html { render  action: "my_scores" }
      format.json { render json: @scores }
    end
  end

  def create
    @score = Score.new(params[:score])

    respond_to do |format|
      if @score.save
        format.json { render json: @score, status: :created, location: @score }
      else
        format.json { render json: @score.errors, status: :unprocessable_entity }
      end
    end
  end

end
