(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{120:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return f}));var r=n(0),i=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=i.a.createContext({}),s=function(e){var t=i.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},u=function(e){var t=s(e.components);return i.a.createElement(l.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},d=i.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,o=e.parentName,l=p(e,["components","mdxType","originalType","parentName"]),u=s(n),d=r,f=u["".concat(o,".").concat(d)]||u[d]||b[d]||a;return n?i.a.createElement(f,c(c({ref:t},l),{},{components:n})):i.a.createElement(f,c({ref:t},l))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,o=new Array(a);o[0]=d;var c={};for(var p in t)hasOwnProperty.call(t,p)&&(c[p]=t[p]);c.originalType=e,c.mdxType="string"==typeof e?e:r,o[1]=c;for(var l=2;l<a;l++)o[l]=n[l];return i.a.createElement.apply(null,o)}return i.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},92:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return p})),n.d(t,"default",(function(){return s}));var r=n(2),i=n(6),a=(n(0),n(120)),o={id:"getting-started-project-setup",title:"Configuring Paperclip With Your Project",sidebar_label:"Project Setup"},c={id:"getting-started-project-setup",isDocsHomePage:!1,title:"Configuring Paperclip With Your Project",description:"For existing projects, you'll need to manually configure Paperclip. If you're starting fresh, just follow the steps in the installation doc.",source:"@site/docs/getting-started-project-setup.md",permalink:"/docs/getting-started-project-setup",editUrl:"https://github.com/crcn/paperclip/edit/master/packages/paperclip-website/docs/getting-started-project-setup.md",sidebar_label:"Project Setup",sidebar:"docs",previous:{title:"Installation",permalink:"/docs/getting-started-installation"},next:{title:"Using Paperclip With React",permalink:"/docs/getting-started-first-ui"}},p=[{value:"Webpack Setup",id:"webpack-setup",children:[]},{value:"TypeScript",id:"typescript",children:[]}],l={rightToc:p};function s(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"For ",Object(a.b)("strong",{parentName:"p"},"existing projects"),", you'll need to manually configure Paperclip. If you're starting fresh, just follow the steps in the ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"/docs/getting-started-installation#new-projects"}),"installation doc"),". "),Object(a.b)("p",null,"First up, be sure to have run ",Object(a.b)("inlineCode",{parentName:"p"},"npx paperclip init")," in your existing project directory. This will install necessary dependencies & also include a ",Object(a.b)("inlineCode",{parentName:"p"},"paperclip.config.json")," that's required."),Object(a.b)("h3",{id:"webpack-setup"},"Webpack Setup"),Object(a.b)("p",null,"Documentation for this can be found in the ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"/docs/configure-webpack"}),"Webpack Integration")," page. The only thing you really need to configure is:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"paperclip-loader")," - compiles PC files to JSX."),Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"style-loader")," - required since Paperclip emits CSS."),Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"css-loader")," - required with style-loader."),Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"file-loader")," - required for CSS files that have ",Object(a.b)("inlineCode",{parentName:"li"},"url()"),"'s in them & other media. ")),Object(a.b)("h3",{id:"typescript"},"TypeScript"),Object(a.b)("p",null,"If you're using TypeScript, you can generate Typed Definitions from Paperclip files by running:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-bash"}),"npx paperclip build --definition --write\n")),Object(a.b)("p",null,"This will write ",Object(a.b)("inlineCode",{parentName:"p"},"*.pc.d.ts")," files in in the same directory as their corresponding ",Object(a.b)("inlineCode",{parentName:"p"},"*.pc")," file. I'd also recommend that you include ",Object(a.b)("inlineCode",{parentName:"p"},"*.pc.d.ts")," in your ",Object(a.b)("inlineCode",{parentName:"p"},".gitignore")," file."),Object(a.b)("p",null,"\u261d This command will generate definitions files based on the compiler you're using. So if you're using ",Object(a.b)("inlineCode",{parentName:"p"},"paperclip-compiler-react"),", then React\nTyped Definition files will be generated for you. Configuration for the compiler can be found in the ",Object(a.b)("inlineCode",{parentName:"p"},"paperclip.config.json"),". "))}s.isMDXComponent=!0}}]);