# Configuração do Supabase

## 📋 Passos para Configurar o Banco de Dados

### 1. Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Faça login ou crie uma conta
3. Clique em "New Project"
4. Escolha sua organização
5. Digite um nome para o projeto (ex: "sistema-salmao")
6. Escolha uma senha forte para o banco
7. Escolha a região mais próxima
8. Clique em "Create new project"

### 2. Obter Credenciais

1. No dashboard do projeto, vá em **Settings** > **API**
2. Copie as seguintes informações:
   - **Project URL** (ex: `https://abcdefghijklmnop.supabase.co`)
   - **anon public** key (ex: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

### 3. Criar Arquivo .env

1. No diretório raiz do projeto, crie um arquivo chamado `.env`
2. Adicione as seguintes variáveis:

```env
VITE_SUPABASE_URL=sua_url_do_supabase_aqui
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase_aqui
```

**Exemplo:**
```env
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjU0NzIwMCwiZXhwIjoxOTUyMTIzMjAwfQ.exemplo_chave_aqui
```

### 4. Criar Tabela no Banco

1. No dashboard do Supabase, vá em **SQL Editor**
2. Clique em **New Query**
3. Cole o conteúdo do arquivo `supabase-schema.sql`
4. Clique em **Run** para executar o script

### 5. Configurar Storage (Opcional)

Para armazenar imagens das etiquetas:

1. Vá em **Storage** no menu lateral
2. Clique em **New Bucket**
3. Nome: `etiquetas`
4. Marque **Public bucket**
5. Clique em **Create bucket**

### 6. Configurar Políticas de Segurança

O script SQL já cria uma política básica. Para produção, considere:

1. Vá em **Authentication** > **Policies**
2. Configure políticas mais restritivas baseadas em usuários

## 🔧 Estrutura da Tabela

A tabela `salmao_registros` contém:

- `id`: Identificador único (auto-incremento)
- `data_limpeza`: Data da limpeza
- `nome_sushiman`: Nome do funcionário
- `peso_salmao_limpo`: Peso do salmão limpo (gramas)
- `peso_omega`: Peso do ômega (gramas)
- `peso_skin`: Peso da skin (gramas)
- `peso_barriga`: Peso da barriga (gramas)
- `peso_raspa`: Peso da raspa (gramas)
- `peso_desperdicio`: Peso do desperdício (gramas)
- `peso_total`: Peso total calculado (gramas)
- `percentual_peixe_limpo`: % de aproveitamento
- `percentual_desperdicio`: % de desperdício
- `foto_etiqueta_url`: URL da foto da etiqueta (opcional)
- `created_at`: Data de criação
- `updated_at`: Data de atualização

## 🚀 Testando a Conexão

Após configurar, reinicie o servidor de desenvolvimento:

```bash
npm run dev
```

O sistema deve conectar automaticamente ao Supabase e começar a usar dados reais.

## 🔒 Segurança

- As credenciais do `.env` são seguras para desenvolvimento
- Para produção, configure variáveis de ambiente no servidor
- Nunca commite o arquivo `.env` no Git
- Use políticas RLS apropriadas para produção

## 📊 Monitoramento

No dashboard do Supabase você pode:

- Ver logs de consultas em **Logs**
- Monitorar performance em **Database**
- Gerenciar usuários em **Authentication**
- Configurar backups automáticos

## 🆘 Solução de Problemas

### Erro de Conexão
- Verifique se as credenciais estão corretas
- Confirme se o projeto está ativo
- Verifique se a tabela foi criada

### Erro de Permissão
- Verifique as políticas RLS
- Confirme se a chave anônima está correta

### Erro de Upload
- Verifique se o bucket `etiquetas` foi criado
- Confirme as permissões do bucket 