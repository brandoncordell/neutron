# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.5.0'
gem 'rails', '~> 5.2.0.rc1'

gem 'bcrypt', '~> 3.1.7'
gem 'bootsnap', '>= 1.1.0', require: false
# gem 'mini_magick', '~> 4.8'
# gem 'redis', '~> 4.0'
gem 'flutie', '~> 2.0'
gem 'gretel', '~> 3.0'
gem 'jbuilder', '~> 2.5'
gem 'mysql2', '~> 0.4.4'
gem 'net-ldap', '~> 0.16'
gem 'paranoia', '~> 2.4'
gem 'puma', '~> 3.11'
gem 'rails-settings-cached', '~> 0.6'
gem 'rubycritic', require: false
gem 'sass-rails', '~> 5.0'
gem 'simple_form', '~> 3.5'
gem 'turbolinks', '~> 5'
gem 'uglifier', '>= 1.3.0'
gem 'webpacker'

group :development, :test do
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'factory_bot_rails', '~> 4.8'
  gem 'rspec-rails', '~> 3.7'
  gem 'spring-commands-rspec'
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'pry-rails', '~> 0.3'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'web-console', '>= 3.3.0'
end

group :test do
  gem 'database_cleaner'
  gem 'rails-controller-testing'
  gem 'shoulda-matchers', '~> 3.1'
  gem 'simplecov', require: false
end
