# LocateMyTemplate
#
# Usage:
#
#     <script type="text/html" id="my_template">
#       <li>
#         <h3>{title}</h3>
#         <p>{description}</h3>
#       </li>
#     </script>
#
# or 
#
#     <script type="text/haml" id="my_template">
#       %li
#         %h3 =title
#         %p =description
#     </script>
#
# Then in your javascript:
#
#     lmt.my_template({
#       title:"My Title", 
#       description:"The description"
#     });
#
LocateMyTemplate = ->
  # Simple regex to replace all {key} with the data
  # passed. Only used in text/html templates
  applyData = (s, d) ->
    for k, v of d
      s = s.replace new RegExp('{'+k+'}', 'g'), d[k]
    s    
  
  # Sets up a function on the this object named the same
  # as the script id that can be called and passed json
  # data to in order to render the template
  @addTemplate = (name, t, type="html") ->
    # Templates can only be declared once
    if @[name]
      throw "Template " + name + " taken"
    
    # The function to render this template.
    # Uses this.applyData for text/html and
    # passes off to the Haml library for text/haml
    # templates. Returns a Mootools Elements object.
    @[name] = (data) ->
      if type == "html"
        Elements.from applyData t, data
      else
        json = Haml.parse.call data, t
        Elements.from Haml.to_html json
    
  # Finds all the script tags with type "text/html" or "text/haml"
  # and passes the id and inner html to addTemplate
  @loadTemplates = ->
    $$("script[type=text/html]").each (s) =>
      html = s.get("html").trim()
      @addTemplate s.get("id"), html
      
    $$("script[type=text/haml]").each (s) =>
      haml = s.get "html"
      @addTemplate s.get("id"), haml, "haml"
    

  # Required so coffee-script doesn't return the loadTemplates function      
  null
  
# Assign the library to the global lmt object  
window.lmt = new LocateMyTemplate()

# Load all the templates when the page loads
window.addEvent "domready", ->
  lmt.loadTemplates()
  
  