!function(t,e){"function"==typeof define&&define.amd?define(e):"object"==typeof exports?module.exports=e(require,exports,module):t.Tether=e()}(this,function(t,e,o){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t){var e=getComputedStyle(t),o=e.position;if("fixed"===o)return t;for(var i=t;i=i.parentNode;){var n=void 0;try{n=getComputedStyle(i)}catch(r){}if("undefined"==typeof n||null===n)return i;var s=n.overflow,a=n.overflowX,f=n.overflowY;if(/(auto|scroll)/.test(s+f+a)&&("absolute"!==o||["relative","absolute","fixed"].indexOf(n.position)>=0))return i}return document.body}function r(t){var e=void 0;t===document?(e=document,t=document.documentElement):e=t.ownerDocument;var o=e.documentElement,i={},n=t.getBoundingClientRect();for(var r in n)i[r]=n[r];var s=A(e);return i.top-=s.top,i.left-=s.left,"undefined"==typeof i.width&&(i.width=document.body.scrollWidth-i.left-i.right),"undefined"==typeof i.height&&(i.height=document.body.scrollHeight-i.top-i.bottom),i.top=i.top-o.clientTop,i.left=i.left-o.clientLeft,i.right=e.body.clientWidth-i.width-i.left,i.bottom=e.body.clientHeight-i.height-i.top,i}function s(t){return t.offsetParent||document.documentElement}function a(){var t=document.createElement("div");t.style.width="100%",t.style.height="200px";var e=document.createElement("div");f(e.style,{position:"absolute",top:0,left:0,pointerEvents:"none",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"}),e.appendChild(t),document.body.appendChild(e);var o=t.offsetWidth;e.style.overflow="scroll";var i=t.offsetWidth;o===i&&(i=e.clientWidth),document.body.removeChild(e);var n=o-i;return{width:n,height:n}}function f(){var t=void 0===arguments[0]?{}:arguments[0],e=[];return Array.prototype.push.apply(e,arguments),e.slice(1).forEach(function(e){if(e)for(var o in e)({}).hasOwnProperty.call(e,o)&&(t[o]=e[o])}),t}function h(t,e){if("undefined"!=typeof t.classList)e.split(" ").forEach(function(e){e.trim()&&t.classList.remove(e)});else{var o=new RegExp("(^| )"+e.split(" ").join("|")+"( |$)","gi"),i=p(t).replace(o," ");u(t,i)}}function l(t,e){if("undefined"!=typeof t.classList)e.split(" ").forEach(function(e){e.trim()&&t.classList.add(e)});else{h(t,e);var o=p(t)+" #{name}";u(t,o)}}function d(t,e){if("undefined"!=typeof t.classList)return t.classList.contains(e);var o=p(t);return new RegExp("(^| )"+e+"( |$)","gi").test(o)}function p(t){return t.className instanceof SVGAnimatedString?t.className.baseVal:t.className}function u(t,e){t.setAttribute("class",e)}function c(t,e,o){o.forEach(function(o){-1===e.indexOf(o)&&d(t,o)&&h(t,o)}),e.forEach(function(e){d(t,e)||l(t,e)})}function g(t,e){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t)){var o=[],i=!0,n=!1,r=void 0;try{for(var s,a=t[Symbol.iterator]();!(i=(s=a.next()).done)&&(o.push(s.value),!e||o.length!==e);i=!0);}catch(f){n=!0,r=f}finally{try{!i&&a["return"]&&a["return"]()}finally{if(n)throw r}}return o}throw new TypeError("Invalid attempt to destructure non-iterable instance")}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function m(t,e){var o=void 0===arguments[2]?1:arguments[2];return t+o>=e&&e>=t-o}function v(){return"undefined"!=typeof performance&&"undefined"!=typeof performance.now?performance.now():+new Date}function y(){for(var t=arguments.length,e=Array(t),o=0;t>o;o++)e[o]=arguments[o];var i={top:0,left:0};return e.forEach(function(t){var e=t.top,o=t.left;"string"==typeof e&&(e=parseFloat(e,10)),"string"==typeof o&&(o=parseFloat(o,10)),i.top+=e,i.left+=o}),i}function b(t,e){return"string"==typeof t.left&&-1!==t.left.indexOf("%")&&(t.left=parseFloat(t.left,10)/100*e.width),"string"==typeof t.top&&-1!==t.top.indexOf("%")&&(t.top=parseFloat(t.top,10)/100*e.height),t}function g(t,e){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t)){var o=[],i=!0,n=!1,r=void 0;try{for(var s,a=t[Symbol.iterator]();!(i=(s=a.next()).done)&&(o.push(s.value),!e||o.length!==e);i=!0);}catch(f){n=!0,r=f}finally{try{!i&&a["return"]&&a["return"]()}finally{if(n)throw r}}return o}throw new TypeError("Invalid attempt to destructure non-iterable instance")}function w(t,e){return"scrollParent"===e?e=t.scrollParent:"window"===e&&(e=[pageXOffset,pageYOffset,innerWidth+pageXOffset,innerHeight+pageYOffset]),e===document&&(e=e.documentElement),"undefined"!=typeof e.nodeType&&!function(){var t=r(e),o=t,i=getComputedStyle(e);e=[o.left,o.top,t.width+o.left,t.height+o.top],U.forEach(function(t,o){t=t[0].toUpperCase()+t.substr(1),"Top"===t||"Left"===t?e[o]+=parseFloat(i["border"+t+"Width"]):e[o]-=parseFloat(i["border"+t+"Width"])})}(),e}function g(t,e){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t)){var o=[],i=!0,n=!1,r=void 0;try{for(var s,a=t[Symbol.iterator]();!(i=(s=a.next()).done)&&(o.push(s.value),!e||o.length!==e);i=!0);}catch(f){n=!0,r=f}finally{try{!i&&a["return"]&&a["return"]()}finally{if(n)throw r}}return o}throw new TypeError("Invalid attempt to destructure non-iterable instance")}var C=function(){function t(t,e){for(var o=0;o<e.length;o++){var i=e[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,o,i){return o&&t(e.prototype,o),i&&t(e,i),e}}(),O=void 0;"undefined"==typeof O&&(O={modules:[]});var E=function(){var t=0;return function(){return++t}}(),x={},A=function(t){var e=t._tetherZeroElement;"undefined"==typeof e&&(e=t.createElement("div"),e.setAttribute("data-tether-id",E()),f(e.style,{top:0,left:0,position:"absolute"}),t.body.appendChild(e),t._tetherZeroElement=e);var o=e.getAttribute("data-tether-id");if("undefined"==typeof x[o]){x[o]={};var i=e.getBoundingClientRect();for(var n in i)x[o][n]=i[n];S(function(){delete x[o]})}return x[o]},T=[],S=function(t){T.push(t)},W=function(){for(var t=void 0;t=T.pop();)t()},M=function(){function t(){i(this,t)}return C(t,[{key:"on",value:function(t,e,o){var i=void 0===arguments[3]?!1:arguments[3];"undefined"==typeof this.bindings&&(this.bindings={}),"undefined"==typeof this.bindings[t]&&(this.bindings[t]=[]),this.bindings[t].push({handler:e,ctx:o,once:i})}},{key:"once",value:function(t,e,o){this.on(t,e,o,!0)}},{key:"off",value:function(t,e){if("undefined"==typeof this.bindings||"undefined"==typeof this.bindings[t])if("undefined"==typeof e)delete this.bindings[t];else for(var o=0;o<this.bindings[t].length;)this.bindings[t][o].handler===e?this.bindings[t].splice(o,1):++o}},{key:"trigger",value:function(t){for(var e=arguments.length,o=Array(e>1?e-1:0),i=1;e>i;i++)o[i-1]=arguments[i];if("undefined"!=typeof this.bindings&&this.bindings[t])for(var n=0;n<this.bindings[t].length;){var r=this.bindings[t][n],s=r.handler,a=r.ctx,f=r.once,h=a;"undefined"==typeof h&&(h=this),s.apply(h,o),f?this.bindings[t].splice(n,1):++n}}}]),t}();O.Utils={getScrollParent:n,getBounds:r,getOffsetParent:s,extend:f,addClass:l,removeClass:h,hasClass:d,updateClasses:c,defer:S,flush:W,uniqueId:E,Evented:M,getScrollBarSize:a};var C=function(){function t(t,e){for(var o=0;o<e.length;o++){var i=e[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,o,i){return o&&t(e.prototype,o),i&&t(e,i),e}}();if("undefined"==typeof O)throw new Error("You must include the utils.js file before tether.js");var P=O.Utils,n=P.getScrollParent,r=P.getBounds,s=P.getOffsetParent,f=P.extend,l=P.addClass,h=P.removeClass,c=P.updateClasses,S=P.defer,W=P.flush,a=P.getScrollBarSize,k=function(){for(var t=document.createElement("div"),e=["transform","webkitTransform","OTransform","MozTransform","msTransform"],o=0;o<e.length;++o){var i=e[o];if(void 0!==t.style[i])return i}}(),B=[],_=function(){B.forEach(function(t){t.position(!1)}),W()};!function(){var t=null,e=null,o=null,i=function n(){return"undefined"!=typeof e&&e>16?(e=Math.min(e-16,250),void(o=setTimeout(n,250))):void("undefined"!=typeof t&&v()-t<10||("undefined"!=typeof o&&(clearTimeout(o),o=null),t=v(),_(),e=v()-t))};["resize","scroll","touchmove"].forEach(function(t){window.addEventListener(t,i)})}();var z={center:"center",left:"right",right:"left"},F={middle:"middle",top:"bottom",bottom:"top"},L={top:0,left:0,middle:"50%",center:"50%",bottom:"100%",right:"100%"},Y=function(t,e){var o=t.left,i=t.top;return"auto"===o&&(o=z[e.left]),"auto"===i&&(i=F[e.top]),{left:o,top:i}},H=function(t){var e=t.left,o=t.top;return"undefined"!=typeof L[t.left]&&(e=L[t.left]),"undefined"!=typeof L[t.top]&&(o=L[t.top]),{left:e,top:o}},X=function(t){var e=t.split(" "),o=g(e,2),i=o[0],n=o[1];return{top:i,left:n}},j=X,N=function(){function t(e){var o=this;i(this,t),this.position=this.position.bind(this),B.push(this),this.history=[],this.setOptions(e,!1),O.modules.forEach(function(t){"undefined"!=typeof t.initialize&&t.initialize.call(o)}),this.position()}return C(t,[{key:"getClass",value:function(){var t=void 0===arguments[0]?"":arguments[0],e=this.options.classes;return"undefined"!=typeof e&&e[t]?this.options.classes[t]:this.options.classPrefix?""+this.options.classPrefix+"-"+t:t}},{key:"setOptions",value:function(t){var e=this,o=void 0===arguments[1]?!0:arguments[1],i={offset:"0 0",targetOffset:"0 0",targetAttachment:"auto auto",classPrefix:"tether"};this.options=f(i,t);var r=this.options,s=r.element,a=r.target,h=r.targetModifier;if(this.element=s,this.target=a,this.targetModifier=h,"viewport"===this.target?(this.target=document.body,this.targetModifier="visible"):"scroll-handle"===this.target&&(this.target=document.body,this.targetModifier="scroll-handle"),["element","target"].forEach(function(t){if("undefined"==typeof e[t])throw new Error("Tether Error: Both element and target must be defined");"undefined"!=typeof e[t].jquery?e[t]=e[t][0]:"string"==typeof e[t]&&(e[t]=document.querySelector(e[t]))}),l(this.element,this.getClass("element")),this.options.addTargetClasses!==!1&&l(this.target,this.getClass("target")),!this.options.attachment)throw new Error("Tether Error: You must provide an attachment");this.targetAttachment=j(this.options.targetAttachment),this.attachment=j(this.options.attachment),this.offset=X(this.options.offset),this.targetOffset=X(this.options.targetOffset),"undefined"!=typeof this.scrollParent&&this.disable(),this.scrollParent="scroll-handle"===this.targetModifier?this.target:n(this.target),this.options.enabled!==!1&&this.enable(o)}},{key:"getTargetBounds",value:function(){if("undefined"==typeof this.targetModifier)return r(this.target);if("visible"===this.targetModifier){if(this.target===document.body)return{top:pageYOffset,left:pageXOffset,height:innerHeight,width:innerWidth};var t=r(this.target),e={height:t.height,width:t.width,top:t.top,left:t.left};return e.height=Math.min(e.height,t.height-(pageYOffset-t.top)),e.height=Math.min(e.height,t.height-(t.top+t.height-(pageYOffset+innerHeight))),e.height=Math.min(innerHeight,e.height),e.height-=2,e.width=Math.min(e.width,t.width-(pageXOffset-t.left)),e.width=Math.min(e.width,t.width-(t.left+t.width-(pageXOffset+innerWidth))),e.width=Math.min(innerWidth,e.width),e.width-=2,e.top<pageYOffset&&(e.top=pageYOffset),e.left<pageXOffset&&(e.left=pageXOffset),e}if("scroll-handle"===this.targetModifier){var t=void 0,o=this.target;o===document.body?(o=document.documentElement,t={left:pageXOffset,top:pageYOffset,height:innerHeight,width:innerWidth}):t=r(o);var i=getComputedStyle(o),n=o.scrollWidth>o.clientWidth||[i.overflow,i.overflowX].indexOf("scroll")>=0||this.target!==document.body,s=0;n&&(s=15);var a=t.height-parseFloat(i.borderTopWidth)-parseFloat(i.borderBottomWidth)-s,e={width:15,height:.975*a*(a/o.scrollHeight),left:t.left+t.width-parseFloat(i.borderLeftWidth)-15},f=0;408>a&&this.target===document.body&&(f=-11e-5*Math.pow(a,2)-.00727*a+22.58),this.target!==document.body&&(e.height=Math.max(e.height,24));var h=this.target.scrollTop/(o.scrollHeight-a);return e.top=h*(a-e.height-f)+t.top+parseFloat(i.borderTopWidth),this.target===document.body&&(e.height=Math.max(e.height,24)),e}}},{key:"clearCache",value:function(){this._cache={}}},{key:"cache",value:function(t,e){return"undefined"==typeof this._cache&&(this._cache={}),"undefined"==typeof this._cache[t]&&(this._cache[t]=e.call(this)),this._cache[t]}},{key:"enable",value:function(){var t=void 0===arguments[0]?!0:arguments[0];this.options.addTargetClasses!==!1&&l(this.target,this.getClass("enabled")),l(this.element,this.getClass("enabled")),this.enabled=!0,this.scrollParent!==document&&this.scrollParent.addEventListener("scroll",this.position),t&&this.position()}},{key:"disable",value:function(){h(this.target,this.getClass("enabled")),h(this.element,this.getClass("enabled")),this.enabled=!1,"undefined"!=typeof this.scrollParent&&this.scrollParent.removeEventListener("scroll",this.position)}},{key:"destroy",value:function(){var t=this;this.disable(),B.forEach(function(e,o){return e===t?void B.splice(o,1):void 0})}},{key:"updateAttachClasses",value:function(t,e){var o=this;t=t||this.attachment,e=e||this.targetAttachment;var i=["left","top","bottom","right","middle","center"];"undefined"!=typeof this._addAttachClasses&&this._addAttachClasses.length&&this._addAttachClasses.splice(0,this._addAttachClasses.length),"undefined"==typeof this._addAttachClasses&&(this._addAttachClasses=[]);var n=this._addAttachClasses;t.top&&n.push(""+this.getClass("element-attached")+"-"+t.top),t.left&&n.push(""+this.getClass("element-attached")+"-"+t.left),e.top&&n.push(""+this.getClass("target-attached")+"-"+e.top),e.left&&n.push(""+this.getClass("target-attached")+"-"+e.left);var r=[];i.forEach(function(t){r.push(""+o.getClass("element-attached")+"-"+t),r.push(""+o.getClass("target-attached")+"-"+t)}),S(function(){"undefined"!=typeof o._addAttachClasses&&(c(o.element,o._addAttachClasses,r),o.options.addTargetClasses!==!1&&c(o.target,o._addAttachClasses,r),delete o._addAttachClasses)})}},{key:"position",value:function(){var t=this,e=void 0===arguments[0]?!0:arguments[0];if(this.enabled){this.clearCache();var o=Y(this.targetAttachment,this.attachment);this.updateAttachClasses(this.attachment,o);var i=this.cache("element-bounds",function(){return r(t.element)}),n=i.width,f=i.height;if(0===n&&0===f&&"undefined"!=typeof this.lastSize){var h=this.lastSize;n=h.width,f=h.height}else this.lastSize={width:n,height:f};var l=this.cache("target-bounds",function(){return t.getTargetBounds()}),d=l,p=b(H(this.attachment),{width:n,height:f}),u=b(H(o),d),c=b(this.offset,{width:n,height:f}),g=b(this.targetOffset,d);p=y(p,c),u=y(u,g);for(var m=l.left+u.left-p.left,v=l.top+u.top-p.top,w=0;w<O.modules.length;++w){var C=O.modules[w],E=C.position.call(this,{left:m,top:v,targetAttachment:o,targetPos:l,elementPos:i,offset:p,targetOffset:u,manualOffset:c,manualTargetOffset:g,scrollbarSize:A,attachment:this.attachment});if(E===!1)return!1;"undefined"!=typeof E&&"object"==typeof E&&(v=E.top,m=E.left)}var x={page:{top:v,left:m},viewport:{top:v-pageYOffset,bottom:pageYOffset-v-f+innerHeight,left:m-pageXOffset,right:pageXOffset-m-n+innerWidth}},A=void 0;return document.body.scrollWidth>window.innerWidth&&(A=this.cache("scrollbar-size",a),x.viewport.bottom-=A.height),document.body.scrollHeight>window.innerHeight&&(A=this.cache("scrollbar-size",a),x.viewport.right-=A.width),(-1===["","static"].indexOf(document.body.style.position)||-1===["","static"].indexOf(document.body.parentElement.style.position))&&(x.page.bottom=document.body.scrollHeight-v-f,x.page.right=document.body.scrollWidth-m-n),"undefined"!=typeof this.options.optimizations&&this.options.optimizations.moveElement!==!1&&"undefined"==typeof this.targetModifier&&!function(){var e=t.cache("target-offsetparent",function(){return s(t.target)}),o=t.cache("target-offsetparent-bounds",function(){return r(e)}),i=getComputedStyle(e),n=o,a={};if(["Top","Left","Bottom","Right"].forEach(function(t){a[t.toLowerCase()]=parseFloat(i["border"+t+"Width"])}),o.right=document.body.scrollWidth-o.left-n.width+a.right,o.bottom=document.body.scrollHeight-o.top-n.height+a.bottom,x.page.top>=o.top+a.top&&x.page.bottom>=o.bottom&&x.page.left>=o.left+a.left&&x.page.right>=o.right){var f=e.scrollTop,h=e.scrollLeft;x.offset={top:x.page.top-o.top+f-a.top,left:x.page.left-o.left+h-a.left}}}(),this.move(x),this.history.unshift(x),this.history.length>3&&this.history.pop(),e&&W(),!0}}},{key:"move",value:function(t){var e=this;if("undefined"!=typeof this.element.parentNode){var o={};for(var i in t){o[i]={};for(var n in t[i]){for(var r=!1,a=0;a<this.history.length;++a){var h=this.history[a];if("undefined"!=typeof h[i]&&!m(h[i][n],t[i][n])){r=!0;break}}r||(o[i][n]=!0)}}var l={top:"",left:"",right:"",bottom:""},d=function(t,o){var i="undefined"!=typeof e.options.optimizations,n=i?e.options.optimizations.gpu:null;if(n!==!1){var r=void 0,s=void 0;t.top?(l.top=0,r=o.top):(l.bottom=0,r=-o.bottom),t.left?(l.left=0,s=o.left):(l.right=0,s=-o.right),l[k]="translateX("+Math.round(s)+"px) translateY("+Math.round(r)+"px)","msTransform"!==k&&(l[k]+=" translateZ(0)")}else t.top?l.top=""+o.top+"px":l.bottom=""+o.bottom+"px",t.left?l.left=""+o.left+"px":l.right=""+o.right+"px"},p=!1;(o.page.top||o.page.bottom)&&(o.page.left||o.page.right)?(l.position="absolute",d(o.page,t.page)):(o.viewport.top||o.viewport.bottom)&&(o.viewport.left||o.viewport.right)?(l.position="fixed",d(o.viewport,t.viewport)):"undefined"!=typeof o.offset&&o.offset.top&&o.offset.left?!function(){l.position="absolute";var i=e.cache("target-offsetparent",function(){return s(e.target)});s(e.element)!==i&&S(function(){e.element.parentNode.removeChild(e.element),i.appendChild(e.element)}),d(o.offset,t.offset),p=!0}():(l.position="absolute",d({top:!0,left:!0},t.page)),p||"BODY"===this.element.parentNode.tagName||(this.element.parentNode.removeChild(this.element),document.body.appendChild(this.element));var u={},c=!1;for(var n in l){var g=l[n],v=this.element.style[n];""!==v&&""!==g&&["top","left","bottom","right"].indexOf(n)>=0&&(v=parseFloat(v),g=parseFloat(g)),v!==g&&(c=!0,u[n]=g)}c&&S(function(){f(e.element.style,u)})}}}]),t}();N.modules=[],O.position=_;var R=f(N,O),P=O.Utils,r=P.getBounds,f=P.extend,c=P.updateClasses,S=P.defer,U=["left","top","right","bottom"];O.modules.push({position:function(t){var e=this,o=t.top,i=t.left,n=t.targetAttachment;if(!this.options.constraints)return!0;var s=this.cache("element-bounds",function(){return r(e.element)}),a=s.height,h=s.width;if(0===h&&0===a&&"undefined"!=typeof this.lastSize){var l=this.lastSize;h=l.width,a=l.height}var d=this.cache("target-bounds",function(){return e.getTargetBounds()}),p=d.height,u=d.width,m=[this.getClass("pinned"),this.getClass("out-of-bounds")];this.options.constraints.forEach(function(t){var e=t.outOfBoundsClass,o=t.pinnedClass;e&&m.push(e),o&&m.push(o)}),m.forEach(function(t){["left","top","right","bottom"].forEach(function(e){m.push(""+t+"-"+e)})});var v=[],y=f({},n),b=f({},this.attachment);return this.options.constraints.forEach(function(t){var r=t.to,s=t.attachment,f=t.pin;"undefined"==typeof s&&(s="");var l=void 0,d=void 0;if(s.indexOf(" ")>=0){var c=s.split(" "),m=g(c,2);d=m[0],l=m[1]}else l=d=s;var C=w(e,r);("target"===d||"both"===d)&&(o<C[1]&&"top"===y.top&&(o+=p,y.top="bottom"),o+a>C[3]&&"bottom"===y.top&&(o-=p,y.top="top")),"together"===d&&(o<C[1]&&"top"===y.top&&("bottom"===b.top?(o+=p,y.top="bottom",o+=a,b.top="top"):"top"===b.top&&(o+=p,y.top="bottom",o-=a,b.top="bottom")),o+a>C[3]&&"bottom"===y.top&&("top"===b.top?(o-=p,y.top="top",o-=a,b.top="bottom"):"bottom"===b.top&&(o-=p,y.top="top",o+=a,b.top="top")),"middle"===y.top&&(o+a>C[3]&&"top"===b.top?(o-=a,b.top="bottom"):o<C[1]&&"bottom"===b.top&&(o+=a,b.top="top"))),("target"===l||"both"===l)&&(i<C[0]&&"left"===y.left&&(i+=u,y.left="right"),i+h>C[2]&&"right"===y.left&&(i-=u,y.left="left")),"together"===l&&(i<C[0]&&"left"===y.left?"right"===b.left?(i+=u,y.left="right",i+=h,b.left="left"):"left"===b.left&&(i+=u,y.left="right",i-=h,b.left="right"):i+h>C[2]&&"right"===y.left?"left"===b.left?(i-=u,y.left="left",i-=h,b.left="right"):"right"===b.left&&(i-=u,y.left="left",i+=h,b.left="left"):"center"===y.left&&(i+h>C[2]&&"left"===b.left?(i-=h,b.left="right"):i<C[0]&&"right"===b.left&&(i+=h,b.left="left"))),("element"===d||"both"===d)&&(o<C[1]&&"bottom"===b.top&&(o+=a,b.top="top"),o+a>C[3]&&"top"===b.top&&(o-=a,b.top="bottom")),("element"===l||"both"===l)&&(i<C[0]&&"right"===b.left&&(i+=h,b.left="left"),i+h>C[2]&&"left"===b.left&&(i-=h,b.left="right")),"string"==typeof f?f=f.split(",").map(function(t){return t.trim()}):f===!0&&(f=["top","left","right","bottom"]),f=f||[];var O=[],E=[];o<C[1]&&(f.indexOf("top")>=0?(o=C[1],O.push("top")):E.push("top")),o+a>C[3]&&(f.indexOf("bottom")>=0?(o=C[3]-a,O.push("bottom")):E.push("bottom")),i<C[0]&&(f.indexOf("left")>=0?(i=C[0],O.push("left")):E.push("left")),i+h>C[2]&&(f.indexOf("right")>=0?(i=C[2]-h,O.push("right")):E.push("right")),O.length&&!function(){var t=void 0;t="undefined"!=typeof e.options.pinnedClass?e.options.pinnedClass:e.getClass("pinned"),v.push(t),O.forEach(function(e){v.push(""+t+"-"+e)})}(),E.length&&!function(){var t=void 0;t="undefined"!=typeof e.options.outOfBoundsClass?e.options.outOfBoundsClass:e.getClass("out-of-bounds"),v.push(t),E.forEach(function(e){v.push(""+t+"-"+e)})}(),(O.indexOf("left")>=0||O.indexOf("right")>=0)&&(b.left=y.left=!1),(O.indexOf("top")>=0||O.indexOf("bottom")>=0)&&(b.top=y.top=!1),(y.top!==n.top||y.left!==n.left||b.top!==e.attachment.top||b.left!==e.attachment.left)&&e.updateAttachClasses(b,y)}),S(function(){e.options.addTargetClasses!==!1&&c(e.target,v,m),c(e.element,v,m)}),{top:o,left:i}}});var P=O.Utils,r=P.getBounds,c=P.updateClasses,S=P.defer;return O.modules.push({position:function(t){var e=this,o=t.top,i=t.left,n=this.cache("element-bounds",function(){return r(e.element)}),s=n.height,a=n.width,f=this.getTargetBounds(),h=o+s,l=i+a,d=[];o<=f.bottom&&h>=f.top&&["left","right"].forEach(function(t){var e=f[t];(e===i||e===l)&&d.push(t)}),i<=f.right&&l>=f.left&&["top","bottom"].forEach(function(t){var e=f[t];(e===o||e===h)&&d.push(t)});var p=[],u=[],g=["left","top","right","bottom"];return p.push(this.getClass("abutted")),g.forEach(function(t){p.push(""+e.getClass("abutted")+"-"+t)}),d.length&&u.push(this.getClass("abutted")),d.forEach(function(t){u.push(""+e.getClass("abutted")+"-"+t)}),S(function(){e.options.addTargetClasses!==!1&&c(e.target,u,p),c(e.element,u,p)}),!0}}),O.modules.push({position:function(t){var e=t.top,o=t.left;if(this.options.shift){var i=this.options.shift;"function"==typeof this.options.shift&&(i=this.options.shift.call(this,{top:e,left:o}));var n=void 0,r=void 0;if("string"==typeof i){i=i.split(" "),i[1]=i[1]||i[0];var s=g(i,2);n=s[0],r=s[1],n=parseFloat(n,10),r=parseFloat(r,10)}else n=i.top,r=i.left;return e+=n,o+=r,{top:e,left:o}}}}),R});