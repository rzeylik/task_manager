class TaskAttachmentBlueprint < Blueprinter::Base
  identifier :id

  field :url do |attachment|
    attachment.attachment.url
  end

  field :name do |attachment|
    attachment.attachment.file.filename
  end
end
