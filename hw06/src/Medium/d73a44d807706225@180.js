function _1(md){return(
md`# HW6_Medium`
)}

function _selectedSeries(Inputs){return(
Inputs.checkbox(["artistVer", "artistPublic"], {label: "Choose datasets"})
)}

function _3(selectedSeries){return(
selectedSeries
)}

function _chart(data,selectedSeries,d3)
{
  // 定義圖形 
  const margin = {top: 20, right: 30, bottom: 30, left: 40};
  const width = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // 提取 series 的值存在 keys 裡
  const keys = Array.from(new Set(data.map(d => d.series)));
  
  // 根據選擇過濾數據
  const filteredData = data.filter(d => selectedSeries.includes(d.series));

  // 對過濾後的數據進行分組處理
  let grouped = Array.from(d3.group(filteredData, d => d.value), ([key, value]) => {
    return {value: key, ...Object.fromEntries(value.map(obj => [obj.series, obj.count]))};
  });

  // 定義堆疊方式並計算
  const stack = d3.stack().keys(keys);
  const series = stack(grouped);
  
  // 定義x軸的比例尺
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.value))
    .range([0, width])
    .padding(0.1);

  // 定義y軸的比例尺
  const yMax = d3.max(series, serie => d3.max(serie, d => d[1]));
  const yScale = d3.scaleLinear()
      .domain([0, yMax]).nice()
      .range([height, 0]);

  // 定義顏色的比例尺
  const colorScale = d3.scaleOrdinal()
    .domain(keys)
    .range(['#A8D8B9', '#FFDFE1']);

  // 創建SVG元素
  const svg = d3.create("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  // 在SVG中添加一個包含所有內容的g元素(對它進行一個平移變換，以便為接下來的元素提供一個留白的區域)
  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // 繪製每一個系列的柱子
  series.forEach((serie) => {
      let bars = g.append("g")
          .attr("fill", colorScale(serie.key))
          .selectAll("rect")
          .data(serie);
  
      bars.enter().append("rect")
          .attr("x", d => xScale(d.data.value))
          .attr("y", height)
          .attr("width", xScale.bandwidth())
          .attr("height", 0)
          //新增出過渡效果
          .transition() 
          .duration(1000)
          .attr("y", d => yScale(d[1]))
          .attr("height", d => yScale(d[0]) - yScale(d[1]));
  });

  // 繪製x軸
  g.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));

  // 繪製y軸
  g.append("g")
    .call(d3.axisLeft(yScale));

  return svg.node();
}


function _artistPublic(__query,FileAttachment,invalidation){return(
__query(FileAttachment("artistPublic.csv"),{from:{table:"artistPublic"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _artistVer(__query,FileAttachment,invalidation){return(
__query(FileAttachment("artistVer.csv"),{from:{table:"artistVer"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _artistVerKey(artistVer){return(
Object.keys(artistVer[0])[3]
)}

function _artistVerColumn(artistVer,artistVerKey){return(
artistVer.map(row => row[artistVerKey])
)}

function _artistVerValue(artistVerColumn){return(
Array.from(new Set(artistVerColumn)).sort()
)}

function _artistVerCounts(artistVerValue,artistVerColumn){return(
artistVerValue.map(val => ({
  value: val,
  count: artistVerColumn.filter(v => v === val).length
}))
)}

function _artistPublicKey(artistPublic){return(
Object.keys(artistPublic[0])[4]
)}

function _artistPublicColumn(artistPublic,artistPublicKey){return(
artistPublic.map(row => row[artistPublicKey])
)}

function _artistPublicValue(artistPublicColumn){return(
Array.from(new Set(artistPublicColumn)).sort()
)}

function _artistPublicCounts(artistPublicValue,artistPublicColumn){return(
artistPublicValue.map(val => ({
  value: val,
  count: artistPublicColumn.filter(v => v === val).length
}))
)}

function _data(artistVerCounts,artistPublicCounts){return(
artistVerCounts.flatMap((item, index) => ([
  {
    value: item.value,
    count: item.count,
    series: 'artistVer'
  },
  {
    value: item.value,
    count: artistPublicCounts[index].count,
    series: 'artistPublic'
  }
]))
)}

function _selectedSeries1(Inputs){return(
Inputs.checkbox(["artistVer", "artistPublic"], {label: "Choose datasets"})
)}

function _18(selectedSeries1){return(
selectedSeries1
)}

function _19(Plot,artistVerKey,data,selectedSeries1){return(
Plot.plot({
  height: 600,
  title: artistVerKey,
  x: {
    label: 'Value',
    domain: data.map(d => d.value),
    padding: 0.1
  },
  y: {
    label: 'Count',
    grid: true
  },
  color: {
    domain: ['artistVer', 'artistPublic'],
    range: ['#A8D8B9', '#FFDFE1'],
    legend: true
  },
  marks: [
    Plot.barY(data.filter(d => selectedSeries1.includes(d.series)), Plot.stackY({ 
      x: "value",
      y: "count",
      fill: "series",
      title: d => `${d.series}\nvalue: ${d.value}\ncount: ${d.count}`
    }))
  ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["artistVer.csv", {url: new URL("./files/363ea43eed3c6a6a6fed83d3e26ac23641da56f4f0689da720760208af84f1c3caff531322fc2ceeaf3924e4ff2f0ca4314a49adfe0e45701c6687fc36ee24d3.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["artistPublic.csv", {url: new URL("./files/41a9c6bfdf8907c7f19b5a52517012d51d11afcdf769218a6b5c1af5288c865ca2bf10f0fdac5144f8d3676054b833c736642053e880c85ec6123fb15744ae7f.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof selectedSeries")).define("viewof selectedSeries", ["Inputs"], _selectedSeries);
  main.variable(observer("selectedSeries")).define("selectedSeries", ["Generators", "viewof selectedSeries"], (G, _) => G.input(_));
  main.variable(observer()).define(["selectedSeries"], _3);
  main.variable(observer("viewof chart")).define("viewof chart", ["data","selectedSeries","d3"], _chart);
  main.variable(observer("chart")).define("chart", ["Generators", "viewof chart"], (G, _) => G.input(_));
  main.variable(observer("artistPublic")).define("artistPublic", ["__query","FileAttachment","invalidation"], _artistPublic);
  main.variable(observer("artistVer")).define("artistVer", ["__query","FileAttachment","invalidation"], _artistVer);
  main.variable(observer("artistVerKey")).define("artistVerKey", ["artistVer"], _artistVerKey);
  main.variable(observer("artistVerColumn")).define("artistVerColumn", ["artistVer","artistVerKey"], _artistVerColumn);
  main.variable(observer("artistVerValue")).define("artistVerValue", ["artistVerColumn"], _artistVerValue);
  main.variable(observer("artistVerCounts")).define("artistVerCounts", ["artistVerValue","artistVerColumn"], _artistVerCounts);
  main.variable(observer("artistPublicKey")).define("artistPublicKey", ["artistPublic"], _artistPublicKey);
  main.variable(observer("artistPublicColumn")).define("artistPublicColumn", ["artistPublic","artistPublicKey"], _artistPublicColumn);
  main.variable(observer("artistPublicValue")).define("artistPublicValue", ["artistPublicColumn"], _artistPublicValue);
  main.variable(observer("artistPublicCounts")).define("artistPublicCounts", ["artistPublicValue","artistPublicColumn"], _artistPublicCounts);
  main.variable(observer("data")).define("data", ["artistVerCounts","artistPublicCounts"], _data);
  main.variable(observer("viewof selectedSeries1")).define("viewof selectedSeries1", ["Inputs"], _selectedSeries1);
  main.variable(observer("selectedSeries1")).define("selectedSeries1", ["Generators", "viewof selectedSeries1"], (G, _) => G.input(_));
  main.variable(observer()).define(["selectedSeries1"], _18);
  main.variable(observer()).define(["Plot","artistVerKey","data","selectedSeries1"], _19);
  return main;
}
