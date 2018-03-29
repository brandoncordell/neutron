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

ActiveRecord::Schema.define(version: 2018_03_27_194854) do

  create_table "absorb_cache", primary_key: "cache_id", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "cache_filename", limit: 150, null: false
    t.string "cache_folder", limit: 150, null: false
    t.date "cache_date", null: false
    t.time "cache_time", default: "2000-01-01 00:00:00", null: false
    t.integer "cache_count", default: 0, null: false
  end

  create_table "acos", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "parent_id"
    t.string "model"
    t.integer "foreign_key"
    t.string "alias"
    t.integer "lft"
    t.integer "rght"
    t.index ["alias"], name: "idx_acos_alias"
    t.index ["lft", "rght"], name: "idx_acos_lft_rght"
    t.index ["model", "foreign_key"], name: "idx_acos_model_foreign_key"
  end

  create_table "alerts", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name", limit: 100, null: false
    t.integer "user_id", null: false
    t.integer "watched_id"
    t.string "detail", limit: 100
    t.string "type", limit: 100, null: false
    t.integer "location_id"
    t.integer "send_email", default: 0
    t.boolean "disabled", default: false
    t.datetime "created", null: false
    t.datetime "modified", null: false
  end

  create_table "aros", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "parent_id"
    t.string "model"
    t.integer "foreign_key"
    t.string "alias"
    t.integer "lft"
    t.integer "rght"
    t.index ["alias"], name: "idx_aros_alias"
    t.index ["lft", "rght"], name: "idx_aros_lft_rght"
    t.index ["model", "foreign_key"], name: "idx_aros_model_foreign_key"
  end

  create_table "aros_acos", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "aro_id", null: false
    t.integer "aco_id", null: false
    t.string "_create", limit: 2, default: "0", null: false
    t.string "_read", limit: 2, default: "0", null: false
    t.string "_update", limit: 2, default: "0", null: false
    t.string "_delete", limit: 2, default: "0", null: false
    t.index ["aco_id"], name: "aco_id"
    t.index ["aro_id", "aco_id"], name: "idx_aros_acos_aro_id_aco_id", unique: true
  end

  create_table "audits", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name", limit: 200, null: false, collation: "latin1_swedish_ci"
    t.integer "number_of_auditors", null: false
    t.integer "number_of_customers", null: false
    t.date "start_date", null: false
    t.date "end_date", null: false
    t.boolean "disabled", default: false, null: false
    t.datetime "created", null: false
    t.datetime "modified", null: false
  end

  create_table "audits_auditors", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "audit_id", null: false
    t.integer "user_id", null: false
  end

  create_table "audits_users", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "audit_id", null: false
    t.integer "user_id", null: false
  end

  create_table "auto_locks", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "title", null: false
    t.integer "status", default: 0, null: false
  end

  create_table "bar_code_definitions", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name", limit: 50, null: false
    t.integer "number", null: false
    t.integer "document_queue_category_id", null: false
    t.integer "cat_1"
    t.integer "cat_2"
    t.integer "cat_3"
    t.datetime "created", null: false
    t.datetime "modified", null: false
    t.index ["cat_1"], name: "cat_1"
    t.index ["cat_2"], name: "cat_2"
    t.index ["cat_3"], name: "cat_3"
    t.index ["document_queue_category_id"], name: "document_queue_category_id"
  end

  create_table "bios", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "client_name", limit: 200
    t.string "contact_number", limit: 20
    t.string "interest", limit: 100
    t.string "type", limit: 100
    t.datetime "created"
    t.datetime "modified"
    t.string "client_email", limit: 100
    t.text "description"
    t.integer "status", default: 1
  end

  create_table "cake_sessions", id: :string, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.text "data"
    t.integer "expires"
  end

  create_table "career_seekers_surveys", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.text "answers", null: false
    t.datetime "created", null: false
    t.datetime "modified", null: false
  end

  create_table "case_note_templates", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name", null: false
    t.string "subject"
    t.text "body", null: false
    t.string "service_code", limit: 10
    t.integer "auto_submit", default: 0
    t.datetime "created"
    t.datetime "modified"
    t.index ["id"], name: "case_note_templates_id_uindex", unique: true
  end

  create_table "case_notes", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "status", default: 0, null: false
    t.integer "user_id", null: false
    t.integer "location_id"
    t.string "subject", null: false
    t.text "body", null: false
    t.string "service_code", null: false
    t.integer "program", null: false
    t.integer "contact_type", null: false
    t.date "contact_date", null: false
    t.datetime "actual_service_date", comment: "This is necessary for Geosol's API"
    t.text "transaction_error"
    t.datetime "created"
    t.datetime "modified"
    t.index ["user_id"], name: "case_notes_user_id_index"
  end

  create_table "chairman_reports", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "title", limit: 100, null: false
    t.string "file", limit: 100, null: false
    t.datetime "created", null: false
    t.datetime "modified", null: false
    t.index ["title", "file"], name: "title"
  end

  create_table "contact_forms", id: :integer, unsigned: true, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.text "fields", null: false
    t.text "thank_you_message"
    t.text "recipients"
    t.datetime "created"
    t.datetime "modified"
  end

  create_table "deleted_documents", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "filename", limit: 100
    t.integer "queue_category_id"
    t.integer "admin_id"
    t.integer "user_id"
    t.integer "scanned_location_id"
    t.integer "filed_location_id"
    t.integer "deleted_location_id"
    t.integer "cat_1"
    t.integer "cat_2"
    t.integer "cat_3"
    t.string "description", null: false
    t.string "entry_method", limit: 100
    t.string "deleted_reason", limit: 100
    t.integer "last_activity_admin_id"
    t.datetime "created"
    t.datetime "modified"
    t.datetime "filed"
    t.index ["admin_id"], name: "admin_id"
    t.index ["cat_1"], name: "cat_1"
    t.index ["cat_2"], name: "cat_2"
    t.index ["cat_3"], name: "cat_3"
    t.index ["deleted_location_id"], name: "deleted_location_id"
    t.index ["filed_location_id"], name: "filed_location_id"
    t.index ["last_activity_admin_id"], name: "last_activity_admin_id"
    t.index ["queue_category_id"], name: "queue_category_id"
    t.index ["scanned_location_id"], name: "scanned_location_id"
    t.index ["user_id"], name: "user_id"
  end

  create_table "document_filing_categories", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "parent_id"
    t.string "name", limit: 100
    t.integer "lft"
    t.integer "rght"
    t.boolean "disabled", default: false
    t.boolean "secure", default: false
    t.text "secure_admins"
    t.datetime "created"
    t.datetime "modified"
    t.boolean "watch_in_programs", default: false
    t.index ["lft"], name: "lft"
    t.index ["parent_id"], name: "parent_id"
    t.index ["rght"], name: "rght"
  end

  create_table "document_queue_categories", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "ftp_path"
    t.string "name", limit: 100
    t.boolean "secure", default: false, null: false
    t.text "secure_admins"
    t.datetime "created"
    t.datetime "modified"
  end

  create_table "document_queue_filters", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "locations"
    t.string "queue_cats"
    t.string "self_scan_cats"
    t.date "from_date"
    t.date "to_date"
    t.boolean "auto_load_docs", default: false, null: false
    t.datetime "created", null: false
    t.datetime "modified", null: false
    t.index ["user_id"], name: "user_id"
  end

  create_table "ecard_program_amounts", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "ecard_program_id"
    t.float "amount"
    t.datetime "created"
    t.datetime "modified"
  end

  create_table "ecard_programs", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "parent_id"
    t.integer "lft"
    t.integer "rght"
    t.string "name", null: false
    t.string "code", limit: 50
    t.float "limit_per_card"
    t.datetime "created"
    t.datetime "modified"
  end

  create_table "ecard_programs_ecard_transactions", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "ecard_program_id"
    t.integer "ecard_transaction_id"
    t.float "amount"
    t.datetime "created"
    t.datetime "modified"
  end

  create_table "ecard_security_settings", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "pin_number"
    t.string "ip_address_or_range"
    t.string "brightwell_virtual_card_id"
    t.string "brightwell_virtual_card_password"
    t.string "brightwell_virtual_card_prefix"
    t.string "brightwell_location_id"
    t.string "brightwell_location_password"
    t.string "brightwell_location_prefix"
    t.string "brightwell_program_identifier"
  end

  create_table "ecard_transactions", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "ecard_id", null: false
    t.integer "status", default: 0, null: false
    t.integer "payment_status", default: 0
    t.string "decline_reason"
    t.float "total_amount", null: false
    t.integer "approved_by_admin_id"
    t.integer "funded_by_admin_id"
    t.integer "not_approved_by_admin_id"
    t.datetime "created", null: false
    t.datetime "modified", null: false
    t.datetime "approved"
    t.datetime "funded"
    t.datetime "not_approved"
  end

  create_table "ecards", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "account_number", null: false
    t.text "customer_signature"
    t.integer "issued_by_admin_id"
    t.datetime "issued"
    t.datetime "created"
    t.datetime "modified"
  end

  create_table "ecourse_module_question_answers", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.integer "ecourse_module_question_id", null: false
    t.string "text", null: false, collation: "utf8_general_ci"
    t.boolean "correct"
    t.datetime "created"
    t.datetime "modified"
  end

  create_table "ecourse_module_questions", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.integer "ecourse_module_id", null: false
    t.string "text", null: false, collation: "utf8_general_ci"
    t.integer "order", null: false
    t.datetime "created"
    t.datetime "modified"
  end

  create_table "ecourse_module_response_times", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.integer "ecourse_module_response_id", null: false
    t.string "type", collation: "utf8_general_ci"
    t.timestamp "time_in"
    t.timestamp "time_out"
    t.index ["ecourse_module_response_id"], name: "module_response_id"
  end

  create_table "ecourse_module_responses", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.integer "ecourse_module_id", null: false
    t.integer "ecourse_response_id", null: false
    t.integer "score"
    t.string "pass_fail", collation: "utf8_general_ci"
    t.datetime "created"
    t.datetime "modified"
    t.index ["ecourse_module_id"], name: "ecourse_module_id"
    t.index ["ecourse_response_id"], name: "ecourse_response_id"
  end

  create_table "ecourse_modules", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.integer "ecourse_id", null: false
    t.string "name", limit: 100, null: false, collation: "utf8_general_ci"
    t.text "instructions", collation: "utf8_general_ci"
    t.string "media_name", limit: 100, null: false, collation: "utf8_general_ci"
    t.string "media_type", limit: 100, null: false, collation: "utf8_general_ci"
    t.string "media_location", limit: 100, collation: "utf8_general_ci"
    t.text "embeded_html"
    t.integer "order", null: false
    t.integer "passing_percentage", null: false
    t.datetime "created"
    t.datetime "modified"
  end

  create_table "ecourse_responses", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.integer "ecourse_id", null: false
    t.integer "user_id", null: false
    t.string "status", default: "incomplete", null: false, collation: "utf8_general_ci"
    t.boolean "reset", default: false, null: false
    t.time "time_spent"
    t.integer "cert_id"
    t.datetime "completed"
    t.datetime "created"
    t.datetime "modified"
    t.index ["ecourse_id"], name: "ecourse_id"
    t.index ["user_id"], name: "user_id"
  end

  create_table "ecourse_users", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.integer "ecourse_id", null: false
    t.integer "user_id", null: false
  end

  create_table "ecourses", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.string "type", limit: 100, null: false, collation: "utf8_general_ci"
    t.string "name", limit: 100, null: false, collation: "utf8_general_ci"
    t.text "instructions", null: false, collation: "utf8_general_ci"
    t.integer "default_passing_percentage", default: 0, null: false
    t.integer "certificate_cat_1", null: false
    t.integer "certificate_cat_2"
    t.integer "certificate_cat_3"
    t.integer "order", null: false
    t.boolean "requires_user_assignment", default: false, null: false
    t.boolean "disabled", default: false, null: false
    t.datetime "created"
    t.datetime "modified"
  end

  create_table "employers_surveys", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.text "answers", null: false
    t.datetime "created", null: false
    t.datetime "modified", null: false
  end

  create_table "event_categories", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "parent_id"
    t.string "name", limit: 100
    t.datetime "created"
    t.datetime "modified"
    t.index ["parent_id"], name: "parent_id"
  end

  create_table "event_registrations", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "event_id", null: false
    t.boolean "present", default: false, null: false
    t.boolean "staff_registered", default: false, null: false
    t.datetime "created", null: false
    t.datetime "modified", null: false
    t.index ["event_id"], name: "event_id"
    t.index ["user_id"], name: "user_id"
  end

  create_table "events", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "user_id"
    t.integer "event_category_id", null: false
    t.integer "case_note_template_id"
    t.string "name", limit: 100, null: false
    t.text "description", null: false
    t.integer "location_id"
    t.string "other_location", limit: 100
    t.string "url", limit: 100
    t.datetime "created"
    t.datetime "modified"
    t.text "address", null: false
    t.datetime "scheduled"
    t.integer "seats_available"
    t.float "duration"
    t.integer "cat_1"
    t.integer "cat_2"
    t.integer "cat_3"
    t.integer "event_registration_count", default: 0, null: false
    t.string "efm_program"
    t.boolean "allow_registrations", default: false, null: false
    t.integer "private", default: 0, null: false
    t.boolean "active", default: true, null: false
    t.index ["cat_1"], name: "cat_1"
    t.index ["cat_2"], name: "cat_2"
    t.index ["cat_3"], name: "cat_3"
    t.index ["event_category_id"], name: "event_category_id"
    t.index ["location_id"], name: "location_id"
    t.index ["user_id"], name: "user_id"
  end

  create_table "featured_employers", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name", limit: 50, null: false
    t.text "description", null: false
    t.string "image", limit: 100, null: false
    t.string "image_name", limit: 100
    t.string "url", limit: 100, null: false
  end

  create_table "filed_documents", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "filename", limit: 100
    t.integer "admin_id"
    t.integer "user_id"
    t.integer "scanned_location_id"
    t.integer "filed_location_id"
    t.integer "cat_1"
    t.integer "cat_2"
    t.integer "cat_3"
    t.string "description", null: false
    t.string "entry_method", limit: 100
    t.integer "last_activity_admin_id"
    t.datetime "created"
    t.datetime "modified"
    t.datetime "filed"
    t.index ["admin_id"], name: "admin_id"
    t.index ["cat_1"], name: "cat_1"
    t.index ["cat_2"], name: "cat_2"
    t.index ["cat_3"], name: "cat_3"
    t.index ["filed_location_id"], name: "filed_location_id"
    t.index ["last_activity_admin_id"], name: "last_activity_admin_id"
    t.index ["scanned_location_id"], name: "scanned_location_id"
    t.index ["user_id"], name: "user_id"
  end

  create_table "ftp_document_scanners", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "device_ip", limit: 50
    t.string "device_name", limit: 50
    t.integer "location_id"
    t.datetime "created"
    t.datetime "modified"
    t.index ["location_id"], name: "location_id"
  end

  create_table "helpful_articles", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "title", limit: 100, null: false
    t.string "reporter", limit: 100, null: false
    t.text "summary", null: false
    t.string "link", limit: 100, null: false
    t.date "posted_date", null: false
    t.datetime "created", null: false
    t.datetime "modified", null: false
  end

  create_table "hot_jobs", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "employer", limit: 50, null: false
    t.string "title", limit: 100, null: false
    t.text "description", null: false
    t.string "location", limit: 100, null: false
    t.string "url", limit: 50
    t.string "reference_number", limit: 20
    t.string "contact", limit: 100, null: false
    t.string "file", limit: 100
    t.datetime "created", null: false
    t.datetime "modified", null: false
  end

  create_table "i18n", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "locale", limit: 6, null: false
    t.string "model", null: false
    t.integer "foreign_key", null: false
    t.string "field", null: false
    t.text "content"
    t.index ["field"], name: "field"
    t.index ["foreign_key"], name: "row_id"
    t.index ["locale"], name: "locale"
    t.index ["model"], name: "model"
  end

  create_table "in_the_news", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "title", limit: 100, null: false
    t.string "reporter", limit: 100, null: false
    t.text "summary", null: false
    t.string "link", limit: 100, null: false
    t.date "posted_date", null: false
    t.datetime "created", null: false
    t.datetime "modified", null: false
  end

  create_table "job_alerts", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.datetime "created"
    t.datetime "modified"
    t.string "full_name", limit: 200
    t.string "email_address", limit: 100
    t.string "job_interest", limit: 200
    t.string "preferred_locations", limit: 100
  end

  create_table "kiosk_buttons", primary_key: "button_id", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "id", null: false
    t.integer "parent_id"
    t.integer "kiosk_id"
    t.boolean "status", default: false, null: false
    t.string "logout_message"
    t.integer "order"
    t.string "action", limit: 60
    t.string "action_meta", limit: 200
    t.index ["button_id"], name: "button_id"
    t.index ["kiosk_id"], name: "kiosk_id"
    t.index ["parent_id"], name: "parent_id"
  end

  create_table "kiosk_partial_forms", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.integer "kiosk_id", null: false
    t.string "conditional"
    t.datetime "created"
    t.datetime "modified"
    t.integer "partial_form_id", null: false
    t.integer "priority", null: false
  end

  create_table "kiosk_survey_questions", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "kiosk_survey_id", null: false
    t.string "question", null: false
    t.string "type", limit: 50, null: false
    t.text "options"
    t.integer "order", null: false
    t.datetime "created", null: false
    t.datetime "modified", null: false
    t.index ["kiosk_survey_id"], name: "kiosk_survey_id"
  end

  create_table "kiosk_survey_response_answers", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "kiosk_survey_response_id", null: false
    t.integer "question_id", null: false
    t.string "answer", null: false
    t.datetime "created", null: false
    t.datetime "modified", null: false
    t.index ["kiosk_survey_response_id", "question_id"], name: "survey_response_id"
  end

  create_table "kiosk_survey_responses", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "kiosk_survey_id", null: false
    t.datetime "created", null: false
    t.datetime "modified", null: false
    t.string "status", limit: 45, default: "incomplete", null: false
    t.index ["user_id", "kiosk_survey_id"], name: "user_id"
  end

  create_table "kiosk_surveys", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created", null: false
    t.datetime "modified", null: false
    t.boolean "cancellable", default: true, null: false
  end

  create_table "kiosks", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "location_id"
    t.string "location_recognition_name", limit: 50
    t.string "location_description"
    t.boolean "deleted", default: false
    t.string "logout_message", limit: 50
    t.string "assistance_message"
    t.datetime "created"
    t.datetime "modified"
    t.string "default_sign_in", limit: 50, default: "user_login"
    t.integer "kiosk_version", default: 1
    t.index ["location_id"], name: "location_id"
  end

  create_table "kiosks_kiosk_surveys", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "kiosk_id", null: false
    t.integer "kiosk_survey_id", null: false
    t.index ["kiosk_id", "kiosk_survey_id"], name: "kiosk_id"
  end

  create_table "location_scopes", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "scopeable_id", null: false
    t.string "scopeable_type", null: false
    t.integer "location_id", null: false
    t.datetime "created", null: false
    t.datetime "modified", null: false
    t.index ["id"], name: "id_index", unique: true
    t.index ["scopeable_id"], name: "scopeable_id_index"
  end

  create_table "locations", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "efm_office_id"
    t.string "name", limit: 100, null: false
    t.string "public_name", limit: 100, null: false
    t.string "address_1", limit: 200, null: false
    t.string "address_2", limit: 200, null: false
    t.string "city", limit: 50, null: false
    t.string "state", limit: 2, null: false
    t.string "zip", limit: 5, null: false
    t.string "country", limit: 50, null: false
    t.float "lat"
    t.float "lng"
    t.string "telephone", limit: 14, null: false
    t.string "fax", limit: 14, null: false
    t.boolean "hidden", null: false
    t.string "hours", null: false
    t.datetime "created"
    t.datetime "modified"
    t.index ["efm_office_id"], name: "efm_office_id"
  end

  create_table "master_kiosk_buttons", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "parent_id"
    t.string "tag", limit: 100
    t.boolean "deleted", default: false, null: false
    t.integer "lft"
    t.integer "rght"
    t.string "name", limit: 60
    t.index ["parent_id"], name: "parent_id"
  end

  create_table "mobile_links", id: :integer, unsigned: true, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "program_id"
    t.string "phone_number", limit: 11, null: false
    t.integer "passcode", null: false
    t.datetime "created"
    t.datetime "modified"
  end

  create_table "mods_job_alerts", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.datetime "created"
    t.datetime "modified"
    t.string "fullname", limit: 200
    t.string "email", limit: 200
    t.string "job_interest", limit: 200
    t.string "job_location", limit: 200
    t.string "verified", limit: 50
  end

  create_table "mods_jobs", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.datetime "created"
    t.datetime "modified"
    t.string "company_name", limit: 200
    t.string "address", limit: 200
    t.string "contact_name", limit: 200
    t.string "city", limit: 100
    t.string "state", limit: 10
    t.string "zip_code", limit: 11
    t.string "phone", limit: 100
    t.string "fax", limit: 200
    t.string "ext", limit: 10
    t.string "email", limit: 200
    t.string "business_type", limit: 100
    t.string "federal_contractor", limit: 5
    t.string "staffing_fee", limit: 5
    t.string "jobsite_location", limit: 200
    t.string "accessibility", limit: 5
    t.string "position", limit: 200
    t.integer "openings_number"
    t.string "job_type", limit: 200
    t.string "minimun_age", limit: 200
    t.string "computer_skills", limit: 200
    t.string "lifting_requirements", limit: 200
    t.date "start_date"
    t.date "end_date"
    t.string "public_contractor", limit: 5
    t.string "testing_requirements", limit: 200
    t.string "veterans_preferred", limit: 5
    t.string "disability_preference", limit: 200
    t.string "affirmative_action", limit: 200
    t.string "mandatory_guest_worker", limit: 200
    t.string "green_job", limit: 1
    t.string "minimum_education_requirements", limit: 200
    t.string "pay_comments", limit: 200
    t.string "shift", limit: 200
    t.string "ojt", limit: 1
    t.string "min_pay", limit: 3
    t.string "max_pay", limit: 10
    t.integer "status"
    t.string "federal_tax_id", limit: 20
    t.string "bsc", limit: 200
    t.string "work_days", limit: 200
    t.string "work_start_time", limit: 200
    t.string "work_end_time", limit: 200
    t.string "benefits_offered", limit: 200
    t.string "education_required", limit: 200
    t.string "experience_required", limit: 200
    t.string "drivers_licence_required", limit: 200
    t.string "cdl_requirements", limit: 200
    t.string "licence_points", limit: 200
    t.string "company_checks", limit: 200
    t.string "skills", limit: 200
    t.string "job_duties", limit: 200
    t.string "referral_instructions", limit: 200
    t.string "assigned_to", limit: 200
    t.string "website_url", limit: 200
  end

  create_table "mods_mobile_stops", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.datetime "created"
    t.datetime "modified"
    t.string "organization", limit: 200
    t.string "contact_name", limit: 200
    t.string "address", limit: 200
    t.string "city", limit: 200
    t.string "state", limit: 50
    t.string "zip", limit: 200
    t.string "phone", limit: 10
    t.string "fax", limit: 10
    t.string "location", limit: 200
    t.string "cs_center", limit: 100
    t.string "location_address", limit: 200
    t.string "location_state", limit: 200
    t.string "location_city", limit: 200
    t.string "location_zip", limit: 200
    t.string "visit_date", limit: 100
    t.string "visit_arrvial_time", limit: 100
    t.string "visit_departure_time", limit: 100
    t.text "visit_purpose"
    t.boolean "job_screening"
    t.string "park_permission", limit: 3
    t.string "park_fee", limit: 10
    t.string "park_insurance", limit: 3
    t.string "rest_room_access", limit: 3
    t.integer "status"
    t.string "long", limit: 25
    t.string "lat", limit: 25
  end

  create_table "mods_tickets", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.datetime "created"
    t.datetime "modified"
    t.string "issue", limit: 200
    t.string "affected_user", limit: 200
    t.text "description"
    t.string "vnc_address", limit: 200
    t.string "piority", limit: 40
    t.string "assigned", limit: 200
    t.string "location", limit: 200
    t.string "status", limit: 20
  end

  create_table "mods_time_sheets", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.datetime "created"
    t.datetime "modified"
    t.integer "user_id"
    t.integer "center_id"
    t.integer "supervisor_id"
    t.integer "hours_worked"
    t.string "user_name"
    t.integer "monday"
    t.integer "tuesday"
    t.integer "wednesday"
    t.integer "thursday"
    t.integer "friday"
    t.integer "saturday"
    t.integer "sunday"
    t.string "comment", limit: 200
  end

  create_table "module_access_controls", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name", limit: 50, null: false
    t.boolean "permission", default: false, null: false
    t.datetime "created", null: false
    t.datetime "modified", null: false
    t.index ["name"], name: "name"
  end

  create_table "navigations", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "title", limit: 100, null: false
    t.string "link", limit: 100
    t.integer "parent_id"
    t.integer "lft"
    t.integer "rght"
    t.datetime "created"
    t.datetime "modified"
    t.index ["lft"], name: "lft"
    t.index ["parent_id"], name: "parent_id"
    t.index ["rght"], name: "rght"
  end

  create_table "neutron_settings", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "var", null: false
    t.text "value"
    t.integer "thing_id"
    t.string "thing_type", limit: 30
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["thing_type", "thing_id", "var"], name: "index_neutron_settings_on_thing_type_and_thing_id_and_var", unique: true
  end

  create_table "pages", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "parent_id"
    t.string "title", limit: 100, null: false
    t.string "slug", limit: 100, null: false
    t.string "image_url", limit: 100
    t.text "content", null: false
    t.text "header_content", null: false
    t.text "footer_content", null: false
    t.boolean "published", default: true, null: false
    t.datetime "created"
    t.datetime "modified"
    t.boolean "authentication_required", default: false, null: false
    t.boolean "locked", default: false, null: false
    t.boolean "landing_page", default: false, null: false
    t.index ["slug"], name: "slug"
  end

  create_table "partial_documents", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "file_location", null: false
    t.string "web_location", null: false
    t.text "meta"
    t.datetime "created", null: false
    t.datetime "expires", null: false
    t.integer "user_id", null: false
  end

  create_table "partial_form_answers", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.string "status", limit: 45, default: "incomplete"
    t.text "answers", comment: "A JSON string representing all answers"
    t.datetime "modified"
    t.datetime "created"
    t.string "partial_form_id", limit: 45
    t.integer "user_id", null: false
  end

  create_table "partial_form_pages", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.string "name", limit: 45
    t.integer "order", default: 1, null: false
    t.integer "partial_form_id", null: false
    t.datetime "created"
    t.datetime "modified"
  end

  create_table "partial_form_question_options", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.string "name", limit: 100, null: false
    t.string "value", limit: 100
    t.integer "partial_form_question_id", null: false
    t.integer "order", null: false
  end

  create_table "partial_form_questions", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.string "name"
    t.text "label"
    t.string "type"
    t.datetime "created"
    t.datetime "modified"
    t.integer "partial_form_page_id", null: false
    t.boolean "required", default: false
    t.integer "maxlength", default: 50
    t.integer "minlength", default: 3
    t.string "media_url"
    t.string "language", limit: 5
    t.integer "order", null: false
    t.string "width_ratio", limit: 6, default: "1"
    t.integer "inline", default: 0
  end

  create_table "partial_forms", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.string "name", null: false
    t.string "instructions"
    t.datetime "created"
    t.datetime "modified"
    t.boolean "disabled", default: false, null: false
    t.string "type", limit: 70, default: "basic", null: false
  end

  create_table "post_categories", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "category_name", limit: 100
    t.timestamp "created"
    t.timestamp "modified"
  end

  create_table "posts", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "user_id"
    t.integer "parent_id"
    t.integer "category_id"
    t.string "title"
    t.string "slug"
    t.string "tags"
    t.string "category"
    t.text "introduction"
    t.text "content"
    t.integer "featured", default: 0
    t.string "feature_image"
    t.string "status", limit: 25
    t.string "type", limit: 25
    t.string "password"
    t.integer "published"
    t.timestamp "published_on"
    t.timestamp "created"
    t.timestamp "modified"
  end

  create_table "press_releases", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "title", limit: 100, null: false
    t.string "file", limit: 100, null: false
    t.datetime "created", null: false
    t.datetime "modified", null: false
    t.index ["title", "file"], name: "title"
  end

  create_table "program_documents", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "program_id"
    t.integer "program_step_id"
    t.string "template", limit: 100
    t.string "name", limit: 100
    t.integer "cat_1"
    t.integer "cat_2"
    t.integer "cat_3"
    t.string "type", default: "snapshot"
    t.datetime "created"
    t.datetime "modified"
    t.index ["cat_1"], name: "cat_1"
    t.index ["cat_2"], name: "cat_2"
    t.index ["cat_3"], name: "cat_3"
    t.index ["program_id"], name: "program_id"
    t.index ["program_step_id"], name: "program_step_id"
  end

  create_table "program_emails", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "program_id", null: false
    t.string "program_step_id", limit: 11
    t.string "to"
    t.string "from"
    t.string "subject", null: false
    t.text "body", null: false
    t.string "type", limit: 25, null: false
    t.string "name", limit: 100, null: false
    t.boolean "disabled", default: false, null: false
    t.datetime "created", null: false
    t.datetime "modified", null: false
    t.index ["program_id"], name: "program_id"
    t.index ["program_step_id"], name: "program_step_id"
  end

  create_table "program_form_fields", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "program_step_id", null: false
    t.integer "order", null: false
    t.string "label", limit: 500, null: false
    t.string "type", limit: 100, null: false
    t.string "name", limit: 500
    t.text "attributes"
    t.text "options"
    t.text "validation"
    t.text "instructions"
    t.string "answer"
    t.string "fieldset"
    t.datetime "created", null: false
    t.datetime "modified", null: false
    t.integer "hide_from_customers", default: 0
    t.index ["program_step_id"], name: "program_id"
  end

  create_table "program_forms", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
  end

  create_table "program_inputs", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
  end

  create_table "program_instructions", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "program_id"
    t.integer "program_step_id"
    t.text "text", null: false
    t.string "type", limit: 100, null: false
    t.datetime "created", null: false
    t.datetime "modified", null: false
    t.index ["program_id"], name: "program_id"
    t.index ["program_step_id"], name: "program_step_id"
  end

  create_table "program_repairs", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "program_step_id"
    t.integer "program_form_field_id"
    t.text "field_name"
    t.text "correct_name"
    t.text "field_label"
    t.timestamp "created"
    t.timestamp "modified"
  end

  create_table "program_response_activities", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "program_response_id", null: false
    t.string "type", null: false
    t.string "status", null: false
    t.text "answers"
    t.integer "percent_correct"
    t.datetime "created"
    t.datetime "modified"
    t.integer "program_step_id", null: false
    t.index ["program_response_id"], name: "program_response_id"
    t.index ["program_step_id"], name: "program_step_id"
  end

  create_table "program_response_docs", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "cat_id"
    t.integer "program_response_id", null: false
    t.integer "doc_id", null: false
    t.integer "program_doc_id"
    t.string "type", default: " ", null: false
    t.boolean "deleted", default: false, null: false
    t.string "deleted_reason", null: false
    t.string "rejected_reason"
    t.datetime "created", null: false
    t.datetime "modified", null: false
    t.index ["cat_id"], name: "cat_id"
    t.index ["doc_id"], name: "doc_id"
    t.index ["program_doc_id"], name: "program_doc_id"
    t.index ["program_response_id"], name: "program_response_id"
  end

  create_table "program_responses", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "program_id"
    t.integer "user_id"
    t.string "status", default: "incomplete"
    t.string "confirmation_id", limit: 12
    t.text "notes"
    t.text "not_approved_comment"
    t.datetime "created"
    t.datetime "modified"
    t.datetime "expires_on"
    t.timestamp "time_spent"
    t.index ["program_id"], name: "prog_id"
    t.index ["user_id"], name: "user_id"
  end

  create_table "program_steps", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "program_id", null: false
    t.integer "parent_id"
    t.string "name"
    t.string "type"
    t.string "media_location"
    t.string "media_type", limit: 100
    t.boolean "redoable", default: false, null: false
    t.text "meta"
    t.integer "lft"
    t.integer "rght"
    t.datetime "created"
    t.datetime "modified"
    t.integer "status", default: 1
    t.index ["lft"], name: "lft"
    t.index ["parent_id"], name: "parent_id"
    t.index ["program_id"], name: "program_id"
    t.index ["rght"], name: "rght"
    t.index ["type"], name: "program_step_type_id"
  end

  create_table "programs", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name", limit: 100
    t.text "description"
    t.string "type", limit: 100
    t.string "atlas_registration_type", limit: 10
    t.boolean "disabled", default: false
    t.integer "queue_category_id"
    t.boolean "approval_required", default: false
    t.boolean "form_esign_required", default: false
    t.boolean "user_acceptance_required", default: false
    t.integer "confirmation_id_length"
    t.integer "response_expires_in"
    t.integer "send_expiring_soon"
    t.boolean "rolling_expiration"
    t.integer "program_response_count"
    t.boolean "show_in_dash", default: false
    t.boolean "in_test", default: false
    t.integer "bar_code_definition_id"
    t.integer "hide_user_info", default: 0, null: false
    t.boolean "paper_forms", default: false
    t.boolean "upload_docs", default: false
    t.text "media_acknowledgement_text"
    t.datetime "created"
    t.datetime "modified"
    t.datetime "expires"
    t.boolean "mobile_upload", default: false
    t.index ["queue_category_id"], name: "queue_category_id"
  end

  create_table "queued_documents", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "filename", limit: 100
    t.integer "queue_category_id"
    t.integer "bar_code_definition_id"
    t.string "scanned_location_id", limit: 11
    t.integer "locked_by"
    t.boolean "locked_status", default: false, null: false
    t.integer "self_scan_cat_id"
    t.string "entry_method", limit: 100
    t.integer "last_activity_admin_id"
    t.integer "user_id"
    t.datetime "created"
    t.datetime "modified"
    t.index ["bar_code_definition_id"], name: "bar_code_definition_id"
    t.index ["last_activity_admin_id"], name: "last_activity_admin_id"
    t.index ["locked_by"], name: "locked_by"
    t.index ["queue_category_id"], name: "queue_category_id"
    t.index ["scanned_location_id"], name: "scanned_location_id"
    t.index ["self_scan_cat_id"], name: "self_scan_cat_id"
    t.index ["user_id"], name: "user_id"
  end

  create_table "queued_tasks", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "jobtype", limit: 45, null: false
    t.text "data"
    t.string "group"
    t.string "reference"
    t.datetime "created"
    t.datetime "notbefore"
    t.datetime "fetched"
    t.datetime "completed"
    t.integer "failed", default: 0, null: false
    t.text "failure_message"
    t.string "workerkey", limit: 45
  end

  create_table "referral_questions", id: :integer, unsigned: true, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "kiosk_id"
    t.text "text"
    t.integer "order"
    t.datetime "created"
    t.datetime "modified"
    t.index ["kiosk_id"], name: "kiosk_id"
  end

  create_table "report_filters", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name", default: " ", null: false
    t.string "date_range", limit: 13, default: " ", null: false
    t.string "chart_breakdown", limit: 10
    t.string "group_by", limit: 10, default: " ", null: false
    t.string "display_as", limit: 5, default: " ", null: false
    t.text "admin"
    t.text "kiosk"
    t.text "location"
    t.text "program"
    t.datetime "created", null: false
    t.datetime "modified", null: false
  end

  create_table "rfps", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "title", limit: 50, null: false
    t.string "byline", limit: 80, null: false
    t.text "description", null: false
    t.datetime "deadline"
    t.datetime "expires"
    t.string "contact_email", limit: 50, null: false
    t.string "file", limit: 100, null: false
    t.datetime "created", null: false
    t.datetime "modified", null: false
  end

  create_table "roles", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name", limit: 100, null: false
    t.datetime "created", null: false
    t.datetime "modified", null: false
    t.boolean "can_view_full_ssn", default: true, null: false
  end

  create_table "room_requests", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.datetime "created"
    t.datetime "modified"
    t.string "event", limit: 200
    t.date "date"
    t.string "start_time", limit: 200
    t.string "end_time", limit: 200
    t.string "location", limit: 250
    t.string "room", limit: 250
    t.text "notes"
    t.integer "status"
    t.integer "user_id"
  end

  create_table "self_scan_categories", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name", limit: 100
    t.integer "queue_cat_id"
    t.integer "cat_1"
    t.integer "cat_2"
    t.integer "cat_3"
    t.integer "parent_id"
    t.integer "lft"
    t.integer "rght"
    t.datetime "created"
    t.datetime "modified"
    t.index ["lft"], name: "lft"
    t.index ["parent_id"], name: "parent_id"
    t.index ["queue_cat_id"], name: "queue_cat_id"
    t.index ["rght"], name: "rght"
  end

  create_table "self_sign_log_archives", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "user_id"
    t.integer "kiosk_id"
    t.integer "location_id"
    t.integer "level_1"
    t.integer "level_2"
    t.integer "level_3"
    t.string "other", limit: 100
    t.integer "status", default: 0, null: false
    t.integer "last_activity_admin_id"
    t.datetime "created"
    t.datetime "modified"
    t.datetime "closed"
    t.index ["kiosk_id"], name: "kiosk_id"
    t.index ["last_activity_admin_id"], name: "last_activity_admin_id"
    t.index ["level_1"], name: "level_1"
    t.index ["level_2"], name: "level_2"
    t.index ["level_3"], name: "level_3"
    t.index ["location_id"], name: "location_id"
    t.index ["user_id"], name: "user_id"
  end

  create_table "self_sign_logs", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "user_id"
    t.integer "kiosk_id"
    t.integer "location_id"
    t.integer "level_1"
    t.integer "level_2"
    t.integer "level_3"
    t.string "other", limit: 100
    t.integer "status", default: 0, null: false
    t.integer "last_activity_admin_id"
    t.datetime "created"
    t.datetime "modified"
    t.datetime "closed"
    t.index ["kiosk_id"], name: "kiosk_id"
    t.index ["last_activity_admin_id"], name: "last_activity_admin_id"
    t.index ["level_1"], name: "level_1"
    t.index ["level_2"], name: "level_2"
    t.index ["level_3"], name: "level_3"
    t.index ["location_id"], name: "location_id"
    t.index ["user_id"], name: "user_id"
  end

  create_table "service_codes", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "title", null: false
    t.string "service_code", limit: 10, null: false
    t.string "trigger"
    t.datetime "created"
    t.datetime "modified"
  end

  create_table "settings", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "module", null: false
    t.string "name", null: false
    t.text "value"
    t.datetime "created", null: false
    t.datetime "modified", null: false
  end

  create_table "staff_members", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "username"
    t.string "password_digest"
    t.string "first_name", default: "", null: false
    t.string "last_name", default: "", null: false
    t.string "phone_number"
    t.string "windows_username"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "deleted_at"
    t.index ["deleted_at"], name: "index_staff_members_on_deleted_at"
  end

  create_table "user_transactions", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "user_id"
    t.string "location", limit: 100
    t.string "module", limit: 100
    t.string "details"
    t.datetime "created"
    t.index ["user_id"], name: "user_id"
  end

  create_table "users", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "state_id"
    t.string "firstname", limit: 50
    t.string "lastname", limit: 50
    t.string "middle_initial", limit: 3
    t.string "ssn", limit: 9
    t.string "username", limit: 25
    t.integer "role_id"
    t.string "windows_username", limit: 100
    t.string "password", limit: 40
    t.string "address_1", limit: 100
    t.string "city", limit: 50
    t.string "county", limit: 100
    t.string "state", limit: 30
    t.string "zip", limit: 5
    t.string "phone", limit: 20
    t.string "alt_phone", limit: 20
    t.string "gender", limit: 6
    t.date "dob"
    t.string "language", limit: 100
    t.string "ethnicity", limit: 100
    t.string "race", limit: 100
    t.integer "veteran"
    t.integer "disability"
    t.string "organization", limit: 100
    t.boolean "disabled", default: false
    t.integer "signature", default: 0
    t.text "signature_data"
    t.integer "location_id"
    t.string "id_card_number"
    t.datetime "signature_created"
    t.datetime "signature_modified"
    t.datetime "created"
    t.datetime "modified"
    t.string "guardian", limit: 45
    t.integer "guardian_signature", default: 0
    t.text "guardian_signature_data"
    t.datetime "last_kiosk_login"
    t.boolean "scope_to_location"
    t.string "migrant_seasonal_worker", limit: 5
    t.string "email", limit: 100
    t.string "name_suffix", limit: 10
    t.text "referred_by"
    t.index ["location_id"], name: "location_id"
    t.index ["role_id"], name: "role_id"
  end

  create_table "watched_filing_cats", id: :integer, options: "ENGINE=MyISAM DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "cat_id", null: false
    t.integer "program_id", null: false
    t.string "name", limit: 100
    t.integer "program_email_id"
    t.datetime "created"
    t.datetime "modified"
    t.index ["cat_id"], name: "cat_id"
    t.index ["program_email_id"], name: "program_email_id"
    t.index ["program_id"], name: "program_id"
  end

end
