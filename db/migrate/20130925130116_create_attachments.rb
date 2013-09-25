class CreateAttachments < ActiveRecord::Migration
  def change
    create_table :attachments do |t|
      t.string :file_name
      t.integer :image_id

      t.timestamps
    end
  end
end
