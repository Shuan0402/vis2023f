// 生成隨機班級的函數
function getRandomClass(){
    const department = ['資工系', '資工所', '電資AI', '電資資安', '創新AI'];
    return department[Math.floor(Math.random() * department.length)];
}

// 生成隨機學號的函數
function getRandomStudentID() {
    const year = ['111', '112'];
    const departmentId = ['590', '598', 'C52', 'C53', 'C71'];
    const randomYear = year[Math.round(Math.random() * (year.length - 1))];
    const randomDepartmentId = departmentId[Math.round(Math.random() * (departmentId.length - 1))];
    const num = Math.round(Math.random() * 1000);
    const id = randomYear + randomDepartmentId + num.toString();
    return id;
}

// 生成隨機姓名的函數
function getRandomName() {
    const name_start = 0x4E00;
    const name_end = 0x9FFF;
    let name = '';
    for (let i = 0; i < 3; i++) {
        const randomUnicode = Math.floor(Math.random() * (name_end - name_start + 1) + name_start);
        name += String.fromCharCode(randomUnicode);
    }

    return name;
}

// 生成隨機 github 帳號
function generateRandomGithub() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    let result = '';

    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}

// 生成隨機成績的函數
function getRandomScore() {
    let scores = '';
    for (let i = 0; i < 9; i++) {
        scores += Math.floor(Math.random() * 101).toString() + ',';
    }
    scores += Math.floor(Math.random() * 101).toString();
    return scores; // 成績範圍在0到100之間
}

// 生成虛擬成績單的函數
function generateTranscript(num) {
    const transcript = [];
    for (let i = 0; i < num; i++) {
        const student = {
            no: i + 1,
            class: getRandomClass(),
            studentID: getRandomStudentID(),
            name: getRandomName(),
            githubAccount: generateRandomGithub(),
            score: getRandomScore(),
        };
        transcript.push(student);
    }
    return transcript;
}

// 建立成績的 CSV 檔案
function createTranscripCSV(){
    let csvContent = '序號,班級,學號,姓名,Github 帳號,作業一,作業二,作業三,作業四,作業五,作業六,作業七,作業八,作業九,作業十\n';

    let fakeTranscript = generateTranscript(120);

    fakeTranscript.forEach((student) => {
        csvContent += `${student.no},${student.class},${student.studentID},${student.name},${student.githubAccount},${student.score}\n`;
    });

    return csvContent;
}

// HTML 開啟時會執行以下操作
document.addEventListener('DOMContentLoaded', function() {
    // 建立成績的 CSV 檔案
    csvContent = createTranscripCSV();

    // 將 CSV 的內容填入 HTML 的 Table 中
    const table = document.getElementById('scoreTable');
    const rows = csvContent.split('\n');

    rows.forEach((row, index) => {
        if (index !== rows.length - 1 || row.trim().length > 0){
            const cells = row.split(',');
            const tr = document.createElement('tr');
            
            cells.forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell;
                tr.appendChild(td);
            });

            table.appendChild(tr);
        }
    });

    document.body.appendChild(table);
    
    // 按下 download 按鈕
    const downloadButton = document.getElementById('downloadButton');
    
    downloadButton.addEventListener('click', function() {
        const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'output.csv');

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});