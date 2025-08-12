# Typing Test Application

This is a web-based application designed to measure your typing speed and accuracy. It provides a clean and modern interface to practice your typing skills with a variety of texts.

## Features

- **WPM (Words Per Minute) Calculation**: Measures your typing speed in words per minute.
- **Accuracy Tracking**: Calculates the percentage of correctly typed characters.
- **Character Count**: Displays the total number of characters you've typed.
- **Real-time Feedback**: Highlights correct and incorrect characters as you type.
- **Progress Bar**: Shows your progress through the current text.
- **Timer**: A 60-second countdown timer for each test.
- **Responsive Design**: The application is designed to work on various screen sizes.
- **Results Modal**: Displays your final WPM, accuracy, and character count after each test.

## Technologies Used

- **HTML5**: For the basic structure of the application.
- **CSS3**: For styling and layout, including a dark mode theme.
- **JavaScript (ES6)**: For the core application logic, including DOM manipulation, event handling, and calculations.
- **Vite**: As a build tool and development server.
- **Font Awesome**: For icons.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

You need to have Node.js and npm (or yarn/pnpm) installed on your machine.

### Installation

1.  Clone the repo
    ```sh
    git clone [https://github.com/wangsa19/Typing-Test](https://github.com/wangsa19/Typing-Test)
    ```
2.  Navigate to the project directory
    ```sh
    cd typing-test
    ```
3.  Install NPM packages
    ```sh
    npm install
    ```

### Running the Application

1.  To run the application in development mode:
    ```sh
    npm run dev
    ```
2.  To build the application for production:
    ```sh
    npm run build
    ```
3.  To preview the production build:
    ```sh
    npm run preview
    ```

## How to Use

1.  Click the "Start Test" button to begin.
2.  The timer will start, and you can begin typing the provided text in the input field.
3.  Your WPM, accuracy, and character count will be updated in real-time.
4.  The test will end when the timer reaches zero or when you complete the text.
5.  A results modal will appear with your final stats.
6.  Click "Try Again" to start a new test or "Reset" to restart the current one.
