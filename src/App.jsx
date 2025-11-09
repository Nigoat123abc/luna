import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const CLIENT_ID = "1437161197349634235"; // Replace with your Discord client ID
  const REDIRECT_URI = "https://luna-site.netlify.app/";
  const API_ENDPOINT = "https://discord.com/api/oauth2/authorize";

  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Discord Login
  const login = () => {
    const url = `${API_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&response_type=token&scope=identify`;
    window.location.href = url;
  };

  // Handle OAuth redirect
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.includes("access_token")) {
      const params = new URLSearchParams(hash.replace("#", ""));
      const token = params.get("access_token");

      fetch("https://discord.com/api/users/@me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          localStorage.setItem("discord_user", JSON.stringify(data));
          window.history.replaceState({}, document.title, "/");
        });
    } else {
      const savedUser = localStorage.getItem("discord_user");
      if (savedUser) setUser(JSON.parse(savedUser));
    }
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("discord_user");
  };

  // --- Game List ---
  const games = [
    {
      title: "Hello Neighbor",
      description:
        "Sneak into your neighbor’s house to uncover his secrets in this suspenseful stealth horror game.",
      image:
        "https://cdn.akamai.steamstatic.com/steam/apps/521890/header.jpg",
      link: "https://mega.nz/file/7gxAgTwA#fX8eAg0TdfwknH5E6SpRzBJrD3MK2MF578001y6ZPYA",
    },
    {
      title: "Fortnite",
      description: "The world’s most popular battle royale game.",
      image:
        "https://cdn2.unrealengine.com/Fortnite+OG+Key+Art+1920x1080-1920x1080-2b39e0b2ee2a.jpg",
      link: "https://www.epicgames.com/fortnite",
    },
    {
      title: "Minecraft",
      description:
        "Explore, mine, and build in a limitless blocky world.",
      image:
        "https://www.minecraft.net/content/dam/games/minecraft/key-art/MC_TheWildUpdate_1170x500.jpg",
      link: "https://www.minecraft.net/",
    },
    {
      title: "GTA V",
      description:
        "Open-world action and adventure in Los Santos.",
      image:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg",
      link: "https://store.steampowered.com/app/271590/Grand_Theft_Auto_V/",
    },
  ];

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0b0c10] text-white font-sans">
      {/* 🌙 Navbar */}
      <header className="flex justify-between items-center px-8 py-6 bg-[#101218] shadow-md sticky top-0 z-50">
        <h1 className="text-3xl font-bold text-blue-500">Luna</h1>
        <nav className="flex items-center space-x-6">
          <a href="#" className="hover:text-blue-400 transition">
            Home
          </a>
          <a
            href="https://discord.gg/PxgbepwQcv"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            Join our Discord
          </a>
          {user ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-3"
            >
              <img
                src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <span>{user.username}</span>
              <button
                onClick={logout}
                className="text-sm bg-red-600 px-3 py-1 rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </motion.div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={login}
              className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Login with Discord
            </motion.button>
          )}
        </nav>
      </header>

      {/* 🌌 Hero Section */}
      <section className="text-center py-24 bg-gradient-to-b from-[#101218] to-[#0b0c10]">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-bold mb-4"
        >
          Discover and Download the Best Games
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 text-lg"
        >
          Explore the latest and greatest in gaming — fast, secure, and dark mode ready.
        </motion.p>
      </section>

      {/* 🔍 Search Bar */}
      <div className="flex justify-center mt-10 mb-8">
        <motion.input
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 300, opacity: 1 }}
          transition={{ duration: 0.5 }}
          type="text"
          placeholder="Search games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 🎮 Game Grid */}
      <section className="grid md:grid-cols-3 gap-6 px-8 pb-16">
        <AnimatePresence>
          {filteredGames.map((game, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-gray-900 rounded-xl p-4 shadow-lg hover:shadow-blue-600/40 transition"
            >
              <img
                src={game.image}
                alt={game.title}
                className="rounded-lg mb-3"
              />
              <h3 className="text-xl font-semibold">{game.title}</h3>
              <p className="text-gray-400 text-sm mb-3">{game.description}</p>
              <a
                href={game.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition inline-block"
              >
                Download
              </a>
            </motion.div>
          ))}
        </AnimatePresence>
      </section>

      {/* 🩶 Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm border-t border-gray-800">
        Luna  {new Date().getFullYear()} — all love appreciated ❤️
      </footer>
    </div>
  );
}
