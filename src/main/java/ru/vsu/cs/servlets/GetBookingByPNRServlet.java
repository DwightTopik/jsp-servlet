package ru.vsu.cs.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import ru.vsu.cs.model.Booking;
import ru.vsu.cs.service.BookingService;

@WebServlet("/getBookingByPNR")
public class GetBookingByPNRServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        String pnr = request.getParameter("pnr");
        if (pnr == null || pnr.isEmpty()) {
            out.write("{\"error\": \"PNR number is required.\"}");
            return;
        }

        Booking booking = BookingService.getInstance().getBookingByPNR(pnr);
        if (booking == null) {
            out.write("{\"error\": \"No booking found for this PNR.\"}");
        } else {
            String json = String.format(
                "{\"pnr\": \"%s\", \"passengerName\": \"%s\", \"trainNo\": \"%s\", \"trainName\": \"%s\", \"travelDate\": \"%s\", \"trainClass\": \"%s\", \"seatNumber\": \"%s\", \"seatPreference\": \"%s\", \"foodPreference\": \"%s\", \"status\": \"%s\", \"price\": %.2f}",
                booking.getPnr(), booking.getPassengerName(), booking.getTrainNo(), booking.getTrainName(),
                booking.getTravelDate(), booking.getTrainClass(), booking.getSeatNumber(), booking.getSeatPreference(),
                booking.getFoodPreference(), booking.getStatus(), booking.getPrice()
            );
            out.write(json);
        }
    }
}
