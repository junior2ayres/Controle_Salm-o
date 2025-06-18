import MetricCard from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Fish, 
  TrendingUp, 
  Trash2, 
  Users, 
  Calendar,
  Scale,
  PieChart,
  BarChart3,
  Loader2
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { SalmaoService } from "@/lib/salmaoService";

export default function Dashboard() {
  // Buscar métricas reais do banco
  const { data: metrics, isLoading: metricsLoading, error: metricsError } = useQuery({
    queryKey: ['dashboard-metrics'],
    queryFn: SalmaoService.buscarMetricasDashboard,
    refetchInterval: 30000 // Atualiza a cada 30 segundos
  });

  // Buscar atividades recentes reais
  const { data: recentActivities, isLoading: activitiesLoading } = useQuery({
    queryKey: ['recent-activities'],
    queryFn: () => SalmaoService.buscarAtividadesRecentes(4),
    refetchInterval: 30000
  });

  // Dados padrão caso não haja dados
  const defaultMetrics = {
    totalProcessado: 0,
    eficiencia: 0,
    desperdicio: 0,
    registros: 0,
    funcionarios: 0,
    mediaDiaria: 0
  };

  const currentMetrics = metrics || defaultMetrics;

  if (metricsLoading || activitiesLoading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Acompanhe as métricas de limpeza de salmão em tempo real
          </p>
        </div>
        
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Carregando dados...</span>
          </div>
        </div>
      </div>
    );
  }

  if (metricsError) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Acompanhe as métricas de limpeza de salmão em tempo real
          </p>
        </div>
        
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 text-red-600">
              <span className="font-medium">Erro ao carregar dados:</span>
              <span>{metricsError.message}</span>
            </div>
            <p className="text-sm text-red-500 mt-2">
              Verifique a conexão com o banco de dados nas configurações.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

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
          value={`${currentMetrics.totalProcessado} kg`}
          icon={Fish}
          trend={{ value: 8.2, isPositive: true }}
          description="Este mês"
        />
        
        <MetricCard
          title="Eficiência Média"
          value={`${currentMetrics.eficiencia}%`}
          icon={TrendingUp}
          trend={{ value: 2.1, isPositive: true }}
          description="Peixe limpo"
        />
        
        <MetricCard
          title="Desperdício"
          value={`${currentMetrics.desperdicio}%`}
          icon={Trash2}
          description="Meta: <15%"
        />
        
        <MetricCard
          title="Registros"
          value={currentMetrics.registros}
          icon={Calendar}
          description="Este mês"
        />
        
        <MetricCard
          title="Funcionários"
          value={currentMetrics.funcionarios}
          icon={Users}
          description="Ativos"
        />
        
        <MetricCard
          title="Média Diária"
          value={`${currentMetrics.mediaDiaria} kg`}
          icon={Scale}
          description="Últimos 30 dias"
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
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-sm">Salmão Limpo</span>
                </div>
                <span className="text-sm font-medium">45.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Ômega + Skin</span>
                </div>
                <span className="text-sm font-medium">32.1%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-sm">Barriga + Raspa</span>
                </div>
                <span className="text-sm font-medium">10.0%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
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
            {recentActivities && recentActivities.length > 0 ? (
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{activity.nome_sushiman}</div>
                      <div className="text-xs text-muted-foreground">
                        {(activity.peso_total / 1000).toFixed(1)}kg processados
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${
                        activity.eficiencia >= 90 ? 'text-green-600' : 
                        activity.eficiencia >= 85 ? 'text-primary' : 'text-foreground'
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
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>Nenhuma atividade recente</p>
                <p className="text-sm">Comece registrando dados no formulário de preenchimento</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Status Geral</p>
                <p className="text-2xl font-bold text-primary">
                  {currentMetrics.eficiencia >= 85 ? 'Excelente' : 
                   currentMetrics.eficiencia >= 80 ? 'Bom' : 'Regular'}
                </p>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Meta Mensal</p>
                <p className="text-2xl font-bold text-foreground">{currentMetrics.eficiencia}%</p>
              </div>
              <div className="p-2 bg-muted rounded-full">
                <Scale className="h-6 w-6 text-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Produtividade</p>
                <p className="text-2xl font-bold text-blue-500">
                  {currentMetrics.registros > 0 ? '+' + Math.round((currentMetrics.eficiencia - 80) * 10) / 10 : '0'}%
                </p>
              </div>
              <div className="p-2 bg-blue-500/10 rounded-full">
                <Fish className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
