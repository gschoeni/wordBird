require 'test_helper'

class AchievementsControllerTest < ActionController::TestCase
  setup do
    @achievement = achievements(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:achievements)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create achievement" do
    assert_difference('Achievement.count') do
      post :create, achievement: @achievement.attributes
    end

    assert_redirected_to achievement_path(assigns(:achievement))
  end

  test "should show achievement" do
    get :show, id: @achievement.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @achievement.to_param
    assert_response :success
  end

  test "should update achievement" do
    put :update, id: @achievement.to_param, achievement: @achievement.attributes
    assert_redirected_to achievement_path(assigns(:achievement))
  end

  test "should destroy achievement" do
    assert_difference('Achievement.count', -1) do
      delete :destroy, id: @achievement.to_param
    end

    assert_redirected_to achievements_path
  end
end
