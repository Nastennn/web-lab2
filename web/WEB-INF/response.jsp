<%@ page import="java.util.ArrayList" %>
<%@ page import="main.Point" %>
<%--
  Created by IntelliJ IDEA.
  User: user
  Date: 29.11.2019
  Time: 7:17
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <title>Lab 2 </title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/style.css">
</head>

<body>
<%
    ArrayList<Point> points = (ArrayList<Point>) request.getSession().getAttribute("list");
    if(points == null){ %>
        <p>Не надо шалить с URL. </p>
   <% }else{ %>
<div>
    <table>
        <tbody>
        <% boolean isColContainsSmthWrong = false;
            for (Point point : points) {
                if (!point.isNumber()) {
                    isColContainsSmthWrong = true;
                }
            }
            if(isColContainsSmthWrong){
        %>
        <img src="${pageContext.request.contextPath}/1-82.jpg" alt="am i a joke to you?"/>
        <%} else { %>
        <tr>
            <td align='center' style="border: 1px solid black;"><b>X</b></td>
            <td align='center' style="border: 1px solid black;"><b>Y</b></td>
            <td align='center' style="border: 1px solid black;"><b>R</b></td>
            <td align='center' style="border: 1px solid black;"><b>Попадание</b></td>
            <td align='center' style="border: 1px solid black;"><b>Время</b></td>
        </tr>
        <%
                for(Point point:points){
        %>
        <script>
                drawPoint(<%=point.isCorrect() %>, <%=point.getX() %>, <%=point.getY() %>, <%=point.getR() %>);
        </script>
        <tr>
            <td><%= point.getX()%>
            </td>
            <td><%= point.getY()%>
            </td>
            <td><%= point.getR()%>
            </td>
            <td><%= point.isCorrect()%>
            </td>
            <td><%= point.getTime()%>
            </td>
        </tr>
        <% } }
        %>

        </tbody>

    </table>

</div>
<%} %>
</body>
</html>
