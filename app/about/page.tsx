"use client";
import { useRouter } from "next/navigation";

const providers = [
  {
    name: "Grace Paradela, M.D.",
    title: "Board Certified in Internal Medicine",
    bio: `Dr. Grace Paradela completed her medical studies in the Philippines. She graduated magna cum laude in BS Medical Technology as her undergraduate degree. Dr. Paradela interned at the Philippine General Hospital, which happens to be the largest tertiary referral hospital in the country. Dr. Paradela has worked in multiple rural areas of the country, working with pediatrics, minor surgery, family practice, and Obstetrics and gynecology. After fulfilling her residency in Internal Medicine in New Jersey, she moved to St. George in 2002.  She has been practicing acupuncture since 2006. She greatly values the integration of both western and eastern disciplines. Dr. Paradela is board-certified in Internal Medicine, board eligible in acupuncture and obesity medicine. She enjoys family time with her husband and her two sons and two furbabies. She enjoys poetry, landscape and flower photography,  bagmaking, karaoke and crime TV.`,
    image: "/grace.png",
  },
  {
    name: "Jonathan Baza, DO",
    title: "Board Certified in Family Medicine",
    bio: "Dr. Jonathan Baza is originally from Bountiful, Utah. His undergraduate degree was in Athletic Therapy, at Weber State University in Ogden Utah. He graduated from medical school in 2016 from Touro University Nevada. He completed a residency at Southeastern Health in Lumberton, North Carolina. Dr. Baza received his medical degree in Osteopathic Medicine and had residency training in Family Medicine. He uses Osteopathic Manipulative Treatments (OMT) to treat a variety of sports and chronic injuries. His medical interests include: sports medicine, dermatology, and women’s health. Dr. Baza is married and has three children. He and his family love playing games together and traveling, pickle ball, hiking and mountain biking.",
    image: "/baza.png",
  },
  {
    name: "Carl Turner, DO",
    title: "Board Certified in Family Medicine",
    bio: `Bringing smiles, stethoscopes, and sometimes balloon animals to the exam room, Dr. Turner is passionate about providing care in a welcoming, family-focused environment. From newborn checkups to well-woman exams to grandpa’s blood pressure, Dr. Turner enjoys caring for every member of the family.
Originally from Bountiful, Utah, Dr. Turner completed undergraduate studies at Weber State University before heading to Des Moines University for medical school. He then trained at Wesley Medical Center in Wichita, Kansas. He has over a decade of experience in primary care and has enjoyed serving families in the rural community of McPherson, Kansas, for the past eight years where he focused on pediatric care and women’s health. He and his wife enjoy the noise of their five wonderful children, three girls and two boys.
Outside of the clinic, Dr. Turner loves watching and playing sports, spending time withhis family, and being a part of the community.`,
    image: "/turner.png",
  },
  {
    name: "Stacy Sumpter, DNP-C",
    title: "Doctor of Nursing Practice, Board Certified Nurse Practitioner",
    bio: `Stacy Sumpter, DNP-C began her nursing career in 1994. Living in a rural community, she had the opportunity to work in multiple areas including obstetrics/gynecology, labor and delivery, intensive care unit, medical surgical in addition to home care and hospice. Stacy expanded her education earning a Master’s Degree in Nursing from Graceland University. She began working as a board-certified nurse practitioner in Southern Utah in 2005. Stacy earned her Doctor of Nursing Practice degree from the University of Nevada-Las Vegas in 2022. She took her first course in Bio-identical hormone replacement in 2009 which sparked a passion to learn more and she became certified in Advanced Bio-identical Hormone Replacement Therapy. Stacy believes that education, understanding and partnership are the key components to a successful patient relationship. Stacy enjoys working together to develop a personalized plan of care for health, prevention and disease management.

She is a member of the American Academy of Nurse Practitioners, Sigma Theta Tau Zeta Kappa (changed) chapter, and Golden Key International Honor Society and Certified in Advanced Bio-identical hormone replacement therapy. Stacy is married and has three grown children. Together they enjoy boating, trail riding, hiking, and any outdoor activity that Southern Utah has to offer.`,
    image: "/sumpter.png",
  },
  {
    name: "Adam Dye, FNP-C",
    title:
      "Master’s Degree in Nursing, Board Certified Family Nurse Practitioner",
    bio: `Adam Dye, FNP-C began his career as a nurse in 2006. He graduated with a BSN from Idaho State University, in Pocatello. Right out of school he started working as an ICU nurse in Idaho Falls. This provided a great opportunity to learn to manage critically ill patients. In 2010, he decided to pursue a master’s degree in Nursing. During that same year, he continued doing school full-time and continued working full-time. Adam graduated in 2012 with a Master’s of Science Degree as a Family Nurse Practitioner, from Idaho State University. Adam was board certified shortly thereafter.
Adam enjoys serving his community and getting to know people individually. Adam takes a personal interest in each of his patients’ care and well-being. Adam loves spending time with his wife and six kids. With 4 kids and a set of twin boys, they are sure to keep him on his toes. He enjoys mountain bike riding, running, and staying active and is always up for a fun adventure with family and friends.`,
    image: "/dye.png",
  },
  {
    name: "Jacob Ewell, DNP-FNP",
    title: "Doctor of Nursing Practice, Certified Family Nurse Practitioner",
    bio: `Jacob Ewell grew up in Southern California. He received his bachelor’s in nursing at Brigham Young University-Idaho and worked as a registered nurse in the Neurological Critical Care Unit at the University of Utah hospital for five years. While working as an ICU nurse, he attended Weber State University where he graduated with his doctorate of nursing practice with an emphasis in family practice.
Jacob is passionate about providing preventive and holistic care to patients and their families. He and his wife enjoy traveling and spending time outdoors with their son. Other hobbies of Jacob’s include running, hiking, mountain biking, and dirt biking.`,
    image: "/ewell.png",
  },
  {
    name: "Noah Yoshida, PA-C",
    title:
      "MPAS, PA-C (Master of Physician Assistant Studies, Board Certified Physician Assistant)",
    bio: `Noah Yoshida was born and raised in Omaha, Nebraska. He received a Bachelor of Science degree in biophysics from Creighton University. After graduating, he was a member of the clinical research team at the University of Nebraska Medical Center and worked in the oncology, hematology, and infectious disease departments. It was at this job that he discovered his passion for patient care and pursued a career as a physician assistant. He received his Master of Physician Assistant Studies degree in 2024 from the University of Nebraska Medical Center. His favorite clinical rotations were dermatology, plastic surgery, oncology, and cardiology. Noah moved with his wife to Saint George in 2023 to support her medical school journey at Rocky Vista University College of Osteopathic Medicine. Aside from helping his wife study for exams, Noah enjoys spending too much time at the gym, exploring the outdoors, discovering new recipes to cook, and salsa dancing. Noah, his wife and their son love hiking around Saint George.`,
    image: "/yoshida.png",
    imageFilter:
      "hue-rotate(340deg) saturate(117%) brightness(109%) contrast(110%)",
  },
];

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="w-full text-white">
      {/* Hero Section */}
      <section className="bg-hero-bg py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-secondary font-semibold uppercase tracking-widest text-sm mb-3">
            Who We Are
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-background mb-6">
            About OneHealth
          </h1>
          <p className="max-w-2xl text-white/80 text-lg leading-relaxed">
            We believe everyone deserves accessible, high-quality healthcare —
            with same-day appointments, new patients always welcome, and most
            insurance accepted.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white text-gray-800 py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          {[
            {
              title: "Our Mission",
              body: "To provide compassionate, accessible care to every patient in our community — from routine checkups to complex chronic conditions.",
            },
            {
              title: "Our Vision",
              body: "A healthier Southern Utah where every person has a trusted healthcare provider they can count on.",
            },
            {
              title: "Our Values",
              body: "Integrity, empathy, and excellence guide everything we do — from the front desk to the exam room.",
            },
          ].map((item) => (
            <div key={item.title} className="flex flex-col items-center gap-3">
              <div className="w-12 h-1 bg-primary rounded-full" />
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Providers Section */}
      <section className="bg-gray-50 text-gray-800 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-2 text-center">
            Meet the Team
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Our Providers
          </h2>

          <div className="flex flex-col gap-20">
            {providers.map((provider, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={provider.name}
                  className={`flex flex-col md:flex-row ${
                    isEven ? "" : "md:flex-row-reverse"
                  } items-center gap-10`}
                >
                  <div className="w-full md:w-2/5 shrink-0 h-[450px] md:h-[500px]">
                    {" "}
                    <img
                      src={provider.image}
                      alt={provider.name}
                      className="w-full h-full object-cover object-top"
                      style={
                        provider.imageFilter
                          ? { filter: provider.imageFilter }
                          : undefined
                      }
                    />
                  </div>
                  <div
                    className={`basis-3/5 flex flex-col gap-2 ${
                      isEven ? "md:items-start" : "md:items-end"
                    } items-center text-center md:text-left`}
                  >
                    <div className="w-10 h-1 bg-primary rounded-full" />
                    <h3 className="text-2xl font-bold">{provider.name}</h3>
                    <p className="text-primary font-medium">{provider.title}</p>
                    <p className="text-gray-500 leading-relaxed">
                      {provider.bio}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
