/**
 * The seven eye-care service lines supplied by the clinic.
 *
 * Descriptions are deliberately general, explaining what the specialty area
 * covers. They do not claim any specific treatment, equipment or surgical
 * procedure. Availability of individual services must be confirmed by the
 * clinic before launch.
 */

export type ServiceIcon =
  | "eye"
  | "child"
  | "cataract"
  | "cornea"
  | "glaucoma"
  | "uvea"
  | "retina";

export type Service = {
  slug: string;
  title: string;
  icon: ServiceIcon;
  summary: string;
  detail: string;
};

export const services: Service[] = [
  {
    slug: "general-ophthalmology",
    title: "General Ophthalmology",
    icon: "eye",
    summary:
      "Comprehensive eye examinations and care for common eye concerns, from changes in vision to irritation and strain.",
    detail:
      "A general eye consultation is the usual first step for most people. It looks at how well you see and the overall health of your eyes, and helps decide whether any further evaluation is needed.",
  },
  {
    slug: "paediatric-eye-care",
    title: "Paediatric Eye Care",
    icon: "child",
    summary:
      "Eye assessments for children, with attention to how vision develops and how it affects learning and everyday life.",
    detail:
      "Children may not always say when they cannot see well. Paediatric eye care focuses on checking a child’s vision and eye health at the right stages of growth.",
  },
  {
    slug: "cataract-evaluation-and-management",
    title: "Cataract Evaluation and Management",
    icon: "cataract",
    summary:
      "Assessment of clouding of the eye’s natural lens, with clear guidance on the options suited to each patient.",
    detail:
      "A cataract is a clouding of the lens inside the eye. Evaluation looks at how it affects daily life, and the available options are explained so patients can decide with confidence.",
  },
  {
    slug: "corneal-diseases",
    title: "Corneal Diseases",
    icon: "cornea",
    summary:
      "Evaluation and care of conditions affecting the cornea, the clear front surface of the eye.",
    detail:
      "The cornea helps focus light and protects the eye. Conditions that affect it can cause pain, redness, glare or blurred vision, and benefit from timely assessment.",
  },
  {
    slug: "glaucoma-evaluation-and-management",
    title: "Glaucoma Evaluation and Management",
    icon: "glaucoma",
    summary:
      "Evaluation and long-term monitoring of glaucoma, a group of conditions that can damage the optic nerve.",
    detail:
      "Glaucoma can develop gradually without obvious early symptoms, which is why regular evaluation and follow-up matter.",
  },
  {
    slug: "uvea",
    title: "Uvea",
    icon: "uvea",
    summary:
      "Evaluation and management of inflammation and other conditions affecting the uvea, the middle layer of the eye.",
    detail:
      "The uvea is the pigmented middle layer of the eye. Conditions here can cause redness, pain, light sensitivity or blurred vision and are best assessed promptly.",
  },
  {
    slug: "medical-retina",
    title: "Medical Retina",
    icon: "retina",
    summary:
      "Evaluation and medical management of conditions affecting the retina, the light-sensitive layer at the back of the eye.",
    detail:
      "The retina turns light into the signals your brain reads as sight. Medical retina care covers the assessment and ongoing management of retinal conditions.",
  },
];
