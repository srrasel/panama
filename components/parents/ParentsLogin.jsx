import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";

export default function ParentsLogin() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-24 font-sans text-[#1a1a1a]">
      {/* Protected Page Alert */}
      <div className="flex items-center gap-2 mb-12">
        <AlertCircle className="text-[#8c122a] w-5 h-5" />
        <p className="text-[15px] font-medium text-[#8c122a]">
          This page is protected. Please log in to view this page.
        </p>
      </div>

      {/* Login Instructions */}
      <div className="space-y-8">
        <p className="text-lg font-light text-gray-700">
          Please provide your username and password to log in:
        </p>

        <div className="max-w-xs space-y-4">
          {/* Username Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900 block">
              Username
            </label>
            <Input
              type="text"
              placeholder="Enter your username"
              className="rounded-none border-gray-300 h-12 text-gray-600 placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-[#8c122a]"
            />
          </div>

          {/* Styled Login Button */}
          <Button
            variant="outline"
            className="rounded-none border-2 border-[#8c122a] text-[#1a1a1a] hover:bg-[#8c122a] hover:text-white px-10 py-6 text-xs font-bold tracking-widest uppercase transition-all duration-300"
          >
            Next
          </Button>
        </div>

        {/* Password Reset Link */}
        <p className="pt-4 text-[15px] font-light text-gray-700">
          If you are having trouble logging in, please{" "}
          <button className="font-bold border-b border-gray-900 hover:text-[#8c122a] hover:border-[#8c122a] transition-colors">
            click here to reset your password.
          </button>
        </p>
      </div>
    </section>
  );
}
