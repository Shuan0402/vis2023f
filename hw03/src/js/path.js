const icon = document.getElementById('icon');
const jsonUrl = '../json/userLocationData.json';
let currentIndex = 0;
let currentFloor = '1F'; // 新增 currentFloor 變數

function calculatePosition(x, y) {
  const minX = 10.45;
  const maxX = 60.47;
  const minY = -11.64;
  const maxY = 15.91;

  const iconX = ((x - minX) / (maxX - minX)) * 100;
  const iconY = ((y - minY) / (maxY - minY)) * 100;

  return { x: iconX, y: iconY };
}

function updateIconPosition(x, y) {
  console.log(x, y);
  const { x: iconX, y: iconY } = calculatePosition(x, y);
  icon.style.left = `${iconX}%`;
  icon.style.top = `${iconY}%`;
}

function loadjson() {
    fetch(jsonUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data) || data.length === 0) {
                throw new Error('Invalid or empty data received');
            }

            const point = data[currentIndex];

            if (point.Floor !== currentFloor) {
                console.log(`Switched to Floor ${point.Floor}`);
                currentFloor = point.Floor;
                // 在此處執行樓層相關操作，例如更新地圖顯示
            }

            updateIconPosition(point.X, point.Y);
            currentIndex++;

            if (currentIndex >= data.length) {
                currentIndex = 0;
            }
        })
        .catch(error => console.error('Error fetching or parsing JSON:', error));
}

// 初始加載 icon 位置
loadjson();

// 每秒更新一次位置
setInterval(loadjson, 1000);
