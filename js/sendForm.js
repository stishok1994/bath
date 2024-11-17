const UrlForm = 'https://all-baths.tw1.ru/catalog/new_offer/'

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cooperationForm');
    
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
        } else {
            const formData = {
                city: document.getElementById('city').value,
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                comment: document.getElementById('comments').value
            };

            fetch(UrlForm, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (response.ok) {
                    alert('Форма успешно отправлена!');
                    form.reset();
                } else {
                    alert('Ошибка отправки формы.');
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert('Ошибка сети, попробуйте еще раз.');
            });
        }
    });
});