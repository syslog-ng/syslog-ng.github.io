
module Jekyll
  class CommonIncludes
    class << self

      public

      def add_includes(site, markdown_extensions, page)
        #puts page.relative_path
        
        if (markdown_extensions.include?(File.extname(page.relative_path)) || File.extname(page.relative_path) == ".html")
          #puts "------------------------------------"
          #puts page.relative_path
          #puts "------------------------------------"

          #if page.respond_to?(:content)
            page.content = "{% include doc/common_snippets %}\n" + page.content
          #end
        end # if extension is matching
      end # def do_site_pre_render_work

    end # class << self
  end # class CommonIncludes
end # module jekyll

Jekyll::Hooks.register :site, :pre_render do |site|

  markdown_extensions = site.config['markdown_ext'].split(',').map { |ext| ".#{ext.strip}" }

  site.layouts.each_value do |layout|
    Jekyll::CommonIncludes.add_includes(site, markdown_extensions, layout)
  end
  #puts ""

  site.pages.each do |page|
    Jekyll::CommonIncludes.add_includes(site, markdown_extensions, page)
  end
  #puts ""

  site.documents.each do |document|
    Jekyll::CommonIncludes.add_includes(site, markdown_extensions, document)
  end
  #puts ""

end