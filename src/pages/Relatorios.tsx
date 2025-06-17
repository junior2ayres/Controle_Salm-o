
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Download, Calendar, Users, BarChart3 } from "lucide-react";

export default function Relatorios() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Relatórios</h1>
        <p className="text-muted-foreground">
          Gere relatórios detalhados em PDF
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Relatório por Período */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Relatório por Período</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="dataInicio">Data Início</Label>
              <Input id="dataInicio" type="date" />
            </div>
            <div>
              <Label htmlFor="dataFim">Data Fim</Label>
              <Input id="dataFim" type="date" />
            </div>
            <Button className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Gerar PDF
            </Button>
          </CardContent>
        </Card>

        {/* Relatório por Funcionário */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Relatório por Funcionário</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="funcionario">Funcionário</Label>
              <Input id="funcionario" placeholder="Nome do funcionário" />
            </div>
            <div>
              <Label htmlFor="periodo">Período</Label>
              <Input id="periodo" type="date" />
            </div>
            <Button className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Gerar PDF
            </Button>
          </CardContent>
        </Card>

        {/* Relatório de Métricas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Relatório de Métricas</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="tipoMetrica">Tipo de Métrica</Label>
              <select className="w-full p-2 border rounded-md">
                <option>Eficiência Geral</option>
                <option>Desperdício</option>
                <option>Volume Processado</option>
              </select>
            </div>
            <div>
              <Label htmlFor="intervalo">Intervalo</Label>
              <select className="w-full p-2 border rounded-md">
                <option>Últimos 7 dias</option>
                <option>Últimos 30 dias</option>
                <option>Últimos 90 dias</option>
              </select>
            </div>
            <Button className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Gerar PDF
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Histórico de Relatórios */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Histórico de Relatórios</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { nome: "Relatório Mensal - Janeiro 2024", data: "2024-01-31", tipo: "Período" },
              { nome: "Performance João Silva", data: "2024-01-30", tipo: "Funcionário" },
              { nome: "Métricas de Eficiência", data: "2024-01-29", tipo: "Métricas" },
            ].map((relatorio, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">{relatorio.nome}</div>
                  <div className="text-sm text-muted-foreground">
                    {relatorio.tipo} • {new Date(relatorio.data).toLocaleDateString('pt-BR')}
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="h-3 w-3 mr-1" />
                  Baixar
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
