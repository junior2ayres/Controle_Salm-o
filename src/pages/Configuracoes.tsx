import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Settings, 
  Database, 
  Eye, 
  EyeOff, 
  Save, 
  TestTube,
  CheckCircle,
  XCircle,
  Loader2,
  RefreshCw
} from "lucide-react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SalmaoService } from "@/lib/salmaoService";
import { supabase } from "@/lib/supabase";
import EnvConfig from "@/components/EnvConfig";

export default function Configuracoes() {
  const [showPassword, setShowPassword] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
    data?: any;
  } | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  
  const queryClient = useQueryClient();

  // Testar conexão com Supabase
  const testConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    
    try {
      // Testar conexão básica
      const { data, error } = await supabase
        .from('salmao_registros')
        .select('count')
        .limit(1);

      if (error) {
        setTestResult({
          success: false,
          message: `Erro de conexão: ${error.message}`
        });
        return;
      }

      // Buscar dados reais
      const registros = await SalmaoService.buscarRegistros();
      const metricas = await SalmaoService.buscarMetricasDashboard();

      setTestResult({
        success: true,
        message: `Conexão bem-sucedida! Encontrados ${registros.length} registros.`,
        data: {
          registros: registros.length,
          metricas
        }
      });

      // Invalidar cache para atualizar dados
      queryClient.invalidateQueries({ queryKey: ['dashboard-metrics'] });
      queryClient.invalidateQueries({ queryKey: ['recent-activities'] });

    } catch (error: any) {
      setTestResult({
        success: false,
        message: `Erro: ${error.message}`
      });
    } finally {
      setIsTesting(false);
    }
  };

  // Buscar dados para visualização
  const { data: registros, isLoading: registrosLoading } = useQuery({
    queryKey: ['test-registros'],
    queryFn: () => SalmaoService.buscarRegistros(),
    enabled: false // Só executa quando chamado manualmente
  });

  const showRegistros = async () => {
    await queryClient.prefetchQuery({
      queryKey: ['test-registros'],
      queryFn: () => SalmaoService.buscarRegistros()
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie as configurações do sistema e conexões
        </p>
      </div>

      {/* Configuração de Variáveis de Ambiente */}
      <EnvConfig />

      {/* Teste de Conexão */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TestTube className="h-5 w-5" />
            <span>Teste de Conexão com Banco de Dados</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Button 
              onClick={testConnection} 
              disabled={isTesting}
              className="flex items-center space-x-2"
            >
              {isTesting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Database className="h-4 w-4" />
              )}
              <span>{isTesting ? 'Testando...' : 'Testar Conexão'}</span>
            </Button>
            
            <Button 
              onClick={showRegistros} 
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Eye className="h-4 w-4" />
              <span>Ver Dados</span>
            </Button>
          </div>

          {testResult && (
            <div className={`p-4 rounded-lg border ${
              testResult.success 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center space-x-2">
                {testResult.success ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
                <span className={`font-medium ${
                  testResult.success ? 'text-green-800' : 'text-red-800'
                }`}>
                  {testResult.message}
                </span>
              </div>
              
              {testResult.data && (
                <div className="mt-3 space-y-2">
                  <div className="text-sm text-green-700">
                    <strong>Registros encontrados:</strong> {testResult.data.registros}
                  </div>
                  <div className="text-sm text-green-700">
                    <strong>Total processado:</strong> {testResult.data.metricas.totalProcessado} kg
                  </div>
                  <div className="text-sm text-green-700">
                    <strong>Eficiência média:</strong> {testResult.data.metricas.eficiencia}%
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Visualização de Dados */}
          {registros && registros.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Dados no Banco:</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {registros.map((registro) => (
                  <div key={registro.id} className="p-3 bg-gray-50 rounded-lg border">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{registro.nome_sushiman}</div>
                        <div className="text-sm text-gray-600">
                          Data: {new Date(registro.data_limpeza).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="text-sm text-gray-600">
                          Peso Total: {(registro.peso_total / 1000).toFixed(1)} kg
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-medium ${
                          registro.percentual_peixe_limpo >= 90 ? 'text-green-600' :
                          registro.percentual_peixe_limpo >= 85 ? 'text-pastel-blue-600' : 'text-red-600'
                        }`}>
                          {registro.percentual_peixe_limpo}%
                        </div>
                        <div className="text-xs text-gray-500">eficiente</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {registrosLoading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="ml-2">Carregando dados...</span>
            </div>
          )}

          {registros && registros.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>Nenhum registro encontrado no banco de dados.</p>
              <p className="text-sm">Comece adicionando dados no formulário de preenchimento.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Configurações do Sistema */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Configurações do Sistema</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Configurações de Notificação */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Notificações</h3>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Notificações por Email</Label>
                <p className="text-sm text-muted-foreground">
                  Receber alertas por email quando a eficiência estiver baixa
                </p>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Notificações Push</Label>
                <p className="text-sm text-muted-foreground">
                  Receber notificações no navegador
                </p>
              </div>
              <Switch />
            </div>
          </div>

          <Separator />

          {/* Configurações de Interface */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Interface</h3>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Modo Escuro</Label>
                <p className="text-sm text-muted-foreground">
                  Alternar entre tema claro e escuro
                </p>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Atualização Automática</Label>
                <p className="text-sm text-muted-foreground">
                  Atualizar dados automaticamente a cada 30 segundos
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>

          <Separator />

          {/* Configurações de Segurança */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Segurança</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Senha Atual</Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha atual"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-password">Nova Senha</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Digite a nova senha"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirme a nova senha"
                />
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-end space-x-4 pt-4">
            <Button variant="outline">Cancelar</Button>
            <Button className="flex items-center space-x-2">
              <Save className="h-4 w-4" />
              <span>Salvar Configurações</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Informações do Sistema */}
      <Card>
        <CardHeader>
          <CardTitle>Informações do Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Versão:</span> 1.0.0
            </div>
            <div>
              <span className="font-medium">Última Atualização:</span> {new Date().toLocaleDateString('pt-BR')}
            </div>
            <div>
              <span className="font-medium">Banco de Dados:</span> Supabase
            </div>
            <div>
              <span className="font-medium">Status:</span> 
              <span className="ml-1 text-green-600">Online</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
