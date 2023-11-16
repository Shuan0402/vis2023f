function _data(__query,FileAttachment,invalidation){return(
__query(FileAttachment("output@2.csv"),{from:{table:"output"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:["姓名","作業一","作業二","作業三","作業四","作業五","作業六","作業七","作業八","作業九","作業十"]}},invalidation)
)}

function _homework(){return(
["作業一", "作業二", "作業三", "作業四", "作業五", "作業六", "作業七", "作業八", "作業九", "作業十"]
)}

function _studentArray(){return(
[]
)}

function _studentList(studentArray,data,homework)
{
  studentArray.length = 0;
  data.forEach(row => {
    let Name = row["姓名"];
    for (let i = 0; i < 10; i++) {
      studentArray.push({
        Name: Name,
        HW: i + 1,
        value: row[homework[i]]
      });
    }
  });
  return studentArray
}


function _5(Plot,studentList){return(
Plot.plot({
  inset: 8,
  grid: true,
  color: {
    legend: true,
  },
  marks: [
    Plot.dot(studentList, {x: "value", y: "Name", stroke: "HW"})
  ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["output@2.csv", {url: new URL("./files/26dfaf42c9176d3ac8660e833dbe757283e8b04226d00100f816e3884357b5916ee71cafe96935a1c74f34447ffc2d319efea5bbf8de084c9687b1d7b7ddb903.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer("data")).define("data", ["__query","FileAttachment","invalidation"], _data);
  main.variable(observer("homework")).define("homework", _homework);
  main.variable(observer("studentArray")).define("studentArray", _studentArray);
  main.variable(observer("studentList")).define("studentList", ["studentArray","data","homework"], _studentList);
  main.variable(observer()).define(["Plot","studentList"], _5);
  return main;
}
