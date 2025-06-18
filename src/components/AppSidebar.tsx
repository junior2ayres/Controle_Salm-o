import { 
  Home, 
  FileText, 
  Search, 
  BarChart3, 
  FileSpreadsheet, 
  Settings,
  Fish
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useLocation, Link } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    url: "/",
  },
  {
    title: "Preenchimento",
    icon: FileText,
    url: "/preenchimento",
  },
  {
    title: "Consultas",
    icon: Search,
    url: "/consultas",
  },
  {
    title: "Métricas",
    icon: BarChart3,
    url: "/metricas",
  },
  {
    title: "Relatórios",
    icon: FileSpreadsheet,
    url: "/relatorios",
  },
  {
    title: "Configurações",
    icon: Settings,
    url: "/configuracoes",
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="border-b border-border p-4 bg-black">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-pastel-blue-500 rounded-lg">
            <Fish className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Sistema Salmão</h2>
            <p className="text-sm text-gray-200">Controle de Limpeza</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    className="w-full justify-start"
                  >
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
