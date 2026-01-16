import React, { useMemo } from 'react';
import { ProfileType, ResultMode, QuizSession } from '../types';
import { PROFILE_DESCRIPTIONS } from '../constants';
import { Button } from './Button';
import { Share2, Download, ExternalLink, Zap, ImageOff } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ResultProps {
  answers: ProfileType[];
  userName: string;
}

export const Result: React.FC<ResultProps> = ({ answers, userName }) => {
  
  const resultData: QuizSession = useMemo(() => {
    const counts = { [ProfileType.EXPLORADOR]: 0, [ProfileType.ARTISTICO]: 0, [ProfileType.ANALITICO]: 0 };
    answers.forEach(a => counts[a]++);

    const scores = [
      { type: ProfileType.EXPLORADOR, score: counts[ProfileType.EXPLORADOR] },
      { type: ProfileType.ARTISTICO, score: counts[ProfileType.ARTISTICO] },
      { type: ProfileType.ANALITICO, score: counts[ProfileType.ANALITICO] },
    ].sort((a, b) => b.score - a.score);

    const maxScore = scores[0].score;
    const minScore = scores[2].score;
    const secondScore = scores[1].score;

    let mode = ResultMode.SINGLE;
    let dominant = scores[0].type;
    let support = scores[1].type;

    // Check Balanced Hybrid (Max - Min <= 1)
    if ((maxScore - minScore) <= 1) {
      mode = ResultMode.HYBRID_BALANCED;
      // In balanced mode, dominant is just the highest raw number, but conceptually they are equal
    } 
    // Check Tie Hybrid (Top 2 are equal)
    else if (maxScore === secondScore) {
      mode = ResultMode.HYBRID_TIE;
      // Dominant and Support are the top two
    }

    return {
      scoreE: counts[ProfileType.EXPLORADOR],
      scoreA: counts[ProfileType.ARTISTICO],
      scoreN: counts[ProfileType.ANALITICO],
      resultDominant: dominant,
      resultSupport: scores[2].type === support ? null : support, // If support is actually the last one (shouldn't happen in logic but for safety)
      resultMode: mode
    };
  }, [answers]);

  const dominantProfile = PROFILE_DESCRIPTIONS[resultData.resultDominant];
  const supportProfile = resultData.resultSupport ? PROFILE_DESCRIPTIONS[resultData.resultSupport] : null;

  // Chart Data
  const chartData = [
    { name: 'Explorador', value: resultData.scoreE, color: '#ca8a04' }, // yellow-600
    { name: 'Artístico', value: resultData.scoreA, color: '#db2777' }, // pink-600
    { name: 'Analítico', value: resultData.scoreN, color: '#2563eb' }, // blue-600
  ];

  const getResultTitle = () => {
    if (resultData.resultMode === ResultMode.HYBRID_BALANCED) return "Híbrido Equilibrado";
    if (resultData.resultMode === ResultMode.HYBRID_TIE) return "Híbrido Duplo";
    return `Perfil ${dominantProfile.title}`;
  };

  const getResultDescription = () => {
    if (resultData.resultMode === ResultMode.HYBRID_BALANCED) {
      return "Você navega bem entre os três mundos! Sua força está na adaptabilidade e na visão holística do processo de design.";
    }
    if (resultData.resultMode === ResultMode.HYBRID_TIE) {
      return `Você possui uma combinação poderosa entre ${dominantProfile.title} e ${supportProfile?.title}.`;
    }
    return dominantProfile.description;
  };

  return (
    <div className="w-full max-w-4xl mx-auto pb-12 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-gray-500 uppercase tracking-widest text-xs font-bold mb-2">Resultado Final</p>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          Olá, {userName.split(' ')[0]}!
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Seu perfil no design é: <strong className="text-brand-primary text-2xl block mt-2">{getResultTitle()}</strong>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Dominant Card */}
        <div className={`rounded-3xl p-8 border-2 shadow-sm ${dominantProfile.bgColor} ${dominantProfile.borderColor}`}>
          
          {/* Profile Image */}
          <div className="w-full aspect-[4/3] mb-6 rounded-2xl overflow-hidden shadow-md bg-white relative">
            <img 
              src={dominantProfile.imageSrc} 
              alt={`Ilustração do perfil ${dominantProfile.title}`} 
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="hidden absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
              <div className="text-center p-4">
                <ImageOff className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <span className="text-sm">Imagem indisponível</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <Zap className={`w-6 h-6 ${dominantProfile.color}`} />
            <h3 className={`text-xl font-bold ${dominantProfile.color}`}>Dominante: {dominantProfile.title}</h3>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6">
            {getResultDescription()}
          </p>
          {resultData.resultMode !== ResultMode.HYBRID_BALANCED && resultData.resultMode !== ResultMode.HYBRID_TIE && (
             <div className="inline-block px-4 py-2 bg-white rounded-full text-sm font-semibold shadow-sm text-gray-800">
               Sua superpotência
             </div>
          )}
        </div>

        {/* Chart / Stats */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg flex flex-col items-center justify-center">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Seu DNA Criativo</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4 w-full">
            {chartData.map((d) => (
              <div key={d.name} className="flex flex-col items-center">
                <span className="text-2xl font-bold" style={{ color: d.color }}>{d.value}</span>
                <span className="text-xs text-gray-500 uppercase">{d.name.charAt(0)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary/Support Info if exists */}
      {supportProfile && resultData.resultMode !== ResultMode.HYBRID_BALANCED && (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-10 mx-auto max-w-2xl">
          <h4 className="text-md font-bold text-gray-800 mb-2 flex items-center gap-2">
            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">Suporte</span>
            {supportProfile.title}
          </h4>
          <p className="text-sm text-gray-600">
            {supportProfile.description}
          </p>
        </div>
      )}

      {/* CTAs */}
      <div className="flex flex-col gap-4 max-w-md mx-auto">
        <Button onClick={() => alert("Funcionalidade de recomendações em breve!")} fullWidth>
          <Download size={18} />
          Receber recomendações do meu perfil
        </Button>
        
        <Button variant="secondary" onClick={() => window.open('https://sobreiraux.com', '_blank')} fullWidth>
          <ExternalLink size={18} />
          Conhecer a Mentoria SobreiraUX
        </Button>

        <Button variant="tertiary" onClick={() => {
          if (navigator.share) {
            navigator.share({
              title: 'Meu Perfil de Design',
              text: `Meu perfil no Caminho do Designer é ${getResultTitle()}! Descubra o seu.`,
              url: window.location.href
            }).catch(() => {});
          } else {
             alert('Link copiado para a área de transferência!');
          }
        }} fullWidth>
          <Share2 size={18} />
          Compartilhar resultado
        </Button>
      </div>
    </div>
  );
};