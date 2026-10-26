import meta from "./image-meta.json";

/**
 * Facilities gallery. Images were extracted from the supplied
 * "RKM EYE CLINIC RENDERS" PDF and optimised to WebP (see /public/images/clinic).
 *
 * All images are ARCHITECTURAL VISUALISATIONS, not photographs of the
 * completed clinic. Signage, fittings and displayed brand names in the
 * renders are design illustrations and may differ in the finished clinic.
 */

export const galleryCategories = [
  "Clinic Exterior",
  "Reception and Waiting Area",
  "Consultation Area",
  "Optical Showroom",
  "Interior Design Gallery",
] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

export type GalleryImage = {
  id: keyof typeof meta;
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  blurDataURL: string;
  categories: GalleryCategory[];
};

function img(
  id: keyof typeof meta,
  alt: string,
  caption: string,
  categories: GalleryCategory[],
): GalleryImage {
  const m = meta[id];
  return {
    id,
    src: `/images/clinic/${id}.webp`,
    alt,
    caption,
    width: m.width,
    height: m.height,
    blurDataURL: m.blur,
    categories,
  };
}

export const galleryImages: GalleryImage[] = [
  img(
    "exterior-front",
    "Architectural visualisation of the RKM Eye Clinic and RKM Optical Care frontage, with glazed shopfront and illuminated signage.",
    "Clinic frontage",
    ["Clinic Exterior"],
  ),
  img(
    "exterior-angle",
    "Architectural visualisation of the RKM Eye Clinic entrance seen from an angle, with planting and a signage pillar.",
    "Entrance and signage pillar",
    ["Clinic Exterior"],
  ),
  img(
    "reception-entrance",
    "Architectural visualisation of the reception counter, waiting seats and the doctor’s cabin entrance.",
    "Reception and entrance",
    ["Reception and Waiting Area", "Interior Design Gallery"],
  ),
  img(
    "waiting-area",
    "Architectural visualisation of the waiting area with two benches facing the illuminated RKM Eye Care wall.",
    "Waiting area",
    ["Reception and Waiting Area", "Interior Design Gallery"],
  ),
  img(
    "consultation-room",
    "Architectural visualisation of a consultation room with an examination chair and desk, beside a second room with an examination couch.",
    "Consultation and examination rooms",
    ["Consultation Area", "Interior Design Gallery"],
  ),
  img(
    "optical-showroom-corner",
    "Architectural visualisation of the optical showroom with illuminated frame displays, a mirror and a central fitting counter.",
    "Optical showroom, frame displays",
    ["Optical Showroom", "Interior Design Gallery"],
  ),
  img(
    "optical-showroom-wall",
    "Architectural visualisation of the optical showroom’s back-lit eyewear wall and counter with seating.",
    "Optical showroom, eyewear wall",
    ["Optical Showroom", "Interior Design Gallery"],
  ),
  img(
    "optical-waiting-view",
    "Architectural visualisation looking from the waiting seats through a glass partition to the optical showroom displays.",
    "View through to the optical showroom",
    ["Optical Showroom", "Interior Design Gallery"],
  ),
];

export function getImage(id: keyof typeof meta) {
  const found = galleryImages.find((g) => g.id === id);
  if (!found) throw new Error(`Unknown gallery image: ${id}`);
  return found;
}
