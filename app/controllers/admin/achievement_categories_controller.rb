class Admin::AchievementCategoriesController < ApplicationController
  # GET /achievement_categories
  # GET /achievement_categories.json
  def index
    @achievement_categories = AchievementCategory.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @achievement_categories }
    end
  end

  # GET /achievement_categories/1
  # GET /achievement_categories/1.json
  def show
    @achievement_category = AchievementCategory.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @achievement_category }
    end
  end

  # GET /achievement_categories/new
  # GET /achievement_categories/new.json
  def new
    @achievement_category = AchievementCategory.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @achievement_category }
    end
  end

  # GET /achievement_categories/1/edit
  def edit
    @achievement_category = AchievementCategory.find(params[:id])
  end

  # POST /achievement_categories
  # POST /achievement_categories.json
  def create
    @achievement_category = AchievementCategory.new(params[:achievement_category])

    respond_to do |format|
      if @achievement_category.save
        format.html { redirect_to admin_achievement_categories_url, notice: 'Achievement category was successfully created.' }
        format.json { render json: @achievement_category, status: :created, location: @achievement_category }
      else
        format.html { render action: "new" }
        format.json { render json: @achievement_category.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /achievement_categories/1
  # PUT /achievement_categories/1.json
  def update
    @achievement_category = AchievementCategory.find(params[:id])

    respond_to do |format|
      if @achievement_category.update_attributes(params[:achievement_category])
        format.html { redirect_to admin_achievement_categories_path, notice: 'Achievement category was successfully updated.' }
        format.json { head :ok }
      else
        format.html { render action: "edit" }
        format.json { render json: @achievement_category.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /achievement_categories/1
  # DELETE /achievement_categories/1.json
  def destroy
    @achievement_category = AchievementCategory.find(params[:id])
    @achievement_category.destroy

    respond_to do |format|
      format.html { redirect_to admin_achievement_categories_url }
      format.json { head :ok }
    end
  end
end
