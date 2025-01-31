import React, { ReactNode } from "react";
import { Menu, Search, Bell, UserCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full flex justify-between items-center px-6 h-14">
        
        {/* Gestão de Projetos no lado esquerdo */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="mr-2 md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <a className="flex items-center space-x-2" href="/">
            <span className="font-bold">Gestão de Projetos</span>
          </a>
        </div>

        {/* Barra de busca no centro */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-lg">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Buscar projetos..."
              className="w-full bg-white dark:bg-gray-800 h-9 rounded-md border border-input px-8"
            />
          </div>
        </div>

        {/* Ícones do lado direito */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <UserCircle2 className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuItem>Perfil</DropdownMenuItem>
              <DropdownMenuItem>Configurações</DropdownMenuItem>
              <DropdownMenuItem>Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>


{/* Main Content */}
<main className="flex-1 w-full flex justify-center py-6">
  <div className="w-full max-w-[1600px] px-6">
    {children}
  </div>
</main>

    </div>
  );
};

export default Layout;
