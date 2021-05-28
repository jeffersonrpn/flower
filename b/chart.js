/**
 * Cria pontos de controle para criar curva entre 2 pontos
 * a = [x,y]
 * b = [x,y]
 * Retorna um array com os pontos adicionais
 */
const curve2points = (a, b) => {
  const d = Math.hypot(b[0] - a[0], b[1] - a[1]);   // distancia entre a,b
  const distanceA = d * 0.25;                       // constante distancia entra a e a'
  const distanceB = d * 0.2;                        // constante distancia entra b e b'
  const angle = 45;
  const points = [];
  let aX, aY, bX, bY = 0;
  if (b[0] >= a[0]) {
    aX = a[0] + (distanceA * Math.sin((angle * Math.PI) / 180));
    aY = a[1] + (distanceA * Math.cos((angle * Math.PI) / 180));
    bX = b[0] - (distanceB * Math.cos((angle * Math.PI) / 180));
    bY = b[1] - (distanceB * Math.sin((angle * Math.PI) / 180));
  } else {
    aX = a[0] - (distanceA * Math.sin((angle * Math.PI) / 180));
    aY = a[1] + (distanceA * Math.cos((angle * Math.PI) / 180));
    bX = b[0] + (distanceB * Math.cos((angle * Math.PI) / 180));
    bY = b[1] - (distanceB * Math.sin((angle * Math.PI) / 180));
  }
  points.push(a);
  points.push([aX, aY]);
  points.push([bX, bY]);
  points.push(b);
  return points;
}

async function draw() {
  const dimensions = {
    width: 800,
    height: 800,
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
  bounds.append("g")
    .selectAll("circle")
    .data(points)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", "1")
    .attr("cx", d => d[0])
    .attr("cy", d => d[1])
    .attr("r", 5)
    .attr("stroke", "black")
    .attr("fill", "none");

  const a2 = [300, 100];
  const b2 = [600, 100];
  const points2 = curve2points(a2, b2);
  bounds.append("path")
    .attr("d", stem(points2))
    .attr("stroke", "black")
    .attr("fill", "none");
  bounds.append("g")
    .selectAll("circle")
    .data(points2)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", "1")
    .attr("cx", d => d[0])
    .attr("cy", d => d[1])
    .attr("r", 5)
    .attr("stroke", "black")
    .attr("fill", "none");

  const a3 = [600, 400];
  const b3 = [300, 200];
  const points3 = curve2points(a3, b3);
  bounds.append("path")
    .attr("d", stem(points3))
    .attr("stroke", "black")
    .attr("fill", "none");
  bounds.append("g")
    .selectAll("circle")
    .data(points3)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", "1")
    .attr("cx", d => d[0])
    .attr("cy", d => d[1])
    .attr("r", 5)
    .attr("stroke", "black")
    .attr("fill", "none");
}
draw();