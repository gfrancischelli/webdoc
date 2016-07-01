# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160701170139) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "map_points", force: :cascade do |t|
    t.integer  "lat"
    t.integer  "lng"
    t.integer  "video_post_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "map_points", ["video_post_id"], name: "index_map_points_on_video_post_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "video_posts", force: :cascade do |t|
    t.string   "title"
    t.text     "content"
    t.integer  "cooX"
    t.integer  "cooY"
    t.integer  "fade_in"
    t.integer  "video_id"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "fade_out"
  end

  add_index "video_posts", ["user_id"], name: "index_video_posts_on_user_id", using: :btree
  add_index "video_posts", ["video_id"], name: "index_video_posts_on_video_id", using: :btree

  create_table "videos", force: :cascade do |t|
    t.string   "title"
    t.string   "url"
    t.text     "synopsis"
    t.string   "cover"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "map_points", "video_posts"
  add_foreign_key "video_posts", "users"
  add_foreign_key "video_posts", "videos"
end
