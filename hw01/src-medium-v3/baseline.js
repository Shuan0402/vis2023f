function createAppleLevel() {
    d3.select("#apple_level")
        .append("table")
        .append("tr")
        .selectAll("td")
        .data([10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0])
        .enter()
        .append("td")
        .text(function (d, i) {
            if (i <= 10 || isNaN(d)) return d;
        })
        .append("img")
        .attr("src", function (d, i) {
            if (d >= 0 && d <= 10) return `./img/${d}.svg`;
            else return "./img/10.svg";
        })
        .attr("x", "0")
        .attr("y", "0")
        .attr("width", function (d, i) { return (i + 1) * 60; })
        .attr("height", function (d, i) { return (i + 1) * 60; });
}

// 將資料處理的部分包裝成一個函式
function processData(data) {
    parsedCSV = d3.csv.parseRows(data);

    var container = d3.select("Transcripts")
        .append("table")
        .selectAll("tr")
        .data(parsedCSV)
        .enter()
        .append("tr")
        .selectAll("td")
        .data(function (d) { return d; }).enter()
        .append("td")
        .html(function (d, i) {
            if (i === 4 && d !== 'GitHub 帳號') {
                return '<a href="https://' + d + '.github.io/vis2023f/" target="_blank"><img src="https://' + d + '.github.io/vis2023f/hw00/me.jpg"></a>' + '<hr><a href="https://github.com/' + d + '/vis2023f/" target="_blank">' + d + '</a>';
            } else if (i === 0 || i === 2 || isNaN(d)) {
                return d;
            }
        })
        .filter(function (d, i) { return (i > 2 && !isNaN(d) && d !== ""); })
        .append("img")
        .attr("src", function (d, i) {
            if (d >= 0 && d <= 10) {
                return `./img/${d}.svg`;
            } else {
                return "./svg10/00.svg";
            }
        })
        .attr("width", 50)
        .attr("height", 50);
}

// // 使用 d3.js 載入資料及處理
// d3.text("./output.csv", function (data) {
//     processData(data);
// });




document.addEventListener("DOMContentLoaded", function() {
    createAppleLevel();
    // 使用 d3.js 載入資料及處理
    d3.text("./output.csv", function (data) {
        processData(data);
    });
});