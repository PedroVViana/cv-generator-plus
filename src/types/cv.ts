
export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Skill {
  name: string;
  level: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Array<{
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
  }>;
  skills: Skill[];
  softSkills: string[];
  languages: Language[];
}
