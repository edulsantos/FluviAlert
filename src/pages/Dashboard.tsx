import { mockCities } from '../mocks/cities'
import SafetyGauge from '../components/dashboard/SafetyGauge'
import RiskTable from '../components/dashboard/RiskTable'
import MetricCard from '../components/dashboard/MetricCard'
import Button from '../components/ui/Button'
import { Waves, Zap, BarChart3, Download, ExternalLink } from 'lucide-react'

const Dashboard: React.FC = () => {
  const tableCities = mockCities.slice(0, 5)

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-12 gap-8 h-80">
        {/* Hero Card */}
        <div className="col-span-8 relative rounded-2xl overflow-hidden group">
          <img 
            src="/hero.png" 
            alt="Flood monitoring" 
            className="absolute inset-0 w-full h-full object-cover brightness-50 group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/40 to-transparent p-10 flex flex-col justify-end">
            <span className="bg-brand-safe/20 text-brand-safe border border-brand-safe px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest w-fit mb-4">
              Safe Horizon
            </span>
            <h2 className="text-5xl font-black text-white tracking-tighter mb-4 max-w-md">
              Monitoramento Estável
            </h2>
            <p className="text-brand-muted text-lg max-w-xl">
              As condições hidrológicas atuais permanecem dentro dos parâmetros de segurança em 95% das zonas monitoradas.
            </p>
          </div>
        </div>

        {/* Safety Gauge */}
        <div className="col-span-4">
          <SafetyGauge percentage={92} trend="+1.2% desde ontem" />
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <h3 className="text-2xl font-black tracking-tight text-white">Projeção de Risco (15 Dias)</h3>
          <p className="text-sm text-brand-muted font-medium mt-1">Análise preditiva baseada em modelos meteorológicos e satélite.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" size="sm" icon={<Download size={16} />}>Exportar PDF</Button>
          <Button variant="primary" size="sm" icon={<ExternalLink size={16} />}>Ver Detalhes</Button>
        </div>
      </div>

      <div className="brand-card p-2">
        <RiskTable cities={tableCities} />
      </div>

      <div className="grid grid-cols-3 gap-8">
        <MetricCard 
          label="Estações Ativas" 
          value="1.248" 
          icon={<Waves size={24} />} 
        />
        <MetricCard 
          label="Latência de Dados" 
          value="0.4s" 
          icon={<Zap size={24} />} 
        />
        <MetricCard 
          label="Previsões Processadas" 
          value="24.5k" 
          unit="/dia"
          icon={<BarChart3 size={24} />} 
        />
      </div>

      <footer className="pt-8 border-t border-brand-border flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted">
        <div>© 2026 FluviAlert Intelligence Systems</div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-brand-text transition-colors">Privacidade</a>
          <a href="#" className="hover:text-brand-text transition-colors">Termos</a>
          <a href="#" className="hover:text-brand-text transition-colors">API</a>
        </div>
      </footer>
    </div>
  )
}

export default Dashboard
