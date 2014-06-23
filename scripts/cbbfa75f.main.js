!function(){window.Norfolkart=Ember.Application.create()}(),function(){Norfolkart.ApplicationController=Ember.ArrayController.extend({needs:"map",map:Ember.computed.alias("controllers.map"),actions:{findMe:function(){"use strict";var a=this.get("map");a.findMe()}}})}(),function(){Norfolkart.MapController=Ember.ArrayController.extend({centre:L.latLng(36.84765224454971,-76.2922677397728),zoom:16,actions:{findMe:function(){"use strict";this.findMe()}},findMe:function(){"use strict";var a=this;window.navigator.geolocation.getCurrentPosition(function(b){a.set("centre",L.latLng(b.coords.latitude,b.coords.longitude)),a.transitionToRoute("map")},this.positionError)},positionError:function(a){"use strict";var b=["Permission denied.","Position unavailable.","Timeout."];alert(b.indexOf(a.code-1)>-1?b[a.code-1]:"Unknown error.")}})}(),function(){Norfolkart.ApplicationAdapter=DS.FixtureAdapter}(),function(){Norfolkart.Exhibit=DS.Model.extend({title:DS.attr("string"),latitude:DS.attr("number"),longitude:DS.attr("number"),location:DS.attr("string"),artists:DS.attr("string"),url:DS.attr("string"),imageurl:DS.attr("string"),fullimage:DS.attr("string")}),Norfolkart.Exhibit.reopen({attributes:function(){"use strict";var a=this;return Ember.keys(this.get("data")).map(function(b){return Em.Object.create({model:a,key:b,valueBinding:"model."+b})})}.property()}),Norfolkart.Exhibit.FIXTURES=[]}(),function(){Norfolkart.ApplicationRoute=Ember.Route.extend({beforeModel:function(){"use strict";var a=this.get("store");Ember.$.getJSON("exhibits.json").done(function(b){var c;for(c=0;c<b.length;c++)a.push("exhibit",b[c])})}})}(),function(){Norfolkart.ExhibitRoute=Ember.Route.extend({model:function(a){return this.get("store").find("exhibit",a.exhibit_id)}})}(),function(){Norfolkart.ExhibitsRoute=Ember.Route.extend({model:function(){return this.get("store").find("exhibit")}})}(),function(){Norfolkart.IndexRoute=Ember.Route.extend({beforeModel:function(){this.transitionTo("map")}})}(),function(){Norfolkart.MapRoute=Ember.Route.extend({setupController:function(a,b){"use strict";a.set("content",b.map(function(a){return{location:L.latLng(a.get("latitude"),a.get("longitude")),id:a.get("id"),title:a.get("title"),imageurl:a.get("imageurl")}}))},model:function(){"use strict";return this.get("store").find("exhibit")}})}(),function(){Norfolkart.MapPopupView=Ember.View.extend({templateName:"map-popup"})}(),function(){Norfolkart.TileLayer=EmberLeaflet.TileLayer.extend({tileUrl:"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),Norfolkart.MarkerLayer=EmberLeaflet.MarkerLayer.extend(EmberLeaflet.PopupMixin,{popupContent:function(){"use strict";var a=this._parentLayer.createChildView(Norfolkart.MapPopupView);return a.set("context",this.get("content")),Ember.View.states.inDOM.enter(a),a.createElement(),a.get("element")}.property()}),Norfolkart.MarkerCollectionLayer=EmberLeaflet.MarkerCollectionLayer.extend({contentBinding:"controller",itemLayerClass:Norfolkart.MarkerLayer}),Norfolkart.MapView=EmberLeaflet.MapView.extend({classNames:["map"],centerBinding:"controller.centre",zoomBinding:"controller.zoom",childLayers:[Norfolkart.TileLayer,Norfolkart.MarkerCollectionLayer]})}(),function(){Norfolkart.Router.map(function(){this.resource("exhibits"),this.resource("exhibit",{path:"/exhibit/:exhibit_id"}),this.resource("map"),this.resource("about",function(){this.route("javascript")})})}();
