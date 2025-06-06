// ------------------------------- General -----------------------------------------

const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function() {
	if (this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})

function formatDate(input) {
	const value = input.value.replace(/\D/g, '');
	if (value.length > 0) {
				let day = value.substring(0, 2);
		let month = value.substring(2, 4);
		let year = value.substring(4, 8);

				if (day.length === 2 && parseInt(day) > 31) day = '31';
		if (month.length === 2 && parseInt(month) > 12) month = '12';

				let formattedValue = '';
		if (day) formattedValue += day;
		if (month) formattedValue += (day ? '/' : '') + month;
		if (year) formattedValue += (month ? '/' : '') + year;

		input.value = formattedValue;
	}
}


document.addEventListener("DOMContentLoaded", function() {
	const mainContent = document.getElementById("main-content");
	const sidebarLinks = document.querySelectorAll("#sidebar .side-menu.top li a");

		function loadContent(page) {
		fetch(page)
			.then(response => response.text())
			.then(data => {
				mainContent.innerHTML = data;

											})
			.catch(error => console.error("Error loading content:", error));
	}

		loadContent("dashboard.jsp");

		sidebarLinks.forEach(link => {
		link.addEventListener("click", function(event) {
			event.preventDefault();
			sidebarLinks.forEach(item => item.parentElement.classList.remove("active"));
			this.parentElement.classList.add("active");

			const page = this.getAttribute("data-page");
			if (page) {
								const jspPage = page.replace('.html', '.jsp');
				loadContent(jspPage);
			}
		});
	});
});



function getDashboardStats() {
	fetch('getDashboardStats')
		.then(response => response.json())
		.then(data => {
			let passengerElement = document.getElementById("totalPassengers");
			let trainElement = document.getElementById("totalTrains");
			let ticketElement = document.getElementById("totalTickets");

			if (passengerElement && trainElement && ticketElement) {
				passengerElement.textContent = data.totalPassengers;
				trainElement.textContent = data.totalTrains;
				ticketElement.textContent = data.totalBookings; 			} else {
				console.error("Ошибка: Один или несколько элементов (totalPassengers, totalTrains, totalTickets) не найдены.");
			}
		})
		.catch(error => console.error("Ошибка при получении статистики:", error));
}

function getLatestBookings() {
	fetch('getLatestBookings')
		.then(response => response.json())
		.then(data => {
			let tableBody = document.querySelector(".order table tbody");
			tableBody.innerHTML = "";
			data.forEach(booking => {
				let statusClass = getStatusClass(booking.status);
				let row = `<tr>
                            <td><img src="https://placehold.co/600x400/png">
                                <p>${booking.passengerName}</p></td>
                            <td>${booking.travelDate}</td>
                            <td><span class="status ${statusClass}">${booking.status}</span></td>
                          </tr>`;
				tableBody.innerHTML += row;
			});
		})
		.catch(error => console.error("Error fetching latest bookings:", error));
}

function getStatusClass(status) {
	switch (status.toLowerCase()) {
		case "confirmed":
		case "подтверждено":
			return "completed";
		case "pending":
		case "ожидание":
			return "pending";
		case "processing":
		case "в обработке":
			return "process";
		case "cancelled":
		case "отменено":
			return "cancelled";
		default:
			return "pending"; 	}
}

function searchPNR() {
	let pnr = document.getElementById("pnrInput").value.trim();
	if (pnr === "") {
		alert("Пожалуйста, введите действительный номер бронирования.");
		return;
	}

	fetch(`getBookingByPNR?pnr=${pnr}`)
		.then(response => response.json())
		.then(data => {
			if (data.error) {
				document.getElementById("pnrResult").innerHTML = `<p class="error">${data.error}</p>`;
			} else {
				document.getElementById("pnrResult").innerHTML = `
                    <div class="booking-card">
                        <h3>Номер бронирования: ${data.pnr}</h3>
                        <p><strong>Пассажир:</strong> ${data.passengerName}</p>
                        <p><strong>Поезд:</strong> ${data.trainNo} - ${data.trainName}</p>
                        <p><strong>Дата поездки:</strong> ${data.travelDate}</p>
                        <p><strong>Класс:</strong> ${data.trainClass}</p>
                        <p><strong>Место:</strong> ${data.seatNumber} (${data.seatPreference})</p>
                        <p><strong>Питание:</strong> ${data.foodPreference}</p>
                        <p><strong>Статус:</strong> <span class="status ${data.status.toLowerCase()}">${data.status}</span></p>
                        <p><strong>Цена:</strong> ₽${data.price}</p>
                    </div>`;
			}
		})
		.catch(error => {
			console.error("Ошибка при получении данных бронирования:", error);
			document.getElementById("pnrResult").innerHTML = `<p class="error">Ошибка при получении данных. Попробуйте снова.</p>`;
		});
}




document.addEventListener("DOMContentLoaded", function() {
	const mainContent = document.getElementById("main-content");

		function setupModalListeners() {
		const modal = document.getElementById("passengerModal");
		const addPassengerBtn = document.getElementById("addPassengerBtn");
		const closeBtn = document.querySelector(".close-btn");

		if (modal && addPassengerBtn && closeBtn) {
						addPassengerBtn.addEventListener("click", function() {
				modal.style.display = "block";
			});

						closeBtn.addEventListener("click", function() {
				modal.style.display = "none";
			});

						window.addEventListener("click", function(event) {
				if (event.target === modal) {
					modal.style.display = "none";
				}
			});
		}
	}

		const observer = new MutationObserver(function() {
		setupModalListeners();
	});

	observer.observe(mainContent, { childList: true, subtree: true });
});


function fetchPassengers(searchTerm = "", filterGender = "", sortOption = "") {
	fetch("getPassengers")
		.then(response => response.json())
		.then(data => {
			let tableBody = document.getElementById("passengerTableBody");
			if (!tableBody) {
				console.error("Ошибка: элемент passengerTableBody не найден.");
				return;
			}

			tableBody.innerHTML = "";
			let lowerCaseSearchTerm = searchTerm.toLowerCase().trim();

						let filteredData = data.filter(passenger => {
				let matchesSearch = passenger.username.toLowerCase().includes(lowerCaseSearchTerm) || passenger.fullName.toLowerCase().includes(lowerCaseSearchTerm);
				let matchesGender = filterGender === "" || passenger.gender === filterGender;
				return matchesSearch && matchesGender;
			});

						if (sortOption === "nameAsc") {
				filteredData.sort((a, b) => a.fullName.localeCompare(b.fullName));
			} else if (sortOption === "nameDesc") {
				filteredData.sort((a, b) => b.fullName.localeCompare(a.fullName));
			} else if (sortOption === "ageAsc") {
				filteredData.sort((a, b) => a.age - b.age);
			} else if (sortOption === "ageDesc") {
				filteredData.sort((a, b) => b.age - a.age);
			}

						if (filteredData.length === 0) {
				tableBody.innerHTML = "<tr><td colspan='9' style='text-align:center;'>Пассажиры не найдены</td></tr>";
			} else {
				filteredData.forEach(passenger => {
					let row = `<tr>
                        <td>${passenger.username}</td>
                        <td>${passenger.fullName}</td>
                        <td>${passenger.age}</td>
                        <td>${passenger.dob}</td>
                        <td>${passenger.gender}</td>
                        <td>${passenger.address}</td>
                        <td>${passenger.contact}</td>
                        <td>${passenger.idProof}</td>
                        <td>
                            <button class="edit-btn" onclick="editPassenger(${passenger.id})">✏️ Изменить</button>
                            <button class="delete-btn" onclick="deletePassenger(${passenger.id})">🗑️ Удалить</button>
                        </td>
                    </tr>`;
					tableBody.innerHTML += row;
				});
			}
		})
		.catch(error => console.error("Ошибка при получении данных о пассажирах:", error));
}


function attachSearchListeners() {
	let searchInput = document.querySelector("input[type='search']");
	let searchButton = document.querySelector(".search-btn");
	const filterGender = document.getElementById("filterGender");
	const sortOptions = document.getElementById("sortOptions");
	const passengerForm = document.getElementById("passengerForm");

	if (searchInput && searchButton) {
		searchButton.addEventListener("click", function(event) {
			event.preventDefault();
			fetchPassengers(searchInput.value.trim());
		});

		searchInput.addEventListener("input", function() {
			if (this.value.trim() === "") {
				fetchPassengers(); 			}
		});
	} else {
		console.error("Search input or button not found. Ensure passenger list is loaded before searching.");
	}

	if (filterGender || sortOptions) {
				filterGender.addEventListener("change", function() {
			fetchPassengers(searchInput.value.trim(), filterGender.value, sortOptions.value);
		});

				sortOptions.addEventListener("change", function() {
			fetchPassengers(searchInput.value.trim(), filterGender.value, sortOptions.value);
		});

	} else {
		console.error("Filter and sort option not found. Ensure passenger list is loaded before searching.");
	}

	if (passengerForm) {
		passengerForm.addEventListener("submit", function(event) {
			event.preventDefault(); 			handlePassengerFormSubmit(event);
		});
	} else {
		console.error("Passenger form not found. Ensure passenger list is loaded before searching.");
	}

}

function deletePassenger(passengerId) {
	if (confirm("Вы уверены, что хотите удалить этого пассажира?")) {
		fetch("deletePassenger", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: `id=${passengerId}`
		})
			.then(response => response.json())
			.then(data => {
				if (data.success) {
					alert("Пассажир успешно удален!");
					fetchPassengers(); 				} else {
					alert("Ошибка: " + data.message);
				}
			})
			.catch(error => console.error("Ошибка при удалении пассажира:", error));
	}
}

// Function to handle the form submission
function handlePassengerFormSubmit(event) {
	event.preventDefault();

	const form = document.getElementById("passengerForm");
	const formData = new FormData(form);
	const params = new URLSearchParams();

	// Convert FormData to URL parameters
	for (const [key, value] of formData.entries()) {
		params.append(key, value);
	}

	// Check if it's an update (hidden ID field exists)
	const isUpdate = form.querySelector("input[name='id']") !== null;
	const endpoint = isUpdate ? "updatePassenger" : "addPassenger";

	fetch(endpoint, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body: params.toString()
	})
		.then(response => response.json())
		.then(data => {
			if (data.success) {
				alert(isUpdate ? "Пассажир успешно обновлен!" : "Пассажир успешно добавлен!");
				document.getElementById("passengerModal").style.display = "none";
				fetchPassengers(); // Refresh the passenger list
			} else {
				alert("Ошибка: " + data.message);
			}
		})
		.catch(error => console.error("Ошибка при " + (isUpdate ? "обновлении" : "добавлении") + " пассажира:", error));
}

// Function to edit passenger details
function editPassenger(passengerId) {
	// Fetch passenger data
	fetch(`getPassengerById?id=${passengerId}`)
		.then(response => response.json())
		.then(passenger => {
			// Set form title to Edit mode
			document.getElementById("modalTitle").textContent = "Изменить данные пассажира";

			// Get the form and fill it with passenger data
			const form = document.getElementById("passengerForm");

			// Add a hidden ID field if updating
			let idField = form.querySelector("input[name='id']");
			if (!idField) {
				idField = document.createElement("input");
				idField.type = "hidden";
				idField.name = "id";
				form.appendChild(idField);
			}
			idField.value = passenger.id;

			// Fill other fields
			form.querySelector("input[name='username']").value = passenger.username;
			form.querySelector("input[name='fullName']").value = passenger.fullName;
			form.querySelector("input[name='age']").value = passenger.age;
			form.querySelector("input[name='dob']").value = passenger.dob;
			form.querySelector("select[name='gender']").value = passenger.gender;
			form.querySelector("input[name='address']").value = passenger.address;
			form.querySelector("input[name='contact']").value = passenger.contact;
			form.querySelector("select[name='idProof']").value = passenger.idProof;

			// Show the modal
			document.getElementById("passengerModal").style.display = "block";
		})
		.catch(error => {
			console.error("Ошибка при получении данных пассажира:", error);
			alert("Не удалось загрузить данные пассажира. Пожалуйста, попробуйте снова.");
		});
}

// Function to update passenger details
function updatePassenger() {
	event.preventDefault(); // Prevent default form submission

	let formData = new FormData(document.getElementById("passengerForm"));

	fetch("updatePassenger", {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: new URLSearchParams(formData).toString()
	})
		.then(response => response.json())
		.then(data => {
			if (data.status === "success") {
				alert("Passenger updated successfully!");
				document.getElementById("passengerModal").style.display = "none";
				fetchPassengers(); // Refresh the list
			} else {
				alert("Error updating passenger: " + (data.message || "Unknown error"));
			}
		})
		.catch(error => console.error("❌ Fetch Error:", error));
}


// ------------------------------- Train Schedule -----------------------------------------

// Dynamically Fetch Train Schedule
function fetchTrainSchedule() {
	fetch("getTrainSchedule")
		.then(response => response.json())
		.then(data => {
			let tableBody = document.getElementById("trainScheduleTableBody");
			if (!tableBody) {
				console.error("Error: trainScheduleTableBody element not found.");
				return;
			}

			tableBody.innerHTML = ""; // Clear existing data

			data.forEach(train => {
				let row = `<tr>
                    <td>${train.trainNo}</td>
                    <td>${train.trainName}</td>
                    <td>${train.departureTime}</td>
                    <td>${train.arrivalTime}</td>
                    <td>${train.route}</td>
                    <td><span class="status on-time">On Time</span></td>
                </tr>`;
				tableBody.innerHTML += row;
			});
		})
		.catch(error => console.error("Error fetching train schedule:", error));
}


// ------------------------------- Ticket Booking -----------------------------------------

let selectedTrain = null;
let selectedPassengers = [];

// Fetch origins and destinations dynamically
function loadTrainData() {
	// Fetch train data
	fetch('getTrainData')
		.then(response => response.json())
		.then(data => {
			// Populate origin dropdown
			const originSelect = document.getElementById('origin');
			originSelect.innerHTML = '<option value="">Выберите станцию отправления</option>';

			data.origins.forEach(origin => {
				originSelect.innerHTML += `<option value="${origin}">${origin}</option>`;
			});

			// Populate destination dropdown
			const destinationSelect = document.getElementById('destination');
			destinationSelect.innerHTML = '<option value="">Выберите станцию назначения</option>';

			data.destinations.forEach(destination => {
				destinationSelect.innerHTML += `<option value="${destination}">${destination}</option>`;
			});
		})
		.catch(error => console.error('Ошибка при получении данных поездов:', error));
}

function searchTrains() {
	const origin = document.getElementById('origin').value;
	const destination = document.getElementById('destination').value;
	const travelDate = document.getElementById('travelDate').value;

	if (!origin || !destination || !travelDate) {
		alert('Пожалуйста, выберите станцию отправления, станцию назначения и дату поездки.');
		return;
	}

	// Преобразование даты из формата дд/мм/гггг в стандартный формат для API
	const dateParts = travelDate.split('/');
	let formattedDate = travelDate;
	if (dateParts.length === 3) {
		formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`; // гггг-мм-дд для API
	}

	fetch(`searchTrain?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelDate=${encodeURIComponent(formattedDate)}`)
		.then(response => response.json())
		.then(data => {
			const trainTable = document.getElementById('trainTable');
			trainTable.innerHTML = '';

			if (data.length === 0) {
				trainTable.innerHTML = '<tr><td colspan="5">Поезда не найдены для выбранного маршрута.</td></tr>';
				return;
			}

			data.forEach(train => {
				// Create rows for each available class and price
				for (const [trainClass, price] of Object.entries(train.ticketPrices)) {
					trainTable.innerHTML += `
						<tr>
							<td>${train.trainNo}</td>
							<td>${train.trainName}</td>
							<td>${trainClass}</td>
							<td>₽${price}</td>
							<td><button class="select-btn" onclick="selectTrain(${train.trainNo}, '${train.trainName}', '${trainClass}', ${price})">Выбрать</button></td>
						</tr>
					`;
				}
			});
		})
		.catch(error => console.error('Ошибка при поиске поездов:', error));
}

function selectTrain(trainNo, trainName, trainClass, price) {
	// Store selected train details
	window.selectedTrain = {
		trainNo,
		trainName,
		trainClass,
		price,
		travelDate: document.getElementById('travelDate').value
	};

	// Update UI to show selected train
	document.getElementById('selectedTrainDetails').innerHTML = `
		<strong>Поезд №:</strong> ${trainNo} - ${trainName}<br>
		<strong>Класс:</strong> ${trainClass}<br>
		<strong>Дата поездки:</strong> ${document.getElementById('travelDate').value}<br>
		<strong>Цена:</strong> ₽${price}
	`;

	// Hide train selection and show passenger selection section
	document.getElementById('searchTrainSection').style.display = 'none';
	document.getElementById('selectPassengerSection').style.display = 'block';

	// Show booking details section
	document.getElementById('availableTrainsSection').style.display = 'none';
	document.getElementById('bookingDetailsSection').style.display = 'block';

	// Clear passenger list if any
	document.getElementById('passengerList').innerHTML = '';

	// Initialize selected passengers array
	window.selectedPassengers = [];

	// Attach passenger search listener
	attachPassengerSearchListener();
}

function resetTicketBookingUI() {
	// Reset train search section
	document.getElementById('searchTrainSection').style.display = 'block';
	document.getElementById('selectPassengerSection').style.display = 'none';

	// Reset train list section
	document.getElementById('availableTrainsSection').style.display = 'block';
	document.getElementById('bookingDetailsSection').style.display = 'none';

	// Clear selections
	window.selectedTrain = null;
	window.selectedPassengers = [];
}

function addPassenger() {
	const passengerId = document.querySelector('#passengerResults .passenger-item.selected')?.dataset.id;
	const passengerName = document.querySelector('#passengerResults .passenger-item.selected')?.textContent;

	if (!passengerId) {
		alert('Пожалуйста, выберите пассажира.');
		return;
	}

	const seatPreference = document.getElementById('seatPreference').value || 'Без предпочтений';
	const foodPreference = document.getElementById('foodPreference').value || 'Без предпочтений';

	// Add to selected passengers
	window.selectedPassengers.push({
		id: passengerId,
		name: passengerName,
		seatPreference,
		foodPreference
	});

	// Update UI
	const passengerList = document.getElementById('passengerList');
	passengerList.innerHTML += `
		<li>
			${passengerName} - Место: ${seatPreference}, Питание: ${foodPreference}
			<button onclick="removePassenger(${window.selectedPassengers.length - 1})">Удалить</button>
		</li>
	`;

	// Clear selection
	document.getElementById('passengerSearch').value = '';
	document.getElementById('passengerResults').innerHTML = '';
	document.getElementById('seatPreference').value = '';
	document.getElementById('foodPreference').value = '';
}

function confirmBooking() {
	if (!window.selectedTrain) {
		alert('Пожалуйста, выберите поезд.');
		return;
	}

	if (!window.selectedPassengers || window.selectedPassengers.length === 0) {
		alert('Пожалуйста, добавьте хотя бы одного пассажира.');
		return;
	}

	// Prepare booking data
	const bookingData = {
		trainNo: window.selectedTrain.trainNo,
		trainName: window.selectedTrain.trainName,
		trainClass: window.selectedTrain.trainClass,
		price: window.selectedTrain.price,
		travelDate: window.selectedTrain.travelDate,
		passengers: window.selectedPassengers
	};

	// Send booking request
	fetch('confirmBooking', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(bookingData)
	})
	.then(response => response.json())
	.then(data => {
		if (data.success) {
			alert(`Бронирование успешно! Номер бронирования: ${data.pnr}`);
			resetTicketBookingUI();
			loadAllBookings(); // Refresh bookings table
		} else {
			alert(`Ошибка: ${data.message}`);
		}
	})
	.catch(error => {
		console.error('Ошибка при подтверждении бронирования:', error);
		alert('Произошла ошибка при бронировании. Пожалуйста, попробуйте снова.');
	});
}

// Function to Attach Search Listener After the Ticket Bookings Page Loads
function attachPassengerSearchListener() {
	const searchInput = document.getElementById('passengerSearch');
	const resultsContainer = document.getElementById('passengerResults');

	searchInput.addEventListener('input', function() {
		const searchTerm = this.value.trim();

		if (searchTerm.length < 2) {
			resultsContainer.innerHTML = '';
			return;
		}

		fetch(`searchPassenger?term=${encodeURIComponent(searchTerm)}`)
			.then(response => response.json())
			.then(data => {
				resultsContainer.innerHTML = '';

				if (data.length === 0) {
					resultsContainer.innerHTML = '<p>Пассажиры не найдены</p>';
					return;
				}

				data.forEach(passenger => {
					const item = document.createElement('div');
					item.className = 'passenger-item';
					item.textContent = passenger.fullName;
					item.dataset.id = passenger.id;

					item.addEventListener('click', function() {
						// Remove selection from all items
						document.querySelectorAll('.passenger-item').forEach(
							el => el.classList.remove('selected')
						);

						// Add selection to clicked item
						this.classList.add('selected');
					});

					resultsContainer.appendChild(item);
				});
			})
			.catch(error => console.error('Ошибка при поиске пассажира:', error));
	});
}

function loadAllBookings() {
	fetch('getAllBookings')
		.then(response => response.json())
		.then(data => {
			const bookingTable = document.getElementById('bookingTable');
			bookingTable.innerHTML = '';

			if (data.length === 0) {
				bookingTable.innerHTML = '<tr><td colspan="8" style="text-align:center;">Бронирования не найдены</td></tr>';
				return;
			}

			data.forEach(booking => {
				bookingTable.innerHTML += `
					<tr>
						<td>${booking.pnr}</td>
						<td>${booking.passengerName}</td>
						<td>${booking.trainNo} - ${booking.trainName}</td>
						<td>${booking.travelDate}</td>
						<td>${booking.trainClass}</td>
						<td>${booking.seatNumber || 'Не назначено'}</td>
						<td><span class="status ${booking.status.toLowerCase()}">${booking.status}</span></td>
						<td><button class="delete-btn" onclick="deleteBooking('${booking.pnr}')">Отменить</button></td>
					</tr>
				`;
			});
		})
		.catch(error => console.error('Ошибка при загрузке бронирований:', error));
}

function deleteBooking(pnr) {
	if (confirm('Вы уверены, что хотите отменить это бронирование?')) {
		fetch('deleteBooking', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: `pnr=${pnr}`
		})
		.then(response => response.json())
		.then(data => {
			if (data.success) {
				alert('Бронирование успешно отменено!');
				loadAllBookings(); // Refresh the bookings table
			} else {
				alert('Ошибка: ' + data.message);
			}
		})
		.catch(error => console.error('Ошибка при отмене бронирования:', error));
	}
}



// ------------------------------- My Profile -----------------------------------------

// Function to preview selected image
function previewImage(event) {
	const reader = new FileReader();
	reader.onload = function() {
		const output = document.getElementById('profilePic');
		output.src = reader.result;
	};
	reader.readAsDataURL(event.target.files[0]);
}

// Function to update profile details (Demo)
function updateProfile() {
	const profileData = {
		fullName: document.getElementById('fullName').value,
		email: document.getElementById('email').value,
		phone: document.getElementById('phone').value,
		gender: document.getElementById('gender').value,
		address: document.getElementById('address').value
	};

	// Обновить отображаемую информацию
	document.getElementById('displayName').textContent = profileData.fullName;
	document.getElementById('displayEmail').textContent = profileData.email;
	document.getElementById('displayPhone').textContent = profileData.phone;

	alert('Профиль успешно обновлен!');
}