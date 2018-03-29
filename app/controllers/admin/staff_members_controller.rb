# frozen_string_literal: true

module Admin
  class StaffMembersController < BaseController
    before_action :authenticate_user!
    before_action :set_staff_member, only: [:edit, :update, :destroy]

    def index
      @staff_members = StaffMember.all
    end

    def new
      @staff_member = StaffMember.new
    end

    def create
      @staff_member = StaffMember.new(staff_member_params)

      if @staff_member.save
        redirect_to admin_staff_members_path, success: 'Staff member added successfully'
      else
        render :new
      end
    end

    def edit; end

    def update
      if @staff_member.update_attributes(staff_member_params)
        redirect_to admin_staff_members_path, success: "#{@staff_member.full_name}'s profile has been updated"
      else
        render :edit
      end
    end

    def destroy
      @staff_member.destroy
      redirect_to admin_staff_members_path, success: "#{@staff_member.full_name} has been deleted"
    end

    def find
      @user = LdapService.new.find_user(params[:windows_username])

      respond_to do |format|
        format.json do
          if @user.empty?
            render json: { success: false }, status: :ok
          else
            render json: { success: true, user: @user }, status: :ok
          end
        end
      end
    end

    private

    def set_staff_member
      @staff_member = StaffMember.find(params[:id])
    end

    def staff_member_params
      params.require(:staff_member).permit(:email, :first_name, :last_name, :phone_number, :windows_username, :password)
    end
  end
end
