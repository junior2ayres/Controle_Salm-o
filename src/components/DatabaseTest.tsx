import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { SalmaoService } from '@/lib/salmaoService';
import { CheckCircle, XCircle, Loader2, Database, TestTube } from 'lucide-react';

export function DatabaseTest() {
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testResults, setTestResults] = useState<{
    connection: boolean;
    tableExists: boolean;
    canRead: boolean;
    canWrite: boolean;
    metrics: any;
    error?: string;
  } | null>(null);

  const testConnection = async () => {
    setConnectionStatus('testing');
    setTestResults(null);

    try {
      // Teste 1: Conexão básica
      const { data: connectionTest, error: connectionError } = await supabase
        .from('salmao_registros')
        .select('count')
        .limit(1);

      if (connectionError) {
        throw new Error(`Erro de conexão: ${connectionError.message}`);
      }

      // Teste 2: Verificar se a tabela existe
      const { data: tableTest, error: tableError } = await supabase
        .from('salmao_registros')
        .select('*')
        .limit(1);

      if (tableError) {
        throw new Error(`Erro na tabela: ${tableError.message}`);
      }

      // Teste 3: Testar leitura
      const registros = await SalmaoService.buscarRegistros();
      const canRead = Array.isArray(registros);

      // Teste 4: Testar métricas
      const metrics = await SalmaoService.buscarMetricasDashboard();

      // Teste 5: Testar escrita (criar registro temporário)
      const testData = {
        data_limpeza: new Date().toISOString().split('T')[0],
        nome_sushiman: 'Teste Conexão',
        peso_salmao_limpo: 1000,
        peso_omega: 300,
        peso_skin: 200,
        peso_barriga: 150,
        peso_raspa: 100,
        peso_desperdicio: 50,
        peso_total: 1800,
        percentual_peixe_limpo: 94.44,
        percentual_desperdicio: 5.56
      };

      const novoRegistro = await SalmaoService.criarRegistro(testData);
      const canWrite = !!novoRegistro.id;

      // Limpar registro de teste
      if (novoRegistro.id) {
        await SalmaoService.deletarRegistro(novoRegistro.id);
      }

      setTestResults({
        connection: true,
        tableExists: true,
        canRead,
        canWrite,
        metrics
      });

      setConnectionStatus('success');
    } catch (error) {
      console.error('Erro no teste:', error);
      setTestResults({
        connection: false,
        tableExists: false,
        canRead: false,
        canWrite: false,
        metrics: null,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
      setConnectionStatus('error');
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Database className="h-5 w-5" />
          <span>Teste de Conexão - Banco de Dados</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              Teste a conexão com o Supabase e verifique se todas as funcionalidades estão funcionando.
            </p>
          </div>
          <Button 
            onClick={testConnection} 
            disabled={connectionStatus === 'testing'}
            className="flex items-center space-x-2"
          >
            {connectionStatus === 'testing' ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <TestTube className="h-4 w-4" />
            )}
            <span>
              {connectionStatus === 'testing' ? 'Testando...' : 'Testar Conexão'}
            </span>
          </Button>
        </div>

        {connectionStatus === 'success' && testResults && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Conexão estabelecida com sucesso!</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Conexão</span>
                <Badge variant="secondary">OK</Badge>
              </div>
              
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Tabela</span>
                <Badge variant="secondary">OK</Badge>
              </div>
              
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Leitura</span>
                <Badge variant="secondary">OK</Badge>
              </div>
              
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Escrita</span>
                <Badge variant="secondary">OK</Badge>
              </div>
            </div>

            {testResults.metrics && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">Métricas do Banco:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Total Processado: {testResults.metrics.totalProcessado} kg</div>
                  <div>Eficiência: {testResults.metrics.eficiencia}%</div>
                  <div>Registros: {testResults.metrics.registros}</div>
                  <div>Funcionários: {testResults.metrics.funcionarios}</div>
                </div>
              </div>
            )}
          </div>
        )}

        {connectionStatus === 'error' && testResults && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-red-600">
              <XCircle className="h-5 w-5" />
              <span className="font-medium">Erro na conexão</span>
            </div>
            
            <div className="p-3 bg-red-50 rounded-lg">
              <p className="text-sm text-red-800 font-medium">Detalhes do erro:</p>
              <p className="text-sm text-red-700 mt-1">{testResults.error}</p>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>Verifique:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Se o arquivo .env está configurado corretamente</li>
                <li>Se as credenciais do Supabase estão corretas</li>
                <li>Se a tabela foi criada no banco</li>
                <li>Se o projeto está ativo no Supabase</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 