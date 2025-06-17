import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para o banco de dados
export interface SalmaoRegistro {
  id?: number
  data_limpeza: string
  nome_sushiman: string
  peso_salmao_limpo: number
  peso_omega: number
  peso_skin: number
  peso_barriga: number
  peso_raspa: number
  peso_desperdicio: number
  peso_total: number
  percentual_peixe_limpo: number
  percentual_desperdicio: number
  foto_etiqueta_url?: string
  created_at?: string
  updated_at?: string
}

export interface SalmaoRegistroWithCalculations extends SalmaoRegistro {
  eficiencia: number
  status: 'excelente' | 'bom' | 'regular' | 'ruim'
} 