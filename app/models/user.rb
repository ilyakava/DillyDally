# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  email                  :string(255)      default(""), not null
#  encrypted_password     :string(255)      default(""), not null
#  reset_password_token   :string(255)
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0)
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :string(255)
#  last_sign_in_ip        :string(255)
#  created_at             :datetime
#  updated_at             :datetime
#

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  attr_accessible :email, :password, :password_confirmation

  has_many :user_locations
  has_many :locations, through: :user_locations

  has_many :created_locations, class_name: 'Location', foreign_key: :creator

  has_many :comments

  has_many :collections

  has_many :friendships
  has_many :friends, through: :friendships, source: :friend

  has_many :reverse_friendships, class_name: 'Friendship', foreign_key: :friend_id
  has_many :followers, through: :friendships, source: :user
end
