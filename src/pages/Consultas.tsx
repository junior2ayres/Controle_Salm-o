import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download, Edit, Trash, Loader2, AlertTriangle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { SalmaoService } from "@/lib/salmaoService";

export default function Consultas() {
  const [filters, setFilters] = useState({
    dataInicio: "",
    dataFim: "",
    funcionario: "",
  });

  // Buscar dados reais do Supabase
  const { data: registros, isLoading, error, refetch } = useQuery({
    queryKey: ['consultas', filters],
    queryFn: () => SalmaoService.buscarRegistros(filters),
    refetchInterval: 30000 // Atualiza a cada 30 segundos
  });

  const handleSearch = () => {
    refetch();
  };

  const handleExport = () => {
    if (!registros) return;
    
    // Criar CSV
    const headers = ['Data', 'Funcionário', 'Peso Total (kg)', 'Eficiência (%)', 'Desperdício (%)', 'Status'];
    const csvContent = [
      headers.join(','),
      ...registros.map(registro => [
        new Date(registro.data_limpeza).toLocaleDateString('pt-BR'),
        registro.nome_sushiman,
        (registro.peso_total / 1000).toFixed(1),
        registro.percentual_peixe_limpo.toFixed(1),
        registro.percentual_desperdicio.toFixed(1),
        registro.status
      ].join(','))
    ].join('\n');

    // Download do arquivo
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `registros_salmao_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (error) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Consultas</h1>
          <p className="text-muted-foreground">
            Consulte e gerencie os registros de limpeza
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

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Consultas</h1>
        <p className="text-muted-foreground">
          Consulte e gerencie os registros de limpeza
        </p>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filtros</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="dataInicio">Data Início</Label>
              <Input
                id="dataInicio"
                type="date"
                value={filters.dataInicio}
                onChange={(e) => setFilters({...filters, dataInicio: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="dataFim">Data Fim</Label>
              <Input
                id="dataFim"
                type="date"
                value={filters.dataFim}
                onChange={(e) => setFilters({...filters, dataFim: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="funcionario">Funcionário</Label>
              <Input
                id="funcionario"
                type="text"
                placeholder="Nome do funcionário"
                value={filters.funcionario}
                onChange={(e) => setFilters({...filters, funcionario: e.target.value})}
              />
            </div>
            <div className="flex items-end space-x-2">
              <Button onClick={handleSearch} className="flex-1">
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Button>
              <Button 
                variant="outline" 
                onClick={handleExport}
                disabled={!registros || registros.length === 0}
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Registros */}
      <Card>
        <CardHeader>
          <CardTitle>
            Registros Encontrados ({registros ? registros.length : 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center space-x-2">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span>Carregando registros...</span>
              </div>
            </div>
          ) : registros && registros.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Data</th>
                    <th className="text-left p-3 font-medium">Funcionário</th>
                    <th className="text-right p-3 font-medium">Peso Total (kg)</th>
                    <th className="text-right p-3 font-medium">Eficiência (%)</th>
                    <th className="text-right p-3 font-medium">Desperdício (%)</th>
                    <th className="text-center p-3 font-medium">Status</th>
                    <th className="text-center p-3 font-medium">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {registros.map((registro) => (
                    <tr key={registro.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        {new Date(registro.data_limpeza).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="p-3">{registro.nome_sushiman}</td>
                      <td className="p-3 text-right font-mono">
                        {(registro.peso_total / 1000).toFixed(1)}
                      </td>
                      <td className="p-3 text-right font-mono">
                        <span className={`px-2 py-1 rounded text-xs ${
                          registro.percentual_peixe_limpo >= 90 ? 'bg-green-100 text-green-800' :
                          registro.percentual_peixe_limpo >= 85 ? 'bg-primary/10 text-primary' :
                          'bg-muted text-foreground'
                        }`}>
                          {registro.percentual_peixe_limpo.toFixed(1)}%
                        </span>
                      </td>
                      <td className="p-3 text-right font-mono">
                        <span className={`px-2 py-1 rounded text-xs ${
                          registro.percentual_desperdicio <= 10 ? 'bg-green-100 text-green-800' :
                          registro.percentual_desperdicio <= 15 ? 'bg-primary/10 text-primary' :
                          'bg-muted text-foreground'
                        }`}>
                          {registro.percentual_desperdicio.toFixed(1)}%
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-1 rounded text-xs ${
                          registro.status === 'excelente' ? 'bg-green-100 text-green-800' :
                          registro.status === 'bom' ? 'bg-primary/10 text-primary' :
                          registro.status === 'regular' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {registro.status.charAt(0).toUpperCase() + registro.status.slice(1)}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex justify-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                            <Trash className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg font-medium mb-2">Nenhum registro encontrado</p>
              <p className="text-sm">
                {filters.dataInicio || filters.dataFim || filters.funcionario 
                  ? 'Tente ajustar os filtros de busca'
                  : 'Comece adicionando dados no formulário de preenchimento'
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
