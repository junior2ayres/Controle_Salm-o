# Configuração do Banco de Dados - Sistema de Controle de Salmão

## Problema Identificado

O sistema está mostrando dados fictícios porque as variáveis de ambiente do Supabase não estão configuradas corretamente.

## Solução

### 1. Configurar Variáveis de Ambiente

1. **Acesse a página de Configurações** no sistema
2. **Use o componente "Configuração de Variáveis de Ambiente"** para gerar o arquivo `.env`
3. **Siga os passos na interface** para obter suas credenciais do Supabase

### 2. Obter Credenciais do Supabase

1. Acesse [supabase.com/dashboard](https://supabase.com/dashboard)
2. Selecione seu projeto
3. Vá em **Settings → API**
4. Copie:
   - **Project URL** → para o campo URL
   - **anon public** key → para o campo Chave

### 3. Criar Arquivo .env

1. Na página de configurações, preencha os campos com suas credenciais
2. Clique em **"Baixar .env"** ou **"Copiar"**
3. Coloque o arquivo `.env` na **raiz do projeto** (mesmo nível do `package.json`)

### 4. Reiniciar o Sistema

```bash
# Pare o servidor (Ctrl+C)
# Reinicie o servidor
npm run dev
```

### 5. Testar Conexão

1. Vá para a seção **"Teste de Conexão"** nas configurações
2. Clique em **"Testar Conexão"**
3. Se tudo estiver correto, você verá uma mensagem de sucesso

## Estrutura do Arquivo .env

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Configurações Opcionais
VITE_APP_NAME="Sistema de Controle de Salmão"
VITE_APP_VERSION="1.0.0"
```

## Verificação

Após a configuração:

1. **Dashboard** mostrará dados reais do banco
2. **Consultas** funcionará com filtros reais
3. **Métricas** serão calculadas com dados reais
4. **Relatórios** serão gerados com dados reais

## Problemas Comuns

### Erro: "Missing Supabase environment variables"
- **Causa**: Arquivo `.env` não existe ou variáveis não estão definidas
- **Solução**: Criar arquivo `.env` com as credenciais corretas

### Erro: "Invalid API key"
- **Causa**: Chave anônima incorreta
- **Solução**: Verificar se copiou a chave "anon public" correta

### Erro: "Connection failed"
- **Causa**: URL do projeto incorreta
- **Solução**: Verificar se copiou a "Project URL" correta

### Dashboard mostra zeros
- **Causa**: Banco de dados vazio
- **Solução**: Adicionar dados através do formulário de preenchimento

## Próximos Passos

1. Configure as variáveis de ambiente
2. Teste a conexão
3. Adicione dados reais através do formulário
4. Verifique se o Dashboard mostra dados reais
5. Use as outras funcionalidades do sistema

## Suporte

Se ainda houver problemas:
1. Verifique se o projeto Supabase está ativo
2. Confirme se a tabela `salmao_registros` foi criada
3. Teste a conexão na página de configurações
4. Verifique os logs do console do navegador 