"use strict";angular.module("xos.serviceGrid",["ngResource","ngCookies","ui.router","xos.helpers"]).config(["$stateProvider",function(e){e.state("serviceGrid",{url:"/",template:"<service-grid></service-grid>"}).state("serviceGraph",{url:"/graph",template:"<service-graph></service-graph>"})}]).config(["$httpProvider",function(e){e.interceptors.push("NoHyperlinks")}]).directive("serviceGrid",function(){return{restrict:"E",scope:{},bindToController:!0,controllerAs:"vm",templateUrl:"templates/service-grid.tpl.html",controller:["Services","ToscaEncoder","_",function(e,t,r){var n=this;this.tableConfig={columns:[{label:"Status",prop:"status",type:"icon",formatter:function(e){var t=parseInt(e.backend_status.match(/^[0-9]/)[0]);switch(t){case 0:return"time";case 1:return"ok";case 2:return"remove"}}},{label:"Name",prop:"name",link:function(e){return""+e.view_url.replace(/\$[a-z]+\$/,e.id)}},{label:"Kind",prop:"kind"},{label:"Enabled",prop:"enabled",type:"boolean"}],filter:"field",order:{field:"name"},actions:[{label:"export",icon:"export",cb:function(e){n.tosca="",t.serviceToTosca(e).then(function(e){n.showFeedback=!0,n.tosca=e})}}]},e.query().$promise.then(function(e){n.services=r.map(e,function(e){return e.status=0!==parseInt(e.backend_status.match(/^[0-9]/)[0]),e})})["catch"](function(e){throw new Error(e)})}]}}),function(){angular.module("xos.serviceGrid").service("ToscaEncoder",["$q","_","ArchiveManager","ServiceEncoder","SlicesEncoder",function(e,t,r,n,i){var o=this,a={tosca_definitions_version:"tosca_simple_yaml_1_0",description:"",imports:["custom_types/xos.yaml"],topology_template:{node_templates:{}}};this.toYml=function(e){return jsyaml.dump(e).replace(/'/g,"")},this["export"]=function(e){r.download(e.name);var t=o.toYml(a);return t},this.serviceToTosca=function(t){r.createArchive(),a.topology_template.node_templates={},a.description="Just enough Tosca to get the "+t.humanReadableName+" service up and running";var s=e.defer();return n.formatServiceProperties(t,a).then(function(e){return i.getServiceSlices(t,e)}).then(function(e){return n.getServiceRequirements(t,e)}).then(function(e){r.addFile(t.name+"_service.yaml",o.toYml(e)),o["export"](t),s.resolve(o.toYml(e))})["catch"](function(e){s.reject(e)}),s.promise}}])}(),angular.module("xos.serviceGrid").run(["$templateCache",function(e){e.put("templates/service-graph.tpl.html",'<div class="row">\n  <div class="col-sm-10">\n    <h1>Graph</h1>\n    <ul>\n      <li>Use D3 to create a service chart based on coarse services?</li>\n    </ul>\n  </div>\n  <div class="col-sm-2">\n    <a href="/admin/core/service/add" class="btn btn-success btn-block">\n      <i class="glyphicon glyphicon-plus"></i>\n      Add Service\n    </a>\n    <a href="#/" class="btn btn-default btn-block">\n      Service List\n    </a>\n  </div>\n</div>'),e.put("templates/service-grid.tpl.html",'<div class="row">\n  <div class="col-md-10 table-responsive">\n    <xos-table config="vm.tableConfig" data="vm.services"></xos-table>\n  </div>\n  <div class="col-md-2">\n    <a href="/admin/core/service/add" class="btn btn-success btn-block">\n      <i class="glyphicon glyphicon-plus"></i>\n      Add Service\n    </a>\n    <!-- <a href="#/graph" class="btn btn-default btn-block">\n      Tenancy Graph\n    </a> -->\n  </div>\n</div>\n\n<div class="row">\n  <div class="col-xs-12">\n    <div class="alert alert-info" ng-show="vm.showFeedback">\n      Remember that you should copy any key artifact inside the container in <pre>/opt/xos/tosca</pre>!\n    </div>\n  </div>\n</div>\n\n<pre ng-show="vm.tosca">\n{{vm.tosca}}\n</pre>')}]);var _slicedToArray=function(){function e(e,t){var r=[],n=!0,i=!1,o=void 0;try{for(var a,s=e[Symbol.iterator]();!(n=(a=s.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(c){i=!0,o=c}finally{try{!n&&s["return"]&&s["return"]()}finally{if(i)throw o}}return r}return function(t,r){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();!function(){angular.module("xos.serviceGrid").service("SlicesEncoder",["$q","_","Slices","SiteEncoder","ImageEncoder","NetworkEncoder",function(e,t,r,n,i,o){var a=this;this.buildTosca=function(r,a,s){var c={},l=e.defer();return r=t.reduce(r,function(e,t){if(e[t.name]={type:"tosca.nodes.Slice",properties:{network:t.network},requirements:[{management:{node:"management",relationship:"tosca.relationships.ConnectsToNetwork"}}]},angular.isDefined(s)){var r={};r[s+"_service"]={node:"service#"+s,relationship:"tosca.relationships.MemberOfService"},e[t.name].requirements.push(r)}return angular.isDefined(t.description)&&(e[t.name].description=t.description),angular.isDefined(t.site)&&(c[t.name+"#site"]=n.buildTosca(t.site,a)),angular.isDefined(t.default_image)&&(c[t.name+"#image"]=i.buildTosca(t.default_image,a)),angular.isDefined(t.networks)&&t.networks.length>0&&(c[t.name+"#management"]=o.getSliceNetworks(t,a)),e},{}),Object.keys(c).length>0?!function(){var t={site:"tosca.relationships.MemberOfSite",image:"tosca.relationships.DefaultImage"};a.topology_template.node_templates.management={type:"tosca.nodes.network.Network.XOS",properties:{"no-create":!0,"no-delete":!0,"no-update":!0}},e.all(c).then(function(e){var n=!0,i=!1,o=void 0;try{for(var s,c=Object.keys(e)[Symbol.iterator]();!(n=(s=c.next()).done);n=!0){var u=s.value,d=u.split("#"),p=_slicedToArray(d,2),v=p[0],m=p[1];if(angular.isDefined(t[m])){r[v].requirements||(r[v].requirements=[]);var f=_slicedToArray(e[u],2),h=f[0],g=f[1],y={},_=void 0;_="site"===m?g.name:m+"#"+g.name,y[m]={node:_,relationship:t[m]},r[v].requirements.push(y),angular.extend(a,h)}}}catch(b){i=!0,o=b}finally{try{!n&&c["return"]&&c["return"]()}finally{if(i)throw o}}angular.extend(a.topology_template.node_templates,r),l.resolve(a)})["catch"](function(e){throw new Error(e)})}():(angular.extend(a.topology_template.node_templates,r),l.resolve(a)),l.promise},this.getServiceSlices=function(t,n){var i=e.defer();return r.query({service:t.id}).$promise.then(function(e){return a.buildTosca(e,n,t.name)}).then(function(e){i.resolve(e)}),i.promise}}])}(),function(){angular.module("xos.serviceGrid").service("SiteEncoder",["$q","Sites",function(e,t){this.buildTosca=function(r,n){var i=e.defer();return t.get({id:r}).$promise.then(function(e){var t={};t[""+e.name]={type:"tosca.nodes.Site"},angular.extend(n.topology_template.node_templates,t),i.resolve([n,e])})["catch"](i.reject),i.promise}}])}(),function(){angular.module("xos.serviceGrid").service("ServiceEncoder",["$q","ArchiveManager","Tenants","Services",function(e,t,r,n){var i={fabric:"tosca.nodes.FabricService",onos:"tosca.nodes.ONOSService",vCPE:"tosca.nodes.VSGService",vOLT:"tosca.nodes.VOLTService",vROUTER:"tosca.nodes.VRouterService",VTN:"tosca.nodes.VTNService",vTR:"tosca.nodes.Service"};this.formatServiceProperties=function(r,n){var o=e.defer(),a="service#"+r.name;n.topology_template.node_templates[a]={},n.topology_template.node_templates[a].type=i[r.kind]||"tosca.nodes.Service";var s={properties:{kind:r.kind}};return angular.isDefined(r.view_url)&&(s.properties.view_url=r.view_url),angular.isDefined(r.icon_url)&&(s.properties.icon_url=r.icon_url),angular.isDefined(r.private_key_fn)&&(s.properties.private_key_fn=r.private_key_fn),angular.isDefined(r.public_key)&&(t.addFile(r.name+"_rsa.pub",r.public_key),s.properties.public_key="{ get_artifact: [ SELF, pubkey, LOCAL_FILE] }",s.artifacts={pubkey:"/opt/xos/tosca/"+r.name+"/"+r.name+"_rsa.pub"},n.topology_template.node_templates[a].artifacts=s.artifacts),n.topology_template.node_templates[a].properties=s.properties,o.resolve(n),o.promise},this.getServiceRequirements=function(t,i){var o=e.defer();return r.query({subscriber_service:t.id}).$promise.then(function(t){var r=[];return t=_.uniqBy(t,"provider_service"),_.forEach(t,function(e){r.push(n.get({id:e.provider_service}).$promise)}),e.all(r)}).then(function(e){var r=_.reduce(e,function(e,t){return e.concat(t.name)},[]);if(r=_.reduce(r,function(e,t){var r=t+"_tenant",n={};return n[r]={node:"service#"+t,relationship:"tosca.relationships.TenantOfService"},e.concat(n)},[]),r.length>0){_.forEach(r,function(e){var t=e[Object.keys(e)[0]].node;i.topology_template.node_templates[t]={type:"tosca.nodes.Service",properties:{"no-create":!0,"no-delete":!0,"no-update":!0}}});var n="service#"+t.name;i.topology_template.node_templates[n].requirements=r}o.resolve(i)}),o.promise}}])}(),function(){angular.module("xos.serviceGrid").directive("serviceGraph",function(){return{restrict:"E",scope:{},bindToController:!0,controllerAs:"vm",templateUrl:"templates/service-graph.tpl.html",controller:["$element","GraphService",function(e,t){var r=void 0,n=e[0],i=void 0,o=void 0,a=function(e){i.attr({transform:function(e){return"translate("+e.x+", "+e.y+")"}}),o.attr("x1",function(e){return e.source.x}).attr("y1",function(e){return e.source.y}).attr("x2",function(e){return e.target.x}).attr("y2",function(e){return e.target.y})};t.loadCoarseData().then(function(e){e.tenants=e.tenants.map(function(e){return{source:e.provider_service,target:e.subscriber_service}}),e.services.push({name:"XOS","class":"xos",x:n.clientWidth/2,y:n.clientHeight/2,fixed:!0}),s(n);var t=d3.layout.force().nodes(e.services).links(e.tenants).charge(-1060).gravity(.1).linkDistance(200).size([n.clientWidth,n.clientHeight]).on("tick",a).start();o=r.selectAll(".link").data(e.tenants).enter().insert("line").attr("class","link"),i=r.selectAll(".node").data(e.services).enter().append("g").call(t.drag).on("mousedown",function(){d3.event.stopPropagation()}),i.append("circle").attr({"class":function(e){return"node "+(e["class"]||"")},r:10}),i.append("text").attr({"text-anchor":"middle"}).text(function(e){return e.name}),i.select("circle").attr({r:function(e){var t=d3.select(this).node().parentNode,r=d3.select(t).select("text").node().getBBox();return r.width/2+10}})});var s=function(e){d3.select(e).select("svg").remove(),r=d3.select(e).append("svg").style("width",e.clientWidth+"px").style("height",e.clientHeight+"px")}}]}})}();var _slicedToArray=function(){function e(e,t){var r=[],n=!0,i=!1,o=void 0;try{for(var a,s=e[Symbol.iterator]();!(n=(a=s.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(c){i=!0,o=c}finally{try{!n&&s["return"]&&s["return"]()}finally{if(i)throw o}}return r}return function(t,r){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();!function(){angular.module("xos.serviceGrid").service("NetworkEncoder",["$q","Networks","NetworkTemplateEncoder",function(e,t,r){var n=this;this.buildTosca=function(t,n){var i=angular.copy(t),o={},a=e.defer();try{t=_.reduce(t,function(e,t){return e["network#"+t.name]={type:"tosca.nodes.network.Network.XOS",requirements:[]},angular.isDefined(t.slices)&&(_.forEach(t.slices,function(r){var n={owner:{node:r.name,relationship:"tosca.relationships.MemberOfSlice"}},i={connection:{node:r.name,relationship:"tosca.relationships.ConnectsToSlice"}};e["network#"+t.name].requirements.push(n,i)}),angular.isDefined(t.template)&&(o[t.name]=r.buildTosca(t.template,n))),e},{}),Object.keys(o).length>0?e.all(o).then(function(e){if(e){var r=!0,o=!1,s=void 0;try{for(var c,l=Object.keys(e)[Symbol.iterator]();!(r=(c=l.next()).done);r=!0){var u=c.value,d=_slicedToArray(e[u],2),p=d[0],v=d[1];t["network#"+u].requirements.push({network_template:{node:"network_template#"+v.name,relationship:"tosca.relationships.UsesNetworkTemplate"}}),angular.extend(n,p)}}catch(m){o=!0,s=m}finally{try{!r&&l["return"]&&l["return"]()}finally{if(o)throw s}}}angular.extend(n.topology_template.node_templates,t),a.resolve([n,i])})["catch"](function(e){throw new Error(e)}):(angular.extend(n.topology_template.node_templates,t),a.resolve([n,i]))}catch(s){a.reject(s)}return a.promise},this.getSliceNetworks=function(r,i){var o=e.defer();return t.query({owner:r.id}).$promise.then(function(e){e=_.filter(e,function(e){return-1!==r.networks.indexOf(e.id)}),e=e.map(function(e){var t=e.slices.indexOf(r.id);return e.slices[t]=r,e}),n.buildTosca(e,i).then(o.resolve)["catch"](o.reject)}),o.promise}}])}(),function(){angular.module("xos.serviceGrid").service("NetworkTemplateEncoder",["$q","Networkstemplates",function(e,t){this.buildTosca=function(r,n){var i=e.defer();return t.get({id:r}).$promise.then(function(e){var t={};t["network_template#"+e.name]={type:"tosca.nodes.NetworkTemplate"},angular.extend(n.topology_template.node_templates,t),i.resolve([n,e])})["catch"](function(e){i.reject(e)}),i.promise}}])}(),function(){angular.module("xos.serviceGrid").service("ImageEncoder",["$q","Images",function(e,t){this.buildTosca=function(r,n){var i=e.defer();return t.get({id:r}).$promise.then(function(e){var t={};t["image#"+e.name]={type:"tosca.nodes.Image"},angular.extend(n.topology_template.node_templates,t),i.resolve([n,e])})["catch"](i.reject),i.promise}}])}(),function(){angular.module("xos.serviceGrid").service("ArchiveManager",function(){var e=this;this.createArchive=function(){e.archive=new JSZip},this.addFile=function(t,r){e.archive.file(t,r)},this.download=function(t){console.log(e.archive),e.archive.generateAsync({type:"blob"}).then(function(e){saveAs(e,t+".zip")})["catch"](function(e){console.log(e)})}})}(),angular.module("xos.serviceGrid").run(["$location",function(e){e.path("/")}]);