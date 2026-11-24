/**
 * Doctor profile.
 *
 * ALL SUPPLIED by the clinic: name, qualifications, designation, registration
 * number, biography, education details, clinical interests, awards and portrait.
 * Text below is the clinic's wording. Edit only with the clinic's approval.
 * If any field is set back to `null`, the page shows a labelled placeholder
 * while `site.showDraftNotes` is true and hides that section when it is false.
 *
 * Portrait: supplied by the clinic and saved as /public/images/doctor/dr-chandana.webp.
 * To replace it, overwrite that file (portrait or square, at least 1000 px wide).
 */

const chandana = {
  slug: "dr-chandana-prabhakar",
  name: "Dr. Chandana Prabhakar",
  qualifications: "MBBS, DO (NBE)",
  designation: "Consultant Ophthalmologist and Surgeon",
  registration: "TCMC Registration No: 82193",

  /** Portrait supplied by the clinic. Replace the file (same name) to change it; set to null to show the placeholder again. */
  photo: "/images/doctor/dr-chandana.webp" as string | null,
  photoAlt:
    "Dr. Chandana Prabhakar smiling, with a stethoscope around her neck and arms folded, in a light blue embroidered top.",

  /** Biography, as supplied by the clinic. */
  biography: [
    "Dr. Chandana Prabhakar is a Consultant Ophthalmologist and Surgeon with a strong academic background and clinical experience in the field of ophthalmology. She completed her MBBS from Government Medical College, Palakkad, followed by postgraduate training in Ophthalmology at Chandrakanth's Malabar Super Speciality Eye Hospital, Calicut, Kerala.",
    "She currently serves as a Consultant Ophthalmologist at a reputed hospital in Malappuram, providing comprehensive eye care with a focus on accurate diagnosis, evidence-based treatment, and compassionate patient care.",
    "With a keen interest in academic advancement and clinical excellence, Dr. Chandana has presented scientific papers at various state and national ophthalmology conferences. Her academic achievements include winning the COC RETNET Free Paper Award at KSOS 2024, recognizing her contribution to ophthalmic academics and scientific presentations.",
    "Her clinical interests span general ophthalmology, paediatric eye care, cataract management, corneal disorders, glaucoma, uvea and medical retina. She is committed to delivering ethical, patient-centred eye care while continually advancing her clinical knowledge and skills.",
  ] as string[] | null,
  qualificationDetails: [
    { title: "MBBS", institution: "Government Medical College, Palakkad, Kerala" },
    {
      title: "DO (NBE)",
      institution: "Dr. Chandrakanth's Malabar Super Specialty Eye Hospital, Kerala",
    },
  ] as { title: string; institution?: string }[] | null,
  clinicalInterests: [
    "General Ophthalmology",
    "Paediatric Ophthalmology",
    "Cataract Evaluation and Management",
    "Corneal Diseases",
    "Glaucoma Evaluation and Management",
    "Uvea",
    "Medical Retina",
  ] as string[] | null,
  awards: [
    "Winner – COC RETNET Free Paper Award, KSOS 2024",
    "Scientific paper presentations at state and national ophthalmology conferences",
    "IMA MEDTECH IDEATHON 2025 Third runner up Award",
  ] as string[] | null,
};

const lakshmi = {
  slug: "dr-lakshmi-a-menon",
  name: "Dr. Lakshmi A. Menon",
  qualifications: "MBBS, DNB",
  designation: "Consultant Ophthalmologist and Surgeon",
  registration: "TCMC Registration No: 79759",

  /** Portrait supplied by the clinic. Replace the file (same name) to change it. */
  photo: "/images/doctor/dr-lakshmi.webp" as string | null,
  photoAlt: "Dr. Lakshmi A. Menon in a navy blue embroidered top.",

  biography: [
    "Dr. Lakshmi A. Menon is a Consultant Ophthalmologist and Surgeon with a solid foundation in clinical ophthalmology and a commitment to delivering comprehensive eye care. She completed her MBBS from Government Medical College, Kannur, in 2019, followed by her postgraduate training in Ophthalmology at Dr. Agarwal’s Eye Hospital, Chennai.",
    "She has qualified Part A and B of the FICO examinations (Fellow of the International Council of Ophthalmology), reflecting her dedication to professional excellence and continued learning. She is committed to providing ethical, compassionate, and patient-centred eye care.",
  ] as string[] | null,
  qualificationDetails: [
    { title: "MBBS (2019)", institution: "Government Medical College, Kannur, Kerala" },
    { title: "DNB Ophthalmology", institution: "Dr. Agarwal’s Eye Hospital, Chennai" },
    { title: "FICO Part A and B qualified", institution: "International Council of Ophthalmology" },
  ] as { title: string; institution?: string }[] | null,
  clinicalInterests: [
    "General Ophthalmology",
    "Paediatric Ophthalmology",
    "Cataract",
    "Glaucoma",
    "Medical Retina",
    "Uvea",
    "Cornea",
  ] as string[] | null,
  awards: null as string[] | null,
};

export type Doctor = typeof chandana | typeof lakshmi;

export const doctors: Doctor[] = [chandana, lakshmi];

/** First doctor, kept for code that expects a single profile. */
export const doctor = chandana;
