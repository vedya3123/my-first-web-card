// === ПЕРЕКЛЮЧЕНИЕ ГЛАВНОГО ИЗОБРАЖЕНИЯ ===
const mainImage = document.getElementById('mainImage');
const thumbnails = document.querySelectorAll('.thumbnail');

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
        const newImageSrc = this.getAttribute('data-image');
        mainImage.src = newImageSrc;
        
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        this.classList.add('active');
    });
});

// === ВЫБОР РАЗМЕРА ===
const sizeBtns = document.querySelectorAll('.size-btn');
sizeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        sizeBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// === ВЫБОР ЦВЕТА ===
const colorBtns = document.querySelectorAll('.color-btn');
colorBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        colorBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// === УПРАВЛЕНИЕ КОЛИЧЕСТВОМ ===
const decreaseBtn = document.getElementById('decrease');
const increaseBtn = document.getElementById('increase');
const quantityInput = document.getElementById('quantity');

decreaseBtn.addEventListener('click', () => {
    let currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
    }
});

increaseBtn.addEventListener('click', () => {
    let currentValue = parseInt(quantityInput.value);
    if (currentValue < 99) {
        quantityInput.value = currentValue + 1;
    }
});

quantityInput.addEventListener('change', () => {
    let value = parseInt(quantityInput.value);
    if (isNaN(value) || value < 1) {
        quantityInput.value = 1;
    }
    if (value > 99) {
        quantityInput.value = 99;
    }
});

// === КОРЗИНА (счётчик и добавление) ===
let cartCount = 0;
const cartCounter = document.getElementById('cartCounter');
const addToCartBtn = document.getElementById('addToCartBtn');
const cartMessage = document.getElementById('cartMessage');

function updateCartCounter() {
    cartCounter.textContent = cartCount;
}

addToCartBtn.addEventListener('click', () => {
    const productName = document.querySelector('.product-title').innerText;
    const quantity = parseInt(quantityInput.value);
    const selectedSize = document.querySelector('.size-btn.active')?.innerText || 'не выбран';
    
    let selectedColor = '';
    const selectedColorBtn = document.querySelector('.color-btn.active');
    if (selectedColorBtn) {
        if (selectedColorBtn.classList.contains('black')) selectedColor = 'Черный';
        else if (selectedColorBtn.classList.contains('white')) selectedColor = 'Белый';
        else if (selectedColorBtn.classList.contains('gray')) selectedColor = 'Серый';
    }
    
    const price = document.querySelector('.current-price').innerText;
    
    // Увеличиваем счётчик корзины
    cartCount += quantity;
    updateCartCounter();
    
    // Показываем уведомление
    cartMessage.textContent = `✓ Товар добавлен в корзину (${quantity} шт.)`;
    cartMessage.style.color = '#10b981';
    
    console.log(`Добавлено в корзину:\n${productName}\nЦена: ${price}\nКоличество: ${quantity}\nРазмер: ${selectedSize}\nЦвет: ${selectedColor}`);
    
    setTimeout(() => {
        cartMessage.textContent = '';
    }, 3000);
});