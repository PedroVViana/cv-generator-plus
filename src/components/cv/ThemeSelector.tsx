import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Palette, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import ThemePreview from './ThemePreview';

// Temas predefinidos
export const predefinedThemes = [
  { name: 'Azul Clássico', primary: '#2563eb', text: '#333333', background: '#ffffff' },
  { name: 'Verde Profissional', primary: '#10b981', text: '#1f2937', background: '#ffffff' },
  { name: 'Roxo Elegante', primary: '#8b5cf6', text: '#1f2937', background: '#ffffff' },
  { name: 'Vermelho Impacto', primary: '#ef4444', text: '#1f2937', background: '#ffffff' },
  { name: 'Laranja Vibrante', primary: '#f97316', text: '#1f2937', background: '#ffffff' },
  { name: 'Turquesa Moderno', primary: '#06b6d4', text: '#1f2937', background: '#ffffff' },
  { name: 'Cinza Neutro', primary: '#6b7280', text: '#1f2937', background: '#ffffff' },
  { name: 'Rosa Fashion', primary: '#ec4899', text: '#1f2937', background: '#ffffff' },
  // Temas com fundos coloridos
  { name: 'Fundo Azul Suave', primary: '#1e40af', text: '#1f2937', background: '#f0f6ff' },
  { name: 'Fundo Verde Suave', primary: '#047857', text: '#1f2937', background: '#f0fdf4' },
  { name: 'Fundo Creme', primary: '#9f6d37', text: '#1f2937', background: '#fdf6e3' },
  { name: 'Fundo Cinza Claro', primary: '#4b5563', text: '#1f2937', background: '#f8f9fa' },
];

export interface CVTheme {
  primary: string;
  text: string;
  background: string;
}

interface ThemeSelectorProps {
  currentTheme: CVTheme;
  onThemeChange: (theme: CVTheme) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ currentTheme, onThemeChange }) => {
  return (
    <div className="space-y-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            <div className="flex items-center gap-2 mr-2">
              <Palette className="h-4 w-4" />
              <span>Personalizar Cores</span>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <div 
                className="h-4 w-4 rounded-full" 
                style={{ backgroundColor: currentTheme.primary }}
              />
              <div 
                className="h-4 w-4 rounded border border-muted-foreground/30" 
                style={{ backgroundColor: currentTheme.background }}
              />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-3">Temas predefinidos</h4>
              <div className="grid grid-cols-4 gap-2">
                {predefinedThemes.map((theme, index) => (
                  <button
                    key={index}
                    className={cn(
                      "relative h-8 w-8 rounded-full flex items-center justify-center",
                      "border-2 transition-all hover:scale-110"
                    )}
                    style={{ 
                      backgroundColor: theme.primary,
                      borderColor: theme.primary === currentTheme.primary 
                        ? 'white' 
                        : theme.primary 
                    }}
                    onClick={() => onThemeChange(theme)}
                    title={theme.name}
                  >
                    {theme.primary === currentTheme.primary && 
                     theme.background === currentTheme.background && (
                      <Check className="h-4 w-4 text-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid gap-2">
              <div className="grid gap-1.5">
                <Label htmlFor="primary-color">Cor Principal</Label>
                <div className="flex items-center gap-2">
                  <div 
                    className="h-6 w-6 rounded-md" 
                    style={{ backgroundColor: currentTheme.primary }}
                  />
                  <input
                    id="primary-color"
                    type="color"
                    value={currentTheme.primary}
                    onChange={(e) => onThemeChange({ ...currentTheme, primary: e.target.value })}
                    className="h-8"
                  />
                </div>
              </div>
              
              <div className="grid gap-1.5">
                <Label htmlFor="text-color">Cor do Texto</Label>
                <div className="flex items-center gap-2">
                  <div 
                    className="h-6 w-6 rounded-md" 
                    style={{ backgroundColor: currentTheme.text }}
                  />
                  <input
                    id="text-color"
                    type="color"
                    value={currentTheme.text}
                    onChange={(e) => onThemeChange({ ...currentTheme, text: e.target.value })}
                    className="h-8"
                  />
                </div>
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="background-color">Cor de Fundo</Label>
                <div className="flex items-center gap-2">
                  <div 
                    className="h-6 w-6 rounded-md border border-muted-foreground/30" 
                    style={{ backgroundColor: currentTheme.background }}
                  />
                  <input
                    id="background-color"
                    type="color"
                    value={currentTheme.background}
                    onChange={(e) => onThemeChange({ ...currentTheme, background: e.target.value })}
                    className="h-8"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label>Visualização</Label>
              <div className="mt-2">
                <ThemePreview theme={currentTheme} />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ThemeSelector; 