let lastScrollY = 0; // 上一次滚动的 Y 位置
const header = document.querySelector('.header'); // 获取 header 元素

// 监听滚动事件
window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
        // 向下滚动，隐藏 header
        header.classList.add('hidden');
    } else {
        // 向上滚动，显示 header
        header.classList.remove('hidden');
    }

    // 更新 lastScrollY
    lastScrollY = currentScrollY;
});

// 定义 JSON 数据
const categories = [
    {
        image: './image/first/今日特惠.png',
        label: '今日特惠'
    },
    {
        image: './image/first/边界交换.png',
        label: '边界交换'
    }
];

const secondCategories = [
    {
        image: './image/first/强大功能.png',
        label: '强大功能'
    },
    {
        image: './image/first/电子数码.png',
        label: '电子数码'
    }
];

// 动态生成 "line-first" 内容
const lineFirstElement = document.getElementById('line-first');
categories.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('item');
    div.innerHTML = `
        <img src="${item.image}" alt="">
        <span>${item.label}</span>
    `;
    lineFirstElement.appendChild(div);
});

// 动态生成 "line-second" 内容
const lineSecondElement = document.getElementById('line-second');
secondCategories.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('item');
    div.innerHTML = `
        <img src="${item.image}" alt="">
        <span>${item.label}</span>
    `;

    // 为每个项添加点击事件
    div.addEventListener('click', function() {
        // 检查该项的 label 是否为“电子数码”
        if (item.label === '电子数码') {
            // 跳转到 04.html
            window.location.href = '04.html';
        }
    });

    lineSecondElement.appendChild(div);
});

// 获取搜索框
const searchInput = document.querySelector('input[type="text"]');

// 添加监听器，监听回车键（Enter）
searchInput.addEventListener('keypress', function(event) {
    // 检查是否是回车键（Enter键的键码是13）
    if (event.key === 'Enter') {
        // 获取输入框的内容
        const searchQuery = searchInput.value.trim();

        // 如果输入框的内容是“电子数码”
        if (searchQuery === '电子数码') {
            // 跳转到 04.html
            window.location.href = '04.html';
        }
    }
});
