
# Trovies

track movies by adding movies you watched to `Watched` and movies you want to watch to `Watchlist`


## Demo

https://trovies.netlify.app/


## Features

- Light/dark mode toggle
- Accessible search bar with keyboard navigation
- Mobile friendly


## Tech Stack

- React
- React Router
- React Query
- Tailwind Css
- Netlify Functions

## Environment Variables

To run this project, you will need to add an api key from themoviedb.org to your .env file

`VITE_REACT_APP_TMDB_KEY=YOUR_KEY_HERE`



## Prerequisites

- You should have the latest Netlify CLI version. Run `npm install -g netlify-cli` to be sure.
- Since this project uses netlify functions to keep API credentials private you need to use `netlify dev` instead of `yarn dev` to run the developement server.
