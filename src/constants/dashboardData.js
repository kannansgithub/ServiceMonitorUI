const data = [
    {
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: "6", sm: "6" },
        datasets: [
            {
                label: "Today",
                fill: "start",
                borderWidth: 1.5,
                backgroundColor: "rgba(0, 184, 216, 0.1)",
                borderColor: "rgb(0, 184, 216)",
                data: [1, 2, 1, 3, 5, 4, 7]
            }
        ]
    },
    {
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: "6", sm: "6" },
        datasets: [
            {
                label: "Today",
                fill: "start",
                borderWidth: 1.5,
                backgroundColor: "rgba(23,198,113,0.1)",
                borderColor: "rgb(23,198,113)",
                data: [1, 2, 3, 3, 3, 4, 4]
            }
        ]
    }, {
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: "4", sm: "6" },
        datasets: [
            {
                label: "Today",
                fill: "start",
                borderWidth: 1.5,
                backgroundColor: "rgba(255,180,0,0.1)",
                borderColor: "rgb(255,180,0)",
                data: [2, 3, 3, 3, 4, 3, 3]
            }
        ]
    }, {
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: "4", sm: "6" },
        datasets: [
            {
                label: "Today",
                fill: "start",
                borderWidth: 1.5,
                backgroundColor: "rgba(255,65,105,0.1)",
                borderColor: "rgb(255,65,105)",
                data: [1, 7, 1, 3, 1, 4, 8]
            }
        ]
    }, 
        {
        label: "Total",
        value: "25",
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: "4", sm: "6" },
        datasets: [
            {
                label: "Today",
                fill: "start",
                borderWidth: 1.5,
                backgroundColor: "rgb(0,123,255,0.1)",
                borderColor: "rgb(0,123,255)",
                data: [3, 2, 3, 2, 4, 5, 4]
            }
        ]
    }
]
const chartData = {
    datasets: [
        {
            hoverBorderColor: "#ffffff",
            data: [],
            backgroundColor: []
        }
    ],
    labels: []
}
const overviewChartData = [
    {
        label: "Working Services",
        fill: "start",
        data: [],
        backgroundColor: "rgba(0,123,255,0.1)",
        borderColor: "rgba(0,123,255,1)",
        pointBackgroundColor: "#ffffff",
        pointHoverBackgroundColor: "rgb(0,123,255)",
        borderWidth: 1.5,
        pointRadius: 0,
        pointHoverRadius: 3
    },
    {
        label: "Not-Working Services",
        fill: "start",
        data: [],
        backgroundColor: "rgba(255,65,105,0.1)",
        borderColor: "rgba(255,65,105,1)",
        pointBackgroundColor: "#ffffff",
        pointHoverBackgroundColor: "rgba(255,65,105,1)",
        borderDash: [3, 3],
        borderWidth: 1,
        pointRadius: 0,
        pointHoverRadius: 2,
        pointBorderColor: "rgba(255,65,105,1)"
    }
];
const GetColor = (currentIndex) => {
    return `rgba(0,123,255,${(1 / currentIndex).toFixed(2)})`
}
export const GetChartData = (dashMonitoredServiceValues) => {
    chartData.datasets[0].data = [];
    chartData.labels = [];
    chartData.datasets[0].backgroundColor = [];
    dashMonitoredServiceValues.forEach((data, idx) => {
        chartData.datasets[0].data.push(data.count.toFixed(2));
        chartData.labels.push(data.serviceType);
        chartData.datasets[0].backgroundColor.push(GetColor(idx+1));
    });
    const chartDataSet = {
        datasets: []
    };
    chartDataSet.datasets.push(chartData);
    return chartData;
}

export const getDashboardData = (id, lbl) => {
     data[id].datasets[0].label = lbl;
    return data[id];
}
export const getOverviewData = (dashOverviewServiceValues) => {
    if (dashOverviewServiceValues && dashOverviewServiceValues.length > 0) {
        dashOverviewServiceValues.forEach((val, idx) => {
            overviewChartData[idx].label = val.label;
            overviewChartData[idx].data = val.data;
        });
    }
    return {
        labels: Array.from(new Array(30), (_, i) => (i === 0 ? 1 : i)),
        datasets: overviewChartData
    };
}