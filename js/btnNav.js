// Взаимодействие с кнопками мобильной версии

    // Функция отображения всех саун
    let selectedTypes = ["Сауна"];

    function applyGetSaun() {
        const bathCardsLS = JSON.parse(localStorage.getItem('bathData')) || [];
        
        const filteredBathCards = bathCardsLS.filter(bath => {
            // Предполагается, что bath.type - это массив, содержащий типы
            return bath.type && bath.type.includes("Сауна");
        });

        displayAllSauna(filteredBathCards);
    }

    // Функция для отображения карточек
    function displayAllSauna(cards) {
        const cardsBox = document.querySelector('.blok-others-cards');
        cardsBox.innerHTML = ''; // Очистка блока перед отображением новых карточек

        cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('col-6', 'col-md-4', 'col-lg-3', 'mb-4');
            cardElement.innerHTML = 
            `
                <div class="card">
                    <p style="display: none;">${card.id}</p>
                    <img class="bath-image" src="${card.images[0]}" alt="${card.name}">
                    <h3>${card.name}</h3>
                    <p><i class="fa-solid fa-coins" aria-hidden="true"></i> Цена: ${Math.round(card.price)} ₽/час</p>
                    <p><i class="fa-solid fa-people-arrows" aria-hidden="true"></i> Вместимость: <br> ${card.capacity} человек</p>
                    <p><i class="fa-solid fa-map-location" aria-hidden="true"></i> Адрес: ${card.full_address}</p>
                </div>
            `;
            cardsBox.appendChild(cardElement);
        });
    }

    document.getElementById('btn_all_saun').addEventListener('click', function(event) {
        event.preventDefault(); // Предотвращаем перезагрузку страницы
        applyGetSaun();
    });