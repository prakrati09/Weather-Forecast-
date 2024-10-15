# Weather App

![Weather App Screenshot](screenshot.png)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Configuration](#configuration)
  - [OpenWeatherMap API Key](#openweathermap-api-key)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

Welcome to the **Weather App**! This is a simple yet powerful web application that allows users to search for current weather information and a 5-day forecast for any city around the world. Additionally, users can retrieve weather data based on their current geographic location. The app maintains a search history for easy access to previously searched cities.

## Features

- **City Search**: Enter any city name to get the current weather and 5-day forecast.
- **Current Location**: Fetch weather data based on your device's geographic location.
- **Search History**: View and manage a list of previously searched cities for quick access.
- **Responsive Design**: Optimized for various screen sizes, ensuring a seamless experience on desktops, tablets, and mobile devices.
- **User-Friendly Interface**: Clean and intuitive UI built with Tailwind CSS.
- **Error Handling**: Comprehensive alerts and messages to guide users in case of errors or invalid inputs.

## Demo

![Weather App Demo](demo.gif)

*Note: Replace the above placeholder images with actual screenshots or a GIF demonstrating the app's functionality.*

## Technologies Used

- **HTML5**: Structure of the web pages.
- **CSS3**: Styling, enhanced with [Tailwind CSS](https://tailwindcss.com/) for rapid UI development.
- **JavaScript (ES6)**: Interactive functionalities and API integrations.
- **OpenWeatherMap API**: Fetching real-time weather data.
- **LocalStorage**: Storing search history on the user's browser.

## Getting Started

Follow these instructions to set up and run the Weather App on your local machine.

### Prerequisites

- **Web Browser**: Latest versions of Chrome, Firefox, Safari, or Edge.
- **Internet Connection**: Required to fetch data from the OpenWeatherMap API and load Tailwind CSS from CDN.

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/weather-app.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd weather-app
   ```

3. **Open `index.html` in Your Browser**

   - You can simply double-click the `index.html` file.
   - Alternatively, right-click the file and select "Open with" followed by your preferred browser.

### Running the Application

Since this is a static web application, there's no need for a backend server. However, for the best experience and to avoid any CORS issues, it's recommended to use a local development server.

**Using VS Code Live Server Extension**

   - Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in VS Code.
   - Open the project folder in VS Code.
   - Right-click on `index.html` and select "Open with Live Server".

## Configuration

### OpenWeatherMap API Key

To fetch weather data, the application uses the OpenWeatherMap API. You'll need to obtain an API key and configure it in the project.

1. **Sign Up for OpenWeatherMap**

   - Visit the [OpenWeatherMap Sign Up](https://home.openweathermap.org/users/sign_up) page.
   - Create an account and log in.

2. **Obtain Your API Key**

   - Navigate to the [API Keys](https://home.openweathermap.org/api_keys) section in your account.
   - Create a new API key or use the default one provided.

3. **Configure the API Key in the Project**

   - Open the `script.js` file located in the project directory.
   - Locate the following line at the top of the file:

     ```javascript
     const API_KEY = '58fa6abcfa43a0beb00ae355de64323e';
     ```

   - Replace `'58fa6abcfa43a0beb00ae355de64323e'` with your actual API key. For example:

     ```javascript
     const API_KEY = 'your_actual_api_key_here';
     ```

   - **Important**: Ensure that your API key is kept secure and not exposed publicly, especially if deploying the application.

## Project Structure

```
weather-app/
├── index.html
├── styles.css
├── script.js
├── README.md
```

- **index.html**: The main HTML file containing the structure of the Weather App.
- **styles.css**: Custom CSS styles (if any) to complement Tailwind CSS.
- **script.js**: JavaScript file handling API interactions, DOM manipulations, and event listeners.
- **README.md**: Documentation for the project.

## Usage

1. **Search for a City**

   - Enter the name of the city in the input field.
   - Click the "Search" button.
   - The current weather and a 5-day forecast for the entered city will be displayed.
   - The searched city will be added to the search history dropdown for future reference.

2. **Use Current Location**

   - Click the "Current Location" button.
   - Allow the browser to access your location when prompted.
   - The app will display the current weather and forecast based on your geographic location.

3. **Manage Search History**

   - Click on the input field to view previously searched cities in the dropdown.
   - Click on a city name to quickly fetch its weather data.
   - To remove a city from the history, click the "X" button next to the city name.

## Contributing

Contributions are welcome! If you'd like to enhance the Weather App, please follow these guidelines:

1. **Fork the Repository**

   Click the "Fork" button at the top-right corner of this page to create your own copy of the repository.

2. **Create a New Branch**

   ```bash
   git checkout -b feature/YourFeatureName
   ```

3. **Make Your Changes**

   Implement your feature or bug fix.

4. **Commit Your Changes**

   ```bash
   git commit -m "Add some feature"
   ```

5. **Push to Your Fork**

   ```bash
   git push origin feature/YourFeatureName
   ```

6. **Open a Pull Request**

   Navigate to the original repository and click "Compare & pull request" to submit your changes for review.

### Reporting Issues

If you encounter any issues or have suggestions for improvements, feel free to open an issue in the [Issues](https://github.com/your-username/weather-app/issues) section of the repository.

## License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute this software as per the terms of the license.


*Happy Weather Forecasting! ☀️🌧️*