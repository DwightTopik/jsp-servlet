<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="head-title">
	<div class="left">
		<h1>Бронирование билетов</h1>
	</div>
</div>


<div class="booking-container">

	<div class="left-panel">

		<div id="searchTrainSection" class="train-panel">
			<h2>Поиск поезда</h2>
			<label for="origin">Откуда</label> <select id="origin">
				<option value="">Выберите станцию отправления</option>
			</select> <label for="destination">Куда</label> <select
				id="destination">
				<option value="">Выберите станцию назначения</option>
			</select> <label for="trainClass">Класс</label> <select id="trainClass">
				<option value="">Все классы</option>
				<option value="General">Общий</option>
				<option value="Sleeper">Плацкарт</option>
				<option value="1st AC">1-й класс</option>
				<option value="2nd AC">2-й класс</option>
			</select> <label for="travelDate">Дата поездки</label> 
			<input type="text" id="travelDate" placeholder="дд/мм/гггг" onkeyup="formatDate(this)">

			<button class="btn-search" onclick="searchTrains()">Поиск поезда</button>
		</div>

		<div id="selectPassengerSection" class="train-panel"
			style="display: none;">
			<h2>Выберите пассажиров</h2>
			<input type="text" id="passengerSearch"
				placeholder="Поиск по логину или ФИО">
			<div id="passengerResults" class="suggestions-container"></div>

			<label for="seatPreference">Предпочтение места</label> <select
				id="seatPreference">
				<option value="">Без предпочтений</option>
				<option value="У окна">У окна</option>
				<option value="У прохода">У прохода</option>
				<option value="Середина">Середина</option>
			</select> <label for="foodPreference">Питание</label> <select
				id="foodPreference">
				<option value="">Без предпочтений</option>
				<option value="Обычное">Обычное</option>
				<option value="Вегетарианское">Вегетарианское</option>
				<option value="Детское">Детское</option>
			</select>

			<button class="btn-add-passenger" onclick="addPassenger()">Добавить пассажира</button>
		</div>
	</div>


	<div class="right-panel">

		<div id="availableTrainsSection" class="train-list">
			<h2>Доступные поезда</h2>
			<div class="table-responsive">
				<table>
					<thead>
						<tr>
							<th>Номер поезда</th>
							<th>Название поезда</th>
							<th>Класс</th>
							<th>Цена</th>
							<th>Действие</th>
						</tr>
					</thead>
					<tbody id="trainTable"></tbody>
				</table>
			</div>
		</div>


		<div id="bookingDetailsSection" style="display: none;">

			<div id="selectedTrainSection">
				<h2>Выбранный поезд и класс</h2>
				<p id="selectedTrainDetails"></p>
			</div>


			<div id="passengerListSection">
				<h2>Добавленные пассажиры</h2>
				<ul id="passengerList"></ul>
			</div>

			<button id="confirmBookingBtn" onclick="confirmBooking()">Подтвердить бронирование</button>
		</div>
	</div>
</div>


<div class="booking-list">
	<h2>Все забронированные билеты</h2>
	<div class="table-responsive">
		<table>
			<thead>
				<tr>
					<th>Номер бронирования</th>
					<th>ФИО пассажира</th>
					<th>Номер поезда</th>
					<th>Дата поездки</th>
					<th>Класс</th>
					<th>Место</th>
					<th>Статус</th>
					<th>Действие</th>
				</tr>
			</thead>
			<tbody id="bookingTable"></tbody>
		</table>
	</div>
</div>

<script>
document.addEventListener("DOMContentLoaded", function() {
    loadTrainData();
    loadAllBookings();
    attachPassengerSearchListener();
});
</script> 