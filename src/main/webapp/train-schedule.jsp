<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="head-title">
	<div class="left">
		<h1>Расписание поездов</h1>
	</div>
</div>

<div class="train-schedule">
	<div class="table-responsive">
		<table>
			<thead>
				<tr>
					<th>Номер поезда</th>
					<th>Название поезда</th>
					<th>Отправление</th>
					<th>Прибытие</th>
					<th>Маршрут</th>
					<th>Статус</th>
				</tr>
			</thead>
			<tbody id="trainScheduleTableBody">

			</tbody>
		</table>
	</div>
</div>

<script>
document.addEventListener("DOMContentLoaded", function() {
    fetchTrainSchedule();
});
</script> 