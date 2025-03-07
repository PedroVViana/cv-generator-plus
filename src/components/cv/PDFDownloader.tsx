import React, { useEffect, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import CVPdf from './CVPdf';
import { CVData } from '@/types/cv';
import { toast } from "@/components/ui/use-toast";
import { CVTheme } from './ThemeSelector';

interface PDFDownloaderProps {
  data: CVData;
  theme?: CVTheme;
  fileName?: string;
  children?: React.ReactNode;
}

const PDFDownloader: React.FC<PDFDownloaderProps> = ({ 
  data, 
  theme = { primary: '#2563eb', text: '#333333', background: '#ffffff' },
  fileName = 'curriculo.pdf',
  children 
}) => {
  // Estado para controlar o renderizador do PDF no lado do cliente
  const [isClient, setIsClient] = useState(false);

  // Garantir que o componente seja renderizado apenas no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDownloadStart = () => {
    toast({
      title: "Gerando PDF",
      description: "Seu currículo está sendo preparado para download.",
    });
  };

  const handleDownloadError = () => {
    toast({
      title: "Erro ao gerar PDF",
      description: "Houve um problema ao gerar o PDF. Tente novamente.",
      variant: "destructive",
    });
  };

  // Para evitar problemas com SSR, só renderizamos o PDFDownloadLink no cliente
  if (!isClient) {
    return (
      <Button disabled>
        <Download className="mr-2 h-4 w-4" />
        Carregando...
      </Button>
    );
  }

  return (
    <PDFDownloadLink 
      document={<CVPdf data={data} theme={theme} />} 
      fileName={fileName}
      style={{ textDecoration: 'none' }}
      onClick={handleDownloadStart}
      onError={handleDownloadError}
    >
      {({ blob, url, loading, error }) => {
        if (error) {
          handleDownloadError();
        }
        
        return loading ? (
          <Button disabled>
            <Download className="mr-2 h-4 w-4" />
            Gerando PDF...
          </Button>
        ) : (
          children || (
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Baixar PDF
            </Button>
          )
        );
      }}
    </PDFDownloadLink>
  );
};

export default PDFDownloader; 