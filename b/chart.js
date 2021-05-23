/**
 * Cria pontos de controle para criar curva entre 2 pontos
 * a = [x,y]
 * b = [x,y]
 * Retorna um array com os pontos adicionais
 */
const curve2points = (a, b) => {
  const d = Math.hypot(b[0] - a[0], b[1] - a[1]);   // distancia entre a,b
  const da = d * 0.25;                              // constante distancia entra a e a'
  const db = d * 0.2;                               // constante distancia entra b e b'
  const points = [];
  points.push(a);
  if (b[0] - a[0] >= 0) {
    points.push([a[0] + (da * 0.71), a[1] + (da * 0.71)]); // tilt de 45°
    points.push([b[0] - (db * 0.5), b[1] - (db * 0.87)]);  // tilt de -30°
  } else {
    points.push([a[0] - (da * 0.71), a[1] - (da * 0.71)]); // tilt de -45°
    points.push([b[0] + (db * 0.5), b[1] + (db * 0.87)]);  // tilt de 30°
  }
  points.push(b);
  return points;
}

async function draw() {
  const dimensions = {
    width: 800,
    height: 300,
    margin: {
      top: 50,
      right: 50,
      bottom: 50,
      left: 50
    }
  }
  dimensions.wrapperWidth = dimensions.width + dimensions.margin.left + dimensions.margin.right;
  dimensions.wrapperHeight = dimensions.height + dimensions.margin.top + dimensions.margin.top;

  const wrapper = d3.select("#wrapper")
    .append("svg")
      .attr("viewBox", "0 0 " + dimensions.wrapperWidth + " " + dimensions.wrapperHeight)
      .attr("width", "100%");
  
  const bounds = wrapper.append("g")
    .attr("transform", "translate(" + dimensions.margin.left + ", " + dimensions.margin.top + ")");

  const a = [100, 0];
  const b = [100, dimensions.height];
  const points = curve2points(a, b);
  const stem = d3.line().curve(d3.curveBasis);
  bounds.append("path")
    .attr("d", stem(points))
    .attr("stroke", "black")
    .attr("fill", "none");

  const a2 = [300, 100];
  const b2 = [200, 100];
  const points2 = curve2points(a2, b2);
  bounds.append("path")
    .attr("d", stem(points2))
    .attr("stroke", "black")
    .attr("fill", "none");
}
draw();