import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Fish, Users, Calendar, Target, Loader2, AlertTriangle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { SalmaoService } from "@/lib/salmaoService";

export default function Metricas() {
  // Buscar dados reais do Supabase
  const { data: registros, isLoading, error } = useQuery({
    queryKey: ['metricas'],
    queryFn: () => SalmaoService.buscarRegistros(),
    refetchInterval: 30000 // Atualiza a cada 30 segundos
  });

  // Calcular métricas baseadas nos dados reais
  const calcularMetricas = () => {
    if (!registros || registros.length === 0) {
      return {
        eficienciaGeral: 0,
        melhorPerformance: { nome: 'N/A', eficiencia: 0 },
        piorPerformance: { nome: 'N/A', eficiencia: 0 },
        volumeProcessado: 0,
        ranking: []
      };
    }

    // Eficiência geral
    const eficienciaGeral = registros.reduce((sum, r) => sum + r.percentual_peixe_limpo, 0) / registros.length;

    // Volume processado
    const volumeProcessado = registros.reduce((sum, r) => sum + r.peso_total, 0) / 1000; // Converter para kg

    // Performance por funcionário
    const performancePorFuncionario = registros.reduce((acc, registro) => {
      if (!acc[registro.nome_sushiman]) {
        acc[registro.nome_sushiman] = {
          nome: registro.nome_sushiman,
          eficiencia: 0,
          registros: 0
        };
      }
      acc[registro.nome_sushiman].eficiencia += registro.percentual_peixe_limpo;
      acc[registro.nome_sushiman].registros += 1;
      return acc;
    }, {} as Record<string, { nome: string; eficiencia: number; registros: number }>);

    // Calcular média por funcionário
    Object.values(performancePorFuncionario).forEach(func => {
      func.eficiencia = func.eficiencia / func.registros;
    });

    // Encontrar melhor e pior performance
    const funcionarios = Object.values(performancePorFuncionario);
    const melhorPerformance = funcionarios.reduce((max, func) => 
      func.eficiencia > max.eficiencia ? func : max
    );
    const piorPerformance = funcionarios.reduce((min, func) => 
      func.eficiencia < min.eficiencia ? func : min
    );

    // Criar ranking
    const ranking = funcionarios
      .sort((a, b) => b.eficiencia - a.eficiencia)
      .slice(0, 5)
      .map((func, index) => ({
        nome: func.nome,
        eficiencia: func.eficiencia,
        posicao: index + 1,
        tendencia: 'stable' as const // Simplificado para demonstração
      }));

    return {
      eficienciaGeral: Math.round(eficienciaGeral * 10) / 10,
      melhorPerformance,
      piorPerformance,
      volumeProcessado: Math.round(volumeProcessado * 10) / 10,
      ranking
    };
  };

  const metricas = calcularMetricas();

  if (error) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Métricas</h1>
          <p className="text-muted-foreground">
            Análise detalhada de performance e tendências
          </p>
        </div>

        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-medium">Erro ao carregar dados:</span>
              <span>{error.message}</span>
            </div>
            <p className="text-sm text-red-500 mt-2">
              Verifique a conexão com o banco de dados nas configurações.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Métricas</h1>
          <p className="text-muted-foreground">
            Análise detalhada de performance e tendências
          </p>
        </div>
        
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Carregando métricas...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Métricas</h1>
        <p className="text-muted-foreground">
          Análise detalhada de performance e tendências
        </p>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Eficiência Geral"
          value={`${metricas.eficienciaGeral}%`}
          subtitle="Últimos 30 dias"
          icon={Target}
          color="success"
          trend={{ value: 2.1, label: "vs período anterior", isPositive: true }}
        />
        
        <MetricCard
          title="Melhor Performance"
          value={`${metricas.melhorPerformance.eficiencia.toFixed(1)}%`}
          subtitle={metricas.melhorPerformance.nome}
          icon={TrendingUp}
          color="success"
        />
        
        <MetricCard
          title="Pior Performance"
          value={`${metricas.piorPerformance.eficiencia.toFixed(1)}%`}
          subtitle={metricas.piorPerformance.nome}
          icon={TrendingDown}
          color="warning"
        />
        
        <MetricCard
          title="Volume Processado"
          value={`${metricas.volumeProcessado} kg`}
          subtitle="Este mês"
          icon={Fish}
          color="default"
        />
      </div>

      {/* Gráficos de Análise */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tendência de Eficiência</CardTitle>
          </CardHeader>
          <CardContent>
            {registros && registros.length > 0 ? (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                Gráfico de linha de eficiência ao longo do tempo
                <br />
                <span className="text-sm">Dados disponíveis: {registros.length} registros</span>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <p>Nenhum dado disponível</p>
                  <p className="text-sm">Adicione registros para ver as métricas</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance por Funcionário</CardTitle>
          </CardHeader>
          <CardContent>
            {registros && registros.length > 0 ? (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                Gráfico de barras comparativo
                <br />
                <span className="text-sm">Funcionários ativos: {new Set(registros.map(r => r.nome_sushiman)).size}</span>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <p>Nenhum dado disponível</p>
                  <p className="text-sm">Adicione registros para ver as métricas</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Ranking de Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Ranking de Performance - Este Mês</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {metricas.ranking.length > 0 ? (
            <div className="space-y-4">
              {metricas.ranking.map((funcionario, index) => (
                <div key={funcionario.nome} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      index === 0 ? 'bg-yellow-100 text-yellow-800' :
                      index === 1 ? 'bg-gray-100 text-gray-800' :
                      index === 2 ? 'bg-pastel-blue-100 text-pastel-blue-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {funcionario.posicao}
                    </div>
                    <div>
                      <div className="font-medium">{funcionario.nome}</div>
                      <div className="text-sm text-muted-foreground">
                        Eficiência: {funcionario.eficiencia.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {funcionario.tendencia === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
                    {funcionario.tendencia === 'down' && <TrendingDown className="h-4 w-4 text-red-500" />}
                    {funcionario.tendencia === 'stable' && <div className="w-4 h-0.5 bg-gray-400 rounded"></div>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg font-medium mb-2">Nenhum ranking disponível</p>
              <p className="text-sm">Adicione registros para ver o ranking de performance</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
