FactoryBot.define do
  factory :task do
    name { "Task" }
    list { create(:list) }
  end
end
