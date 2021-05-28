/**
 * Cria pontos de controle para criar curva entre 2 pontos
 * 
 * @param {Array} a Ponto inical da curva no formato [x,y]
 * @param {Array} b Ponto final da curva no formato[x,y]
 * @return {Array} Retorna um array com os doispontos adicionais
 */
 const curve2points = (a, b) => {
  const d = Math.hypot(b[0] - a[0], b[1] - a[1]);   // distancia entre a,b
  const distanceA = d * 0.25;                       // constante distancia entra a e a'
  const distanceB = d * 0.2;                        // constante distancia entra b e b'
  const angleA = 45;
  const angleB = 75;
  const points = [];
  let aX, aY, bX, bY = 0;
  if (b[1] < a[1] && b[0] > a[0]) {
    aX = a[0] + (distanceA * Math.sin((angleA * Math.PI) / 180));
    aY = a[1] - (distanceA * Math.cos((angleA * Math.PI) / 180));
    bX = b[0] - (distanceB * Math.cos((angleB * Math.PI) / 180));
    bY = b[1] + (distanceB * Math.sin((angleB * Math.PI) / 180));
  } else if (b[1] < a[1] && b[0] < a[0]) {
    aX = a[0] - (distanceA * Math.sin((angleA * Math.PI) / 180));
    aY = a[1] - (distanceA * Math.cos((angleA * Math.PI) / 180));
    bX = b[0] + (distanceB * Math.cos((angleB * Math.PI) / 180));
    bY = b[1] + (distanceB * Math.sin((angleB * Math.PI) / 180));
  } else if (b[0] >= a[0]) {
    aX = a[0] + (distanceA * Math.sin((angleA * Math.PI) / 180));
    aY = a[1] + (distanceA * Math.cos((angleA * Math.PI) / 180));
    bX = b[0] - (distanceB * Math.cos((angleB * Math.PI) / 180));
    bY = b[1] - (distanceB * Math.sin((angleB * Math.PI) / 180));
  } else {
    aX = a[0] - (distanceA * Math.sin((angleA * Math.PI) / 180));
    aY = a[1] + (distanceA * Math.cos((angleA * Math.PI) / 180));
    bX = b[0] + (distanceB * Math.cos((angleB * Math.PI) / 180));
    bY = b[1] - (distanceB * Math.sin((angleB * Math.PI) / 180));
  }
  points.push(a);
  points.push([aX, aY]);
  points.push([bX, bY]);
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
  const angle = randomNum(30, 45);
  if (inverted) {
    x = stemStartPoint[0] + length * Math.cos((angle * Math.PI) / 180);
  } else {
    x = stemStartPoint[0] - length * Math.cos((angle * Math.PI) / 180);
  }
  const y = stemStartPoint[1] - length * Math.sin((angle * Math.PI) / 180);
  return [x, y];
}

/**
 * Gera um número aleatório entre o min e max
 * 
 * @param {number} min
 * @param {number} max
 * @return {number} Retorna um número aleatório entre min e max
 */
const randomNum = (min, max) => {
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
  const a = [randomNum(dimensions.width * 0.4, dimensions.width * 0.5), 0];
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
      endpoint = createStemEndPoint(startPoint, randomNum(190, 210), (i % 2 === 0))
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