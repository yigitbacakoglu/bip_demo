class Post < ActiveRecord::Base

  include Posts::Callbacks

  validates :title, :presence => true, :uniqueness => true, if: :ready?

  has_many :images
  accepts_nested_attributes_for :images


  state_machine :state, :initial => :new do
    event :ready do
      transition :from => :new, :to => :ready
    end
    event :new do
      transition :from => :ready, :to => :new
    end
    after_transition :from => :signed_up, :to => :verified do |as|
      #TODO delayed job
      #as.create_editable_data_for_affiliate
      as.delay(:queue => as.delayed_job_queue_name("_editable_data_for_affiliate")).create_editable_data_for_affiliate
    end
  end


  def initial_state
    'new'
  end

  def ready_state
    'ready'
  end

  def self.secret_create(attrs = {})

    record = new(attrs)
    record.save(:validate => false)

    # if record is not ready
    # Create delayed job to delete this or create delayed job for reminder
    # end

    record
  end
end

