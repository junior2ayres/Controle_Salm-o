import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Fish, 
  TrendingUp, 
  Trash2, 
  Users, 
  Calendar,
  Scale,
  PieChart,
  BarChart3
} from "lucide-react";

export default function Dashboard() {
  // Dados fictícios para demonstração
  const metrics = {
    totalProcessado: 1248.5,
    eficiencia: 87.3,
    desperdicio: 12.7,
    registros: 156,
    funcionarios: 8,
    mediadiaria: 42.1
  };

  const recentActivities = [
    {
      id: 1,
      sushiman: "João Silva",
      peso: 25.5,
      eficiencia: 89.2,
      data: "2024-01-15",
      status: "success"
    },
    {
      id: 2,
      sushiman: "Maria Santos",
      peso: 31.2,
      eficiencia: 91.5,
      data: "2024-01-15",
      status: "success"
    },
    {
      id: 3,
      sushiman: "Pedro Oliveira",
      peso: 28.7,
      eficiencia: 85.1,
      data: "2024-01-15",
      status: "warning"
    },
    {
      id: 4,
      sushiman: "Ana Costa",
      peso: 33.9,
      eficiencia: 93.8,
      data: "2024-01-15",
      status: "success"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Acompanhe as métricas de limpeza de salmão em tempo real
        </p>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricCard
          title="Total Processado"
          value={`${metrics.totalProcessado} kg`}
          subtitle="Este mês"
          icon={Fish}
          color="success"
          trend={{ value: 8.2, label: "vs mês anterior", isPositive: true }}
        />
        
        <MetricCard
          title="Eficiência Média"
          value={`${metrics.eficiencia}%`}
          subtitle="Peixe limpo"
          icon={TrendingUp}
          color="success"
          trend={{ value: 2.1, label: "vs mês anterior", isPositive: true }}
        />
        
        <MetricCard
          title="Desperdício"
          value={`${metrics.desperdicio}%`}
          subtitle="Meta: <15%"
          icon={Trash2}
          color="success"
        />
        
        <MetricCard
          title="Registros"
          value={metrics.registros}
          subtitle="Este mês"
          icon={Calendar}
          color="default"
        />
        
        <MetricCard
          title="Funcionários"
          value={metrics.funcionarios}
          subtitle="Ativos"
          icon={Users}
          color="default"
        />
        
        <MetricCard
          title="Média Diária"
          value={`${metrics.mediadiaria} kg`}
          subtitle="Últimos 30 dias"
          icon={Scale}
          color="default"
        />
      </div>

      {/* Charts e Atividades */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Eficiência */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5" />
              <span>Distribuição de Pesos</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-pastel-orange-500 rounded-full"></div>
                  <span className="text-sm">Salmão Limpo</span>
                </div>
                <span className="text-sm font-medium">45.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-pastel-orange-400 rounded-full"></div>
                  <span className="text-sm">Ômega + Skin</span>
                </div>
                <span className="text-sm font-medium">32.1%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-pastel-orange-300 rounded-full"></div>
                  <span className="text-sm">Barriga + Raspa</span>
                </div>
                <span className="text-sm font-medium">10.0%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-pastel-black-500 rounded-full"></div>
                  <span className="text-sm">Desperdício</span>
                </div>
                <span className="text-sm font-medium">12.7%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Atividades Recentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Atividades Recentes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-pastel-black-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{activity.sushiman}</div>
                    <div className="text-xs text-muted-foreground">
                      {activity.peso}kg processados
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      activity.status === 'success' ? 'text-pastel-orange-600' : 
                      activity.status === 'warning' ? 'text-pastel-orange-500' : 'text-pastel-black-600'
                    }`}>
                      {activity.eficiencia}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      eficiência
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-pastel-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-pastel-black-600">Status Geral</p>
                <p className="text-2xl font-bold text-pastel-orange-600">Excelente</p>
              </div>
              <div className="p-2 bg-pastel-orange-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-pastel-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-pastel-black-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-pastel-black-600">Meta Mensal</p>
                <p className="text-2xl font-bold text-pastel-black-700">87.3%</p>
              </div>
              <div className="p-2 bg-pastel-black-100 rounded-full">
                <Scale className="h-6 w-6 text-pastel-black-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-pastel-orange-400">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-pastel-black-600">Produtividade</p>
                <p className="text-2xl font-bold text-pastel-orange-500">+12.5%</p>
              </div>
              <div className="p-2 bg-pastel-orange-100 rounded-full">
                <Fish className="h-6 w-6 text-pastel-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
