"use client"

import { useState, useRef } from "react"
import { Camera, Loader2, User } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface ProfileImageUploadProps {
  currentImageUrl?: string | null
  onImageUploaded: (url: string) => void
  className?: string
  size?: "sm" | "md" | "lg"
}

export function ProfileImageUpload({ 
  currentImageUrl, 
  onImageUploaded, 
  className,
  size = "lg"
}: ProfileImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32"
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file")
      return
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error("Image size should be less than 5MB")
      return
    }

    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) throw new Error("Upload failed")

      const data = await res.json()
      onImageUploaded(data.url)
      toast.success("Image uploaded successfully")
    } catch (error) {
      console.error("Error uploading image:", error)
      toast.error("Failed to upload image")
    } finally {
      setIsUploading(false)
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  return (
    <div className={cn("relative group mx-auto", sizeClasses[size], className)}>
      <div className={cn(
        "w-full h-full rounded-full overflow-hidden border-4 border-background shadow-xl bg-muted flex items-center justify-center relative",
        isUploading && "opacity-70"
      )}>
        {currentImageUrl ? (
          <img 
            src={currentImageUrl} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        ) : (
          <User className="w-1/2 h-1/2 text-muted-foreground" />
        )}
        
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        )}
      </div>

      <button
        type="button"
        disabled={isUploading}
        onClick={() => fileInputRef.current?.click()}
        className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Camera className="w-4 h-4" />
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}
