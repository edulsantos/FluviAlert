import React from 'react'
import { GraduationCap, Cpu } from 'lucide-react'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'

const About: React.FC = () => {
  const team = [
    { name: 'Adriana Seelig',    role: 'Membro do Projeto', image: '/team/adriana_v2.jpg' },
    { name: 'Carol Mattana',    role: 'Membro do Projeto', image: '/team/carol_v2.jpg',   position: 'object-[center_10%]' },
    { name: 'Eduardo Lourenço', role: 'Membro do Projeto', image: '/team/eduardo.png' },
    { name: 'Gabriel Espanhol', role: 'Membro do Projeto', image: '/team/gabriel.jpg' },
    { name: 'Pietro Bolzan',    role: 'Membro do Projeto', image: '/team/pietro_v3.jpg',  position: 'object-center' },
  ]

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white tracking-tight">Sobre o Projeto</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <Badge variant="primary">Propósito Acadêmico</Badge>
          <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-none lg:leading-[0.9]">
            Ciência a serviço da <span className="text-brand-cyan">segurança.</span>
          </h1>
          <div className="space-y-4 text-brand-muted text-base lg:text-lg font-medium leading-relaxed max-w-xl">
            <p>
              O <span className="text-white font-bold">FluviAlert</span> nasceu nos laboratórios da <span className="text-white font-bold underline decoration-brand-primary underline-offset-4">UFSM - Frederico Westphalen</span> como uma resposta acadêmica e social à recorrência histórica de enchentes na região.
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

      <div className="pt-10">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-3xl font-black text-white tracking-tight underline decoration-brand-primary decoration-4 underline-offset-8">Corpo Técnico</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {team.map((member, i) => (
            <Card key={i} className="group hover:-translate-y-2 transition-all p-0 overflow-hidden border-brand-border/30 hover:border-brand-primary/40">
              {/* Foto real com crop quadrado */}
              <div className="relative w-full aspect-square overflow-hidden bg-brand-sidebar">
                <img
                  src={member.image}
                  alt={member.name}
                  className={`w-full h-full object-cover ${(member as any).position || 'object-top'} group-hover:scale-105 transition-transform duration-700`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-card/60 to-transparent" />
              </div>
              <div className="p-4 text-center">
                <h4 className="text-sm font-black text-white leading-tight">{member.name}</h4>
                <p className="text-[9px] text-brand-muted uppercase tracking-widest font-bold mt-1">{member.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default About
