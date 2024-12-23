// 获取箭头元素
const leftArrow = document.querySelector('.left_arrow');

// 添加点击事件监听器
leftArrow.addEventListener('click', function() {
    // 跳转到 01.html
    window.location.href = 'index.html';
});

// 获取分享图标元素
const rightShare = document.querySelector('.right_share');

// 获取模态框元素
const shareModal = document.getElementById('shareModal');
const shareYes = document.getElementById('shareYes');
const shareNo = document.getElementById('shareNo');

// 添加点击事件监听器
rightShare.addEventListener('click', function() {
    // 显示模态框
    shareModal.style.display = 'flex';
});

// 点击“是”按钮时的行为
shareYes.addEventListener('click', function() {
    // 这里可以添加实际的分享逻辑
    alert('已分享到朋友圈！');
    shareModal.style.display = 'none';  // 隐藏模态框
});

// 点击“否”按钮时的行为
shareNo.addEventListener('click', function() {
    shareModal.style.display = 'none';  // 隐藏模态框
});

// 定义渲染内容的函数
function renderItems(data) {
    const lineFirstContainer = document.getElementById('lineFirst');
    const lineSecondContainer = document.getElementById('lineSecond');

    // 清空之前的内容
    lineFirstContainer.innerHTML = '';
    lineSecondContainer.innerHTML = '';

    // 渲染第一行
    data.lineFirst.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('item');
        div.innerHTML = `<img src="${item.src}" alt="${item.alt}"><span>${item.name}</span>`;
        lineFirstContainer.appendChild(div);
    });

    // 渲染第二行
    data.lineSecond.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('item');
        div.innerHTML = `<img src="${item.src}" alt="${item.alt}"><span>${item.name}</span>`;
        lineSecondContainer.appendChild(div);
    });
}

// 从服务器获取数据
function fetchItemsData(category) {
    const url = `http://rap2api.taobao.org/app/mock/321794/web_page`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(`获取到的 ${category} 数据:`, data); // 输出获取的数据
            // 获取数据并渲染
            if (data.itemsData01 && category === 'itemsData01') {
                renderItems(data.itemsData01[0]); // 渲染 itemsData01 数据
            } else if (data.itemsData02 && category === 'itemsData02') {
                renderItems(data.itemsData02[0]); // 渲染 itemsData02 数据
            } else if (data.itemsData03 && category === 'itemsData03') {
                renderItems(data.itemsData03[0]); // 渲染 itemsData03 数据
            } else if (data.itemsData04 && category === 'itemsData04') {
                renderItems(data.itemsData04[0]); // 渲染 itemsData04 数据
            }
        })
        .catch(error => console.error('获取数据失败:', error));
}

// 为每个产品类别添加点击事件
document.querySelector('.mlist1').addEventListener('click', function() {
    fetchItemsData('itemsData01'); // 获取并渲染 itemsData01 数据
});

document.querySelector('.mlist2').addEventListener('click', function() {
    fetchItemsData('itemsData02'); // 获取并渲染 itemsData02 数据
});

document.querySelector('.mlist3').addEventListener('click', function() {
    fetchItemsData('itemsData03'); // 获取并渲染 itemsData03 数据
});

document.querySelector('.mlist4').addEventListener('click', function() {
    fetchItemsData('itemsData04'); // 获取并渲染 itemsData04 数据
});

// 初始渲染时加载第一个类别的数据
fetchItemsData('itemsData01'); // 初始加载 itemsData01 数据

// 获取所有的时间元素
const timeElements = document.querySelectorAll('.last_time');

// 函数：更新时间
function updateTime() {
    timeElements.forEach(element => {
        // 获取当前时间的字符串（例如：2天 8:00:09）
        let timeText = element.textContent.trim();
        
        // 正则表达式解析天数、小时、分钟和秒
        const regex = /(\d+)天 (\d{1,2}):(\d{1,2}):(\d{1,2})/;
        const matches = timeText.match(regex);

        if (matches) {
            let days = parseInt(matches[1], 10);
            let hours = parseInt(matches[2], 10);
            let minutes = parseInt(matches[3], 10);
            let seconds = parseInt(matches[4], 10);

            // 减少秒数
            seconds--;

            // 如果秒数变成负数，进行借位
            if (seconds < 0) {
                seconds = 59;
                minutes--;
            }

            // 如果分钟数变成负数，进行借位
            if (minutes < 0) {
                minutes = 59;
                hours--;
            }

            // 如果小时数变成负数，进行借位
            if (hours < 0) {
                hours = 23;
                days--;
            }

            // 更新元素的文本内容
            element.textContent = `${days}天 ${hours}:${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    });
}

// 每秒更新一次时间
setInterval(updateTime, 1000);
