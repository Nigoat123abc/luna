import { motion } from "framer-motion";
import { Download } from "lucide-react";

const FILES = [
  { title: "Test File", description: "Instant download", url: "/files/hello.txt" },
];

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white flex flex-col items-center justify-center px-6 py-12 space-y-10">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold tracking-wide text-indigo-400"
      >
        Luna Downloads 🌙
      </motion.h1>

      <div className="grid gap-8 md:grid-cols-2">
        {FILES.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="bg-zinc-800/60 border border-zinc-700 rounded-2xl p-6 shadow-xl hover:shadow-indigo-500/20 hover:border-indigo-400 transition-all duration-300"
          >
            <h2 className="text-2xl font-semibold mb-2">{r.title}</h2>
            <p className="text-zinc-400 mb-4">{r.description}</p>
            <a
              href={r.url}
              download
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white font-medium transition"
            >
              <Download className="w-5 h-5" />
              Download
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
