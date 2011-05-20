LocateMyTemplate

Usage:

    <script type="text/html" id="my_template">
      <li>
        <h3>{title}</h3>
        <p>{description}</h3>
      </li>
    </script>

or 

    <script type="text/haml" id="my_template">
      %li
        %h3 =title
        %p =description
    </script>

Then in your javascript:

    lmt.my_template({
      title:"My Title", 
      description:"The description"
    });


Thanks to:
ICanHaz.js: http://icanhazjs.com/
jQuery templating library that uses the mustache templating library

Haml-js: https://github.com/evilstreak/haml-js
Port of haml to javascript
