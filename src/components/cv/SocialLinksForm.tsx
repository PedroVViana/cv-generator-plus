import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Link, Github, Linkedin, Twitter, Instagram, Facebook, Youtube } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SocialLink, SocialDisplayOption } from '@/types/cv';

// Lista de plataformas de redes sociais com seus respectivos ícones
const platforms = [
  { name: 'LinkedIn', icon: 'linkedin' },
  { name: 'GitHub', icon: 'github' },
  { name: 'Twitter', icon: 'twitter' },
  { name: 'Instagram', icon: 'instagram' },
  { name: 'Facebook', icon: 'facebook' },
  { name: 'YouTube', icon: 'youtube' },
  { name: 'Portfolio', icon: 'link' },
  { name: 'Outro', icon: 'link' },
];

// Componente que exibe o ícone correto com base no nome da plataforma
const SocialIcon: React.FC<{ iconName: string }> = ({ iconName }) => {
  switch (iconName.toLowerCase()) {
    case 'github':
      return <Github className="h-4 w-4" />;
    case 'linkedin':
      return <Linkedin className="h-4 w-4" />;
    case 'twitter':
      return <Twitter className="h-4 w-4" />;
    case 'instagram':
      return <Instagram className="h-4 w-4" />;
    case 'facebook':
      return <Facebook className="h-4 w-4" />;
    case 'youtube':
      return <Youtube className="h-4 w-4" />;
    default:
      return <Link className="h-4 w-4" />;
  }
};

interface SocialLinksFormProps {
  socialLinks: SocialLink[];
  socialDisplay: SocialDisplayOption;
  onChange: (socialLinks: SocialLink[]) => void;
  onDisplayChange: (options: SocialDisplayOption) => void;
}

export const SocialLinksForm: React.FC<SocialLinksFormProps> = ({ 
  socialLinks, 
  socialDisplay,
  onChange,
  onDisplayChange
}) => {
  const [newLink, setNewLink] = useState<SocialLink>({ platform: '', url: '', iconName: '' });
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

  const handleChange = (index: number, field: keyof SocialLink, value: string) => {
    const updatedLinks = [...socialLinks];
    
    // Se estamos mudando a plataforma, atualizar também o nome do ícone
    if (field === 'platform') {
      const selectedPlatform = platforms.find(p => p.name === value);
      if (selectedPlatform) {
        updatedLinks[index] = { 
          ...updatedLinks[index], 
          [field]: value,
          iconName: selectedPlatform.icon
        };
      }
    } else {
      updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    }
    
    onChange(updatedLinks);
  };

  const handleRemove = (index: number) => {
    const updatedLinks = [...socialLinks];
    updatedLinks.splice(index, 1);
    onChange(updatedLinks);
  };

  const handleAdd = () => {
    if (newLink.platform && newLink.url) {
      onChange([...socialLinks, newLink]);
      setNewLink({ platform: '', url: '', iconName: '' });
    }
  };

  const handleNewChange = (field: keyof SocialLink, value: string) => {
    if (field === 'platform') {
      const selectedPlatform = platforms.find(p => p.name === value);
      if (selectedPlatform) {
        setNewLink({ 
          ...newLink, 
          platform: value, 
          iconName: selectedPlatform.icon 
        });
      }
    } else {
      setNewLink({ ...newLink, [field]: value });
    }
  };

  const handleDisplayChange = (checked: boolean) => {
    onDisplayChange({ showAsIcons: checked });
  };

  const validateUrl = (url: string) => {
    // Verificar se a URL começa com http:// ou https://
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return 'https://' + url;
    }
    return url;
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className={`flex ${isMobile ? 'flex-col gap-3' : 'items-center justify-between'}`}>
          <span className="text-lg sm:text-xl">Redes Sociais</span>
          <div className="flex items-center space-x-2">
            <Label htmlFor="show-as-icons" className="text-sm font-normal">Mostrar como ícones</Label>
            <Switch 
              id="show-as-icons" 
              checked={socialDisplay.showAsIcons}
              onCheckedChange={handleDisplayChange}
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {socialLinks.map((link, index) => (
          <div key={index} className="p-4 border rounded-md relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-destructive"
              onClick={() => handleRemove(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor={`platform-${index}`}>Plataforma</Label>
                <Select 
                  value={link.platform}
                  onValueChange={(value) => handleChange(index, "platform", value)}
                >
                  <SelectTrigger id={`platform-${index}`}>
                    <SelectValue placeholder="Selecione a plataforma" />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map((platform) => (
                      <SelectItem key={platform.name} value={platform.name}>
                        <div className="flex items-center">
                          <SocialIcon iconName={platform.icon} />
                          <span className="ml-2">{platform.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor={`url-${index}`}>URL</Label>
                <Input
                  id={`url-${index}`}
                  value={link.url}
                  onChange={(e) => handleChange(index, "url", validateUrl(e.target.value))}
                  className="mt-1"
                  placeholder="https://exemplo.com/perfil"
                />
              </div>
            </div>
          </div>
        ))}
        
        <div className="p-4 border border-dashed rounded-md">
          <h3 className="text-lg font-medium mb-4">Adicionar Rede Social</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="new-platform">Plataforma</Label>
              <Select 
                value={newLink.platform}
                onValueChange={(value) => handleNewChange("platform", value)}
              >
                <SelectTrigger id="new-platform">
                  <SelectValue placeholder="Selecione a plataforma" />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map((platform) => (
                    <SelectItem key={platform.name} value={platform.name}>
                      <div className="flex items-center">
                        <SocialIcon iconName={platform.icon} />
                        <span className="ml-2">{platform.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="new-url">URL</Label>
              <Input
                id="new-url"
                value={newLink.url}
                onChange={(e) => handleNewChange("url", validateUrl(e.target.value))}
                className="mt-1"
                placeholder="https://exemplo.com/perfil"
              />
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleAdd} 
          className={`${isMobile ? 'w-full' : 'ml-auto'} flex items-center gap-2`}
          disabled={!newLink.platform || !newLink.url}
        >
          <Plus className="h-4 w-4" />
          Adicionar Rede Social
        </Button>
      </CardFooter>
    </Card>
  );
}; 