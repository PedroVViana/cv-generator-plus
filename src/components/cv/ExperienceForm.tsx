
import React from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { Experience } from '@/types/cv';

interface ExperienceFormProps {
  experiences: Experience[];
  onChange: (experiences: Experience[]) => void;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({ experiences, onChange }) => {
  const addExperience = () => {
    onChange([
      ...experiences,
      { company: "", position: "", startDate: "", endDate: "", description: "" },
    ]);
  };

  const removeExperience = (index: number) => {
    const newExperience = [...experiences];
    newExperience.splice(index, 1);
    onChange(newExperience);
  };

  const handleExperienceChange = (index: number, field: keyof Experience, value: string) => {
    const newExperience = [...experiences];
    newExperience[index] = { ...newExperience[index], [field]: value };
    onChange(newExperience);
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Experiência Profissional</h2>
        <Button onClick={addExperience} variant="outline" size="sm">
          <PlusCircle className="w-4 h-4 mr-2" />
          Adicionar
        </Button>
      </div>
      <div className="space-y-6">
        {experiences.map((exp, index) => (
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
  );
};
