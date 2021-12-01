class TaskAttachment < ApplicationRecord
  belongs_to :task
  mount_uploader :attachment, FileUploader
end
