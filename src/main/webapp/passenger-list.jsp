<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="head-title">
	<div class="left">
		<h1>Список пассажиров</h1>
	</div>
</div>


<div class="search-filter-container">
	<form action="#">
		<div class="form-input">
			<input type="search" id="searchInput" placeholder="Поиск...">
			<button type="submit" class="search-btn">
				<i class='bx bx-search'></i>
			</button>
		</div>
	</form>


	<select id="filterGender">
		<option value="">Фильтр по полу</option>
		<option value="Male">Мужской</option>
		<option value="Female">Женский</option>
		<option value="Other">Другой</option>
	</select>


	<select id="sortOptions">
		<option value="">Сортировка</option>
		<option value="nameAsc">Имя (А-Я)</option>
		<option value="nameDesc">Имя (Я-А)</option>
		<option value="ageAsc">Возраст (по возрастанию)</option>
		<option value="ageDesc">Возраст (по убыванию)</option>
	</select>

	<button id="addPassengerBtn">➕ Добавить пассажира</button>
</div>


<div class="passenger-list">
	<div class="table-responsive">
		<table>
			<thead>
				<tr>
					<th>Логин</th>
					<th>ФИО</th>
					<th>Возраст</th>
					<th>Дата рождения</th>
					<th>Пол</th>
					<th>Адрес</th>
					<th>Контакт</th>
					<th>Документ</th>
					<th>Действия</th>
				</tr>
			</thead>
			<tbody id="passengerTableBody">

			</tbody>
		</table>
	</div>
</div>


<div id="passengerModal" class="modal">
	<div class="modal-content">
		<span class="close-btn">&times;</span>
		<h2 id="modalTitle">Добавить пассажира</h2>
		<form id="passengerForm">
			<label>Логин:</label> <input type="text" name="username" required>

			<label>ФИО:</label> <input type="text" name="fullName" required>

			<label>Возраст:</label> <input type="number" name="age" required>

			<label>Дата рождения:</label> <input type="date" name="dob" required> <label>Пол:</label>
			<select name="gender" required>
				<option value="" disabled selected>Выберите пол</option>
				<option value="Male">Мужской</option>
				<option value="Female">Женский</option>
				<option value="Other">Другой</option>
			</select> <label>Адрес:</label> <input type="text" name="address" required>

			<label>Контакт:</label> <input type="text" name="contact" required>

			<label>Документ:</label> <select name="idProof" required>
				<option value="" disabled selected>Выберите документ</option>
				<option value="Aadhar Card">Паспорт</option>
				<option value="PAN Card">Свидетельство о рождении</option>
				<option value="Voter ID">Загранпаспорт</option>
				<option value="Passport">Военный билет</option>
				<option value="Driving License">Водительское удостоверение</option>
			</select>

			<button type="submit" id="savePassengerBtn">Сохранить</button>
		</form>
	</div>
</div>

<script>
document.addEventListener("DOMContentLoaded", function() {
    fetchPassengers();
    attachSearchListeners();
});
</script> 