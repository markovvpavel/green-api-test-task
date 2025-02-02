# Тестовое задание для интеграции с Green API

## Описание

Задание представляет собой веб-клиент, интегрированный с Green API, который позволяет отправлять и получать сообщения через WhatsApp, с базовой функциональностью для управления сообщениями и контактами.

## Скриншоты

### 1. Страница авторизации

На этой странице необходимо ввести `idInstance` и `apiTokenInstance`, чтобы авторизоваться и получить доступ к функционалу приложения.

![Страница авторизации](https://github.com/markovvpavel/green-api-test-task/blob/main/assets/screenshots/1.jpg)

### 2. Страница чатов

На странице чатов в поле "Номер телефона" нужно ввести номер, с которым вы хотите начать чат.

![Страница чатов](https://github.com/markovvpavel/green-api-test-task/blob/main/assets/screenshots/2.jpg)

### 3. Чат

На этой странице можно отправлять и получать сообщения в чате с выбранным контактом.

![Чат](https://github.com/markovvpavel/green-api-test-task/blob/main/assets/screenshots/3.jpg)

## Ссылка на сайт

Вы можете попробовать демо по следующей ссылке: [Live Demo](https://greenapi-test-task.netlify.app)

## Установка

1. Клонируйте репозиторий:

   ```bash
   git clone https://github.com/markovvpavel/green-api-test-task.git
   ```

2. Установите зависимости

   ```bash
   cd green-api-test-task; yarn install --frozen-lockfile
   ```

3. Для разработки

   ```bash
   yarn start
   ```

4. Для продакшн-сборки

   ```bash
   yarn build; yarn start
   ```
