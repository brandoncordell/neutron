require 'rubycritic/rake_task'

RubyCritic::RakeTask.new do |task|
  task.paths = FileList[
      'app/controllers/**/*.rb',
      'app/helpers/*.rb',
      'app/jobs/**/*.rb',
      'app/mailers/**/*.rb',
      'app/models/**/*.rb',
      'app/services/**/*.rb'
  ]
end