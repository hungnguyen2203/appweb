// Import MQTT serviceitem
import { MQTTService } from "./mqttService.js";

// Target specific HTML items
const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");

// Holds the background color of all chart
var chartBGColor = getComputedStyle(document.body).getPropertyValue(
  "--chart-background"
);
var chartFontColor = getComputedStyle(document.body).getPropertyValue(
  "--chart-font-color"
);
var chartAxisColor = getComputedStyle(document.body).getPropertyValue(
  "--chart-axis-color"
);

/*
  Event listeners for any HTML click
*/
menuBtn.addEventListener("click", () => {
  sideMenu.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  sideMenu.style.display = "none";
});

themeToggler.addEventListener("click", () => {
  // document.body.classList.toggle("dark-theme-variables");
  themeToggler.querySelector("span:nth-child(1)").classList.toggle("active");
  themeToggler.querySelector("span:nth-child(2)").classList.toggle("active");

  // Update Chart background
  // chartBGColor = getComputedStyle(document.body).getPropertyValue(
  //   "--chart-background"
  // );
  // chartFontColor = getComputedStyle(document.body).getPropertyValue(
  //   "--chart-font-color"
  // );
  // chartAxisColor = getComputedStyle(document.body).getPropertyValue(
  //   "--chart-axis-color"
  // );
  // updateChartsBackground();

  if (themeToggler.querySelector("span:nth-child(1)").classList.contains("active")) {
    // location.reload();
    fetchMQTTConnection1();
  }
  if (themeToggler.querySelector("span:nth-child(2)").classList.contains("active")) {
    // location.reload();
    fetchMQTTConnection2();
  }
});

/*
  Plotly.js graph and chart setup code
*/
// var temperatureHistoryDiv = document.getElementById("temperature-history");
// var humidityHistoryDiv = document.getElementById("humidity-history");
// var pressureHistoryDiv = document.getElementById("pressure-history");
// var altitudeHistoryDiv = document.getElementById("altitude-history");

var temperatureGaugeDiv1 = document.getElementById("temperature-gauge1");
var humidityGaugeDiv1 = document.getElementById("humidity-gauge1");
var temperatureGaugeDiv2 = document.getElementById("temperature-gauge2");
var humidityGaugeDiv2 = document.getElementById("humidity-gauge2");

// const historyCharts = [
//   temperatureHistoryDiv,
//   humidityHistoryDiv,
//   pressureHistoryDiv,
//   altitudeHistoryDiv,
// ];

const gaugeCharts = [
  temperatureGaugeDiv1,
  humidityGaugeDiv1,
  temperatureGaugeDiv2,
  humidityGaugeDiv2,
];

// History Data
// var temperatureTrace = {
//   x: [],
//   y: [],
//   name: "Temperature",
//   mode: "lines+markers",
//   type: "line",
// };
// var humidityTrace = {
//   x: [],
//   y: [],
//   name: "Humidity",
//   mode: "lines+markers",
//   type: "line",
// };
// var pressureTrace = {
//   x: [],
//   y: [],
//   name: "Pressure",
//   mode: "lines+markers",
//   type: "line",
// };
// var altitudeTrace = {
//   x: [],
//   y: [],
//   name: "Altitude",
//   mode: "lines+markers",
//   type: "line",
// };

// var temperatureLayout = {
//   autosize: true,
//   title: {
//     text: "Temperature",
//   },
//   font: {
//     size: 12,
//     color: chartFontColor,
//     family: "poppins, san-serif",
//   },
//   colorway: ["#05AD86"],
//   margin: { t: 40, b: 40, l: 30, r: 30, pad: 10 },
//   plot_bgcolor: chartBGColor,
//   paper_bgcolor: chartBGColor,
//   xaxis: {
//     color: chartAxisColor,
//     linecolor: chartAxisColor,
//     gridwidth: "2",
//     autorange: true,
//   },
//   yaxis: {
//     color: chartAxisColor,
//     linecolor: chartAxisColor,
//     gridwidth: "2",
//     autorange: true,
//   },
// };
// var humidityLayout = {
//   autosize: true,
//   title: {
//     text: "Humidity",
//   },
//   font: {
//     size: 12,
//     color: chartFontColor,
//     family: "poppins, san-serif",
//   },
//   colorway: ["#05AD86"],
//   margin: { t: 40, b: 40, l: 30, r: 30, pad: 0 },
//   plot_bgcolor: chartBGColor,
//   paper_bgcolor: chartBGColor,
//   xaxis: {
//     color: chartAxisColor,
//     linecolor: chartAxisColor,
//     gridwidth: "2",
//   },
//   yaxis: {
//     color: chartAxisColor,
//     linecolor: chartAxisColor,
//   },
// };
// var pressureLayout = {
//   autosize: true,
//   title: {
//     text: "Pressure",
//   },
//   font: {
//     size: 12,
//     color: chartFontColor,
//     family: "poppins, san-serif",
//   },
//   colorway: ["#05AD86"],
//   margin: { t: 40, b: 40, l: 30, r: 30, pad: 0 },
//   plot_bgcolor: chartBGColor,
//   paper_bgcolor: chartBGColor,
//   xaxis: {
//     color: chartAxisColor,
//     linecolor: chartAxisColor,
//     gridwidth: "2",
//   },
//   yaxis: {
//     color: chartAxisColor,
//     linecolor: chartAxisColor,
//   },
// };
// var altitudeLayout = {
//   autosize: true,
//   title: {
//     text: "Altitude",
//   },
//   font: {
//     size: 12,
//     color: chartFontColor,
//     family: "poppins, san-serif",
//   },
//   colorway: ["#05AD86"],
//   margin: { t: 40, b: 40, l: 30, r: 30, pad: 0 },
//   plot_bgcolor: chartBGColor,
//   paper_bgcolor: chartBGColor,
//   xaxis: {
//     color: chartAxisColor,
//     linecolor: chartAxisColor,
//     gridwidth: "2",
//   },
//   yaxis: {
//     color: chartAxisColor,
//     linecolor: chartAxisColor,
//   },
// };

var config = { responsive: true, displayModeBar: false };

// Event listener when page is loaded
window.addEventListener("load", (event) => {
  // Plotly.newPlot(
  //   temperatureHistoryDiv,
  //   [temperatureTrace],
  //   temperatureLayout,
  //   config
  // );
  // Plotly.newPlot(humidityHistoryDiv, [humidityTrace], humidityLayout, config);
  // Plotly.newPlot(pressureHistoryDiv, [pressureTrace], pressureLayout, config);
  // Plotly.newPlot(altitudeHistoryDiv, [altitudeTrace], altitudeLayout, config);

   // Get MQTT Connection
     fetchMQTTConnection1();

   // Run it initially
  // handleDeviceChange(mediaQuery);
});

// Gauge Data
var temperatureData1 = [
  {
    domain: { x: [0, 1], y: [0, 1] },
    value: 0,
    title: { text: "Temperature1" },
    type: "indicator",
    mode: "gauge+number+delta",
    delta: { reference: 30 },
    gauge: {
      axis: { range: [null, 60] },
      steps: [
        { range: [0, 20], color: "lightgray" },
        { range: [20, 30], color: "gray" },
      ],
      threshold: {
        line: { color: "red", width: 4 },
        thickness: 0.75,
        value: 30,
      },
    },
  },
];

var humidityData1 = [
  {
    domain: { x: [0, 1], y: [0, 1] },
    value: 0,
    title: { text: "Humidity1" },
    type: "indicator",
    mode: "gauge+number+delta",
    delta: { reference: 50 },
    gauge: {
      axis: { range: [null, 100] },
      steps: [
        { range: [0, 20], color: "lightgray" },
        { range: [20, 30], color: "gray" },
      ],
      threshold: {
        line: { color: "red", width: 4 },
        thickness: 0.75,
        value: 30,
      },
    },
  },
];

var temperatureData2 = [
  {
    domain: { x: [0, 1], y: [0, 1] },
    value: 0,
    title: { text: "Temperature2" },
    type: "indicator",
    mode: "gauge+number+delta",
    delta: { reference: 30 },
    gauge: {
      axis: { range: [null, 60] },
      steps: [
        { range: [0, 20], color: "lightgray" },
        { range: [20, 30], color: "gray" },
      ],
      threshold: {
        line: { color: "red", width: 4 },
        thickness: 0.75,
        value: 30,
      },
    },
  },
];

var humidityData2 = [
  {
    domain: { x: [0, 1], y: [0, 1] },
    value: 0,
    title: { text: "Humidity2" },
    type: "indicator",
    mode: "gauge+number+delta",
    delta: { reference: 50 },
    gauge: {
      axis: { range: [null, 100] },
      steps: [
        { range: [0, 20], color: "lightgray" },
        { range: [20, 30], color: "gray" },
      ],
      threshold: {
        line: { color: "red", width: 4 },
        thickness: 0.75,
        value: 30,
      },
    },
  },
];

var layout = { width: 135, height: 160, margin: { t: 0, b: 0, l: 0, r: 0 } };

Plotly.newPlot(temperatureGaugeDiv1, temperatureData1, layout);
Plotly.newPlot(humidityGaugeDiv1, humidityData1, layout);
Plotly.newPlot(temperatureGaugeDiv2, temperatureData2, layout);
Plotly.newPlot(humidityGaugeDiv2, humidityData2, layout);

// Will hold the arrays we receive from our BME280 sensor
// Temperature
// let newTempXArray = [];
// let newTempYArray = [];
// // Humidity
// let newHumidityXArray = [];
// let newHumidityYArray = [];
// // Pressure
// let newPressureXArray = [];
// let newPressureYArray = [];
// // Altitude
// let newAltitudeXArray = [];
// let newAltitudeYArray = [];

// The maximum number of data points displayed on our scatter/line graph
// let MAX_GRAPH_POINTS = 12;
// let ctr = 0;

// Callback function that will retrieve our latest sensor readings and redraw our Gauge with the latest readings
function updateSensorReadings(jsonResponse) {
  console.log(typeof jsonResponse);
  console.log(jsonResponse);

  let temperature1 = Number(jsonResponse.temperature1).toFixed(2);
  let humidity1 = Number(jsonResponse.humidity1).toFixed(2);
  let temperature2 = Number(jsonResponse.temperature2).toFixed(2);
  let humidity2 = Number(jsonResponse.humidity2).toFixed(2);

  if (!isNaN(temperature1) && !isNaN(humidity1)) {
    updateBoxes1(temperature1, humidity1);
  }
  updateBoxes2(temperature2, humidity2);

  if (!isNaN(temperature1) && !isNaN(humidity1)) {
    updateGauge1(temperature1, humidity1);
  }
  updateGauge2(temperature2, humidity2);

  // Update Temperature Line Chart
  // updateCharts(
  //   temperatureHistoryDiv,
  //   newTempXArray,
  //   newTempYArray,
  //   temperature
  // );
  // Update Humidity Line Chart
  // updateCharts(
  //   humidityHistoryDiv,
  //   newHumidityXArray,
  //   newHumidityYArray,
  //   humidity
  // );
  // // Update Pressure Line Chart
  // updateCharts(
  //   pressureHistoryDiv,
  //   newPressureXArray,
  //   newPressureYArray,
  //   pressure
  // );

  // Update Altitude Line Chart
  // updateCharts(
  //   altitudeHistoryDiv,
  //   newAltitudeXArray,
  //   newAltitudeYArray,
  //   altitude
  // );
}

function updateBoxes1(temperature1, humidity1) {
  let temperatureDiv1 = document.getElementById("temperature1");
  let humidityDiv1 = document.getElementById("humidity1");

  temperatureDiv1.innerHTML = temperature1 + " C";
  humidityDiv1.innerHTML = humidity1 + " %";
}

function updateBoxes2(temperature2, humidity2) {
  let temperatureDiv2 = document.getElementById("temperature2");
  let humidityDiv2 = document.getElementById("humidity2");

  temperatureDiv2.innerHTML = temperature2 + " C";
  humidityDiv2.innerHTML = humidity2 + " %";
}

function updateGauge1(temperature1, humidity1) {
  var temperature_update1 = {
    value: temperature1,
  };
  var humidity_update1 = {
    value: humidity1,
  };
  Plotly.update(temperatureGaugeDiv1, temperature_update1);
  Plotly.update(humidityGaugeDiv1, humidity_update1);
}

function updateGauge2(temperature2, humidity2) {
  var temperature_update2 = {
    value: temperature2,
  };
  var humidity_update2 = {
    value: humidity2,
  };
  Plotly.update(temperatureGaugeDiv2, temperature_update2);
  Plotly.update(humidityGaugeDiv2, humidity_update2);
}

// function updateCharts(lineChartDiv, xArray, yArray, sensorRead) {
//   if (xArray.length >= MAX_GRAPH_POINTS) {
//     xArray.shift();
//   }
//   if (yArray.length >= MAX_GRAPH_POINTS) {
//     yArray.shift();
//   }
//   xArray.push(ctr++);
//   yArray.push(sensorRead);

//   var data_update = {
//     x: [xArray],
//     y: [yArray],
//   };

//   Plotly.update(lineChartDiv, data_update);
// }

 function updateChartsBackground() {
//   // updates the background color of historical charts
//   var updateHistory = {
//     plot_bgcolor: chartBGColor,
//     paper_bgcolor: chartBGColor,
//     font: {
//       color: chartFontColor,
//     },
//     xaxis: {
//       color: chartAxisColor,
//       linecolor: chartAxisColor,
//     },
//     yaxis: {
//       color: chartAxisColor,
//       linecolor: chartAxisColor,
//     },
//   };
//   historyCharts.forEach((chart) => Plotly.relayout(chart, updateHistory));

  // updates the background color of gauge charts
  var gaugeHistory = {
    plot_bgcolor: chartBGColor,
    paper_bgcolor: chartBGColor,
    font: {
      color: chartFontColor,
    },
    xaxis: {
      color: chartAxisColor,
      linecolor: chartAxisColor,
    },
    yaxis: {
      color: chartAxisColor,
      linecolor: chartAxisColor,
    },
  };
  gaugeCharts.forEach((chart) => Plotly.relayout(chart, gaugeHistory));
 }

const mediaQuery = window.matchMedia("(max-width: 600px)");

mediaQuery.addEventListener("change", function (e) {
  handleDeviceChange(e);
});

function handleDeviceChange(e) {
  if (e.matches) {
    // console.log("Inside Mobile");
    // var updateHistory = {
    //   width: 323,
    //   height: 250,
    //   "xaxis.autorange": true,
    //   "yaxis.autorange": true,
    // };
    // historyCharts.forEach((chart) => Plotly.relayout(chart, updateHistory));
  } else {
    // var updateHistory = {
    //   width: 550,
    //   height: 260,
    //   "xaxis.autorange": true,
    //   "yaxis.autorange": true,
    // };
    // historyCharts.forEach((chart) => Plotly.relayout(chart, updateHistory));
  }
}

/*
  MQTT Message Handling Code
*/
const mqttStatus = document.querySelector(".status");

function onConnect(message) {
  mqttStatus.textContent = "Connected";
}
function onMessage(topic, message) {
  var stringResponse = message.toString();
  try {
    var messageResponse = JSON.parse(stringResponse);
    updateSensorReadings(messageResponse);
  } catch (error) {
    console.error('Không thể phân tích cú pháp dữ liệu JSON:', error);
  }
}

function onError(error) {
  console.log(`Error encountered :: ${error}`);
  mqttStatus.textContent = "Error";
}

function onClose() {
  console.log(`MQTT connection closed!`);
  mqttStatus.textContent = "Closed";
}

function fetchMQTTConnection1() {
  fetch("/mqttConnDetails", {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      initializeMQTTConnection(data.mqttServer, data.mqttTopic1_1, data.mqttTopic1_2, data.mqttTopic1a, data.mqttTopic2a);
    })
    .catch((error) => console.error("Error getting MQTT Connection :", error));
}
function fetchMQTTConnection2() {
  fetch("/mqttConnDetails", {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      initializeMQTTConnection(data.mqttServer, data.mqttTopic2_1, data.mqttTopic2_2, data.mqttTopic2a, data.mqttTopic1a);
    })
    .catch((error) => console.error("Error getting MQTT Connection :", error));
}
function initializeMQTTConnection(mqttServer, mqttTopic1, mqttTopic2, mqttTopica, mqttTopicb) {
  console.log(
    `Initializing connection to :: ${mqttServer}, topic :: ${mqttTopic1}, topic :: ${mqttTopic2}`
  );
  var fnCallbacks = { onConnect, onMessage, onError, onClose };

  var mqttService = new MQTTService(mqttServer, fnCallbacks);
  mqttService.connect();

  // mqttService.unsubscribe(mqttTopic2);
  mqttService.subscribe(mqttTopic1);
  mqttService.subscribe(mqttTopic2);
  mqttService.publish(mqttTopica,"start"); 
  delay(1000, function() {
    mqttService.publish(mqttTopicb,"stop");
  });
  delay(1000, function() {
    mqttService.publish(mqttTopicb,"stop");
  });
  delay(1000, function() {
    mqttService.publish(mqttTopicb,"stop");
  });
  delay(1000, function() {
    mqttService.publish(mqttTopicb,"stop");
  });
  delay(1000, function() {
    mqttService.publish(mqttTopicb,"stop");
  });
}

function delay(ms, callback) {
  setTimeout(callback, ms);
}
