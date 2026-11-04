
// ==========================================
// NYC Small Business Insights Dashboard
// ==========================================


// ==========================================
// 1. Active License Records by Borough
// ==========================================

const boroughCanvas = document.getElementById("boroughChart");

const boroughChart = new Chart(boroughCanvas, {
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
            data: [8650, 8388, 6166, 3866, 2064],
            backgroundColor: "rgba(54, 162, 235, 0.6)"
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


// ==========================================
// 2. Top Business Categories
// ==========================================

const categoryCanvas = document.getElementById("categoryChart");

const categoryChart = new Chart(categoryCanvas, {
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
            data: [9346, 3803, 3489, 2448, 1735],
            backgroundColor: "rgba(54, 162, 235, 0.6)"
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


// ==========================================
// 3. License Issuance Trends
// ==========================================

const issuanceCanvas = document.getElementById("issuanceChart");

const issuanceChart = new Chart(issuanceCanvas, {
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
            borderColor: "rgba(54, 162, 235, 1)",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
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


// ==========================================
// 4. Initialize Leaflet Map
// ==========================================

const businessMap = L.map("businessMap", {
    preferCanvas: true
}).setView([40.7128, -74.0060], 10);

L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors"
    }
).addTo(businessMap);


// ==========================================
// 5. Store Business Data and Filters
// ==========================================

let allBusinessLocations = [];

const businessMarkers = L.layerGroup().addTo(businessMap);

const boroughFilter =
    document.getElementById("boroughFilter");

const categoryFilter =
    document.getElementById("categoryFilter");

const statusFilter =
    document.getElementById("statusFilter");


// ==========================================
// 6. Escape HTML for Safe Popups
// ==========================================

function escapeHTML(value) {
    return String(value ?? "Unknown").replace(
        /[&<>"']/g,
        character => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[character]
    );
}


// ==========================================
// 7. Display Business Markers
// ==========================================

function displayBusinessMarkers(data) {

    // Remove previous markers
    businessMarkers.clearLayers();

    data.forEach(business => {

        const latitude = Number(business.Latitude);
        const longitude = Number(business.Longitude);

        if (
            !Number.isFinite(latitude) ||
            !Number.isFinite(longitude) ||
            latitude < -90 ||
            latitude > 90 ||
            longitude < -180 ||
            longitude > 180
        ) {
            return;
        }

        const marker = L.circleMarker(
            [latitude, longitude],
            {
                radius: 4,
                color: "#3388ff",
                fillColor: "#3388ff",
                fillOpacity: 0.5,
                weight: 1,
                opacity: 0.7
            }
        ).addTo(businessMarkers);

        marker.bindPopup(`
            <strong>${escapeHTML(business["Business Name"])}</strong><br>
            Category: ${escapeHTML(business["Business Category"])}<br>
            Borough: ${escapeHTML(business["Borough"])}<br>
            Status: ${escapeHTML(business["License Status"])}
        `);
    });

    console.log("Displayed license records:", data.length);
}


// ==========================================
// 8. Populate Business Category Dropdown
// ==========================================

function populateCategoryFilter(data) {

    const categories = [
        ...new Set(
            data
                .map(business => business["Business Category"])
                .filter(Boolean)
        )
    ].sort();

    categoryFilter.innerHTML = "";

    const allOption = document.createElement("option");

    allOption.value = "all";
    allOption.textContent = "All Categories";

    categoryFilter.appendChild(allOption);

    categories.forEach(category => {

        const option = document.createElement("option");

        option.value = category;
        option.textContent = category;

        categoryFilter.appendChild(option);
    });
}


// ==========================================
// 9. Populate License Status Dropdown
// ==========================================

function populateStatusFilter(data) {

    const statuses = [
        ...new Set(
            data
                .map(business => business["License Status"])
                .filter(Boolean)
        )
    ].sort();

    statusFilter.innerHTML = "";

    // All Statuses option
    const allOption = document.createElement("option");

    allOption.value = "all";
    allOption.textContent = "All Statuses";

    statusFilter.appendChild(allOption);

    // Add each actual status from the dataset
    statuses.forEach(status => {

        const option = document.createElement("option");

        option.value = status;
        option.textContent = status;

        statusFilter.appendChild(option);
    });

    // Active is the default
    statusFilter.value = "Active";
}


 // ==========================================
 // Update Borough and Category Charts
 // ==========================================

function updateCharts(filteredData, selectedStatus) {

    // --------------------------------------
    // 1. Count License Records by Borough
    // --------------------------------------

    const boroughNames = [
        "Bronx",
        "Brooklyn",
        "Manhattan",
        "Queens",
        "Staten Island"
    ];

    const boroughCounts = boroughNames.map(borough => {

        return filteredData.filter(
            business => business.Borough === borough
        ).length;

    });

    // Update Borough Chart
    boroughChart.data.labels = boroughNames;

    boroughChart.data.datasets[0].data = boroughCounts;

    boroughChart.data.datasets[0].label =
        selectedStatus === "all"
            ? "All License Records"
            : `${selectedStatus} License Records`;

    boroughChart.update();


    // --------------------------------------
    // 2. Count License Records by Category
    // --------------------------------------

    const categoryCounts = {};

    filteredData.forEach(business => {

        const category = business["Business Category"];

        if (category) {
            categoryCounts[category] =
                (categoryCounts[category] || 0) + 1;
        }

    });

    // Sort categories by record count
    const sortedCategories = Object.entries(categoryCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    const categoryNames = sortedCategories.map(
        item => item[0]
    );

    const categoryValues = sortedCategories.map(
        item => item[1]
    );

    // Update Category Chart
    categoryChart.data.labels = categoryNames;

    categoryChart.data.datasets[0].data = categoryValues;

    categoryChart.data.datasets[0].label =
        selectedStatus === "all"
            ? "All License Records"
            : `${selectedStatus} License Records`;

    categoryChart.update();

// ==========================================
// 3. Update Issuance Trends Chart
// ==========================================

const years = [
    2012, 2013, 2014, 2015, 2016,
    2017, 2018, 2019, 2020, 2021,
    2022, 2023, 2024, 2025, 2026
];

const yearCounts = years.map(year => {

    return filteredData.filter(
        business => Number(business["Issuance Year"]) === year
    ).length;

});

issuanceChart.data.labels = years.map(String);

issuanceChart.data.datasets[0].data = yearCounts;

issuanceChart.data.datasets[0].label =
    selectedStatus === "all"
        ? "All License Records"
        : `${selectedStatus} License Records`;

issuanceChart.update();

}

// ==========================================
// 10. Update Dashboard
// ==========================================

function updateDashboard() {

    const selectedBorough = boroughFilter.value;
    const selectedCategory = categoryFilter.value;
    const selectedStatus = statusFilter.value;


    // --------------------------------------
    // Filter Data
    // --------------------------------------

    const filteredData = allBusinessLocations.filter(business => {

        const boroughMatches =
            selectedBorough === "all" ||
            business.Borough === selectedBorough;

        const categoryMatches =
            selectedCategory === "all" ||
            business["Business Category"] === selectedCategory;

        const statusMatches =
            selectedStatus === "all" ||
            business["License Status"] === selectedStatus;

        return (
            boroughMatches &&
            categoryMatches &&
            statusMatches
        );
    });

    console.log("Selected Borough:", selectedBorough);
    console.log("Selected Category:", selectedCategory);
    console.log("Selected Status:", selectedStatus);
    console.log("Matching records:", filteredData.length);


    // --------------------------------------
    // Update KPI Labels
    // --------------------------------------

    const licenseCountLabel =
        document.getElementById("licenseCountLabel");

    const uniqueBusinessLabel =
        document.getElementById("uniqueBusinessLabel");

    if (licenseCountLabel) {

        if (selectedStatus === "Active") {
            licenseCountLabel.textContent =
                "Active License Records";
        } else if (selectedStatus === "all") {
            licenseCountLabel.textContent =
                "All License Records";
        } else {
            licenseCountLabel.textContent =
                `${selectedStatus} License Records`;
        }
    }

    if (uniqueBusinessLabel) {

        if (selectedStatus === "Active") {
            uniqueBusinessLabel.textContent =
                "Unique Businesses with Active Licenses";
        } else if (selectedStatus === "all") {
            uniqueBusinessLabel.textContent =
                "Unique Businesses";
        } else {
            uniqueBusinessLabel.textContent =
                `Unique Businesses with ${selectedStatus} Licenses`;
        }
    }


    // --------------------------------------
    // KPI 1: License Records
    // --------------------------------------

    const activeLicenseCard =
        document.getElementById("activeLicenseCount");

    if (activeLicenseCard) {
        activeLicenseCard.textContent =
            filteredData.length.toLocaleString();
    }


    // --------------------------------------
    // KPI 2: Unique Businesses
    // --------------------------------------

    const uniqueBusinessIds = new Set(
        filteredData
            .map(business => business["Business Unique ID"])
            .filter(id =>
                id !== null &&
                id !== undefined &&
                id !== ""
            )
    );

    const uniqueBusinessCard =
        document.getElementById("uniqueBusinessCount");

    if (uniqueBusinessCard) {
        uniqueBusinessCard.textContent =
            uniqueBusinessIds.size.toLocaleString();
    }


    // --------------------------------------
    // KPI 3: Top Business Category
    // --------------------------------------

    const categoryCounts = {};

    filteredData.forEach(business => {

        const category = business["Business Category"];

        if (category) {
            categoryCounts[category] =
                (categoryCounts[category] || 0) + 1;
        }
    });

    let topCategory = "No Data";
    let highestCount = 0;

    for (const category in categoryCounts) {

        if (categoryCounts[category] > highestCount) {
            highestCount = categoryCounts[category];
            topCategory = category;
        }
    }

    const topCategoryCard =
        document.getElementById("topBusinessCategory");

    if (topCategoryCard) {
        topCategoryCard.textContent = topCategory;
    }


    // --------------------------------------
    // Update Map Markers
    // --------------------------------------

    displayBusinessMarkers(filteredData);


    // --------------------------------------
    // Move Map to Selected Borough
    // --------------------------------------

    const boroughCenters = {
        "Bronx": [40.8448, -73.8648],
        "Brooklyn": [40.6782, -73.9442],
        "Manhattan": [40.7831, -73.9712],
        "Queens": [40.7282, -73.7949],
        "Staten Island": [40.5795, -74.1502]
    };

    if (selectedBorough === "all") {

        businessMap.setView(
            [40.7128, -74.0060],
            10
        );

    } else if (boroughCenters[selectedBorough]) {

        businessMap.setView(
            boroughCenters[selectedBorough],
            12
        );
    }

    console.log("Unique businesses:", uniqueBusinessIds.size);
    console.log("Top category:", topCategory);
    // Update charts using the filtered data
updateCharts(filteredData, selectedStatus);
}


// ==========================================
// 11. Load JSON Data
// ==========================================

fetch("data/business_locations.json?v=2")
    .then(response => {

        if (!response.ok) {
            throw new Error(
                "Failed to load business data: " +
                response.status
            );
        }

        return response.json();
    })
    .then(data => {

        allBusinessLocations = data;

        console.log("Map data loaded:", data.length);

        // Populate dropdowns
        populateCategoryFilter(data);
        populateStatusFilter(data);

        // Initial dashboard (Active)
        updateDashboard();
    })
    .catch(error => {
        console.error("Error loading business data:", error);
    });



 // ==========================================
 // 12. Apply Filters and Reset Buttons
 // ==========================================

const applyFiltersButton =
    document.getElementById("applyFilters");

const resetFiltersButton =
    document.getElementById("resetFilters");


// Apply selected filters only when clicked
applyFiltersButton.addEventListener("click", () => {

    updateDashboard();

});


// Reset all filters to their default values
resetFiltersButton.addEventListener("click", () => {

    boroughFilter.value = "all";

    categoryFilter.value = "all";

    statusFilter.value = "Active";

    updateDashboard();

});


