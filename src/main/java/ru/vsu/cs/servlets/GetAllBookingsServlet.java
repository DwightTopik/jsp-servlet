package ru.vsu.cs.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import ru.vsu.cs.model.Booking;
import ru.vsu.cs.service.BookingService;

@WebServlet("/getAllBookings")
public class GetAllBookingsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("application/json");
		PrintWriter out = response.getWriter();

		List<Booking> bookings = BookingService.getInstance().getAllBookings();

				StringBuilder json = new StringBuilder();
		json.append("[");
		for (int i = 0; i < bookings.size(); i++) {
			Booking b = bookings.get(i);
			json.append("{")
				.append("\"pnr\":\"").append(b.getPnr()).append("\",")
				.append("\"passengerId\":").append(b.getPassengerId()).append(",")
				.append("\"passengerName\":\"").append(b.getPassengerName()).append("\",")
				.append("\"trainNo\":\"").append(b.getTrainNo()).append("\",")
				.append("\"trainName\":\"").append(b.getTrainName()).append("\",")
				.append("\"travelDate\":\"").append(b.getTravelDate()).append("\",")
				.append("\"trainClass\":\"").append(b.getTrainClass()).append("\",")
				.append("\"seat\":\"").append(b.getSeat()).append("\",")
				.append("\"seatNumber\":\"").append(b.getSeatNumber()).append("\",")
				.append("\"seatPreference\":\"").append(b.getSeatPreference()).append("\",") 
				.append("\"foodPreference\":\"").append(b.getFoodPreference()).append("\",")
				.append("\"status\":\"").append(b.getStatus()).append("\",")
				.append("\"price\":").append(b.getPrice())
				.append("}");
			if (i < bookings.size() - 1) {
				json.append(",");
			}
		}
		json.append("]");

		out.write(json.toString());
	}
}
