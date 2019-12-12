package main;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;

@WebServlet(name = "main.AreaCheckServlet", urlPatterns = "/WEB-INF/checking")
public class AreaCheckServlet extends HttpServlet {
    private ServletConfig config;
    public boolean isGoodPoint;

    @Override
    public void init(ServletConfig config) {
        this.config = config;
    }

    @Override
    public void destroy() {
    }

    @Override
    public ServletConfig getServletConfig() {
        return config;
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ArrayList<Point> list = (ArrayList<Point>) request.getSession().getAttribute("list");
        if (list == null) {
            list = new ArrayList<>();
            request.getSession().setAttribute("list", list);
        }
        if (check(request, response)) {
            double x = Double.parseDouble(request.getParameter("x"));
            double y = Double.parseDouble(request.getParameter("y"));
            double r = Double.parseDouble(request.getParameter("r"));
            if ((x <= 5 && x >= -5) && (y >= -3 && y <= 5) && (r >= 1 && r <= 3)) {
                Point p = new Point(x, y, r, new Date(), isGoodPoint);
                list.add(p);
                response.setContentType("text/html");
                request.getServletContext().getRequestDispatcher("/WEB-INF/response.jsp").forward(request, response);
                return;
            }
        }
        isGoodPoint = false;
        Point p = new Point(isGoodPoint);
        list.add(p);
        response.setContentType("text/html");
        request.getServletContext().getRequestDispatcher("/WEB-INF/response.jsp").forward(request, response);
        list.remove(p);
    }

    public boolean check(HttpServletRequest request, HttpServletResponse response) {
        isGoodPoint = true;
        String xString = request.getParameter("x");
        String yString = request.getParameter("y");
        String rString = request.getParameter("r");
        if ((xString == null) || (yString == null) || (rString == null)) {
            isGoodPoint = false;
            return isGoodPoint;
        }
        xString = xString.replace(",", ".");
        if (xString.equals("") || yString.equals("") || rString.equals("")) {
            isGoodPoint = false;
            return isGoodPoint;
        }
        if (xString.matches("^[+-]?\\d+([.,]?\\d+)?$") && yString.matches("^[+-]?\\d+([.,]?\\d+)?$") && rString.matches("^\\d+([.,]?\\d+)?$")) {

            isGoodPoint = true;

        } else {
            isGoodPoint = false;
        }
        return isGoodPoint;
    }


    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.sendRedirect("control");
    }


}
