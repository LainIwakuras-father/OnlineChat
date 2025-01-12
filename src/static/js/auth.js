document.addEventListener('DOMContentLoaded', /**
* Функция для обработки вкладок и полей ввода пароля.
* Добавляет обработчики событий на вкладки и поля ввода пароля,
* которые изменяют содержимое вкладок и отображают силу пароля соответственно.
*/
() => {
    /**
    * Вкладки для переключения содержимого.
    * @type {NodeList}
    */
    const tabs = document.querySelectorAll('.nav-tabs a');

    /**
    * Содержимое вкладок.
    * @type {NodeList}
    */
    const contents = document.querySelectorAll('.tab-content');

    /**
    * Поля ввода пароля.
    * @type {NodeList}
    */
    const passwordInputs = document.querySelectorAll('input[type="password"]');

    /**
    * Полосы отображения силы пароля.
    * @type {NodeList}
    */
    const passwordStrengthBars = document.querySelectorAll('#password-strength');

    /**
    * Добавляет обработчик событий на каждую вкладку.
    * При клике на вкладку, содержимое других вкладок скрывается,
    * а содержимое текущей вкладки отображается.
    */
    tabs.forEach(tab => {
        tab.addEventListener('click', (event) => {
            event.preventDefault();
            const target = document.querySelector(tab.getAttribute('href'));
            contents.forEach(content => content.classList.add('hidden'));
            target.classList.remove('hidden');
        });
    });

    /**
    * Добавляет обработчик событий на каждое поле ввода пароля.
    * При вводе пароля, его сила оценивается и отображается в соответствующей полосе.
    */
    passwordInputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            const password = input.value;
            let strength = 0;
            let color;

            if (password.length > 7) strength++;
            if (password.length > 10) strength++;
            if (/[A-Z]/.test(password)) strength++;
            if (/[0-9]/.test(password)) strength++;
            if (/[@$!%*?&]/.test(password)) strength++;

            switch (strength) {
                case 0:
                    color = 'bg-red-500';
                    break;
                case 1:
                    color = 'bg-orange-500';
                    break;
                case 2:
                    color = 'bg-yellow-500';
                    break;
                case 3:
                    color = 'bg-green-500';
                    break;
                case 4:
                case 5:
                    color = 'bg-blue-500';
                    break;
                default:
                    color = 'bg-gray-400';
            }

            passwordStrengthBars[index].className = `h-1 ${color} mt-1 rounded`;
        });
    });
}
);