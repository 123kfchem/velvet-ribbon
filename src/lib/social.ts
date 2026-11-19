export type Platform = "instagram" | "facebook" | "tiktok" | "whatsapp";
export type SocialDestinations = Record<Platform, string | null>;

export const platformNames: Record<Platform, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  tiktok: "TikTok",
  whatsapp: "WhatsApp",
};

export const emptyDestinations: SocialDestinations = {
  instagram: null,
  facebook: null,
  tiktok: null,
  whatsapp: null,
};

export function resolveDestination(platform: Platform, value: unknown): string | null {
  if (typeof value !== "string" || !value.trim() || value.includes("[")) return null;

  if (platform === "whatsapp") {
    const digits = value.trim().replace(/[\s().+-]/g, "");
    if (/^0\d{9}$/.test(digits)) {
      return `https://wa.me/254${digits.slice(1)}`;
    }
    if (/^254\d{9}$/.test(digits) || /^\d{10,15}$/.test(digits)) {
      return `https://wa.me/${digits}`;
    }
    return null;
  }

  try {
    const url = new URL(value.trim());
    const host = url.hostname.replace(/^www\./, "");
    if (url.protocol !== "https:" || url.username || url.password || url.port) return null;
    if (host !== `${platform}.com`) return null;

    // Accept profile destinations, not a platform homepage or an individual post.
    if (platform === "facebook") {
      if (url.pathname === "/profile.php") {
        return /^615\d{10,}$/.test(url.searchParams.get("id") ?? "") ? url.href : null;
      }
      return /^\/[a-z\d.\-_]+\/?$/i.test(url.pathname) ? url.href : null;
    }
    const isProfile = platform === "instagram"
      ? /^\/[a-z\d._]+\/?$/i.test(url.pathname) && !/^\/(p|reels?|stories|explore|accounts|direct|about|developer)\/?$/i.test(url.pathname)
      : /^\/@[a-z\d._]+\/?$/i.test(url.pathname);
    return isProfile ? url.href : null;
  } catch {
    return null;
  }
}

export function readDestinations(value: unknown): SocialDestinations {
  if (!value || typeof value !== "object") return { ...emptyDestinations };
  const config = value as Record<string, unknown>;
  return {
    instagram: resolveDestination("instagram", config.instagram),
    facebook: resolveDestination("facebook", config.facebook),
    tiktok: resolveDestination("tiktok", config.tiktok),
    whatsapp: resolveDestination("whatsapp", config.whatsapp),
  };
}