<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">


<link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css'
	rel='stylesheet'>


<link rel="stylesheet"
	href="style.css?v=<%=System.currentTimeMillis()%>">
<link rel="stylesheet"
	href="style1.css?v=<%=System.currentTimeMillis()%>">
<link rel="stylesheet"
	href="ticket.css?v=<%=System.currentTimeMillis()%>">

<title>Управление пассажирами</title>
<style>
#sidebar {
    width: 220px;
    position: fixed;
    z-index: 100;
}
#content {
    width: calc(100% - 220px);
    margin-left: 0;
    left: 220px;
    overflow-x: hidden;
}
#sidebar.hide ~ #content {
    width: calc(100% - 60px);
    left: 60px;
}

@media screen and (max-width: 1200px) {
    #content {
        width: calc(100% - 220px);
    }
    .table-data {
        flex-direction: column;
    }
    .table-data > div {
        width: 100%;
        margin-bottom: 20px;
    }
}

@media screen and (max-width: 768px) {
    #sidebar {
        width: 60px;
    }
    #content {
        width: calc(100% - 60px);
        left: 60px;
    }
    #sidebar .text {
        display: none;
    }
    #sidebar.hide ~ #content {
        width: 100%;
        left: 0;
    }
}

.table-data table {
    width: 100%;
    table-layout: fixed;
}
.table-data th, .table-data td {
    word-break: break-word;
}
</style>
</head>
<body>

	<section id="sidebar">
		<a href="#" class="brand"> <i class='bx bxs-train bx-lg'></i> <span
			class="text">ПУ</span>
		</a>
		<ul class="side-menu top">
			<li class="active"><a href="#" data-page="dashboard.jsp"> <i
					class='bx bxs-dashboard bx-sm'></i> <span class="text">Панель управления</span>
			</a></li>
			<li><a href="#" data-page="passenger-list.jsp"> <i
					class='bx bxs-user-check bx-sm'></i> <span class="text">Список пассажиров</span>
			</a></li>
			<li><a href="#" data-page="train-schedule.jsp"> <i
					class='bx bxs-train bx-sm'></i> <span class="text">Расписание поездов</span>
			</a></li>
			<li><a href="#" data-page="ticket-bookings.jsp"> <i
					class='bx bxs-coupon bx-sm'></i> <span class="text">Бронирование билетов</span>
			</a></li>
			<li><a href="#" data-page="profile.jsp"> <i
					class='bx bxs-user-detail bx-sm'></i> <span class="text">Мой профиль</span>
			</a></li>
		</ul>

		<ul class="side-menu bottom">
			<li><a href="#" class="logout"> <i
					class='bx bx-power-off bx-sm bx-burst-hover'></i> <span
					class="text">Выход</span>
			</a></li>
		</ul>
	</section>


	<section id="content">

		<nav>
			<form action="#">

			</form>

			<input type="checkbox" class="checkbox" id="switch-mode" hidden /> <label
				class="swith-lm" for="switch-mode"> <i class="bx bxs-moon"></i>
				<i class="bx bx-sun"></i>
				<div class="ball"></div>
			</label>


			<div class="profile" id="profileIcon">
				<img src="https://placehold.co/600x400/png" alt="Профиль">
			</div>
		</nav>

		<main id="main-content">

		</main>

	</section>


	<script src="script.js?v=<%=System.currentTimeMillis()%>"></script>

</body>
</html>