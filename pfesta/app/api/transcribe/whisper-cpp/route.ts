import { exec } from "child_process"
import { writeFile, unlink } from "fs/promises"
import { NextRequest, NextResponse } from "next/server"
import path from "path"
import os from "os"

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const audio = formData.get("audio") as File
  const buffer = Buffer.from(await audio.arrayBuffer())

  const tmpIn = path.join(os.tmpdir(), `input-${Date.now()}.webm`)
  const tmpWav = tmpIn.replace(".webm", ".wav")
  await writeFile(tmpIn, buffer)

  const ffmpeg = `ffmpeg`
  const whisperBin = process.env.WHISPER_BIN!
  const modelPath = process.env.WHISPER_MODEL!

  return new Promise((resolve) => {
   
    exec(`"${ffmpeg}" -i "${tmpIn}" -ar 16000 -ac 1 "${tmpWav}" -y`, async (err) => {
      if (err) {
        await unlink(tmpIn).catch(() => {})
        return resolve(NextResponse.json({ error: "ffmpeg failed: " + err.message }, { status: 500 }))
      }

    
      exec(`"${whisperBin}" -m "${modelPath}" -f "${tmpWav}" -nt -l fr`, async (err2, stdout) => {
        await unlink(tmpIn).catch(() => {})
        await unlink(tmpWav).catch(() => {})
        if (err2) return resolve(NextResponse.json({ error: err2.message }, { status: 500 }))
        resolve(NextResponse.json({ text: stdout.trim() }))
      })
    })
  })
}