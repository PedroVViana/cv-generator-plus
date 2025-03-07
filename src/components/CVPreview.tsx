import React, { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Heart, 
  Globe,
  Link as LinkIcon,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CVTheme } from './cv/ThemeSelector';
import { CVData, SocialLink } from '@/types/cv';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CVPreviewProps {
  data: CVData;
  theme?: CVTheme;
}

// Formatador de data para a visualização
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', { month: 'short', year: 'numeric' }).format(date);
};

// Função para gerar a cor do badge de nível
const getLevelColor = (level: string, theme: CVTheme) => {
  // Converte a cor HEX primária para rgba com baixa opacidade
  const hexToRgba = (hex: string, opacity: number) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return `rgba(0, 0, 0, ${opacity})`;
    
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const primaryWithOpacity = hexToRgba(theme.primary, 0.15);
  const primaryDarker = hexToRgba(theme.primary, 0.9);

  return {
    backgroundColor: primaryWithOpacity,
    color: primaryDarker,
  };
};

// Componente que renderiza um ícone para a rede social
const SocialIcon: React.FC<{ iconName: string, color: string }> = ({ iconName, color }) => {
  const iconStyle = { color };
  switch (iconName.toLowerCase()) {
    case 'github':
      return <Github className="h-5 w-5" style={iconStyle} />;
    case 'linkedin':
      return <Linkedin className="h-5 w-5" style={iconStyle} />;
    case 'twitter':
      return <Twitter className="h-5 w-5" style={iconStyle} />;
    case 'instagram':
      return <Instagram className="h-5 w-5" style={iconStyle} />;
    case 'facebook':
      return <Facebook className="h-5 w-5" style={iconStyle} />;
    case 'youtube':
      return <Youtube className="h-5 w-5" style={iconStyle} />;
    default:
      return <LinkIcon className="h-5 w-5" style={iconStyle} />;
  }
};

const CVPreview: React.FC<CVPreviewProps> = ({ 
  data, 
  theme = { primary: '#2563eb', text: '#333333', background: '#ffffff' } 
}) => {
  const [isMobile, setIsMobile] = useState(false);

  // Detectar tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize(); // Checar tamanho inicial
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Logging para debug
  useEffect(() => {
    console.log('Theme applied to CVPreview:', theme);
  }, [theme]);

  const hasPersonalInfo = data.personalInfo.name || data.personalInfo.email || 
                         data.personalInfo.phone || data.personalInfo.location;
  const hasExperience = data.experience.length > 0;
  const hasEducation = data.education.length > 0;
  const hasSkills = data.skills.length > 0;
  const hasSoftSkills = data.softSkills.length > 0;
  const hasLanguages = data.languages.length > 0;
  const hasSocialLinks = data.socialLinks && data.socialLinks.length > 0;

  if (!hasPersonalInfo && !hasExperience && !hasEducation && 
      !hasSkills && !hasSoftSkills && !hasLanguages && !hasSocialLinks) {
    return (
      <Card 
        className="p-6 sm:p-8 shadow-lg animate-fade-in flex flex-col items-center justify-center min-h-[400px] sm:min-h-[500px] text-center"
        style={{ backgroundColor: theme.background }}
      >
        <div className="text-muted-foreground">
          <User className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 sm:mb-6 opacity-20" />
          <h3 className="text-lg sm:text-xl font-medium mb-2">Nenhuma informação adicionada</h3>
          <p className="text-sm sm:text-base">Preencha o formulário para visualizar seu currículo.</p>
        </div>
      </Card>
    );
  }

  // Estilo aplicado com as cores do tema
  const themeStyles = {
    title: { color: theme.primary },
    text: { color: theme.text },
    border: { borderColor: `${theme.primary}33` }, // Cor primária com opacidade 20%
    icon: { color: theme.primary },
    background: { backgroundColor: theme.background },
  };

  // Renderiza redes sociais como ícones ou links completos
  const renderSocialLinks = () => {
    return data.socialLinks.map((link: SocialLink, index: number) => {
      if (data.socialDisplay.showAsIcons) {
        return (
          <a 
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-muted transition-colors"
            style={{ color: theme.primary }}
            title={`${link.platform}: ${link.url}`}
          >
            <SocialIcon iconName={link.iconName} color={theme.primary} />
          </a>
        );
      } else {
        return (
          <a 
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors"
            style={{ color: theme.primary }}
          >
            <SocialIcon iconName={link.iconName} color={theme.primary} />
            <span style={{ color: theme.text }}>{link.platform}</span>
          </a>
        );
      }
    });
  };

  return (
    <ScrollArea className={`${isMobile ? 'h-[500px]' : 'h-auto'}`}>
      <Card 
        className="p-4 sm:p-8 shadow-lg animate-fade-in overflow-hidden"
        style={themeStyles.background}
      >
        {/* Cabeçalho / Informações Pessoais */}
        <div className="mb-6 sm:mb-8">
          <h1 
            className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4"
            style={themeStyles.title}
          >
            {data.personalInfo.name || "Seu Nome"}
          </h1>
          
          {hasPersonalInfo && (
            <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 text-muted-foreground">
              {data.personalInfo.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" style={themeStyles.icon} />
                  <span style={themeStyles.text}>{data.personalInfo.email}</span>
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" style={themeStyles.icon} />
                  <span style={themeStyles.text}>{data.personalInfo.phone}</span>
                </div>
              )}
              {data.personalInfo.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" style={themeStyles.icon} />
                  <span style={themeStyles.text}>{data.personalInfo.location}</span>
                </div>
              )}
            </div>
          )}

          {/* Redes Sociais */}
          {hasSocialLinks && (
            <div className={`mt-4 flex flex-wrap ${data.socialDisplay.showAsIcons ? 'gap-2' : 'flex-col gap-1'}`}>
              {renderSocialLinks()}
            </div>
          )}
        </div>

        {/* Experiência */}
        {hasExperience && (
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Briefcase className="h-4 w-4 sm:h-5 sm:w-5" style={themeStyles.icon} />
              <h2 
                className="text-lg sm:text-xl font-semibold"
                style={themeStyles.title}
              >
                Experiência Profissional
              </h2>
            </div>
            <Separator className="mb-3 sm:mb-4" style={themeStyles.border} />
            
            <div className="space-y-4 sm:space-y-6">
              {data.experience.map((exp, index) => (
                <div 
                  key={index} 
                  className="relative pl-3 sm:pl-5 border-l-2 hover:border-primary transition-colors"
                  style={themeStyles.border}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                    <div>
                      <h3 
                        className="font-semibold text-base sm:text-lg"
                        style={themeStyles.text}
                      >
                        {exp.position}
                      </h3>
                      <p className="text-muted-foreground text-sm" style={{ color: `${theme.text}99` }}>
                        {exp.company}
                      </p>
                    </div>
                    
                    {(exp.startDate || exp.endDate) && (
                      <Badge 
                        variant="outline" 
                        className="ml-0 mt-1 sm:mt-0 sm:ml-2 text-xs inline-flex"
                        style={{ borderColor: theme.primary + '50', color: theme.text + 'aa' }}
                      >
                        {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Atual'}
                      </Badge>
                    )}
                  </div>
                  
                  {exp.description && (
                    <p 
                      className="mt-2 text-xs sm:text-sm text-muted-foreground"
                      style={{ color: `${theme.text}99` }}
                    >
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Educação */}
        {hasEducation && (
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" style={themeStyles.icon} />
              <h2 
                className="text-lg sm:text-xl font-semibold"
                style={themeStyles.title}
              >
                Educação
              </h2>
            </div>
            <Separator className="mb-3 sm:mb-4" style={themeStyles.border} />
            
            <div className="space-y-4 sm:space-y-6">
              {data.education.map((edu, index) => (
                <div 
                  key={index} 
                  className="relative pl-3 sm:pl-5 border-l-2 border-primary/20 hover:border-primary transition-colors"
                  style={themeStyles.border}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                    <div>
                      <h3 
                        className="font-semibold text-base sm:text-lg"
                        style={themeStyles.text}
                      >
                        {edu.degree}
                      </h3>
                      <p 
                        className="text-muted-foreground text-sm"
                        style={{ color: `${theme.text}99` }}
                      >
                        {edu.institution}
                      </p>
                    </div>
                    
                    {(edu.startDate || edu.endDate) && (
                      <Badge 
                        variant="outline" 
                        className="ml-0 mt-1 sm:mt-0 sm:ml-2 text-xs inline-flex"
                        style={{ borderColor: theme.primary + '50', color: theme.text + 'aa' }}
                      >
                        {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Atual'}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Habilidades Técnicas */}
        {hasSkills && (
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Code className="h-4 w-4 sm:h-5 sm:w-5" style={themeStyles.icon} />
              <h2 
                className="text-lg sm:text-xl font-semibold"
                style={themeStyles.title}
              >
                Ferramentas e Habilidades
              </h2>
            </div>
            <Separator className="mb-3 sm:mb-4" style={themeStyles.border} />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
              {data.skills.map((skill, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-2 sm:p-3 bg-muted rounded-md hover:bg-muted/80 transition-colors"
                  style={{ backgroundColor: `${theme.primary}15` }}
                >
                  <span 
                    className="font-medium text-sm"
                    style={themeStyles.text}
                  >
                    {skill.name}
                  </span>
                  <Badge style={getLevelColor(skill.level, theme)} className="text-xs">
                    {skill.level}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Soft Skills */}
        {hasSoftSkills && (
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Heart className="h-4 w-4 sm:h-5 sm:w-5" style={themeStyles.icon} />
              <h2 
                className="text-lg sm:text-xl font-semibold"
                style={themeStyles.title}
              >
                Soft Skills
              </h2>
            </div>
            <Separator className="mb-3 sm:mb-4" style={themeStyles.border} />
            
            <div className="flex flex-wrap gap-2">
              {data.softSkills.map((skill, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm"
                  style={{ 
                    backgroundColor: `${theme.primary}20`, 
                    color: theme.primary 
                  }}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Idiomas */}
        {hasLanguages && (
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Globe className="h-4 w-4 sm:h-5 sm:w-5" style={themeStyles.icon} />
              <h2 
                className="text-lg sm:text-xl font-semibold"
                style={themeStyles.title}
              >
                Idiomas
              </h2>
            </div>
            <Separator className="mb-3 sm:mb-4" style={themeStyles.border} />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
              {data.languages.map((language, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-2 sm:p-3 bg-muted rounded-md hover:bg-muted/80 transition-colors"
                  style={{ backgroundColor: `${theme.primary}15` }}
                >
                  <span 
                    className="font-medium text-sm"
                    style={themeStyles.text}
                  >
                    {language.name}
                  </span>
                  <Badge 
                    variant="outline"
                    style={{ borderColor: theme.primary + '50', color: theme.text }}
                    className="text-xs"
                  >
                    {language.level}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </ScrollArea>
  );
};

export default CVPreview;
