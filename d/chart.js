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
  const angleA = randomNum(40, 50);
  const angleB = randomNum(70, 80);
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
 * Gera um n??mero aleat??rio entre o min e max
 * 
 * @param {number} min
 * @param {number} max
 * @return {number} Retorna um n??mero aleat??rio entre min e max
 */
const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Gera uma curva com o desenho de uma p??tala que podem ser de 3 tipos
 * 
 * @param {number} Tipo da p??tala
 * @return {Array} Retorna conjunto de pontos para desenho da p??tala
 */
const getPetalPoints = (type) => {
  switch (type) {
    case 0:
      // P??tala com 1 gomo
      // return [[4, 4], [20, 6], [56, 20], [80, 80], [42, 58], [0, 28], [22, 26], [0, 18]];
      return [[4,4],[20,6],[56,20],[80,70],[80,80],[78,80],[42,68],[0,28],[18,26],[0,18]];
    case 1:
      // P??tala com 3 gomos
      // return [[0, 0], [26, 4], [56, 20], [85, 80], [46, 58], [10, 40], [22, 32], [8, 32], [8, 22], [16, 20], [0, 16]];
      return [[0,0],[26,4],[56,20],[80,70],[80,80],[78,80],[42,68],[10,40],[18,32],[8,32],[8,22],[12,20],[0,16]];
    case 2:
    default:
      // P??tala com 0 gomos
      // return [[0, 0], [12, 6], [56, 20], [82, 80], [50, 62], [22, 46], [0, 20]];
      return [[0,0],[12,6],[56,20],[80,70],[80,80],[78,80],[50,68],[22,46],[0,20]];
  }
}

/**
 * Cada p??tala tem um tamanho distinto e um ponto de apoio ao caule.
 * Esse shift serve para posicionar adequadamente a p??tala, dado que o ponto
 * normal de trasforma????o ?? o topo-esquerdo.
 * 
 * Ponto de transforma????o normal
 * .______
 * |     |
 * |     |
 * |____.|
 *      Ponto onde o path precisa estar
 * 
 * @param {number} type Tipo da p??tala
 * @return {Array} Retorna o comprimento nos eixos x e y para reposi????o da p??tala
 */
const getPetalShift = (type) => {
  switch (type) {
    case 0:
      return [80, 80];
    case 1:
      return [80, 80];
    case 2:
    default:
      return [80, 80];
  }
}

/**
 * Cria uma transforma????o para a p??tala dada a ordem de disposi????o.
 * 
 * @param {Array} point Coordenadas de onde deve-se posicionar a p??tala no formato [x, y]
 * @param {Array} shift Dimens??es que ser??o subtra??das de point no formato [width, height]
 * @param {number} order Ordem de disposi????o da p??tala: 1, 2 ou 3
 * @return {string} Retorna o transforma????o pra ser usada no atributo "transform"
 */
const getPetalRotation = (point, shift, order) => {
  switch (order) {
    case "2":
      return `translate(${point[0] - shift[0] + 160}, ${point[1] - shift[1]}) scale(-1 1)`;
    case "3":
      return `translate(${point[0] - shift[0]}, ${point[1] - shift[1]}) rotate(45 ${shift[0]} ${shift[1]})`;
    case "1":
    default:
      return `translate(${point[0] - shift[0]}, ${point[1] - shift[1]})`;
  }
}

async function draw() {

  // Fun????es de acesso aos atributos dos dados
  const nameAcessor = d => d.nome;
  const attr1Acessor = d => d.alimentacao;              // Respons??vel pelo design da p??tala
  const groupAcessor = d => d.grupo;                    // Respons??vel pela posi????o da p??tala
  const orderAcessor = d => d.ordem;                    // Respons??vel pela rota????o da p??tala
  const stemStartPointAcessor = d => d.stemStartPoint;
  const stemEndPointAcessor = d => d.stemEndPoint;

  // Recupera????o dos dados
  const data = await d3.csv("data.csv");
  const groupsDomain = Array.from(d3.group(data, groupAcessor).keys());
  const attr1Domain = Array.from(d3.group(data, attr1Acessor).keys());

  // Configura????o do desenho
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

  // Defini????o da ??rea de pintura
  const wrapper = d3.select("#wrapper")
    .append("svg")
    .attr("viewBox", "0 0 " + dimensions.wrapperWidth + " " + dimensions.wrapperHeight)
    .attr("width", "100%");

  const bounds = wrapper.append("g")
    .attr("transform", "translate(" + dimensions.margin.left + ", " + dimensions.margin.top + ")");

  // Cria tronco principal que servir?? de base para posicionar os grupos de p??talas
  const a = [randomNum(dimensions.width * 0.4, dimensions.width * 0.5), 0];
  const b = [dimensions.width * 0.5, dimensions.height];
  const points = curve2points(a, b);
  const stemLine = d3.line().curve(d3.curveBasis);
  const stem = bounds.append("g")
    .attr("id", "mainStem")
    .append("path")
    .attr("d", stemLine(points))
    .attr("stroke", "black")
    .attr("fill", "none");
  const stemLength = stem.node().getTotalLength();

  // Escalas
  const stemScale = d3.scaleBand().domain(groupsDomain).range([stemLength, 0]);
  const attr1Scale = d3.scaleOrdinal().domain(attr1Domain).range([0, 1, 2]);
  const petalLinePath = d3.line().curve(d3.curveBasisClosed);

  // Cria dados adicionais, ??teis para posicionamento das pe??as
  const groups = groupsDomain.map((d, i) => {
    const startPoint = [
      stem.node().getPointAtLength(stemScale(d)).x,
      stem.node().getPointAtLength(stemScale(d)).y];
    let endpoint;
    if (i === groupsDomain.length - 1) {
      endpoint = startPoint;
    } else {
      endpoint = createStemEndPoint(startPoint, randomNum(250, 300), (i % 2 === 0))
    }
    return {
      grupo: d,
      stemStartPoint: startPoint,
      stemEndPoint: endpoint
    }
  });
  data.map(d => {
    d.coordinates = groups.find(g => groupAcessor(g) === groupAcessor(d));
  });

  // Desenha ramos
  bounds.append("g")
    .attr("id", "stems")
    .selectAll("path")
    .data(groups)
    .enter()
    .append("path")
    .attr("d", d => stemLine(curve2points(stemStartPointAcessor(d), stemEndPointAcessor(d))))
    .attr("stroke", "black")
    .attr("fill", "none");

  // Desenhos baseados nos dados
  const petalsG = bounds.append("g").attr("class", "petals");
  // Desenha p??talas
  petalsG.selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "petal")
    .attr("transform", d => getPetalRotation(
      stemEndPointAcessor(d.coordinates),
      getPetalShift(attr1Scale(attr1Acessor(d))),
      orderAcessor(d)))
    .append("path")
    .attr("d", d => petalLinePath(getPetalPoints(attr1Scale(attr1Acessor(d)))))
    .attr("stroke", "black")
    .attr("fill", "none");

  // Desenha nomes
  // petalsG.selectAll("text")
  //   .data(data)
  //   .enter()
  //   .append("text")
  //   .attr("x", d => stemEndPointAcessor(d.coordinates)[0])
  //   .attr("y", d => stemEndPointAcessor(d.coordinates)[1])
  //   .text(d => nameAcessor(d));

  // bounds.append("g")
  //   .selectAll("circle")
  //   .data(groups)
  //   .enter()
  //   .append("circle")
  //   .attr("r", 5)
  //   .attr("fill", "none")
  //   .attr("stroke", "black")
  //   .attr("stroke-width", "1")
  //   .attr("cx", d => stemStartPointAcessor(d)[0])
  //   .attr("cy", d => stemStartPointAcessor(d)[1])
  //   .attr("r", 5)
  //   .attr("stroke", "black")
  //   .attr("fill", "none");
  // bounds.append("g")
  //   .selectAll("circle")
  //   .data(groups)
  //   .enter()
  //   .append("circle")
  //   .attr("r", 5)
  //   .attr("fill", "none")
  //   .attr("stroke", "black")
  //   .attr("stroke-width", "1")
  //   .attr("cx", d => stemEndPointAcessor(d)[0])
  //   .attr("cy", d => stemEndPointAcessor(d)[1])
  //   .attr("r", 5)
  //   .attr("stroke", "black")
  //   .attr("fill", "none");
}
draw();