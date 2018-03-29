# frozen_string_literal: true

module Admin
  class DashboardController < BaseController
    before_action :authenticate_user!

    def index; end
  end
end
