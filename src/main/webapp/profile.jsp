<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="profile-container">
    <div class="profile-sidebar">
        <div class="profile-pic-wrapper">
            <img id="profilePic" src="https://placehold.co/150/png" alt="Фото профиля">
            <input type="file" id="imageUpload" accept="image/*" onchange="previewImage(event)">
            <label for="imageUpload" class="upload-btn">Изменить фото</label>
        </div>
        <h2 id="displayName">Иван Иванов</h2>
        <p id="displayEmail">ivan@example.com</p>
        <p id="displayPhone">+7xxxxxxxxxx</p>
    </div>

    <div class="profile-form">
        <h2>Обновить профиль</h2>

        <label>ФИО</label>
        <input type="text" id="fullName" value="Иван Иванов">

        <label>Email</label>
        <input type="email" id="email" value="ivan@example.com">

        <label>Телефон</label>
        <input type="tel" id="phone" value="+7xxxxxxxxxx">

        <label>Пол</label>
        <select id="gender">
            <option value="Male" selected>Мужской</option>
            <option value="Female">Женский</option>
            <option value="Other">Другой</option>
        </select>

        <label>Адрес</label>
        <textarea id="address">ул. Ленина, 12, Воронеж</textarea>

        <button class="update-btn" onclick="updateProfile()">Обновить профиль</button>
    </div>
</div> 