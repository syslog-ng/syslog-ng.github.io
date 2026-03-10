# frozen_string_literal: true

# Monkey patch Jekyll Sass Converter to support silence_deprecations option
# This adds the ability to silence Sass deprecation warnings via _config.yml
#
# Usage in _config.yml:
#   sass:
#     silence_deprecations:
#       - import
#       - global-builtin
#
# See: https://sass-lang.com/documentation/breaking-changes/import/#silencing

module Jekyll
  module Converters
    class Scss < Converter
      # Override sass_configs to include silence_deprecations if configured
      alias_method :original_sass_configs, :sass_configs

      def sass_configs
        configs = original_sass_configs
        
        # Add silence_deprecations option if configured
        silence_deps = jekyll_sass_configuration["silence_deprecations"]
        if silence_deps && silence_deps.is_a?(Array) && !silence_deps.empty?
          # Convert to symbols as required by sass-embedded
          configs[:silence_deprecations] = silence_deps.map(&:to_sym)
          
          Jekyll.logger.debug "Sass Converter:",
                              "Silencing deprecations: #{configs[:silence_deprecations].join(', ')}"
        end
        
        configs
      end
    end
  end
end
