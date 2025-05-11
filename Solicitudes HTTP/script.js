
 // Constantes
        const API_KEY = 'f089fd13176f561e1c0cf4f02f904c30'; 
        const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
        
        // Elementos del DOM
        const cityInput = document.getElementById('cityInput');
        const searchBtn = document.getElementById('searchBtn');
        const cityNameElement = document.getElementById('cityName');
        const weatherDescElement = document.getElementById('weatherDesc');
        const temperatureElement = document.getElementById('temperature');
        const errorMessageElement = document.getElementById('errorMessage');
        
        // Función para obtener el clima usando XMLHttpRequest (AJAX)
        function getWeatherXHR(city) {
            const xhr = new XMLHttpRequest();
            const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=es`;
            
            xhr.open('GET', url, true);
            
            xhr.onload = function() {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const response = JSON.parse(xhr.responseText);
                    updateWeatherUI(response);
                    hideError();
                } else {
                    handleError(xhr.status, city);
                }
            };
            
            xhr.onerror = function() {
                showError('Error de conexión');
            };
            
            xhr.send();
        }
        
        // Función para obtener el clima usando Fetch API
        function getWeatherFetch(city) {
            const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=es`;
            
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    updateWeatherUI(data);
                    hideError();
                })
                .catch(error => {
                    handleError(error.message, city);
                });
        }
        
        // Actualizar la interfaz con los datos del clima
        function updateWeatherUI(data) {
            cityNameElement.textContent = data.name;
            weatherDescElement.textContent = data.weather[0].description;
            temperatureElement.textContent = data.main.temp;
        }
        
        // Manejar errores
        function handleError(status, city) {
            let message = '';
            
            if (status == 404) {
                message = `La ciudad "${city}" no se encontró`;
            } else if (status == 401) {
                message = 'API key inválida';
            } else if (status == 429) {
                message = 'Límite de solicitudes excedido';
            } else {
                message = `Error: ${status}`;
            }
            
            showError(message);
        }
        
        // Mostrar mensaje de error
        function showError(message) {
            errorMessageElement.textContent = message;
            errorMessageElement.style.display = 'block';
        }
        
        // Ocultar mensaje de error
        function hideError() {
            errorMessageElement.style.display = 'none';
        }
        
        // Event listeners
        searchBtn.addEventListener('click', function() {
            const city = cityInput.value.trim();
            if (city) {
                // Puedes usar cualquiera de los dos métodos:
                getWeatherFetch(city); // Usando Fetch API
                // getWeatherXHR(city); // Usando XMLHttpRequest
            }
        });
        
        // Cargar Monterrey por defecto cuando la página se carga
        document.addEventListener('DOMContentLoaded', function() {
            getWeatherFetch('Monterrey');
        });
        
        // Permitir buscar con la tecla Enter
        cityInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });