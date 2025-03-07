
import React from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Language } from '@/types/cv';

interface LanguagesFormProps {
  languages: Language[];
  onChange: (languages: Language[]) => void;
}

export const LanguagesForm: React.FC<LanguagesFormProps> = ({ languages, onChange }) => {
  const addLanguage = () => {
    onChange([...languages, { name: "", level: "Básico" }]);
  };

  const removeLanguage = (index: number) => {
    const newLanguages = [...languages];
    newLanguages.splice(index, 1);
    onChange(newLanguages);
  };

  const handleLanguageChange = (index: number, field: keyof Language, value: string) => {
    const newLanguages = [...languages];
    newLanguages[index] = { ...newLanguages[index], [field]: value };
    onChange(newLanguages);
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Idiomas</h2>
        <Button onClick={addLanguage} variant="outline" size="sm">
          <PlusCircle className="w-4 h-4 mr-2" />
          Adicionar
        </Button>
      </div>
      <div className="space-y-4">
        {languages.map((language, index) => (
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
  );
};
