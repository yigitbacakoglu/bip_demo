module Posts
  module Callbacks
    extend ActiveSupport::Concern

    included do
      #       scope :foo, :conditions => { :created_at => nil }

      before_save :check_if_ready
    end

    module ClassMethods
    end


    module InstanceMethods

      def check_if_ready
        return true if self.state == self.ready_state

        self.state = self.ready_state

        if self.valid? && check_model_validations && check_attribute_validations
          self.state = self.ready_state
        else
          self.state = self.state_was
        end

      end

      def check_model_validations
        true
      end

      def check_attribute_validations
        true
      end

    end


  end
end