import { join } from "path"
import { writeFile, mkdir } from "fs/promises"

export async function saveFile(file: File, folder: string = "uploads"): Promise<string> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  
  const uploadDir = join(process.cwd(), "public", folder)
  await mkdir(uploadDir, { recursive: true })
  
  // Sanitize filename and add timestamp to prevent collisions
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '')
  const filename = `${Date.now()}-${safeName}`
  const filepath = join(uploadDir, filename)
  
  await writeFile(filepath, buffer)
  return `/${folder}/${filename}`
}
