// Функция для получения отмеченных значений чекбоксов из конкретного контейнера
function getCheckedValues(container, containerId) {
    return Array.from(container.querySelectorAll(`#${containerId} input[type="checkbox"]:checked`))
        .map(checkbox => checkbox.value);
}

// функция для Desktop
function applyFiltersDesk(filterContainerId) {
    // Сбор значений фильтров
    const filterContainer = document.getElementById(filterContainerId);
    const city = filterContainer.querySelector('#citySelect').value;
    const district = filterContainer.querySelector('#districtSelect').value;
    const selectedTypes = getCheckedValues(filterContainer, 'saunaType');
    const selectedViewBath = getCheckedValues(filterContainer, 'banyaType'); // тип парной
    const selectedAquaZone = getCheckedValues(filterContainer, 'aquaZone'); 
    const selectedServices = getCheckedValues(filterContainer, 'services');
    const selectedEntertainment = getCheckedValues(filterContainer, 'entertainment'); 
    const price = parseInt(filterContainer.querySelector('#priceRange2').value, 10); 
    const capacityInput = filterContainer.querySelector('#capacityInput2'); //вместимость
    const capacity = parseInt(capacityInput.value, 10) || null; // Получаем значение вместимости
    const parking = filterContainer.querySelector('#parkingCheck').checked;
    const barbecue = filterContainer.querySelector('#bbqCheck').checked;
    const banquetHall = filterContainer.querySelector('#banquet_hall').checked;
    const ownFood = filterContainer.querySelector('#take_food').checked;

    // Получаем карточки бань из localStorage
    const bathCardsLS = JSON.parse(localStorage.getItem('bathData')) || [];

    // Фильтрация данных
    const filteredBathCards = bathCardsLS.filter(bath => {
        if (city && bath.city !== city) return false;
        if (district && district !== "Все районы"){
            if (district && bath.district !== district) return false;
        }
        if (price && bath.price > price) return false;
        if (capacity && bath.capacity < capacity) return false;

        if (selectedTypes.length && !selectedTypes.some(type => bath.type.includes(type))) return false;
        if (selectedViewBath.length && !selectedViewBath.some(view => bath.view_bath.includes(view))) return false;
        if (selectedAquaZone.length && !selectedAquaZone.some(zone => bath.aqua_zone.includes(zone))) return false;
        if (selectedServices.length && !selectedServices.some(service => bath.services.includes(service))) return false;
        if (selectedEntertainment.length && !selectedEntertainment.some(ent => bath.entertainment.includes(ent))) return false;

        if (parking && !bath.parking) return false;
        if (barbecue && !bath.barbecue) return false;
        if (banquetHall && !bath.banquet_hall) return false;
        if (ownFood && !bath.own_food) return false;

        return true;
    });

    // Отображение отфильтрованных карточек
    displayBathCardsFilt(filteredBathCards);
}


// функция для Mobile
function applyFiltersMobile(filterContainerId) {
    // Сбор значений фильтров
    const filterContainer = document.getElementById(filterContainerId);
    const city = filterContainer.querySelector('#citySelect').value;
    const district = filterContainer.querySelector('#districtSelect').value;
    const selectedTypes = getCheckedValues(filterContainer, 'saunaType');
    const selectedViewBath = getCheckedValues(filterContainer, 'banyaType');
    const selectedAquaZone = getCheckedValues(filterContainer, 'aquaZone');
    const selectedServices = getCheckedValues(filterContainer, 'services');
    const selectedEntertainment = getCheckedValues(filterContainer, 'service');
    const price = parseInt(filterContainer.querySelector('#priceRange1').value, 10);
    const capacityInput = filterContainer.querySelector('#capacityInput1');
    const capacity = parseInt(capacityInput.value, 10) || null; // Получаем значение вместимости
    const parking = filterContainer.querySelector('#parkingCheck').checked;
    const barbecue = filterContainer.querySelector('#bbqCheck').checked;
    const banquetHall = filterContainer.querySelector('#banquet_hall').checked;
    const ownFood = filterContainer.querySelector('#take_food').checked;
    console.log(city, district)

    // Получаем карточки бань из localStorage
    const bathCardsLS = JSON.parse(localStorage.getItem('bathData')) || [];

    // Фильтрация данных
    const filteredBathCards = bathCardsLS.filter(bath => {
        if (city && bath.city !== city) return false;
        if (district && district !== "Все районы"){
            if (district && bath.district !== district) return false;
        }
        if (price && bath.price > price) return false;
        if (capacity && bath.capacity < capacity) return false;

        if (selectedTypes.length && !selectedTypes.some(type => bath.type.includes(type))) return false;
        if (selectedViewBath.length && !selectedViewBath.some(view => bath.view_bath.includes(view))) return false;
        if (selectedAquaZone.length && !selectedAquaZone.some(zone => bath.aqua_zone.includes(zone))) return false;
        if (selectedServices.length && !selectedServices.some(service => bath.services.includes(service))) return false;
        if (selectedEntertainment.length && !selectedEntertainment.some(ent => bath.entertainment.includes(ent))) return false;

        if (parking && !bath.parking) return false;
        if (barbecue && !bath.barbecue) return false;
        if (banquetHall && !bath.banquet_hall) return false;
        if (ownFood && !bath.own_food) return false;

        return true;
    });

    // Отображение отфильтрованных карточек
    displayBathCardsFilt(filteredBathCards);

}



// Функция для отображения карточек
function displayBathCardsFilt(cards) {
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


// Привязка к кнопкам "Применить фильтры" в каждом блоке фильтров
document.getElementById('applyFiltersDesktop').addEventListener('click', function(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы
    applyFiltersDesk('filterBlockDesktop');
});

document.getElementById('applyFiltersMobile').addEventListener('click', function(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы
    applyFiltersMobile('filterBlockMobile');
});
