(this["webpackJsonppancake-frontend"]=this["webpackJsonppancake-frontend"]||[]).push([[17],{1144:function(e,t,r){"use strict";r.r(t);var a=r(4),i=r.n(a),n=r(31),o=r(17),c=r(0),s=r(793),l=r(911),d=r(797),u=r(142),m=r(840),b=r(851),h=r(806),p=r(184),j=r(794),f=r(796),v=r(19),g=r(809),O=r(833),x=r(5),y=Object(s.a)((function(e){return{container:{padding:"30px 0 150px"},button:{color:e.palette.text.third,border:"1px solid ".concat(e.palette.divider),marginBottom:30,"&.active":{borderColor:e.palette.text.primary},"&:hover":{borderColor:e.palette.text.primary}}}})),S=[{label:"All",key:""},{label:"Video",key:O.a.VIDEO},{label:"Audio",key:O.a.AUDIO},{label:"Figure",key:O.a.PICTURE}],w=function(e){var t=e.hidden,r=e.data,a=Object(c.useState)(""),i=Object(o.a)(a,2),n=i[0],s=i[1],l=y(),d=Object(c.useMemo)((function(){return r&&n?r.filter((function(e){return e.type===n})):r}),[n,r]);return Object(x.jsxs)("div",{hidden:t,className:l.container,children:[Object(x.jsx)(j.a,{container:!0,spacing:1,children:S.map((function(e){return Object(x.jsx)(j.a,{item:!0,children:Object(x.jsx)(f.a,{size:"small",variant:"outlined",onClick:function(){s(e.key)},className:Object(v.a)(l.button,{active:n===e.key}),children:e.label})},e.key)}))}),Object(x.jsx)(j.a,{container:!0,spacing:2,children:(d||new Array(4).fill("")).map((function(e,t){return Object(x.jsx)(j.a,{item:!0,xs:6,md:3,children:Object(x.jsx)(g.a,{data:e})},e.id||t)}))})]})},k=Object(s.a)((function(e){return{container:{},header:{backgroundSize:"cover",backgroundColor:"#171717",width:"100%",height:216,overflow:"hidden",position:"relative",zIndex:-1,opacity:"0.5","& video":{width:"100%",position:"relative",top:"-100px"}},userInfo:{textAlign:"center",marginTop:-54,marginBottom:30,"& .iconfont":{color:e.palette.text.primary,cursor:"pointer"}},portrait:{height:108,width:108,margin:"0 auto 10px",borderRadius:"50%"},userName:{fontSize:18,fontWeight:600},follower:{fontSize:14,color:e.palette.text.third,lineHeight:1.5,marginBottom:10},userDescription:{fontSize:14,width:480,maxWidth:"100%",color:e.palette.text.third,margin:"0 auto 10px",lineHeight:1.5},tabs:{"&.MuiTabs-root":{borderBottom:"1px solid ".concat(e.palette.divider)},"& .MuiButtonBase-root.Mui-selected":{color:e.palette.text.third},"& .MuiButtonBase-root":{fontWeight:600}}}}));t.default=function(){var e,t,r=Object(c.useState)(0),a=Object(o.a)(r,2),s=a[0],j=(a[1],k()),f=Object(h.a)().id,v=void 0===f?4:f,g=Object(c.useState)({}),O=Object(o.a)(g,2),y=O[0],S=O[1],I=Object(c.useState)(null),R=Object(o.a)(I,2),N=R[0],C=R[1],D=function(){var e=Object(n.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(m.a)({id:v});case 2:t=e.sent,S(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),E=function(){var e=Object(n.a)(i.a.mark((function e(){var t,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(b.c)({page:1,num:100,author_id:v});case 2:t=e.sent,r=t.data,C(r);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(c.useEffect)((function(){D(),E()}),[]),Object(x.jsxs)("div",{className:j.container,children:[Object(x.jsx)("div",{className:j.header,children:Object(x.jsx)("video",{loop:!0,preload:"auto",muted:!0,src:null===y||void 0===y||null===(e=y.background_inner_resource)||void 0===e?void 0:e.url,autoPlay:!0})}),Object(x.jsxs)(u.a,{children:[Object(x.jsxs)("div",{className:j.userInfo,children:[Object(x.jsx)(l.a,{className:j.portrait,src:null===(t=y.avatar_resource)||void 0===t?void 0:t.url,variant:"rounded"}),Object(x.jsx)("div",{className:j.userName,children:"".concat((null===y||void 0===y?void 0:y.first_name)||""," ").concat((null===y||void 0===y?void 0:y.last_name)||"")}),Object(x.jsxs)("div",{className:j.follower,children:["follower/",Object(p.a)(y.follower/1e3,0),"k"]}),Object(x.jsx)("div",{className:j.userDescription,children:y.description}),Object(x.jsx)(d.a,{baseClassName:"iconfont dj-twitter",onClick:function(){window.open(y.twitter)}})]}),Object(x.jsx)(w,{data:N,hidden:0!==s})]})]})}},802:function(e,t,r){"use strict";var a=r(22),i=r(240),n=(r(0),r(910)),o=r(846),c=r(5),s=Object(o.a)(n.a)({"&.MuiSkeleton-text":{height:40}});t.a=function(e){var t=e.rows,r=Object(i.a)(e,["rows"]);return t?Object(c.jsx)(c.Fragment,{children:new Array(t).fill("").map((function(e,t){return Object(c.jsx)(s,Object(a.a)({},r),t)}))}):Object(c.jsx)(s,Object(a.a)({},r))}},805:function(e,t,r){"use strict";var a=r(22),i=r(0),n=r.n(i),o=r(793),c=r(240),s=r(2),l=r(6),d=r(8),u=r(9),m=r(1114),b=r(102),h=r(244),p=r(827),j=r.n(p),f=r(5),v=function(e){Object(d.a)(r,e);var t=Object(u.a)(r);function r(e){var a;return Object(s.a)(this,r),(a=t.call(this,e)).handleLoadImage=function(e){a.setState({imageLoaded:!0,imageError:!1}),a.props.onLoad&&a.props.onLoad(e)},a.handleImageError=function(e){a.props.src&&(a.setState({imageError:!0}),a.props.onError&&a.props.onError(e))},a.state={imageError:!1,imageLoaded:!1,src:a.props.src},a.image=n.a.createRef(),a}return Object(l.a)(r,[{key:"componentDidMount",value:function(){var e=this.image.current;e&&e.complete&&(0===e.naturalWidth?this.handleImageError():this.handleLoadImage())}},{key:"getStyles",value:function(){var e=this.props,t=e.animationDuration,r=e.aspectRatio,i=e.cover,n=e.color,o=e.imageStyle,c=e.disableTransition,s=e.iconContainerStyle,l=e.style,d=!c&&{opacity:this.state.imageLoaded?1:0,filterBrightness:this.state.imageLoaded?100:0,filterSaturate:this.state.imageLoaded?100:20,transition:"\n        filterBrightness ".concat(.75*t,"ms cubic-bezier(0.4, 0.0, 0.2, 1),\n        filterSaturate ").concat(t,"ms cubic-bezier(0.4, 0.0, 0.2, 1),\n        opacity ").concat(t/2,"ms cubic-bezier(0.4, 0.0, 0.2, 1)")};return{root:Object(a.a)({color:n,paddingTop:"calc(1 / ".concat(r," * 100%)"),position:"relative"},l),image:Object(a.a)(Object(a.a)({width:"100%",height:"100%",position:"absolute",objectFit:i?"cover":"inherit",top:0,left:0},d),o),iconContainer:Object(a.a)({width:"100%",height:"100%",position:"absolute",top:0,left:0,display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:"none"},s)}}},{key:"render",value:function(){var e=this.getStyles(),t=this.props,r=(t.animationDuration,t.aspectRatio,t.color,t.cover,t.disableError),i=t.disableSpinner,n=(t.disableTransition,t.errorIcon),o=(t.iconContainerStyle,t.imageStyle,t.loading),s=t.onClick,l=(t.style,t.className),d=Object(c.a)(t,["animationDuration","aspectRatio","color","cover","disableError","disableSpinner","disableTransition","errorIcon","iconContainerStyle","imageStyle","loading","onClick","style","className"]);return Object(f.jsxs)("div",{style:e.root,className:l,onClick:s,children:[d.src&&Object(f.jsx)("img",Object(a.a)(Object(a.a)({},d),{},{ref:this.image,style:e.image,onLoad:this.handleLoadImage,onError:this.handleImageError})),Object(f.jsxs)("div",{style:e.iconContainer,children:[!i&&!this.state.imageLoaded&&!this.state.imageError&&o,!r&&this.state.imageError&&n]})]})}}],[{key:"getDerivedStateFromProps",value:function(e,t){return t.src!==e.src?{imageError:!1,imageLoaded:!1,src:e.src}:null}}]),r}(i.Component);v.defaultProps={animationDuration:3e3,aspectRatio:1,color:b.a.white,disableError:!1,disableSpinner:!1,disableTransition:!1,errorIcon:Object(f.jsx)(j.a,{style:{width:48,height:48,color:h.a[300]}}),loading:Object(f.jsx)(m.a,{color:"inherit",disableShrink:!0,size:48})};var g=Object(o.a)((function(e){return{container:{}}}));t.a=function(e){var t=e.aspectRatio,r=void 0===t?4/3:t,i=e.disableSpinner,n=void 0===i||i,o=e.animationDuration,c=void 0===o?1e3:o;g();return Object(f.jsx)(v,Object(a.a)({},Object(a.a)(Object(a.a)({},e),{},{animationDuration:c,disableSpinner:n,color:"#333",cover:!0,aspectRatio:r})))}},806:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var a=r(811),i=r(0),n=r(36);function o(){var e=Object(n.g)().search;return Object(i.useMemo)((function(){return e&&e.length>1?Object(a.parse)(e,{parseArrays:!1,ignoreQueryPrefix:!0}):{}}),[e])}},809:function(e,t,r){"use strict";r(0);var a=r(793),i=r(805),n=r(96),o=r(35),c=r(802),s=r(5),l=Object(a.a)((function(e){return{cardItem:{border:"2px solid ".concat(e.palette.divider),padding:"20px",cursor:"pointer",fontSize:16,position:"relative",filter:function(e){return e.reverse?"grayscale(100%)":"initial"}},imgContainer:{cursor:"pointer",width:"100%",marginBottom:20,backgroundSize:"100% 100%",overflow:"hidden","& img":{transition:"all linear 0.2s !important",width:"100%",height:"100%","&:hover":{transform:"scale(1.5)"}}},cardItemTextContent:{"& div:not(:last-child)":{marginBottom:5}},cardItemTitle:{fontFamily:"text-bold",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",lineHeight:1.5},cardItemDescription:{color:e.palette.text.secondary,height:42,overflow:"hidden",lineHeight:"21px"},cardItemSeries:{fontSize:12,lineHeight:1.5,color:e.palette.text.secondary},cardItemDegree:{display:"flex",alignItem:"center","& img":{width:15,marginRight:10}},rarityTag:{position:"absolute",height:62,width:62,zIndex:1,left:20,top:20}}}));t.a=function(e){var t,r=e.data,a=e.showRarityTag,d=e.reverse,u=l({reverse:d});return Object(s.jsxs)("div",{className:u.cardItem,onClick:function(){(null===r||void 0===r?void 0:r.id)&&n.a.push("".concat(o.a.WORK_DETAIL,"?id=").concat(r.id))},children:[a&&Object(s.jsx)("img",{src:"/images/work/".concat(r.rarity,".png"),className:u.rarityTag,alt:""}),Object(s.jsx)("div",{className:u.imgContainer,children:Object(s.jsx)(i.a,{src:null===r||void 0===r||null===(t=r.cover_resource)||void 0===t?void 0:t.url,disableSpinner:!1,loading:Object(s.jsx)(c.a,{variant:"rectangular",width:"100%",height:"100%"})})}),(null===r||void 0===r?void 0:r.id)?Object(s.jsxs)("div",{className:u.cardItemTextContent,children:[Object(s.jsx)("div",{className:u.cardItemTitle,children:r.title}),Object(s.jsx)("div",{className:u.cardItemDescription,children:r.sub_title}),Object(s.jsxs)("div",{className:u.cardItemSeries,children:["Series of ",r.series]}),Object(s.jsxs)("div",{className:u.cardItemDegree,children:[Object(s.jsx)("img",{src:"/images/work/rarity".concat(r.rarity,".png"),alt:""}),"Rare degree"]})]}):Object(s.jsxs)("div",{className:u.cardItemTextContent,children:[Object(s.jsx)(c.a,{}),Object(s.jsx)(c.a,{})]})]})}},833:function(e,t,r){"use strict";var a,i;r.d(t,"a",(function(){return a})),function(e){e.VIDEO="video",e.AUDIO="audio",e.PICTURE="picture"}(a||(a={})),function(e){e.UR="UR",e.SSR="SSR",e.SR="SR",e.R="R",e.N="N"}(i||(i={}))},840:function(e,t,r){"use strict";r.d(t,"a",(function(){return i})),r.d(t,"c",(function(){return n})),r.d(t,"b",(function(){return o}));var a=r(66),i=function(e){return a.a.request({url:"/v1/author",method:"get",params:e})},n=function(e){return a.a.request({url:"/v1/author/page",method:"get",params:e})},o=function(e){return a.a.request({url:"/v1/author/hot",method:"get",params:e})}},851:function(e,t,r){"use strict";r.d(t,"b",(function(){return i})),r.d(t,"c",(function(){return n})),r.d(t,"a",(function(){return o}));var a=r(66),i=function(e){return a.a.request({url:"/v1/work",method:"get",params:e})},n=function(e){return a.a.request({url:"/v1/work/page",method:"get",params:e})},o=function(e){return a.a.request({url:"/v1/work/recommend",method:"get",params:e})}},911:function(e,t,r){"use strict";var a=r(17),i=r(15),n=r(7),o=r(0),c=(r(27),r(19)),s=r(781),l=r(25),d=r(33),u=r(100),m=r(5),b=Object(u.a)(Object(m.jsx)("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person"),h=r(738),p=r(782);function j(e){return Object(h.a)("MuiAvatar",e)}Object(p.a)("MuiAvatar",["root","colorDefault","circular","rounded","square","img","fallback"]);var f=["alt","children","className","component","imgProps","sizes","src","srcSet","variant"],v=Object(l.a)("div",{name:"MuiAvatar",slot:"Root",overridesResolver:function(e,t){var r=e.ownerState;return[t.root,t[r.variant],r.colorDefault&&t.colorDefault]}})((function(e){var t=e.theme,r=e.ownerState;return Object(n.a)({position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:t.typography.fontFamily,fontSize:t.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none"},"rounded"===r.variant&&{borderRadius:t.shape.borderRadius},"square"===r.variant&&{borderRadius:0},r.colorDefault&&{color:t.palette.background.default,backgroundColor:"light"===t.palette.mode?t.palette.grey[400]:t.palette.grey[600]})})),g=Object(l.a)("img",{name:"MuiAvatar",slot:"Img",overridesResolver:function(e,t){return t.img}})({width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4}),O=Object(l.a)(b,{name:"MuiAvatar",slot:"Fallback",overridesResolver:function(e,t){return t.fallback}})({width:"75%",height:"75%"});var x=o.forwardRef((function(e,t){var r=Object(d.a)({props:e,name:"MuiAvatar"}),l=r.alt,u=r.children,b=r.className,h=r.component,p=void 0===h?"div":h,x=r.imgProps,y=r.sizes,S=r.src,w=r.srcSet,k=r.variant,I=void 0===k?"circular":k,R=Object(i.a)(r,f),N=null,C=function(e){var t=e.crossOrigin,r=e.referrerPolicy,i=e.src,n=e.srcSet,c=o.useState(!1),s=Object(a.a)(c,2),l=s[0],d=s[1];return o.useEffect((function(){if(i||n){d(!1);var e=!0,a=new Image;return a.onload=function(){e&&d("loaded")},a.onerror=function(){e&&d("error")},a.crossOrigin=t,a.referrerPolicy=r,a.src=i,n&&(a.srcset=n),function(){e=!1}}}),[t,r,i,n]),l}(Object(n.a)({},x,{src:S,srcSet:w})),D=S||w,E=D&&"error"!==C,z=Object(n.a)({},r,{colorDefault:!E,component:p,variant:I}),T=function(e){var t=e.classes,r={root:["root",e.variant,e.colorDefault&&"colorDefault"],img:["img"],fallback:["fallback"]};return Object(s.a)(r,j,t)}(z);return N=E?Object(m.jsx)(g,Object(n.a)({alt:l,src:S,srcSet:w,sizes:y,ownerState:z,className:T.img},x)):null!=u?u:D&&l?l[0]:Object(m.jsx)(O,{className:T.fallback}),Object(m.jsx)(v,Object(n.a)({as:p,ownerState:z,className:Object(c.a)(T.root,b),ref:t},R,{children:N}))}));t.a=x}}]);