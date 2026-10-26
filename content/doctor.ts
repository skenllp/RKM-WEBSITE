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

export const doctor = {
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
