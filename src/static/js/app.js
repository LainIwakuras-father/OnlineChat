document.addEventListener('DOMContentLoaded', () => {
    const friendsList = document.getElementById('friends-list');
    const chatHistory = document.getElementById('chat-history');
    const messageInput = document.getElementById('message-input');
    const sendMessageBtn = document.getElementById('send-message-btn');
    const createChatBtn = document.getElementById('create-chat-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const sidebar = document.querySelector('.sidebar');
    const chatContainer = document.querySelector('.chat-container');
    const welcomeMessage = document.getElementById('welcome-message');

    // Пример данных друзей
    const friends = ['Friend 1', 'Friend 2', 'Friend 3'];

    // Заполнение списка друзей
    friends.forEach(friend => {
        const li = document.createElement('li');
        li.textContent = friend;
        li.classList.add('p-2', 'hover:bg-gray-700', 'cursor-pointer');
        li.addEventListener('click', () => {
            welcomeMessage.style.display = 'none';
            messageInput.disabled = false;
            sendMessageBtn.disabled = false;
            chatHistory.innerHTML = `<div class="bg-gray-800 p-2 mb-2 rounded">Чат с ${friend}</div>`;
        });
        friendsList.appendChild(li);
    });

    // Обработчик отправки сообщения
    sendMessageBtn.addEventListener('click', () => {
        const message = messageInput.value;
        if (message.trim()) {
            const messageElement = document.createElement('div');
            messageElement.textContent = message;
            messageElement.classList.add('bg-gray-800', 'p-2', 'mb-2', 'rounded');
            chatHistory.appendChild(messageElement);
            messageInput.value = '';
            chatHistory.scrollTop = chatHistory.scrollHeight;
        }
    });

    // Обработчик создания нового чата
    createChatBtn.addEventListener('click', () => {
        alert('Функция создания чата будет реализована позже');
    });

    // Обработчик выхода из аккаунта
    logoutBtn.addEventListener('click', () => {
        fetch('/auth/logout', {
            method: 'POST',
        })
        .then(response => {
            if (response.ok) {
                window.location.href = '/auth';
            } else {
                console.error('Ошибка при выходе из системы');
            }
        })
        .catch(error => {
            console.error('Ошибка при выходе из системы', error);
        });
    });

    // Обработчик для показа/скрытия боковой панели на мобильных устройствах
    document.addEventListener('click', (event) => {
        if (window.innerWidth <= 768 && !sidebar.contains(event.target) && !chatContainer.contains(event.target)) {
            sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
            chatContainer.style.display = chatContainer.style.display === 'none' ? 'block' : 'none';
        }
    });
});
