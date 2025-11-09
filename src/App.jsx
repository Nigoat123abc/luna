import { motion } from "framer-motion";
import { Search, Home, Download } from "lucide-react";
import { useState } from "react";

const GAMES = [
  {
    title: "Cyber Drift",
    description: "High-speed futuristic racing with neon lights.",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=60",
    downloadUrl: "/files/game1.zip",
  },
  {
    title: "Moon Raiders",
    description: "Battle on the moon in this sci-fi shooter adventure.",
    image: "https://images.unsplash.com/photo-1526401485004-2fda9f4dc347?auto=format&fit=crop&w=800&q=60",
    downloadUrl: "/files/game2.zip",
  },
  {
    title: "Pixel Quest",
    description: "Retro-styled RPG with endless exploration.",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=60",
    downloadUrl: "/files/game3.zip",
  },
];

export default function App() {
  const [search, setSearch] = useState("");

  const filteredGames = GAMES.filter((game) =>
    game.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050505] via-[#0e0e0e] to-[#111] text-white flex flex-col">
      {/* 🌙 NAVBAR */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between px-8 py-5 bg-zinc-900/70 backdrop-blur-lg border-b border-zinc-800"
      >
        <div className="flex items-center gap-3">
          <Home className="w-6 h-6 text-indigo-400" />
          <h1 className="text-xl font-semibold text-indigo-300">Luna</h1>
        </div>

        <div className="relative w-64">
          <Search className="absolute left-3 top-2.5 text-zinc-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search games..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-800 text-white pl-10 pr-4 py-2 rounded-xl border border-zinc-700 focus:border-indigo-500 outline-none"
          />
        </div>
      </motion.nav>

      {/* 🎮 CONTENT */}
      <main className="flex flex-col items-center flex-1 px-6 py-12 space-y-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold tracking-wide text-indigo-400 mb-6"
        >
          Recent Games
        </motion.h2>

        <div className="grid gap-10 md:grid-cols-3">
          {filteredGames.map((game, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ scale: 1.05 }}
              className="bg-zinc-800/60 border border-zinc-700 rounded-2xl overflow-hidden shadow-xl hover:shadow-indigo-500/20 transition-all duration-300 flex flex-col"
            >
              <img
                src={game.image}
                alt={game.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">{game.title}</h3>
                  <p className="text-zinc-400 mb-4">{game.description}</p>
                </div>
                <a
                  href={game.downloadUrl}
                  download
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white font-medium transition"
                >
                  <Download className="w-5 h-5" />
                  Download
                </a>
              </div>
            </motion.div>
          ))}

          {filteredGames.length === 0 && (
            <p className="text-zinc-500 italic col-span-full">
              No games found for “{search}”
            </p>
          )}
        </div>
      </main>

      {/* 🦶 FOOTER */}
      <footer className="text-center py-6 text-zinc-500 text-sm border-t border-zinc-800">
        © {new Date().getFullYear()} Luna. All rights reserved.
      </footer>
    </div>
  );
}
