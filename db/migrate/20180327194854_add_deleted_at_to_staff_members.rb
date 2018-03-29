class AddDeletedAtToStaffMembers < ActiveRecord::Migration[5.2]
  def change
    add_column :staff_members, :deleted_at, :datetime
    add_index :staff_members, :deleted_at
  end
end
