class Image < ActiveRecord::Base
  belongs_to :post
  has_many :attachments

  accepts_nested_attributes_for :attachments
end
