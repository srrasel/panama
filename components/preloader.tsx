import Image from "next/image"

export default function Preloader() {
  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-white">
      <Image 
        src="/preloader.gif" 
        alt="Loading..." 
        width={100} 
        height={100} 
        unoptimized 
      />
    </div>
  )
}
