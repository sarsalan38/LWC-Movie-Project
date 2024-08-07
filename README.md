# LWC Movies Search

## Overview

The LWC Movies Search project is a Salesforce Lightning Web Component (LWC) application that allows users to search for movies or series using the OMDB API. The application features a search interface with filters and displays search results as movie cards. It also includes a detailed view of each movie upon selection.

**Live Demo:** [LWC Movies Search](http://curious-unicorn-6v69e7-dev-ed.my.site.com/lwcmoviesearch)

## Screenshots

Below are the screenshot of the application:

![image](https://github.com/user-attachments/assets/763608e5-76b4-4ce6-86e0-d9ef44e69262)


## Features

- **Search for Movies/Series:** Users can search for movies or series using various filters.
- **Pagination:** Supports pagination to navigate through search results.
- **Movie Details:** Displays detailed information about a selected movie.
- **Loading Indicator:** Shows a loading spinner while fetching data.
- **No Results Handling:** Displays a message when no movies are found.

## Installation

### Prerequisites

1. **Salesforce CLI:** Ensure you have Salesforce CLI installed. Follow the instructions [here](https://developer.salesforce.com/tools/sfdxcli) to install it.
2. **Salesforce Org:** A Salesforce org is required for deploying and testing LWC components.

### Setup

1. **Clone the Repository:**
   ```bash
   git clone [<repository-url>](https://github.com/sarsalan38/LWC-Movie-Project.git)

## Components

### MovieSearch Component
The `MovieSearch` component allows users to search for movies or series and displays the search results.

- **HTML:** Defines the layout and structure of the search form and results.
- **JavaScript:** Handles user input, API requests, and data processing.
- **CSS:** Styles the component, including the loader and search results.

### MovieTile Component
The `MovieTile` component displays individual movie cards with a movie poster and title.

- **HTML:** Defines the layout for movie cards.
- **CSS:** Styles the movie cards, including hover effects and layout.

## Usage

1. **Navigate to the Application:**
   Open the LWC Movies Search application at [http://curious-unicorn-6v69e7-dev-ed.my.site.com/lwcmoviesearch](http://curious-unicorn-6v69e7-dev-ed.my.site.com/lwcmoviesearch).

2. **Search for Movies/Series:**
   - Use the dropdown to select the type (Movie, Series, Episode).
   - Enter a search term in the search input box.
   - Use the pagination input to select a page number.

3. **View Results:**
   - Search results will be displayed as movie cards.
   - Click on a movie card to view detailed information.

## API Integration

This project uses the OMDB API for movie data. The API key is defined in the `MovieSearch` component's JavaScript file. You may need to replace it with your own API key if necessary.

- **API Endpoint:**
  - Search Movies/Series: `https://www.omdbapi.com/?s={searchTerm}&type={type}&page={pageNumber}&apikey={apiKey}`
  - Movie Details: `https://www.omdbapi.com/?i={movieId}&plot=full&apikey={apiKey}`

## Contribution

1. **Fork the Repository:** Create a fork of the repository on GitHub.
2. **Create a Branch:** Create a new branch for your changes.
    ```bash
    git checkout -b my-feature-branch
    ```
3. **Make Changes:** Implement your changes and test them thoroughly.
4. **Push Changes:** Push your changes to your forked repository.
    ```bash
    git push origin my-feature-branch
    ```
5. **Create a Pull Request:** Submit a pull request with a description of your changes.

## Contact

For any questions or issues, please contact Shakeeb Arsalan(mailto:sarsalan38@gmail.com).
