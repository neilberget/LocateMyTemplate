(function() {
  var LocateMyTemplate;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  LocateMyTemplate = function() {
    var applyData;
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
          return Elements.from(applyData(t, data));
        } else {
          json = Haml.parse.call(data, t);
          return Elements.from(Haml.to_html(json));
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
