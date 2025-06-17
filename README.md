# Sistema de Controle de Salmão

## 📋 Descrição

Sistema web desenvolvido em React + TypeScript para controle e monitoramento da limpeza de salmão em restaurantes e indústrias pesqueiras. O sistema permite registrar, consultar e analisar métricas de eficiência no processamento do salmão.

## 🚀 Funcionalidades

### 📊 Dashboard
- **Métricas em Tempo Real**: Visualização de dados de processamento
- **Indicadores de Performance**: Eficiência, desperdício, total processado
- **Atividades Recentes**: Últimos registros de limpeza
- **Gráficos Interativos**: Distribuição de pesos e eficiência

### 📝 Preenchimento
- **Formulário Intuitivo**: Interface otimizada para dispositivos móveis
- **Captura de Fotos**: Integração com câmera para etiquetas
- **Cálculos Automáticos**: Percentuais de eficiência e desperdício
- **Validação em Tempo Real**: Verificação de dados inseridos

### 🔍 Consultas
- **Filtros Avançados**: Por data, funcionário, período
- **Tabela Interativa**: Visualização de todos os registros
- **Exportação de Dados**: Funcionalidade para download
- **Edição e Exclusão**: Gerenciamento de registros

### 📈 Métricas
- **Análise de Performance**: Gráficos e estatísticas
- **Comparativos**: Períodos e funcionários
- **Tendências**: Evolução temporal dos dados

### 📋 Relatórios
- **Relatórios Personalizados**: Geração de documentos
- **Múltiplos Formatos**: PDF, Excel, CSV
- **Agendamento**: Relatórios automáticos

### ⚙️ Configurações
- **Gestão de Usuários**: Controle de acesso
- **Parâmetros do Sistema**: Configurações gerais
- **Backup e Restauração**: Segurança de dados
- **Teste de Conexão**: Verificação do banco de dados

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18**: Framework principal
- **TypeScript**: Tipagem estática
- **Vite**: Build tool e dev server
- **Tailwind CSS**: Estilização
- **Shadcn/ui**: Componentes UI
- **Radix UI**: Componentes acessíveis
- **React Router**: Navegação
- **React Hook Form**: Formulários
- **React Query**: Gerenciamento de estado
- **Recharts**: Gráficos
- **Lucide React**: Ícones

### Backend
- **Supabase**: Banco de dados PostgreSQL
- **Supabase Storage**: Armazenamento de imagens
- **Row Level Security**: Segurança de dados

### Desenvolvimento
- **ESLint**: Linting
- **PostCSS**: Processamento CSS
- **Autoprefixer**: Compatibilidade CSS

## 📦 Instalação

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Conta no Supabase

### Passos para Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/sistema-salmao.git
cd sistema-salmao
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Configure o Supabase**
   - Crie um projeto no [Supabase](https://supabase.com)
   - Execute o script SQL em `supabase-schema.sql`
   - Crie um bucket chamado `etiquetas` no Storage

4. **Configure as variáveis de ambiente**
```bash
cp env.example .env
```
Edite o arquivo `.env` com suas credenciais do Supabase:
```env
VITE_SUPABASE_URL=sua_url_do_supabase_aqui
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase_aqui
```

5. **Execute o projeto em desenvolvimento**
```bash
npm run dev
# ou
yarn dev
```

6. **Acesse o sistema**
```
http://localhost:8080
```

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base (shadcn/ui)
│   ├── AppSidebar.tsx  # Barra lateral
│   ├── MetricCard.tsx  # Cards de métricas
│   ├── SalmaoForm.tsx  # Formulário principal
│   └── DatabaseTest.tsx # Teste de conexão
├── pages/              # Páginas da aplicação
│   ├── Dashboard.tsx   # Página inicial
│   ├── Preenchimento.tsx
│   ├── Consultas.tsx
│   ├── Metricas.tsx
│   ├── Relatorios.tsx
│   └── Configuracoes.tsx
├── lib/                # Utilitários e serviços
│   ├── supabase.ts     # Configuração do Supabase
│   ├── salmaoService.ts # Serviços de dados
│   └── utils.ts        # Funções utilitárias
├── hooks/              # Hooks customizados
└── main.tsx           # Ponto de entrada
```

## 🎯 Como Usar

### 1. Dashboard
- Acesse a página inicial para ver métricas gerais
- Visualize indicadores de performance
- Acompanhe atividades recentes

### 2. Preenchimento
- Clique em "Preenchimento" no menu lateral
- Preencha os dados do sushiman
- Insira os pesos de cada parte do salmão
- Tire uma foto da etiqueta (opcional)
- Salve o registro

### 3. Consultas
- Use filtros para buscar registros específicos
- Visualize dados em tabela
- Exporte relatórios
- Edite ou exclua registros

### 4. Configurações
- Teste a conexão com o banco de dados
- Configure parâmetros do sistema
- Gerencie backups e dados

## 📱 Responsividade

O sistema é totalmente responsivo e otimizado para:
- **Desktop**: Interface completa com sidebar
- **Tablet**: Layout adaptativo
- **Mobile**: Interface touch-friendly

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Build para desenvolvimento
npm run build:dev

# Preview da build
npm run preview

# Linting
npm run lint
```

## 🎨 Tema

O sistema utiliza um tema personalizado com cores pastel:
- **Primary**: Laranja pastel (#ff6b00)
- **Secondary**: Preto pastel (#202124)
- **Success**: Verde pastel
- **Warning**: Amarelo pastel
- **Destructive**: Vermelho pastel

## 🔒 Segurança

- Validação de formulários
- Sanitização de dados
- Row Level Security (RLS) no Supabase
- Variáveis de ambiente seguras
- Backup automático

## 🚀 Deploy

### Build para Produção
```bash
npm run build
```

### Servidor de Produção
O build gera arquivos estáticos que podem ser servidos por qualquer servidor web (Nginx, Apache, etc.).

### Deploy no Vercel/Netlify
1. Conecte seu repositório GitHub
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique a documentação
2. Consulte os issues do projeto
3. Entre em contato com a equipe de desenvolvimento

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🔄 Versões

- **v1.0.0**: Versão inicial com funcionalidades básicas
- **Próximas versões**: Autenticação, relatórios avançados, API REST

---

**Desenvolvido com ❤️ para otimizar o controle de salmão** 