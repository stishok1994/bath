// Получаем весь список бань

// URL для бань Воронежа
const apiUrl = 'http://90.156.208.220:8880/catalog/?city=Воронеж';

// Функция для создания карточки на основе данных
function createBathCard(bath) {
    // Создаем блок col с классами для адаптивности
    const colDiv = document.createElement("div");
    colDiv.className = "col-6 col-md-4 col-lg-3 mb-4";

    // Создаем основную карточку
    const cardDiv = document.createElement("div");
    cardDiv.className = "card";

    // Добавляем скрытое поле ID
    const idField = document.createElement("p");
    idField.style.display = "none";
    idField.textContent = bath.id;

    // Создаем и добавляем элементы карточки
    const img = document.createElement("img");
    img.className = "bath-image";
    img.src = bath.images[0] // || "путь_к_запасному_изображению";
    img.alt = bath.name;

    const title = document.createElement("h3");
    title.textContent = bath.name;

    const price = document.createElement("p");
    price.innerHTML = `<i class="fa-solid fa-coins" aria-hidden="true"></i> Цена: ${bath.price} ₽/час`;

    const capacity = document.createElement("p");
    capacity.innerHTML = `<i class="fa-solid fa-people-arrows" aria-hidden="true"></i> Вместимость: <br> ${bath.capacity} человек`;

    const address = document.createElement("p");
    address.innerHTML = `<i class="fa-solid fa-map-location" aria-hidden="true"></i> Адрес: ${bath.full_address}`;

    // Добавляем элементы в карточку
    cardDiv.appendChild(idField);
    cardDiv.appendChild(img);
    cardDiv.appendChild(title);
    cardDiv.appendChild(price);
    cardDiv.appendChild(capacity);
    cardDiv.appendChild(address);

    // Вставляем карточку в col
    colDiv.appendChild(cardDiv);
    return colDiv;
}

// Функция для отображения карточек
function displayBathCards(baths) {
    // Получаем контейнеры для карточек
    const cardsBox = document.querySelector(".cards-box");
    const topContainer = document.querySelector(".top_content");
    const recommendedContainer = document.querySelector(".category.recommended .cards-wrapper");

    // Очищаем контейнеры перед добавлением новых карточек
    cardsBox.innerHTML = "";
    topContainer.innerHTML = "";
    recommendedContainer.innerHTML = "";

    baths.forEach(bath => {
        // Создаем карточку
        const cardElement = createBathCard(bath);

        // Добавляем карточку в основной блок
        cardsBox.appendChild(cardElement);

        // Добавляем карточку в блок "Топ", если top == true
        if (bath.top) {
            const topCard = cardElement.cloneNode(true);
            topContainer.appendChild(topCard);
        }

        // Добавляем карточку в блок "Рекомендуемое", если recommendations == true
        if (bath.recommendations) {
            const recommendedCard = cardElement.cloneNode(true);
            recommendedContainer.appendChild(recommendedCard);
        }
    });
}

// Функция для загрузки данных из API и сохранения в localStorage
async function fetchAndStoreBathCards() {
    try {
        // GET-запрос
        const response = await fetch(apiUrl);
        const data = await response.json();

        // первое изображение для каждой бани
        const processedData = data.menu.map(bath => ({
            ...bath,
            images: bath.images && bath.images.length > 0 ? [bath.images[0]] : [] 
        }));

        // Сохраняем данные в localStorage
        localStorage.setItem("bathData", JSON.stringify(processedData));

        // Отображаем карточки на странице
        displayBathCards(processedData);
    } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
    }
}


// Инициализация: загружаем данные из API
fetchAndStoreBathCards()