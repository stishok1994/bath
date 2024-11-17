// Отправка комментария

const URLComment = 'http://90.156.208.220:8880/catalog/new_comment/';

let correctAnswer; // Для хранения правильного ответа

        function generateMathQuestion() {
            const num1 = Math.floor(Math.random() * 5) + 1; // Случайное число от 1 до 10
            const num2 = Math.floor(Math.random() * 5) + 1; // Случайное число от 1 до 10

            let question;

            question = `${num1} + ${num2}`;
            correctAnswer = num1 + num2;

            document.getElementById('math-question').innerText = `Сколько будет: ${question}?`;
        }

        generateMathQuestion(); // Генерируем вопрос при загрузке страницы

        document.getElementById('comment-form').addEventListener('submit', function(event) {
            event.preventDefault(); // Предотвращаем стандартное поведение формы
            
            // Проверяем ответ на математический вопрос
            const userAnswer = parseInt(document.getElementById('math-answer').value);
            if (userAnswer !== correctAnswer) {
                alert('Неправильный ответ на математический пример. Пожалуйста, попробуйте снова.');
                generateMathQuestion(); // Генерируем новый вопрос
                return;
            }

            // Получаем значения из формы
            const name = document.getElementById('name').value;
            const comment = document.getElementById('comment').value;

            // Извлекаем id из URL
            const urlParams = new URLSearchParams(window.location.search);
            const banyaId = urlParams.get('id');

            // Создаем объект запроса
            const data = {
                banya: banyaId,
                name: name,
                comment: comment
            };

            // Устанавливаем параметры POST-запроса
            fetch(URLComment, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка сети');
                }
                return response.json();
            })
            .then(data => {
                console.log('Успешно отправлено:', data);
                alert(data.message); // Используем из ответа сервера
                // Дополнительные действия: очистить форму или показать сообщение
                document.getElementById('comment-form').reset();
                generateMathQuestion(); // Генерируем новый вопрос для следующих отправок
            })
            .catch((error) => {
                console.error('Ошибка:', error);
                alert('Ошибка отправки комментария');
            });
        });