import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const audio = formData.get("audio") as File

  const fw = new FormData()
  fw.append("audio", audio)

  const res = await fetch("http://localhost:8765/transcribe", {
    method: "POST",
    body: fw,
  })
  const data = await res.json()
  return NextResponse.json(data)
}