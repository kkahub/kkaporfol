(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[919],{6960:function(t,e,n){Promise.resolve().then(n.bind(n,2513))},2513:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return x}});var a=n(7437),i=n(2265),s=n(3614),r=n(629),o=n(7138),l=n(3605),c=n(9125),u=n(8646),d=n(4063),h=n(4004);function p(){let t=(0,u._)(["\n  opacity: 0;\n  position: absolute;\n  padding: 10px;\n  border-radius: 3px;\n  background: rgba(0, 0, 0, 0.6);\n  font-size: 14px;\n\n  p {\n    white-space: nowrap;\n    color: #fff;\n    text-align: left;\n  }\n"]);return p=function(){return t},t}let m=n(5969).ZP.div(p());function f(t){let e={top:10,bottom:30,left:60},[n,o]=(0,i.useState)(window.innerWidth),[u,p]=(0,i.useState)(n>1e3?800:.9*n),[f,x]=(0,i.useState)(n>1e3?500:350);(0,i.useLayoutEffect)(()=>{o(window.innerWidth)},[]),(0,h.Z)(t=>{o(t)});let{data:g}=t,[b,j]=(0,i.useState)(g),w=(0,c.T)(),y=(0,c.C)(t=>t.chartReducer.selectCountries);(0,i.useEffect)(()=>{w((0,l.R0)(b)),j(b)},[w,b]);let _=(0,i.useRef)(null),v=(0,i.useRef)(null),k=d.Fp7(b,t=>t.population),E=d.BYU().domain([0,k]).range([.3,1]),N=(0,i.useCallback)(()=>{let t=d.Ys(_.current),a=d.tiA().domain(b.map(t=>t.translations.kor.common)).range([e.left,u]).padding(.2),i=d.BYU().domain([0,k]).range([f-e.top-e.bottom,e.top]).nice(),s=d.LLu(a).tickSizeOuter(0);t.select(".x_axis").attr("transform","translate(0, ".concat(f-e.bottom,")")).call(s),t.select(".x_axis").selectAll(".tick").attr("width",a.bandwidth());let r=d.y4O(i).ticks(b.length).tickSizeOuter(0);t.select(".y_axis").attr("transform","translate(".concat(e.left,", ").concat(e.top,")")).call(r);let o=d.Ys(v.current);t.selectAll(".bar_group").remove(),t.append("g").attr("class","bar_group").selectAll("rect").data(b).enter().append("rect").attr("class","bar").attr("x",t=>a(t.translations.kor.common)).attr("y",t=>f-e.bottom-e.top-i(t.population)>2?i(t.population)+e.top:i(t.population)+e.top-2).attr("width",a.bandwidth()).attr("height",t=>{let n=f-e.bottom-e.top-i(t.population);return n>2?n:2}).style("fill",t=>d.XwM(E(t.population))).on("mouseenter",(t,e)=>{n<1e3||(o.html("<p>국가 : ".concat(e.translations.kor.common,"</p><p>인구수 : ").concat(e.population.toLocaleString(),"명</p>")).transition().duration(200).style("opacity",1).style("left","".concat(a(e.translations.kor.common)+a.bandwidth()+5,"px")).style("top","".concat(i(e.population),"px")),d.Ys(t.target).transition().duration(200).style("opacity",.6))}).on("mouseleave",t=>{n<1e3||(o.style("opacity",0),d.Ys(t.target).transition().duration(50).style("opacity",1))}).transition().duration(500)},[b,E,k,n,f,u,e.bottom,e.left,e.top]);return(0,i.useEffect)(()=>{p(n>1e3?800:.9*n),x(n>1e3?500:350),N()},[n,N]),(0,a.jsxs)(s.E.div,{className:"barchart_group",variants:r.Z,initial:"hide",animate:"show",custom:1,children:[(0,a.jsxs)("div",{className:"barchart",children:[(0,a.jsxs)("svg",{ref:_,width:u,height:f,children:[(0,a.jsx)("g",{className:"x_axis"}),(0,a.jsx)("g",{className:"y_axis"}),(0,a.jsx)("g",{className:"bar_group"})]}),n>1e3&&(0,a.jsx)(m,{ref:v})]}),(0,a.jsx)("ul",{className:"bar_legend",children:y.length>0&&y.map(t=>(0,a.jsxs)("li",{children:[(0,a.jsx)("svg",{className:"color_table",width:14,height:14,children:(0,a.jsx)("rect",{className:"color_table_rect",width:14,height:14,fill:d.XwM(E(t.population))})}),(0,a.jsx)("p",{className:"countries_name",children:t.translations.kor.common})]},t.population))})]})}function x(){let t=(0,c.T)();(0,i.useEffect)(()=>{t((0,l.Vr)())},[t]);let e=[],n=[],u=(0,c.C)(t=>t.chartReducer.total),d=(0,c.C)(t=>{for(;e.length<7;){let t=Math.floor(Math.random()*u);e.push(t)}return n.length<7&&e.map(e=>n.push(t.chartReducer.countries[e])),n});return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(s.E.h2,{className:"title",variants:r.Z,initial:"hide",animate:"show",custom:.2,children:"CHART"}),(0,a.jsxs)(s.E.p,{className:"title_desc",variants:r.Z,initial:"hide",animate:"show",custom:.4,children:[u,"개의 국가 중에 ",7,"개 국가를 랜덤으로 데이터를 불러와 인구 수를 그래프로 그렸습니다.",(0,a.jsx)("br",{}),"그래프 바에 마우스를 올리면 정보가 표시됩니다."]}),(0,a.jsxs)(s.E.div,{className:"title_desc skill_point",variants:r.Z,initial:"hide",animate:"show",custom:.4,children:[(0,a.jsx)("p",{children:(0,a.jsx)("b",{children:"핵심 기술"})}),(0,a.jsxs)(s.E.ul,{className:"pill_group",variants:r.Z,initial:"hide",animate:"show",custom:.6,children:[(0,a.jsx)(s.E.li,{children:"D3.js"}),(0,a.jsx)(s.E.li,{children:"SVG"}),(0,a.jsx)(s.E.li,{children:"반응형"}),(0,a.jsx)(s.E.li,{children:"styled-components"}),(0,a.jsx)(s.E.li,{children:"Redux"}),(0,a.jsx)(s.E.li,{children:"Redux-Toolkit"}),(0,a.jsx)(s.E.li,{children:"Typescript"})]})]}),(0,a.jsxs)(s.E.p,{className:"title_desc",variants:r.Z,initial:"hide",animate:"show",custom:.6,children:[(0,a.jsx)("b",{children:"데이터 출저"}),(0,a.jsx)(o.default,{href:"https://restcountries.com",target:"_blank",rel:"noopener noreferrer",passHref:!0,className:"link",children:"https://restcountries.com"})]}),(0,a.jsxs)(s.E.p,{className:"title_desc",variants:r.Z,initial:"hide",animate:"show",custom:.6,children:[(0,a.jsx)("b",{children:"Github"}),(0,a.jsx)(o.default,{href:"https://github.com/kkahub/kkaporfol/blob/main/src/components/chart/bar.tsx",target:"_blank",rel:"noopener noreferrer",passHref:!0,className:"link",children:"코드 소스 보기"})]}),void 0!==d[0]&&(0,a.jsx)(f,{data:d})]})}},4004:function(t,e,n){"use strict";n.d(e,{Z:function(){return r}});var a=n(2265),i=n(2170),s=n.n(i);function r(t){(0,a.useLayoutEffect)(()=>{let e=s()(()=>{t(window.innerWidth)},300);return window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}})}},3605:function(t,e,n){"use strict";n.d(e,{A0:function(){return c},R0:function(){return l},Vr:function(){return s}});var a=n(1613),i=n(2126);let s=(0,a.hg)("chart/getCountries",async(t,e)=>{try{let t=await i.Z.get("https://restcountries.com/v3.1/all?fields=translations,population");return e.fulfillWithValue(t.data)}catch(t){return e.rejectWithValue(t)}}),r=(0,a.oM)({name:"chart",initialState:{countries:[],selectCountries:[],total:0,isLoading:"false",error:null},reducers:{setData:(t,e)=>({...t,countries:e.payload}),sortData:(t,e)=>({...t,selectCountries:e.payload})},extraReducers:t=>{t.addCase(s.pending,t=>{t.isLoading="pending"}).addCase(s.fulfilled,(t,e)=>{t.isLoading="fulfilled",t.countries=e.payload,t.total=e.payload.length}).addCase(s.rejected,(t,e)=>{t.isLoading="rejected",t.error=e.error.message})}});r.name;let{setData:o,sortData:l}=r.actions,c=r.reducer},9125:function(t,e,n){"use strict";n.d(e,{C:function(){return s},T:function(){return i}});var a=n(8323);let i=()=>(0,a.I0)(),s=a.v9},629:function(t,e,n){"use strict";n.d(e,{Z:function(){return a}});let a={show:t=>({opacity:1,transition:{delay:.2*t,duration:1}}),hide:{opacity:0,transition:{duration:.1}}}}},function(t){t.O(0,[287,138,156,0,617,971,23,744],function(){return t(t.s=6960)}),_N_E=t.O()}]);