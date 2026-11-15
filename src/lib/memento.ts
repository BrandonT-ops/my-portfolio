import { site } from "@/data/site";

export interface Photo {
  id: string;
  src: string;
  caption: string;
  place: string;
  /** Pixel size when known (only for the bundled snapshot). */
  width?: number;
  height?: number;
}

interface Row {
  id: string;
  caption: string | null;
  place: string | null;
  photo_path: string | null;
  clip: boolean | null;
}

/** The snapshot bundled with the site, used if Memento cannot be reached. */
const snapshot = (): Photo[] => site.photos.map((p, i) => ({ id: `local-${i}`, ...p }));

/**
 * Brandon's pictures, read live from his Memento wall.
 *
 * Only pictures he posted himself and made public ("wall") are included.
 * The list is refreshed in the background at most every 30 minutes, so a new
 * picture on Memento shows up here without redeploying. If Memento is
 * unreachable, the bundled snapshot is used instead.
 */
export async function getPhotos(): Promise<Photo[]> {
  const { url, publicKey, memberId, bucket } = site.memento;
  try {
    const query = new URLSearchParams({
      select: "id,caption,place,photo_path,clip",
      member_id: `eq.${memberId}`,
      visibility: "eq.wall",
      order: "sort_at.desc",
    });
    const res = await fetch(`${url}/rest/v1/moments_view?${query}`, {
      headers: { apikey: publicKey },
      next: { revalidate: 1800 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Memento answered ${res.status}`);
    const rows = (await res.json()) as Row[];
    const photos = rows
      .filter((r) => r.photo_path && !r.clip)
      .map((r) => ({
        id: r.id,
        src: `${url}/storage/v1/object/public/${bucket}/${r.photo_path}`,
        caption: r.caption ?? "",
        place: r.place ?? "",
      }));
    return photos.length ? photos : snapshot();
  } catch {
    return snapshot();
  }
}
