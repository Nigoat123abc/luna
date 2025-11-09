import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Home, Download, MessageCircle, BookOpen } from "lucide-react";

/**
 * Luna - English storefront (detail modal, video/image preview, download, Discord)
 * - Replace downloadUrl values with your real file URLs
 * - Replace the Discord invite link below with your invite
 * - "Made by Me" and creation date shown in the sidebar/footer
 */

const CREATION_DATE = "2025-11-09";
const AUTHOR = "Made by Me";

const GAMES = [
  {
    id: "cyber-drift",
    title: "Cyber Drift",
    subtitle: "Futuristic neon racing",
    description:
      "High-speed futuristic racing with neon lights, tight handling and online leaderboards.",
    image:
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1400&q=60",
    video: "", // set to "/files/cyber-drift-preview.mp4" if you have a preview video
    platform: "Windows",
    version: "v1.2.0",
    views: 1234,
    author: "Luna Studios",
    releaseDate: "2025-10-01",
    downloadUrl: "/files/cyber-drift.zip",
    tutorial: [
      {
        title: "Installation",
        steps: [
          "Download the ZIP file.",
          "Extract to a folder.",
          "Run installer.exe and follow the prompts.",
        ],
      },
      {
        title: "First launch",
        steps: [
          "Open the game from the desktop shortcut.",
          "Set resolution in Settings → Display.",
          "Sign up for an online account if you want leaderboards.",
        ],
      },
    ],
  },
  {
    id: "moon-raiders",
    title: "Moon Raiders",
    subtitle: "Sci-Fi tactical shooter",
    description:
      "Tactical co-op shooter set on a moonbase. Intense firefights and destructible environments.",
    image:
      "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?auto=format&fit=crop&w=1400&q=60",
    video: "",
    platform: "Windows",
    version: "v0.9.4",
    views: 842,
    author: "Luna Collective",
    releaseDate: "2025-08-16",
    downloadUrl: "/files/moon-raiders.zip",
    tutorial: [
      {
        title: "Quickstart",
        steps: [
          "Extract the archive.",
          "Run moon-raiders.exe as administrator.",
          "Accept firewall prompt for networking.",
        ],
      },
    ],
  },
];

export default function App() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = GAMES.filter(
    (g) =>
      g.title.toLowerCase().includes(query.toLowerCase()) ||
      g.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#030405] via-[#071016] to-[#05060a] text-gray-100">
      {/* NAV */}
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="backdrop-blur-sm bg-black/40 border-b border-zinc-800"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Home className="w-6 h-6 text-indigo-400" />
            <div>
              <div className="text-lg font-semibold text-indigo-300">Luna</div>
              <div className="text-xs text-zinc-400">Storefront • Downloads</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-zinc-400 w-4 h-4" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search games, keywords..."
                className="pl-10 pr-4 py-2 rounded-xl bg-zinc-800 text-sm border border-zinc-700 focus:border-indigo-500 outline-none"
              />
            </div>
            <a
              href="#"
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:brightness-105 text-white text-sm"
            >
              Sign in
            </a>
          </div>
        </div>
      </motion.header>

      {/* HERO + GRID */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-indigo-300 mb-6"
        >
          Recent Games
        </motion.h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((g, i) => (
            <motion.article
              key={g.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.02 }}
              className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg"
            >
              <div
                className="h-44 bg-center bg-cover"
                style={{ backgroundImage: `url(${g.image})` }}
              />
              <div className="p-4 flex flex-col gap-3">
                <div>
                  <div className="text-lg font-semibold">{g.title}</div>
                  <div className="text-xs text-zinc-400">{g.subtitle}</div>
                </div>
                <p className="text-sm text-zinc-300 line-clamp-3">{g.description}</p>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex gap-2 items-center text-xs text-zinc-400">
                    <div>• {g.platform}</div>
                    <div>• {g.version}</div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelected(g)}
                      className="px-3 py-2 rounded-lg bg-zinc-800/60 border border-zinc-700 text-sm"
                    >
                      Details
                    </button>
                    <a
                      href={g.downloadUrl}
                      download
                      className="inline-flex items-center gap-2 px-3 py-2 bg-indigo-600 rounded-lg text-sm text-white hover:brightness-105"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full text-center text-zinc-400 py-8">
              No results for “{query}”
            </div>
          )}
        </div>
      </main>

      {/* DETAIL MODAL / PAGE */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-6"
          >
            <div className="absolute inset-0 bg-black/60" onClick={() => setSelected(null)} />
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative z-50 w-full max-w-6xl bg-gradient-to-b from-zinc-900 to-zinc-800 rounded-2xl shadow-2xl overflow-hidden border border-zinc-800"
            >
              <div className="grid md:grid-cols-3 gap-6">
                {/* Preview area (video or image) */}
                <div className="md:col-span-2">
                  {selected.video ? (
                    <video
                      src={selected.video}
                      controls
                      playsInline
                      muted
                      poster={selected.image}
                      className="w-full h-72 object-cover bg-black"
                    />
                  ) : (
                    <img
                      src={selected.image}
                      alt={selected.title}
                      className="w-full h-72 object-cover"
                    />
                  )}

                  <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-1">{selected.title}</h2>
                    <div className="text-sm text-zinc-400 mb-4">{selected.subtitle}</div>
                    <p className="text-zinc-300 mb-6">{selected.description}</p>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-zinc-200">Tutorial & Installation</h3>
                      {selected.tutorial.map((sec, idx) => (
                        <div key={idx} className="bg-zinc-900/40 p-4 rounded-lg border border-zinc-800">
                          <div className="font-semibold text-zinc-100 mb-2">{sec.title}</div>
                          <ol className="list-decimal list-inside text-zinc-300 text-sm space-y-1">
                            {sec.steps.map((s, i) => (
                              <li key={i}>{s}</li>
                            ))}
                          </ol>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <aside className="p-6 border-l border-zinc-800">
                  <div className="flex flex-col gap-4">
                    <div className="bg-zinc-900/40 p-4 rounded-lg border border-zinc-800">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-zinc-400">Resource information</div>
                        </div>
                        <div className="text-xs text-zinc-400">{selected.releaseDate}</div>
                      </div>

                      <ul className="mt-3 text-sm text-zinc-300 space-y-2">
                        <li><strong>Version:</strong> {selected.version}</li>
                        <li><strong>Platform:</strong> {selected.platform}</li>
                        <li><strong>Views:</strong> {selected.views}</li>
                        <li><strong>Published by:</strong> {selected.author}</li>
                      </ul>
                    </div>

                    <div className="flex flex-col gap-3">
                      <a
                        href={selected.downloadUrl}
                        download
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 rounded-lg text-white font-medium hover:brightness-105"
                      >
                        <Download className="w-4 h-4" /> Download
                      </a>

                      <a
                        href="https://discord.gg/YOUR_INVITE"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-zinc-800 rounded-lg border border-zinc-700 text-zinc-200 hover:bg-zinc-800/70"
                      >
                        <MessageCircle className="w-4 h-4" /> Join our Discord
                      </a>

                      <a
                        href="#faq"
                        onClick={(e) => {
                          e.preventDefault();
                          const el = document.getElementById("faq");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-zinc-800 rounded-lg border border-zinc-700 text-zinc-200 hover:bg-zinc-800/70"
                      >
                        <BookOpen className="w-4 h-4" /> FAQ / Help
                      </a>
                    </div>

                    <div className="text-xs text-zinc-400">
                      <div>{AUTHOR}</div>
                      <div className="mt-2">Created: {CREATION_DATE}</div>
                    </div>
                  </div>
                </aside>
              </div>

              <div className="p-4 flex justify-end border-t border-zinc-800">
                <button
                  onClick={() => setSelected(null)}
                  className="px-4 py-2 rounded-md bg-zinc-800/60"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="mt-12 py-8 text-center text-zinc-500 text-sm">
        © {new Date().getFullYear()} Luna — {AUTHOR} • Created {CREATION_DATE}
      </footer>
    </div>
  );
}
