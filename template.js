(function() {
  var LocateMyTemplate;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  LocateMyTemplate = function() {
    var applyData, elementsFrom;
    elementsFrom = function(text, excludeScripts) {
      var container, match, tag;
      if (excludeScripts || excludeScripts === null) {
        text = text.stripScripts();
      }
      match = text.match(/^\s*<(t[dhr]|tbody|tfoot|thead)/i);
      if (match) {
        container = new Element('table');
        tag = match[1].toLowerCase();
        if (['td', 'th', 'tr'].contains(tag)) {
          container = new Element('tbody').inject(container);
          if (tag !== 'tr') {
            container = new Element('tr').inject(container);
          }
        }
      }
      return (container || new Element("div")).set('html', text).getChildren();
    };
    applyData = function(s, d) {
      var k, v;
      for (k in d) {
        v = d[k];
        s = s.replace(new RegExp('{' + k + '}', 'g'), d[k]);
      }
      return s;
    };
    this.addTemplate = function(name, t, type) {
      if (type == null) {
        type = "html";
      }
      if (this[name]) {
        throw "Template " + name + " taken";
      }
      return this[name] = function(data) {
        var json;
        if (type === "html") {
          return elementsFrom(applyData(t, data));
        } else {
          json = Haml.parse.call(data, t);
          return elementsFrom(Haml.to_html(json));
        }
      };
    };
    this.loadTemplates = function() {
      $$("script[type=text/html]").each(__bind(function(s) {
        var html;
        html = s.get("html").trim();
        return this.addTemplate(s.get("id"), html);
      }, this));
      return $$("script[type=text/haml]").each(__bind(function(s) {
        var haml;
        haml = s.get("html");
        return this.addTemplate(s.get("id"), haml, "haml");
      }, this));
    };
    return null;
  };
  window.lmt = new LocateMyTemplate();
  window.addEvent("domready", function() {
    return lmt.loadTemplates();
  });
}).call(this);
