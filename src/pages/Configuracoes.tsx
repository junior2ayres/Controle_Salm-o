import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Key, Database, Shield, Bell } from "lucide-react";
import { DatabaseTest } from "@/components/DatabaseTest";

export default function Configuracoes() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie as configurações do sistema
        </p>
      </div>

      {/* Teste de Conexão com Banco */}
      <DatabaseTest />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configurações Gerais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Configurações Gerais</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="nomeEmpresa">Nome da Empresa</Label>
              <Input id="nomeEmpresa" placeholder="Digite o nome da empresa" />
            </div>
            <div>
              <Label htmlFor="metaEficiencia">Meta de Eficiência (%)</Label>
              <Input id="metaEficiencia" type="number" placeholder="85" />
            </div>
            <div>
              <Label htmlFor="limiteDesperdicios">Limite de Desperdício (%)</Label>
              <Input id="limiteDesperdicios" type="number" placeholder="15" />
            </div>
            <Button>Salvar Configurações</Button>
          </CardContent>
        </Card>

        {/* Licenciamento */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Key className="h-5 w-5" />
              <span>Licenciamento</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-700 font-medium">Licença Ativa</span>
              </div>
              <p className="text-sm text-green-600 mt-1">
                Válida até: 31/12/2024
              </p>
            </div>
            <div>
              <Label htmlFor="licenseKey">Chave da Licença</Label>
              <Input id="licenseKey" type="password" value="XXXXXXXXXXXXXXXXX" readOnly />
            </div>
            <div>
              <Label htmlFor="machineId">ID da Máquina</Label>
              <Input id="machineId" value="MACHINE-ID-12345" readOnly />
            </div>
            <Button variant="outline">Renovar Licença</Button>
          </CardContent>
        </Card>

        {/* Segurança */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Segurança</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="senhaEdicao">Senha de Edição</Label>
              <Input id="senhaEdicao" type="password" placeholder="Nova senha de edição" />
            </div>
            <div>
              <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
              <Input id="confirmarSenha" type="password" placeholder="Confirme a senha" />
            </div>
            <Button>Alterar Senha</Button>
          </CardContent>
        </Card>

        {/* Backup e Dados */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Backup e Dados</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-700 font-medium">Último Backup</p>
              <p className="text-sm text-blue-600">15/01/2024 às 14:30</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" className="flex-1">
                Fazer Backup
              </Button>
              <Button variant="outline" className="flex-1">
                Restaurar
              </Button>
            </div>
            <Button variant="destructive" className="w-full">
              Limpar Todos os Dados
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Notificações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Configurações de Notificação</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Alertas de Desperdício</p>
              <p className="text-sm text-muted-foreground">Notificar quando desperdício ultrapassar limite</p>
            </div>
            <input type="checkbox" className="rounded" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Relatório Diário</p>
              <p className="text-sm text-muted-foreground">Enviar resumo diário por email</p>
            </div>
            <input type="checkbox" className="rounded" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Meta de Eficiência</p>
              <p className="text-sm text-muted-foreground">Alertar quando meta não for atingida</p>
            </div>
            <input type="checkbox" className="rounded" defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
