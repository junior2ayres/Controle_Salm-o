import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download, Edit, Trash } from "lucide-react";

export default function Consultas() {
  const [filters, setFilters] = useState({
    dataInicio: "",
    dataFim: "",
    funcionario: "",
  });

  // Dados fictícios para demonstração
  const registros = [
    {
      id: 1,
      data: "2024-01-15",
      funcionario: "João Silva",
      pesoTotal: 25.5,
      eficiencia: 89.2,
      desperdicio: 10.8,
      status: "Concluído"
    },
    {
      id: 2,
      data: "2024-01-15",
      funcionario: "Maria Santos",
      pesoTotal: 31.2,
      eficiencia: 91.5,
      desperdicio: 8.5,
      status: "Concluído"
    },
    {
      id: 3,
      data: "2024-01-14",
      funcionario: "Pedro Oliveira",
      pesoTotal: 28.7,
      eficiencia: 85.1,
      desperdicio: 14.9,
      status: "Concluído"
    },
    {
      id: 4,
      data: "2024-01-14",
      funcionario: "Ana Costa",
      pesoTotal: 33.9,
      eficiencia: 93.8,
      desperdicio: 6.2,
      status: "Concluído"
    },
  ];

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
              <Button className="flex-1">
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Button>
              <Button variant="outline">
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
          <CardTitle>Registros Encontrados ({registros.length})</CardTitle>
        </CardHeader>
        <CardContent>
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
                      {new Date(registro.data).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="p-3">{registro.funcionario}</td>
                    <td className="p-3 text-right font-mono">{registro.pesoTotal}</td>
                    <td className="p-3 text-right font-mono">
                      <span className={`px-2 py-1 rounded text-xs ${
                        registro.eficiencia >= 90 ? 'bg-pastel-orange-100 text-pastel-orange-800' :
                        registro.eficiencia >= 85 ? 'bg-pastel-orange-50 text-pastel-orange-700' :
                        'bg-pastel-black-100 text-pastel-black-800'
                      }`}>
                        {registro.eficiencia}%
                      </span>
                    </td>
                    <td className="p-3 text-right font-mono">
                      <span className={`px-2 py-1 rounded text-xs ${
                        registro.desperdicio <= 10 ? 'bg-pastel-orange-100 text-pastel-orange-800' :
                        registro.desperdicio <= 15 ? 'bg-pastel-orange-50 text-pastel-orange-700' :
                        'bg-pastel-black-100 text-pastel-black-800'
                      }`}>
                        {registro.desperdicio}%
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-1 bg-pastel-orange-100 text-pastel-orange-800 rounded text-xs">
                        {registro.status}
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
        </CardContent>
      </Card>
    </div>
  );
}
