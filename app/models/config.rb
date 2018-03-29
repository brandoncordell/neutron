# RailsSettings Model
class Config < RailsSettings::Base
  self.table_name = 'neutron_settings'

  source Rails.root.join("config/app.yml")
  namespace Rails.env
end
