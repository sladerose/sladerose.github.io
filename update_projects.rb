require 'net/http'
require 'json'
require 'uri'

# Configuration
USER = 'sladerose'
FILE_PATH = 'index.html'
START_MARKER = '<!-- PROJECTS_START -->'
END_MARKER = '<!-- PROJECTS_END -->'

def fetch_projects(user)
  uri = URI("https://api.github.com/users/#{user}/repos?sort=updated")
  response = Net::HTTP.get(uri)
  JSON.parse(response)
rescue => e
  puts "Error fetching projects: #{e.message}"
  []
end

def format_project(repo)
  name = repo['name']
  url = repo['html_url']
  description = repo['description'] ? " — #{repo['description']}" : ""
  
  <<-HTML
        <li>
          <span class="link-arrow">/></span>
          <div class="project-content">
            <a href="#{url}" target="_blank">#{name}</a>
            <span class="project-desc">#{description}</span>
          </div>
        </li>
  HTML
end

projects = fetch_projects(USER).slice(0, 5)

if projects.empty?
  puts "No projects found or error fetching."
  exit
end

project_html = projects.map { |repo| format_project(repo) }.join

# Read index.html
content = File.read(FILE_PATH)

# Replace content between markers
regex = Regexp.new("#{Regexp.escape(START_MARKER)}.*?#{Regexp.escape(END_MARKER)}", Regexp::MULTILINE)
updated_content = content.sub(regex, "#{START_MARKER}\n#{project_html}        #{END_MARKER}")

# Write back to file
File.write(FILE_PATH, updated_content)
puts "Updated #{FILE_PATH} with #{projects.size} projects."
