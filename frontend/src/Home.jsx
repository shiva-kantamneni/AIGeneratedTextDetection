import React, { useState } from "react";
import { motion } from "framer-motion";

export default function HomeDetector() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  async function handleDetect(e) {
    e?.preventDefault();
    setError("");
    setResult(null);

    const trimmed = text.trim();
    if (!trimmed) {
      setError("Please enter some text to analyze.");
      return;
    }

    setLoading(true);
    try {
      // NOTE: This component expects a backend endpoint at /api/detect
      // that accepts { text: string } and returns JSON like:
      // { label: 'AI' | 'Human', confidence: 0.92, details: '...' }
      // Replace the fetch URL with your real detection API.
      const res = await fetch("/api/detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: trimmed }),
      });

      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();

      const out = {
        label: data.label ?? (data.ai_score && data.ai_score > 0.5 ? "AI" : "Human"),
        confidence: typeof data.confidence === "number" ? data.confidence : data.ai_score ?? 0,
        details: data.details ?? data.explanation ?? "No additional details.",
      };

      setResult(out);
      setHistory((h) => [{ text: trimmed, ...out, time: new Date().toISOString() }, ...h].slice(0, 10));
    } catch (err) {
      console.error(err);
      setError(err.message || "Detection failed");
    } finally {
      setLoading(false);
    }
  }

  function clearAll() {
    setText("");
    setResult(null);
    setError("");
  }

  function copyResult() {
    if (!result) return;
    const payload = `Label: ${result.label}\nConfidence: ${Math.round(result.confidence * 100)}%\n\n${result.details}`;
    navigator.clipboard?.writeText(payload);
  }

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <motion.header initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-6">
          <h1 className="text-3xl font-bold">AI vs Human Detector</h1>
          <p className="mt-1 text-slate-300">Paste text below to check whether it looks AI-generated or human-written.</p>
        </motion.header>

        <form onSubmit={handleDetect} className="bg-slate-900/50 p-6 rounded-2xl shadow-lg">
          <label className="block text-sm font-medium text-slate-300 mb-2">Input text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
            placeholder="Paste or type text here..."
            className="w-full bg-slate-800/60 border border-slate-700 rounded-lg p-3 text-slate-100 placeholder-slate-500 resize-none focus:outline-none focus:ring-2 focus:ring-slate-500"
          />

          <div className="flex items-center gap-3 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 font-semibold"
            >
              {loading ? "Analyzing..." : "Detect"}
            </button>

            <button
              type="button"
              onClick={clearAll}
              className="px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-sm"
            >
              Clear
            </button>

            <button
              type="button"
              onClick={copyResult}
              disabled={!result}
              className="ml-auto px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-sm disabled:opacity-50"
            >
              Copy Result
            </button>
          </div>

          {error && <div className="mt-4 text-rose-400">{error}</div>}

          {result && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 bg-slate-800/60 p-4 rounded-lg border border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-400">Prediction</div>
                  <div className="text-xl font-bold mt-1">{result.label === "AI" ? "Likely AI-generated" : "Likely Human-written"}</div>
                </div>

                <div className="text-right">
                  <div className="text-sm text-slate-400">Confidence</div>
                  <div className="text-lg font-semibold mt-1">{Math.round(result.confidence * 100)}%</div>
                </div>
              </div>

              <div className="mt-3 text-slate-300 text-sm whitespace-pre-wrap">{result.details}</div>
            </motion.div>
          )}

          {/* history */}
          {history.length > 0 && (
            <div className="mt-6">
              <div className="text-sm text-slate-400 mb-2">Recent checks</div>
              <div className="space-y-2">
                {history.map((h, idx) => (
                  <div key={idx} className="bg-slate-900/40 p-3 rounded-md border border-slate-700">
                    <div className="flex justify-between items-start gap-3">
                      <div className="text-sm text-slate-200 truncate max-w-[60%]">{h.text}</div>
                      <div className="text-right text-xs text-slate-400">
                        <div>{h.label}</div>
                        <div>{Math.round(h.confidence * 100)}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </form>

        <footer className="mt-6 text-xs text-slate-500">Tip: For best results, send at least a few sentences (longer text gives more reliable detection).</footer>
      </div>
    </div>
  );
}
