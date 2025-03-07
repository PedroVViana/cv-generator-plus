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

  // Função para converter hex para RGB para garantir cores consistentes
  const hexToRgb = (hex: string) => {
    let hexColor = hex.replace('#', '');
    
    // Garantir que temos 6 dígitos (para casos como #fff)
    if (hexColor.length === 3) {
      hexColor = hexColor[0] + hexColor[0] + hexColor[1] + hexColor[1] + hexColor[2] + hexColor[2];
    }
    
    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);
    
    return `rgb(${r}, ${g}, ${b})`;
  };

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

  // Cores em RGB para máxima compatibilidade
  const primaryColor = hexToRgb(theme.primary);
  const textColor = hexToRgb(theme.text);

  // Constantes para garantir consistência nos espaçamentos e bordas
  const BORDER_RADIUS = "4px";
  const BORDER_WIDTH_NORMAL = "1px";
  const BORDER_WIDTH_HIGHLIGHT = "2px";
  const SECTION_MARGIN = "15px";

  // Atualizar estilos para maior contraste e consistência com o PDF
  const themeStyles = {
    background: { backgroundColor: '#FFFFFF' },
    title: { 
      color: primaryColor, 
      fontWeight: 'bold',
      fontSize: '22px',
      marginBottom: '8px',
      fontFamily: "'Helvetica', 'Arial', sans-serif"
    },
    subtitle: { 
      color: primaryColor, 
      fontSize: '14px',
      fontWeight: 'bold',
      marginBottom: '8px',
      paddingTop: '5px',
      borderTop: `1px solid ${primaryColor}`,
      fontFamily: "'Helvetica', 'Arial', sans-serif"
    },
    text: { 
      color: textColor,
      fontFamily: "'Helvetica', 'Arial', sans-serif"
    },
    icon: { color: primaryColor },
    border: { 
      borderColor: primaryColor, 
      borderWidth: BORDER_WIDTH_NORMAL 
    },
    borderLeft: {
      borderLeftColor: primaryColor,
      borderLeftWidth: BORDER_WIDTH_HIGHLIGHT
    },
    contactInfo: {
      fontSize: '9px',
      fontWeight: 'bold',
      color: textColor
    },
    badgeOutline: {
      backgroundColor: '#FFFFFF',
      color: textColor,
      border: `${BORDER_WIDTH_NORMAL} solid ${primaryColor}`,
      fontSize: '9px',
      fontWeight: 'bold',
    },
    softSkillBadge: {
      backgroundColor: '#FFFFFF',
      color: primaryColor,
      borderColor: '#000000',
      borderWidth: '1.5px',
      fontSize: '9px',
      fontWeight: 'bold',
      borderRadius: BORDER_RADIUS,
      padding: '3px 8px'
    },
    skillBadge: {
      backgroundColor: '#FFFFFF',
      border: '1.5px solid #000000',
      borderRadius: BORDER_RADIUS,
      padding: '3px 8px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '6px',
      marginRight: '6px'
    },
    skillName: {
      color: primaryColor,
      fontSize: '9px',
      fontWeight: 'bold'
    },
    skillLevel: {
      color: textColor,
      fontSize: '8px'
    },
    languageItem: {
      backgroundColor: '#FFFFFF',
      border: `${BORDER_WIDTH_NORMAL} solid ${primaryColor}`,
      borderRadius: BORDER_RADIUS,
      padding: '3px 8px',
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '5px'
    },
    languageName: {
      color: textColor,
      fontWeight: 'bold',
      fontSize: '9px'
    },
    languageLevel: {
      color: primaryColor,
      fontWeight: 'bold',
      fontSize: '9px'
    },
    experienceTitle: {
      color: textColor,
      fontWeight: 'bold',
      fontSize: '11px'
    },
    experienceCompany: {
      color: textColor,
      fontWeight: 'bold',
      fontSize: '10px',
      marginBottom: '3px' 
    },
    experienceDate: {
      color: textColor,
      fontSize: '9px'
    },
    experienceDescription: {
      color: textColor,
      fontSize: '9px',
      marginTop: '3px'
    }
  };

  if (!hasPersonalInfo && !hasExperience && !hasEducation && 
      !hasSkills && !hasSoftSkills && !hasLanguages && !hasSocialLinks) {
    return (
      <Card 
        className="p-6 sm:p-8 shadow-lg animate-fade-in flex flex-col items-center justify-center min-h-[400px] sm:min-h-[500px] text-center"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        <div className="text-muted-foreground">
          <User className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 sm:mb-6 opacity-20" />
          <h3 className="text-lg sm:text-xl font-medium mb-2">Nenhuma informação adicionada</h3>
          <p className="text-sm sm:text-base">Preencha o formulário para visualizar seu currículo.</p>
        </div>
      </Card>
    );
  }

  // Renderiza redes sociais com o mesmo visual do PDF
  const renderSocialLinks = () => {
    if (!data.socialLinks || data.socialLinks.length === 0) return null;

    if (data.socialDisplay.showAsIcons) {
      return (
        <div className="flex flex-wrap gap-2 mt-3">
          {data.socialLinks.map((link, index) => (
            <div 
              key={index} 
              className="border rounded p-1"
              style={{
                borderColor: primaryColor,
                borderWidth: BORDER_WIDTH_NORMAL,
                backgroundColor: '#FFFFFF'
              }}
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs"
                style={{
                  color: primaryColor,
                  fontWeight: 'bold',
                  fontSize: '9px',
                  textDecoration: 'none'
                }}
              >
                <SocialIcon iconName={link.iconName} color={primaryColor} />
                {link.platform}
              </a>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="flex flex-col gap-1 mt-3">
          {data.socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 mb-1"
              style={{
                color: primaryColor,
                fontWeight: 'bold',
                fontSize: '9px',
                textDecoration: 'none'
              }}
            >
              <SocialIcon iconName={link.iconName} color={primaryColor} />
              {link.platform}: {link.url}
            </a>
          ))}
        </div>
      );
    }
  };

  return (
    <ScrollArea className={`${isMobile ? 'h-[500px]' : 'h-auto'}`}>
      <Card 
        className="p-4 sm:p-8 shadow-lg animate-fade-in overflow-hidden"
        style={themeStyles.background}
      >
        {/* Cabeçalho / Informações Pessoais */}
        <div className="mb-6 sm:mb-8" style={{ borderBottom: `1px solid ${primaryColor}`, paddingBottom: '10px' }}>
          <h1 
            className="font-bold mb-3 sm:mb-4"
            style={themeStyles.title}
          >
            {data.personalInfo.name || "Seu Nome"}
          </h1>
          
          {hasPersonalInfo && (
            <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4">
              {data.personalInfo.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" style={themeStyles.icon} />
                  <span style={themeStyles.contactInfo}>{data.personalInfo.email}</span>
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" style={themeStyles.icon} />
                  <span style={themeStyles.contactInfo}>{data.personalInfo.phone}</span>
                </div>
              )}
              {data.personalInfo.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" style={themeStyles.icon} />
                  <span style={themeStyles.contactInfo}>{data.personalInfo.location}</span>
                </div>
              )}
            </div>
          )}

          {/* Redes Sociais */}
          {hasSocialLinks && renderSocialLinks()}
        </div>

        {/* Experiência */}
        {hasExperience && (
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Briefcase className="h-4 w-4 sm:h-5 sm:w-5" style={themeStyles.icon} />
              <h2 style={themeStyles.subtitle}>
                Experiência Profissional
              </h2>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              {data.experience.map((exp, index) => (
                <div 
                  key={index} 
                  className="relative pl-3 sm:pl-5 border-l-2"
                  style={themeStyles.borderLeft}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                    <div>
                      <h3 style={themeStyles.experienceTitle}>
                        {exp.position}
                      </h3>
                      <p style={themeStyles.experienceCompany}>
                        {exp.company}
                      </p>
                    </div>
                    
                    {(exp.startDate || exp.endDate) && (
                      <Badge 
                        variant="outline" 
                        className="ml-0 mt-1 sm:mt-0 sm:ml-2 inline-flex"
                        style={themeStyles.experienceDate}
                      >
                        {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Atual'}
                      </Badge>
                    )}
                  </div>
                  {exp.description && (
                    <p style={themeStyles.experienceDescription}>
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
              <h2 style={themeStyles.subtitle}>
                Educação
              </h2>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              {data.education.map((edu, index) => (
                <div 
                  key={index} 
                  className="relative pl-3 sm:pl-5 border-l-2"
                  style={themeStyles.borderLeft}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                    <div>
                      <h3 style={themeStyles.experienceTitle}>
                        {edu.degree}
                      </h3>
                      <p style={themeStyles.experienceCompany}>
                        {edu.institution}
                      </p>
                    </div>
                    
                    {(edu.startDate || edu.endDate) && (
                      <Badge 
                        variant="outline" 
                        className="ml-0 mt-1 sm:mt-0 sm:ml-2 inline-flex"
                        style={themeStyles.experienceDate}
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
              <h2 style={themeStyles.subtitle}>
                Ferramentas e Habilidades
              </h2>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between"
                  style={themeStyles.skillBadge}
                >
                  <span style={themeStyles.skillName}>
                    {skill.name}
                  </span>
                  <span style={themeStyles.skillLevel}>
                    {skill.level}
                  </span>
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
              <h2 style={themeStyles.subtitle}>
                Soft Skills
              </h2>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {data.softSkills.map((skill, index) => (
                <span 
                  key={index}
                  className="inline-block"
                  style={themeStyles.softSkillBadge}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Idiomas */}
        {hasLanguages && (
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Globe className="h-4 w-4 sm:h-5 sm:w-5" style={themeStyles.icon} />
              <h2 style={themeStyles.subtitle}>
                Idiomas
              </h2>
            </div>
            
            <div className="space-y-2">
              {data.languages.map((language, index) => (
                <div 
                  key={index}
                  style={themeStyles.languageItem}
                >
                  <span style={themeStyles.languageName}>
                    {language.name}
                  </span>
                  <span style={themeStyles.languageLevel}>
                    {language.level}
                  </span>
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
