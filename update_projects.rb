require 'net/http'
require 'json'
require 'uri'
require 'cgi'

# Configuration
USER = 'sladerose'
FILE_PATH = 'projects.html'
PINNED_REPOS = %w[sladerose.github.io ExternalCAP Folio LearningRuby FusionAnalyzer]

START_MARKER = '<!-- PROJECTS_START -->'
END_MARKER = '<!-- PROJECTS_END -->'
USER_AGENT = 'sladerose-portfolio-updater'

def fetch_json(url)
  uri = URI(url)
  request = Net::HTTP::Get.new(uri)
  request['User-Agent'] = USER_AGENT
  request['Authorization'] = "Bearer #{ENV['GITHUB_TOKEN']}" if ENV['GITHUB_TOKEN']
  
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

def format_project(repo, index)
  name = repo['name']
  url = repo['html_url']
  languages_url = repo['languages_url']
  
  languages_data = fetch_json(languages_url) || {}
  languages = languages_data.keys.slice(0, 3)
  
  description_raw = repo['description']
  description = CGI.escapeHTML((description_raw && !description_raw.empty?) ? description_raw : "Mission critical digital architecture.")
  
  lang_html = languages.map { |lang| "<span class=\"lang-tag mono\">#{lang.upcase}</span>" }.join("\n        ")
  
  # Shuffled mechanical delay
  delays = [4, 7, 0, 3, 6, 2, 5]
  delay = delays[index] || index
  
  span_class = ''

  name_escaped = CGI.escapeHTML(name)
  <<-HTML
    <!-- TILE #{index + 2}: #{name_escaped} -->
    <a href="#{url}" target="_blank" class="tile tile-project #{span_class}" style="--delay: #{delay}">
      <div class="card-meta mono">STRATEGIC_PRACTICE // 01.#{index + 1}</div>
      <div class="project-info">
        <h3>#{name_escaped}</h3>
        <p>#{description}</p>
      </div>

      <div class="project-langs">
        #{lang_html}
      </div>
      <div class="tile-status mono">BUILD_SOURCE // @SLADEROSE</div>
    </a>
  HTML
end



puts "Fetching projects for #{USER}..."
projects_data = fetch_json("https://api.github.com/users/#{USER}/repos?per_page=100")

if !projects_data || projects_data.empty?
  puts "No projects found or error fetching."
  exit 1
end

repo_map = projects_data.each_with_object({}) { |repo, h| h[repo['name']] = repo }
projects = PINNED_REPOS.filter_map { |name| repo_map[name] }

if projects.empty?
  puts "None of the pinned repos were found."
  exit 1
end

project_html = projects.each_with_index.map { |repo, i| format_project(repo, i) }.join("\n")



# Read index.html
content = File.read(FILE_PATH)

# Replace content between markers
regex = Regexp.new("#{Regexp.escape(START_MARKER)}.*?#{Regexp.escape(END_MARKER)}", Regexp::MULTILINE)
updated_content = content.sub(regex, "#{START_MARKER}\n#{project_html}        #{END_MARKER}")

File.write(FILE_PATH, updated_content)
puts "Updated #{FILE_PATH} with #{projects.size} projects."
