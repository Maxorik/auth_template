Создание нового проекта:

1. Открыть [Firebase](https://firebase.google.com/), перейти в Firebase Console и создать новый проект.
2. Получить конфиг для соединения и скопировать его в src/firebaseConfig.ts 
2.1 Если проект уже создан, скопировать его конфиг из Settings -> General -> Your apps
3. Перейти в Authentication -> Sign in method и включить нужные методы
3.1 (опционально) создать пользователя в Authentication -> Users -> Add user для теста авторизации

TODO:
1. Сброс пароля
2. Такая почта уже занята, неправильная почта, слабый пароль (менее 6 символов)
3. Google auth