import React from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

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
    level: string;
  }>;
  softSkills: string[];
  languages: Array<{
    name: string;
    level: string;
  }>;
}

interface CVFormProps {
  data: CVData;
  onChange: (data: CVData) => void;
}

const CVForm: React.FC<CVFormProps> = ({ data, onChange }) => {
  const handlePersonalInfoChange = (field: string, value: string) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value,
      },
    });
  };

  const addExperience = () => {
    onChange({
      ...data,
      experience: [
        ...data.experience,
        { company: "", position: "", startDate: "", endDate: "", description: "" },
      ],
    });
  };

  const removeExperience = (index: number) => {
    const newExperience = [...data.experience];
    newExperience.splice(index, 1);
    onChange({
      ...data,
      experience: newExperience,
    });
  };

  const handleExperienceChange = (index: number, field: string, value: string) => {
    const newExperience = [...data.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    onChange({
      ...data,
      experience: newExperience,
    });
  };

  const addSkill = () => {
    onChange({
      ...data,
      skills: [...data.skills, { name: "", level: "Básico" }],
    });
  };

  const removeSkill = (index: number) => {
    const newSkills = [...data.skills];
    newSkills.splice(index, 1);
    onChange({
      ...data,
      skills: newSkills,
    });
  };

  const handleSkillChange = (index: number, field: string, value: string) => {
    const newSkills = [...data.skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    onChange({
      ...data,
      skills: newSkills,
    });
  };

  const addSoftSkill = () => {
    onChange({
      ...data,
      softSkills: [...data.softSkills, ""],
    });
  };

  const removeSoftSkill = (index: number) => {
    const newSoftSkills = [...data.softSkills];
    newSoftSkills.splice(index, 1);
    onChange({
      ...data,
      softSkills: newSoftSkills,
    });
  };

  const handleSoftSkillChange = (index: number, value: string) => {
    const newSoftSkills = [...data.softSkills];
    newSoftSkills[index] = value;
    onChange({
      ...data,
      softSkills: newSoftSkills,
    });
  };

  const addLanguage = () => {
    onChange({
      ...data,
      languages: [...data.languages, { name: "", level: "Básico" }],
    });
  };

  const removeLanguage = (index: number) => {
    const newLanguages = [...data.languages];
    newLanguages.splice(index, 1);
    onChange({
      ...data,
      languages: newLanguages,
    });
  };

  const handleLanguageChange = (index: number, field: string, value: string) => {
    const newLanguages = [...data.languages];
    newLanguages[index] = { ...newLanguages[index], [field]: value };
    onChange({
      ...data,
      languages: newLanguages,
    });
  };

  return (
    <div className="w-full space-y-6 animate-fade-in">
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Informações Pessoais</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={data.personalInfo.name}
              onChange={(e) => handlePersonalInfoChange("name", e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={data.personalInfo.email}
              onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              value={data.personalInfo.phone}
              onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="location">Localização</Label>
            <Input
              id="location"
              value={data.personalInfo.location}
              onChange={(e) => handlePersonalInfoChange("location", e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Experiência Profissional</h2>
          <Button onClick={addExperience} variant="outline" size="sm">
            <PlusCircle className="w-4 h-4 mr-2" />
            Adicionar
          </Button>
        </div>
        <div className="space-y-6">
          {data.experience.map((exp, index) => (
            <div key={index} className="p-4 border rounded-lg relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2"
                onClick={() => removeExperience(index)}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
              <div className="space-y-4">
                <div>
                  <Label>Empresa</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Cargo</Label>
                  <Input
                    value={exp.position}
                    onChange={(e) => handleExperienceChange(index, "position", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Data Início</Label>
                    <Input
                      type="date"
                      value={exp.startDate}
                      onChange={(e) => handleExperienceChange(index, "startDate", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Data Fim</Label>
                    <Input
                      type="date"
                      value={exp.endDate}
                      onChange={(e) => handleExperienceChange(index, "endDate", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label>Descrição</Label>
                  <textarea
                    value={exp.description}
                    onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                    className="mt-1 w-full h-24 p-2 border rounded-md"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Ferramentas e Habilidades</h2>
          <Button onClick={addSkill} variant="outline" size="sm">
            <PlusCircle className="w-4 h-4 mr-2" />
            Adicionar
          </Button>
        </div>
        <div className="space-y-4">
          {data.skills.map((skill, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="flex-1">
                <Input
                  value={skill.name}
                  onChange={(e) => handleSkillChange(index, "name", e.target.value)}
                  placeholder="Nome da habilidade"
                />
              </div>
              <div className="w-40">
                <Select
                  value={skill.level}
                  onValueChange={(value) => handleSkillChange(index, "level", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Nível" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Básico">Básico</SelectItem>
                    <SelectItem value="Intermediário">Intermediário</SelectItem>
                    <SelectItem value="Avançado">Avançado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeSkill(index)}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Soft Skills</h2>
          <Button onClick={addSoftSkill} variant="outline" size="sm">
            <PlusCircle className="w-4 h-4 mr-2" />
            Adicionar
          </Button>
        </div>
        <div className="space-y-4">
          {data.softSkills.map((skill, index) => (
            <div key={index} className="flex gap-4 items-center">
              <Input
                value={skill}
                onChange={(e) => handleSoftSkillChange(index, e.target.value)}
                placeholder="Digite uma soft skill"
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeSoftSkill(index)}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Idiomas</h2>
          <Button onClick={addLanguage} variant="outline" size="sm">
            <PlusCircle className="w-4 h-4 mr-2" />
            Adicionar
          </Button>
        </div>
        <div className="space-y-4">
          {data.languages.map((language, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="flex-1">
                <Input
                  value={language.name}
                  onChange={(e) => handleLanguageChange(index, "name", e.target.value)}
                  placeholder="Nome do idioma"
                />
              </div>
              <div className="w-40">
                <Select
                  value={language.level}
                  onValueChange={(value) => handleLanguageChange(index, "level", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Nível" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Básico">Básico</SelectItem>
                    <SelectItem value="Intermediário">Intermediário</SelectItem>
                    <SelectItem value="Avançado">Avançado</SelectItem>
                    <SelectItem value="Fluente">Fluente</SelectItem>
                    <SelectItem value="Nativo">Nativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeLanguage(index)}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default CVForm;
