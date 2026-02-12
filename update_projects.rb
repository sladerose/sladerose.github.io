require 'net/http'
require 'json'
require 'uri'

# Configuration
USER = 'sladerose'
FILE_PATH = 'index.html'
START_MARKER = '<!-- PROJECTS_START -->'
END_MARKER = '<!-- PROJECTS_END -->'
USER_AGENT = 'sladerose-portfolio-updater'

def fetch_json(url)
  uri = URI(url)
  request = Net::HTTP::Get.new(uri)
  request['User-Agent'] = USER_AGENT
  
  response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|
    http.request(request)
  end

  if response.is_a?(Net::HTTPSuccess)
    JSON.parse(response.body)
  else
    puts "Warning: API request failed for #{url} with status #{response.code} #{response.message}"
    nil
  end
rescue => e
  puts "Error fetching JSON from #{url}: #{e.message}"
  nil
end

def format_project(repo)
  name = repo['name']
  url = repo['html_url']
  languages_url = repo['languages_url']
  
  languages_data = fetch_json(languages_url) || {}
  languages = languages_data.keys
  
  description_raw = repo['description']
  description = (description_raw && !description_raw.empty?) ? " — #{description_raw}" : ""
  
  lang_html = languages.map { |lang| "<span class=\"project-lang\">#{lang}</span>" }.join("\n              ")
  
  <<-HTML
        <li>
          <span class="link-arrow">/></span>
          <div class="project-content">
            <div class="project-header">
              <a href="#{url}" target="_blank">#{name}</a>
              <div class="project-langs">
                #{lang_html}
              </div>
            </div>
            <span class="project-desc">#{description}</span>
          </div>
        </li>
  HTML
end

puts "Fetching projects for #{USER}..."
projects_data = fetch_json("https://api.github.com/users/#{USER}/repos?sort=updated")

if !projects_data || projects_data.empty?
  puts "No projects found or error fetching."
  exit 1
end

projects = projects_data.slice(0, 5)
project_html = projects.map { |repo| format_project(repo) }.join

# Read index.html
content = File.read(FILE_PATH)

# Replace content between markers
regex = Regexp.new("#{Regexp.escape(START_MARKER)}.*?#{Regexp.escape(END_MARKER)}", Regexp::MULTILINE)
updated_content = content.sub(regex, "#{START_MARKER}\n#{project_html}        #{END_MARKER}")

File.write(FILE_PATH, updated_content)
puts "Updated #{FILE_PATH} with #{projects.size} projects."

# Update copyright year
current_year = Time.now.year
copyright_regex = /&copy; \d{4} Slade Rose/
if content.match?(copyright_regex)
  fresh_content = File.read(FILE_PATH)
  final_content = fresh_content.sub(copyright_regex, "&copy; #{current_year} Slade Rose")
  File.write(FILE_PATH, final_content)
  puts "Updated copyright year to #{current_year}."
end
