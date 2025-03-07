
import React from 'react';
import { CVData } from '@/types/cv';
import { PersonalInfoForm } from './cv/PersonalInfoForm';
import { ExperienceForm } from './cv/ExperienceForm';
import { SkillsForm } from './cv/SkillsForm';
import { SoftSkillsForm } from './cv/SoftSkillsForm';
import { LanguagesForm } from './cv/LanguagesForm';

interface CVFormProps {
  data: CVData;
  onChange: (data: CVData) => void;
}

const CVForm: React.FC<CVFormProps> = ({ data, onChange }) => {
  return (
    <div className="w-full space-y-6 animate-fade-in">
      <PersonalInfoForm
        data={data.personalInfo}
        onChange={(personalInfo) => onChange({ ...data, personalInfo })}
      />
      
      <ExperienceForm
        experiences={data.experience}
        onChange={(experience) => onChange({ ...data, experience })}
      />

      <SkillsForm
        skills={data.skills}
        onChange={(skills) => onChange({ ...data, skills })}
      />

      <SoftSkillsForm
        softSkills={data.softSkills}
        onChange={(softSkills) => onChange({ ...data, softSkills })}
      />

      <LanguagesForm
        languages={data.languages}
        onChange={(languages) => onChange({ ...data, languages })}
      />
    </div>
  );
};

export default CVForm;
