require 'test_helper'

class AchievementCategoriesControllerTest < ActionController::TestCase
  setup do
    @achievement_category = achievement_categories(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:achievement_categories)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create achievement_category" do
    assert_difference('AchievementCategory.count') do
      post :create, achievement_category: @achievement_category.attributes
    end

    assert_redirected_to achievement_category_path(assigns(:achievement_category))
  end

  test "should show achievement_category" do
    get :show, id: @achievement_category.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @achievement_category.to_param
    assert_response :success
  end

  test "should update achievement_category" do
    put :update, id: @achievement_category.to_param, achievement_category: @achievement_category.attributes
    assert_redirected_to achievement_category_path(assigns(:achievement_category))
  end

  test "should destroy achievement_category" do
    assert_difference('AchievementCategory.count', -1) do
      delete :destroy, id: @achievement_category.to_param
    end

    assert_redirected_to achievement_categories_path
  end
end
