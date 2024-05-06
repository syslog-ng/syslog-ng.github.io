# frozen_string_literal: true

source "https://rubygems.org"

# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!
#
# To upgrade, run `bundle update`.

# The actual (07. febr. 2024) GitHub Pages dependency list got during CI builds
# (Do not believe the outdated info at https://pages.github.com/versions/ :S )
# 
# addressable 2.8.6
# base64 0.2.0
# bigdecimal 3.1.6
# bundler 2.3.26
# colorator 1.1.0
# concurrent-ruby 1.2.3
# csv 3.2.8
# em-websocket 0.5.3
# eventmachine 1.2.7
# faraday 2.9.0
# faraday-net_http 3.1.0
# faraday-retry 2.2.0
# ffi 1.16.3
# forwardable-extended 2.6.0
# google-protobuf 3.25.2 (x86_64-linux)
# http_parser.rb 0.8.0
# i18n 1.14.1
# jekyll 4.3.3
# jekyll-feed 0.17.0
# jekyll-gist 1.5.0
# jekyll-include-cache 0.2.1
# jekyll-paginate 1.1.0
# jekyll-remote-theme 0.4.3
# jekyll-sass-converter 3.0.0
# jekyll-sitemap 1.4.0
# jekyll-watch 2.2.1
# kramdown 2.4.0
# kramdown-parser-gfm 1.1.0
# liquid 4.0.4
# listen 3.8.0
# mercenary 0.4.0
# minimal-mistakes-jekyll 4.24.0
# net-http 0.4.1
# octokit 4.25.1
# pathutil 0.16.2
# public_suffix 5.0.4
# rake 13.1.0
# rb-fsevent 0.11.2
# rb-inotify 0.10.1
# rexml 3.2.6
# rouge 4.2.0
# rubyzip 2.3.2
# safe_yaml 1.0.5
# sass-embedded 1.70.0 (x86_64-linux-gnu)
# sawyer 0.9.2
# terminal-table 3.0.2
# unicode-display_width 2.5.0
# uri 0.13.0
# webrick 1.8.1
# 
# So, jekyll 4.3.3 is used by GitHub already!
# Try to use it in your own dev env as well!
#
# Dependeny hell, let "minimal-mistakes-jekyll" decide and add missing ones one-by one
#gem "jekyll", "~> 4.3.3"

#
# FIXME: Get rid of the chaos, use clean local theme copy, we added a bunch of enhancements already, so
# we don't really need the bundled, updated version anymore
#
# https://jekyllrb.com/docs/themes/#overriding-theme-defaults
#
gem "minimal-mistakes-jekyll"

gem "rake"
gem "csv"
gem "base64"
gem "bigdecimal"
gem "faraday-retry"
# take care, the default dependency of minimal-mistakes-jekyll.4.24.0 is mercenary-0.3.6
# that could lead to build error:
# /opt/homebrew/Cellar/ruby/3.3.0/lib/ruby/3.3.0/logger.rb:384:in `level': undefined method `[]' for nil (NoMethodError)
#    @level_override[Fiber.current] || @level
gem "mercenary", "~> 0.4"

# self made plugins dependencies
gem "nokogiri"

# Gems loaded irrespective of site configuration.
# If you have any other plugins, put them here!
# Cf. https://jekyllrb.com/docs/plugins/installation/
group :jekyll_plugins do

    gem "jekyll-remote-theme"
    # gem "jekyll-paginate"
    # gem "jekyll-sitemap"
    # gem "jekyll-gist"

    # Doc mentiones only these are needed if using remote
    # https://github.com/HofiOne/minimal-mistakes
    #
    gem "jekyll-include-cache"
    # gem "github-pages"
end
