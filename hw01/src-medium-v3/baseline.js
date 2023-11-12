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


document.addEventListener("DOMContentLoaded", function() {
    createAppleLevel();
});