// Открываем карточку рекламы
function openModal(imageSrc) {
    const modal = document.getElementById('myModal');
    const modalImage = document.getElementById('modalImage');

    modal.style.display = "block";
    modalImage.src = imageSrc;
}

function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = "none";
}

// Закрытие модального окна при клике вне изображения
window.onclick = function(event) {
    const modal = document.getElementById('myModal');
    if (event.target == modal) {
        closeModal();
    }
}


// Открываем карточку рекламы мобильной версии
function openModal_mob(imageSrc) {
    const modal = document.getElementById('myModal_mob');
    const modalImage = document.getElementById('modalImage_mob');

    modal.style.display = "block";
    modalImage.src = imageSrc;
}

function closeModal_mob() {
    const modal = document.getElementById('myModal_mob');
    modal.style.display = "none";
}

// Закрытие модального окна при клике вне изображения
window.onclick = function(event) {
    const modal = document.getElementById('myModal_mob');
    if (event.target == modal) {
        closeModal_mob();
    }
}