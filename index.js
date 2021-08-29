let canvas = document.getElementById("canvas");
canvas.height = document.documentElement.clientHeight;
canvas.width = document.documentElement.clientWidth;

let isMobile = "ontouchstart" in document.documentElement;

let ctx = canvas.getContext("2d");
//ctx.strokeStyle = "orange";
ctx.lineWidth = 4;
ctx.lineCap = "round";
let isDrawing = false;
let last;

if (isMobile) {
  canvas.ontouchstart = (e) => {
    last = [e.touches[0].clientX, e.touches[0].clientY];
  };
  canvas.ontouchmove = (e) => {
    drawLine(last[0], last[1], e.touches[0].clientX, e.touches[0].clientY);
    last = [e.touches[0].clientX, e.touches[0].clientY];
  };
} else {
  canvas.onpointermove = (e) => {
    console.log(e.pressure);
    ctx.lineWidth = getLineWidth(e);
    if (isDrawing) {
      drawLine(last[0], last[1], e.clientX, e.clientY);
      last = [e.clientX, e.clientY];
    }
  };

  canvas.onpointerdown = (e) => {
    console.log("down");
    isDrawing = true;
    last = [e.clientX, e.clientY];
  };

  canvas.onpointerup = () => {
    console.log("up");
    isDrawing = false;
  };
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function getLineWidth(e) {
  switch (e.pointerType) {
    case "touch": {
      if (e.width < 10 && e.height < 10) {
        return (e.width + e.height) * 2 + 10;
      } else {
        return (e.width + e.height - 40) / 2;
      }
    }
    case "pen":
      return e.pressure * 8;
    default:
      return e.pressure ? e.pressure * 8 : 4;
  }
}
