class Admin::ScoresController < ApplicationController
  def index
    @scores = Score.paginate page: params[:page], per_page: 10, order: 'score desc'
  end

  def new
    @score = Scores.new
  end

  def create
    @score = Scores.new(params[:score])
    if @score.save
      flash[:success] = "score Successfully Created."
      redirect_to admin_root_url
    else
      render :action => 'new'
    end
  end

  def edit
    @score = Scores.find(params[:id])
  end

  def update
    @score = Scores.find(params[:id])
    
    respond_to do |format|
      if @score.update_attributes(params[:score])
        flash[:success] = 'score was successfully updated.'
        format.html { redirect_to edit_admin_score_path(@score)}
        format.json { head :ok }
      else
        format.html { render action: "edit" }
        format.json { render json: @score.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @score = Scores.find(params[:id])
    @score.destroy

    respond_to do |format|
      format.html { redirect_to admin_root_url }
      format.json { head :ok }
    end
  end

  protected
    def permission_denied
      flash[:error] = "You do not have access to #{request.path}"

      respond_to do |format|
        format.html { redirect_to root_url }
        format.xml { head :unauthorized }
        format.js { head :unauthorized }
      end
    end
end
