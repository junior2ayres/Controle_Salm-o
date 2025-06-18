import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Camera, Upload, Save, Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SalmaoFormData {
  dataLimpeza: string;
  nomeSushiman: string;
  pesoSalmaoLimpo: number;
  pesoOmega: number;
  pesoSkin: number;
  pesoBarriga: number;
  pesoRaspa: number;
  pesoDesperdicio: number;
  fotoEtiqueta?: File | null;
}

export function SalmaoForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<SalmaoFormData>({
    dataLimpeza: new Date().toISOString().split('T')[0],
    nomeSushiman: "",
    pesoSalmaoLimpo: 0,
    pesoOmega: 0,
    pesoSkin: 0,
    pesoBarriga: 0,
    pesoRaspa: 0,
    pesoDesperdicio: 0,
    fotoEtiqueta: null
  });

  const [calculatedValues, setCalculatedValues] = useState({
    pesoTotal: 0,
    percentualDesperdicio: 0,
    percentualPeixeLimpo: 0
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Calcular valores automaticamente
  useEffect(() => {
    const pesoUtil = formData.pesoSalmaoLimpo + formData.pesoOmega + 
                    formData.pesoSkin + formData.pesoBarriga + formData.pesoRaspa;
    const pesoTotal = pesoUtil + formData.pesoDesperdicio;
    
    const percentualDesperdicio = pesoUtil > 0 ? (formData.pesoDesperdicio / pesoUtil) * 100 : 0;
    const percentualPeixeLimpo = 100 - percentualDesperdicio;

    setCalculatedValues({
      pesoTotal,
      percentualDesperdicio,
      percentualPeixeLimpo
    });
  }, [formData.pesoSalmaoLimpo, formData.pesoOmega, formData.pesoSkin, 
      formData.pesoBarriga, formData.pesoRaspa, formData.pesoDesperdicio]);

  const handleInputChange = (field: keyof SalmaoFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleWeightInputChange = (field: keyof SalmaoFormData, value: string) => {
    // Remove espaços e substitui vírgula por ponto para compatibilidade
    let cleanValue = value.replace(/\s/g, '').replace(',', '.');
    
    // Se o campo estiver vazio, define como 0
    if (cleanValue === '' || cleanValue === '.') {
      handleInputChange(field, 0);
      return;
    }
    
    // Permite apenas números, ponto decimal e até 3 casas decimais
    const numericRegex = /^\d*\.?\d{0,3}$/;
    
    if (numericRegex.test(cleanValue)) {
      const numericValue = parseFloat(cleanValue);
      
      // Verifica se é um número válido e não negativo
      if (!isNaN(numericValue) && numericValue >= 0) {
        const roundedValue = Math.round(numericValue * 1000) / 1000;
        handleInputChange(field, roundedValue);
      }
    }
  };

  const handleCameraCapture = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment'; // Usa câmera traseira
    
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        setFormData(prev => ({ ...prev, fotoEtiqueta: file }));
        
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    
    input.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, fotoEtiqueta: file }));
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    try {
      // Aqui seria a chamada para API
      console.log("Dados do formulário:", formData);
      console.log("Valores calculados:", calculatedValues);
      
      toast({
        title: "Sucesso!",
        description: "Dados de limpeza salvos com sucesso.",
      });

      // Reset form
      setFormData({
        dataLimpeza: new Date().toISOString().split('T')[0],
        nomeSushiman: "",
        pesoSalmaoLimpo: 0,
        pesoOmega: 0,
        pesoSkin: 0,
        pesoBarriga: 0,
        pesoRaspa: 0,
        pesoDesperdicio: 0,
        fotoEtiqueta: null
      });
      setImagePreview(null);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar dados. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Informações Básicas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-5 w-5" />
            <span>Informações Básicas</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="dataLimpeza">Data da Limpeza</Label>
              <Input
                id="dataLimpeza"
                type="date"
                value={formData.dataLimpeza}
                onChange={(e) => handleInputChange("dataLimpeza", e.target.value)}
                required
                className="text-lg p-4"
              />
            </div>
            <div>
              <Label htmlFor="nomeSushiman">Nome do Sushiman</Label>
              <Input
                id="nomeSushiman"
                type="text"
                placeholder="DIGITE O NOME DO SUSHIMAN"
                value={formData.nomeSushiman}
                onChange={(e) => handleInputChange("nomeSushiman", e.target.value)}
                required
                className="text-lg p-4"
                uppercase={true}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pesos */}
      <Card>
        <CardHeader>
          <CardTitle>Pesos (em gramas)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="pesoSalmaoLimpo">Peso Salmão Limpo</Label>
              <Input
                id="pesoSalmaoLimpo"
                type="text"
                inputMode="decimal"
                placeholder="0,000"
                value={formData.pesoSalmaoLimpo.toFixed(3)}
                onChange={(e) => handleWeightInputChange("pesoSalmaoLimpo", e.target.value)}
                required
                className="text-lg p-4"
              />
            </div>
            <div>
              <Label htmlFor="pesoOmega">Peso Ômega</Label>
              <Input
                id="pesoOmega"
                type="text"
                inputMode="decimal"
                placeholder="0,000"
                value={formData.pesoOmega.toFixed(3)}
                onChange={(e) => handleWeightInputChange("pesoOmega", e.target.value)}
                required
                className="text-lg p-4"
              />
            </div>
            <div>
              <Label htmlFor="pesoSkin">Peso Skin</Label>
              <Input
                id="pesoSkin"
                type="text"
                inputMode="decimal"
                placeholder="0,000"
                value={formData.pesoSkin.toFixed(3)}
                onChange={(e) => handleWeightInputChange("pesoSkin", e.target.value)}
                required
                className="text-lg p-4"
              />
            </div>
            <div>
              <Label htmlFor="pesoBarriga">Peso Barriga</Label>
              <Input
                id="pesoBarriga"
                type="text"
                inputMode="decimal"
                placeholder="0,000"
                value={formData.pesoBarriga.toFixed(3)}
                onChange={(e) => handleWeightInputChange("pesoBarriga", e.target.value)}
                required
                className="text-lg p-4"
              />
            </div>
            <div>
              <Label htmlFor="pesoRaspa">Peso Raspa</Label>
              <Input
                id="pesoRaspa"
                type="text"
                inputMode="decimal"
                placeholder="0,000"
                value={formData.pesoRaspa.toFixed(3)}
                onChange={(e) => handleWeightInputChange("pesoRaspa", e.target.value)}
                required
                className="text-lg p-4"
              />
            </div>
            <div>
              <Label htmlFor="pesoDesperdicio" className="text-red-600">Peso Desperdício</Label>
              <Input
                id="pesoDesperdicio"
                type="text"
                inputMode="decimal"
                placeholder="0,000"
                value={formData.pesoDesperdicio.toFixed(3)}
                onChange={(e) => handleWeightInputChange("pesoDesperdicio", e.target.value)}
                required
                className="border-red-200 focus:border-red-400 text-lg p-4"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Valores Calculados */}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Valores Calculados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
              <Label className="text-primary font-medium">Peso Total</Label>
              <div className="text-2xl font-bold text-primary">
                {calculatedValues.pesoTotal.toFixed(3)}g
              </div>
            </div>
            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
              <Label className="text-primary font-medium">% Peixe Limpo</Label>
              <div className="text-2xl font-bold text-primary">
                {calculatedValues.percentualPeixeLimpo.toFixed(2)}%
              </div>
            </div>
            <div className="p-4 bg-muted rounded-lg border border-border">
              <Label className="text-foreground font-medium">% Desperdício</Label>
              <div className="text-2xl font-bold text-foreground">
                {calculatedValues.percentualDesperdicio.toFixed(2)}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload de Foto */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Camera className="h-5 w-5" />
            <span>Foto da Etiqueta</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Botões de Câmera */}
            <div className="grid grid-cols-1 gap-3">
              <Button
                type="button"
                onClick={handleCameraCapture}
                className="w-full h-16 text-lg font-medium bg-primary hover:bg-primary/90"
              >
                <Camera className="h-6 w-6 mr-2" />
                Tirar Foto com Câmera
              </Button>
            </div>

            {/* Area de Upload */}
            <div className="flex items-center justify-center w-full">
              <label htmlFor="fotoEtiqueta" className="flex flex-col items-center justify-center w-full h-64 border-2 border-border border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80 transition-colors">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-12 h-12 mb-4 text-muted-foreground" />
                    <p className="mb-2 text-lg text-muted-foreground text-center">
                      <span className="font-semibold">Clique para fazer upload</span><br/>
                      ou arraste e solte
                    </p>
                    <p className="text-sm text-muted-foreground">PNG, JPG ou JPEG (MAX. 5MB)</p>
                  </div>
                )}
                <input
                  id="fotoEtiqueta"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botão de Salvar */}
      <div className="flex justify-center pb-8">
        <Button type="submit" size="lg" className="w-full h-16 text-lg font-medium bg-primary hover:bg-primary/90">
          <Save className="h-6 w-6 mr-2" />
          Salvar Dados
        </Button>
      </div>
    </form>
  );
}
