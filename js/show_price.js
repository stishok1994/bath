// Получаем все ползунки с классом 'priceRange'
const priceRanges = document.querySelectorAll('.priceRange');

// Проходим по каждому ползунку
priceRanges.forEach(range => {
    range.addEventListener('input', function() {
        // Находим ближайший span с классом 'priceValue' относительно текущего ползунка
        const priceValueElement = this.closest('.form-group').querySelector('.priceValue');
        // Обновляем текст в этом span
        priceValueElement.innerText = this.value;
    });
});
