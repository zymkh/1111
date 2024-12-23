document.addEventListener('DOMContentLoaded', function() {
    // 获取所有需要的元素
    const radElements = document.querySelectorAll('.rad');
    const carSpan = document.querySelector('.car'); // 获取购物车的数字位置
    const addCarSpans = document.querySelectorAll('.add-car span'); // 获取所有的数量 <span>
    const headerSecondItem = document.querySelector('.header-second-item span:last-child'); // "全部" 后面的数字
    const priceElements = document.querySelectorAll('.red-font span'); // 商品的价格部分
    const totalPriceSpan = document.querySelector('.span-2'); // 合计共 后的金额显示
    const selectToggleBtn = document.querySelector('.select-toggle-btn'); // 获取“取消全选”按钮

    let allSelected = true; // 初始状态下，假设所有商品已选中

    // 更新 "购物车" 后面的数字
    function updateCartNumber() {
        let activeCount = 0;
        radElements.forEach(rad => {
            if (rad.classList.contains('active')) {
                activeCount++;  // 统计所有被选中的 .rad 数量
            }
        });
        const totalItems = 4; // 假设初始总数量是 4
        const cartNumber = totalItems - activeCount; // 购物车数量 = 总数 - 被选中的数量
        carSpan.textContent = `购物车(${cartNumber})`; // 更新购物车数量
    }

    // 更新 "全部" 后面的数字
    function updateTotalNumber() {
        let total = 0;
        addCarSpans.forEach(span => {
            total += parseInt(span.textContent, 10);  // 获取每个购物车的数量，并累加
        });
        headerSecondItem.textContent = total; // 更新 "全部" 后面的数字
    }

    // 更新 "合计共" 后面的价格 
    function updateTotalPrice() {
        let totalPrice = 0;
        addCarSpans.forEach((span, index) => {
            const quantity = parseInt(span.textContent, 10); // 获取当前商品的数量
            const price = parseFloat(priceElements[index].textContent.replace('￥', '')); // 获取商品的单价（去除“￥”符号）
            totalPrice += quantity * price; // 计算当前商品的总价
        });
        totalPriceSpan.textContent = `￥${totalPrice.toFixed(2)}`; // 更新 "合计共" 后的金额，保留两位小数
    }

    // 处理 .rad 点击事件，切换颜色和数字
    radElements.forEach(function(rad) {
        rad.addEventListener('click', function() {
            // 获取当前点击的 .rad 元素
            const relatedSpan = rad.closest('.center-item').querySelector('.add-car span');
            const relatedRad = rad; // 当前点击的 .rad
            const isActive = relatedRad.classList.contains('active'); // 检查当前是否已经是选中状态

            // 切换 .rad 的颜色并更新数字
            if (isActive) {
                relatedRad.classList.remove('active'); // 恢复原始颜色
                relatedSpan.textContent = '1'; // 恢复数字为 1
            } else {
                relatedRad.classList.add('active'); // 设置为选中状态
                relatedSpan.textContent = '0'; // 设置数字为 0
            }

            // 更新 "购物车" 数量
            updateCartNumber();

            // 更新 "全部" 后面的数字
            updateTotalNumber();

            // 更新 "合计共" 后的价格
            updateTotalPrice();
        });
    });

    // 处理加减号点击事件，改变数量并更新总数
    const flagDashElements = document.querySelectorAll('.flag-dash');
    const flagPlusElements = document.querySelectorAll('.flag-plus');

    flagDashElements.forEach(function(dash) {
        dash.addEventListener('click', function() {
            const span = dash.closest('.add-car').querySelector('span');
            let currentValue = parseInt(span.textContent, 10);
            if (currentValue > 0) {
                currentValue--; // 减小数量
                span.textContent = currentValue;
            }

            // 更新购物车数量和总数
            updateCartNumber();
            updateTotalNumber();
            updateTotalPrice(); // 更新合计价格
        });
    });

    flagPlusElements.forEach(function(plus) {
        plus.addEventListener('click', function() {
            const span = plus.closest('.add-car').querySelector('span');
            let currentValue = parseInt(span.textContent, 10);
            currentValue++; // 增加数量
            span.textContent = currentValue;

            // 更新购物车数量和总数
            updateCartNumber();
            updateTotalNumber();
            updateTotalPrice(); // 更新合计价格
        });
    });

    // 处理“取消全选”/“全选”按钮点击事件
    selectToggleBtn.addEventListener('click', function() {
        if (allSelected) {
            // 全选
            radElements.forEach(function(rad) {
                if (rad.classList.contains('active')) {
                    rad.classList.remove('active');
                    const relatedSpan = rad.closest('.center-item').querySelector('.add-car span');
                    relatedSpan.textContent = '1'; // 恢复数量为 1
                }
            });
            selectToggleBtn.textContent = '取消全选'; // 修改按钮文本为"取消全选"
            allSelected = false;
        } else {
            // 取消全选
            radElements.forEach(function(rad) {
                if (!rad.classList.contains('active')) {
                    rad.classList.add('active');
                    const relatedSpan = rad.closest('.center-item').querySelector('.add-car span');
                    relatedSpan.textContent = '0'; // 设置数量为 0
                }
            });
            selectToggleBtn.textContent = '全选'; // 修改按钮文本为"全选"
            allSelected = true;
        }

        // 更新所有相关数字
        updateCartNumber();
        updateTotalNumber();
        updateTotalPrice();
    });

    // 初始化时设置取消全选状态
    radElements.forEach(function(rad) {
        rad.classList.add('active'); // 设置所有商品为选中状态
        const relatedSpan = rad.closest('.center-item').querySelector('.add-car span');
        relatedSpan.textContent = '0'; // 设置数量为 0
    });

    // 初始化更新
    selectToggleBtn.textContent = '全选'; // 初始按钮文本为"全选"
    updateCartNumber();
    updateTotalNumber();
    updateTotalPrice();
});
