import React from "react";
import { Building2, User } from "lucide-react";

interface SchoolAvatarProps {
  avatarUrl: string | null;
  className?: string;
  iconClassName?: string;
  schoolName?: string;
}

function getInitials(name: string): string {
  if (!name) return "ES";
  // Remove "EMEF" or "EMER" or "EM EFE" prefix (case-insensitive/trimmed)
  let clean = name.trim().replace(/^emef\s+/i, "");
  // Remove common prefix titles
  clean = clean.replace(/^(dr\.?|dra\.?|prof\s+|prof\.?|professora?)\s+/i, "");
  
  // Split into words
  const words = clean.split(/\s+/).filter(word => {
    const lower = word.toLowerCase();
    // filter out prepositions/common articles in Portuguese and English
    return !["de", "do", "da", "dos", "das", "e", "o", "a", "of", "and", "the", "in"].includes(lower);
  });
  
  if (words.length === 0) {
    return clean.slice(0, 2).toUpperCase();
  }
  
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }
  
  return (words[0][0] + words[1][0]).toUpperCase();
}

export function SchoolAvatar({ avatarUrl, className = "w-full h-full", iconClassName = "w-1/2 h-1/2", schoolName }: SchoolAvatarProps) {
  // Always render the Letter Initials Avatar (neon cyan) for the school
  const nameToUse = schoolName && schoolName !== "Não Informado" ? schoolName : "Escola Municipal";
  const initials = getInitials(nameToUse);
  const isSmall = className.includes("w-6") || className.includes("w-7") || className.includes("w-8") || className.includes("w-10");
  const textSize = isSmall ? "text-[10px] font-black" : "text-sm sm:text-base font-black tracking-wider";

  return (
    <div 
      className={`flex items-center justify-center rounded-full border border-cyan-400/50 bg-[#050b14]/90 text-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.25)] select-none shrink-0 overflow-hidden ${className}`}
    >
      <span className={`${textSize} text-[#00f0ff] uppercase select-none leading-none drop-shadow-[0_0_4px_rgba(0,240,255,0.4)]`}>
        {initials}
      </span>
    </div>
  );
}
