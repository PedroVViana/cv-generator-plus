import React from 'react';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  PDFViewer,
  PDFDownloadLink,
  Font,
  Link
} from '@react-pdf/renderer';
import { CVData, SocialLink } from '@/types/cv';
import { CVTheme } from './ThemeSelector';

// Formatador de data para o PDF
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', { month: 'short', year: 'numeric' }).format(date);
};

// Criação dinâmica de estilos baseados no tema
const createStyles = (theme: CVTheme) => StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
    fontFamily: 'Helvetica',
    color: theme.text,
    backgroundColor: '#FFFFFF', // Always white background for consistent printing
  },
  section: {
    marginBottom: 20,
  },
  header: {
    marginBottom: 15,
    borderBottom: `1px solid ${theme.primary}`,
    paddingBottom: 10,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 8,
    color: theme.primary,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 8,
    color: theme.primary,
    paddingTop: 5,
    borderTop: `1px solid ${theme.primary}`,
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: theme.text,
  },
  contactItem: {
    marginRight: 15,
  },
  experienceContainer: {
    marginBottom: 15,
  },
  experienceItem: {
    marginBottom: 10,
    paddingLeft: 8,
    borderLeftWidth: 2,
    borderLeftColor: theme.primary,
    borderLeftStyle: 'solid',
  },
  experienceTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: theme.text,
  },
  experienceCompany: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: theme.text,
    marginBottom: 3,
  },
  experienceDate: {
    fontSize: 9,
    color: theme.text,
    padding: '3 8',
    borderWidth: 1,
    borderColor: theme.primary,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  experienceDescription: {
    fontSize: 9,
    marginTop: 3,
    color: theme.text,
  },
  skillsSection: {
    marginBottom: 15,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillItem: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#000000',
    borderRadius: 4,
    padding: '4 8',
    marginRight: 6,
    marginBottom: 6,
    flexDirection: 'column',
    width: '30%',
  },
  skillName: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: theme.primary,
    marginBottom: 3,
  },
  skillLevelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  skillLevelLabel: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    color: theme.text,
    marginRight: 3,
  },
  skillLevel: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#FFFFFF',
    backgroundColor: theme.primary,
    padding: '1 6',
    borderRadius: 3,
  },
  softSkillItem: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: theme.primary,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#000000',
    borderRadius: 4,
    padding: '3 8',
    marginRight: 6,
    marginBottom: 6,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: theme.primary,
    borderRadius: 4,
    padding: '3 8',
    marginBottom: 5,
  },
  languageName: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
    color: theme.text,
  },
  languageLevel: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
    color: theme.primary,
  },
  socialIconContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 5,
  },
  socialIcon: {
    padding: 5,
    marginRight: 5,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: theme.primary,
    backgroundColor: '#FFFFFF',
  },
  socialIconText: {
    fontSize: 9,
    color: theme.primary,
    fontFamily: 'Helvetica-Bold',
    textDecoration: 'none',
  },
  socialLinkContainer: {
    marginTop: 10,
    flexDirection: 'column',
    gap: 3,
  },
  socialLinkText: {
    fontSize: 9,
    color: theme.primary,
    fontFamily: 'Helvetica-Bold',
    textDecoration: 'none',
    marginBottom: 3,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  sectionIcon: {
    marginRight: 5, 
    height: 16, 
    width: 16, 
    color: theme.primary
  }
});

// Componente de PDF do currículo
interface CVPdfProps {
  data: CVData;
  theme?: CVTheme;
}

const CVPdf: React.FC<CVPdfProps> = ({ 
  data, 
  theme = { primary: '#2563eb', text: '#333333', background: '#ffffff' }
}) => {
  // Cria estilos baseados no tema atual
  const styles = createStyles(theme);
  
  // Função para converter hex para RGB para garantir cores consistentes no PDF
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
  
  // Renderiza redes sociais
  const renderSocialLinks = () => {
    if (!data.socialLinks || data.socialLinks.length === 0) return null;

    const primaryColor = hexToRgb(theme.primary);

    if (data.socialDisplay.showAsIcons) {
      // No PDF, mostramos os ícones como uma linha de links com o nome da plataforma
      return (
        <View style={styles.socialIconContainer}>
          {data.socialLinks.map((link, index) => (
            <View key={index} style={styles.socialIcon}>
              <Link src={link.url} style={styles.socialIconText}>
                {link.platform}
              </Link>
            </View>
          ))}
        </View>
      );
    } else {
      // Mostra links completos, um por linha
      return (
        <View style={styles.socialLinkContainer}>
          {data.socialLinks.map((link, index) => (
            <Link key={index} src={link.url} style={styles.socialLinkText}>
              {link.platform}: {link.url}
            </Link>
          ))}
        </View>
      );
    }
  };
  
  // Verifica se seções existem
  const hasExperience = data.experience.length > 0;
  const hasEducation = data.education.length > 0;
  const hasSkills = data.skills.length > 0;
  const hasSoftSkills = data.softSkills.length > 0;
  const hasLanguages = data.languages.length > 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Cabeçalho / Informações Pessoais */}
        <View style={styles.header}>
          <Text style={styles.title}>{data.personalInfo.name || "Seu Nome"}</Text>
          
          <View style={styles.contactInfo}>
            {data.personalInfo.email && (
              <Text style={styles.contactItem}>{data.personalInfo.email}</Text>
            )}
            {data.personalInfo.phone && (
              <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>
            )}
            {data.personalInfo.location && (
              <Text style={styles.contactItem}>{data.personalInfo.location}</Text>
            )}
          </View>
          
          {/* Redes Sociais */}
          {renderSocialLinks()}
        </View>

        {/* Experiência */}
        {hasExperience && (
          <View style={styles.experienceContainer}>
            <Text style={styles.subtitle}>Experiência Profissional</Text>
            
            {data.experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.flexRow}>
                  <View>
                    <Text style={styles.experienceTitle}>{exp.position}</Text>
                    <Text style={styles.experienceCompany}>{exp.company}</Text>
                  </View>
                  
                  {(exp.startDate || exp.endDate) && (
                    <Text style={styles.experienceDate}>
                      {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Atual'}
                    </Text>
                  )}
                </View>
                {exp.description && (
                  <Text style={styles.experienceDescription}>{exp.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Educação */}
        {hasEducation && (
          <View style={styles.experienceContainer}>
            <Text style={styles.subtitle}>Educação</Text>
            
            {data.education.map((edu, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.flexRow}>
                  <View>
                    <Text style={styles.experienceTitle}>{edu.degree}</Text>
                    <Text style={styles.experienceCompany}>{edu.institution}</Text>
                  </View>
                  
                  {(edu.startDate || edu.endDate) && (
                    <Text style={styles.experienceDate}>
                      {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Atual'}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Habilidades Técnicas */}
        {hasSkills && (
          <View style={styles.skillsSection}>
            <Text style={styles.subtitle}>Ferramentas e Habilidades</Text>
            
            <View style={styles.skillsContainer}>
              {data.skills.map((skill, index) => (
                <View key={index} style={styles.skillItem}>
                  <Text style={styles.skillName}>
                    {skill.name}
                  </Text>
                  
                  {skill.level && (
                    <View style={styles.skillLevelContainer}>
                      <Text style={styles.skillLevelLabel}>Nível:</Text>
                      <Text style={styles.skillLevel}>
                        {skill.level}
                      </Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Soft Skills / Competências */}
        {hasSoftSkills && (
          <View style={styles.skillsSection}>
            <Text style={styles.subtitle}>Soft Skills</Text>
            
            <View style={styles.skillsContainer}>
              {data.softSkills.map((skill, index) => (
                <Text key={index} style={styles.softSkillItem}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Idiomas */}
        {hasLanguages && (
          <View style={styles.skillsSection}>
            <Text style={styles.subtitle}>Idiomas</Text>
            
            <View style={{marginTop: 2}}>
              {data.languages.map((language, index) => (
                <View key={index} style={styles.languageItem}>
                  <Text style={styles.languageName}>{language.name}</Text>
                  <Text style={styles.languageLevel}>{language.level}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default CVPdf; 