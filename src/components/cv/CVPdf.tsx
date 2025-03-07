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
    backgroundColor: theme.background,
  },
  section: {
    marginBottom: 20,
  },
  header: {
    marginBottom: 20,
    borderBottom: '1px solid #eaeaea',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: theme.primary,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: theme.primary,
    paddingTop: 5,
    borderTop: '1px solid #eaeaea',
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
    fontSize: 10,
    color: theme.text,
    opacity: 0.8,
  },
  contactItem: {
    marginRight: 15,
  },
  experienceItem: {
    marginBottom: 10,
    paddingLeft: 10,
    borderLeft: `2px solid ${theme.primary}`,
    borderLeftOpacity: 0.3,
  },
  experienceTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  experienceCompany: {
    fontSize: 10,
    color: theme.text,
    opacity: 0.8,
  },
  experienceDate: {
    fontSize: 9,
    color: theme.text,
    opacity: 0.6,
    marginTop: 2,
  },
  experienceDescription: {
    fontSize: 9,
    marginTop: 5,
    color: theme.text,
    opacity: 0.8,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  skillItem: {
    fontSize: 10,
    backgroundColor: theme.primary,
    backgroundOpacity: 0.1,
    padding: '4 8',
    borderRadius: 4,
    marginRight: 6,
    marginBottom: 6,
    color: theme.text,
  },
  skillLevel: {
    fontSize: 8,
    color: theme.text,
    opacity: 0.7,
  },
  softSkillItem: {
    fontSize: 10,
    backgroundColor: theme.primary,
    backgroundOpacity: 0.1,
    padding: '4 8',
    borderRadius: 10,
    marginRight: 6,
    marginBottom: 6,
    color: theme.primary,
  },
  languageItem: {
    fontSize: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  socialContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 10,
  },
  socialLink: {
    fontSize: 10,
    color: theme.primary,
    marginRight: 10,
    textDecoration: 'none',
  },
  socialLinkFullWidth: {
    fontSize: 10,
    color: theme.primary,
    marginBottom: 5,
    textDecoration: 'none',
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
  
  // Renderiza redes sociais
  const renderSocialLinks = () => {
    if (!data.socialLinks || data.socialLinks.length === 0) return null;

    if (data.socialDisplay.showAsIcons) {
      // No PDF, mostramos os ícones como uma linha de links com o nome da plataforma
      return (
        <View style={styles.socialContainer}>
          {data.socialLinks.map((link, index) => (
            <Link key={index} src={link.url} style={styles.socialLink}>
              {link.platform}
            </Link>
          ))}
        </View>
      );
    } else {
      // Mostra links completos, um por linha
      return (
        <View style={{ marginTop: 10 }}>
          {data.socialLinks.map((link, index) => (
            <Link key={index} src={link.url} style={styles.socialLinkFullWidth}>
              {link.platform}: {link.url}
            </Link>
          ))}
        </View>
      );
    }
  };
  
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
        {data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subtitle}>Experiência Profissional</Text>
            {data.experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.row}>
                  <Text style={styles.experienceTitle}>{exp.position}</Text>
                  <Text style={styles.experienceDate}>
                    {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Atual'}
                  </Text>
                </View>
                <Text style={styles.experienceCompany}>{exp.company}</Text>
                {exp.description && (
                  <Text style={styles.experienceDescription}>{exp.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Educação */}
        {data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subtitle}>Educação</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.row}>
                  <Text style={styles.experienceTitle}>{edu.degree}</Text>
                  <Text style={styles.experienceDate}>
                    {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Atual'}
                  </Text>
                </View>
                <Text style={styles.experienceCompany}>{edu.institution}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Habilidades */}
        {data.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subtitle}>Ferramentas e Habilidades</Text>
            <View style={styles.skillsContainer}>
              {data.skills.map((skill, index) => (
                <View key={index} style={styles.skillItem}>
                  <Text>{skill.name} <Text style={styles.skillLevel}>({skill.level})</Text></Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Soft Skills */}
        {data.softSkills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subtitle}>Soft Skills</Text>
            <View style={styles.skillsContainer}>
              {data.softSkills.map((skill, index) => (
                <View key={index} style={styles.softSkillItem}>
                  <Text>{skill}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Idiomas */}
        {data.languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subtitle}>Idiomas</Text>
            {data.languages.map((language, index) => (
              <View key={index} style={styles.languageItem}>
                <Text>{language.name}</Text>
                <Text style={styles.skillLevel}>{language.level}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default CVPdf; 