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

function switchFloorLogic(floor) {
    // 切換樓層時的邏輯
    // 更改追蹤圖示的位置
    switch (floor) {
        case '1F':
            // 將圖示放置到一樓對應的位置
            icon.style.left = '0%';
            icon.style.top = '0%';
            break;
        case '2F':
            // 將圖示放置到二樓對應的位置
            icon.style.left = '50%';
            icon.style.top = '0%';
            break;
        case '3F':
            // 將圖示放置到三樓對應的位置
            icon.style.left = '0%';
            icon.style.top = '50%';
            break;
        case '4F':
            // 將圖示放置到四樓對應的位置
            icon.style.left = '50%';
            icon.style.top = '50%';
            break;
        default:
            break;
    }
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
                switchFloorLogic(currentFloor);
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
