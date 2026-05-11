import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import { Mail, Lock, User, UserPlus, ArrowLeft } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await registerUser({ name, email, password });
      // Após o registro, redirecionar para o login para obter o Token JWT
      navigate('/login', { state: { message: 'Conta criada com sucesso! Faça login para continuar.' } });
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background elements for premium look */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-cyan/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-primary/5 rounded-full blur-[120px]"></div>
      
      <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-700 relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="mb-4">
            <img src="/favicon.png" alt="FluviAlert Logo" className="w-20 h-20 rounded-2xl shadow-lg border border-brand-primary/20" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-1">FluviAlert</h1>
          <p className="text-brand-muted font-semibold uppercase tracking-wider text-xs">Intelligence System</p>
        </div>

        <Card className="p-8 bg-brand-card/50 border-brand-border backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-2 mb-8">
            <button 
              onClick={() => navigate('/login')}
              className="p-2 hover:bg-brand-border rounded-full text-brand-muted transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Solicitar Credenciais</h2>
              <p className="text-brand-muted text-sm mt-1 font-medium">Cadastre-se para acessar o monitoramento</p>
            </div>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <Input
              label="Nome Completo"
              type="text"
              placeholder="Ex: João Silva"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={<User size={18} />}
              required
            />
            <Input
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail size={18} />}
              required
            />
            <Input
              label="Senha"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock size={18} />}
              required
            />
            <Input
              label="Confirmar Senha"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={<Lock size={18} />}
              required
            />

            {error && (
              <div className="p-3 bg-brand-critical/10 border border-brand-critical/20 rounded-lg text-brand-critical text-xs font-bold flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-critical animate-pulse" />
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full py-4 text-base font-bold shadow-xl shadow-brand-primary/20 hover:scale-[1.02] transition-transform"
              disabled={loading}
              icon={loading ? null : <UserPlus size={18} />}
            >
              {loading ? 'Criando Conta...' : 'Criar minha conta'}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-brand-border text-center">
            <p className="text-xs text-brand-muted font-medium">
              Já possui acesso? <Link 
                to="/login"
                className="text-brand-primary hover:underline font-bold"
              >Fazer Login</Link>
            </p>
          </div>
        </Card>
        
        <p className="mt-8 text-center text-xs text-brand-muted font-semibold uppercase tracking-wider">
          © 2026 FluviAlert Intelligence • UFSM
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
