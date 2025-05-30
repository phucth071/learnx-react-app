import{Q as j,U as w,aN as P,aO as b,H as k,a0 as h,W as $,r as g,Z as D,j as d,z as q,a1 as R,o as A,ah as O,B as U}from"./index-QTjKD8RV.js";import{x as N}from"./CreateCurriculumForm-BE8yqL4m.js";import{u as T}from"./memoize-one.esm-KAxl8jEm.js";import"./Add-p17NmaF-.js";import"./Quiz-2LTpQpdq.js";import"./Grid-DoYxYiIY.js";import"./InputAdornment-zEGG7Nfy.js";function F(s){return j("MuiCircularProgress",s)}w("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);const l=44,v=P`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`,C=P`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`,L=typeof v!="string"?b`
        animation: ${v} 1.4s linear infinite;
      `:null,z=typeof C!="string"?b`
        animation: ${C} 1.4s ease-in-out infinite;
      `:null,B=s=>{const{classes:e,variant:r,color:t,disableShrink:a}=s,c={root:["root",r,`color${h(t)}`],svg:["svg"],circle:["circle",`circle${h(r)}`,a&&"circleDisableShrink"]};return R(c,F,e)},H=k("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(s,e)=>{const{ownerState:r}=s;return[e.root,e[r.variant],e[`color${h(r.color)}`]]}})($(({theme:s})=>({display:"inline-block",variants:[{props:{variant:"determinate"},style:{transition:s.transitions.create("transform")}},{props:{variant:"indeterminate"},style:L||{animation:`${v} 1.4s linear infinite`}},...Object.entries(s.palette).filter(([,e])=>e&&e.main).map(([e])=>({props:{color:e},style:{color:(s.vars||s).palette[e].main}}))]}))),_=k("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(s,e)=>e.svg})({display:"block"}),G=k("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(s,e)=>{const{ownerState:r}=s;return[e.circle,e[`circle${h(r.variant)}`],r.disableShrink&&e.circleDisableShrink]}})($(({theme:s})=>({stroke:"currentColor",variants:[{props:{variant:"determinate"},style:{transition:s.transitions.create("stroke-dashoffset")}},{props:{variant:"indeterminate"},style:{strokeDasharray:"80px, 200px",strokeDashoffset:0}},{props:({ownerState:e})=>e.variant==="indeterminate"&&!e.disableShrink,style:z||{animation:`${C} 1.4s ease-in-out infinite`}}]}))),K=g.forwardRef(function(e,r){const t=D({props:e,name:"MuiCircularProgress"}),{className:a,color:c="primary",disableShrink:p=!1,size:n=40,style:m,thickness:o=3.6,value:i=0,variant:u="indeterminate",...E}=t,f={...t,color:c,disableShrink:p,size:n,thickness:o,value:i,variant:u},y=B(f),x={},S={},I={};if(u==="determinate"){const M=2*Math.PI*((l-o)/2);x.strokeDasharray=M.toFixed(3),I["aria-valuenow"]=Math.round(i),x.strokeDashoffset=`${((100-i)/100*M).toFixed(3)}px`,S.transform="rotate(-90deg)"}return d.jsx(H,{className:q(y.root,a),style:{width:n,height:n,...S,...m},ownerState:f,ref:r,role:"progressbar",...I,...E,children:d.jsx(_,{className:y.svg,ownerState:f,viewBox:`${l/2} ${l/2} ${l} ${l}`,children:d.jsx(G,{className:y.circle,style:x,ownerState:f,cx:l,cy:l,r:(l-o)/2,fill:"none",strokeWidth:o})})})});function Q(s){var c,p,n,m;let e;s.questionType==="SINGLE_CHOICE"?e="single":s.questionType==="MULTIPLE_CHOICE"?e="multiple":s.questionType==="TRUE_FALSE"?e="truefalse":e="fitb";const r=[...s.options].sort((o,i)=>o.seq-i.seq),t=r.map(o=>o.content);let a;if(e==="single"||e==="truefalse"){const o=(p=(c=s.answers)==null?void 0:c[0])==null?void 0:p.answerId;a=r.findIndex(u=>u.id.optionId===o)}else{const o=((n=s.answers)==null?void 0:n.map(i=>i.answerId))||[];a=r.map((i,u)=>o.includes(i.id.optionId)?u:-1).filter(i=>i!==-1)}return{id:s.id,type:e,content:s.content,answerContent:(m=s.answers)==null?void 0:m.map(o=>o.answerContent).join(", "),options:t,answer:a}}function W(s){return s.map(e=>{var r;return{...e,contents:((r=e.contents)==null?void 0:r.map(t=>t.type==="quiz"&&t.questions?{...t,questions:t.questions.map(Q)}:t))||[]}})}const re=()=>{const{courseId:s}=A(),{getModules:e}=T();localStorage.removeItem("courseInfo");const[r,t]=g.useState([]),[a,c]=g.useState(!0);return g.useEffect(()=>{(async()=>{c(!0);const n=await e(s);console.log("🚀 ~ fetchModules ~ res:",n),n.success&&t(W(n.modules)),c(!1)})()},[s]),a?d.jsx(O,{display:"flex",justifyContent:"center",mt:10,children:d.jsx(K,{})}):d.jsx(N,{isEdit:!0,initialModules:r,onSubmitSuccess:()=>{U.success("Cập nhật module thành công!"),window.history.back()}})};export{re as default};
