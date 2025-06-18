// Update this page (the content is just a fallback if you fail to update the page)

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Fish, BarChart3, ClipboardList, Search, TrendingUp, FileText, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const quickActions = [
    {
      title: "Dashboard",
      description: "Visualize métricas e estatísticas",
      icon: BarChart3,
      path: "/dashboard",
      color: "bg-primary"
    },
    {
      title: "Preenchimento",
      description: "Registrar dados de limpeza",
      icon: ClipboardList,
      path: "/preenchimento",
      color: "bg-blue-500"
    },
    {
      title: "Consultas",
      description: "Buscar registros específicos",
      icon: Search,
      path: "/consultas",
      color: "bg-green-500"
    },
    {
      title: "Métricas",
      description: "Análises detalhadas",
      icon: TrendingUp,
      path: "/metricas",
      color: "bg-purple-500"
    },
    {
      title: "Relatórios",
      description: "Gerar relatórios",
      icon: FileText,
      path: "/relatorios",
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-primary rounded-full">
            <Fish className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">Sistema de Controle de Salmão</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Gerencie eficientemente o processo de limpeza de salmão, acompanhe métricas 
          e otimize a produtividade da sua equipe.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Card key={action.title} className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className={`p-2 ${action.color} rounded-lg`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span>{action.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{action.description}</p>
                <Button asChild className="w-full">
                  <Link to={action.path}>
                    Acessar {action.title}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="p-2 bg-green-500 rounded-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <span>Eficiência</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Acompanhe a eficiência do processo de limpeza e identifique oportunidades 
              de melhoria para reduzir desperdícios.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <span>Equipe</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Gerencie o desempenho da equipe, acompanhe produtividade individual 
              e incentive a melhoria contínua.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="p-2 bg-purple-500 rounded-lg">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span>Relatórios</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Gere relatórios detalhados para análise de tendências, 
              tomada de decisões e apresentação de resultados.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
