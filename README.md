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

2. Перед установкой зависимостей необходимо создать файл `.env.local` в корне проекта. В этот файл нужно добавить следующие переменные окружения:

   ```bash
   REACT_APP_API_URL=https://7105.api.greenapi.com
   REACT_APP_MEDIA_URL=https://7105.media.greenapi.com
   ```

3. Установите зависимости:

   ```bash
   cd green-api-test-task; yarn install --frozen-lockfile
   ```

4. Для разработки:

   ```bash
   yarn start
   ```

5. Для продакшн-сборки:

   ```bash
   yarn build; yarn start
   ```
