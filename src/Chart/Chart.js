import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Chart } from 'chart.js/auto';

const ChartComponent = () => {
  const [dataSource, setDataSource] = useState({
    datasets: [
      {
        data: [],
      },
    ],
    labels: [],
  });

  const chartRef = useRef(null);

  useEffect(() => {
    const createChart = () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const ctx = document.getElementById('myChart').getContext('2d');
      chartRef.current = new Chart(ctx, {
        type: 'pie',
        data: dataSource,
      });
    };

    const getBudget = () => {
      axios.get('http://localhost:3000/budget').then(function (res) {
        const newDataSource = { ...dataSource };

        for (var i = 0; i < res.data.myBudget.length; i++) {
          newDataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
          newDataSource.labels[i] = res.data.myBudget[i].title;
        }

        setDataSource(newDataSource);
        createChart();
      });
    };

    getBudget();
  }, []);

  return (
    <div>
      <br /><br /><br />
      <canvas
        id="myChart"
        height={400}
        width={750}
        style={{
          minWidth: '40px',
          maxWidth: '800px',
          minHeight: '40px',
          maxHeight: '400px',
        }}
      ></canvas>
      <br /><br /><br />
    </div>
  );
};

export default ChartComponent;