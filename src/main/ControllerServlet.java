package main;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ControllerServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setHeader("Content-Type", "text/html; charset=UTF-8");
            try {
                request.getServletContext().getRequestDispatcher("/WEB-INF/checking").forward(request, response);
            } catch (Exception e){
                request.getServletContext().getRequestDispatcher("/WEB-INF/response.jsp").forward(request, response);
            }
        response.getWriter().close();
    }
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }
}
