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

/**
 * Cria o ponto da extremidade final de um ramo, dado o ponto inicial do mesmo
 * 
 * @param {Array} stemStartPoint Ponto inicial do ramo no formato [x,y]
 * @param {number} length Tamanho do ramo
 * @param {boolean} inverted Define se o ponto gerado tem um x menor que o inicial
 * @return {Array} Retorna o ponto no formato [x,y]
 */
const createStemEndPoint = (stemStartPoint, length, inverted) => {
  let x = 0;
  if (inverted) {
    x = stemStartPoint[0] + (length * 0.52);
  } else {
    x = stemStartPoint[0] - (length * 0.52);
  }
  const y = stemStartPoint[1] - (length * randomLength(0.4, 0.6));
  return [x, y];
}

const randomLength = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function draw() {
  // Funções de acesso aos atributos dos dados
  const groupAcessor = d => d.grupo;
  const stemStartPointAcessor = d => d.stemStartPoint;
  const stemEndPointAcessor = d => d.stemEndPoint;

  // Recuperação dos dados
  const data = await d3.csv("data.csv");
  const groupsDomain = Array.from(d3.group(data, groupAcessor).keys());

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

  // Escalas
  const stemScale = d3.scaleBand().domain(groupsDomain).range([stemLength, 0]);

  // Cria dados adicionais, úteis para posicionamento das peças
  const groups = groupsDomain.map((d, i) => {
    const startPoint = [
      stem.node().getPointAtLength(stemScale(d)).x,
      stem.node().getPointAtLength(stemScale(d)).y];
    let endpoint;
    if (i === groupsDomain.length - 1) {
      endpoint = startPoint;
    } else {
      endpoint = createStemEndPoint(startPoint, randomLength(140, 145), (i % 2 === 0))
    }
    return {
      grupo: d,
      stemStartPoint: startPoint,
      stemEndPoint: endpoint
    }
  });
  bounds.append("g")
    .selectAll("circle")
    .data(groups)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", "1")
    .attr("cx", d => stemStartPointAcessor(d)[0])
    .attr("cy", d => stemStartPointAcessor(d)[1])
    .attr("r", 5)
    .attr("stroke", "black")
    .attr("fill", "none");
  bounds.append("g")
    .selectAll("circle")
    .data(groups)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", "1")
    .attr("cx", d => stemEndPointAcessor(d)[0])
    .attr("cy", d => stemEndPointAcessor(d)[1])
    .attr("r", 5)
    .attr("stroke", "black")
    .attr("fill", "none");
  bounds.append("g")
    .selectAll("path")
    .data(groups)
    .enter()
    .append("path")
      .attr("d", d => stemLine(curve2points(d.stemStartPoint, d.stemEndPoint)))
      .attr("stroke", "black")
      .attr("fill", "none");
}
draw();