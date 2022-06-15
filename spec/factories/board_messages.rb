FactoryBot.define do
  factory :board_message do
    text { "MyString" }
    user { nil }
    board { nil }
  end
end
