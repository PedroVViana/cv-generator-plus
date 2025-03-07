
import React from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";

interface SoftSkillsFormProps {
  softSkills: string[];
  onChange: (softSkills: string[]) => void;
}

export const SoftSkillsForm: React.FC<SoftSkillsFormProps> = ({ softSkills, onChange }) => {
  const addSoftSkill = () => {
    onChange([...softSkills, ""]);
  };

  const removeSoftSkill = (index: number) => {
    const newSoftSkills = [...softSkills];
    newSoftSkills.splice(index, 1);
    onChange(newSoftSkills);
  };

  const handleSoftSkillChange = (index: number, value: string) => {
    const newSoftSkills = [...softSkills];
    newSoftSkills[index] = value;
    onChange(newSoftSkills);
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Soft Skills</h2>
        <Button onClick={addSoftSkill} variant="outline" size="sm">
          <PlusCircle className="w-4 h-4 mr-2" />
          Adicionar
        </Button>
      </div>
      <div className="space-y-4">
        {softSkills.map((skill, index) => (
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
  );
};
