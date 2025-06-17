# 🚀 Guia para Publicar no GitHub

## 📋 Pré-requisitos

1. **Conta no GitHub** - [github.com](https://github.com)
2. **Git instalado** no computador
3. **Projeto funcionando** localmente

## 🔧 Passos para Publicar

### 1. Inicializar Git (se ainda não foi feito)

```bash
# No diretório do projeto
git init
```

### 2. Adicionar Arquivos

```bash
# Adicionar todos os arquivos
git add .

# Verificar o que será commitado
git status
```

### 3. Primeiro Commit

```bash
git commit -m "🎉 Initial commit: Sistema de Controle de Salmão

- Dashboard com métricas em tempo real
- Formulário de preenchimento com cálculos automáticos
- Sistema de consultas e filtros
- Integração com Supabase
- Tema pastel preto e laranja
- Interface responsiva
- Teste de conexão com banco de dados"
```

### 4. Criar Repositório no GitHub

1. Acesse [github.com](https://github.com)
2. Clique em **"New repository"** (botão verde)
3. Configure o repositório:
   - **Repository name**: `sistema-salmao` (ou nome de sua preferência)
   - **Description**: `Sistema web para controle de limpeza de salmão`
   - **Visibility**: Public ou Private
   - **NÃO** marque "Add a README file" (já temos um)
   - **NÃO** marque "Add .gitignore" (já temos um)
4. Clique em **"Create repository"**

### 5. Conectar Repositório Local ao GitHub

```bash
# Adicionar o repositório remoto
git remote add origin https://github.com/SEU_USUARIO/sistema-salmao.git

# Verificar se foi adicionado
git remote -v
```

### 6. Enviar para o GitHub

```bash
# Enviar o código
git push -u origin main
```

## 🎯 Estrutura do Repositório

```
sistema-salmao/
├── src/                    # Código fonte
├── public/                 # Arquivos públicos
├── README.md              # Documentação principal
├── SUPABASE_SETUP.md      # Guia do Supabase
├── GITHUB_PUBLISH.md      # Este arquivo
├── supabase-schema.sql    # Script do banco
├── env.example            # Exemplo de variáveis
├── package.json           # Dependências
├── tailwind.config.ts     # Configuração do Tailwind
└── .gitignore            # Arquivos ignorados
```

## 🔒 Segurança

### Arquivos que NÃO devem ir para o GitHub:
- ✅ `.env` (contém credenciais)
- ✅ `node_modules/` (dependências)
- ✅ `.supabase/` (configurações locais)
- ✅ `dist/` (build de produção)

### Arquivos que DEVEM ir para o GitHub:
- ✅ `env.example` (exemplo de configuração)
- ✅ `supabase-schema.sql` (estrutura do banco)
- ✅ Todo o código fonte
- ✅ Documentação

## 🌐 Deploy Automático

### Vercel (Recomendado)
1. Acesse [vercel.com](https://vercel.com)
2. Conecte sua conta GitHub
3. Importe o repositório
4. Configure as variáveis de ambiente:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy automático!

### Netlify
1. Acesse [netlify.com](https://netlify.com)
2. Conecte sua conta GitHub
3. Importe o repositório
4. Configure as variáveis de ambiente
5. Deploy automático!

## 📝 Comandos Git Úteis

```bash
# Ver status
git status

# Ver histórico
git log --oneline

# Criar nova branch
git checkout -b feature/nova-funcionalidade

# Mudar de branch
git checkout main

# Atualizar repositório local
git pull origin main

# Ver branches
git branch -a
```

## 🚨 Solução de Problemas

### Erro: "fatal: remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/SEU_USUARIO/sistema-salmao.git
```

### Erro: "rejected because the tip of your current branch is behind"
```bash
git pull origin main --rebase
git push origin main
```

### Erro: "Permission denied"
- Verifique se está logado no GitHub
- Confirme se tem permissão no repositório
- Use token de acesso pessoal se necessário

## 🎉 Após Publicar

1. **Verifique o repositório** no GitHub
2. **Teste o README** (deve aparecer na página inicial)
3. **Configure o deploy** (Vercel/Netlify)
4. **Compartilhe o link** do repositório

## 📊 Badges para o README

Adicione estes badges ao seu README:

```markdown
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.1-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.11-38B2AC)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E)
```

## 🔄 Atualizações Futuras

```bash
# Adicionar mudanças
git add .

# Commit com mensagem descritiva
git commit -m "✨ Adiciona nova funcionalidade X"

# Enviar para GitHub
git push origin main
```

---

**🎯 Seu projeto está pronto para o mundo! 🌍** 