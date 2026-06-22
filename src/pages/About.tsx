import React from 'react'
import { GraduationCap, Cpu, Droplets, BarChart3, Shield, Satellite, ArrowRight, Waves, MapPin, AlertTriangle } from 'lucide-react'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'

interface TeamMember {
  name: string
  role: string
  image: string
  position?: string
}

const About: React.FC = () => {
  const team: TeamMember[] = [
    { name: 'Adriana Seelig',    role: 'Membro do Projeto', image: '/team/adriana_v2.jpg' },
    { name: 'Carol Mattana',    role: 'Membro do Projeto', image: '/team/carol_v2.jpg',   position: 'object-[center_10%]' },
    { name: 'Eduardo Lourenço', role: 'Membro do Projeto', image: '/team/eduardo.png' },
    { name: 'Gabriel Espanhol', role: 'Membro do Projeto', image: '/team/gabriel.jpg' },
    { name: 'Pietro Bolzan',    role: 'Membro do Projeto', image: '/team/pietro_v3.jpg',  position: 'object-center' },
  ]

  const pipelineSteps = [
    {
      icon: <Satellite size={28} />,
      title: 'Coleta de Dados',
      description: 'Consumimos dados do modelo hidrológico global GloFAS (Global Flood Awareness System), operado pelo Copernicus/ECMWF, via a API aberta Open-Meteo.',
      detail: 'Os dados incluem vazão média e vazão máxima do rio para cada dia dos próximos 7 dias.',
    },
    {
      icon: <Droplets size={28} />,
      title: 'Vazão do Rio (não chuva!)',
      description: 'A vazão fluvial (river discharge) mede o volume de água que passa por uma seção do rio a cada segundo, em m³/s.',
      detail: 'Diferente da precipitação (chuva), a vazão integra toda a água que a bacia recebe — incluindo chuvas a montante, degelo e lençol freático.',
    },
    {
      icon: <MapPin size={28} />,
      title: 'Thresholds por Bacia',
      description: 'Cada estado brasileiro pertence a uma bacia hidrográfica com características próprias. Usamos limites calibrados por bacia para classificar o risco.',
      detail: 'Ex: na Bacia Amazônica, 150.000 m³/s é moderado; na Bacia Sul (RS, SC), 500 m³/s já é moderado.',
    },
    {
      icon: <Shield size={28} />,
      title: 'Classificação de Risco',
      description: 'Comparamos a vazão máxima prevista com os thresholds da bacia local e classificamos como: Baixo, Moderado ou Alto.',
      detail: 'O risco "Alto" indica que o volume de água no rio pode ultrapassar os limites seguros, com potencial de transbordamento.',
    },
  ]

  const basins = [
    { name: 'Amazônica', states: 'AM, PA, AP, RR, AC, RO', moderate: '150.000', high: '200.000', color: 'text-emerald-400' },
    { name: 'Tocantins-Araguaia', states: 'TO', moderate: '12.000', high: '18.000', color: 'text-teal-400' },
    { name: 'Paraná', states: 'SP, PR, GO, DF', moderate: '8.000', high: '12.000', color: 'text-blue-400' },
    { name: 'São Francisco', states: 'MG, BA, PE, AL, SE', moderate: '2.000', high: '3.500', color: 'text-indigo-400' },
    { name: 'Paraguai', states: 'MT, MS', moderate: '2.000', high: '3.000', color: 'text-violet-400' },
    { name: 'Sul', states: 'RS, SC', moderate: '500', high: '800', color: 'text-cyan-400' },
    { name: 'Atlântico Sudeste', states: 'RJ, ES', moderate: '400', high: '700', color: 'text-sky-400' },
    { name: 'Nordeste', states: 'CE, RN, PB, PI, MA', moderate: '150', high: '300', color: 'text-amber-400' },
  ]

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-brand-text tracking-tight">Sobre o Projeto</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <Badge variant="primary">Propósito Acadêmico</Badge>
          <h1 className="text-4xl lg:text-5xl font-black text-brand-text tracking-tighter leading-tight">
            Ciência a serviço da <span className="text-brand-cyan">segurança.</span>
          </h1>
          <div className="space-y-4 text-brand-muted text-sm lg:text-base font-medium leading-relaxed max-w-xl">
            <p>
              O <span className="text-brand-text font-bold">FluviAlert</span> nasceu nos laboratórios da <span className="text-brand-text font-bold underline decoration-brand-primary underline-offset-4">UFSM - Frederico Westphalen</span> como uma resposta acadêmica e social à recorrência histórica de enchentes na região.
            </p>
            <p>
              O projeto visa democratizar o acesso a sistemas de monitoramento fluvial, unindo tecnologia de ponta e baixo custo para salvaguardar vidas e patrimônios.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 pt-4">
            <Badge className="py-2 px-4 flex items-center gap-2 bg-brand-sidebar border-brand-border text-xs">
              <GraduationCap size={16} className="text-brand-primary" /> UFSM - FW
            </Badge>
            <Badge className="py-2 px-4 flex items-center gap-2 bg-brand-sidebar border-brand-border text-xs">
              <Cpu size={16} className="text-brand-cyan" /> Engenharia e Inovação
            </Badge>
          </div>
        </div>
        <div className="lg:col-span-5 relative group hidden lg:block">
          <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary to-brand-cyan rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <div className="relative rounded-2xl overflow-hidden border border-brand-border/50 aspect-[4/3] bg-brand-card">
            <img 
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop" 
              alt="Lab" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-brand-bg/20"></div>
          </div>
        </div>
      </div>

      {/* ═══════════════════ COMO FUNCIONA ═══════════════════ */}
      <div className="pt-10">
        <div className="flex items-center gap-4 mb-4">
          <h3 className="text-2xl font-bold text-brand-text tracking-tight underline decoration-brand-cyan decoration-3 underline-offset-8">
            Como Funciona
          </h3>
        </div>
        <p className="text-sm text-brand-muted font-medium max-w-3xl mb-10">
          Entenda passo a passo como o FluviAlert coleta dados, analisa a vazão dos rios e gera previsões de risco de enchente para as cidades brasileiras.
        </p>

        {/* Pipeline Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {pipelineSteps.map((step, i) => (
            <Card key={i} className="group relative p-6 hover:-translate-y-2 transition-all border-brand-border/30 hover:border-brand-primary/40 overflow-hidden">
              <div className="absolute top-0 right-0 text-[80px] font-black text-brand-border/10 leading-none select-none">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="relative z-10">
                <div className="p-3 bg-brand-primary/10 rounded-xl text-brand-primary w-fit mb-4 group-hover:bg-brand-primary/20 transition-colors">
                  {step.icon}
                </div>
                <h4 className="text-sm font-bold text-brand-text uppercase tracking-wide mb-2">{step.title}</h4>
                <p className="text-sm text-brand-muted leading-relaxed mb-3">{step.description}</p>
                <p className="text-xs text-brand-cyan/80 leading-relaxed font-medium">{step.detail}</p>
              </div>
              {i < pipelineSteps.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-brand-border">
                  <ArrowRight size={20} />
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Explicação de Vazão vs Chuva */}
        <Card className="p-6 mb-12 bg-gradient-to-br from-brand-card to-brand-bg border-brand-cyan/20">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-brand-cyan/10 rounded-xl text-brand-cyan shrink-0">
              <Waves size={28} />
            </div>
            <div className="space-y-3">
              <h4 className="text-base font-bold text-brand-text">
                Vazão do Rio ≠ Volume de Chuva
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-brand-cyan uppercase tracking-wider">Vazão Fluvial (o que medimos)</p>
                  <p className="text-sm text-brand-muted leading-relaxed">
                    É o <span className="text-brand-text font-semibold">volume de água que passa no rio</span> por segundo (m³/s). 
                    Ela integra chuvas acumuladas em toda a bacia, degelo, contribuição do lençol freático e 
                    a resposta do solo à precipitação. Uma chuva forte a 200 km de distância pode elevar a vazão dias depois.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider">Precipitação (o que NÃO medimos)</p>
                  <p className="text-sm text-brand-muted leading-relaxed">
                    A precipitação mede apenas a <span className="text-brand-text font-semibold">chuva local</span> em milímetros. 
                    Mesmo sem chuva na cidade, o rio pode subir devido a chuvas a montante. 
                    Por isso, a vazão é um indicador muito mais preciso do risco real de enchente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabela de Bacias */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-brand-primary/10 rounded-lg text-brand-primary">
              <BarChart3 size={20} />
            </div>
            <div>
              <h4 className="text-base font-bold text-brand-text">Thresholds por Bacia Hidrográfica</h4>
              <p className="text-sm text-brand-muted font-medium">Cada bacia possui limites diferentes de vazão para classificar o risco</p>
            </div>
          </div>
          <Card className="p-0 overflow-hidden border-brand-border/30">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs uppercase tracking-wider text-brand-muted font-semibold border-b border-brand-border bg-brand-sidebar/50">
                    <th className="py-3 px-5">Bacia</th>
                    <th className="py-3 px-5">Estados</th>
                    <th className="py-3 px-5 text-center">
                      <span className="text-brand-warning">Moderado</span> (m³/s)
                    </th>
                    <th className="py-3 px-5 text-center">
                      <span className="text-brand-critical">Alto</span> (m³/s)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/30">
                  {basins.map((basin, i) => (
                    <tr key={i} className="hover:bg-brand-card/50 transition-colors">
                      <td className="py-3 px-5">
                        <span className={`text-sm font-bold ${basin.color}`}>{basin.name}</span>
                      </td>
                      <td className="py-3 px-5">
                        <span className="text-xs text-brand-muted font-medium">{basin.states}</span>
                      </td>
                      <td className="py-3 px-5 text-center">
                        <span className="text-sm font-bold text-brand-warning">&gt; {basin.moderate}</span>
                      </td>
                      <td className="py-3 px-5 text-center">
                        <span className="text-sm font-bold text-brand-critical">&gt; {basin.high}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Nota sobre dados */}
        <Card className="p-5 mb-6 border-brand-border/30 bg-brand-sidebar/30">
          <div className="flex items-start gap-3">
            <AlertTriangle size={18} className="text-brand-warning mt-0.5 shrink-0" />
            <div className="space-y-1">
              <p className="text-xs font-semibold text-brand-text uppercase tracking-wider">Nota sobre precisão</p>
              <p className="text-sm text-brand-muted leading-relaxed">
                As previsões são geradas pelo modelo global GloFAS/ECMWF com resolução de ~10 km. 
                Esses dados servem como <span className="text-brand-text font-semibold">indicativo de tendência</span> e não substituem 
                alertas oficiais da Defesa Civil ou ANA. Para decisões de evacuação, sempre consulte as autoridades competentes.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* ═══════════════════ CORPO TÉCNICO ═══════════════════ */}
      <div className="pt-10">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-2xl font-bold text-brand-text tracking-tight underline decoration-brand-primary decoration-3 underline-offset-8">Corpo Técnico</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {team.map((member, i) => (
            <Card key={i} className="group hover:-translate-y-2 transition-all p-0 overflow-hidden border-brand-border/30 hover:border-brand-primary/40">
              {/* Foto real com crop quadrado */}
              <div className="relative w-full aspect-square overflow-hidden bg-brand-sidebar">
                <img
                  src={member.image}
                  alt={member.name}
                  className={`w-full h-full object-cover ${member.position || 'object-top'} group-hover:scale-105 transition-transform duration-700`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-card/60 to-transparent" />
              </div>
              <div className="p-4 text-center">
                <h4 className="text-sm font-bold text-brand-text leading-tight">{member.name}</h4>
                <p className="text-[10px] text-brand-muted uppercase tracking-wider font-semibold mt-1">{member.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default About
