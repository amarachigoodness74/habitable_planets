# Kepler Exoplanet Explorer

Kepler Exoplanet Explorer is an interactive web application designed to explore exoplanetary data visually and analytically. The app features dynamic charts, a searchable and filterable exoplanet database, and a habitability checker that helps users analyze exoplanets based on key criteria. This tool provides insights into potential Earth-like planets by comparing their characteristics with known habitable conditions.

This application uses the planet's data available on https://exoplanetarchive.ipac.caltech.edu/docs/KeplerMission.html. This is a downloaded version, so future update might have more data

## **Tech Stack**

- **Frontend:** Next.js, TypeScript, TailwindCSS, Recharts (@recharts/react)
- **Backend:** Next.js API Routes (fetching and processing planetary data)
- **Data Processing:** CSV to JSON conversion for structured exoplanet data

## Features & Sections

### 1️. **Home Page: Exoplanet Data Explorer (Visualization Dashboard)**
- **Scatter Plot** → Radius vs. Temperature (Identify Earth-like planets)
- **Bar Chart** → Number of planets by disposition (Confirmed, Candidate, False Positive)
- **Scatter Chart** → Radius vs. Insolation Flux (Find planets with similar sunlight exposure)
- **BarChart** → Distribution of exoplanet sizes
- **Pie Chart** → Habitable vs. Non-Habitable planets

### 2️. **Exoplanet List (Table & Grid Views)**
- **Search** → Search for exoplanets by Kepler name
- **Filters** → Filter by radius, temperature, insolation flux, or planet disposition

### 3️. **Habitability Checker (Exoplanet Analysis)**
- 🏆 **Ranked Habitability Score** → Assign points based on key conditions
- ⚖ **User-Defined Criteria** → Input temperature, size, and distance preferences
- 🌍 **Earth Comparison** → Compare exoplanets with Earth’s habitability metrics
- 📜 **Detailed Reports** → View detailed insights on potentially habitable planets

## Setting up the development environment

- First, could you fork this repo?  
- Then clone your forked version.  
- Cd into project directory  
- Run `npm install` or `yarn install` to install project's dependencies  
- Run the following command on the CLI in the root directory of the project:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) on your browser to see the result.

## Live Demo
[Habitable Planets](https://habitable-planets.vercel.app/)

## Future Enhancements
🛰 Real-time Data Updates → Fetch live exoplanet discoveries from NASA APIs.
🔥 Advanced AI Analysis → Use Machine Learning for habitability predictions.
📡 3D Visualization → Interactive 3D models of exoplanets and their orbits.
