import React, { useState, useEffect } from 'react';
import { CVData } from '@/types/cv';
import { PersonalInfoForm } from './cv/PersonalInfoForm';
import { ExperienceForm } from './cv/ExperienceForm';
import { EducationForm } from './cv/EducationForm';
import { SkillsForm } from './cv/SkillsForm';
import { SoftSkillsForm } from './cv/SoftSkillsForm';
import { LanguagesForm } from './cv/LanguagesForm';
import { SocialLinksForm } from './cv/SocialLinksForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  Heart, 
  Globe,
  Share2
} from 'lucide-react';

interface CVFormProps {
  data: CVData;
  onChange: (data: CVData) => void;
}

const CVForm: React.FC<CVFormProps> = ({ data, onChange }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  // Detectar tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    handleResize(); // Checar tamanho inicial
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full space-y-6">
      <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab} className="w-full">
        {isMobile ? (
          // Layout para mobile - dividido em duas linhas
          <>
            <ScrollArea className="w-full mb-1">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="personal" className="flex items-center justify-center gap-1 px-2 py-1.5">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline text-xs">Pessoal</span>
                </TabsTrigger>
                <TabsTrigger value="experience" className="flex items-center justify-center gap-1 px-2 py-1.5">
                  <Briefcase className="h-4 w-4" />
                  <span className="hidden sm:inline text-xs">Experiência</span>
                </TabsTrigger>
                <TabsTrigger value="education" className="flex items-center justify-center gap-1 px-2 py-1.5">
                  <GraduationCap className="h-4 w-4" />
                  <span className="hidden sm:inline text-xs">Educação</span>
                </TabsTrigger>
                <TabsTrigger value="skills" className="flex items-center justify-center gap-1 px-2 py-1.5">
                  <Wrench className="h-4 w-4" />
                  <span className="hidden sm:inline text-xs">Habilidades</span>
                </TabsTrigger>
              </TabsList>
            </ScrollArea>
            
            <ScrollArea className="w-full mt-1">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="softskills" className="flex items-center justify-center gap-1 px-2 py-1.5">
                  <Heart className="h-4 w-4" />
                  <span className="hidden sm:inline text-xs">Soft Skills</span>
                </TabsTrigger>
                <TabsTrigger value="languages" className="flex items-center justify-center gap-1 px-2 py-1.5">
                  <Globe className="h-4 w-4" />
                  <span className="hidden sm:inline text-xs">Idiomas</span>
                </TabsTrigger>
                <TabsTrigger value="social" className="flex items-center justify-center gap-1 px-2 py-1.5">
                  <Share2 className="h-4 w-4" />
                  <span className="hidden sm:inline text-xs">Redes</span>
                </TabsTrigger>
              </TabsList>
            </ScrollArea>
          </>
        ) : (
          // Layout para desktop - uma linha única
          <ScrollArea className="w-full">
            <TabsList className="grid grid-cols-7 w-full">
              <TabsTrigger value="personal" className="flex items-center justify-center gap-1 px-3 py-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline text-sm">Pessoal</span>
              </TabsTrigger>
              <TabsTrigger value="experience" className="flex items-center justify-center gap-1 px-3 py-2">
                <Briefcase className="h-4 w-4" />
                <span className="hidden sm:inline text-sm">Experiência</span>
              </TabsTrigger>
              <TabsTrigger value="education" className="flex items-center justify-center gap-1 px-3 py-2">
                <GraduationCap className="h-4 w-4" />
                <span className="hidden sm:inline text-sm">Educação</span>
              </TabsTrigger>
              <TabsTrigger value="skills" className="flex items-center justify-center gap-1 px-3 py-2">
                <Wrench className="h-4 w-4" />
                <span className="hidden sm:inline text-sm">Habilidades</span>
              </TabsTrigger>
              <TabsTrigger value="softskills" className="flex items-center justify-center gap-1 px-3 py-2">
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline text-sm">Soft Skills</span>
              </TabsTrigger>
              <TabsTrigger value="languages" className="flex items-center justify-center gap-1 px-3 py-2">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline text-sm">Idiomas</span>
              </TabsTrigger>
              <TabsTrigger value="social" className="flex items-center justify-center gap-1 px-3 py-2">
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline text-sm">Redes</span>
              </TabsTrigger>
            </TabsList>
          </ScrollArea>
        )}
        
        <div className="mt-6">
          <TabsContent value="personal" className="space-y-4 animate-fade-in">
            <PersonalInfoForm
              data={data.personalInfo}
              onChange={(personalInfo) => onChange({ ...data, personalInfo })}
            />
          </TabsContent>
          
          <TabsContent value="experience" className="space-y-4 animate-fade-in">
            <ExperienceForm
              experiences={data.experience}
              onChange={(experience) => onChange({ ...data, experience })}
            />
          </TabsContent>
          
          <TabsContent value="education" className="space-y-4 animate-fade-in">
            <EducationForm
              education={data.education}
              onChange={(education) => onChange({ ...data, education })}
            />
          </TabsContent>
          
          <TabsContent value="skills" className="space-y-4 animate-fade-in">
            <SkillsForm
              skills={data.skills}
              onChange={(skills) => onChange({ ...data, skills })}
            />
          </TabsContent>
          
          <TabsContent value="softskills" className="space-y-4 animate-fade-in">
            <SoftSkillsForm
              softSkills={data.softSkills}
              onChange={(softSkills) => onChange({ ...data, softSkills })}
            />
          </TabsContent>
          
          <TabsContent value="languages" className="space-y-4 animate-fade-in">
            <LanguagesForm
              languages={data.languages}
              onChange={(languages) => onChange({ ...data, languages })}
            />
          </TabsContent>

          <TabsContent value="social" className="space-y-4 animate-fade-in">
            <SocialLinksForm 
              socialLinks={data.socialLinks}
              socialDisplay={data.socialDisplay}
              onChange={(socialLinks) => onChange({ ...data, socialLinks })}
              onDisplayChange={(socialDisplay) => onChange({ ...data, socialDisplay })}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default CVForm;
