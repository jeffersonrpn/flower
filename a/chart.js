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

  // Scales
  const petal = d3.line().curve(d3.curveBasisClosed);
  // const points = [[5,25],[22,6],[60,40],[70,95],[20, 56],[14, 36]];
  const petalPoints1 = [[4,4],[20,6],[56,20],[80,80],[42,58],[0,28],[22,26],[0,18]];
  const petalPoints0 = [[0,0],[12,6],[56,20],[82,80],[50,62],[22,46],[0,20]];
  const petalPoints3 = [[0,0],[26,4],[56,20],[85,80],[46,58],[10,40],[22,32],[8,32],[8,22],[16,20],[0,16]];

  const petal1 = bounds.append("g")
    .attr("transform", "translate(0, 0)")
    .append("path")
      .attr("d", petal(petalPoints1))
      .attr("stroke", "black")
      .attr("fill", "none");
  const petal2 = bounds.append("g")
  .attr("transform", "translate(0, 120)")
  .append("path")
    .attr("d", petal(petalPoints0))
    .attr("stroke", "black")
    .attr("fill", "none");
  const petal3 = bounds.append("g")
    .attr("transform", "translate(0, 240)")
    .append("path")
      .attr("d", petal(petalPoints3))
      .attr("stroke", "black")
      .attr("fill", "none");

  const petal4 = bounds.append("g")
    .attr("transform", "translate(120, 0) rotate(45 68 68)")
    .append("path")
      .attr("d", petal(petalPoints1))
      .attr("stroke", "black")
      .attr("fill", "none");
  const petal5 = bounds.append("g")
  .attr("transform", "translate(120, 120) rotate(45 68 68)")
  .append("path")
    .attr("d", petal(petalPoints0))
    .attr("stroke", "black")
    .attr("fill", "none");
  const petal6 = bounds.append("g")
    .attr("transform", "translate(120, 240) rotate(45 68 68)")
    .append("path")
      .attr("d", petal(petalPoints3))
      .attr("stroke", "black")
      .attr("fill", "none");

  const petal7 = bounds.append("g")
    .attr("transform", "translate(" + (240 + 137) + ", 0) scale(-1 1)")
    .append("path")
      .attr("d", petal(petalPoints1))
      .attr("stroke", "black")
      .attr("fill", "none");
  const petal8 = bounds.append("g")
  .attr("transform", "translate(" + (240 + 140) + ", 120) scale(-1 1)")
  .append("path")
    .attr("d", petal(petalPoints0))
    .attr("stroke", "black")
    .attr("fill", "none");
  const petal9 = bounds.append("g")
    .attr("transform", "translate(" + (240 + 144) + ", 240) scale(-1 1)")
    .append("path")
      .attr("d", petal(petalPoints3))
      .attr("stroke", "black")
      .attr("fill", "none");

  // bounds.append("g")
  //   .attr("transform", "translate(0, 0)")
  //   .selectAll("circle")
  //     .data(petalPoints1)
  //     .join("circle")
  //       .attr("cx", d => d[0])
  //       .attr("cy", d => d[1])
  //       .attr("r", 3)
  //       .attr("fill", "none")
  //       .attr("stroke", "black")
  //       .attr("stroke-width", "1");

  bounds.append("g")
    .attr("transform", "translate(0, 0)")
      .append("circle")
        .attr("cx", 70)
        .attr("cy", 70)
        .attr("r", 3)
        .attr("fill", "red")
        .attr("stroke-width", "none");

  bounds.append("g")
    .attr("transform", "translate(0, 120)")
      .append("circle")
        .attr("cx", 70)
        .attr("cy", 70)
        .attr("r", 3)
        .attr("fill", "red")
        .attr("stroke-width", "none");

  bounds.append("g")
    .attr("transform", "translate(0, 240)")
      .append("circle")
        .attr("cx", 72)
        .attr("cy", 68)
        .attr("r", 3)
        .attr("fill", "red")
        .attr("stroke-width", "none");

  bounds.append("g")
    .attr("transform", "translate(120, 0) rotate(45 68 68)")
      .append("circle")
        .attr("cx", 68)
        .attr("cy", 68)
        .attr("r", 3)
        .attr("fill", "blue")
        .attr("stroke-width", "none");

  bounds.append("g")
    .attr("transform", "translate(120, 120) rotate(45 68 68)")
      .append("circle")
        .attr("cx", 70)
        .attr("cy", 70)
        .attr("r", 3)
        .attr("fill", "blue")
        .attr("stroke-width", "none");

  bounds.append("g")
    .attr("transform", "translate(120, 240) rotate(45 68 68)")
      .append("circle")
        .attr("cx", 72)
        .attr("cy", 68)
        .attr("r", 3)
        .attr("fill", "blue")
        .attr("stroke-width", "none");

  bounds.append("g")
    .attr("transform", "translate(240, 0) rotate(45 68 68)")
      .append("circle")
        .attr("cx", 68)
        .attr("cy", 68)
        .attr("r", 3)
        .attr("fill", "green")
        .attr("stroke-width", "none");

  bounds.append("g")
    .attr("transform", "translate(240, 120) rotate(45 68 68)")
      .append("circle")
        .attr("cx", 70)
        .attr("cy", 70)
        .attr("r", 3)
        .attr("fill", "green")
        .attr("stroke-width", "none");

  bounds.append("g")
    .attr("transform", "translate(240, 240) rotate(45 72 68)")
      .append("circle")
        .attr("cx", 72)
        .attr("cy", 68)
        .attr("r", 3)
        .attr("fill", "green")
        .attr("stroke-width", "none");

}
draw();