# Rugby ScoutAI: Technical Scouting Dashboard

Rugby ScoutAI is a professional-grade performance analytics platform designed for Tier-1 rugby scouting. Drawing inspiration from "Moneyball" principles, the application provides deep statistical insights using advanced data visualizations and machine learning projections.

## 🏉 Core Features

### 1. Moneyball Ranking Index
Our proprietary algorithm segments the database to identify "undervalued" talent. For Back-Row players, we prioritize:
- **Turnovers Won (30% weight)**
- **Dominant Tackles (20% weight)**
- **Lineout Steals (15% weight)**
- **Penalty Discipline (Integrated into handling errors)**

### 2. Spatial Dominance Mapping (Event Clusters)
A high-fidelity pitch map that visualizes player engagement zones.
- **T (Tackles)**: Visualizes defensive work rate and line speed.
- **C (Carries)**: Maps gain-line success and attacking penetration.
- **O (Turnovers)**: Identifies key disruption points on the field.
*The intensity of markers indicates the collision force and impact of the action.*

### 3. Predictive AI Projections
Using simulated XGBoost decision trees, the platform forecasts player career trajectories.
- **Growth Potential**: Calculated based on age vs. statistical volume.
- **Confidence Intervals**: Reflects the stability of performance data.
- **Impact Projections**: Estimates effectiveness in the next World Cup cycle.

### 4. Direct Comparison Engine (DNA Plotting)
Head-to-head radar charts compare the "Statistical DNA" of two subjects.
- Multi-dimensional visualization of Carries, Meters, Tackles, Turnovers, and Offloads.
- Automated scouting commentary for comparative insights.

## 🛠 Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Animations**: Framer Motion (motion/react)
- **Charts**: Recharts (for Radar, Bar, and Projective charts)
- **Backend**: Node.js / Express (Simulating a high-performance Pandas/Python processing layer)
- **Icons**: Lucide React

## 📈 Data Scraper Simulation
The application simulates a live data scraper that pulls from Tier-1 tournament sources (e.g., Six Nations, Rugby Championship). The dataset is processed in real-time to calculate secondary metrics like "Meters per Carry" and "Scouting Impact Score".

---

