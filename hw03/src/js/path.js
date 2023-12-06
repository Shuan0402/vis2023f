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
    const { x: iconX, y: iconY } = calculatePosition(x, y);

    // 根據樓層位置將頭像放置在相應的圖片上
    switch (currentFloor) {
        case '1F':
            icon.style.left = `${iconX}%`;
            icon.style.top = `${iconY}%`;
            break;
        case '2F':
            // 調整樓層二的圖片位置
            icon.style.left = `${50 + iconX}%`;
            icon.style.top = `${iconY}%`;
            break;
        case '3F':
            // 調整樓層三的圖片位置
            icon.style.left = `${iconX}%`;
            icon.style.top = `${50 + iconY}%`;
            break;
        case '4F':
            // 調整樓層四的圖片位置
            icon.style.left = `${50 + iconX}%`;
            icon.style.top = `${50 + iconY}%`;
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
