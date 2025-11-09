import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const CLIENT_ID = "1437161197349634235";
  const REDIRECT_URI = "https://luna-site.netlify.app/";
  const API_ENDPOINT = "https://discord.com/api/oauth2/authorize";

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("discord_user");
    if (storedUser) setUser(JSON.parse(storedUser));

    if (window.location.hash) {
      const params = new URLSearchParams(window.location.hash.slice(1));
      const accessToken = params.get("access_token");
      if (accessToken) {
        fetch("https://discord.com/api/users/@me", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
          .then((r) => r.json())
          .then((data) => {
            setUser(data);
            localStorage.setItem("discord_user", JSON.stringify(data));
            window.history.replaceState({}, document.title, "/");
          });
      }
    }
  }, []);

  function loginWithDiscord() {
    const url = `${API_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&response_type=token&scope=identify`;
    window.location.href = url;
  }

  function logout() {
    localStorage.removeItem("discord_user");
    setUser(null);
  }

  function joinDiscord() {
    window.open("https://discord.gg/PxgbepwQcv", "_blank");
  }

  // Game Data
  const games = [
    {
      id: 1,
      title: "Hello Neighbor",
      image:
        "https://cdn2.steamgriddb.com/file/sgdb-cdn/grid/9b4c90de6a3ff9d5aaf9dd9da7e3c20e.png",
      description:
        "Sneak into your neighbor's house to uncover his dark secret in this suspenseful stealth horror game. Every move you make, the AI learns and adapts.",
      link: "https://mega.nz/file/7gxAgTwA#fX8eAg0TdfwknH5E6SpRzBJrD3MK2MF578001y6ZPYA", // you can later replace with your own download page
    },
    // Placeholder games
    ...[2, 3, 4, 5].map((n) => ({
      id: n,
      title: `Game Title ${n}`,
      image: `https://picsum.photos/400/200?random=${n}`,
      description:
        "Dive into the world of Luna — enjoy smooth gameplay and great visuals.",
      link: "#",
    })),
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-4 bg-gray-900 shadow-lg">
        <h1 className="text-2xl font-bold text-blue-400">Luna</h1>
        <div className="flex gap-4 items-center">
          <button className="hover:text-blue-400 transition">Home</button>
          <button className="hover:text-blue-400 transition">Search</button>
          <button
            onClick={joinDiscord}
            className="bg-gray-800 px-4 py-2 rounded-lg hover:bg-blue-700 hover:text-white transition"
          >
            Join our Discord
          </button>

          {!user ? (
            <button
              onClick={loginWithDiscord}
              className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Login with Discord
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <img
                src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <span>{user.username}</span>
              <button
                onClick={logout}
                className="text-sm text-gray-400 hover:text-red-500"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        className="text-center py-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-5xl font-bold mb-4 text-blue-400">
          Welcome to Luna
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          Discover and download your favorite games in one sleek, modern place.
        </p>
      </motion.section>

      {/* Game Grid */}
      <section className="grid md:grid-cols-3 gap-6 px-8 pb-16">
        {games.map((game) => (
          <motion.div
            key={game.id}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-900 rounded-xl p-4 shadow-lg hover:shadow-blue-600/40 transition"
          >
            <img
              src={game.image}
              alt={game.title}
              className="rounded-lg mb-3"
            />
            <h3 className="text-xl font-semibold">{game.title}</h3>
            <p className="text-gray-400 text-sm mb-3">{game.description}</p>
            <button
              onClick={() => window.open(game.link, "_blank")}
              className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Download
            </button>
          </motion.div>
        ))}
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 py-4 border-t border-gray-800">
        © {new Date().getFullYear()} Luna — Appreciate Any Support ❤️.
      </footer>
    </div>
  );
}
