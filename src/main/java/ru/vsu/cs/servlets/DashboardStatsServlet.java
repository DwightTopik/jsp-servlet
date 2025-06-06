package ru.vsu.cs.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import ru.vsu.cs.dao.BookingDAO;
import ru.vsu.cs.dao.PassengerDAO;
import ru.vsu.cs.dao.TrainScheduleDAO;

@WebServlet("/getDashboardStats")
public class DashboardStatsServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        int passengerCount = PassengerDAO.getPassengerCount();
        int trainCount = TrainScheduleDAO.getTrainCount();
        int totalBookings = BookingDAO.getTotalBookingsCount();  

                String jsonResponse = "{"
                + "\"totalPassengers\": " + passengerCount + ", "
                + "\"totalTrains\": " + trainCount + ", "
                + "\"totalBookings\": " + totalBookings
                + "}";

        PrintWriter out = response.getWriter();
        out.print(jsonResponse);
        out.flush();
    }
}
