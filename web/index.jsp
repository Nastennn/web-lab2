<%@ page import="main.Point" %>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <title>Lab 2 </title>
    <link rel="stylesheet" href="style.css">
    <script src="check.js"></script>
</head>
<body onload="drawCanvas(2)">
<header>
    <p class="header">Зырянова Анастасия Денисовна</p>
    <p class="header">P3200</p>
    <p class="header">200030</p>
</header>
<div class="block">
    <canvas id="canvas" onclick="clickOnArea()"></canvas>
    <div id="support"></div>
    <form method="get" action="control" onsubmit="return getDataAndDrawPoint()">
        <div class="chosen-options">
            <div class="x">
                <label for="x"> Выберите Х:</label>
                <input type="text" name="x" id="x" placeholder="-5..5">

            </div>
            <div class="y" id="y">
                <label> Выберите Y: </label>
                <input type="radio" name="y" id="y-3" value="-3"><label for="y-3">-3</label>
                <input type="radio" name="y" id="y-2" value="-2"><label for="y-2">-2</label>
                <input type="radio" name="y" id="y-1" value="-1"><label for="y-1">-1</label>
                <input type="radio" name="y" id="y0" value="0"><label for="y0">0</label>
                <input type="radio" name="y" id="y1" value="1"><label for="y1">1</label>
                <input type="radio" name="y" id="y2" value="2"><label for="y2">2</label>
                <input type="radio" name="y" id="y3" value="3"><label for="y3">3</label>
                <input type="radio" name="y" id="y4" value="4"><label for="y4">4</label>
                <input type="radio" name="y" id="y5" value="5"><label for="y5">5</label>
            </div>
            <div class="r">
                <label> Выберите R: </label>
                <button type="button" onclick="drawCanvas(1)" value="1" id="r1">1</button>
                <button type="button" onclick="drawCanvas(1.5)" value="1.5" id="r15"> 1.5</button>
                <button type="button" onclick="drawCanvas(2)" value="2" id="r2">2</button>
                <button type="button" onclick="drawCanvas(2.5)" value="2.5" id="r25"> 2.5</button>
                <button type="button" onclick="drawCanvas(3)" value="3" id="r3">3</button>
                <input type="hidden" id="r" name="r" value="">
            </div>
            <div>
                <input type="submit" value="Проверить" id="submit">
                <input type="reset" value="Сбросить" id="reset" onclick="return clearForm(this.form);">
            </div>
        </div>
    </form>
</div>

<div class="block" name="response" id="response"></div>

<script type="text/javascript"
        src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script type="text/javascript"
        src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.min.js"></script>

<script>
    initTable();
    let elX = document.getElementById("x");
    elX.addEventListener("input", checkX, false);
    let yArray = document.getElementsByName("y");
    for (let elY of yArray) {
        elY.onclick = checkY;
    }
    let xValid = false;
    let yValid = false;

    function clearForm() {
        let xField = document.getElementById("x");
        xField.classList.remove("warning-text");
    }

    $(document).ready(function () {
        $("#submit").click(() => {
                return !getDataAndDrawPoint();
            }
        );
    });
</script>
</body>
</html>