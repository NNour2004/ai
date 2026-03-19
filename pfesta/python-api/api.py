from flask import Flask, request, jsonify
from faster_whisper import WhisperModel
import tempfile, os, subprocess

app = Flask(__name__)
model = WhisperModel("base", device="cpu", compute_type="int8")

@app.route("/transcribe", methods=["POST"])
def transcribe():
    if "audio" not in request.files:
        return jsonify({"error": "No audio file"}), 400
    
    audio = request.files["audio"]
    
  
    with tempfile.NamedTemporaryFile(suffix=".webm", delete=False) as tmp:
        audio.save(tmp.name)
        webm_path = tmp.name
    
    
    wav_path = webm_path.replace(".webm", ".wav")
    
    try:
        subprocess.run(
            ["ffmpeg", "-i", webm_path, "-ar", "16000", "-ac", "1", wav_path, "-y"],
            capture_output=True
        )
        
        
        segments, info = model.transcribe(wav_path)
        text = " ".join([s.text for s in segments])
        return jsonify({"text": text, "language": info.language})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    finally:
        if os.path.exists(webm_path):
            os.unlink(webm_path)
        if os.path.exists(wav_path):
            os.unlink(wav_path)

if __name__ == "__main__":
    app.run(port=8765, debug=True)