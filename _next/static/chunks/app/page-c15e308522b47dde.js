(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{5011:function(e,t,a){Promise.resolve().then(a.bind(a,6774))},6774:function(e,t,a){"use strict";a.r(t);var r=a(7437),l=a(2265),n=a(547),i=a(2007),s=a(8267),d=a(265),o=a(9108),c=a(8924),u=a(6487),p=a(4110),m=a(3650),x=a(1880),h=a(7185),f=a(1039),y=a(344);a(4123);var g=a(9816);a(895);let{Title:j,Paragraph:v}=n.default;function A(e,t){return Math.min(Math.max(e+Math.sqrt(-2*Math.log(Math.random()))*Math.sin(2*Math.PI*Math.random())*t,0),50)}let Z=(e,t)=>Math.random()*(t-e)+e,M=e=>{let t=[],a=0,r=0;for(;t.length<e;){let e=Z(10,40);t.push(e),e>a?(r=a,a=e):e>r&&(r=e)}let l=t.indexOf(a),n=t.indexOf(r);if(a-r<.5||a-r>1){let e=Z(.5,1);t[t.indexOf(a)]=r+e}let i=Array.from({length:e},()=>Math.floor(Z(1,10)));return i[l]=10,i[n]=10,{ExpectedRewards:t,variance:i}};t.default=()=>{let[e,t]=(0,l.useState)(3),[a,n]=(0,l.useState)(40),Z=(0,l.useRef)(e),S=(0,l.useRef)(a),[k,C]=(0,l.useState)([]),[w,b]=(0,l.useState)([]),[R,E]=(0,l.useState)([,,,].fill(0)),[B,P]=(0,l.useState)([,,,].fill(0)),[z,F]=(0,l.useState)([,,,].fill(0)),[N,_]=(0,l.useState)([,,,].fill(0).map(()=>Array(40).fill(0)).map((e,t)=>e.map((e,a)=>A(k[t],w[t])))),[I,O]=(0,l.useState)(0),[T,D]=(0,l.useState)(Array(40).fill(0)),[q,V]=(0,l.useState)(!1),[U,G]=i.ZP.useMessage(),[H,J]=(0,l.useState)([,,,].fill(1/0)),[K,L]=(0,l.useState)(Math.floor(Math.random()*e)),[Q,W]=(0,l.useState)(!1);(0,l.useEffect)(()=>{E(Array(e).fill(0)),P(Array(e).fill(0)),F(Array(e).fill(0));let{ExpectedRewards:t,variance:r}=M(e);C(t),b(r),_(Array(e).fill(0).map(()=>Array(a).fill(0)).map((e,a)=>e.map((e,l)=>A(t[a],r[a]))))},[e]),(0,l.useEffect)(()=>{D(Array(a).fill(0)),_(Array(e).fill(0).map(()=>Array(a).fill(0)).map((e,t)=>e.map((e,a)=>A(k[t],w[t]))))},[a]),(0,l.useEffect)(()=>{O(z.reduce((e,t)=>e+t,0));let e=R.map((e,t)=>(z[t]>0?e/z[t]:0)+(z[t]>0?5*Math.sqrt(2*Math.log(I+1)/z[t]):1/0));J(e);let t=Math.max(...e),a=e.map((e,a)=>e===t?a:-1).filter(e=>-1!==e);L(a[Math.floor(Math.random()*a.length)]),console.log(e)},[z]);let X=T.reduce((e,t)=>e+t,0).toFixed(2),Y=e=>{if(I>=a){U.open({type:"error",content:"已达到最大步数上限 ".concat(a,"，请点击“Clear output”清除。")});return}let t=N[e][I];D(e=>{let a=[...e];return a[I]=t,a}),E(a=>{let r=[...a];return r[e]+=t,r}),P(a=>{let r=[...a];return r[e]+=Math.pow(t,2),r}),F(t=>{let a=[...t];return a[e]+=1,a})},$=()=>{E(Array(e).fill(0)),P(Array(e).fill(0)),F(Array(e).fill(0)),D(Array(a).fill(0))},ee=k.map((e,t)=>{var a;return{key:t,arm:"Arm ".concat(t+1),expectedReward:e.toFixed(2),variance:(null===(a=w[t])||void 0===a?void 0:a.toFixed(2))||0}}),[et,ea]=(0,l.useState)(!1);return(0,r.jsxs)("div",{className:"slot-machine-frame",style:{padding:"20px 300px"},children:[G,(0,r.jsxs)("div",{children:[(0,r.jsx)(j,{level:1,style:{textAlign:"center"},children:"Multi-Armed Bandit"}),(0,r.jsxs)(s.Z,{gutter:16,justify:"center",children:[(0,r.jsx)(d.Z,{span:8,children:(0,r.jsx)(o.Z,{addonBefore:"设置 Arm 个数",defaultValue:e,onChange:e=>{Z.current=e},min:1,max:20})}),(0,r.jsx)(d.Z,{span:8,children:(0,r.jsx)(o.Z,{addonBefore:"设置最大 Step",defaultValue:a,onChange:e=>{S.current=e},min:1})})]}),(0,r.jsx)("div",{style:{marginBottom:"20px"}})," ",(0,r.jsxs)(s.Z,{gutter:16,justify:"center",align:"middle",children:[(0,r.jsx)(d.Z,{span:4,children:(0,r.jsx)(c.ZP,{type:"primary",size:"large",onClick:()=>{t(Z.current),n(S.current),$(),V(!0);let{ExpectedRewards:r,variance:l}=M(e);C(r),b(l),_(Array(e).fill(0).map(()=>Array(a).fill(0)).map((e,t)=>e.map((e,a)=>A(r[t],l[t])))),L(Math.floor(Math.random()*e))},children:q?"Restart game":"Start game"})}),(0,r.jsx)(d.Z,{span:4,children:(0,r.jsx)(c.ZP,{type:"primary",size:"large",onClick:$,disabled:!q,children:"Clear output"})}),(0,r.jsx)(d.Z,{span:4,children:(0,r.jsx)(c.ZP,{type:"primary",size:"large",onClick:()=>{ea(!0)},disabled:!q,children:"Show details"})}),(0,r.jsx)(d.Z,{span:4,children:(0,r.jsx)(u.Z,{onChange:e=>{W(e.target.checked)},children:"开启推荐"})})]}),(0,r.jsx)(p.Z,{}),(0,r.jsx)(s.Z,{gutter:16,children:Array(e).fill(null).map((e,t)=>(0,r.jsx)(d.Z,{span:8,children:(0,r.jsxs)(c.ZP,{type:"primary",block:!0,className:"slot-button",onClick:()=>Y(t),style:{marginBottom:"10px"},disabled:!q,children:["Arm ",t+1,t===K&&q&&Q&&(0,r.jsx)(m.Z,{color:"green",children:"UCB prefer"})]})},t))}),(0,r.jsxs)("div",{style:{marginTop:"20px"},children:[(0,r.jsx)(x.Z,{title:"Statistics",bordered:!0,items:[{key:"1",label:"Total steps",children:I},{key:"2",label:"Total reward",children:X}]}),(0,r.jsx)("div",{style:{marginBottom:"20px"}})," ",(0,r.jsx)(s.Z,{gutter:[16,16],children:R.map((e,t)=>(0,r.jsxs)(d.Z,{span:8,children:[" ",(0,r.jsx)(h.Z,{title:"Arm ".concat(t+1),children:(0,r.jsxs)(v,{children:[z[t]," pulls, Average reward: ",z[t]>0?(e/z[t]).toFixed(2):0]})})]},t))}),(0,r.jsx)("div",{style:{marginTop:"30px"},children:(0,r.jsx)(g.Z,{option:(()=>{let t=R.map((e,t)=>z[t]>0?e/z[t]:0),a=R.map((e,a)=>0===z[a]?0:Math.sqrt(B[a]/z[a]-Math.pow(t[a],2)));return{title:{text:"Mean Reward",left:"center"},tooltip:{trigger:"axis",formatter:e=>{let t="";return e.forEach(e=>{"Standard Deviation"===e.seriesName&&(t+="<div><strong>".concat(e.name,"</strong>: ").concat(e.value[1].toFixed(2)," (Mean) \xb1 ").concat(e.value[2].toFixed(2)," (Standard Deviation)</div>"))}),t}},xAxis:{type:"category",data:Array.from({length:e},(e,t)=>"Arm".concat(t+1))},yAxis:{type:"value",min:0,max:50},series:[{name:"Average Reward",type:"bar",data:t,itemStyle:{color:"#5470C6"},z:1},{name:"Standard Deviation",type:"custom",renderItem:(e,t)=>{let a=t.value(0),r=t.coord([a,t.value(1)+t.value(2)]),l=t.coord([a,t.value(1)-t.value(2)]),n=.1*t.size([1,0])[0],i=t.style({stroke:"#000",fill:"none"});return{type:"group",children:[{type:"line",shape:{x1:r[0],y1:r[1],x2:l[0],y2:l[1]},style:i},{type:"line",shape:{x1:r[0]-n,y1:r[1],x2:r[0]+n,y2:r[1]},style:i},{type:"line",shape:{x1:l[0]-n,y1:l[1],x2:l[0]+n,y2:l[1]},style:i}]}},data:t.map((e,t)=>[t,e,a[t]]),z:2}]}})()})})]})]}),(0,r.jsx)(f.Z,{title:"Details",onClose:()=>{ea(!1)},open:et,children:(0,r.jsx)(y.Z,{columns:[{title:"Arm",dataIndex:"arm",key:"arm"},{title:"Expected Reward",dataIndex:"expectedReward",key:"expectedReward"},{title:"Variance",dataIndex:"variance",key:"variance"}],dataSource:ee,pagination:!1,style:{marginTop:"20px"}})})]})}},895:function(){}},function(e){e.O(0,[725,147,971,23,744],function(){return e(e.s=5011)}),_N_E=e.O()}]);