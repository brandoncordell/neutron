class CreateStaffMembers < ActiveRecord::Migration[5.2]
  def change
    create_table :staff_members do |t|
      t.string :email, null: false, default: ''
      t.string :username
      t.string :password_digest
      t.string :first_name, null: false, default: ''
      t.string :last_name, null: false, default: ''
      t.string :phone_number
      t.string :windows_username

      t.timestamps
    end
  end
end