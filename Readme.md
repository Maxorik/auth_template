Создание нового проекта:

* Открыть [Firebase](https://firebase.google.com/), перейти в Firebase Console и создать новый проект.

* Получить конфиг для соединения и скопировать его в src/firebaseConfig.ts
  * Если проект уже создан, скопировать его конфиг из Settings -> General -> Your apps
 
* Перейти в Authentication -> Sign in method и включить нужные методы
  * (опционально) создать пользователя в Authentication -> Users -> Add user для теста авторизации

TODO:
- [ ] Сброс пароля
- [ ] Такая почта уже занята, неправильная почта, слабый пароль (менее 6 символов)
- [ ] Google auth
