(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{5011:function(e,t,a){Promise.resolve().then(a.bind(a,6774))},6774:function(e,t,a){"use strict";a.r(t);var r=a(7437),n=a(2265),l=a(547),i=a(8267),o=a(265),s=a(8924),c=a(3618),d=a(2274);a(4123);var m=a(9816);a(895);let{Title:u,Paragraph:p}=l.default,x=[10,20,30],h=[5,5,5];function y(e,t){return Math.min(Math.max(e+Math.sqrt(-2*Math.log(Math.random()))*Math.sin(2*Math.PI*Math.random())*t,0),50)}t.default=()=>{let[e,t]=(0,n.useState)([]);(0,n.useEffect)(()=>{t(Array.from({length:3},(e,t)=>Array.from({length:10},()=>y(x[t],h[t]))))},[]);let a=[{title:"Arm",dataIndex:"arm",key:"arm"},...Array.from({length:10},(e,t)=>({title:"T".concat(t+1),dataIndex:"t".concat(t+1),key:"t".concat(t+1)}))],l=e.map((e,t)=>{let a={arm:"Arm ".concat(t+1)};return e.forEach((e,t)=>{a["t".concat(t+1)]=e.toFixed(2)}),a}),[f,v]=(0,n.useState)([,,,].fill(0)),[g,A]=(0,n.useState)([,,,].fill(0)),[j,M]=(0,n.useState)([,,,].fill(0)),w=e=>{let t=y(x[e],h[e]);console.log("Arm ".concat(e+1," Reward: ").concat(t)),v(a=>{let r=[...a];return r[e]+=t,r}),A(a=>{let r=[...a];return r[e]+=Math.pow(t,2),r}),M(t=>{let a=[...t];return a[e]+=1,a})},S=f.map((e,t)=>j[t]>0?e/j[t]:0);return(0,r.jsxs)("div",{className:"slot-machine-frame",style:{padding:"20px 300px"},children:[(0,r.jsx)(u,{level:1,style:{textAlign:"center"},children:"Multi-Armed Bandit"}),(0,r.jsx)(i.Z,{gutter:16,children:[,,,].fill(null).map((e,t)=>(0,r.jsx)(o.Z,{span:8,children:(0,r.jsxs)(s.ZP,{type:"primary",block:!0,className:"slot-button",onClick:()=>w(t),style:{marginBottom:"10px"},children:["Arm ",t+1]})},t))}),(0,r.jsxs)("div",{style:{marginTop:"20px"},children:[(0,r.jsx)(u,{level:2,children:"Statistics:"}),(0,r.jsx)("div",{style:{display:"flex",gap:"10px",overflowX:"auto"},children:f.map((e,t)=>(0,r.jsx)(c.Z,{title:"Arm ".concat(t+1),style:{flex:"0 0 auto",width:"300px"},children:(0,r.jsxs)(p,{children:[j[t]," pulls, Average reward: ",j[t]>0?(e/j[t]).toFixed(2):0]})},t))}),(0,r.jsx)("div",{style:{marginTop:"30px"},children:(0,r.jsx)(m.Z,{option:(()=>{let e=f.map((e,t)=>0===j[t]?0:Math.sqrt(g[t]/j[t]-Math.pow(S[t],2)));return{title:{text:"Mean Reward",left:"center"},tooltip:{trigger:"axis",formatter:e=>{let t="";return e.forEach(e=>{"Standard Deviation"===e.seriesName&&(t+="<div><strong>".concat(e.name,"</strong>: ").concat(e.value[1]," (Mean) \xb1 ").concat(e.value[2]," (Standard Deviation)</div>"))}),t}},xAxis:{type:"category",data:["Arm 1","Arm 2","Arm 3"]},yAxis:{type:"value",min:0,max:50},series:[{name:"Average Reward",type:"bar",data:S,itemStyle:{color:"#5470C6"},z:1},{name:"Standard Deviation",type:"custom",renderItem:(e,t)=>{let a=t.value(0),r=t.coord([a,t.value(1)+t.value(2)]),n=t.coord([a,t.value(1)-t.value(2)]),l=.1*t.size([1,0])[0],i=t.style({stroke:"#000",fill:"none"});return{type:"group",children:[{type:"line",shape:{x1:r[0],y1:r[1],x2:n[0],y2:n[1]},style:i},{type:"line",shape:{x1:r[0]-l,y1:r[1],x2:r[0]+l,y2:r[1]},style:i},{type:"line",shape:{x1:n[0]-l,y1:n[1],x2:n[0]+l,y2:n[1]},style:i}]}},data:S.map((t,a)=>[a,t,e[a]]),z:2}]}})()})})]}),(0,r.jsxs)("div",{style:{marginTop:"20px"},children:[(0,r.jsx)(u,{level:2,children:"Reward Matrix:"}),(0,r.jsx)(d.Z,{dataSource:l,columns:a,pagination:!1,bordered:!0})]})]})}},895:function(){}},function(e){e.O(0,[725,901,971,23,744],function(){return e(e.s=5011)}),_N_E=e.O()}]);