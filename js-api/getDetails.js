let weatherChart

let getWeatherForecast = (city) => {

    
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=en`; 

    fetch(url)
        .then(response => response.json())
        .then(data => {

            if (data.list) {
                let hours = []; 
                let temps = []; 
                let orr = [];
                let dayIndex = 0;
                let description;

                document.getElementById('weatherChart').style.display = 'block';

                function dayChange(){
                    orr = [];
                    hours = []; 
                    temps = [];
                    data.list.forEach((forecast, index) => {
                        const temp = forecast.main.temp;
                        const hour = new Date(forecast.dt * 1000).getHours(); 
                        description = data.list[0].weather[0].description;

                        if (index % 8 === 0) { 
                            orr.push(new Date(forecast.dt * 1000).toLocaleDateString()); 
                        }

                        if (Math.floor(index / 8) === dayIndex) {
                            hours.push(`${hour}:00`);  
                            temps.push(temp);         
                        }
                    });

                    Chart.register(ChartDataLabels);

                    let ctx = document.getElementById('weatherChart').getContext('2d');
                    weatherChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: hours, 
                            datasets: [{
                                label: data.city.name+ ' ' + orr[dayIndex]+' '+ description,
                                data: temps, 
                                borderColor: 'rgb(46, 47, 47)',
                                borderWidth: 2,
                                fill: true,
                                tension: 0.4
                            }]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    title: {
                                        display: true,
                                        text: 'Temperature (°C) ',
                                        font: {
                                            size: 16, 
                                            weight: 'bold' 
                                        }
                                    },
                                    ticks: {
                                        display: false, 
                                        font: {
                                            size: 16, 
                                            weight: 'bold' 
                                        }
                                    }
                                },
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Time (hours)',
                                        font: {
                                            size: 16, 
                                            weight: 'bold' 
                                        }
                                    },
                                    ticks: {
                                        font: {
                                            size: 16, 
                                            weight: 'bold' 
                                        }
                                    }
                                }
                            },
                            plugins: {
                                legend: {
                                    labels: {
                                        font: {
                                            size: 20, 
                                            weight: 'bold' 
                                        }
                                    }
                                },
                                datalabels: {
                           
                                    anchor: 'end',    
                                    align: 'top',   
                                    font: {
                                        size: 14,
                                        weight: 'bold'
                                    },
                                    color: 'rgb(0, 255, 255)',
                                    formatter: function(value, context) {
                                        return value.toFixed(1);  
                                    },
                                    offset: 5,  
                                
                                    yAdjust: -10
                                }
                            },
                            
                        }
                    });
                }
                dayChange();
                buttonDiv.innerHTML = '';

                weatherContainer.innerHTML = '';
                
                for (let i = 1; i <= 5; i++) {
                    const button = document.createElement('button');
                    button.textContent = orr[i-1]; 
                    button.addEventListener('click', function() {
                        dayIndex = i - 1
                        weatherChart.destroy();
                        dayChange();
                    });

                    buttonDiv.appendChild(button);
                }

            } else {
                // weatherDescription.textContent = 'Не удалось получить данные о прогнозе погоды.';
                console.log('Не удалось получить данные о прогнозе погоды.')
            }
        })
        .catch(error => {
            // weatherDescription.textContent = 'Ошибка при получении данных о прогнозе погоды.';
            console.log(error)

        });
}
