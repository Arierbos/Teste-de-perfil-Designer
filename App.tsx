import React, { useState } from 'react';
import { LeadGate } from './components/LeadGate';
import { Quiz } from './components/Quiz';
import { Result } from './components/Result';
import { Button } from './components/Button';
import { UserLead, Step, ProfileType } from './types';
import { ArrowRight, Compass } from 'lucide-react';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>('LEAD_GATE');
  const [userLead, setUserLead] = useState<UserLead | null>(null);
  const [answers, setAnswers] = useState<ProfileType[]>([]);

  const handleUnlock = (lead: UserLead) => {
    setUserLead(lead);
    setCurrentStep('INTRO');
    // Here you would trigger the Webhook/Save logic for the lead
    console.log("Lead captured:", lead);
  };

  const startQuiz = () => {
    setCurrentStep('QUIZ');
  };

  const handleQuizComplete = (finalAnswers: ProfileType[]) => {
    setAnswers(finalAnswers);
    setCurrentStep('RESULT');
    // Here you would save the session and answers to DB/Webhook
    console.log("Quiz completed:", finalAnswers);
  };

  const renderContent = () => {
    switch (currentStep) {
      case 'LEAD_GATE':
        return <LeadGate onUnlock={handleUnlock} />;
      
      case 'INTRO':
        return (
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-2xl mx-auto text-center animate-fade-in border border-gray-100">
            <div className="w-16 h-16 bg-indigo-100 text-brand-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Compass size={32} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Como funciona?</h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Você responderá a <strong>10 perguntas rápidas</strong> sobre como você pensa e age em projetos de design.
              <br/><br/>
              Não existe resposta certa ou errada. Escolha a opção que mais se aproxima da sua realidade atual, e não do que você gostaria de ser.
            </p>
            <Button onClick={startQuiz} className="px-10 text-lg">
              Começar Agora <ArrowRight size={20} />
            </Button>
          </div>
        );

      case 'QUIZ':
        return <Quiz onComplete={handleQuizComplete} />;

      case 'RESULT':
        return userLead ? <Result answers={answers} userName={userLead.name} /> : null;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-brand-surface text-gray-800 font-sans selection:bg-brand-primary selection:text-white">
      <header className="p-6 md:p-8 flex justify-center">
        {currentStep !== 'RESULT' && (
           <div className="text-sm font-bold tracking-widest uppercase text-brand-primary opacity-80">
             Caminho do Designer
           </div>
        )}
      </header>

      <main className="container mx-auto px-4 py-4 md:py-8 flex flex-col items-center justify-center min-h-[80vh]">
        {renderContent()}
      </main>

      <footer className="text-center py-8 text-gray-400 text-xs">
        <p>© {new Date().getFullYear()} Caminho do Designer. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default App;