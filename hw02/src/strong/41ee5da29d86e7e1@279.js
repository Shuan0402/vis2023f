function _1(md){return(
md`# HW2 Stong baseline`
)}

function _data(FileAttachment){return(
FileAttachment("data.json").json()
)}

function _cCounts(){return(
[]
)}

function _constellationNames(){return(
["牡羊座","金牛座","雙子座","巨蟹座","獅子座","處女座","天秤座","天蠍座","射手座","摩羯座","水瓶座","雙魚座"]
)}

function _5(cCounts,constellationNames,data)
{
  cCounts.length = 0;
  for (var i=0; i<=11; i++) {  
    cCounts.push({Constellation:constellationNames[i], gender:"男", count:0}); 
    cCounts.push({Constellation:constellationNames[i], gender:"女", count:0});
  }
  data.forEach (x=> {
    var i = (x.Constellation-0)*2 + (x.Gender== "女" ? 0 : 1); 
    cCounts[i].count++;
  })
  
  return cCounts
}


function _plot2(Inputs){return(
Inputs.form({
	mt:  Inputs.range([0, 100], {label: "marginTop", step: 1}),
	mr:  Inputs.range([0, 100], {label: "marginRight", step: 1}),
	mb:  Inputs.range([0, 100], {label: "marginBottom", step: 1}),
	ml:  Inputs.range([0, 100], {label: "marginLeft", step: 1}),
})
)}

function _7(Plot,plot2,cCounts){return(
Plot.plot({
  marginTop: plot2.mt,
  marginRight: plot2.mr,
  marginBottom: plot2.mb,
  marginLeft: plot2.ml,
  
  grid: true,
  y: {label: "count"},
  marks: [
    Plot.ruleY([0]),
    Plot.barY(cCounts, {x: "Constellation", y: "count", tip: true , fill:"gender"}),
  ]
})
)}

function _plot1(Inputs){return(
Inputs.form({
	mt:  Inputs.range([0, 100], {label: "marginTop", step: 1}),
	mr:  Inputs.range([0, 100], {label: "marginRight", step: 1}),
	mb:  Inputs.range([0, 100], {label: "marginBottom", step: 1}),
	ml:  Inputs.range([0, 100], {label: "marginLeft", step: 1}),
})
)}

function _9(Plot,plot1,data){return(
Plot.plot({  
	marginTop: plot1.mt, 
	marginRight: plot1.mr, 
	marginBottom: plot1.mb, 
	marginLeft: plot1.ml,
  x: {tickSpacing: 40},
	y: {grid: true, label: "count"},  
	marks: [    
		Plot.rectY(data, Plot.binX({y:"count"}, { x:"Constellation", interval:1, fill:"Gender", tip: true })),    
		Plot.gridY({ interval: 1, stroke: "white", strokeOpacity: 0.5 })
	 ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data.json", {url: new URL("../data.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("cCounts")).define("cCounts", _cCounts);
  main.variable(observer("constellationNames")).define("constellationNames", _constellationNames);
  main.variable(observer()).define(["cCounts","constellationNames","data"], _5);
  main.variable(observer("viewof plot2")).define("viewof plot2", ["Inputs"], _plot2);
  main.variable(observer("plot2")).define("plot2", ["Generators", "viewof plot2"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","plot2","cCounts"], _7);
  main.variable(observer("viewof plot1")).define("viewof plot1", ["Inputs"], _plot1);
  main.variable(observer("plot1")).define("plot1", ["Generators", "viewof plot1"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","plot1","data"], _9);
  return main;
}
