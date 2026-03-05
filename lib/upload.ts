import { join } from "path"
import { writeFile, mkdir } from "fs/promises"
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export async function saveFile(file: File, folder: string = "uploads"): Promise<string> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // Check if Cloudinary is configured
  if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
    try {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({
          resource_type: "auto",
          folder: folder,
        }, (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(error);
            return;
          }
          if (!result) {
            reject(new Error("Cloudinary upload failed: No result returned"));
            return;
          }
          resolve(result.secure_url);
        }).end(buffer);
      });
    } catch (error) {
      console.error("Cloudinary upload exception:", error);
      throw error;
    }
  }

  // Fallback to local storage (Default for development)
  const uploadDir = join(process.cwd(), "public", folder)
  await mkdir(uploadDir, { recursive: true })
  
  // Sanitize filename and add timestamp to prevent collisions
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '')
  const filename = `${Date.now()}-${safeName}`
  const filepath = join(uploadDir, filename)
  
  await writeFile(filepath, buffer)
  return `/${folder}/${filename}`
}
