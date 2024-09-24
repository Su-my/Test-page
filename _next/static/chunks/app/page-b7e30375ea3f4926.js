(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{5011:function(e,t,a){Promise.resolve().then(a.bind(a,6774))},6774:function(e,t,a){"use strict";a.r(t);var r=a(7437),l=a(2265),i=a(547),n=a(2007),s=a(8267),o=a(265),d=a(8924),c=a(4110),p=a(3618),u=a(5276);a(4123);var x=a(9816);a(895);let{Title:m,Paragraph:y}=i.default,h=[10,20,30],f=[5,5,5];t.default=()=>{let[e,t]=(0,l.useState)([,,,].fill(0)),[a,i]=(0,l.useState)([,,,].fill(0)),[v,g]=(0,l.useState)([,,,].fill(0)),[j,A]=(0,l.useState)([,,,].fill(0).map(()=>Array(30).fill(0))),w=v.reduce((e,t)=>e+t,0),[M,S]=(0,l.useState)(Array(30).fill(0)),[k,Z]=n.ZP.useMessage(),C=Array.from({length:w},(e,t)=>({key:t+1,step:(t+1).toString(),reward:M[t].toFixed(2)||0})),b=M.reduce((e,t)=>e+t,0).toFixed(2);C.push({key:w+1,step:"Total",reward:b});let N=e=>{if(w>=30){k.open({type:"error",content:"已达到最大步数上限 ".concat(30,"，请点击“Clear output”清除。")});return}let a=j[e][w];S(e=>{let t=[...e];return t[w]=a,t}),console.log("Arm ".concat(e+1," Reward: ").concat(a)),t(t=>{let r=[...t];return r[e]+=a,r}),i(t=>{let r=[...t];return r[e]+=Math.pow(a,2),r}),g(t=>{let a=[...t];return a[e]+=1,a})},P=()=>{t([,,,].fill(0)),i([,,,].fill(0)),g([,,,].fill(0)),S(Array(30).fill(0))};return(0,r.jsxs)("div",{className:"slot-machine-frame",style:{padding:"20px 300px",display:"flex",gap:"60px"},children:[(0,r.jsxs)("div",{children:[(0,r.jsx)(m,{level:1,style:{textAlign:"center"},children:"Multi-Armed Bandit"}),(0,r.jsxs)(s.Z,{gutter:16,justify:"center",children:[(0,r.jsx)(o.Z,{span:4,children:(0,r.jsx)(d.ZP,{type:"primary",size:"large",onClick:()=>{P(),A(j.map((e,t)=>e.map((e,a)=>Math.min(Math.max(h[t]+f[t]*(Math.sqrt(-2*Math.log(Math.random()))*Math.sin(2*Math.PI*Math.random())),0),50))))},children:"Start game"})}),(0,r.jsx)(o.Z,{span:4,children:(0,r.jsx)(d.ZP,{type:"primary",size:"large",onClick:P,children:"Clear output"})})]}),(0,r.jsx)(c.Z,{}),(0,r.jsx)(s.Z,{gutter:16,children:[,,,].fill(null).map((e,t)=>(0,r.jsx)(o.Z,{span:8,children:(0,r.jsxs)(d.ZP,{type:"primary",block:!0,className:"slot-button",onClick:()=>N(t),style:{marginBottom:"10px"},children:["Arm ",t+1]})},t))}),(0,r.jsxs)("div",{style:{marginTop:"20px"},children:[(0,r.jsx)(m,{level:2,children:"Statistics:"}),(0,r.jsx)("div",{style:{display:"flex",gap:"10px",overflowX:"auto"},children:e.map((e,t)=>(0,r.jsx)(p.Z,{title:"Arm ".concat(t+1),style:{flex:"0 0 auto",width:"300px"},children:(0,r.jsxs)(y,{children:[v[t]," pulls, Average reward: ",v[t]>0?(e/v[t]).toFixed(2):0]})},t))}),(0,r.jsx)("div",{style:{marginTop:"30px"},children:(0,r.jsx)(x.Z,{option:(()=>{let t=e.map((e,t)=>v[t]>0?e/v[t]:0),r=e.map((e,r)=>0===v[r]?0:Math.sqrt(a[r]/v[r]-Math.pow(t[r],2)));return{title:{text:"Mean Reward",left:"center"},tooltip:{trigger:"axis",formatter:e=>{let t="";return e.forEach(e=>{"Standard Deviation"===e.seriesName&&(t+="<div><strong>".concat(e.name,"</strong>: ").concat(e.value[1].toFixed(2)," (Mean) \xb1 ").concat(e.value[2].toFixed(2)," (Standard Deviation)</div>"))}),t}},xAxis:{type:"category",data:["Arm 1","Arm 2","Arm 3"]},yAxis:{type:"value",min:0,max:50},series:[{name:"Average Reward",type:"bar",data:t,itemStyle:{color:"#5470C6"},z:1},{name:"Standard Deviation",type:"custom",renderItem:(e,t)=>{let a=t.value(0),r=t.coord([a,t.value(1)+t.value(2)]),l=t.coord([a,t.value(1)-t.value(2)]),i=.1*t.size([1,0])[0],n=t.style({stroke:"#000",fill:"none"});return{type:"group",children:[{type:"line",shape:{x1:r[0],y1:r[1],x2:l[0],y2:l[1]},style:n},{type:"line",shape:{x1:r[0]-i,y1:r[1],x2:r[0]+i,y2:r[1]},style:n},{type:"line",shape:{x1:l[0]-i,y1:l[1],x2:l[0]+i,y2:l[1]},style:n}]}},data:t.map((e,t)=>[t,e,r[t]]),z:2}]}})()})})]})]}),(0,r.jsx)("div",{children:(0,r.jsx)(u.Z,{columns:[{title:"Step",dataIndex:"step",key:"step"},{title:"Reward",dataIndex:"reward",key:"reward"}],dataSource:C,pagination:!1})})]})}},895:function(){}},function(e){e.O(0,[725,69,971,23,744],function(){return e(e.s=5011)}),_N_E=e.O()}]);