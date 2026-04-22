import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock Data for "Moneyball" Rugby Scouting
  const players = [
    { id: 1, name: "Ardie Savea", position: "Back Row", team: "All Blacks", age: 30 },
    { id: 2, name: "Caelan Doris", position: "Back Row", team: "Ireland", age: 25 },
    { id: 3, name: "Ben Earl", position: "Back Row", team: "England", age: 26 },
    { id: 4, name: "Grégory Alldritt", position: "Back Row", team: "France", age: 27 },
    { id: 5, name: "Pablo Matera", position: "Back Row", team: "Pumas", age: 30 },
    { id: 6, name: "Antoine Dupont", position: "Scrum Half", team: "France", age: 27 },
    { id: 7, name: "Finn Russell", position: "Fly Half", team: "Scotland", age: 31 },
    { id: 8, name: "Siya Kolisi", position: "Back Row", team: "Springboks", age: 32 },
    { id: 9, name: "Pieter-Steph du Toit", position: "Back Row", team: "Springboks", age: 31 },
    { id: 10, name: "Courtney Lawes", position: "Back Row", team: "England", age: 35 },
    { id: 11, name: "Jac Morgan", position: "Back Row", team: "Wales", age: 24 },
    { id: 12, name: "Josh van der Flier", position: "Back Row", team: "Ireland", age: 31 },
    { id: 13, name: "Charles Ollivon", position: "Back Row", team: "France", age: 30 },
    { id: 14, name: "Marcos Kremer", position: "Back Row", team: "Pumas", age: 26 },
    { id: 15, name: "Juan Martin Gonzalez", position: "Back Row", team: "Pumas", age: 23 },
    { id: 16, name: "Eben Etzebeth", position: "Lock", team: "Springboks", age: 32 },
    { id: 17, name: "Brodie Retallick", position: "Lock", team: "All Blacks", age: 32 },
    { id: 18, name: "Maro Itoje", position: "Lock", team: "England", age: 29 },
    { id: 19, name: "Tadhg Beirne", position: "Lock", team: "Ireland", age: 32 },
    { id: 20, name: "Will Jordan", position: "Outside Back", team: "All Blacks", age: 26 },
    { id: 21, name: "Damian Penaud", position: "Outside Back", team: "France", age: 27 },
    { id: 22, name: "Cheslin Kolbe", position: "Outside Back", team: "Springboks", age: 30 },
    { id: 23, name: "James Lowe", position: "Outside Back", team: "Ireland", age: 31 },
    { id: 24, name: "Hugo Keenan", position: "Outside Back", team: "Ireland", age: 27 },
    { id: 25, name: "Bundee Aki", position: "Center", team: "Ireland", age: 34 },
    { id: 26, name: "Gael Fickou", position: "Center", team: "France", age: 30 },
    { id: 27, name: "Lukhanyo Am", position: "Center", team: "Springboks", age: 30 },
    { id: 28, name: "Rieko Ioane", position: "Center", team: "All Blacks", age: 27 },
    { id: 29, name: "Jonathan Danty", position: "Center", team: "France", age: 31 },
    { id: 30, name: "Richie Mo'unga", position: "Fly Half", team: "All Blacks", age: 29 },
    { id: 31, name: "Handre Pollard", position: "Fly Half", team: "Springboks", age: 30 },
    { id: 32, name: "George Ford", position: "Fly Half", team: "England", age: 31 },
    { id: 33, name: "Aaron Smith", position: "Scrum Half", team: "All Blacks", age: 35 },
    { id: 34, name: "Faf de Klerk", position: "Scrum Half", team: "Springboks", age: 32 },
    { id: 35, name: "Jamison Gibson-Park", position: "Scrum Half", team: "Ireland", age: 32 },
    { id: 36, name: "Ardie Savea Jr", position: "Back Row", team: "All Blacks", age: 21 },
    { id: 37, name: "Cameron Woki", position: "Back Row", team: "France", age: 25 },
    { id: 38, name: "Jack Conan", position: "Back Row", team: "Ireland", age: 31 },
    { id: 39, name: "Tom Curry", position: "Back Row", team: "England", age: 25 },
    { id: 40, name: "Sam Underhill", position: "Back Row", team: "England", age: 27 },
  ];

  const stats = players.map(p => {
    const isBackRow = p.position === "Back Row";
    const isLock = p.position === "Lock";
    const isElite = p.id <= 5; // First 5 are top tier
    
    return {
      player_id: p.id,
      match_id: 200 + p.id,
      carries: Math.floor(Math.random() * (isElite ? 20 : 10)) + (isElite ? 10 : 2),
      meters_gained: Math.floor(Math.random() * (isElite ? 100 : 50)) + (isElite ? 30 : 10),
      tackles_made: Math.floor(Math.random() * (isBackRow || isLock ? 15 : 6)) + (isBackRow || isLock ? 12 : 3),
      dominant_tackles: Math.floor(Math.random() * (isBackRow ? 8 : 3)),
      turnovers_won: Math.floor(Math.random() * (isBackRow ? 5 : 2)),
      turnovers_lost: Math.floor(Math.random() * 2),
      offloads: Math.floor(Math.random() * 5),
      handling_errors: Math.floor(Math.random() * 2),
      lineout_steals: p.position === "Back Row" || p.position === "Lock" ? Math.floor(Math.random() * 3) : 0,
      minutes: 80
    };
  });
/*
  const stats = [
    { player_id: 1, match_id: 101, carries: 15, meters_gained: 85, tackles_made: 12, dominant_tackles: 4, turnovers_won: 2, turnovers_lost: 1, offloads: 2, handling_errors: 1, lineout_steals: 1, minutes: 80 },
    { player_id: 2, match_id: 101, carries: 12, meters_gained: 45, tackles_made: 18, dominant_tackles: 6, turnovers_won: 3, turnovers_lost: 0, offloads: 1, handling_errors: 0, lineout_steals: 0, minutes: 80 },
    { player_id: 3, match_id: 102, carries: 18, meters_gained: 110, tackles_made: 15, dominant_tackles: 2, turnovers_won: 1, turnovers_lost: 2, offloads: 4, handling_errors: 2, lineout_steals: 2, minutes: 80 },
    { player_id: 4, match_id: 102, carries: 14, meters_gained: 60, tackles_made: 14, dominant_tackles: 5, turnovers_won: 4, turnovers_lost: 0, offloads: 2, handling_errors: 0, lineout_steals: 1, minutes: 80 },
    { player_id: 5, match_id: 103, carries: 10, meters_gained: 30, tackles_made: 20, dominant_tackles: 8, turnovers_won: 2, turnovers_lost: 1, offloads: 0, handling_errors: 1, lineout_steals: 0, minutes: 80 },
    { player_id: 6, match_id: 104, carries: 5, meters_gained: 40, tackles_made: 5, dominant_tackles: 1, turnovers_won: 1, turnovers_lost: 0, offloads: 3, handling_errors: 1, lineout_steals: 0, minutes: 80 },
    { player_id: 7, match_id: 104, carries: 3, meters_gained: 15, tackles_made: 4, dominant_tackles: 0, turnovers_won: 0, turnovers_lost: 1, offloads: 5, handling_errors: 2, lineout_steals: 0, minutes: 80 },
  ];
*/

  // API Endpoints
  app.get("/api/players", (req, res) => {
    res.json(players);
  });

  app.get("/api/stats", (req, res) => {
    // Basic metrics calculation (simulating Pandas processing)
    const combined = stats.map(s => {
      const player = players.find(p => p.id === s.player_id);
      return {
        ...player,
        ...s,
        metersPerCarry: Number((s.meters_gained / s.carries).toFixed(2)),
        tackleEfficiency: 100, // Placeholder
      };
    });
    res.json(combined);
  });

  // Vite Integrated Setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
