import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from 'lucide-react';

interface Education {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
}

interface EducationFormProps {
  education: Education[];
  onChange: (education: Education[]) => void;
}

const emptyEducation: Education = {
  institution: '',
  degree: '',
  startDate: '',
  endDate: '',
};

export const EducationForm: React.FC<EducationFormProps> = ({ education, onChange }) => {
  const [newEducation, setNewEducation] = useState<Education>({ ...emptyEducation });

  const handleChange = (index: number, field: keyof Education, value: string) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleRemove = (index: number) => {
    const updated = [...education];
    updated.splice(index, 1);
    onChange(updated);
  };

  const handleAdd = () => {
    onChange([...education, newEducation]);
    setNewEducation({ ...emptyEducation });
  };

  const handleNewChange = (field: keyof Education, value: string) => {
    setNewEducation({ ...newEducation, [field]: value });
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Educação</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {education.map((item, index) => (
          <div key={index} className="p-4 border rounded-md relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-destructive"
              onClick={() => handleRemove(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor={`institution-${index}`}>Instituição</Label>
                <Input
                  id={`institution-${index}`}
                  value={item.institution}
                  onChange={(e) => handleChange(index, "institution", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor={`degree-${index}`}>Curso/Grau</Label>
                <Input
                  id={`degree-${index}`}
                  value={item.degree}
                  onChange={(e) => handleChange(index, "degree", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`startDate-${index}`}>Data de Início</Label>
                <Input
                  id={`startDate-${index}`}
                  type="date"
                  value={item.startDate}
                  onChange={(e) => handleChange(index, "startDate", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor={`endDate-${index}`}>Data de Conclusão</Label>
                <Input
                  id={`endDate-${index}`}
                  type="date"
                  value={item.endDate}
                  onChange={(e) => handleChange(index, "endDate", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        ))}
        
        <div className="p-4 border border-dashed rounded-md">
          <h3 className="text-lg font-medium mb-4">Adicionar Educação</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="new-institution">Instituição</Label>
              <Input
                id="new-institution"
                value={newEducation.institution}
                onChange={(e) => handleNewChange("institution", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="new-degree">Curso/Grau</Label>
              <Input
                id="new-degree"
                value={newEducation.degree}
                onChange={(e) => handleNewChange("degree", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="new-startDate">Data de Início</Label>
              <Input
                id="new-startDate"
                type="date"
                value={newEducation.startDate}
                onChange={(e) => handleNewChange("startDate", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="new-endDate">Data de Conclusão</Label>
              <Input
                id="new-endDate"
                type="date"
                value={newEducation.endDate}
                onChange={(e) => handleNewChange("endDate", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button onClick={handleAdd} className="ml-auto flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Adicionar Educação
        </Button>
      </CardFooter>
    </Card>
  );
}; 