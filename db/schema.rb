# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_06_19_114509) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "board_messages", force: :cascade do |t|
    t.string "text"
    t.bigint "user_id", null: false
    t.bigint "board_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["board_id"], name: "index_board_messages_on_board_id"
    t.index ["user_id"], name: "index_board_messages_on_user_id"
  end

  create_table "board_rights", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "board_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "can_edit_tasks", default: true
    t.boolean "can_edit_lists", default: false
    t.boolean "can_move_tasks", default: false
    t.boolean "can_move_lists", default: false
    t.boolean "is_admin", default: false
    t.index ["board_id"], name: "index_board_rights_on_board_id"
    t.index ["user_id"], name: "index_board_rights_on_user_id"
  end

  create_table "boards", force: :cascade do |t|
    t.bigint "workspace_id", null: false
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id"
    t.string "image"
    t.integer "image_mode", default: 0
    t.index ["user_id"], name: "index_boards_on_user_id"
    t.index ["workspace_id"], name: "index_boards_on_workspace_id"
  end

  create_table "lists", force: :cascade do |t|
    t.string "name"
    t.integer "position"
    t.bigint "board_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "lane_id"
    t.index ["board_id"], name: "index_lists_on_board_id"
  end

  create_table "task_assignments", force: :cascade do |t|
    t.bigint "task_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["task_id"], name: "index_task_assignments_on_task_id"
    t.index ["user_id"], name: "index_task_assignments_on_user_id"
  end

  create_table "task_attachments", force: :cascade do |t|
    t.string "attachment"
    t.bigint "task_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["task_id"], name: "index_task_attachments_on_task_id"
  end

  create_table "task_histories", force: :cascade do |t|
    t.bigint "task_id", null: false
    t.bigint "user_id", null: false
    t.string "action"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["task_id"], name: "index_task_histories_on_task_id"
    t.index ["user_id"], name: "index_task_histories_on_user_id"
  end

  create_table "task_relations", force: :cascade do |t|
    t.bigint "parent_id", null: false
    t.bigint "child_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["child_id"], name: "index_task_relations_on_child_id"
    t.index ["parent_id"], name: "index_task_relations_on_parent_id"
  end

  create_table "task_track_times", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "task_id", null: false
    t.interval "duration"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["task_id"], name: "index_task_track_times_on_task_id"
    t.index ["user_id"], name: "index_task_track_times_on_user_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "list_id", null: false
    t.integer "position"
    t.string "card_id"
    t.text "description"
    t.datetime "due_to"
    t.date "started_at"
    t.string "bg_color"
    t.index ["list_id"], name: "index_tasks_on_list_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "first_name"
    t.string "last_name"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "workspace_rights", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "workspace_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "can_add_boards", default: false
    t.index ["user_id"], name: "index_workspace_rights_on_user_id"
    t.index ["workspace_id"], name: "index_workspace_rights_on_workspace_id"
  end

  create_table "workspaces", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id"
    t.index ["user_id"], name: "index_workspaces_on_user_id"
  end

  add_foreign_key "board_messages", "boards"
  add_foreign_key "board_messages", "users"
  add_foreign_key "board_rights", "boards"
  add_foreign_key "board_rights", "users"
  add_foreign_key "boards", "workspaces"
  add_foreign_key "lists", "boards"
  add_foreign_key "task_assignments", "tasks"
  add_foreign_key "task_assignments", "users"
  add_foreign_key "task_attachments", "tasks"
  add_foreign_key "task_histories", "tasks"
  add_foreign_key "task_histories", "users"
  add_foreign_key "task_relations", "tasks", column: "child_id"
  add_foreign_key "task_relations", "tasks", column: "parent_id"
  add_foreign_key "task_track_times", "tasks"
  add_foreign_key "task_track_times", "users"
  add_foreign_key "tasks", "lists"
  add_foreign_key "workspace_rights", "users"
  add_foreign_key "workspace_rights", "workspaces"
end
