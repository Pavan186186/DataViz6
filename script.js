d3.csv("data/fatal-police-shootings-data.csv").then(function (data) {
    data.forEach(d => {
        d.date = new Date(d.date);
        d.age = +d.age;
    });
    renderleftchart(data);
    render_right_chart(data);
}).catch(function (error) {
    console.error("error loading the data:", error);
});
function renderleftchart(data) {
    const shootings_per_year = d3.rollups(data, v => v.length, d => d.date.getFullYear())
        .filter(([year, count]) => year >= 2015 && year <= 2024)
        .sort((a, b) => a[0] - b[0]);
    const average_shootings = d3.mean(shootings_per_year, d => d[1]);

    const total_incidents = data.length;
    const armed_incidents = data.filter(d => d.armed_with !== 'unarmed' && d.armed_with !== 'undetermined').length;
    const armed_percentage = (armed_incidents / total_incidents) * 100;

    const margin = { top: 40, right: 30, bottom: 40, left: 50 };
    const container = document.getElementById('chart-left');
    const width = container.clientWidth - margin.left - margin.right;
    const height = container.clientHeight - margin.top - margin.bottom;

    const svg = d3.select("#chart-left")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    //

    const defs = svg.append("defs");
    const gradient = defs.append("linearGradient")
        .attr("id", "blue-gradient")
        .attr("x1", "0%")
        .attr("x2", "0%")

        .attr("y1", "0%")

        .attr("y2", "100%");
    gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#3290d0ff")
        .attr("stop-opacity", 0.6);


    gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#3498db")
        .attr("stop-opacity", 0.05);
    const x = d3.scaleLinear()
        .domain(d3.extent(shootings_per_year, d => d[0]))
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, 1200])
        .range([height, 0]);
    svg.append("g")
        .attr("class", "grid")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x)
            .ticks(10)
            .tickSize(-height)
            .tickFormat("")
        )
        .style("stroke-dasharray", "3,3")
        .style("opacity", 0.3);
    svg.append("g")
        .attr("class", "grid")
        .call(d3.axisLeft(y)
            .ticks(5)
            .tickSize(-width)
            .tickFormat("")
        )
        .style("stroke-dasharray", "3,3")
        .style("opacity", 0.3);

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    svg.append("g")
        .call(d3.axisLeft(y));

    const area = d3.area()
        .x(d => x(d[0]))
        .y0(height)
        .y1(d => y(d[1]));

    svg.append("path")
        .datum(shootings_per_year)
        .attr("fill", "url(#blue-gradient)")
        .attr("d", area);

    const line = d3.line()
        .x(d => x(d[0]))
        .y(d => y(d[1]));

    svg.append("path")
        .datum(shootings_per_year)
        .attr("fill", "none")
        .attr("stroke", "#2c3e50")
        .attr("stroke-width", 3)
        .attr("d", line);
    svg.append("line")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", y(average_shootings))
        .attr("y2", y(average_shootings))
        .attr("stroke", "#7f8c8d")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "5,5");

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", y(average_shootings) - 10)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .style("fill", "#7f8c8d")
        .style("font-family", "Inter, sans-serif")
        .style("font-style", "italic")
        .text(`year after year, the numbers hold steady (~${Math.round(average_shootings)})`);

    svg.append("text")
        .attr("x", width - 10)
        .attr("y", 20)
        .attr("text-anchor", "end")
        .style("font-size", "14px")
        .style("fill", "#2c3e50")
        .style("font-family", "Inter, sans-serif")
        .style("font-weight", "bold")
        .text(`in ${Math.round(armed_percentage)}% of cases, officers faced an armed threat`);

    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
    svg.selectAll(".dot")
        .data(shootings_per_year)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", d => x(d[0]))
        .attr("cy", d => y(d[1]))
        .attr("r", 5)
        .attr("fill", "#2c3e50")
        .on("mouseover", function (event, d) {
            d3.select(this).attr("r", 8).attr("fill", "#3498db");
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html(`year: ${d[0]}<br/>shootings: ${d[1]}`)
                .style("left", (event.pageX) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function (d) {
            d3.select(this).attr("r", 5).attr("fill", "#2c3e50");
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("font-family", "Inter, sans-serif")
        .style("fill", "#7f8c8d")
        .text("annual fatalities");
}

function render_right_chart(data) {
    const races = ['W', 'B', 'H'];
    const race_names = { 'W': 'White', 'B': 'Black', 'H': 'Hispanic' };

    const processed_data = races.map(race => {
        const race_data = data.filter(d => d.race === race);
        const total = race_data.length;
        const unarmed = race_data.filter(d => d.armed_with === 'unarmed').length;
        const percentage = (unarmed / total) * 100;
        return {
            race: race,
            race_name: race_names[race],
            percentage: percentage,
            count: unarmed,
            total: total
        };
    });

    const black_percentage = processed_data.find(d => d.race === 'B').percentage;
    const white_percentage = processed_data.find(d => d.race === 'W').percentage;
    const ratio = black_percentage / white_percentage;

    const unarmed_victims = data.filter(d => d.armed_with === 'unarmed' && d.age > 0);
    const youngest_victim = d3.min(unarmed_victims, d => d.age);

    const margin = { top: 60, right: 30, bottom: 40, left: 50 };
    const container = document.getElementById('chart-right');
    const width = container.clientWidth - margin.left - margin.right;
    const height = container.clientHeight - margin.top - margin.bottom;


    const svg = d3.select("#chart-right")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    const defs = svg.append("defs");
    const gradient = defs.append("linearGradient")
        .attr("id", "red-gradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "100%");

    gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#e74c3c")
        .attr("stop-opacity", 0.6);

    gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#e74c3c")
        .attr("stop-opacity", 0.05);

    const x = d3.scaleBand()
        .domain(processed_data.map(d => d.race_name))
        .range([0, width])
        .padding(0.4);

    const y = d3.scaleLinear()
        .domain([0, d3.max(processed_data, d => d.percentage) * 1.4])
        .range([height, 0]);
    svg.append("g")
        .attr("class", "grid")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x)
            .tickSize(-height)
            .tickFormat("")
        )
        .style("stroke-dasharray", "3,3")
        .style("opacity", 0.3);

    svg.append("g")
        .attr("class", "grid")
        .call(d3.axisLeft(y)
            .ticks(5)
            .tickSize(-width)
            .tickFormat("")
        )
        .style("stroke-dasharray", "3,3")
        .style("opacity", 0.3);
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("font-size", "14px")
        .style("font-family", "Inter,sans-serif");
    svg.append("g")
        .call(d3.axisLeft(y).tickFormat(d => d + "%"))
        .selectAll("text")
        .style("font-size", "12px")
        .style("font-family", "Inter,sans-serif");
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
    svg.selectAll(".bar")
        .data(processed_data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.race_name))
        .attr("y", d => y(d.percentage))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.percentage))
        .attr("fill", d => d.race === 'B' ? "url(#red-gradient)" : "#c8ced3ff")
        .attr("stroke", d => d.race === 'B' ? "#af3426ff" : "none")
        .attr("stroke-width", d => d.race === 'B' ? 2 : 0)
        .on("mouseover", function (event, d) {
            d3.select(this).attr("opacity", 0.7);
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html(`${d.race_name}<br/>${d.percentage.toFixed(1)}% unarmed<br/>(${d.count}/${d.total})`)
                .style("left", (event.pageX) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function (d) {
            d3.select(this).attr("opacity", 1);
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });
    svg.selectAll(".label")
        .data(processed_data)
        .enter().append("text")
        .attr("x", d => x(d.race_name) + x.bandwidth() / 2)
        .attr("y", d => y(d.percentage) - 5)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .style("font-weight", "bold")
        .style("font-family", "Inter, sans-serif")
        .text(d => d.percentage.toFixed(1) + "%");
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("font-weight", "bold")
        .style("font-family", "Inter, sans-serif")
        .style("fill", "#7f8c8d")
        .text("% unarmed");




    svg.append("line")
        .attr("x1", x('Black') + x.bandwidth() / 2)
        .attr("x2", x('White') + x.bandwidth() / 2)
        .attr("y1", y(black_percentage) - 30)
        .attr("y2", y(black_percentage) - 30)
        .attr("stroke", "#c0392b")
        .attr("stroke-width", 2);




    svg.append("text")
        .attr("x", (x('Black') + x('White') + x.bandwidth()) / 2)
        .attr("y", y(black_percentage) - 40)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .style("fill", "#c0392b")
        .style("font-weight", "bold")
        .style("font-family", "Inter, sans-serif")
        .text(`${ratio.toFixed(1)}x higher rate for black citizens`);
    svg.append("text")
        .attr("x", width)
        .attr("y", 0)
        .attr("text-anchor", "end")




        .style("font-size", "12px")
        .style("fill", "#c0392b")
        .style("font-weight", "bold")
        .style("font-family", "Inter, sans-serif")
        .text(`a child as young as ${youngest_victim} was lost`);
}
