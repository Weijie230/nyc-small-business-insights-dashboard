const boroughCanvas = document.getElementById("boroughChart");

new Chart(boroughCanvas, {
    type: "bar",

    data: {
        labels: [
            "Queens",
            "Brooklyn",
            "Manhattan",
            "Bronx",
            "Staten Island"
        ],

        datasets: [{
            label: "Active License Records",

            data: [
                8650,
                8388,
                6166,
                3866,
                2064
            ]
        }]
    },

    options: {
        responsive: true,
        maintainAspectRatio: false,

        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
const categoryCanvas = document.getElementById("categoryChart");

new Chart(categoryCanvas, {
    type: "bar",

    data: {
        labels: [
            "Home Improvement Contractor",
            "Secondhand Dealer - General",
            "Tobacco Retail Dealer",
            "Electronics Store",
            "Garage & Parking Lot"
        ],

        datasets: [{
            label: "Active License Records",

            data: [
                9346,
                3803,
                3489,
                2448,
                1735
            ]
        }]
    },

    options: {
        responsive: true,
        maintainAspectRatio: false,

        indexAxis: "y",

        scales: {
            x: {
                beginAtZero: true
            }
        }
    }
});
const issuanceCanvas = document.getElementById("issuanceChart");

new Chart(issuanceCanvas, {
    type: "line",

    data: {
        labels: [
            "2012", "2013", "2014", "2015", "2016",
            "2017", "2018", "2019", "2020", "2021",
            "2022", "2023", "2024", "2025", "2026"
        ],

        datasets: [{
            label: "License Records",

            data: [
                1124, 1420, 1416, 1765, 1635,
                2398, 4257, 2425, 1651, 2969,
                2993, 3022, 3241, 4273, 2574
            ],

            tension: 0.3
        }]
    },

    options: {
        responsive: true,
        maintainAspectRatio: false,

        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});