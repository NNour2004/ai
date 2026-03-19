"use client"
import { useState, useRef } from "react"

const AGENTS = [
  { id: "whisper-cpp", name: "Whisper.cpp", lang: "C++", endpoint: "/api/transcribe/whisper-cpp" },
  { id: "faster-whisper", name: "faster-whisper", lang: "Python", endpoint: "/api/transcribe/faster-whisper" },
]
const MODELS = ["tiny", "base", "small", "medium", "large-v3"]

export default function Home() {
  const [agent, setAgent] = useState(AGENTS[0])
  const [model, setModel] = useState("base")
  const [recording, setRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [loading, setLoading] = useState(false)
  const mediaRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const mr = new MediaRecorder(stream)
    mr.ondataavailable = e => chunksRef.current.push(e.data)
    mr.onstop = () => sendAudio(new Blob(chunksRef.current, { type: "audio/webm" }))
    mr.start()
    mediaRef.current = mr
    chunksRef.current = []
    setRecording(true)
  }

  function stopRecording() {
    mediaRef.current?.stop()
    setRecording(false)
  }

  async function sendAudio(blob: Blob) {
    setLoading(true)
    try {
      const fd = new FormData()
      fd.append("audio", blob, "recording.webm")
      fd.append("model", model)
      const res = await fetch(agent.endpoint, { method: "POST", body: fd })
      const text = await res.text()
      if (!text) {
        setTranscript("❌ L'API a retourné une réponse vide")
        return
      }
      const data = JSON.parse(text)
      setTranscript(data.text || data.error || "❌ Aucun texte détecté")
    } catch (e) {
      setTranscript("❌ Erreur: " + String(e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-pink-200 p-6 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-pink-800">🎙️ VoiceText</h1>

        {/* Agent selector */}
        <div>
          <p className="text-xs font-semibold text-pink-700 uppercase mb-2">Moteur</p>
          {AGENTS.map(a => (
            <button
              key={a.id}
              onClick={() => setAgent(a)}
              className={`w-full text-left px-3 py-2 rounded-lg mb-1 text-sm transition ${
                agent.id === a.id
                  ? "bg-pink-500 text-white font-semibold"
                  : "text-pink-800 hover:bg-pink-300"
              }`}
            >
              {a.name}
              <span className="ml-2 text-xs opacity-70">({a.lang})</span>
            </button>
          ))}
        </div>

        {/* Model selector */}
        <div>
          <p className="text-xs font-semibold text-pink-700 uppercase mb-2">Modèle</p>
          {MODELS.map(m => (
            <button
              key={m}
              onClick={() => setModel(m)}
              className={`w-full text-left px-3 py-2 rounded-lg mb-1 text-sm transition ${
                model === m
                  ? "bg-pink-500 text-white font-semibold"
                  : "text-pink-800 hover:bg-pink-300"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 bg-gray-50 overflow-auto">
        <h2 className="text-2xl font-bold text-pink-800 mb-2">🎙️ Transcription Audio</h2>
        <p className="text-sm text-gray-400 mb-6">
          Moteur : <strong>{agent.name}</strong> — Modèle : <strong>{model}</strong>
        </p>

        {/* Recording card */}
        <div className="max-w-xl bg-white border border-pink-200 rounded-2xl p-6 shadow mb-6">
          <p className="text-gray-500 text-sm mb-4">
            Cliquez pour commencer l'enregistrement
          </p>
          {!recording ? (
            <button
              onClick={startRecording}
              className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition"
            >
              🎤 Démarrer l'enregistrement
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 animate-pulse"
            >
              ⏹️ Arrêter
            </button>
          )}
          {recording && (
            <p className="text-red-500 animate-pulse mt-4 text-sm">
              🔴 Enregistrement en cours...
            </p>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="max-w-xl bg-pink-50 border border-pink-200 rounded-2xl p-4 text-center mb-6">
            <p className="text-pink-500 animate-pulse">⏳ Transcription en cours...</p>
          </div>
        )}

        {/* Transcript result */}
        {transcript && (
          <div className="max-w-xl bg-white border border-pink-200 rounded-2xl p-6 shadow">
            <h3 className="font-bold text-pink-700 mb-3">📝 Texte transcrit</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{transcript}</p>
            <button
              onClick={() => navigator.clipboard.writeText(transcript)}
              className="mt-4 text-sm text-pink-500 hover:text-pink-700 transition"
            >
              📋 Copier le texte
            </button>
          </div>
        )}
      </div>
    </div>
  )
}