require 'rails_helper'

RSpec.describe 'api/tasks', type: :request do
  describe 'Tests controller' do

    before(:each) do
      @user = create(:user)
      @workspace = create(:workspace, owner: @user)
      @board = create(:board, workspace: @workspace, owner: @user)
      @list = create(:list, board: @board)
      sign_in @user
    end

    it 'do' do
      post '/api/tasks', params: { lane_id: @list.lane_id, task: { name: 'Task name' } }
      expect(response.content_type).to eq('application/json; charset=utf-8')
      expect(response).to have_http_status(:created)
      expect(JSON.parse(response.body)['title']).to eq('Task name')
    end
  end
end
