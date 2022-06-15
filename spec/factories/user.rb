FactoryBot.define do
  factory :user do
    email { "test@gmail.com" }
    first_name { "John" }
    last_name  { "Doe" }
    password { "12345678" }
  end
end
