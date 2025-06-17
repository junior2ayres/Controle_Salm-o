
import { SalmaoForm } from "@/components/SalmaoForm";

export default function Preenchimento() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Preenchimento</h1>
        <p className="text-muted-foreground">
          Registre os dados de limpeza do salmão
        </p>
      </div>

      <SalmaoForm />
    </div>
  );
}
