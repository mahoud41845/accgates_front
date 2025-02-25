import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const DonutChart = () => {
    const options = {
        chart: {
            type: 'pie',
            backgroundColor: null,
        },
        title: {
            text: 'حالة الدفع',
            style: {
                color: 'var(--text-color)',
                fontSize: '20px',
                fontWeight: 'bold',
            },
        },
        plotOptions: {
            pie: {
                innerSize: '80%',
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: {point.percentage:.1f} %',
                },
            },
        },
        series: [{
            name: 'Status',
            data: [
                { name: 'المدفوع', y: 70, color: '#A3CCFE' },
                { name: 'المتبقي', y: 30, color: '#284160' }
            ],
        }],
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            itemMarginTop: 10,
            labelFormatter: function() {
                return `<span style="color:${this.color}">${this.name}</span>: ${this.y} (${this.percentage.toFixed(1)}%)`;
            }
        },
        subtitle: {
            text: '<h2 style="font-size: 50px; font-weight: bold;">10,000</h2> <br><h4 style="background: #EEEEF0 !important;">المبلغ المطلوب</h4>',
            style: {
                fontSize: '20px',
                fontWeight: 'normal',
                color: 'var(--text-color)',
                textAlign: 'center',
            },
            verticalAlign: 'middle',
            align: 'center', 
            y: 55,
        },
    };

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    );
};

export default DonutChart;
