var filename = "location1";
    var files = ["location1","location2","location3","location4","location5","location6","location7","location8","location9","location10","location12","location13","location14","location15","location16","location17","location18","location19"];


    var label1 =  d3.select('body').style('background-color',"white")
    .append('text')
    .text('Select Region:')
    .style('margin',"10px")

    var select1 = label1
    .append('select')
    .attr('id','select1')
  	.attr('class','select')
    .on('change',onchange)
    .style('margin',"10px")
    .style('background-color',"aquamarine")

    var options1 = select1
    .selectAll('option')
	.data(files).enter()
	.append('option')
	.text(function (d) { return d; });

    var day = "day1";
    var days = ["day1","day2","day3","day4","day5"];

    var label2 = d3.select('body').style('background-color',"white")
    .append('text')
    .text('Select Day:')
    .style('margin',"10px")

    var select2 = label2
    .append('select')
    .attr('id','select2')
  	.attr('class','select')
    .on('change',onchange)
    .style('margin',"10px")
    .style('background-color',"aquamarine")

    var options2 = select2
    .selectAll('option')
	.data(days).enter()
	.append('option')
	.text(function (d) { return d; });

    var utility = "power";
    var utilities = ["power","sewer_and_water","medical","roads_and_bridges","buildings"];

    var label3 = d3.select('body').style('background-color',"white")
    .append('text')
    .text('Select Utility:')
    .style('margin',"10px")

    var select3 = label3
    .append('select')
    .attr('id','select3')
  	.attr('class','select')
    .on('change',onchange)
    .style('margin',"10px")
    .style('background-color',"aquamarine")

    var options3 = select3
    .selectAll('option')
	.data(utilities).enter()
	.append('option')
	.text(function (d) { return d; });

  function onchange() {
    filename = d3.select('#select1').property('value');
    day = d3.select('#select2').property('value');
    utility = d3.select('#select3').property('value');
    console.log(utility)
    d3.selectAll("svg").remove(); 
    drawscatterplot(filename, day, utility);
  };

  drawscatterplot(filename, day, utility);
  function drawscatterplot(filename,day, utility){
      const xValue = d => d.time;
      const xLabel = 'Time';
      const yValue = d => d[utility];
      const yLabel = 'Damage Reported';
      const margin = {top: 30, right: -10, bottom: 30, left:200};
      var svg = d3.select("body").append("svg").attr('width','1480px').attr('height','1500px')
      const width = 1200
      const height = 550
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;


      const g = svg.append('g')
          .attr('transform', `translate(${margin.left},${margin.top})`);
      const xAxisG = g.append('g')
          .attr('transform', `translate(0, ${innerHeight})`);
      const yAxisG = g.append('g');

    //   xAxisG.append('text')
    //       .attr('class', 'axis-label')
    //       .attr('x',25)
    //       .attr('y', 100)
    //       .attr('transform', 'rotate(90)')
    //       .text(xLabel);

    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("font-size", 24)
    .attr("x", 800)
    .attr("y", 580)
    .text("Time over whole day");

      yAxisG.append('text')
          .attr('class', 'axis-label')
          .attr('x', -innerHeight / 2 -40)
          .attr('y', -45)
          .attr('transform', `rotate(-90)`)
          .style('text-anchor', 'middle')
          .text(yLabel);

      const xScale = d3.scaleTime();
      const yScale = d3.scaleLinear();

      const xAxis = d3.axisBottom()
        .scale(xScale)
        .ticks(96)
        .tickPadding(15)
        .tickSize(-innerHeight);

      const yAxis = d3.axisLeft()
        .scale(yScale)
        .ticks(11)
        .tickPadding(15)
        .tickSize(-innerWidth);

      const row = d => {
        d.time = new Date(d.time);

        if(utility=="power"){
          d.power = +d.power;
        }
        else if(utility == "sewer_and_water"){
          d.sewer_and_water = +d.sewer_and_water;
        }
        else if(utility == "medical"){
          d.medical = +d.medical;
        }
        else if(utility == "roads_and_bridges"){
          d.roads_and_buildings = +d.roads_and_buildings;
        }
        else{
          d.buildings = +d.buildings;
        }
        return d;
      };
    d3.csv(`data/${filename}/${filename+day}.csv`, row, data => {
      xScale
        .domain(d3.extent(data, xValue))
        .range([0, innerWidth])
        .nice();

       yScale
        .domain(d3.extent(data, yValue))
        .range([innerHeight, 0])
        .nice();

      g.selectAll('circle').data(data)
        .enter().append('circle')
          .attr('cx', d => xScale(xValue(d)))
          .attr('cy', d => yScale(yValue(d)))
          .attr('fill-opacity', 1.5)
          .attr('fill', "red")
          .attr('r', 2);

      xAxisG.call(xAxis)
          .selectAll("text")  
          .style("text-anchor", "end")
          .attr("dx", "-.3em")
          .attr("dy", ".10em")
          .attr("transform", "rotate(-90)" );;
      yAxisG.call(yAxis);
    });
  }