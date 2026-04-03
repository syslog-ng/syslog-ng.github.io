require "cgi"

# Liquid block to render log excerpts
#
# {% log %}
# New lines are preserved.
# Long lines will be wrapped when displayed on screen.
# {% endlog %}
#
# Will be rendered in the browser to:
#
# |<--------- screen size --------->|
# | New lines are preserved.        |
# | Long lines will be wrapped when |
# |   displayed on screen.          |
class LogBlock < Liquid::Block
  def render(context)
    output = '<blockquote class="log">'
    output << CGI.escapeHTML(super.strip).gsub(/\n[[:blank:]]*/, "<br/>")
    output << "</blockquote>"
    output
  end
end

Liquid::Template.register_tag("log", LogBlock)
