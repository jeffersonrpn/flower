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
  // Funções de acesso aos atributos dos dados
  const groupAcessor = d => d.grupo;

  // Recuperação dos dados
  const data = await d3.csv("data.csv");
  const groups = Array.from(d3.group(data, groupAcessor).keys());
  
  // Configuração do desenho
  const dimensions = {
    width: 800,
    height: 800,
    margin: {
      top: 200,
      right: 50,
      bottom: 50,
      left: 50
    }
  }
  dimensions.wrapperWidth = dimensions.width + dimensions.margin.left + dimensions.margin.right;
  dimensions.wrapperHeight = dimensions.height + dimensions.margin.top + dimensions.margin.top;

  // Definição da área de pintura
  const wrapper = d3.select("#wrapper")
    .append("svg")
      .attr("viewBox", "0 0 " + dimensions.wrapperWidth + " " + dimensions.wrapperHeight)
      .attr("width", "100%");
  
  const bounds = wrapper.append("g")
    .attr("transform", "translate(" + dimensions.margin.left + ", " + dimensions.margin.top + ")");

  
  // Cria tronco principal que servirá de base para posicionar os grupos de pétalas
  const a = [dimensions.width * 0.5, 0];
  const b = [dimensions.width * 0.5, dimensions.height];
  const points = curve2points(a, b);
  const stemLine = d3.line().curve(d3.curveBasis);
  const stem = bounds.append("path")
    .attr("d", stemLine(points))
    .attr("stroke", "black")
    .attr("fill", "none");
  const stemLength = stem.node().getTotalLength();

  // Scales
  const stemScale = d3.scaleBand().domain(groups).range([stemLength, 0]);

  bounds.append("g").append("circle").attr("r", 5).attr("fill", "none").attr("stroke", "black").attr("stroke-width", "1")
      .attr("cx", stem.node().getPointAtLength(stemScale("A")).x)
      .attr("cy", stem.node().getPointAtLength(stemScale("A")).y)
      .attr("r", 5)
      .attr("stroke", "black")
      .attr("fill", "none");
  bounds.append("g").append("circle").attr("r", 5).attr("fill", "none").attr("stroke", "black").attr("stroke-width", "1")
      .attr("cx", stem.node().getPointAtLength(stemScale("B")).x)
      .attr("cy", stem.node().getPointAtLength(stemScale("B")).y)
      .attr("r", 5)
      .attr("stroke", "black")
      .attr("fill", "none");
  bounds.append("g").append("circle").attr("r", 5).attr("fill", "none").attr("stroke", "black").attr("stroke-width", "1")
      .attr("cx", stem.node().getPointAtLength(stemScale("C")).x)
      .attr("cy", stem.node().getPointAtLength(stemScale("C")).y)
      .attr("r", 5)
      .attr("stroke", "black")
      .attr("fill", "none");
  bounds.append("g").append("circle").attr("r", 5).attr("fill", "none").attr("stroke", "black").attr("stroke-width", "1")
      .attr("cx", stem.node().getPointAtLength(stemScale("D")).x)
      .attr("cy", stem.node().getPointAtLength(stemScale("D")).y)
      .attr("r", 5)
      .attr("stroke", "black")
      .attr("fill", "none");
}
draw();