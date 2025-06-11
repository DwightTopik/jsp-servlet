package ru.vsu.cs.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import ru.vsu.cs.service.TrainScheduleService;

@WebServlet("/getTrainData")
public class TrainDataServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        List<String> origins = TrainScheduleService.getInstance().getAllOrigins();
        List<String> destinations = TrainScheduleService.getInstance().getAllDestinations();

        StringBuilder json = new StringBuilder();
        json.append("{");

                json.append("\"origins\":[");
        for (int i = 0; i < origins.size(); i++) {
            json.append("\"").append(origins.get(i)).append("\"");
            if (i < origins.size() - 1) json.append(",");
        }
        json.append("],");

                json.append("\"destinations\":[");
        for (int i = 0; i < destinations.size(); i++) {
            json.append("\"").append(destinations.get(i)).append("\"");
            if (i < destinations.size() - 1) json.append(",");
        }
        json.append("]");

        json.append("}");

        PrintWriter out = response.getWriter();
        out.print(json.toString());
        out.flush();
    }
}
