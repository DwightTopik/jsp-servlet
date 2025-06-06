<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="head-title">
	<div class="left">
		<h1>Панель управления</h1>
	</div>
</div>

<ul class="box-info">
	<li><i class='bx bxs-user-check'></i> <span class="text">
			<h3 id="totalPassengers">0</h3>
			<p>Зарегистрированные пассажиры</p>
	</span></li>
	<li><i class='bx bxs-train'></i> <span class="text">
			<h3 id="totalTrains">0</h3>
			<p>Активные поезда</p>
	</span></li>
	<li><i class='bx bxs-coupon'></i> <span class="text">
			<h3 id="totalTickets">0</h3>
			<p>Оформленные билеты</p>
	</span></li>
</ul>

<div class="table-data">
	<div class="order">
		<div class="head">
			<h3>Последние бронирования</h3>
			<i class='bx bx-search'></i> <i class='bx bx-filter'></i>
		</div>
		<div class="table-responsive">
			<table>
				<thead>
					<tr>
						<th>Пассажир</th>
						<th>Дата поездки</th>
						<th>Статус</th>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table>
		</div>
	</div>

	<div class="pnr-search">
		<div class="head">
			<h3>Поиск по номеру бронирования</h3>
		</div>
		<div class="search-box">
			<input type="text" id="pnrInput" placeholder="Введите номер бронирования">
			<button onclick="searchPNR()">Поиск</button>
		</div>
		<div id="pnrResult" class="booking-details"></div>
	</div>
</div>

<script>
document.addEventListener("DOMContentLoaded", function() {
    getDashboardStats();
    getLatestBookings();
});
</script> 