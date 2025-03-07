import React, { useState, useEffect } from 'react';
import CVForm from '@/components/CVForm';
import CVPreview from '@/components/CVPreview';
import { Button } from '@/components/ui/button';
import { Download, Save, RefreshCw, FileText, ArrowRight, Upload, Menu } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import PDFDownloader from '@/components/cv/PDFDownloader';
import ThemeSelector, { CVTheme, predefinedThemes } from '@/components/cv/ThemeSelector';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { CVData } from '@/types/cv';
import { Separator } from '@/components/ui/separator';

const initialData: CVData = {
  personalInfo: {
    name: "",
    email: "",
    phone: "",
    location: "",
  },
  experience: [],
  education: [],
  skills: [],
  softSkills: [],
  languages: [],
  socialLinks: [],
  socialDisplay: {
    showAsIcons: true  // Por padrão, mostrará as redes sociais como ícones
  }
};

// Tema padrão inicial
const defaultTheme: CVTheme = {
  primary: '#2563eb',
  text: '#333333',
  background: '#ffffff'
};

const Index = () => {
  const [cvData, setCVData] = useState<CVData>(initialData);
  const [activeTab, setActiveTab] = useState("edit");
  const [cvTheme, setCvTheme] = useState<CVTheme>(defaultTheme);
  const [isDesktop, setIsDesktop] = useState(true);

  // Detectar tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    handleResize(); // Checar tamanho inicial
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Carregar dados salvos ao iniciar
  useEffect(() => {
    // Carregar dados do currículo
    const savedData = localStorage.getItem('cv-data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // Garantir que novos campos sejam inicializados se não existirem nos dados salvos
        if (!parsedData.socialLinks) {
          parsedData.socialLinks = [];
        }
        if (!parsedData.socialDisplay) {
          parsedData.socialDisplay = { showAsIcons: true };
        }
        setCVData(parsedData);
      } catch (error) {
        console.error('Erro ao carregar dados salvos:', error);
      }
    }

    // Carregar tema salvo
    const savedTheme = localStorage.getItem('cv-theme');
    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme);
        setCvTheme(parsedTheme);
      } catch (error) {
        console.error('Erro ao carregar tema salvo:', error);
      }
    }
  }, []);

  const handleThemeChange = (newTheme: CVTheme) => {
    setCvTheme(newTheme);
    localStorage.setItem('cv-theme', JSON.stringify(newTheme));
    toast({
      title: "Tema atualizado",
      description: "As cores do seu currículo foram atualizadas.",
    });
  };

  const handleSave = () => {
    localStorage.setItem('cv-data', JSON.stringify(cvData));
    localStorage.setItem('cv-theme', JSON.stringify(cvTheme));
    toast({
      title: "Currículo salvo",
      description: "Seu currículo foi salvo como template.",
    });
  };

  const handleReset = () => {
    if (window.confirm("Tem certeza que deseja limpar todos os dados?")) {
      setCVData(initialData);
      localStorage.removeItem('cv-data');
      toast({
        title: "Dados limpos",
        description: "Todos os dados do currículo foram apagados.",
        variant: "destructive",
      });
    }
  };

  const handleResetTheme = () => {
    setCvTheme(defaultTheme);
    localStorage.setItem('cv-theme', JSON.stringify(defaultTheme));
    toast({
      title: "Tema resetado",
      description: "As cores foram restauradas para o padrão.",
    });
  };

  const handleLoad = () => {
    const savedData = localStorage.getItem('cv-data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // Garantir que novos campos sejam inicializados se não existirem nos dados salvos
        if (!parsedData.socialLinks) {
          parsedData.socialLinks = [];
        }
        if (!parsedData.socialDisplay) {
          parsedData.socialDisplay = { showAsIcons: true };
        }
        setCVData(parsedData);
        toast({
          title: "Dados carregados",
          description: "Seu currículo salvo foi carregado com sucesso.",
          variant: "default",
        });
      } catch (error) {
        toast({
          title: "Erro ao carregar",
          description: "Não foi possível carregar os dados salvos.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Nenhum dado salvo",
        description: "Não há dados salvos para carregar.",
        variant: "default",
      });
    }
  };

  // Menu de ações para dispositivos móveis
  const ActionsMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-4 w-4" />
          <span className="sr-only">Menu de ações</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleLoad}>
          <Upload className="mr-2 h-4 w-4" />
          Carregar dados
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleReset}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Limpar dados
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Salvar template
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="container px-2 sm:px-4 py-4 sm:py-8">
      <div className="mb-4 sm:mb-8 text-center max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">Gerador de Currículo</h1>
        <p className="mt-2 sm:mt-4 text-sm sm:text-base text-muted-foreground">
          Crie um currículo profissional em minutos e baixe em PDF.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="edit" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <TabsList className="grid w-[200px] sm:w-[400px] grid-cols-2">
              <TabsTrigger value="edit" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="sm:inline">Editar</span>
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4" />
                <span className="sm:inline">Visualizar</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2">
              {isDesktop ? (
                // Versão desktop - mostra todos os botões
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" onClick={handleLoad}>
                          <Upload className="h-4 w-4" />
                          <span className="sr-only">Carregar</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Carregar dados salvos</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" onClick={handleReset}>
                          <RefreshCw className="h-4 w-4" />
                          <span className="sr-only">Limpar</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Limpar todos os dados</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" onClick={handleSave}>
                          <Save className="h-4 w-4" />
                          <span className="sr-only">Salvar</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Salvar como template</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              ) : (
                // Versão mobile - menu dropdown com as ações
                <ActionsMenu />
              )}
              
              <PDFDownloader 
                data={cvData} 
                theme={cvTheme}
                fileName={`curriculo-${cvData.personalInfo.name || 'sem-nome'}.pdf`}
              >
                <Button className="flex items-center gap-2" size={isDesktop ? "default" : "sm"}>
                  <Download className="h-4 w-4" />
                  {isDesktop && <span>Baixar PDF</span>}
                </Button>
              </PDFDownloader>
            </div>
          </div>
          
          <div className="p-1">
            <TabsContent value="edit" className="mt-0">
              <Card>
                <CardHeader className="sm:pb-8 pb-4">
                  <CardTitle className="text-xl sm:text-2xl">Preencha os dados do seu currículo</CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Adicione suas informações pessoais, experiências, habilidades e redes sociais.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CVForm data={cvData} onChange={setCVData} />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleReset}>Limpar</Button>
                  <Button onClick={() => setActiveTab("preview")}>
                    Visualizar
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="preview" className="mt-0">
              <Card>
                <CardHeader className="sm:pb-8 pb-4">
                  <CardTitle className="text-xl sm:text-2xl">Visualização do currículo</CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Veja como seu currículo vai parecer.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-3">
                      <CVPreview data={cvData} theme={cvTheme} />
                    </div>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Personalização</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Personalize as cores do seu currículo PDF
                        </p>
                        <ThemeSelector 
                          currentTheme={cvTheme} 
                          onThemeChange={handleThemeChange} 
                        />
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={handleResetTheme}
                          className="w-full mt-2"
                        >
                          Restaurar cores padrão
                        </Button>
                      </div>
                      <Separator className="my-4" />
                      <div>
                        <h3 className="text-lg font-medium mb-2">Download</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Baixe seu currículo no formato PDF
                        </p>
                        <PDFDownloader 
                          data={cvData} 
                          theme={cvTheme}
                          fileName={`curriculo-${cvData.personalInfo.name || 'sem-nome'}.pdf`}
                        >
                          <Button className="w-full">
                            <Download className="mr-2 h-4 w-4" />
                            Baixar PDF
                          </Button>
                        </PDFDownloader>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                  <Button variant="outline" className="w-full sm:w-auto" onClick={() => setActiveTab("edit")}>
                    Voltar para edição
                  </Button>
                  <PDFDownloader 
                    data={cvData} 
                    theme={cvTheme}
                    fileName={`curriculo-${cvData.personalInfo.name || 'sem-nome'}.pdf`}
                  >
                    <Button className="w-full sm:w-auto">
                      <Download className="mr-2 h-4 w-4" />
                      Baixar PDF
                    </Button>
                  </PDFDownloader>
                </CardFooter>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
