"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Loader2, User } from "lucide-react";
import { userService } from "@/services/userService";

const AvatarUpload = ({ currentAvatarSrc, userName }) => {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [preview, setPreview] = useState(null); // local preview before upload
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState(null);

  // When the user picks a file, show a preview immediately
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setMessage(null);
    setPreview(URL.createObjectURL(file));
    handleUpload(file);
  };

  const handleUpload = async (file) => {
    setIsUploading(true);
    setMessage(null);
    try {
      await userService.uploadProfileImage(file);
      setMessage({ type: "success", text: "Photo updated!" });
      router.refresh(); // re-fetch profile page data to show the new image
    } catch (error) {
      setMessage({ type: "error", text: error.message });
      setPreview(null);
    } finally {
      setIsUploading(false);
    }
  };

  const displaySrc = preview || currentAvatarSrc;

  return (
    <div className="flex flex-col items-center gap-2 sm:items-start">
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        aria-label="Upload profile photo"
        className="group relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-teal-100 bg-teal-50 shadow transition focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 disabled:cursor-not-allowed"
      >
        {displaySrc ? (
          <img
            src={displaySrc}
            alt={`${userName} profile photo`}
            className="h-full w-full object-cover"
          />
        ) : (
          <User className="h-12 w-12 text-teal-400" aria-hidden="true" />
        )}

        <span
          className={`absolute inset-0 flex items-center justify-center rounded-full bg-black/40 transition-opacity ${
            isUploading ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
          aria-hidden="true"
        >
          {isUploading ? (
            <Loader2 className="h-6 w-6 animate-spin text-white" />
          ) : (
            <Camera className="h-6 w-6 text-white" />
          )}
        </span>
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleFileChange}
        aria-hidden="true"
      />

      <p className="text-xs text-slate-400">
        {isUploading ? "Uploading…" : "Click photo to change"}
      </p>

      {message && (
        <p
          role="alert"
          className={`text-xs font-medium ${
            message.type === "success" ? "text-teal-600" : "text-red-500"
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
};

export default AvatarUpload;
