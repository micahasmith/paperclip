(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{123:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return f}));var r=n(0),i=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=i.a.createContext({}),u=function(e){var t=i.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},s=function(e){var t=u(e.components);return i.a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},b=i.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,c=e.parentName,l=p(e,["components","mdxType","originalType","parentName"]),s=u(n),b=r,f=s["".concat(c,".").concat(b)]||s[b]||d[b]||o;return n?i.a.createElement(f,a(a({ref:t},l),{},{components:n})):i.a.createElement(f,a({ref:t},l))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,c=new Array(o);c[0]=b;var a={};for(var p in t)hasOwnProperty.call(t,p)&&(a[p]=t[p]);a.originalType=e,a.mdxType="string"==typeof e?e:r,c[1]=a;for(var l=2;l<o;l++)c[l]=n[l];return i.a.createElement.apply(null,c)}return i.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"},97:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return a})),n.d(t,"rightToc",(function(){return p})),n.d(t,"default",(function(){return u}));var r=n(2),i=n(6),o=(n(0),n(123)),c={id:"configure-typescript",title:"TypeScript Usage",sidebar_label:"TypeScript"},a={id:"configure-typescript",isDocsHomePage:!1,title:"TypeScript Usage",description:"Paperclip UIs can compile down typed definition files that you can use in your TypeScript project. To do this, you'll need to install the CLI tool. You'll also need a paperclip.config.json file.  Assuming you have both of those things, just run:",source:"@site/docs/configure-typescript.md",permalink:"/docs/configure-typescript",editUrl:"https://github.com/crcn/paperclip/edit/master/packages/paperclip-website/docs/configure-typescript.md",sidebar_label:"TypeScript",sidebar:"docs",previous:{title:"Setting Up Webpack",permalink:"/docs/configure-webpack"},next:{title:"Setting Up Visual Regression Tests",permalink:"/docs/configure-percy"}},p=[],l={rightToc:p};function u(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Paperclip UIs can compile down typed definition files that you can use in your TypeScript project. To do this, you'll need to install the ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"/docs/usage-cli"}),"CLI tool"),". You'll also need a ",Object(o.b)("inlineCode",{parentName:"p"},"paperclip.config.json")," file.  Assuming you have both of those things, just run:"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-sh"}),"paperclip build --definition --write\n")),Object(o.b)("p",null,"\u261d\ud83c\udffb This will generate ",Object(o.b)("inlineCode",{parentName:"p"},"*.pc.d.ts")," files. I'd recommend that you include this script in your ",Object(o.b)("inlineCode",{parentName:"p"},"package.json"),":"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-json"}),'{\n  "name": "react-todomvc",\n  "main": "index.js",\n  "scripts": {\n    "build": "npm run build:definitions && npm run build:webpack",\n    "build:watch": "npm bun build:definitions -- --watch & npm run build:webpack -- --watch",\n    "build:webpack": "webpack",\n    "build:definitions": "paperclip build --definition --write"\n  }\n}\n')),Object(o.b)("p",null,"I'd also recommend including ",Object(o.b)("inlineCode",{parentName:"p"},"*.pc.d.ts")," in your ",Object(o.b)("inlineCode",{parentName:"p"},".gitignore"),". "))}u.isMDXComponent=!0}}]);