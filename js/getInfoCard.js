//  Получаем данные выбранной бани и отрисовываем ее

// В card.html загружаем данные по ID с помощью GET запроса
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const urlId = `https://all-baths.tw1.ru/catalog/${id}/`
    // console.log(urlId)

    if (id) {
        fetch(urlId)
            .then(response => {
                // console.log(response)
                if (!response.ok) {
                    throw new Error('Network response был неудачным');
                }
                return response.json();
            })
            .then(data => {
                // console.log(data)
                // Вставка данных в HTML
                document.querySelector('.name_bania').textContent = data.name;
                
                // Вставка изображений в слайдер
                const carouselInner = document.querySelector('.carousel-inner');
                carouselInner.innerHTML = ''; // Очистка содержимого перед добавлением
                data.images.slice(0, 5).forEach((image, index) => {
                    const activeClass = index === 0 ? 'active' : '';
                    const carouselItem = document.createElement('div');
                    carouselItem.className = `carousel-item ${activeClass}`;
                    carouselItem.innerHTML = `
                        <a href="${image}" data-lightbox="gallery">
                            <img src="${image}" class="img-bania_top d-block w-100" alt="Фото ${index + 1}">
                        </a>
                    `;
                    carouselInner.appendChild(carouselItem);
                });

                document.querySelector('.type_bania').textContent = data.type;
                document.querySelector('.subtype_bania').textContent = data.view_bath;
                document.querySelector('.capacity').textContent = ` ${data.capacity} человек`;
                document.querySelector('.price').textContent = `от ${data.price} ₽/час`;
                document.querySelector('.adress').textContent = `Адрес: ${data.full_address}`;

                // Перечень элементов aqua_zone
                const aquaZoneBlock = document.querySelector('.aqua_zone_block');
                aquaZoneBlock.innerHTML = ''; // Очистка перед добавлением
                data.aqua_zone.forEach(item => {
                    const itemElement = document.createElement('p');
                    itemElement.textContent = item;
                    aquaZoneBlock.appendChild(itemElement);
                });

                // Перечень развлекательных услуг
                const entertainmentBlock = document.querySelector('.entertainment_block');
                entertainmentBlock.innerHTML = '';
                data.entertainment.forEach(item => {
                    const itemElement = document.createElement('p');
                    itemElement.textContent = item;
                    entertainmentBlock.appendChild(itemElement);
                });

                // Перечень услуг
                const servicesBlock = document.querySelector('.services_block');
                servicesBlock.innerHTML = '';
                data.services.forEach(item => {
                    const itemElement = document.createElement('p');
                    itemElement.textContent = item;
                    servicesBlock.appendChild(itemElement);
                });
                // Описание
                document.querySelector('.rent_block_cart').textContent = data.rent;
                document.querySelector('.description_block').textContent = data.description;

                // Дополнительная информация
                const addInfoBlock = document.querySelector('.add_info_block');
                addInfoBlock.innerHTML = ''; // Очистка перед добавлением

                // Проверка значений и добавление соответствующих строк
                if (data.banquet_hall) {
                    addInfoBlock.innerHTML += '<li>Банкетный зал</li>';
                }
                if (data.barbecue) {
                    addInfoBlock.innerHTML += '<li>Мангал</li>';
                }
                if (data.own_food) {
                    addInfoBlock.innerHTML += '<li>Еда с собой</li>';
                }
                if (data.parking) {
                    addInfoBlock.innerHTML += '<li>Парковка</li>';
                }


                // document.querySelector('.add_info_block').textContent = data.add_info;
                const phoneBlock = document.querySelector('.phone_block');
                phoneBlock.textContent = data.phone; // Устанавливаем текст
                // Устанавливаем атрибут href для звонка
                phoneBlock.href = 'tel:' + data.phone; 
                
                // Вставка всех изображений в блок gallery
                const galleryContainer = document.querySelector('.container.row.gallery');
                galleryContainer.innerHTML = ''; // Очистка содержимого перед добавлением
                data.images.forEach(image => {
                    const imageElement = document.createElement('div');
                    
                    imageElement.className = 'col-10 col-md-4 m_auto'; // Пример классов для форматирования
                    imageElement.innerHTML = `
                        <a href="${image}" data-lightbox="gallery">
                            <img src="${image}" class="img-fluid" alt="Изображение">
                        </a>
                    `;
                    galleryContainer.appendChild(imageElement);
                });

                // Комментарии
                const commentsContainer = document.getElementById('comments-container');
                commentsContainer.innerHTML = ''; // Очистка контейнера перед добавлением
        
                data.comments.forEach(comment => {
                    const commentDiv = document.createElement('div');
                    commentDiv.className = 'comment';
    
                    const nameDiv = document.createElement('div');
                    nameDiv.className = 'comment-name';
                    nameDiv.textContent = comment.name;
    
                    const textDiv = document.createElement('div');
                    textDiv.className = 'comment-text';
                    textDiv.textContent = comment.comment;
    
                    commentDiv.appendChild(nameDiv);
                    commentDiv.appendChild(textDiv);
                    commentsContainer.appendChild(commentDiv);
                });




            
            })
                    .catch(error => console.error('Ошибка при получении данных:', error));
                    }
                });

