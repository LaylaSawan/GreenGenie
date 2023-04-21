setInterval(getListOfSensorValues, 5000);//making it so you don't have to refresh the page instead it gives new valkues every 5second
//SETTING THE CHART REFRENCE TO BE EMPTY//
let tempRef = null;
let mositureOneRef = null;
let mositureTwoRef = null;
let photoRef = null;
let moistureRef = null;
let methaneRef = null;

async function getListOfSensorValues() {//using a fetch statement to get the values

    const temperatureChart = document.getElementById('temperatureChart');//temperature chart helps connects the chart to the index.html
    const photoChart = document.getElementById('photoChart');
    const moistureChart = document.getElementById('moistureChart');
    const methaneChart = document.getElementById('methaneChart');

    fetch('https://cvpcmc3kka.execute-api.us-east-1.amazonaws.com/prod/?id=' + window.location.search.substring(4))// its is making a GET request
        .then(res => res.json())//when you get the responce from the api, run this; it converts responce to json
        .then(data => {//when you finish converting the json, run the code
            console.log(data["value"])// its printing the data

            let dataBaseValues = data[0]["value"]; // let = create a variable
            const myValue = dataBaseValues.split(",");//splits the values

            var temperatureArr = []//adding values to the array 
            var moistureOneArr = []
            var moistureTwoArr = []
            var photoArr = []
            var methaneArr = []
            var dates = []

            // Current format => moistureTop,moistureBottom,sunlight,methane,temperature,deviceID

            data.forEach(row => {//the data for each row
                values = row["value"].split(",")//its splitting the values by a comma
                
                
                let date = new Date(row["recorded"])//get the latest recorded
                dates.push(date.getUTCHours() + ':' + date.getMinutes());//the hours and minutes and seconds in milatary time
                
                moistureOneArr.push(values[0]);
                if (values[1] != -1) { // make sure its not indoor
                    moistureTwoArr.push(values[1])
                }
                if (values[2] != -1) { // make sure its not indoor
                    photoArr.push(values[2])
                }

                methaneArr.push(values[3])
                temperatureArr.push(values[4])
            })


            //moisture
            if (moistureRef != null) {//if the moistureRef is null destroy the chart
                moistureRef.destroy();
            }

            moistureRef = new Chart(moistureChart, {//then create a new chart
                type: 'line',
                data: {
                    labels: dates.reverse(),//he date of the reversal of the Event
                    datasets: [
                    {
                        label: 'Moisture 1',
                        data: moistureOneArr.reverse(),
                        borderColor: '#36A2EB',
                        yAxisID: 'y',
                    },
                    {
                        label: 'Moisture 2',
                        data: moistureTwoArr.reverse(),
                        borderColor: '#FF6384',
                        yAxisID: 'y1',//creating scale for the y axis
                    }
                    ]
                },
                options: {
                    responsive: true,
                    interaction: {
                        mode: 'index',
                        intersect: false,
                    },
                    stacked: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Moisture'
                        }
                    },
                    scales: { //
                        y: {
                            type: 'linear',
                            display: true,
                            position: 'left',
                        },
                        y1: {
                            type: 'linear',
                            display: true,
                            position: 'right',

                            // grid line settings
                            grid: {
                                drawOnChartArea: false, // only want the grid lines for one axis to show up
                            },
                        },
                    }
                },

            });



            if (tempRef != null) {
                tempRef.destroy();
            }

            tempRef = new Chart(temperatureChart, {
                type: 'line',
                data: {
                    labels: dates.reverse(),
                    datasets: [{
                        label: "Temperature",
                        data: temperatureArr.reverse(),
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
            
            if (photoRef != null) {
                photoRef.destroy();
            }

            photoRef = new Chart(photoChart, {
                type: 'line',
                data: {
                    labels: dates.reverse(),
                    datasets: [{
                        label: "Photo",
                        data: photoArr.reverse(),
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            
            methaneRef = new Chart(methaneChart, {
                type: 'line',
                data: {
                    labels: dates.reverse(),
                    datasets: [{
                        label: "Methane",
                        data: methaneArr.reverse(),
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
            
            
            // Current format => moistureTop,moistureBottom,sunlight,methane,temperature,deviceID

            document.getElementById("bottomMoistureSensor").innerHTML = (myValue[1] + myValue[0] == myValue[0, 1] / 2) + "%";// acsess the tag with id sensor and; putting the data into the value
            document.getElementById("topMoistureSensor").innerHTML = (myValue[0]) + "%";
            document.getElementById("tempSensorValue").innerHTML = myValue[4] += "&#8451";
            document.getElementById("photoSensorValue").innerHTML = (myValue[2]) + "%";
            document.getElementById("methaneSensorValue").innerHTML = (myValue[3]) + "%";
        })
}

function toggleWaterCheck() {
    alert("Not connected")
    return

    if (document.getElementById("myWaterCheckbox").checked === true) {//this makes it so if its on display if its off display for moisture and the oxygen 
        document.getElementById("buttonOnWater").style.display = "block";
        document.getElementById("buttonOffWater").style.display = "none";
    } else {
        document.getElementById("buttonOnWater").style.display = "none";
        document.getElementById("buttonOffWater").style.display = "block";
    }
}

function toggleFanCheck() {
    if (document.getElementById("myFanCheckbox").checked === true) {
        fetch('https://cvpcmc3kka.execute-api.us-east-1.amazonaws.com/prod/?status=1', {method: 'POST'}).then(row => {
            alert("TURNED ON!");
        })

        document.getElementById("buttonOnFan").style.display = "block";
        document.getElementById("buttonOffFan").style.display = "none";
    } else {
        fetch('https://cvpcmc3kka.execute-api.us-east-1.amazonaws.com/prod/?status=0', {method: 'POST'}).then(row => {
            alert("TURNED OFF!");
        })

        document.getElementById("buttonOnFan").style.display = "none";
        document.getElementById("buttonOffFan").style.display = "block";
    }
}
