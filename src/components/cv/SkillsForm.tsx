
import React from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Skill } from '@/types/cv';

interface SkillsFormProps {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({ skills, onChange }) => {
  const addSkill = () => {
    onChange([...skills, { name: "", level: "Básico" }]);
  };

  const removeSkill = (index: number) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    onChange(newSkills);
  };

  const handleSkillChange = (index: number, field: keyof Skill, value: string) => {
    const newSkills = [...skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    onChange(newSkills);
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Ferramentas e Habilidades</h2>
        <Button onClick={addSkill} variant="outline" size="sm">
          <PlusCircle className="w-4 h-4 mr-2" />
          Adicionar
        </Button>
      </div>
      <div className="space-y-4">
        {skills.map((skill, index) => (
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
  );
};
