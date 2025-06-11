package ru.vsu.cs.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import ru.vsu.cs.service.PassengerService;

@WebServlet("/deletePassenger")
public class DeletePassengerServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");

				int id = Integer.parseInt(request.getParameter("id"));

				boolean success = PassengerService.getInstance().deletePassenger(id);

				StringBuilder json = new StringBuilder();
		json.append("{");
		json.append("\"status\":\"").append(success ? "success" : "failure").append("\"");
		json.append("}");

		PrintWriter out = response.getWriter();
		out.print(json.toString());
		out.flush();
	}
}
