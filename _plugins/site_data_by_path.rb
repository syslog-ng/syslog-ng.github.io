module Jekyll
  module NestedDataFilter
    def data_by_path(input, path)
      data = input
      path.split('.').each do |key|
        data = data[key]
      end
      data
    end
  end
end

Liquid::Template.register_filter(Jekyll::NestedDataFilter)
