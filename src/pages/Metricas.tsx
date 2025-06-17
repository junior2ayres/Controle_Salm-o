
import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Fish, Users, Calendar, Target } from "lucide-react";

export default function Metricas() {
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
          value="87.3%"
          subtitle="Últimos 30 dias"
          icon={Target}
          color="success"
          trend={{ value: 2.1, label: "vs período anterior", isPositive: true }}
        />
        
        <MetricCard
          title="Melhor Performance"
          value="95.8%"
          subtitle="Ana Costa"
          icon={TrendingUp}
          color="success"
        />
        
        <MetricCard
          title="Pior Performance"
          value="78.2%"
          subtitle="Precisa melhoria"
          icon={TrendingDown}
          color="warning"
        />
        
        <MetricCard
          title="Volume Processado"
          value="1.248 kg"
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
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              Gráfico de linha de eficiência ao longo do tempo
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance por Funcionário</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              Gráfico de barras comparativo
            </div>
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
          <div className="space-y-4">
            {[
              { nome: "Ana Costa", eficiencia: 93.8, posicao: 1, tendencia: "up" },
              { nome: "Maria Santos", eficiencia: 91.5, posicao: 2, tendencia: "up" },
              { nome: "João Silva", eficiencia: 89.2, posicao: 3, tendencia: "stable" },
              { nome: "Pedro Oliveira", eficiencia: 85.1, posicao: 4, tendencia: "down" },
            ].map((funcionario, index) => (
              <div key={funcionario.nome} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    index === 0 ? 'bg-yellow-100 text-yellow-800' :
                    index === 1 ? 'bg-gray-100 text-gray-800' :
                    index === 2 ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {funcionario.posicao}
                  </div>
                  <div>
                    <div className="font-medium">{funcionario.nome}</div>
                    <div className="text-sm text-muted-foreground">
                      Eficiência: {funcionario.eficiencia}%
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
        </CardContent>
      </Card>
    </div>
  );
}
