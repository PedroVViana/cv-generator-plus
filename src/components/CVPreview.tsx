
import React from 'react';
import { Card } from "@/components/ui/card";

interface CVData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
  }>;
  skills: Array<{
    name: string;
    level: 'Básico' | 'Intermediário' | 'Avançado';
  }>;
  softSkills: string[];
}

interface CVPreviewProps {
  data: CVData;
}

const CVPreview: React.FC<CVPreviewProps> = ({ data }) => {
  return (
    <Card className="p-8 bg-white shadow-lg animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">{data.personalInfo.name || "Seu Nome"}</h1>
        <div className="text-secondary space-y-1">
          {data.personalInfo.email && <p>{data.personalInfo.email}</p>}
          {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
          {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
        </div>
      </div>

      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-primary">Experiência Profissional</h2>
          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div key={index} className="border-l-2 border-primary pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{exp.position}</h3>
                    <p className="text-secondary">{exp.company}</p>
                  </div>
                  <div className="text-sm text-secondary">
                    {exp.startDate && exp.endDate && (
                      <p>{`${new Date(exp.startDate).getFullYear()} - ${new Date(exp.endDate).getFullYear()}`}</p>
                    )}
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-primary">Ferramentas e Habilidades</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.skills.map((skill, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                <span>{skill.name}</span>
                <span className="text-sm text-secondary">{skill.level}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.softSkills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-primary">Soft Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.softSkills.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default CVPreview;
