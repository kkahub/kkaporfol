(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[185],{190:function(e,i,t){Promise.resolve().then(t.bind(t,7375)),Promise.resolve().then(t.bind(t,4104)),Promise.resolve().then(t.bind(t,3336)),Promise.resolve().then(t.t.bind(t,8998,23))},7375:function(e,i,t){"use strict";t.r(i),t.d(i,{default:function(){return d}});var l=t(7437),a=t(8475),o=t.n(a),s=t(4033),r=t(2265);let n="G-S0HQCS986C",p=e=>{void 0!==window.gtag&&window.gtag("config",n,{page_path:e})},c=()=>{let e=(0,s.usePathname)(),i=(0,r.useRef)(e);(0,r.useEffect)(()=>{i.current!==e&&(p(new URL(e,window.location.origin)),i.current=e)},[e])};function d(){return c(),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(o(),{strategy:"afterInteractive",src:"https://www.googletagmanager.com/gtag/js?id=".concat(n)}),(0,l.jsx)(o(),{id:"gtag-init",strategy:"afterInteractive",dangerouslySetInnerHTML:{__html:'\n				window.dataLayer = window.dataLayer || [];\n				function gtag(){dataLayer.push(arguments);}\n				gtag("js", new Date());\n				gtag("config", "'.concat(n,'", {\n					page_path: window.location.pathname,\n				});\n				')}})]})}},4104:function(e,i,t){"use strict";t.r(i),t.d(i,{default:function(){return d}});var l=t(7437),a=t(2265),o=t(1396),s=t.n(o),r=t(4033),n=t(7870),p=t(4102),c=t(2566);function d(){let e=(0,r.usePathname)(),[i,t]=(0,a.useState)(1e3),[o,d]=(0,a.useState)(!1),[m,g]=(0,a.useState)(!1);return(0,a.useLayoutEffect)(()=>{t(window.innerWidth)},[]),(0,c.Z)(e=>{t(e),e>1e3?(d(!0),g(!1)):(d(!1),g(!0))}),(0,l.jsx)("header",{id:"header",className:"/"===e?"main":"",children:(0,l.jsxs)("div",{className:"inner",children:[(0,l.jsx)("h1",{children:(0,l.jsx)(s(),{href:"/",children:"KKA"})}),(0,l.jsxs)(n.E.nav,{id:"nav",className:o?"on":"",children:[(0,l.jsxs)("button",{type:"button",className:"burgur",onClick:()=>d(!o),children:[(0,l.jsx)("span",{className:"bar1",children:" "}),(0,l.jsx)("span",{className:"bar2",children:" "}),(0,l.jsx)("span",{className:"bar3",children:" "})]}),(0,l.jsxs)(n.E.ul,{className:"gnb",children:[(0,l.jsx)(n.E.li,{variants:p.Z,animate:i>1e3||o?"show":"hide",custom:.1,className:"/"===e?"on":"",onClick:()=>d(!o),children:(0,l.jsx)(s(),{href:"/",children:"INTRO"})}),(0,l.jsx)(n.E.li,{variants:p.Z,animate:i>1e3||o?"show":"hide",custom:.2,className:"/profile"===e?"on":"",onClick:()=>d(!o),children:(0,l.jsx)(s(),{href:"/profile",children:"PROFILE"})}),(0,l.jsx)(n.E.li,{variants:p.Z,animate:i>1e3||o?"show":"hide",custom:.3,className:"/skill"===e?"on":"",onClick:()=>d(!o),children:(0,l.jsx)(s(),{href:"/skill",children:"SKILL"})}),(0,l.jsx)(n.E.li,{variants:p.Z,animate:i>1e3||o?"show":"hide",custom:.4,className:"/portfolio"===e?"on":"",onClick:()=>d(!o),children:(0,l.jsx)(s(),{href:"/portfolio",children:"PORTFOLIO"})}),(0,l.jsxs)(n.E.li,{variants:p.Z,animate:i>1e3||o?"show":"hide",custom:.5,className:"/preview"===e?"on":"",onClick:()=>d(!o),onMouseEnter:()=>g(!0),onMouseLeave:()=>g(!1),children:[(0,l.jsx)(s(),{href:"/preview",children:"PREVIEW"}),(0,l.jsx)(n.E.ul,{className:"sub_menu ".concat(i<1e3||m?"show":""),children:(0,l.jsx)(n.E.li,{variants:p.Z,initial:"hide",animate:i<1e3||m?"show":"hide",custom:.2,className:"/chart"===e?"on":"",children:(0,l.jsx)(s(),{href:"/preview/chart",children:"Chart"})})})]})]})]})]})})}},2566:function(e,i,t){"use strict";t.d(i,{Z:function(){return s}});var l=t(2265),a=t(8143),o=t.n(a);function s(e){(0,l.useLayoutEffect)(()=>{let i=o()(()=>{let i=window.innerWidth;e(i)},300);return window.addEventListener("resize",i),()=>{window.removeEventListener("resize",i)}})}},3347:function(e,i,t){"use strict";t.d(i,{A0:function(){return p},R0:function(){return n},Vr:function(){return o}});var l=t(1201),a=t(2173);let o=(0,l.hg)("chart/getCountries",async(e,i)=>{try{let e=await a.Z.get("https://restcountries.com/v3.1/all?fields=translations,population");return i.fulfillWithValue(e.data)}catch(e){return i.rejectWithValue(e)}}),s=(0,l.oM)({name:"chart",initialState:{countries:[],selectCountries:[],total:0,isLoading:"false",error:null},reducers:{setData:(e,i)=>({...e,countries:i.payload}),sortData:(e,i)=>({...e,selectCountries:i.payload})},extraReducers:e=>{e.addCase(o.pending,e=>{e.isLoading="pending"}).addCase(o.fulfilled,(e,i)=>{e.isLoading="fulfilled",e.countries=i.payload,e.total=i.payload.length}).addCase(o.rejected,(e,i)=>{e.isLoading="rejected",e.error=i.error.message})}});s.name;let{setData:r,sortData:n}=s.actions,p=s.reducer},3336:function(e,i,t){"use strict";t.r(i),t.d(i,{default:function(){return d}});var l=t(7437),a=t(1201),o=t(5316),s=t(3347),r=t(3944);let n=(0,r.createLogger)(),p=(0,a.xC)({reducer:{searchReducer:o.fG,chartReducer:s.A0},middleware:e=>e().concat(n),devTools:!1});var c=t(3198);function d(e){let{children:i}=e;return(0,l.jsx)(c.zt,{store:p,children:i})}},5316:function(e,i,t){"use strict";t.d(i,{G:function(){return m},Mc:function(){return p},YA:function(){return d},ce:function(){return c},fG:function(){return g},q1:function(){return n}});var l=t(1201),a=t(5885);let o=e=>Math.ceil(e/12),s={keyword:"",result:a.v,totalPage:o(a.v.length),page:1,sliceList:a.v.slice(0,12)},r=(0,l.oM)({name:"search",initialState:s,reducers:{setKeyword:(e,i)=>({...e,keyword:i.payload}),searchList:e=>({...e,result:a.v.filter(i=>""===e.keyword||i.title.toLowerCase().includes(e.keyword)?i:null)}),setTotalPage:e=>({...e,totalPage:o(e.result.length)}),setPage:(e,i)=>({...e,page:i.payload}),setSliceList:e=>({...e,sliceList:1===e.totalPage?e.result.slice(12*(e.page-1)):e.result.slice(12*(e.page-1),12*(e.page-1)+12)})}});r.name;let{setKeyword:n,searchList:p,setTotalPage:c,setPage:d,setSliceList:m}=r.actions,g=r.reducer},4102:function(e,i,t){"use strict";t.d(i,{Z:function(){return l}});let l={show:e=>({opacity:1,transition:{delay:.2*e,duration:1}}),hide:{opacity:0,transition:{duration:.1}}}},8998:function(){},5885:function(e){"use strict";e.exports=JSON.parse('{"v":[{"id":"1","title":"대성마이맥 LIVE Class - KTH","view":"images/pofol/pofol_img40.png","alt":"대성마이맥 LIVE Class","skills":["Google Chart","fullcalendar.js","반응형"],"participation":"웹퍼블리싱 100%","url":{"sample":"http://peelwork.com/liveClass.html"},"desc":"대성마이맥 라이브 클래스는 비대면 수강 플랫폼입니다. 학생들이 수강하기 좋은 PC와 테블릿까지 가능한 반응형 사이트로 만들었습니다."},{"id":"2","title":"클릭엔 - 가비아","view":"images/pofol/pofol_img39.png","alt":"가비아 클릭엔","skills":["CSS3(flex)","반응형"],"participation":"웹퍼블리싱 50%","url":{"service":"https://www.clickn.co.kr/template"}},{"id":"3","title":"퍼스트몰 - 라이브","view":"images/pofol/pofol_img38.png","alt":"퍼스트몰 - 라이브","skills":["CSS3(flex, gradient..)","SCSS"],"participation":"웹 퍼블리싱(하이브리드 앱) 100%","url":{"service":"https://play.google.com/store/apps/details?id=kr.firstmall.live"},"desc":""},{"id":"4","title":"이셀러스 - 메세징서비스","view":"images/pofol/pofol_img37.png","alt":"이셀러스 - 메세징서비스","skills":["SCSS"],"participation":"웹퍼블리싱 100%","url":{"service":"https://www.esellers.co.kr/introduce/sms","sample":"http://peelwork.com/esMsgIndex.html"},"desc":""},{"id":"5","title":"퍼스트몰 - 디자인 32","view":"images/pofol/pofol_img36.png","alt":"퍼스트몰 디자인 32","skills":["반응형","css animation"],"participation":"웹퍼블리싱 100%","url":{"service":"http://responsive-sample32.firstmall.kr"},"desc":""},{"id":"6","title":"퍼스트몰 - 디자인 31","view":"images/pofol/pofol_img35.png","alt":"퍼스트몰 디자인 31","skills":["반응형","css animation"],"participation":"웹퍼블리싱 100%","url":{"service":"http://responsive-sample31.firstmall.kr"},"desc":""},{"id":"7","title":"퍼스트몰 - 디자인 30","view":"images/pofol/pofol_img34.png","alt":"퍼스트몰 디자인 30","skills":["반응형","css animation"],"participation":"웹퍼블리싱 100%","url":{"service":"http://responsive-sample30.firstmall.kr"},"desc":""},{"id":"8","title":"이셀러스","view":"images/pofol/pofol_img33.png","alt":"이셀러스 화면","skills":["반응형","css animation"],"participation":"웹퍼블리싱 70%","url":{"service":"https://www.esellers.co.kr"},"desc":""},{"id":"9","title":"가비아CNS 다이애드WAVE","view":"images/pofol/pofol_img32.png","alt":"가비아CNS 다이애드WAVE 화면","skills":["amchart.js","fullcalendar.js","ES6","Babel","SCSS"],"participation":"웹디자인/퍼블리싱 100%","url":{"service":"https://wave.diad.co.kr","sample":""},"desc":""},{"id":"10","title":"가비아CNS 다이애드PRO","view":"images/pofol/pofol_img31.png","alt":"가비아CNS 다이애드PRO 화면","skills":["Vue.js","grid js 개발","Vanilla js","SCSS"],"participation":"웹디자인/퍼블리싱 100%","url":{"service":"https://service.diad.co.kr","sample":""},"desc":""},{"id":"11","title":"가비아CNS 마케팅센터 모바일","view":"images/pofol/pofol_img29.png","alt":"가비아CNS 마케팅센터 다이애드 모바일 화면","skills":["Vue.js","SCSS"],"participation":"웹디자인/퍼블리싱 100%","url":{"service":"https://m.diad.co.kr","sample":""},"desc":""},{"id":"12","title":"가비아CNS 마케팅센터","view":"images/pofol/pofol_img28.png","alt":"가비아CNS 마케팅센터 다이애드 화면","skills":["SCSS"],"participation":"웹디자인/퍼블리싱 100%","url":{"service":"https://diad.co.kr","sample":""},"desc":""},{"id":"13","title":"가비아CNS 마케팅센터 Admin","view":"images/pofol/pofol_img30.png","alt":"가비아CNS 마케팅센터 Admin 화면","skills":["SCSS"],"participation":"웹디자인/퍼블리싱 100%","url":{"service":"https://admin.diad.co.kr","sample":""},"desc":""},{"id":"14","title":"이셀러스 미니샵 - 트렌디형","view":"images/pofol/pofol_img27.png","alt":"이셀러스 미니샵 - 트렌디형","skills":["SCSS","css animation"],"participation":"웹퍼블리싱 100%","url":{"service":"","sample":"http://peelwork.com/minishopTrendy.html"},"desc":""},{"id":"15","title":"이셀러스 미니샵 - 스토리형","view":"images/pofol/pofol_img26.png","alt":"이셀러스 미니샵 - 스토리형","skills":["SCSS","css animation"],"participation":"웹퍼블리싱 100%","url":{"service":"http://peelwork.com/minishopStory.html","sample":""},"desc":""},{"id":"16","title":"이셀러스 미니샵 - 심플형","view":"images/pofol/pofol_img25.png","alt":"이셀러스 미니샵 - 심플형","skills":["SCSS","css animation"],"participation":"웹퍼블리싱 100%","url":{"service":"","sample":"http://peelwork.com/minishopSimple.html"},"desc":""},{"id":"17","title":"ADCORE 2017 - KTH","view":"images/pofol/pofol_img24.png","alt":"ADCORE 2017 화면","skills":["css animation"],"participation":"웹디자인/웹퍼블리싱 100%","url":{"service":"","sample":"http://peelwork.com/adcore2017.html"},"desc":""},{"id":"18","title":"MEGALINE","view":"images/pofol/pofol_img23.png","alt":"MEGALINE 화면","participation":"웹퍼블리싱 100%","url":{"service":"http://tpimegaline.astroweb.co.kr/","sample":""},"desc":""},{"id":"19","title":"BYPAIR APP","view":"images/pofol/pofol_img20.png","alt":"BYPAIR APP 화면","participation":"웹 퍼블리싱(하이브리드 앱) 100%","url":{"service":"http://www.bypair.com/download","sample":""},"desc":""},{"id":"20","title":"DB-Stars","view":"images/pofol/pofol_img13.png","alt":"DB-Stars 화면","skills":["반응형"],"participation":"웹디자인/웹퍼블리싱 100%","url":{"service":"https://www.dbstars.or.kr/dbstars/main.star","sample":""},"desc":""},{"id":"21","title":"SolGuest Global","view":"images/pofol/pofol_img22.png","alt":"SolGuest Global PC 화면","participation":"웹퍼블리싱 100%","url":{"service":"http://global.solguest.com/html","sample":""},"desc":""},{"id":"22","title":"SolGuest Global 모바일","view":"images/pofol/pofol_img21.png","alt":"SolGuest Global 모바일 화면","participation":"웹퍼블리싱 100%","url":{"service":"http://global.solguest.com/m","sample":""},"desc":""},{"id":"23","title":"Booketing","view":"images/pofol/pofol_img19.png","alt":"Booketing 화면","participation":"웹디자인/웹퍼블리싱 100%","url":{"service":"http://www.booketing.co.kr","sample":""},"desc":""},{"id":"24","title":"데이터스토어 2016 모바일","view":"images/pofol/pofol_img18.png","alt":"데이터스토어 2016 모바일 화면","participation":"웹디자인/웹퍼블리싱 100%","url":{"service":"https://www.datastore.or.kr/m/main.do","sample":""},"desc":""},{"id":"25","title":"데이터스토어 2016","view":"images/pofol/pofol_img17.png","alt":"데이터스토어 2016 화면","skills":["IE8"],"participation":"웹디자인 100% / 웹퍼블리싱 100%","url":{"service":"https://www.datastore.or.kr/intro.do","sample":""}},{"id":"26","title":"북틀 APP","view":"images/pofol/pofol_img16.png","alt":"북틀 APP 화면","participation":"앱디자인 30%","url":{"service":"https://play.google.com/store/apps/details?id=com.bdb.booklearn_sds","sample":""}},{"id":"27","title":"ShiftNovel","view":"images/pofol/pofol_img15.png","alt":"ShiftNovel 화면","participation":"웹디자인 100%","url":{"service":"","sample":""}},{"id":"28","title":"Clinic&Trip","view":"images/pofol/pofol_img14.png","alt":"Clinic&Trip 화면","participation":"웹디자인 100% / 웹퍼블리싱 100%","url":{"service":"http://clinicntrip.com/index","sample":""}},{"id":"29","title":"ADCORE 2016 - KTH","view":"images/pofol/pofol_img12.png","alt":"ADCORE 2016 화면","participation":"웹디자인 100% / 웹퍼블리싱 100%","url":{"service":"","sample":"http://peelwork.com/adcore2016.html"}},{"id":"30","title":"CLiP 서비스 통계 - KTH","view":"images/pofol/pofol_img10.png","alt":"CLiP 서비스 통계 화면","participation":"웹디자인 100%","url":{"service":"","sample":""}},{"id":"31","title":"데이터스토어 2015 모바일","view":"images/pofol/pofol_img11.png","alt":"데이터스토어 2015 모바일 화면","participation":"웹디자인 100% / 웹퍼블리싱 100%","url":{"service":"","sample":""}},{"id":"32","title":"데이터스토어 2015","view":"images/pofol/pofol_img09.png","alt":"데이터스토어 2015 화면","skills":["IE8"],"participation":"웹디자인 100% / 웹퍼블리싱 100%","url":{"service":"","sample":""}},{"id":"33","title":"ADCORE 2015 - KTH","view":"images/pofol/pofol_img08.png","alt":"ADCORE 2015 화면","participation":"웹디자인 100% / 웹퍼블리싱 100%","url":{"service":"","sample":""}},{"id":"34","title":"KKA Portfolio 2015","view":"images/pofol/pofol_img07.png","alt":"KKA Portfolio 2015 화면","participation":"웹디자인 100% / 웹퍼블리싱 100%","url":{"service":"http://kkaparal.dothome.co.kr","sample":""}},{"id":"35","title":"엄마맘 어린이집","view":"images/pofol/pofol_img06.png","alt":"엄마맘 어린이집 화면","participation":"웹디자인 100% / 웹퍼블리싱 100%","url":{"service":"","sample":""}},{"id":"36","title":"KKA Portfolio 2014","view":"images/pofol/pofol_img05.png","alt":"KKA Portfolio 2014 화면","participation":"웹디자인 100% / 웹퍼블리싱 100%","url":{"service":"http://kkapofol.dothome.co.kr","sample":""}},{"id":"37","title":"1973JJ","view":"images/pofol/pofol_img04.png","alt":"1973JJ 화면","participation":"웹디자인 100% / 웹퍼블리싱 100%","url":{"service":"http://www.1973jj.co.kr/shop/main/index.php","sample":""}},{"id":"38","title":"삼성전자 온라인 종합몰 협력사","view":"images/pofol/pofol_img03.png","alt":"삼성전자 온라인 종합몰 협력사 화면","participation":"웹디자인 100% / 웹퍼블리싱 100%","url":{"service":"http://www.hyundaihmall.com/front/dpa/searchSpexSectItem.do?sectId=208994","sample":""}},{"id":"39","title":"데코르떼","view":"images/pofol/pofol_img02.png","alt":"데코르떼 화면","participation":"웹디자인 100%","url":{"service":"http://www.decortepop.co.kr","sample":""}},{"id":"40","title":"시보니","view":"images/pofol/pofol_img01.png","alt":"시보니 화면","participation":"웹디자인 100%","url":{"service":"http://www.siboni.co.kr","sample":""}}]}')}},function(e){e.O(0,[431,396,73,963,719,971,472,744],function(){return e(e.s=190)}),_N_E=e.O()}]);