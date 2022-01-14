/*! For license information please see 15.6b7d4ae1.chunk.js.LICENSE.txt */
(this["webpackJsonppancake-frontend"]=this["webpackJsonppancake-frontend"]||[]).push([[15],{1126:function(e,t,n){"use strict";var r=n(0);t.a=function(e){Object(r.useEffect)((function(){e()}),[])}},807:function(e,t,n){"use strict";var r=Object.prototype.hasOwnProperty,o=Array.isArray,i=function(){for(var e=[],t=0;t<256;++t)e.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase());return e}(),a=function(e,t){for(var n=t&&t.plainObjects?Object.create(null):{},r=0;r<e.length;++r)"undefined"!==typeof e[r]&&(n[r]=e[r]);return n};e.exports={arrayToObject:a,assign:function(e,t){return Object.keys(t).reduce((function(e,n){return e[n]=t[n],e}),e)},combine:function(e,t){return[].concat(e,t)},compact:function(e){for(var t=[{obj:{o:e},prop:"o"}],n=[],r=0;r<t.length;++r)for(var i=t[r],a=i.obj[i.prop],l=Object.keys(a),s=0;s<l.length;++s){var c=l[s],u=a[c];"object"===typeof u&&null!==u&&-1===n.indexOf(u)&&(t.push({obj:a,prop:c}),n.push(u))}return function(e){for(;e.length>1;){var t=e.pop(),n=t.obj[t.prop];if(o(n)){for(var r=[],i=0;i<n.length;++i)"undefined"!==typeof n[i]&&r.push(n[i]);t.obj[t.prop]=r}}}(t),e},decode:function(e,t,n){var r=e.replace(/\+/g," ");if("iso-8859-1"===n)return r.replace(/%[0-9a-f]{2}/gi,unescape);try{return decodeURIComponent(r)}catch(o){return r}},encode:function(e,t,n){if(0===e.length)return e;var r="string"===typeof e?e:String(e);if("iso-8859-1"===n)return escape(r).replace(/%u[0-9a-f]{4}/gi,(function(e){return"%26%23"+parseInt(e.slice(2),16)+"%3B"}));for(var o="",a=0;a<r.length;++a){var l=r.charCodeAt(a);45===l||46===l||95===l||126===l||l>=48&&l<=57||l>=65&&l<=90||l>=97&&l<=122?o+=r.charAt(a):l<128?o+=i[l]:l<2048?o+=i[192|l>>6]+i[128|63&l]:l<55296||l>=57344?o+=i[224|l>>12]+i[128|l>>6&63]+i[128|63&l]:(a+=1,l=65536+((1023&l)<<10|1023&r.charCodeAt(a)),o+=i[240|l>>18]+i[128|l>>12&63]+i[128|l>>6&63]+i[128|63&l])}return o},isBuffer:function(e){return!(!e||"object"!==typeof e)&&!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))},isRegExp:function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},merge:function e(t,n,i){if(!n)return t;if("object"!==typeof n){if(o(t))t.push(n);else{if(!t||"object"!==typeof t)return[t,n];(i&&(i.plainObjects||i.allowPrototypes)||!r.call(Object.prototype,n))&&(t[n]=!0)}return t}if(!t||"object"!==typeof t)return[t].concat(n);var l=t;return o(t)&&!o(n)&&(l=a(t,i)),o(t)&&o(n)?(n.forEach((function(n,o){if(r.call(t,o)){var a=t[o];a&&"object"===typeof a&&n&&"object"===typeof n?t[o]=e(a,n,i):t.push(n)}else t[o]=n})),t):Object.keys(n).reduce((function(t,o){var a=n[o];return r.call(t,o)?t[o]=e(t[o],a,i):t[o]=a,t}),l)}}},808:function(e,t,n){"use strict";var r=String.prototype.replace,o=/%20/g;e.exports={default:"RFC3986",formatters:{RFC1738:function(e){return r.call(e,o,"+")},RFC3986:function(e){return e}},RFC1738:"RFC1738",RFC3986:"RFC3986"}},811:function(e,t,n){"use strict";var r=n(818),o=n(819),i=n(808);e.exports={formats:i,parse:o,stringify:r}},818:function(e,t,n){"use strict";var r=n(807),o=n(808),i=Object.prototype.hasOwnProperty,a={brackets:function(e){return e+"[]"},comma:"comma",indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},l=Array.isArray,s=Array.prototype.push,c=function(e,t){s.apply(e,l(t)?t:[t])},u=Date.prototype.toISOString,f={addQueryPrefix:!1,allowDots:!1,charset:"utf-8",charsetSentinel:!1,delimiter:"&",encode:!0,encoder:r.encode,encodeValuesOnly:!1,formatter:o.formatters[o.default],indices:!1,serializeDate:function(e){return u.call(e)},skipNulls:!1,strictNullHandling:!1},d=function e(t,n,o,i,a,s,u,d,p,g,h,v,m){var y=t;if("function"===typeof u?y=u(n,y):y instanceof Date?y=g(y):"comma"===o&&l(y)&&(y=y.join(",")),null===y){if(i)return s&&!v?s(n,f.encoder,m):n;y=""}if("string"===typeof y||"number"===typeof y||"boolean"===typeof y||r.isBuffer(y))return s?[h(v?n:s(n,f.encoder,m))+"="+h(s(y,f.encoder,m))]:[h(n)+"="+h(String(y))];var w,b=[];if("undefined"===typeof y)return b;if(l(u))w=u;else{var S=Object.keys(y);w=d?S.sort(d):S}for(var E=0;E<w.length;++E){var O=w[E];a&&null===y[O]||(l(y)?c(b,e(y[O],"function"===typeof o?o(n,O):n,o,i,a,s,u,d,p,g,h,v,m)):c(b,e(y[O],n+(p?"."+O:"["+O+"]"),o,i,a,s,u,d,p,g,h,v,m)))}return b};e.exports=function(e,t){var n,r=e,s=function(e){if(!e)return f;if(null!==e.encoder&&void 0!==e.encoder&&"function"!==typeof e.encoder)throw new TypeError("Encoder has to be a function.");var t=e.charset||f.charset;if("undefined"!==typeof e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var n=o.default;if("undefined"!==typeof e.format){if(!i.call(o.formatters,e.format))throw new TypeError("Unknown format option provided.");n=e.format}var r=o.formatters[n],a=f.filter;return("function"===typeof e.filter||l(e.filter))&&(a=e.filter),{addQueryPrefix:"boolean"===typeof e.addQueryPrefix?e.addQueryPrefix:f.addQueryPrefix,allowDots:"undefined"===typeof e.allowDots?f.allowDots:!!e.allowDots,charset:t,charsetSentinel:"boolean"===typeof e.charsetSentinel?e.charsetSentinel:f.charsetSentinel,delimiter:"undefined"===typeof e.delimiter?f.delimiter:e.delimiter,encode:"boolean"===typeof e.encode?e.encode:f.encode,encoder:"function"===typeof e.encoder?e.encoder:f.encoder,encodeValuesOnly:"boolean"===typeof e.encodeValuesOnly?e.encodeValuesOnly:f.encodeValuesOnly,filter:a,formatter:r,serializeDate:"function"===typeof e.serializeDate?e.serializeDate:f.serializeDate,skipNulls:"boolean"===typeof e.skipNulls?e.skipNulls:f.skipNulls,sort:"function"===typeof e.sort?e.sort:null,strictNullHandling:"boolean"===typeof e.strictNullHandling?e.strictNullHandling:f.strictNullHandling}}(t);"function"===typeof s.filter?r=(0,s.filter)("",r):l(s.filter)&&(n=s.filter);var u,p=[];if("object"!==typeof r||null===r)return"";u=t&&t.arrayFormat in a?t.arrayFormat:t&&"indices"in t?t.indices?"indices":"repeat":"indices";var g=a[u];n||(n=Object.keys(r)),s.sort&&n.sort(s.sort);for(var h=0;h<n.length;++h){var v=n[h];s.skipNulls&&null===r[v]||c(p,d(r[v],v,g,s.strictNullHandling,s.skipNulls,s.encode?s.encoder:null,s.filter,s.sort,s.allowDots,s.serializeDate,s.formatter,s.encodeValuesOnly,s.charset))}var m=p.join(s.delimiter),y=!0===s.addQueryPrefix?"?":"";return s.charsetSentinel&&("iso-8859-1"===s.charset?y+="utf8=%26%2310003%3B&":y+="utf8=%E2%9C%93&"),m.length>0?y+m:""}},819:function(e,t,n){"use strict";var r=n(807),o=Object.prototype.hasOwnProperty,i={allowDots:!1,allowPrototypes:!1,arrayLimit:20,charset:"utf-8",charsetSentinel:!1,comma:!1,decoder:r.decode,delimiter:"&",depth:5,ignoreQueryPrefix:!1,interpretNumericEntities:!1,parameterLimit:1e3,parseArrays:!0,plainObjects:!1,strictNullHandling:!1},a=function(e){return e.replace(/&#(\d+);/g,(function(e,t){return String.fromCharCode(parseInt(t,10))}))},l=function(e,t,n){if(e){var r=n.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,i=/(\[[^[\]]*])/g,a=/(\[[^[\]]*])/.exec(r),l=a?r.slice(0,a.index):r,s=[];if(l){if(!n.plainObjects&&o.call(Object.prototype,l)&&!n.allowPrototypes)return;s.push(l)}for(var c=0;null!==(a=i.exec(r))&&c<n.depth;){if(c+=1,!n.plainObjects&&o.call(Object.prototype,a[1].slice(1,-1))&&!n.allowPrototypes)return;s.push(a[1])}return a&&s.push("["+r.slice(a.index)+"]"),function(e,t,n){for(var r=t,o=e.length-1;o>=0;--o){var i,a=e[o];if("[]"===a&&n.parseArrays)i=[].concat(r);else{i=n.plainObjects?Object.create(null):{};var l="["===a.charAt(0)&&"]"===a.charAt(a.length-1)?a.slice(1,-1):a,s=parseInt(l,10);n.parseArrays||""!==l?!isNaN(s)&&a!==l&&String(s)===l&&s>=0&&n.parseArrays&&s<=n.arrayLimit?(i=[])[s]=r:i[l]=r:i={0:r}}r=i}return r}(s,t,n)}};e.exports=function(e,t){var n=function(e){if(!e)return i;if(null!==e.decoder&&void 0!==e.decoder&&"function"!==typeof e.decoder)throw new TypeError("Decoder has to be a function.");if("undefined"!==typeof e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new Error("The charset option must be either utf-8, iso-8859-1, or undefined");var t="undefined"===typeof e.charset?i.charset:e.charset;return{allowDots:"undefined"===typeof e.allowDots?i.allowDots:!!e.allowDots,allowPrototypes:"boolean"===typeof e.allowPrototypes?e.allowPrototypes:i.allowPrototypes,arrayLimit:"number"===typeof e.arrayLimit?e.arrayLimit:i.arrayLimit,charset:t,charsetSentinel:"boolean"===typeof e.charsetSentinel?e.charsetSentinel:i.charsetSentinel,comma:"boolean"===typeof e.comma?e.comma:i.comma,decoder:"function"===typeof e.decoder?e.decoder:i.decoder,delimiter:"string"===typeof e.delimiter||r.isRegExp(e.delimiter)?e.delimiter:i.delimiter,depth:"number"===typeof e.depth?e.depth:i.depth,ignoreQueryPrefix:!0===e.ignoreQueryPrefix,interpretNumericEntities:"boolean"===typeof e.interpretNumericEntities?e.interpretNumericEntities:i.interpretNumericEntities,parameterLimit:"number"===typeof e.parameterLimit?e.parameterLimit:i.parameterLimit,parseArrays:!1!==e.parseArrays,plainObjects:"boolean"===typeof e.plainObjects?e.plainObjects:i.plainObjects,strictNullHandling:"boolean"===typeof e.strictNullHandling?e.strictNullHandling:i.strictNullHandling}}(t);if(""===e||null===e||"undefined"===typeof e)return n.plainObjects?Object.create(null):{};for(var s="string"===typeof e?function(e,t){var n,l={},s=t.ignoreQueryPrefix?e.replace(/^\?/,""):e,c=t.parameterLimit===1/0?void 0:t.parameterLimit,u=s.split(t.delimiter,c),f=-1,d=t.charset;if(t.charsetSentinel)for(n=0;n<u.length;++n)0===u[n].indexOf("utf8=")&&("utf8=%E2%9C%93"===u[n]?d="utf-8":"utf8=%26%2310003%3B"===u[n]&&(d="iso-8859-1"),f=n,n=u.length);for(n=0;n<u.length;++n)if(n!==f){var p,g,h=u[n],v=h.indexOf("]="),m=-1===v?h.indexOf("="):v+1;-1===m?(p=t.decoder(h,i.decoder,d),g=t.strictNullHandling?null:""):(p=t.decoder(h.slice(0,m),i.decoder,d),g=t.decoder(h.slice(m+1),i.decoder,d)),g&&t.interpretNumericEntities&&"iso-8859-1"===d&&(g=a(g)),g&&t.comma&&g.indexOf(",")>-1&&(g=g.split(",")),o.call(l,p)?l[p]=r.combine(l[p],g):l[p]=g}return l}(e,n):e,c=n.plainObjects?Object.create(null):{},u=Object.keys(s),f=0;f<u.length;++f){var d=u[f],p=l(d,s[d],n);c=r.merge(c,p,n)}return r.compact(c)}},917:function(e,t,n){var r,o;void 0===(o="function"===typeof(r=function(){"use strict";var e=function(){o.log(2,"(COMPATIBILITY NOTICE) -> As of ScrollMagic 2.0.0 you need to use 'new ScrollMagic.Controller()' to create a new controller instance. Use 'new ScrollMagic.Scene()' to instance a scene.")};e.version="2.0.8","undefined"!==typeof window&&window.addEventListener("mousewheel",void 0);var t="data-scrollmagic-pin-spacer";e.Controller=function(r){var i,a,l="ScrollMagic.Controller",s="FORWARD",c="REVERSE",u="PAUSED",f=n.defaults,d=this,p=o.extend({},f,r),g=[],h=!1,v=0,m=u,y=!0,w=0,b=!0,S=function(){for(var t in p)f.hasOwnProperty(t)||(T(2,'WARNING: Unknown option "'+t+'"'),delete p[t]);if(p.container=o.get.elements(p.container)[0],!p.container)throw T(1,"ERROR creating object "+l+": No valid scroll container supplied"),l+" init failed.";(y=p.container===window||p.container===document.body||!document.body.contains(p.container))&&(p.container=window),w=R(),p.container.addEventListener("resize",C),p.container.addEventListener("scroll",C);var n=parseInt(p.refreshInterval,10);p.refreshInterval=o.type.Number(n)?n:f.refreshInterval,E(),T(3,"added new "+l+" controller (v"+e.version+")")},E=function(){p.refreshInterval>0&&(a=window.setTimeout(j,p.refreshInterval))},O=function(){return p.vertical?o.get.scrollTop(p.container):o.get.scrollLeft(p.container)},R=function(){return p.vertical?o.get.height(p.container):o.get.width(p.container)},x=this._setScrollPos=function(e){p.vertical?y?window.scrollTo(o.get.scrollLeft(),e):p.container.scrollTop=e:y?window.scrollTo(e,o.get.scrollTop()):p.container.scrollLeft=e},N=function(){if(b&&h){var e=o.type.Array(h)?h:g.slice(0);h=!1;var t=v,n=(v=d.scrollPos())-t;0!==n&&(m=n>0?s:c),m===c&&e.reverse(),e.forEach((function(t,n){T(3,"updating Scene "+(n+1)+"/"+e.length+" ("+g.length+" total)"),t.update(!0)})),0===e.length&&p.loglevel>=3&&T(3,"updating 0 Scenes (nothing added to controller)")}},P=function(){i=o.rAF(N)},C=function(e){T(3,"event fired causing an update:",e.type),"resize"==e.type&&(w=R(),m=u),!0!==h&&(h=!0,P())},j=function(){if(!y&&w!=R()){var e;try{e=new Event("resize",{bubbles:!1,cancelable:!1})}catch(t){(e=document.createEvent("Event")).initEvent("resize",!1,!1)}p.container.dispatchEvent(e)}g.forEach((function(e,t){e.refresh()})),E()},T=this._log=function(e,t){p.loglevel>=e&&(Array.prototype.splice.call(arguments,1,0,"("+l+") ->"),o.log.apply(window,arguments))};this._options=p;var A=function(e){if(e.length<=1)return e;var t=e.slice(0);return t.sort((function(e,t){return e.scrollOffset()>t.scrollOffset()?1:-1})),t};return this.addScene=function(t){if(o.type.Array(t))t.forEach((function(e,t){d.addScene(e)}));else if(t instanceof e.Scene){if(t.controller()!==d)t.addTo(d);else if(g.indexOf(t)<0){for(var n in g.push(t),g=A(g),t.on("shift.controller_sort",(function(){g=A(g)})),p.globalSceneOptions)t[n]&&t[n].call(t,p.globalSceneOptions[n]);T(3,"adding Scene (now "+g.length+" total)")}}else T(1,"ERROR: invalid argument supplied for '.addScene()'");return d},this.removeScene=function(e){if(o.type.Array(e))e.forEach((function(e,t){d.removeScene(e)}));else{var t=g.indexOf(e);t>-1&&(e.off("shift.controller_sort"),g.splice(t,1),T(3,"removing Scene (now "+g.length+" left)"),e.remove())}return d},this.updateScene=function(t,n){return o.type.Array(t)?t.forEach((function(e,t){d.updateScene(e,n)})):n?t.update(!0):!0!==h&&t instanceof e.Scene&&(-1==(h=h||[]).indexOf(t)&&h.push(t),h=A(h),P()),d},this.update=function(e){return C({type:"resize"}),e&&N(),d},this.scrollTo=function(n,r){if(o.type.Number(n))x.call(p.container,n,r);else if(n instanceof e.Scene)n.controller()===d?d.scrollTo(n.scrollOffset(),r):T(2,"scrollTo(): The supplied scene does not belong to this controller. Scroll cancelled.",n);else if(o.type.Function(n))x=n;else{var i=o.get.elements(n)[0];if(i){for(;i.parentNode.hasAttribute(t);)i=i.parentNode;var a=p.vertical?"top":"left",l=o.get.offset(p.container),s=o.get.offset(i);y||(l[a]-=d.scrollPos()),d.scrollTo(s[a]-l[a],r)}else T(2,"scrollTo(): The supplied argument is invalid. Scroll cancelled.",n)}return d},this.scrollPos=function(e){return arguments.length?(o.type.Function(e)?O=e:T(2,"Provided value for method 'scrollPos' is not a function. To change the current scroll position use 'scrollTo()'."),d):O.call(d)},this.info=function(e){var t={size:w,vertical:p.vertical,scrollPos:v,scrollDirection:m,container:p.container,isDocument:y};return arguments.length?void 0!==t[e]?t[e]:void T(1,'ERROR: option "'+e+'" is not available'):t},this.loglevel=function(e){return arguments.length?(p.loglevel!=e&&(p.loglevel=e),d):p.loglevel},this.enabled=function(e){return arguments.length?(b!=e&&(b=!!e,d.updateScene(g,!0)),d):b},this.destroy=function(e){window.clearTimeout(a);for(var t=g.length;t--;)g[t].destroy(e);return p.container.removeEventListener("resize",C),p.container.removeEventListener("scroll",C),o.cAF(i),T(3,"destroyed "+l+" (reset: "+(e?"true":"false")+")"),null},S(),d};var n={defaults:{container:window,vertical:!0,globalSceneOptions:{},loglevel:2,refreshInterval:100}};e.Controller.addOption=function(e,t){n.defaults[e]=t},e.Controller.extend=function(t){var n=this;e.Controller=function(){return n.apply(this,arguments),this.$super=o.extend({},this),t.apply(this,arguments)||this},o.extend(e.Controller,n),e.Controller.prototype=n.prototype,e.Controller.prototype.constructor=e.Controller},e.Scene=function(n){var i,a,l="ScrollMagic.Scene",s="BEFORE",c="DURING",u="AFTER",f=r.defaults,d=this,p=o.extend({},f,n),g=s,h=0,v={start:0,end:0},m=0,y=!0,w=function(){for(var e in p)f.hasOwnProperty(e)||(S(2,'WARNING: Unknown option "'+e+'"'),delete p[e]);for(var t in f)A(t);j()},b={};this.on=function(e,t){return o.type.Function(t)?(e=e.trim().split(" ")).forEach((function(e){var n=e.split("."),r=n[0],o=n[1];"*"!=r&&(b[r]||(b[r]=[]),b[r].push({namespace:o||"",callback:t}))})):S(1,"ERROR when calling '.on()': Supplied callback for '"+e+"' is not a valid function!"),d},this.off=function(e,t){return e?((e=e.trim().split(" ")).forEach((function(e,n){var r=e.split("."),o=r[0],i=r[1]||"";("*"===o?Object.keys(b):[o]).forEach((function(e){for(var n=b[e]||[],r=n.length;r--;){var o=n[r];!o||i!==o.namespace&&"*"!==i||t&&t!=o.callback||n.splice(r,1)}n.length||delete b[e]}))})),d):(S(1,"ERROR: Invalid event name supplied."),d)},this.trigger=function(t,n){if(t){var r=t.trim().split("."),o=r[0],i=r[1],a=b[o];S(3,"event fired:",o,n?"->":"",n||""),a&&a.forEach((function(t,r){i&&i!==t.namespace||t.callback.call(d,new e.Event(o,t.namespace,d,n))}))}else S(1,"ERROR: Invalid event name supplied.");return d},d.on("change.internal",(function(e){"loglevel"!==e.what&&"tweenChanges"!==e.what&&("triggerElement"===e.what?N():"reverse"===e.what&&d.update())})).on("shift.internal",(function(e){R(),d.update()}));var S=this._log=function(e,t){p.loglevel>=e&&(Array.prototype.splice.call(arguments,1,0,"("+l+") ->"),o.log.apply(window,arguments))};this.addTo=function(t){return t instanceof e.Controller?a!=t&&(a&&a.removeScene(d),a=t,j(),x(!0),N(!0),R(),a.info("container").addEventListener("resize",P),t.addScene(d),d.trigger("add",{controller:a}),S(3,"added "+l+" to controller"),d.update()):S(1,"ERROR: supplied argument of 'addTo()' is not a valid ScrollMagic Controller"),d},this.enabled=function(e){return arguments.length?(y!=e&&(y=!!e,d.update(!0)),d):y},this.remove=function(){if(a){a.info("container").removeEventListener("resize",P);var e=a;a=void 0,e.removeScene(d),d.trigger("remove"),S(3,"removed "+l+" from controller")}return d},this.destroy=function(e){return d.trigger("destroy",{reset:e}),d.remove(),d.off("*.*"),S(3,"destroyed "+l+" (reset: "+(e?"true":"false")+")"),null},this.update=function(e){if(a)if(e)if(a.enabled()&&y){var t,n=a.info("scrollPos");t=p.duration>0?(n-v.start)/(v.end-v.start):n>=v.start?1:0,d.trigger("update",{startPos:v.start,endPos:v.end,scrollPos:n}),d.progress(t)}else E&&g===c&&F(!0);else a.updateScene(d,!1);return d},this.refresh=function(){return x(),N(),d},this.progress=function(e){if(arguments.length){var t=!1,n=g,r=a?a.info("scrollDirection"):"PAUSED",o=p.reverse||e>=h;if(0===p.duration?(t=h!=e,g=0===(h=e<1&&o?0:1)?s:c):e<0&&g!==s&&o?(h=0,g=s,t=!0):e>=0&&e<1&&o?(h=e,g=c,t=!0):e>=1&&g!==u?(h=1,g=u,t=!0):g!==c||o||F(),t){var i={progress:h,state:g,scrollDirection:r},l=g!=n,f=function(e){d.trigger(e,i)};l&&n!==c&&(f("enter"),f(n===s?"start":"end")),f("progress"),l&&g!==c&&(f(g===s?"start":"end"),f("leave"))}return d}return h};var E,O,R=function(){v={start:m+p.offset},a&&p.triggerElement&&(v.start-=a.info("size")*p.triggerHook),v.end=v.start+p.duration},x=function(e){if(i){var t="duration";T(t,i.call(d))&&!e&&(d.trigger("change",{what:t,newval:p[t]}),d.trigger("shift",{reason:t}))}},N=function(e){var n=0,r=p.triggerElement;if(a&&(r||m>0)){if(r)if(r.parentNode){for(var i=a.info(),l=o.get.offset(i.container),s=i.vertical?"top":"left";r.parentNode.hasAttribute(t);)r=r.parentNode;var c=o.get.offset(r);i.isDocument||(l[s]-=a.scrollPos()),n=c[s]-l[s]}else S(2,"WARNING: triggerElement was removed from DOM and will be reset to",void 0),d.triggerElement(void 0);var u=n!=m;m=n,u&&!e&&d.trigger("shift",{reason:"triggerElementPosition"})}},P=function(e){p.triggerHook>0&&d.trigger("shift",{reason:"containerResize"})},C=o.extend(r.validate,{duration:function(e){if(o.type.String(e)&&e.match(/^(\.|\d)*\d+%$/)){var t=parseFloat(e)/100;e=function(){return a?a.info("size")*t:0}}if(o.type.Function(e)){i=e;try{e=parseFloat(i.call(d))}catch(n){e=-1}}if(e=parseFloat(e),!o.type.Number(e)||e<0)throw i?(i=void 0,['Invalid return value of supplied function for option "duration":',e]):['Invalid value for option "duration":',e];return e}}),j=function(e){(e=arguments.length?[e]:Object.keys(C)).forEach((function(e,t){var n;if(C[e])try{n=C[e](p[e])}catch(i){n=f[e];var r=o.type.String(i)?[i]:i;o.type.Array(r)?(r[0]="ERROR: "+r[0],r.unshift(1),S.apply(this,r)):S(1,"ERROR: Problem executing validation callback for option '"+e+"':",i.message)}finally{p[e]=n}}))},T=function(e,t){var n=!1,r=p[e];return p[e]!=t&&(p[e]=t,j(e),n=r!=p[e]),n},A=function(e){d[e]||(d[e]=function(t){return arguments.length?("duration"===e&&(i=void 0),T(e,t)&&(d.trigger("change",{what:e,newval:p[e]}),r.shifts.indexOf(e)>-1&&d.trigger("shift",{reason:e})),d):p[e]})};this.controller=function(){return a},this.state=function(){return g},this.scrollOffset=function(){return v.start},this.triggerPosition=function(){var e=p.offset;return a&&(p.triggerElement?e+=m:e+=a.info("size")*d.triggerHook()),e},d.on("shift.internal",(function(e){var t="duration"===e.reason;(g===u&&t||g===c&&0===p.duration)&&F(),t&&L()})).on("progress.internal",(function(e){F()})).on("add.internal",(function(e){L()})).on("destroy.internal",(function(e){d.removePin(e.reset)}));var F=function(e){if(E&&a){var t=a.info(),n=O.spacer.firstChild;if(e||g!==c){var r={position:O.inFlow?"relative":"absolute",top:0,left:0},i=o.css(n,"position")!=r.position;O.pushFollowers?p.duration>0&&(g===u&&0===parseFloat(o.css(O.spacer,"padding-top"))||g===s&&0===parseFloat(o.css(O.spacer,"padding-bottom")))&&(i=!0):r[t.vertical?"top":"left"]=p.duration*h,o.css(n,r),i&&L()}else{"fixed"!=o.css(n,"position")&&(o.css(n,{position:"fixed"}),L());var l=o.get.offset(O.spacer,!0),f=p.reverse||0===p.duration?t.scrollPos-v.start:Math.round(h*p.duration*10)/10;l[t.vertical?"top":"left"]+=f,o.css(O.spacer.firstChild,{top:l.top,left:l.left})}}},L=function(){if(E&&a&&O.inFlow){var e=g===c,t=a.info("vertical"),n=O.spacer.firstChild,r=o.isMarginCollapseType(o.css(O.spacer,"display")),i={};O.relSize.width||O.relSize.autoFullWidth?e?o.css(E,{width:o.get.width(O.spacer)}):o.css(E,{width:"100%"}):(i["min-width"]=o.get.width(t?E:n,!0,!0),i.width=e?i["min-width"]:"auto"),O.relSize.height?e?o.css(E,{height:o.get.height(O.spacer)-(O.pushFollowers?p.duration:0)}):o.css(E,{height:"100%"}):(i["min-height"]=o.get.height(t?n:E,!0,!r),i.height=e?i["min-height"]:"auto"),O.pushFollowers&&(i["padding"+(t?"Top":"Left")]=p.duration*h,i["padding"+(t?"Bottom":"Right")]=p.duration*(1-h)),o.css(O.spacer,i)}},z=function(){a&&E&&g===c&&!a.info("isDocument")&&F()},k=function(){a&&E&&g===c&&((O.relSize.width||O.relSize.autoFullWidth)&&o.get.width(window)!=o.get.width(O.spacer.parentNode)||O.relSize.height&&o.get.height(window)!=o.get.height(O.spacer.parentNode))&&L()},D=function(e){a&&E&&g===c&&!a.info("isDocument")&&(e.preventDefault(),a._setScrollPos(a.info("scrollPos")-((e.wheelDelta||e[a.info("vertical")?"wheelDeltaY":"wheelDeltaX"])/3||30*-e.detail)))};this.setPin=function(e,n){var r={pushFollowers:!0,spacerClass:"scrollmagic-pin-spacer"},i=n&&n.hasOwnProperty("pushFollowers");if(n=o.extend({},r,n),!(e=o.get.elements(e)[0]))return S(1,"ERROR calling method 'setPin()': Invalid pin element supplied."),d;if("fixed"===o.css(e,"position"))return S(1,"ERROR calling method 'setPin()': Pin does not work with elements that are positioned 'fixed'."),d;if(E){if(E===e)return d;d.removePin()}var a=(E=e).parentNode.style.display,l=["top","left","bottom","right","margin","marginLeft","marginRight","marginTop","marginBottom"];E.parentNode.style.display="none";var s="absolute"!=o.css(E,"position"),c=o.css(E,l.concat(["display"])),u=o.css(E,["width","height"]);E.parentNode.style.display=a,!s&&n.pushFollowers&&(S(2,"WARNING: If the pinned element is positioned absolutely pushFollowers will be disabled."),n.pushFollowers=!1),window.setTimeout((function(){E&&0===p.duration&&i&&n.pushFollowers&&S(2,"WARNING: pushFollowers =",!0,"has no effect, when scene duration is 0.")}),0);var f=E.parentNode.insertBefore(document.createElement("div"),E),g=o.extend(c,{position:s?"relative":"absolute",boxSizing:"content-box",mozBoxSizing:"content-box",webkitBoxSizing:"content-box"});if(s||o.extend(g,o.css(E,["width","height"])),o.css(f,g),f.setAttribute(t,""),o.addClass(f,n.spacerClass),O={spacer:f,relSize:{width:"%"===u.width.slice(-1),height:"%"===u.height.slice(-1),autoFullWidth:"auto"===u.width&&s&&o.isMarginCollapseType(c.display)},pushFollowers:n.pushFollowers,inFlow:s},!E.___origStyle){E.___origStyle={};var h=E.style;l.concat(["width","height","position","boxSizing","mozBoxSizing","webkitBoxSizing"]).forEach((function(e){E.___origStyle[e]=h[e]||""}))}return O.relSize.width&&o.css(f,{width:u.width}),O.relSize.height&&o.css(f,{height:u.height}),f.appendChild(E),o.css(E,{position:s?"relative":"absolute",margin:"auto",top:"auto",left:"auto",bottom:"auto",right:"auto"}),(O.relSize.width||O.relSize.autoFullWidth)&&o.css(E,{boxSizing:"border-box",mozBoxSizing:"border-box",webkitBoxSizing:"border-box"}),window.addEventListener("scroll",z),window.addEventListener("resize",z),window.addEventListener("resize",k),E.addEventListener("mousewheel",D),E.addEventListener("DOMMouseScroll",D),S(3,"added pin"),F(),d},this.removePin=function(e){if(E){if(g===c&&F(!0),e||!a){var n=O.spacer.firstChild;if(n.hasAttribute(t)){var r=O.spacer.style,i={};["margin","marginLeft","marginRight","marginTop","marginBottom"].forEach((function(e){i[e]=r[e]||""})),o.css(n,i)}O.spacer.parentNode.insertBefore(n,O.spacer),O.spacer.parentNode.removeChild(O.spacer),E.parentNode.hasAttribute(t)||(o.css(E,E.___origStyle),delete E.___origStyle)}window.removeEventListener("scroll",z),window.removeEventListener("resize",z),window.removeEventListener("resize",k),E.removeEventListener("mousewheel",D),E.removeEventListener("DOMMouseScroll",D),E=void 0,S(3,"removed pin (reset: "+(e?"true":"false")+")")}return d};var I,_=[];return d.on("destroy.internal",(function(e){d.removeClassToggle(e.reset)})),this.setClassToggle=function(e,t){var n=o.get.elements(e);return 0!==n.length&&o.type.String(t)?(_.length>0&&d.removeClassToggle(),I=t,_=n,d.on("enter.internal_class leave.internal_class",(function(e){var t="enter"===e.type?o.addClass:o.removeClass;_.forEach((function(e,n){t(e,I)}))})),d):(S(1,"ERROR calling method 'setClassToggle()': Invalid "+(0===n.length?"element":"classes")+" supplied."),d)},this.removeClassToggle=function(e){return e&&_.forEach((function(e,t){o.removeClass(e,I)})),d.off("start.internal_class end.internal_class"),I=void 0,_=[],d},w(),d};var r={defaults:{duration:0,offset:0,triggerElement:void 0,triggerHook:.5,reverse:!0,loglevel:2},validate:{offset:function(e){if(e=parseFloat(e),!o.type.Number(e))throw['Invalid value for option "offset":',e];return e},triggerElement:function(e){if(e=e||void 0){var t=o.get.elements(e)[0];if(!t||!t.parentNode)throw['Element defined in option "triggerElement" was not found:',e];e=t}return e},triggerHook:function(e){var t={onCenter:.5,onEnter:1,onLeave:0};if(o.type.Number(e))e=Math.max(0,Math.min(parseFloat(e),1));else{if(!(e in t))throw['Invalid value for option "triggerHook": ',e];e=t[e]}return e},reverse:function(e){return!!e},loglevel:function(e){if(e=parseInt(e),!o.type.Number(e)||e<0||e>3)throw['Invalid value for option "loglevel":',e];return e}},shifts:["duration","offset","triggerHook"]};e.Scene.addOption=function(t,n,o,i){t in r.defaults?e._util.log(1,"[static] ScrollMagic.Scene -> Cannot add Scene option '"+t+"', because it already exists."):(r.defaults[t]=n,r.validate[t]=o,i&&r.shifts.push(t))},e.Scene.extend=function(t){var n=this;e.Scene=function(){return n.apply(this,arguments),this.$super=o.extend({},this),t.apply(this,arguments)||this},o.extend(e.Scene,n),e.Scene.prototype=n.prototype,e.Scene.prototype.constructor=e.Scene},e.Event=function(e,t,n,r){for(var o in r=r||{})this[o]=r[o];return this.type=e,this.target=this.currentTarget=n,this.namespace=t||"",this.timeStamp=this.timestamp=Date.now(),this};var o=e._util=function(e){var t,n={},r=function(e){return parseFloat(e)||0},o=function(t){return t.currentStyle?t.currentStyle:e.getComputedStyle(t)},i=function(t,n,i,a){if((n=n===document?e:n)===e)a=!1;else if(!g.DomElement(n))return 0;t=t.charAt(0).toUpperCase()+t.substr(1).toLowerCase();var l=(i?n["offset"+t]||n["outer"+t]:n["client"+t]||n["inner"+t])||0;if(i&&a){var s=o(n);l+="Height"===t?r(s.marginTop)+r(s.marginBottom):r(s.marginLeft)+r(s.marginRight)}return l},a=function(e){return e.replace(/^[^a-z]+([a-z])/g,"$1").replace(/-([a-z])/g,(function(e){return e[1].toUpperCase()}))};n.extend=function(e){for(e=e||{},t=1;t<arguments.length;t++)if(arguments[t])for(var n in arguments[t])arguments[t].hasOwnProperty(n)&&(e[n]=arguments[t][n]);return e},n.isMarginCollapseType=function(e){return["block","flex","list-item","table","-webkit-box"].indexOf(e)>-1};var l=0,s=["ms","moz","webkit","o"],c=e.requestAnimationFrame,u=e.cancelAnimationFrame;for(t=0;!c&&t<s.length;++t)c=e[s[t]+"RequestAnimationFrame"],u=e[s[t]+"CancelAnimationFrame"]||e[s[t]+"CancelRequestAnimationFrame"];c||(c=function(t){var n=(new Date).getTime(),r=Math.max(0,16-(n-l)),o=e.setTimeout((function(){t(n+r)}),r);return l=n+r,o}),u||(u=function(t){e.clearTimeout(t)}),n.rAF=c.bind(e),n.cAF=u.bind(e);var f=["error","warn","log"],d=e.console||{};for(d.log=d.log||function(){},t=0;t<f.length;t++){var p=f[t];d[p]||(d[p]=d.log)}n.log=function(e){(e>f.length||e<=0)&&(e=f.length);var t=new Date,n=("0"+t.getHours()).slice(-2)+":"+("0"+t.getMinutes()).slice(-2)+":"+("0"+t.getSeconds()).slice(-2)+":"+("00"+t.getMilliseconds()).slice(-3),r=f[e-1],o=Array.prototype.splice.call(arguments,1),i=Function.prototype.bind.call(d[r],d);o.unshift(n),i.apply(d,o)};var g=n.type=function(e){return Object.prototype.toString.call(e).replace(/^\[object (.+)\]$/,"$1").toLowerCase()};g.String=function(e){return"string"===g(e)},g.Function=function(e){return"function"===g(e)},g.Array=function(e){return Array.isArray(e)},g.Number=function(e){return!g.Array(e)&&e-parseFloat(e)+1>=0},g.DomElement=function(e){return"object"===typeof HTMLElement||"function"===typeof HTMLElement?e instanceof HTMLElement||e instanceof SVGElement:e&&"object"===typeof e&&null!==e&&1===e.nodeType&&"string"===typeof e.nodeName};var h=n.get={};return h.elements=function(t){var n=[];if(g.String(t))try{t=document.querySelectorAll(t)}catch(a){return n}if("nodelist"===g(t)||g.Array(t)||t instanceof NodeList)for(var r=0,o=n.length=t.length;r<o;r++){var i=t[r];n[r]=g.DomElement(i)?i:h.elements(i)}else(g.DomElement(t)||t===document||t===e)&&(n=[t]);return n},h.scrollTop=function(t){return t&&"number"===typeof t.scrollTop?t.scrollTop:e.pageYOffset||0},h.scrollLeft=function(t){return t&&"number"===typeof t.scrollLeft?t.scrollLeft:e.pageXOffset||0},h.width=function(e,t,n){return i("width",e,t,n)},h.height=function(e,t,n){return i("height",e,t,n)},h.offset=function(e,t){var n={top:0,left:0};if(e&&e.getBoundingClientRect){var r=e.getBoundingClientRect();n.top=r.top,n.left=r.left,t||(n.top+=h.scrollTop(),n.left+=h.scrollLeft())}return n},n.addClass=function(e,t){t&&(e.classList?e.classList.add(t):e.className+=" "+t)},n.removeClass=function(e,t){t&&(e.classList?e.classList.remove(t):e.className=e.className.replace(new RegExp("(^|\\b)"+t.split(" ").join("|")+"(\\b|$)","gi")," "))},n.css=function(e,t){if(g.String(t))return o(e)[a(t)];if(g.Array(t)){var n={},r=o(e);return t.forEach((function(e,t){n[e]=r[a(e)]})),n}for(var i in t){var l=t[i];l==parseFloat(l)&&(l+="px"),e.style[a(i)]=l}},n}(window||{});return e.Scene.prototype.addIndicators=function(){return e._util.log(1,"(ScrollMagic.Scene) -> ERROR calling addIndicators() due to missing Plugin 'debug.addIndicators'. Please make sure to include plugins/debug.addIndicators.js"),this},e.Scene.prototype.removeIndicators=function(){return e._util.log(1,"(ScrollMagic.Scene) -> ERROR calling removeIndicators() due to missing Plugin 'debug.addIndicators'. Please make sure to include plugins/debug.addIndicators.js"),this},e.Scene.prototype.setTween=function(){return e._util.log(1,"(ScrollMagic.Scene) -> ERROR calling setTween() due to missing Plugin 'animation.gsap'. Please make sure to include plugins/animation.gsap.js"),this},e.Scene.prototype.removeTween=function(){return e._util.log(1,"(ScrollMagic.Scene) -> ERROR calling removeTween() due to missing Plugin 'animation.gsap'. Please make sure to include plugins/animation.gsap.js"),this},e.Scene.prototype.setVelocity=function(){return e._util.log(1,"(ScrollMagic.Scene) -> ERROR calling setVelocity() due to missing Plugin 'animation.velocity'. Please make sure to include plugins/animation.velocity.js"),this},e.Scene.prototype.removeVelocity=function(){return e._util.log(1,"(ScrollMagic.Scene) -> ERROR calling removeVelocity() due to missing Plugin 'animation.velocity'. Please make sure to include plugins/animation.velocity.js"),this},e})?r.call(t,n,t,e):r)||(e.exports=o)},918:function(e,t,n){}}]);