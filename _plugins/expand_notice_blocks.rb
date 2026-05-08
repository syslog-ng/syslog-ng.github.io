# Expands explicit, paired notice block markers into a kramdown-compatible
# `<div class="notice--TYPE" markdown="1">…</div>` wrapper.
#
# Source syntax (must each be on its own line, optional leading whitespace):
#
#   {: .notice--warning-start}
#
#   **WARNING:** anything goes here:
#
#   1. ordered list
#   2. items
#
#   - bullet list
#   - items
#
#   ```config
#   even fenced code
#   ```
#
#   {: .notice--warning-end}
#
# Becomes:
#
#   <div class="notice--warning" markdown="1">
#
#   …content unchanged…
#
#   </div>
#
# Rules (strictly enforced — any violation aborts the build):
#   - the type must be one of the Minimal Mistakes notice variants
#     (primary / info / warning / danger / success)
#   - every `*-start` must have a matching `*-end` of the SAME type, in source order
#   - nesting is forbidden (a `*-start` while another block is still open => error)
#   - markers inside fenced code blocks (``` / ````) and HTML comments (<!-- -->)
#     are left untouched, so docs that document this syntax do not trigger it
#
# Convenience: while inside a notice block, a blank line is automatically
# inserted before a list marker that follows a non-list prose line, so the
# author does not need to add one manually for kramdown to recognise the list.
#
# Runs in BOTH the link-generation and the tooltip-generation Jekyll builds
# (no `JEKYLL_BUILD_*` env gate). Both passes must see the same expanded HTML
# so that tooltip matching and link generation agree on page structure.

module Jekyll
  module ExpandNoticeBlocks
    # Notice variants supported by the Minimal Mistakes theme. Anything else
    # in a `{: .notice--TYPE-start/-end}` marker is rejected at build time.
    ALLOWED_TYPES = %w[primary info warning danger success].freeze

    # Lines that, when matched against a non-skipped region of page content,
    # are treated as opening / closing markers. The leading whitespace before
    # the IAL is captured so the emitted `<div>` / `</div>` can be re-indented
    # to the same column — that keeps the wrapper inside any enclosing list
    # item or blockquote so list numbering and indentation stay intact.
    START_PATTERN = /^([ \t]*)\{:\s*\.notice--([A-Za-z0-9_]+)-start\s*\}[ \t]*$/
    END_PATTERN   = /^([ \t]*)\{:\s*\.notice--([A-Za-z0-9_]+)-end\s*\}[ \t]*$/

    # Skip patterns: regions of content where markers must be ignored.
    # The alternation order matters: longer fences first so `````` wins over ```.
    # NOTE: must be a *capturing* group so `String#split` keeps the matched
    # fences as alternating elements of the result array — otherwise the
    # post-fence segment shifts to an odd index and gets dropped.
    SKIP_PATTERN = /((?m:<!--.*?-->|````.*?````|```.*?```))/

    # Public entry point: expand all paired markers in `content`. Returns the
    # rewritten content. Raises `Jekyll::ExpandNoticeBlocks::Error` on any
    # structural problem so the build stops with a clear message.
    def self.expand(content, page_path)
      # Split content into "skip" segments (code fences, HTML comments) and
      # "live" segments. `String#split` with a capturing group keeps the
      # delimiters in the result; alternating index 0,2,4,... are live.
      parts = content.split(SKIP_PATTERN, -1)

      open_state = nil      # either nil or { type:, line: }
      out_parts  = []

      parts.each_with_index do |part, idx|
        if idx.odd?
          # Skip segment (fenced code or HTML comment) — emit verbatim.
          out_parts << part
          next
        end

        rewritten_lines = []
        # Track running line number (1-based, within the original page) for
        # error reporting. We approximate it by counting newlines in already
        # emitted content; that is good enough for diagnostics.
        base_line = out_parts.join.count("\n") + 1
        local_line = 0

        part.each_line do |line|
          local_line += 1
          current_line = base_line + local_line - 1

          if (m = line.match(START_PATTERN))
            indent = m[1]
            type = m[2]
            unless ALLOWED_TYPES.include?(type)
              raise Error,
                    "#{page_path}:#{current_line}: unknown notice type `#{type}` in " \
                    "`{: .notice--#{type}-start}` (allowed: #{ALLOWED_TYPES.join(', ')})"
            end
            if open_state
              raise Error,
                    "#{page_path}:#{current_line}: nested `{: .notice--#{type}-start}` is not allowed; " \
                    "previous `{: .notice--#{open_state[:type]}-start}` opened at line #{open_state[:line]} is still open"
            end
            open_state = { type: type, line: current_line, indent: indent }
            # Emit kramdown-friendly wrapper with surrounding blank lines so the
            # block is recognized as a standalone HTML block. Preserve the
            # opener's leading whitespace so the <div> stays inside any
            # enclosing list item or block-quote, keeping list numbering intact.
            rewritten_lines << "\n#{indent}<div class=\"notice--#{type}\" markdown=\"1\">\n"
          elsif (m = line.match(END_PATTERN))
            type = m[2]
            unless ALLOWED_TYPES.include?(type)
              raise Error,
                    "#{page_path}:#{current_line}: unknown notice type `#{type}` in " \
                    "`{: .notice--#{type}-end}` (allowed: #{ALLOWED_TYPES.join(', ')})"
            end
            unless open_state
              raise Error,
                    "#{page_path}:#{current_line}: `{: .notice--#{type}-end}` has no matching `-start`"
            end
            unless open_state[:type] == type
              raise Error,
                    "#{page_path}:#{current_line}: `{: .notice--#{type}-end}` does not match opener " \
                    "`{: .notice--#{open_state[:type]}-start}` at line #{open_state[:line]}"
            end
            indent = open_state[:indent]
            open_state = nil
            rewritten_lines << "\n#{indent}</div>\n"
          else
            # While inside a notice block, transparently insert a blank line
            # before a list marker (`- `, `* `, `+ `, `1. `) if the previous
            # emitted line is non-blank prose, so kramdown recognises it as a
            # list. This matches the UX of the legacy single-block IAL form
            # where blank lines were not required around the notice.
            if open_state && line =~ /\A[ \t]*(?:[-*+]|\d+[.)])[ \t]+/
              prev = rewritten_lines.last
              if prev && prev != "\n" && prev !~ /\A[ \t]*\z/m && \
                 prev !~ /\A[ \t]*(?:[-*+]|\d+[.)])[ \t]+/ && \
                 prev !~ /\A[ \t]*>/ && \
                 prev !~ /\A\s*<div\b/
                rewritten_lines << "\n"
              end
            end

            rewritten_lines << line
          end
        end

        out_parts << rewritten_lines.join
      end

      if open_state
        raise Error,
              "#{page_path}:#{open_state[:line]}: `{: .notice--#{open_state[:type]}-start}` has no matching `-end`"
      end

      out_parts.join
    end

    class Error < StandardError; end
  end
end

Jekyll::Hooks.register :site, :pre_render do |site|
  markdown_exts = site.config['markdown_ext'].split(',').map { |e| ".#{e.strip}" }

  [site.pages, site.documents].each do |collection|
    collection.each do |page|
      ext = File.extname(page.relative_path)
      next unless markdown_exts.include?(ext) || ext == ".html"
      next if page.content.nil?

      # Cheap fast-path: only do the work if either marker form might appear.
      next unless page.content.include?("-start}") || page.content.include?("-end}")

      page.content = Jekyll::ExpandNoticeBlocks.expand(page.content, page.relative_path)
    end
  end
end

# `_includes/` files are read directly from disk by `{% include %}` at Liquid
# render time — that path bypasses our `:pre_render` hook, so markers inside
# include partials would never be expanded.
#
# In Jekyll 4 the standard `{% include %}` tag is `Jekyll::Tags::OptimizedIncludeTag`,
# which delegates to `Jekyll::Inclusion#render` → `Jekyll::Inclusion#content`
# (and bypasses the older `IncludeTag#read_file`). `IncludeRelativeTag` and the
# legacy code path still go through `IncludeTag#read_file`. Patch both so any
# include path expands paired notice markers exactly once.
require "jekyll/tags/include"
require "jekyll/inclusion"

module Jekyll
  class Inclusion
    unless method_defined?(:__expand_notice_blocks_orig_content)
      alias_method :__expand_notice_blocks_orig_content, :content

      def content
        raw = __expand_notice_blocks_orig_content
        return raw unless raw.is_a?(String)
        return raw unless raw.include?("-start}") || raw.include?("-end}")

        @__expand_notice_blocks_expanded ||= Jekyll::ExpandNoticeBlocks.expand(raw, path)
      end
    end
  end

  module Tags
    class IncludeTag
      unless method_defined?(:__expand_notice_blocks_orig_read_file)
        alias_method :__expand_notice_blocks_orig_read_file, :read_file

        def read_file(file, context)
          content = __expand_notice_blocks_orig_read_file(file, context)
          return content unless content.is_a?(String)
          return content unless content.include?("-start}") || content.include?("-end}")

          Jekyll::ExpandNoticeBlocks.expand(content, file)
        end
      end
    end
  end
end
