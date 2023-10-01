import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

const DonutChartComponent = () => {
  const [data, setData] = useState([]);

  const svgRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/budget');
        setData(response.data.myBudget);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!data.length) return;

    d3.select(svgRef.current).selectAll('*').remove();

    const width = 750;
    const height = 300;
    const radius = Math.min(width, height) / 2;
    const colors = d3.scaleOrdinal().domain(data.map((d) => d.title)).range(d3.schemeCategory10);

    const svg = d3.select(svgRef.current).append('svg').attr('width', width).attr('height', height);

    const g = svg
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const pie = d3.pie().value((d) => d.budget);

    const arc = d3.arc().innerRadius(radius * 0.55).outerRadius(radius);

    const arcs = g.selectAll('.arc').data(pie(data)).enter().append('g').attr('class', 'arc');

    arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', (d) => colors(d.data.title));

    const labelGroup = svg
      .append('g')
      .attr('transform', `translate(${width - 200},${50})`);

    labelGroup
      .selectAll('.label')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'label')
      .attr('transform', (d, i) => `translate(0,${i * 25})`);

    labelGroup
      .selectAll('.label')
      .append('rect')
      .attr('width', 20)
      .attr('height', 20)
      .attr('fill', (d) => colors(d.title));

    labelGroup
      .selectAll('.label')
      .append('text')
      .attr('x', 30)
      .attr('y', 15)
      .text((d) => `${d.title}: $${d.budget.toFixed(2)}`);

  }, [data]);

  return (
    <div>
      <br /><br /><br />
      <svg
        ref={svgRef}
        width={750}
        height={300}
      ></svg>
      <br /><br /><br />
    </div>
  );
};

export default DonutChartComponent;