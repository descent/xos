"use strict";!function(){angular.module("xos.diagnostic",["ngResource","ngCookies","ngAnimate","ui.router","xos.helpers"]).config(["$stateProvider",function(e){e.state("home",{url:"/",template:"<diagnostic-container></diagnostic-container>"})}]).config(["$httpProvider",function(e){e.interceptors.push("NoHyperlinks")}]).run(["$log",function(e){e.info("Diagnostic Started")}])}(),angular.module("xos.diagnostic").run(["$templateCache",function(e){e.put("templates/diagnostic.tpl.html",'<div class="container-fluid">\n  <div ng-hide="vm.error && vm.loader" style="height: 900px">\n    <div class="onethird-height">\n      <div class="well">\n        Services Graph\n      </div>\n      <div class="well pull-right" ng-click="vm.reloadGlobalScope()" ng-show="vm.selectedSubscriber">\n        Reset subscriber\n      </div>\n      <service-topology service-chain="vm.serviceChain"></service-topology>\n    </div>\n    <div class="twothird-height">\n      <div class="well">\n        Logical Resources\n      </div>\n      <logic-topology ng-if="vm.subscribers" subscribers="vm.subscribers" selected="vm.selectedSubscriber"></logic-topology>\n    </div>\n  </div>\n  <div class="row" ng-if="vm.error">\n    <div class="col-xs-12">\n      <div class="alert alert-danger">\n        {{vm.error}}\n      </div>\n    </div>\n  </div>\n  <div class="row" ng-if="vm.loader">\n    <div class="col-xs-12">\n      <div class="loader">Loading</div>\n    </div>\n  </div>\n</div>'),e.put("templates/logicTopology.tpl.html",'<select-subscriber-modal open="vm.openSelectSubscriberModal" subscribers="vm.subscribers"></select-subscriber-modal>\n<subscriber-status-modal open="vm.openSubscriberStatusModal" subscriber="vm.currentSubscriber"></subscriber-status-modal>\n<div class="alert alert-danger animate" ng-hide="!vm.error">\n  {{vm.error}}\n</div>\n<!-- <div class="instances-stats animate" ng-hide="vm.hideInstanceStats">\n  <div class="row">\n    <div class="col-sm-3 col-sm-offset-8">\n      <div class="panel panel-primary" ng-repeat="instance in vm.selectedInstances">\n        <div class="panel-heading">\n          {{instance.humanReadableName}}\n        </div>\n          <ul class="list-group">\n            <li class="list-group-item">Backend Status: {{instance.backend_status}}</li>\n            <li class="list-group-item">IP Address: {{instance.ip}}</li>\n          </ul>\n          <ul class="list-group">\n            <li class="list-group-item" ng-repeat="stat in instance.stats">\n              <span class="badge">{{stat.value}}</span>\n              {{stat.meter}}\n            </li>\n          </ul>\n        </div>\n      </div>  \n    </div>\n  </div>\n</div> -->'),e.put("templates/select-subscriber-modal.tpl.html",'<div class="modal fade" ng-class="{in: vm.open}" tabindex="-1" role="dialog">\n  <div class="modal-dialog modal-sm">\n    <div class="modal-content">\n      <div class="modal-header">\n        <button ng-click="vm.close()"  type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n        <h4 class="modal-title">Select a subscriber:</h4>\n      </div>\n      <div class="modal-body">\n        <select class="form-control" ng-options="s as s.humanReadableName for s in vm.subscribers" ng-model="vm.selected"></select>\n      </div>\n      <div class="modal-footer">\n        <button ng-click="vm.close()" type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n        <button ng-click="vm.select(vm.selected)" type="button" class="btn btn-primary">Select</button>\n      </div>\n    </div><!-- /.modal-content -->\n  </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->'),e.put("templates/subscriber-status-modal.tpl.html",'<div class="modal fade" ng-class="{in: vm.open}" tabindex="-1" role="dialog">\n  <div class="modal-dialog modal-sm">\n    <div class="modal-content">\n      <div class="modal-header">\n        <button ng-click="vm.close()"  type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n        <h4 class="modal-title">Manage subscriber:</h4>\n      </div>\n      <form name="vm.subscriber-detail">\n        <div class="modal-body">\n          <div class="row">\n            <div class="col-xs-12">\n              <label>Status</label>\n            </div>\n            <div class="col-xs-6">\n              <a ng-click="vm.subscriber.status = \'enabled\'"\n                class="btn btn-block"\n                ng-class="{\'btn-primary\': vm.subscriber.status === \'enabled\' ,\'btn-default\': vm.subscriber.status !== \'enabled\'}"\n                >Enabled</a>\n            </div>\n            <div class="col-xs-6">\n              <a ng-click="vm.subscriber.status = \'suspended\'"\n                class="btn btn-block"\n                ng-class="{\'btn-primary\': vm.subscriber.status === \'suspended\' ,\'btn-default\': vm.subscriber.status !== \'suspended\'}"\n                >Suspended</a>\n            </div>\n          </div>\n          <div class="row">\n            <div class="col-xs-6">\n              <a ng-click="vm.subscriber.status = \'delinquent\'"\n                class="btn btn-block"\n                ng-class="{\'btn-primary\': vm.subscriber.status === \'delinquent\' ,\'btn-default\': vm.subscriber.status !== \'delinquent\'}"\n                >Delinquent <br> payment</a>\n            </div>\n            <div class="col-xs-6">\n              <a ng-click="vm.subscriber.status = \'copyrightviolation\'"\n                class="btn btn-block"\n                ng-class="{\'btn-primary\': vm.subscriber.status === \'copyrightviolation\' ,\'btn-default\': vm.subscriber.status !== \'copyrightviolation\'}"\n                >Copyright <br> violation</a>\n            </div>\n          </div>\n          <div class="row">\n            <div class="col-xs-6">\n              <label>Uplink Speed</label>\n              <div class="input-group">\n                <input type="number" class="form-control small-padding" ng-model="vm.subscriber.uplink_speed"/>\n                <span class="input-group-addon">Mbps</span>\n              </div>\n            </div>\n            <div class="col-xs-6">\n              <label>Downlink Speed</label>\n              <div class="input-group">\n                <input type="number" class="form-control small-padding" ng-model="vm.subscriber.downlink_speed"/>\n                <span class="input-group-addon">Mbps</span>\n              </div>\n            </div>\n          </div>\n          <div class="row">\n            <div class="col-xs-6">\n              <label>Enable Internet</label>\n            </div>\n            <div class="col-xs-6">\n              <a \n                ng-click="vm.subscriber.enable_uverse = !vm.subscriber.enable_uverse" \n                ng-class="{\'btn-success\': vm.subscriber.enable_uverse, \'btn-danger\': !vm.subscriber.enable_uverse}"\n                class="btn btn-block">\n                <span ng-show="vm.subscriber.enable_uverse === true">Enabled</span>\n                <span ng-show="vm.subscriber.enable_uverse !== true">Disabled</span>\n              </a>\n            </div>\n          </div>\n        </div>\n        <div class="modal-footer" ng-show="vm.success || vm.formError">\n          <div class="alert alert-success" ng-show="vm.success">\n            {{vm.success}}\n          </div>\n          <div class="alert alert-danger" ng-show="vm.formError">\n            {{vm.formError}}\n          </div>\n        </div>\n        <div class="modal-footer">\n          <button ng-click="vm.close()" type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n          <button ng-click="vm.updateSubscriber(vm.subscriber)" type="button" class="btn btn-primary">Save</button>\n        </div>\n      </form>\n    </div><!-- /.modal-content -->\n  </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->'),e.put("templates/users-list.tpl.html",'<xos-table config="vm.tableConfig" data="vm.users"></xos-table>')}]),function(){angular.module("xos.diagnostic").directive("selectSubscriberModal",function(){return{scope:{subscribers:"=",open:"="},bindToController:!0,restrict:"E",templateUrl:"templates/select-subscriber-modal.tpl.html",controllerAs:"vm",controller:["$rootScope",function(e){var t=this;this.close=function(){t.open=!1},this.select=function(n){e.$emit("subscriber.selected",n),t.close()}}]}}).directive("subscriberStatusModal",function(){return{scope:{open:"=",subscriber:"="},bindToController:!0,restrict:"E",templateUrl:"templates/subscriber-status-modal.tpl.html",controllerAs:"vm",controller:["$log","$timeout","$scope","Subscribers",function(e,t,n,r){var i=this,a=1e6;n.$watch(function(){return i.open},function(){i.success=null,i.formError=null}),n.$watch(function(){return i.subscriber},function(e,t){i.subscriber&&(console.log(e,t),console.log("subscriber change",e===t),i.subscriber.uplink_speed=parseInt(i.subscriber.uplink_speed,10)/a,i.subscriber.downlink_speed=parseInt(i.subscriber.downlink_speed,10)/a)}),this.close=function(){i.open=!1},this.updateSubscriber=function(e){var n=angular.copy(e,n);n.uplink_speed=n.uplink_speed*a,n.downlink_speed=n.downlink_speed*a,r.update(n).$promise.then(function(e){i.success="Subscriber successfully updated!"})["catch"](function(e){i.formError=e})["finally"](function(){t(function(){i.close()},1500)})}}]}})}(),function(){angular.module("xos.diagnostic").service("ServiceTopologyHelper",["$rootScope","$window","$log","_","ServiceRelation","serviceTopologyConfig","d3",function(e,t,n,r,i,a,s){var c,o,l,u,d=0,p=function(t,n,r){var p=arguments.length<=3||void 0===arguments[3]?u:arguments[3];p&&(u=p);var h=u.clientWidth-2*a.widthMargin;c=t,o=n,l=r;var m=i.depthOf(r),b=s.svg.diagonal().projection(function(e){return[e.y,e.x]}),g=n.nodes(r).reverse(),f=n.links(g);g.forEach(function(e){var t=(h-2*a.widthMargin)/(m-1);e.y=e.depth*t});var y=t.selectAll("g.node").data(g,function(e){return e.id||(e.id=++d)}),x=y.enter().append("g").attr({"class":function(e){return"node "+e.type},transform:function(e){return e.x&&e.y?"translate("+e.y+", "+e.x+")":"translate("+r.y0+", "+r.x0+")"}}),S=x.filter(".subscriber"),w=x.filter(".router"),_=x.filter(".service");S.append("rect").attr(a.square).on("click",function(){e.$emit("subscriber.modal.open")}),w.append("rect").attr(a.square),_.append("circle").attr("r",1e-6).style("fill",function(e){return e._children?"lightsteelblue":"#fff"}).on("click",v),x.append("text").attr({x:function(e){return e.children?-a.circle.selectedRadius-5:a.circle.selectedRadius+5},dy:".35em",y:function(e){return e.children&&e.parent?"-5":void 0},transform:function(e){return e.children&&e.parent?e.parent.x<e.x?"rotate(-30)":"rotate(30)":void 0},"text-anchor":function(e){return e.children?"end":"start"}}).text(function(e){return e.name}).style("fill-opacity",1e-6);var T=y.transition().duration(a.duration).attr({transform:function(e){return"translate("+e.y+","+e.x+")"}});T.select("circle").attr("r",function(e){return e.selected?a.circle.selectedRadius:a.circle.radius}).style("fill",function(e){return e.selected?"lightsteelblue":"#fff"}),T.select("text").style("fill-opacity",1);var C=y.exit().transition().duration(a.duration).remove();C.select("circle").attr("r",1e-6),C.select("text").style("fill-opacity",1e-6);var k=t.selectAll("path.link").data(f,function(e){return e.target.id});k.enter().insert("path","g").attr("class",function(e){return"link "+e.target.type+" "+(e.target.active?"":"active")}).attr("d",function(e){var t={x:r.x0,y:r.y0};return b({source:t,target:t})}),k.transition().duration(a.duration).attr("d",b),k.exit().transition().duration(a.duration).attr("d",function(e){var t={x:r.x,y:r.y};return b({source:t,target:t})}).remove(),g.forEach(function(e){e.x0=e.x,e.y0=e.y})},v=function(t){return t.selected?(t.selected=!t.selected,e.$emit("instance.detail.hide",{}),p(c,o,l)):(e.$emit("instance.detail",{name:t.name,service:t.service,tenant:t.tenant}),c.selectAll("circle").each(function(e){return e.selected=!1}),t.selected=!t.selected,void p(c,o,l))};this.updateTree=p}])}(),function(){angular.module("xos.diagnostic").directive("serviceTopology",function(){return{restrict:"E",scope:{serviceChain:"="},bindToController:!0,controllerAs:"vm",template:"",controller:["$element","$window","$scope","d3","serviceTopologyConfig","ServiceRelation","Instances","Subscribers","ServiceTopologyHelper",function(e,t,n,r,i,a,s,c,o){var l=this,u=e[0];r.select(window).on("resize.service",function(){v(l.serviceChain)});var d,p,v=function(t){if(!t)return void console.error("Tree is missing");r.select(e[0]).select("svg").remove();var n=u.clientWidth-2*i.widthMargin,a=u.clientHeight-2*i.heightMargin,s=r.layout.tree().size([a,n]);p=r.select(e[0]).append("svg").style("width",u.clientWidth+"px").style("height",u.clientHeight+"px");var c=p.append("g").attr("transform","translate("+2*i.widthMargin+","+i.heightMargin+")");d=t,d.x0=a/2,d.y0=n/2,o.updateTree(c,s,d,u)};n.$watch(function(){return l.serviceChain},function(e){angular.isDefined(e)&&v(e)})}]}})}(),function(){angular.module("xos.diagnostic").service("Services",["$resource",function(e){return e("/api/core/services/:id",{id:"@id"})}]).service("Tenant",["$resource",function(e){return e("/api/core/tenants",{id:"@id"},{queryVsgInstances:{method:"GET",isArray:!0,interceptor:{response:function(e){var t=[];return angular.forEach(e.data,function(e){var n=JSON.parse(e.service_specific_attribute);n&&n.instance_id&&t.push(n.instance_id)}),t}}},getSubscriberTag:{method:"GET",isArray:!0,interceptor:{response:function(e){return JSON.parse(e.data[0].service_specific_attribute)}}}})}]).service("Ceilometer",["$http","$q","Instances",function(e,t,n){var r=this;this.getInstanceStats=function(n){var r=t.defer();return e.get("/xoslib/xos-instance-statistics",{params:{"instance-uuid":n}}).then(function(e){r.resolve(e.data)})["catch"](function(e){r.reject(e)}),r.promise},this.getInstancesStats=function(e){var i=t.defer(),a=[],s=[];return e.forEach(function(e){a.push(n.get({id:e}).$promise)}),t.all(a).then(function(e){s=e;var n=[];return s.forEach(function(e){n.push(r.getInstanceStats(e.instance_uuid))}),t.all(n)}).then(function(e){s.map(function(t,n){t.stats=e[n]}),i.resolve(s)})["catch"](i.reject),i.promise},this.getContainerStats=function(n){var r=t.defer(),i={};return e.get("/xoslib/meterstatistics",{params:{resource:n}}).then(function(t){return i.stats=t.data,e.get("/xoslib/meterstatistics",{params:{resource:n+"-eth0"}})}).then(function(t){return i.port={eth0:t.data},e.get("/xoslib/meterstatistics",{params:{resource:n+"-eth1"}})}).then(function(e){i.port.eth1=e.data,r.resolve(i)})["catch"](function(e){r.reject(e)}),r.promise}}]).service("Slice",["$resource",function(e){return e("/api/core/slices",{id:"@id"})}]).service("Instances",["$resource",function(e){return e("/api/core/instances/:id",{id:"@id"})}]).service("Node",["$resource","$q","Instances",function(e,t,n){return e("/api/core/nodes",{id:"@id"},{queryWithInstances:{method:"GET",isArray:!0,interceptor:{response:function(e){var r=t.defer(),i=[];return angular.forEach(e.data,function(e){i.push(n.query({node:e.id}).$promise)}),t.all(i).then(function(t){e.data.map(function(e,n){return e.instances=t[n],e}),r.resolve(e.data)}),r.promise}}}})}]).service("SubscribersWithDevice",["$http","$q","Subscribers",function(e,t,n){this.get=function(r){var i=t.defer(),a=void 0;return n.get({id:r.id}).$promise.then(function(t){return a=t,e.get("/api/tenant/cord/subscriber/"+a.id+"/devices/")}).then(function(e){e.data.map(function(e){return e.type="device"}),a.devices=e.data,a.type="subscriber",i.resolve(a)})["catch"](function(e){i.reject(e)}),{$promise:i.promise}}}]).service("ServiceRelation",["$q","_","Services","Tenant","Slice","Instances",function(e,t,n,r,i,a){var s=function m(e){var t=0;return e.children&&e.children.forEach(function(e){var n=m(e);n>t&&(t=n)}),1+t},c=function(e,n){return t.filter(e,function(e){return e.subscriber_service===n})},o=function(e,n){var r,e=t.filter(e,function(e){return e.provider_service===n&&e.subscriber_tenant});return e.forEach(function(e){e.service_specific_attribute&&(r=JSON.parse(e.service_specific_attribute))}),r},l=function(e,n){var r=[];return t.forEach(e,function(e){var i=t.find(n,{id:e.provider_service});r.push(i)}),r},u=function b(e,n,r,i){var a=arguments.length<=4||void 0===arguments[4]?null:arguments[4],s=t.difference(n,[r]),u=c(e,r.id),d=l(u,n);s=t.difference(s,d),r.service_specific_attribute=o(e,r.id),"service_vbng"===r.humanReadableName&&(r.humanReadableName="service_vrouter");var p={name:r.humanReadableName,parent:a,type:"service",service:r,tenant:i,children:[]};return t.forEach(d,function(n){if("service_ONOS_vBNG"!==n.humanReadableName&&"service_ONOS_vOLT"!==n.humanReadableName){var a=t.find(e,{subscriber_tenant:i.id,provider_service:n.id});p.children.push(b(e,s,n,a,r.humanReadableName))}}),0===p.children.length&&p.children.push({name:"Router",type:"router",children:[]}),p},d=function(e,n){var r=arguments.length<=2||void 0===arguments[2]?{id:1,name:"fakeSubs"}:arguments[2],i=t.find(n,{subscriber_root:r.id}),a=t.find(e,{id:i.provider_service}),s=u(n,e,a,i);return{name:r.name||r.humanReadableName,parent:null,type:"subscriber",children:[s]}},p=function(e,n){var r=function s(e,n,r){"service_vbng"===r.humanReadableName&&(r.humanReadableName="service_vrouter");var i={type:"service",name:r.humanReadableName,service:r},a=t.find(n,{subscriber_service:r.id});if(a){var c=t.find(e,{id:a.provider_service});i.children=[s(e,n,c)]}else i.children=[{name:"Router",type:"router",children:[]}];return delete r.id,i},i=t.find(e,{id:3});if(!angular.isDefined(i))return void console.error("Missing Base service!");var a={name:"Subscriber",type:"subscriber",parent:null,children:[r(e,n,i)]};return a},v=function(t){var i,a,s=e.defer();return n.query().$promise.then(function(e){return i=e,r.query().$promise}).then(function(e){a=e,s.resolve(d(i,a,t))})["catch"](function(e){throw new Error(e)}),s.promise},h=function(){var t,i,a=e.defer();return n.query().$promise.then(function(e){return t=e,r.query({kind:"coarse"}).$promise}).then(function(e){i=e,a.resolve(p(t,i))})["catch"](function(e){throw new Error(e)}),a.promise};return{get:h,buildServiceTree:p,getBySubscriber:v,buildLevel:u,buildSubscriberServiceTree:d,findLevelRelation:c,findLevelServices:l,depthOf:s,findSpecificInformation:o}}])}();var _slicedToArray=function(){function e(e,t){var n=[],r=!0,i=!1,a=void 0;try{for(var s,c=e[Symbol.iterator]();!(r=(s=c.next()).done)&&(n.push(s.value),!t||n.length!==t);r=!0);}catch(o){i=!0,a=o}finally{try{!r&&c["return"]&&c["return"]()}finally{if(i)throw a}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();!function(){angular.module("xos.diagnostic").service("RackHelper",["serviceTopologyConfig","_",function(e,t){var n=this;this.getComputeNodeLabelSize=function(){return e.computeNode.labelHeight+2*e.instance.margin},this.getComputeNodeSize=t.memoize(function(t){var r=3*e.instance.margin+2*e.instance.width,i=Math.round(t.length/2),a=n.getComputeNodeLabelSize(),s=e.instance.height*i+e.instance.margin*(i+1)+a;return[r,s]}),this.getRackSize=function(r){var i=0,a=e.computeNode.margin;return t.forEach(r,function(t){var r=n.getComputeNodeSize(t.instances),s=_slicedToArray(r,2),c=s[0],o=s[1];i=c+2*e.computeNode.margin,a+=o+e.computeNode.margin}),[i,a]},this.getInstancePosition=function(t){var r=Math.floor(t/2),i=t%2?1:0,a=n.getComputeNodeLabelSize(),s=e.instance.margin+e.instance.width*i+e.instance.margin*i,c=a+e.instance.margin+e.instance.height*r+e.instance.margin*r;return[s,c]},this.getComputeNodePosition=function(r,i){var a=e.computeNode.margin,s=t.reduce(r.slice(0,i),function(e,t){return e+n.getComputeNodeSize(t.instances)[1]},0),c=e.computeNode.margin+e.computeNode.margin*i+s;return[a,c]}}])}();var _slicedToArray=function(){function e(e,t){var n=[],r=!0,i=!1,a=void 0;try{for(var s,c=e[Symbol.iterator]();!(r=(s=c.next()).done)&&(n.push(s.value),!t||n.length!==t);r=!0);}catch(o){i=!0,a=o}finally{try{!r&&c["return"]&&c["return"]()}finally{if(i)throw a}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();!function(){var e={cloud:" M 79.72 49.60 C 86.00 37.29 98.57 29.01 111.96 26.42 C 124.27 24.11 137.53 26.15 148.18 32.90 C 158.08 38.78 165.39 48.87 167.65 60.20 C 176.20 57.90 185.14 56.01 194.00 57.73 C 206.08 59.59 217.92 66.01 224.37 76.66 C 227.51 81.54 228.85 87.33 229.23 93.06 C 237.59 93.33 246.22 95.10 253.04 100.19 C 256.69 103.13 259.87 107.67 258.91 112.59 C 257.95 118.43 252.78 122.38 247.78 124.82 C 235.27 130.43 220.23 130.09 207.98 123.93 C 199.33 127.88 189.76 129.43 180.30 128.57 C 173.70 139.92 161.70 147.65 148.86 149.93 C 133.10 153.26 116.06 148.15 104.42 137.08 C 92.98 143.04 78.96 143.87 66.97 139.04 C 57.75 135.41 49.70 128.00 46.60 118.43 C 43.87 109.95 45.81 100.29 51.30 93.32 C 57.38 85.18 67.10 80.44 76.99 78.89 C 74.38 69.20 74.87 58.52 79.72 49.60 Z"},t=0,n=0;angular.module("xos.diagnostic").service("NodeDrawer",["d3","serviceTopologyConfig","RackHelper","_",function(r,i,a,s){var c=this,o=this;this.addNetworks=function(t){t.selectAll("*").remove(),t.append("path").attr({d:e.cloud,transform:"translate(-100, -72), scale(0.7)","class":"cloud"}),t.append("text").attr({"text-anchor":"middle",y:-5,x:5}).text(function(e){return e.name}),t.append("text").attr({"text-anchor":"middle",y:8,x:5,"class":"small"}).text(function(e){return e.subtitle}),t.each(function(e){var t=r.select(this);"LAN-Side"===e.name&&angular.isDefined(e.subscriberTag)&&(t.append("text").attr({"text-anchor":"middle",y:50}).text(function(){return"C-Tag: "+e.subscriberTag.cTag}),t.append("text").attr({"text-anchor":"middle",y:70}).text(function(){return"S-Tag: "+e.subscriberTag.sTag})),"WAN-Side"===e.name&&angular.isDefined(e.subscriberIP)&&t.append("text").attr({"text-anchor":"middle",y:50}).text(function(){return"Public IP: "+e.subscriberIP})})},this.addRack=function(e){e.each(function(t){var n=a.getRackSize(t.computeNodes),r=_slicedToArray(n,2),s=r[0],o=r[1];e.select("g").remove();var l=e.append("g");l.attr({transform:"translate(0,0)"}).transition().duration(i.duration).attr({transform:function(){return"translate("+-(s/2)+", "+-(o/2)+")"}}),l.append("rect").attr({width:0,height:0}).transition().duration(i.duration).attr({width:s,height:o}),l.append("text").attr({"text-anchor":"middle",y:-10,x:s/2,opacity:0}).text(function(e){return e.name}).transition().duration(i.duration).attr({opacity:1}),c.drawComputeNodes(l,t.computeNodes)})},this.drawComputeNodes=function(e,n){var s=e.selectAll(".compute-nodes").data(n,function(e){return angular.isString(e.d3Id)||(e.d3Id="compute-node-"+ ++t),e.d3Id}),c=e.node().getBoundingClientRect(),l=c.width,u=c.height,d=s.enter().append("g");d.attr({transform:"translate("+l/2+", "+u/2+")","class":"compute-node"}).transition().duration(i.duration).attr({transform:function(e){return"translate("+a.getComputeNodePosition(n,e.d3Id.replace("compute-node-","")-1)+")"}}),d.append("rect").attr({width:0,height:0}).transition().duration(i.duration).attr({width:function(e){return a.getComputeNodeSize(e.instances)[0]},height:function(e){return a.getComputeNodeSize(e.instances)[1]}}),d.append("text").attr({"text-anchor":"start",y:17,x:10,opacity:0}).text(function(e){return e.humanReadableName.split(".")[0]}).transition().duration(i.duration).attr({opacity:1}),d.length>0&&d.each(function(e){o.drawInstances(r.select(this),e.instances)})};var l=function(e){return e.replace("app_","").replace("service_","").replace("mysite_","").replace("_instance","")},u=function(e){function t(e,t){return t.substring(0,e.length)===e}return t("0 - ",e.backend_status)?"provisioning":t("1 - ",e.backend_status)?"good":t("2 - ",e.backend_status)?"bad":""},d=function(e,t){var n=e.append("g").attr({"class":"container",transform:"translate("+i.instance.margin+", 115)"});n.append("rect").attr({width:250-2*i.container.margin,height:i.container.height}),n.append("text").attr({y:20,x:i.instance.margin,"class":"name"}).text(t.name);var r=["memory","memory.usage","cpu_util"];r.forEach(function(e,r){var a=s.find(t.stats,{meter:e});angular.isDefined(a)&&n.append("text").attr({y:40+15*r,x:i.instance.margin,opacity:0}).text(a.description+": "+Math.round(a.value)+" "+a.unit).transition().duration(i.duration).attr({opacity:1})});var a=["eth0","eth1"],c=[{meter:"network.incoming.bytes.rate",label:"Incoming"},{meter:"network.outgoing.bytes.rate",label:"Outgoing"}];a.forEach(function(e,r){0!==t.port[e].length&&(n.append("text").attr({y:90,x:i.instance.margin+120*r,"class":"name"}).text(t.name+"-"+e),c.forEach(function(a,c){var o=s.find(t.port[e],{meter:a.meter});angular.isDefined(o)&&n.append("text").attr({y:105+15*c,x:i.instance.margin+120*r,opacity:0}).text(a.label+": "+Math.round(o.value)+" "+o.unit).transition().duration(i.duration).attr({opacity:1})}))})},p=function(e,t){var n={"mysite_vsg-1":"200, -120","mysite_vsg-2":"-300, 30","mysite_vsg-3":"-300, -250"},a=e.append("g").attr({transform:"translate("+(n[t.humanReadableName]||n["mysite_vsg-1"])+")","class":"stats-container"}).on("click",function(e){e.fade=!e.fade;var t=void 0;t=e.fade?.1:1,r.select(this).transition().duration(i.duration).attr({opacity:t})}),c={"mysite_vsg-1":{x1:-160,y1:120,x2:0,y2:50},"mysite_vsg-2":{x1:250,y1:50,x2:300,y2:-10},"mysite_vsg-3":{x1:250,y1:50,x2:300,y2:270}};a.append("line").attr({x1:function(e){return c[e.humanReadableName].x1||c["mysite_vsg-1"].x1},y1:function(e){return c[e.humanReadableName].y1||c["mysite_vsg-1"].y1},x2:function(e){return c[e.humanReadableName].x2||c["mysite_vsg-1"].x2},y2:function(e){return c[e.humanReadableName].y2||c["mysite_vsg-1"].y2},stroke:"black",opacity:0}).transition().duration(i.duration).attr({opacity:1});var o=110,l=250;t.container&&(o+=i.container.height+2*i.container.margin);a.append("rect").attr({width:l,height:o,opacity:0}).transition().duration(i.duration).attr({opacity:1});a.append("text").attr({y:15,x:i.instance.margin,"class":"name",opacity:0}).text(t.humanReadableName).transition().duration(i.duration).attr({opacity:1}),a.append("text").attr({y:30,x:i.instance.margin,"class":"ip",opacity:0}).text(t.ip).transition().duration(i.duration).attr({opacity:1});var u=["memory","memory.usage","cpu","cpu_util"];u.forEach(function(e,n){var r=s.find(t.stats,{meter:e});r&&a.append("text").attr({y:55+15*n,x:i.instance.margin,opacity:0}).text(r.description+": "+Math.round(r.value)+" "+r.unit).transition().duration(i.duration).attr({opacity:1})}),t.container&&d(a,t.container)};this.drawInstances=function(e,t){var s=e.node().getBoundingClientRect(),c=s.width,o=s.height,d=e.selectAll(".instances").data(t,function(e){return angular.isString(e.d3Id)?e.d3Id:e.d3Id="instance-"+ ++n}),v=d.enter().append("g");v.attr({transform:"translate("+c/2+", "+o/2+")","class":function(e){return"instance "+(e.selected?"active":"")+" "+u(e)}}).transition().duration(i.duration).attr({transform:function(e,t){return"translate("+a.getInstancePosition(t)+")"}}),v.append("rect").attr({width:0,height:0}).transition().duration(i.duration).attr({width:i.instance.width,height:i.instance.height}),v.append("text").attr({"text-anchor":"middle",y:23,x:40,opacity:0}).text(function(e){return l(e.humanReadableName)}).transition().duration(i.duration).attr({opacity:1}),v.each(function(e,t){var n=r.select(this);angular.isDefined(e.stats)&&e.selected&&p(n,e,t)})},this.addPhisical=function(e){e.select("rect").remove(),e.select("text").remove(),e.append("rect").attr(i.square),e.append("text").attr({"text-anchor":"middle",y:i.square.y-10}).text(function(e){return e.name||e.humanReadableName})},this.addDevice=function(e){e.append("circle").attr(i.circle),e.append("text").attr({"text-anchor":"end",x:-i.circle.r-10,y:i.circle.r/2}).text(function(e){return e.name||e.mac})}}])}();var _slicedToArray=function(){function e(e,t){var n=[],r=!0,i=!1,a=void 0;try{for(var s,c=e[Symbol.iterator]();!(r=(s=c.next()).done)&&(n.push(s.value),!t||n.length!==t);r=!0);}catch(o){i=!0,a=o}finally{try{!r&&c["return"]&&c["return"]()}finally{if(i)throw a}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();!function(){angular.module("xos.diagnostic").service("LogicTopologyHelper",["$window","$log","$rootScope","_","serviceTopologyConfig","NodeDrawer","ChartData",function(e,t,n,r,i,a,s){var c,o,l,u,d,p,v=this,h=0,m=s.logicTopologyData;this.computeElementPosition=function(e){var t=[],n=r.reduce(i.elWidths,function(e,t){return t+e},0),a=e-n-2*i.widthMargin,s=a/(i.elWidths.length-1);return r.forEach(i.elWidths,function(n,a){var c=0;0!==a&&(c=r.reduce(i.elWidths.slice(0,a),function(e,t){return t+e},0));var o=i.widthMargin+s*a+n/2+c;t.push(e-o)}),t};var b=function(e){var t=p.nodes(e);t.forEach(function(e){e.y=v.computeElementPosition(u)[e.depth]});var n=p.links(t);return[t,n]},g=function(e,t){var r=e.selectAll("g.node").data(t,function(e){return angular.isString(e.d3Id)||(e.d3Id="tree-"+ ++h),e.d3Id});r.enter().append("g").attr({"class":function(e){return"node "+e.type},transform:"translate("+u/2+", "+d/2+")"});a.addNetworks(r.filter(".network")),a.addRack(r.filter(".rack")),a.addPhisical(r.filter(".router")),a.addPhisical(r.filter(".subscriber")),a.addDevice(r.filter(".device")),r.filter(".subscriber").on("click",function(){n.$emit("subscriber.modal.open")});r.transition().duration(i.duration).attr({transform:function(e){return"translate("+e.y+","+e.x+")"}}),r.exit().remove()},f=function(e,t){c=d3.svg.diagonal().projection(function(e){return[e.y,e.x]});var n=e.selectAll("path.link").data(t,function(e){return e.target.d3Id});n.enter().insert("path","g").attr("class",function(e){return"link "+e.target.type}).attr("d",function(e){var t={x:d/2,y:u/2};return c({source:t,target:t})}),n.transition().duration(i.duration).attr("d",c),n.exit().remove()};this.setupTree=function(e){u=e.node().getBoundingClientRect().width,d=e.node().getBoundingClientRect().height;var t=u-2*i.widthMargin,n=d-2*i.heightMargin;p=d3.layout.tree().size([n,t])},this.updateTree=function(e){var t=b(m),n=_slicedToArray(t,2);o=n[0],l=n[1],g(e,o),f(e,l)}}])}(),function(){angular.module("xos.diagnostic").directive("logicTopology",function(){return{restrict:"E",scope:{subscribers:"=",selected:"="},bindToController:!0,controllerAs:"vm",templateUrl:"templates/logicTopology.tpl.html",controller:["$element","$log","$scope","$rootScope","$timeout","d3","LogicTopologyHelper","Node","Tenant","Ceilometer","serviceTopologyConfig","ChartData",function(e,t,n,r,i,a,s,c,o,l,u,d){var p=this;t.info("Logic Plane");var v;this.selectedInstances=[],this.hideInstanceStats=!0;var h=this,m=function(t){a.select(e[0]).select("svg").remove(),v=a.select(t).append("svg").style("width",t.clientWidth+"px").style("height",t.clientHeight+"px")},b=function(){d.getLogicTree().then(function(e){s.updateTree(v)})};b(),n.$watch(function(){return p.selected},function(e){e?(d.selectSubscriber(e),s.updateTree(v)):(d.removeSubscriber(),s.updateTree(v))}),r.$on("instance.detail.hide",function(){p.hideInstanceStats=!0,i(function(){p.selectedInstances=[],d.highlightInstances([]),s.updateTree(v)},500)}),r.$on("instance.detail",function(e,t){d.getInstanceStatus(t).then(function(e){s.updateTree(v)})["catch"](function(e){h.error="Service statistics are not available at this time. Please try again later.",i(function(){h.error=null},2e3)})}),a.select(window).on("resize.logic",function(){m(e[0]),s.setupTree(v),s.updateTree(v)}),m(e[0]),s.setupTree(v),this.selectSubscriberModal=function(){p.openSelectSubscriberModal=!0,n.$apply()},this.subscriberStatusModal=function(){p.openSubscriberStatusModal=!0,n.$apply()},r.$on("subscriber.modal.open",function(){
d.currentSubscriber?p.subscriberStatusModal():p.selectSubscriberModal()}),r.$on("subscriber.modal.open",function(){d.currentSubscriber?(p.currentSubscriber=d.currentSubscriber,p.subscriberStatusModal()):p.selectSubscriberModal()})}]}})}(),function(){angular.module("xos.diagnostic").directive("diagnosticContainer",function(){return{restrict:"E",templateUrl:"templates/diagnostic.tpl.html",controllerAs:"vm",controller:["ChartData","Subscribers","SubscribersWithDevice","ServiceRelation","$rootScope",function(e,t,n,r,i){var a=this;this.loader=!0,this.error=!1;var s=function(){t.query().$promise.then(function(e){return a.subscribers=e,r.get()}).then(function(e){a.serviceChain=e})["catch"](function(e){throw new Error(e)})["finally"](function(){a.loader=!1})};s(),this.reloadGlobalScope=function(){a.selectedSubscriber=null,s()};var c=function(t){r.getBySubscriber(t).then(function(r){return a.serviceChain=r,e.currentServiceChain=r,n.get({id:t.id}).$promise}).then(function(t){a.selectedSubscriber=t,e.currentSubscriber=t})};i.$on("subscriber.selected",function(e,t){c(t)})}]}})}(),function(){angular.module("xos.diagnostic").factory("d3",["$window",function(e){return e.d3}])}(),function(){angular.module("xos.diagnostic").constant("serviceTopologyConfig",{widthMargin:60,heightMargin:30,duration:750,elWidths:[20,104,105,104,20],circle:{radius:10,r:10,selectedRadius:15},square:{width:20,height:20,x:-10,y:-10},rack:{width:105,height:50,x:-30,y:-25},computeNode:{width:50,height:20,margin:5,labelHeight:10,x:-25,y:-10},instance:{width:80,height:36,margin:5,x:-40,y:-18},container:{width:60,height:130,margin:5,x:-30,y:-15}})}(),function(){angular.module("xos.diagnostic").service("ChartData",["$rootScope","$q","_","Tenant","Node","serviceTopologyConfig","Ceilometer","Instances",function(e,t,n,r,i,a,s,c){var o=this;this.currentSubscriber=null,this.currentServiceChain=null,this.logicTopologyData={name:"Router",type:"router",children:[{name:"WAN-Side",subtitle:"Virtual Network",type:"network",children:[{name:"Compute Servers",type:"rack",computeNodes:[],children:[{name:"LAN-Side",subtitle:"Virtual Network",type:"network",children:[{name:"Subscriber",type:"subscriber"}]}]}]}]},this.getLogicTree=function(){var e=t.defer();return i.queryWithInstances().$promise.then(function(t){o.logicTopologyData.children[0].children[0].computeNodes=t,e.resolve(o.logicTopologyData)}),e.promise},this.addSubscriberTag=function(e){o.logicTopologyData.children[0].children[0].children[0].subscriberTag={cTag:e.cTag,sTag:e.sTag}},this.addSubscriber=function(e){return e.children=e.devices,o.logicTopologyData.children[0].children[0].children[0].children=[e],o.logicTopologyData},this.removeSubscriber=function(){o.logicTopologyData.children[0].children[0].children[0].children[0].humanReadableName="Subscriber",o.currentSubscriber=null,160===a.elWidths[a.elWidths.length-1]&&a.elWidths.pop(),delete o.logicTopologyData.children[0].children[0].children[0].subscriberTag,delete o.logicTopologyData.children[0].subscriberIP,o.highlightInstances([]),delete o.logicTopologyData.children[0].children[0].children[0].children[0].children},this.getSubscriberTag=function(e){var t={cTag:e.related.c_tag,sTag:e.related.s_tag};console.log(e),o.addSubscriberTag(t),o.currentSubscriber.tags=t},this.getSubscriberIP=function(e){o.logicTopologyData.children[0].subscriberIP=e.related.wan_container_ip},this.selectSubscriber=function(e){a.elWidths.push(160),o.addSubscriber(angular.copy(e)),o.highlightInstances([]),o.getSubscriberTag(e),o.getSubscriberIP(e)},this.highlightInstances=function(e){var t=o.logicTopologyData.children[0].children[0].computeNodes;t.map(function(e){e.instances.map(function(e){return e.selected=!1,e})}),n.forEach(e,function(e){t.map(function(t){t.instances.map(function(t){return t.id===e.id&&(t.selected=!0,t.stats=e.stats,t.container=e.container),t})})})},this.getInstanceStatus=function(e){var i=t.defer(),a=void 0;if(o.currentSubscriber){var l=void 0;try{l=JSON.parse(e.tenant.service_specific_attribute)}catch(u){l=null}if(l&&l.instance_id)!function(){var e={};a=c.get({id:l.instance_id}).$promise.then(function(t){return e=t,s.getInstanceStats(e.instance_uuid)}).then(function(t){e.stats=t;var n="vcpe-"+o.currentSubscriber.tags.sTag+"-"+o.currentSubscriber.tags.cTag;return e.container={name:n},s.getContainerStats(n)}).then(function(t){return e.container.stats=t.stats,e.container.port=t.port,[e]})}();else{var d=t.defer();d.resolve([]),a=d.promise}}else{var p={service_vsg:{kind:"vCPE"},service_vbng:{kind:"vBNG"},service_volt:{kind:"vOLT"}};a=r.queryVsgInstances(p[e.name]).$promise.then(function(e){return s.getInstancesStats(n.uniq(e))})}return a.then(function(e){o.highlightInstances(e),i.resolve(e)})["catch"](function(e){i.reject(e)}),i.promise}}])}(),angular.module("xos.diagnostic").run(["$location",function(e){e.path("/")}]);