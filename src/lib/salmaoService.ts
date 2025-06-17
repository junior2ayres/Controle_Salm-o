import { supabase, SalmaoRegistro, SalmaoRegistroWithCalculations } from './supabase'

export class SalmaoService {
  // Criar novo registro
  static async criarRegistro(dados: Omit<SalmaoRegistro, 'id' | 'created_at' | 'updated_at'>): Promise<SalmaoRegistro> {
    const { data, error } = await supabase
      .from('salmao_registros')
      .insert([dados])
      .select()
      .single()

    if (error) {
      throw new Error(`Erro ao criar registro: ${error.message}`)
    }

    return data
  }

  // Buscar todos os registros
  static async buscarRegistros(filtros?: {
    dataInicio?: string
    dataFim?: string
    funcionario?: string
  }): Promise<SalmaoRegistroWithCalculations[]> {
    let query = supabase
      .from('salmao_registros')
      .select('*')
      .order('created_at', { ascending: false })

    if (filtros?.dataInicio) {
      query = query.gte('data_limpeza', filtros.dataInicio)
    }

    if (filtros?.dataFim) {
      query = query.lte('data_limpeza', filtros.dataFim)
    }

    if (filtros?.funcionario) {
      query = query.ilike('nome_sushiman', `%${filtros.funcionario}%`)
    }

    const { data, error } = await query

    if (error) {
      throw new Error(`Erro ao buscar registros: ${error.message}`)
    }

    // Adicionar cálculos de eficiência e status
    return data.map(registro => ({
      ...registro,
      eficiencia: registro.percentual_peixe_limpo,
      status: this.calcularStatus(registro.percentual_peixe_limpo)
    }))
  }

  // Buscar registro por ID
  static async buscarRegistroPorId(id: number): Promise<SalmaoRegistro> {
    const { data, error } = await supabase
      .from('salmao_registros')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      throw new Error(`Erro ao buscar registro: ${error.message}`)
    }

    return data
  }

  // Atualizar registro
  static async atualizarRegistro(id: number, dados: Partial<SalmaoRegistro>): Promise<SalmaoRegistro> {
    const { data, error } = await supabase
      .from('salmao_registros')
      .update(dados)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      throw new Error(`Erro ao atualizar registro: ${error.message}`)
    }

    return data
  }

  // Deletar registro
  static async deletarRegistro(id: number): Promise<void> {
    const { error } = await supabase
      .from('salmao_registros')
      .delete()
      .eq('id', id)

    if (error) {
      throw new Error(`Erro ao deletar registro: ${error.message}`)
    }
  }

  // Buscar métricas do dashboard
  static async buscarMetricasDashboard(): Promise<{
    totalProcessado: number
    eficiencia: number
    desperdicio: number
    registros: number
    funcionarios: number
    mediaDiaria: number
  }> {
    const { data, error } = await supabase
      .from('salmao_registros')
      .select('*')

    if (error) {
      throw new Error(`Erro ao buscar métricas: ${error.message}`)
    }

    if (!data || data.length === 0) {
      return {
        totalProcessado: 0,
        eficiencia: 0,
        desperdicio: 0,
        registros: 0,
        funcionarios: 0,
        mediaDiaria: 0
      }
    }

    const totalProcessado = data.reduce((sum, registro) => sum + registro.peso_total, 0)
    const eficiencia = data.reduce((sum, registro) => sum + registro.percentual_peixe_limpo, 0) / data.length
    const desperdicio = data.reduce((sum, registro) => sum + registro.percentual_desperdicio, 0) / data.length
    const registros = data.length
    const funcionarios = new Set(data.map(r => r.nome_sushiman)).size
    const mediaDiaria = totalProcessado / 30 // Assumindo 30 dias

    return {
      totalProcessado: Math.round(totalProcessado * 100) / 100,
      eficiencia: Math.round(eficiencia * 10) / 10,
      desperdicio: Math.round(desperdicio * 10) / 10,
      registros,
      funcionarios,
      mediaDiaria: Math.round(mediaDiaria * 10) / 10
    }
  }

  // Buscar atividades recentes
  static async buscarAtividadesRecentes(limite: number = 5): Promise<SalmaoRegistroWithCalculations[]> {
    const { data, error } = await supabase
      .from('salmao_registros')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limite)

    if (error) {
      throw new Error(`Erro ao buscar atividades: ${error.message}`)
    }

    return data.map(registro => ({
      ...registro,
      eficiencia: registro.percentual_peixe_limpo,
      status: this.calcularStatus(registro.percentual_peixe_limpo)
    }))
  }

  // Upload de imagem
  static async uploadImagem(file: File, nomeArquivo: string): Promise<string> {
    const { data, error } = await supabase.storage
      .from('etiquetas')
      .upload(nomeArquivo, file)

    if (error) {
      throw new Error(`Erro ao fazer upload: ${error.message}`)
    }

    const { data: urlData } = supabase.storage
      .from('etiquetas')
      .getPublicUrl(data.path)

    return urlData.publicUrl
  }

  // Calcular status baseado na eficiência
  private static calcularStatus(eficiencia: number): 'excelente' | 'bom' | 'regular' | 'ruim' {
    if (eficiencia >= 90) return 'excelente'
    if (eficiencia >= 85) return 'bom'
    if (eficiencia >= 80) return 'regular'
    return 'ruim'
  }
} 