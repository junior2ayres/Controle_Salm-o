-- Script para criar a tabela no Supabase
-- Execute este script no SQL Editor do Supabase

-- Criar tabela de registros de salmão
CREATE TABLE IF NOT EXISTS salmao_registros (
    id BIGSERIAL PRIMARY KEY,
    data_limpeza DATE NOT NULL,
    nome_sushiman VARCHAR(255) NOT NULL,
    peso_salmao_limpo DECIMAL(10,3) NOT NULL,
    peso_omega DECIMAL(10,3) NOT NULL,
    peso_skin DECIMAL(10,3) NOT NULL,
    peso_barriga DECIMAL(10,3) NOT NULL,
    peso_raspa DECIMAL(10,3) NOT NULL,
    peso_desperdicio DECIMAL(10,3) NOT NULL,
    peso_total DECIMAL(10,3) NOT NULL,
    percentual_peixe_limpo DECIMAL(5,2) NOT NULL,
    percentual_desperdicio DECIMAL(5,2) NOT NULL,
    foto_etiqueta_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_salmao_data_limpeza ON salmao_registros(data_limpeza);
CREATE INDEX IF NOT EXISTS idx_salmao_nome_sushiman ON salmao_registros(nome_sushiman);
CREATE INDEX IF NOT EXISTS idx_salmao_created_at ON salmao_registros(created_at);

-- Habilitar Row Level Security (RLS)
ALTER TABLE salmao_registros ENABLE ROW LEVEL SECURITY;

-- Criar política para permitir todas as operações (para desenvolvimento)
-- Em produção, você deve criar políticas mais restritivas
CREATE POLICY "Permitir todas as operações" ON salmao_registros
    FOR ALL USING (true);

-- Criar bucket para armazenar imagens das etiquetas
-- Execute no Storage do Supabase
-- INSERT INTO storage.buckets (id, name, public) VALUES ('etiquetas', 'etiquetas', true);

-- Criar função para atualizar o timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Criar trigger para atualizar updated_at automaticamente
CREATE TRIGGER update_salmao_registros_updated_at 
    BEFORE UPDATE ON salmao_registros 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Inserir alguns dados de exemplo (opcional)
INSERT INTO salmao_registros (
    data_limpeza,
    nome_sushiman,
    peso_salmao_limpo,
    peso_omega,
    peso_skin,
    peso_barriga,
    peso_raspa,
    peso_desperdicio,
    peso_total,
    percentual_peixe_limpo,
    percentual_desperdicio
) VALUES 
    ('2024-01-15', 'João Silva', 25000, 8000, 5000, 3000, 2000, 5000, 48000, 89.58, 10.42),
    ('2024-01-15', 'Maria Santos', 31200, 9500, 6000, 3500, 2500, 4300, 57000, 92.46, 7.54),
    ('2024-01-14', 'Pedro Oliveira', 28700, 8500, 5500, 3200, 2200, 5800, 52700, 85.01, 14.99),
    ('2024-01-14', 'Ana Costa', 33900, 10200, 6500, 3800, 2800, 3200, 61400, 93.81, 6.19); 