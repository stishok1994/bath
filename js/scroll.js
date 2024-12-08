// Находим кнопку "Все сауны"
document.getElementById('btn_all_saun').addEventListener('click', function() {
    // Перезагрузка страницы
    location.reload();
});

// Кнопка возврата наверх
const btnToTop = document.getElementById('btn_to_top');

// Показать кнопку, когда прокручен вниз
window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        btnToTop.classList.add('show');
    } else {
        btnToTop.classList.remove('show');
    }
};

// Прокрутка вверх при нажатии на кнопку
btnToTop.onclick = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Плавная прокрутка
    });
};