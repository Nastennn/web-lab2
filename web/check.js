function getDataAndDrawPoint() {
    let x;
    let y;
    let r;
    let dataFromURL = getUrlVars();
    if (dataFromURL > 0) {
        [x, y, r] = getUrlVars();
    } else {
        x = getXFromForm();
        y = getYFromForm();
        r = rad;
    }
    if (checkX(x) && checkY(y)) {
        drawPoint(document.getElementById("canvas").getContext('2d'), 120 * x / r + 150, 150 - 120 * y, rad);
        saveSession(x, y, r);
        request(x, y, r);
        return true;
    } else {
        return false;
    }
}

function getXFromForm() {
    let elX = document.getElementById('x');
    elX.setCustomValidity("");
    let x = elX.value.replace(",", ".");
    return x;
}

function getYFromForm() {
    let yArray = document.getElementsByName("y");
    let y;
    for (let elY of yArray) {
        if (elY.checked) {
            y = elY.value;
            break;
        }
    }
    return y;
}


function checkX(x) {
    elX.setCustomValidity("");
    let isXValid = true;
    if (x === '') {
        elX.setCustomValidity("Введите Х.");
        isXValid = false;
    } else if (/[^0-9,.+-]/.test(x)) {
        elX.setCustomValidity("В поле Х должны быть введенны цифры.");
        isXValid = false;
    } else if (!/^(\+?(([0-4]([.,]\d+)?)|5([.,]0+)?))$|(-(([0-4]([.,]\d+)?)|(5([,.]0+)?)))$/.test(x)) {
        elX.setCustomValidity("В Х введено значение, не входящие в интервал (-5; 5). ");
        isXValid = false;
    }
    return isXValid;
}

function checkY(y) {
    let elY = document.getElementById("y-3");
    elY.setCustomValidity("");
    let isYValid = true;
    if (!ySelected()) {
        elY.setCustomValidity("Выберите Y.");
        isYValid = false;
    }
    return isYValid;
}

function getUrlVars() {
    let vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function ySelected() {
    let first = document.getElementById("y-3");
    let second = document.getElementById("y-2");
    let third = document.getElementById("y-1");
    let forth = document.getElementById("y0");
    let fifth = document.getElementById("y1");
    let sixth = document.getElementById("y2");
    let seventh = document.getElementById("y3");
    let eighth = document.getElementById("y4");
    let ninth = document.getElementById("y5");
    return first.checked || second.checked || third.checked || forth.checked || fifth.checked || sixth.checked || seventh.checked || eighth.checked || ninth.checked;
}

let rad;

function drawCanvas(R) {
    let canvas, ctx;
    rad = R;
    document.getElementById("r").value = rad;
    try {
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext('2d');
    } catch (e) {
        alert("Ваш браузер не поддерживает элемент HTML5 Canvas.");
        document.getElementById("support").innerHTML =
            "<br><br>" +
            "<img src='area.jpg' alt='Область' width='420' height='380'>";
        return;
    }
    canvas.height = 300;
    canvas.width = 300;
    ctx.fillStyle = '#3355ff';
    ctx.beginPath();
    ctx.moveTo(150, 90);
    ctx.lineTo(210, 150);
    ctx.lineTo(150, 150);
    ctx.fill();
    ctx.arc(150, 150, 120, 0.5 * Math.PI, Math.PI, false);
    ctx.lineTo(270, 150);
    ctx.lineTo(270, 270);
    ctx.lineTo(150, 270);
    ctx.fill();
    ctx.strokeStyle = '#000000'; // меняем цвет рамки
    ctx.strokeRect(150, 0, 0, 300);
    ctx.strokeRect(0, 150, 300, 0);
    ctx.moveTo(150, 0);
    ctx.lineTo(146, 10);
    ctx.moveTo(150, 0);
    ctx.lineTo(154, 10);
    ctx.moveTo(300, 150);
    ctx.lineTo(290, 146);
    ctx.moveTo(300, 150);
    ctx.lineTo(290, 154);
    ctx.moveTo(30, 145);
    ctx.lineTo(30, 155);
    ctx.moveTo(90, 145);
    ctx.lineTo(90, 155);
    ctx.moveTo(210, 145);
    ctx.lineTo(210, 155);
    ctx.moveTo(270, 145);
    ctx.lineTo(270, 155);
    ctx.moveTo(145, 30);
    ctx.lineTo(155, 30);
    ctx.moveTo(145, 90);
    ctx.lineTo(155, 90);
    ctx.moveTo(145, 210);
    ctx.lineTo(155, 210);
    ctx.moveTo(145, 270);
    ctx.lineTo(155, 270);
    ctx.stroke();
    ctx.strokeText("-" + R / 2, 90, 140, 20);
    ctx.strokeText("-" + R, 30, 140, 20);
    ctx.strokeText(`${R / 2}`, 210, 140, 20);
    ctx.strokeText(R, 270, 140, 20);
    ctx.strokeText(R, 160, 33, 20);
    ctx.strokeText(R / 2, 160, 93, 20);
    ctx.strokeText("-" + R / 2, 160, 213, 20);
    ctx.strokeText("-" + R, 160, 273, 20);
    ctx.strokeText("x", 290, 140, 20);
    ctx.strokeText("y", 160, 10, 20);
    ctx.closePath();

    initPoints();
}


function clickOnArea() {
    let canvas = document.getElementById("canvas");
    let boundRect = canvas.getBoundingClientRect();
    let left = boundRect.left;
    let top = boundRect.top;

    let event = window.event;
    let x = event.clientX - left;
    let y = event.clientY - top;
    let r = rad;
    drawPoint(canvas.getContext('2d'), x, y, r);
    request((x - 150) / 120 * r, (150 - y) / 120 * r, r);
}

function drawPoint(context, x, y, r) {
    if (!isInArea((x - 150) / 120 * r, (150 - y) / 120 * r, r)) {
        context.fillStyle = "red";
    } else {
        context.fillStyle = "green";
    }
    context.beginPath();
    context.strokeStyle = "black";
    context.arc(x, y, 3, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
}

function isInArea(x, y, r) {
    let isInArea = false;
    if ((x >= 0 && y <= 0) && (x <= r && y >= -r)) {
        isInArea = true;
    } else if ((x <= 0 && y <= 0) && (Math.pow(x, 2) + Math.pow(y, 2) <= (Math.pow(r, 2)))) {
        isInArea = true;
    } else if ((y >= 0 && x >= 0) && (y <= (-x + r / 2))) {
        isInArea = true;
    }
    return isInArea;
}

function request(x, y, r) {
    saveSession(x, y, r);
    $.ajax({
        type: 'get',
        url: 'control',
        data: {x, y, r},
        response: 'text'
    }).done((data) => {
        document.getElementById("response").innerHTML = data;
    }).fail((error) => {
        alert("Error: " + error.message);
    });

}

function saveSession(x, y, r) {
    let point = {
        x,
        y,
        r,
        date: new Date(),
        isInArea: isInArea(x, y, r)
    };
    let points = [];
    let pointsStr = sessionStorage.getItem("points");
    if (pointsStr != null) {
        points = JSON.parse(pointsStr);
    }
    points.push(point);
    //addRow(x,y,r,point.date, point.isInArea);
    sessionStorage.setItem("points", JSON.stringify(points));
}

function addRow(x, y, r, date, isInArea) {
    document.getElementById("response").innerHTML += "<tr>\n" +
        "                    <td align='center' style=\"border: 1px solid black;\"><b>" + x + "</b></td>\n" +
        "                    <td align='center' style=\"border: 1px solid black;\"><b>" + y + "</b></td>\n" +
        "                    <td align='center' style=\"border: 1px solid black;\"><b>" + r + "</b></td>\n" +
        "                    <td align='center' style=\"border: 1px solid black;\"><b>" + date + "</b></td>\n" +
        "                    <td align='center' style=\"border: 1px solid black;\"><b>" + isInArea + "</b></td>\n" +
        "                </tr>";

}

function initPoints() {
    let points = [];
    let pointsStr = sessionStorage.getItem("points");
    if (pointsStr != null) {
        points = JSON.parse(pointsStr);
        for (let point of points) {
            drawPoint(document.getElementById("canvas").getContext('2d'), 120 * point.x / point.r + 150, 150 - 120 * point.y / point.r, rad);
        }
    }

}

function initTable() {
    let points = [];
    let pointsStr = sessionStorage.getItem("list");
    if (pointsStr != null) {
        points = JSON.parse(pointsStr);
        for (let point of points) {
            addRow(point.x, point.y, point.r, point.date, point.isInArea);
        }
    }

}