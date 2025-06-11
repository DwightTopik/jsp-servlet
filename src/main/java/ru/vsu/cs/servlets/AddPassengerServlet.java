package ru.vsu.cs.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import ru.vsu.cs.model.Passenger;
import ru.vsu.cs.service.PassengerService;

@WebServlet("/addPassenger")
public class AddPassengerServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");

				String username = request.getParameter("username");
		String fullName = request.getParameter("fullName");
		int age = Integer.parseInt(request.getParameter("age"));
		String dob = request.getParameter("dob");
		String gender = request.getParameter("gender");
		String address = request.getParameter("address");
		String contact = request.getParameter("contact");
		String idProof = request.getParameter("idProof");

				Passenger newPassenger = new Passenger(0, username, fullName, age, dob, gender, address, contact, idProof);

				boolean success = PassengerService.getInstance().addPassenger(newPassenger);

				StringBuilder json = new StringBuilder();
		json.append("{");
		json.append("\"status\":\"").append(success ? "success" : "failure").append("\"");
		json.append("}");

		PrintWriter out = response.getWriter();
		out.print(json.toString());
		out.flush();
	}
}
