import React, { useState } from 'react';
import CVForm from '@/components/CVForm';
import CVPreview from '@/components/CVPreview';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const initialData = {
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
};

const Index = () => {
  const [cvData, setCVData] = useState(initialData);

  const handleDownload = () => {
    // TODO: Implement PDF generation
    console.log("Download CV", cvData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-primary">Gerador de Currículo</h1>
          <p className="text-secondary mt-2">Crie seu currículo profissional em minutos</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
            <div className="sticky top-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Preencha seus dados</h2>
                <Button onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-2" />
                  Baixar PDF
                </Button>
              </div>
              <CVForm data={cvData} onChange={setCVData} />
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="sticky top-8">
              <h2 className="text-xl font-semibold mb-6">Pré-visualização</h2>
              <CVPreview data={cvData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
