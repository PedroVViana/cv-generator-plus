import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, MapPin } from 'lucide-react';
import { PersonalInfo } from '@/types/cv';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, onChange }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Detectar tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    handleResize(); // Checar tamanho inicial
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <Card className={`${isMobile ? 'p-4' : 'p-6'} animate-fade-in`}>
      <CardHeader className="p-0 pb-4">
        <CardTitle className="text-xl sm:text-2xl flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Informações Pessoais
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 space-y-4">
        <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
          <div className="space-y-1">
            <Label htmlFor="name" className="flex items-center gap-1 text-sm">
              <User className="h-3.5 w-3.5 text-muted-foreground" />
              Nome completo
            </Label>
            <Input
              id="name"
              value={data.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="João Silva"
              className="mt-1"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email" className="flex items-center gap-1 text-sm">
              <Mail className="h-3.5 w-3.5 text-muted-foreground" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="joao.silva@exemplo.com"
              className="mt-1"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="phone" className="flex items-center gap-1 text-sm">
              <Phone className="h-3.5 w-3.5 text-muted-foreground" />
              Telefone
            </Label>
            <Input
              id="phone"
              value={data.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="(11) 98765-4321"
              className="mt-1"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="location" className="flex items-center gap-1 text-sm">
              <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
              Localização
            </Label>
            <Input
              id="location"
              value={data.location}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="São Paulo, SP, Brasil"
              className="mt-1"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
