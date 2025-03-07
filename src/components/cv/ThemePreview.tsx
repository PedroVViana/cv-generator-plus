import React from 'react';
import { Card } from '@/components/ui/card';
import { CVTheme } from './ThemeSelector';

interface ThemePreviewProps {
  theme: CVTheme;
}

const ThemePreview: React.FC<ThemePreviewProps> = ({ theme }) => {
  return (
    <div 
      className="w-full rounded-md border p-4 shadow-sm"
      style={{ backgroundColor: theme.background }}
    >
      <div
        className="mb-3 h-8 w-1/2 rounded"
        style={{ backgroundColor: theme.primary }}
      />
      
      <div className="space-y-2">
        <div
          className="h-3 w-4/5 rounded-sm"
          style={{ backgroundColor: theme.text, opacity: 0.85 }}
        />
        <div
          className="h-3 w-3/5 rounded-sm"
          style={{ backgroundColor: theme.text, opacity: 0.7 }}
        />
        <div
          className="h-3 w-full rounded-sm"
          style={{ backgroundColor: theme.text, opacity: 0.5 }}
        />
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
        <div
          className="h-6 w-16 rounded-full"
          style={{ backgroundColor: theme.primary, opacity: 0.2 }}
        />
        <div
          className="h-6 w-24 rounded-full"
          style={{ backgroundColor: theme.primary, opacity: 0.2 }}
        />
        <div
          className="h-6 w-20 rounded-full"
          style={{ backgroundColor: theme.primary, opacity: 0.2 }}
        />
      </div>
    </div>
  );
};

export default ThemePreview; 