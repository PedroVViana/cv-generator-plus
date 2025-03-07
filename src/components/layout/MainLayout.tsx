import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/hooks/use-theme';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link to="/" className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">CV Generator</span>
            </Link>
          </div>
          
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Button variant="outline" size="icon" className="ml-2">
                <Download className="h-4 w-4" />
                <span className="sr-only">Baixar</span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    {theme === 'dark' ? (
                      <Moon className="h-4 w-4" />
                    ) : (
                      <Sun className="h-4 w-4" />
                    )}
                    <span className="sr-only">Alternar tema</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme('light')}>
                    <Sun className="mr-2 h-4 w-4" />
                    <span>Light</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme('dark')}>
                    <Moon className="mr-2 h-4 w-4" />
                    <span>Dark</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} CV Generator. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/sobre">Sobre</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/privacidade">Privacidade</Link>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout; 