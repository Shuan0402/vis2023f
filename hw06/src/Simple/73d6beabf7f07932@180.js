function _1(md){return(
md`# HW6_Simple
`
)}

function _selectedSeries(Inputs){return(
Inputs.checkbox(["artistVer", "artistPublic"], {label: "Choose datasets"})
)}

function _3(selectedSeries){return(
selectedSeries
)}

function _4(Plot,artistVerKey,data,selectedSeries){return(
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
    Plot.barY(data.filter(d => selectedSeries.includes(d.series)), Plot.stackY({ 
      x: "value",
      y: "count",
      fill: "series",
      title: d => `${d.series}\nvalue: ${d.value}\ncount: ${d.count}`
    }))
  ]
})
)}

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
  main.variable(observer()).define(["Plot","artistVerKey","data","selectedSeries"], _4);
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
  return main;
}
