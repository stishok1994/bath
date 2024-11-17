// Прокрутка карточек

document.addEventListener("DOMContentLoaded", () => {
    const scrollContainers = document.querySelectorAll('.scroll-container');

    scrollContainers.forEach(container => {
        const cardsWrapper = container.querySelector('.cards-wrapper');
        const leftBtn = container.querySelector('.left-btn');
        const rightBtn = container.querySelector('.right-btn');
        const cards = cardsWrapper.querySelectorAll('.card');

        // Только если больше 4 карточек, активируем прокрутку
        // if (cards.length > 4) {
            // Прокрутка при нажатии на кнопки
            leftBtn.addEventListener('click', () => {
                cardsWrapper.scrollLeft -= 300; // Прокрутка влево
            });

            rightBtn.addEventListener('click', () => {
                cardsWrapper.scrollLeft += 300; // Прокрутка вправо
            });

            // Прокрутка колесиком мыши
            cardsWrapper.addEventListener('wheel', (event) => {
                event.preventDefault();
                cardsWrapper.scrollLeft += event.deltaY; // Горизонтальная прокрутка
            });
        // } else {
        //     // Если карточек меньше 4, скрываем кнопки прокрутки
        //     leftBtn.style.display = 'none';
        //     rightBtn.style.display = 'none';
        // }
    });
});
