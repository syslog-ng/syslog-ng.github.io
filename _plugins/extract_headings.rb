# frozen_string_literal: true

# Liquid filter that extracts heading anchors from a rendered HTML
# fragment. Used by `_js/lunr/lunr-store.js` to emit one extra entry in
# the Lunr search store per heading, so that a query that exactly
# matches a section heading (e.g. "${AMPM}" on the macros page) can
# surface as its own top-ranked result that deep-links straight to the
# anchor — instead of being buried inside the parent page's single
# body-text match.
#
# Returns an array of hashes: [{ "id" => "...", "text" => "...", "level" => 2 }, ...]
# Only headings with an `id` attribute are returned (kramdown's auto-id
# feature produces these by default). h2/h3/h4 are included; h1 is
# typically the page title and is already covered by the page-level
# entry.

require "nokogiri"

module Jekyll
  module ExtractHeadingsFilter
    HEADING_TAGS = %w[h2 h3 h4].freeze

    def extract_headings(input)
      return [] if input.nil? || input.to_s.empty?

      doc = Nokogiri::HTML.fragment(input.to_s)
      results = []
      doc.css(HEADING_TAGS.join(",")).each do |node|
        id = node["id"]
        next if id.nil? || id.empty?

        text = node.text.to_s.strip
        next if text.empty?

        results << {
          "id" => id,
          "text" => text,
          "level" => node.name.sub("h", "").to_i,
        }
      end
      results
    end
  end
end

Liquid::Template.register_filter(Jekyll::ExtractHeadingsFilter)
