require 'spec_helper'
require 'devise'

module AuthHelper
  def login_user
    user = FactoryBot.create(:user)
    sign_in user
  end
end
