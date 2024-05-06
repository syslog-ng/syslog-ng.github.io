require 'fileutils'
require 'liquid'
require 'nokogiri'

module Jekyll
  class LinkGen
    class << self

    private

      def write_yaml_file(file_path, data)
        header = "# ---------------------------------------------\n" + 
                  "# This file is auto generated during site build\n" +
                  "#      - DO NOT EDIT -\n" +
                  "# ---------------------------------------------\n\n"

        FileUtils.mkdir_p(File.dirname(file_path))
        File.open(file_path, "w") do |file|
          file.write(header)
          
          file.write("id: " + data["id"] + "\n")
          file.write("url: " + data["url"] + "\n")
          file.write("title: " + data["title"] + "\n")
          file.write("description: " + data["description"] + "\n")
        end
        #puts file_path
      end

      def register_id(page, id, title, ids, titles)
        if id != nil 
          if ids[id]
            puts "Duplicated 'id: #{id}' in file " + page.relative_path
            #exit 2
          else
            ids[id] = id
          end
        end
        if title != nil 
          if titles[title]
            puts "Duplicated 'title: #{title}' in file " + page.relative_path
            #exit 2
          else
            titles[title] = title
          end
        end
      end

    public
      
      def generate_links(page, ids, titles)
        #puts page.relative_path
        # Must have to get it parsed by jekyll, these links will be part of the site.data.links array as well, do not touch them
        link_ext = 'yml'
        
        #puts "------------------------------------"
        #puts page.relative_path
        #puts "------------------------------------"

        # Skip and warn about pages without an 'id' property
        if page.data["id"]
          doc = Nokogiri::HTML(page.content)
      
          page_id = page.data["id"].to_s
          # Not removing now the leadign / to support proper root references as well everywhere
          # links must be used via the markdown_link include (or with the '| relative_url' filter) that will handle this 
          page_url = page.url.sub(/\.[^.]+$/, "") # page.url.sub(/^\//, "").sub(/\.[^.]+$/, "")
          page_path = page.destination("").split("_site/").last  # Get the path to the generated HTML file
          page_description = page['subtitle']&.strip
          page_description = page_description ? page_description : page['description']&.strip
          page_description = page_description ? page_description : ""
          #puts "page_id: " + page_id + "\npage_url :" + page_url + "\npage_path: " + page_path + "\npage_description: " + page_description

          # Find all heading elements (now from h1 to h6)
          # NOTE: This will not contain the <h1 id="page-title"> page title, as that is out of the page.content
          # FIXME: This magic 6 must be maintained together now with navigation.js (and other places?!)
          (1..6).each do |level|
            headings = doc.css("h#{level}")

            # Enumerate and output the text of each heading
            headings.each_with_index do |heading, index|
              #puts "Heading #{level} - #{index + 1}: #{heading.text}"

              heading_id = heading["id"]
              # Create links data for the heading
              link_data = {
                "id" => page_id + "##{heading_id}",
                "url" => page_url + "##{heading_id}",
                "title" => '"' + heading.text + '"',
                "description" => '""'
              }
              #register_id(page, link_data["id"], link_data["title"], ids, titles)

              # Write data to separate YAML file for each heading
              file_path = "_data/links/#{page_id}##{heading_id}.#{link_ext}"
              write_yaml_file(file_path, link_data)
            end
          end

          # Enumerate all named anchor elements too
          # This way we can referenve not automatically created links via our
          # [[title|id]] or {# include markdown_link ...$} extensions
          doc.xpath('//a[@name]').each do |anchor|
            anchor_name = anchor['name']
            anchor_text = anchor.text
            anchor_id = page_id + "##{anchor_name}"
            #puts "Anchor name: #{anchor_name}, text: #{anchor_text}, id: #{anchor_id}"

            # Create links data for the heading
            link_data = {
              "id" => anchor_id,
              "url" => page_url + "##{anchor_name}",
              "title" => '"' + (anchor_text.empty? ? anchor_id : anchor_text) + '"',
              "description" => '""'
            }
            #register_id(page, link_data["id"], link_data["title"], ids, titles)

            # Write data to separate YAML file for each anchor
            file_path = "_data/links/#{anchor_id}.#{link_ext}"
            write_yaml_file(file_path, link_data)
          end

          # Create links data for the page
          page_title = page.data["title"]
          page_link_data = {
            "id" => page_id,
            "url" => page_url,
            "title" => '"' + page_title + '"',
            "description" => '"' + page_description + '"'
          }
          register_id(page, page_link_data["id"], page_link_data["title"], ids, titles)

          # Write data to separate YAML file for each page
          page_file_path = "#{page_id}.#{link_ext}"
          page_file_path = "_data/links/" + page_file_path.gsub(/\/|:|\s/, "-").downcase
          write_yaml_file(page_file_path, page_link_data)
        
        else
          puts "Missing 'id:' property in file " + page.relative_path
          #exit 1
        end
        return page_id
      end # def generate_links

    end # class << self
  end # class LinkGen
end # module jekyll

Jekyll::Hooks.register :site, :post_render do |site|
  puts ""
  shoud_build_links = (ENV['JEKYLL_BUILD_LINKS'] == 'yes')

  if shoud_build_links
    ids = {}
    titles = {}
    markdown_extensions = site.config['markdown_ext'].split(',').map { |ext| ".#{ext.strip}" }

    [site.pages, site.documents].each do |pages|
      pages.each do |page|
        next if (false == markdown_extensions.include?(File.extname(page.relative_path)) && File.extname(page.relative_path) != ".html")

        Jekyll::LinkGen.generate_links(page, ids, titles)
      end
    end    
  end # if shoud_build_links
end # Jekyll::Hooks.register