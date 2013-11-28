window.<%= _.capitalize(resourceName) %>Controller = {};

// View for <%= resourceName %>/index.html
<%= _.capitalize(resourceName) %>Controller["index"] = Backbone.View.extend({
  el: "body",

  template: "script.view[id=index]",
  compiledTemplate: "",

  initialize: function() {
    _.bindAll(this, 'render', 'appendItem', 'onMessage'); // bind scope of this within functions

    // compile template so that it can be used later
    this.compiledTemplate = _.template( $(this.template).html() );

    this.render();

    // setup the model collection
    this.collection = new <%= _.capitalize(resourceName) %>Collection();
    this.collection.on('add', this.appendItem);
    this.collection.on('reset', this.render);

    // after editing the model, view should update
    window.addEventListener("message", this.onMessage, false);

    // load model collection from server
    this.collection.fetch();

    // 'tap' event can be used after this
    this.$el.hammer();

    // setup navigation bar
    steroids.view.navigationBar.show("<%= _.capitalize(resourceName) %> Index");

    var rightButton = new steroids.buttons.NavigationBarButton();
    rightButton.title = "Add";
    rightButton.onTap = function() {
      view = new steroids.views.WebView("/views/<%= resourceName %>/new.html");
      steroids.modal.show(view);
    };
    steroids.view.navigationBar.setButtons({right: [rightButton]});

    return this;
  },

  render: function() {
    this.$el.html( this.compiledTemplate );
    return this;
  },

  appendItem: function(item) {
    $("ul", this.$el).append("<li class='topcoat-list__item item' id='"+item.get('<%= resourceName %>_id')+"'>"+item.get('name')+"</li>");
  },

  events: {
    "tap li": "open"
  },

  open: function(event) {
    view = new steroids.views.WebView("/views/<%= resourceName %>/show.html?id="+$(event.target).attr("id"));
    steroids.layers.push(view);
  },

  onMessage: function(e) {
    var data = JSON.parse(e.data);
    if (data.msg === "refresh") {
      this.collection.reset([]);
      this.collection.fetch();
    }
  }

});


// View for <%= resourceName %>/show.html
<%= _.capitalize(resourceName) %>Controller["show"] = Backbone.View.extend({
  el: "body",

  template: "script.view[id=show]",
  compiledTemplate: "",

  initialize: function() {
    _.bindAll(this, 'render', 'onMessage'); // bind scope of this within functions

    this.compiledTemplate = _.template( $(this.template).html() )

    this.model = new <%= _.capitalize(resourceName) %>({<%= resourceName %>_id: steroids.view.params.id});

    this.model.bind('change', this.render, this);

    // after editing the model, view needs to be updated
    window.addEventListener("message", this.onMessage, false);

    this.model.fetch();

    // setup navigation bar
    steroids.view.navigationBar.show("<%= _.capitalize(resourceName) %> Show");

    var rightButton = new steroids.buttons.NavigationBarButton();
    rightButton.title = "Edit";
    rightButton.onTap = function() {
      view = new steroids.views.WebView("/views/<%= resourceName %>/edit.html?id="+steroids.view.params.id);
      steroids.modal.show(view);
    };
    steroids.view.navigationBar.setButtons({right: [rightButton]});

    return this;
  },

  render: function() {
    this.$el.html( this.compiledTemplate(this.model.attributes) );
    return this;
  },

  onMessage: function(e) {
    var data = JSON.parse(e.data);
    if (data.msg === "refresh") this.model.fetch();
  }

});



// View for <%= resourceName %>/edit.html
<%= _.capitalize(resourceName) %>Controller["edit"] = Backbone.View.extend({
  el: "body",

  template: "script.view[id=edit]",

  initialize: function() {
    _.bindAll(this, 'render', 'save', 'close', 'afterSave'); // bind scope of this within functions

    this.model = new <%= _.capitalize(resourceName) %>({<%= resourceName %>_id: steroids.view.params.id});

    this.model.fetch({success: this.render});

    // setup navigation bar
    steroids.view.navigationBar.show("<%= _.capitalize(resourceName) %> Edit");

    // 'tap' event can be used after this
    this.$el.hammer();

    return this;
  },

  render: function() {
    this.$el.html( _.template( $(this.template).html(), this.model.attributes ) );
    return this;
  },

  events: {
    "tap a#updateButton": "save",
    "tap a#closeButton": "close"
  },

  close: function() {
    steroids.modal.hide();
  },

  save: function() {
    this.model.save({
      name: this.$el.find("input#name").val(),
      description: this.$el.find("input#description").val()
    }, {
      success: this.afterSave
    });
  },

  afterSave: function() {
    window.postMessage(JSON.stringify({msg: "refresh"}));
    this.close();
  }

});


// View for <%= resourceName %>/new.html
<%= _.capitalize(resourceName) %>Controller["new"] = Backbone.View.extend({
  el: "body",

  template: "script.view[id=new]",

  initialize: function() {
    _.bindAll(this, 'render', 'save', 'close', 'afterSave'); // bind scope of this within functions

    this.model = new <%= _.capitalize(resourceName) %>({description: "", name: ""});

    // setup navigation bar
    steroids.view.navigationBar.show("<%= _.capitalize(resourceName) %> New");

    // 'tap' event can be used after this
    this.$el.hammer();

    this.render();

    return this;
  },

  render: function() {
    this.$el.html( _.template( $(this.template).html(), this.model.attributes ) );
    return this;
  },

  events: {
    "tap a#createButton": "save",
    "tap a#closeButton": "close"
  },

  close: function() {
    steroids.modal.hide();
  },

  save: function() {
    this.model.save({
      name: this.$el.find("input#name").val(),
      description: this.$el.find("input#description").val()
    }, {
      success: this.afterSave
    });
  },

  afterSave: function() {
    window.postMessage(JSON.stringify({msg: "refresh"}));
    this.close();
  }

});


