import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Settings, 
  Copy, 
  CheckCircle, 
  XCircle, 
  ExternalLink,
  FileText,
  AlertTriangle
} from "lucide-react";

export default function EnvConfig() {
  const [supabaseUrl, setSupabaseUrl] = useState("");
  const [supabaseKey, setSupabaseKey] = useState("");
  const [copied, setCopied] = useState(false);

  const envContent = `# Supabase Configuration
VITE_SUPABASE_URL=${supabaseUrl}
VITE_SUPABASE_ANON_KEY=${supabaseKey}

# Configurações Opcionais
VITE_APP_NAME="Sistema de Controle de Salmão"
VITE_APP_VERSION="1.0.0"`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(envContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  const downloadEnvFile = () => {
    const blob = new Blob([envContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '.env';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="h-5 w-5" />
          <span>Configuração de Variáveis de Ambiente</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Para que o sistema funcione corretamente, você precisa configurar as variáveis de ambiente do Supabase.
            Siga os passos abaixo:
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div>
            <Label htmlFor="supabase-url">URL do Supabase</Label>
            <Input
              id="supabase-url"
              placeholder="https://seu-projeto.supabase.co"
              value={supabaseUrl}
              onChange={(e) => setSupabaseUrl(e.target.value)}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Encontre esta URL no painel do Supabase em Settings → API
            </p>
          </div>

          <div>
            <Label htmlFor="supabase-key">Chave Anônima do Supabase</Label>
            <Input
              id="supabase-key"
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              value={supabaseKey}
              onChange={(e) => setSupabaseKey(e.target.value)}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Encontre esta chave no painel do Supabase em Settings → API → Project API keys
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            onClick={() => window.open('https://supabase.com/dashboard', '_blank')}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <ExternalLink className="h-4 w-4" />
            <span>Abrir Supabase Dashboard</span>
          </Button>
        </div>

        {supabaseUrl && supabaseKey && (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Conteúdo do arquivo .env:</h4>
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    {copied ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    <span>{copied ? 'Copiado!' : 'Copiar'}</span>
                  </Button>
                  <Button
                    onClick={downloadEnvFile}
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Baixar .env</span>
                  </Button>
                </div>
              </div>
              <pre className="text-sm bg-white p-3 rounded border overflow-x-auto">
                <code>{envContent}</code>
              </pre>
            </div>

            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Próximos passos:</strong>
                <ol className="list-decimal list-inside mt-2 space-y-1">
                  <li>Baixe o arquivo .env ou copie o conteúdo</li>
                  <li>Coloque o arquivo .env na raiz do projeto (mesmo nível do package.json)</li>
                  <li>Reinicie o servidor de desenvolvimento (npm run dev)</li>
                  <li>Teste a conexão na seção de configurações</li>
                </ol>
              </AlertDescription>
            </Alert>
          </div>
        )}

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-800 mb-2">Como encontrar as credenciais:</h4>
          <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
            <li>Acesse <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="underline">supabase.com/dashboard</a></li>
            <li>Selecione seu projeto</li>
            <li>Vá em Settings → API</li>
            <li>Copie a "Project URL" para o campo URL</li>
            <li>Copie a "anon public" key para o campo Chave</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
} 