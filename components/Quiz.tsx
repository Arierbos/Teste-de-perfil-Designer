import React, { useState } from 'react';
import { QUESTIONS } from '../constants';
import { ProfileType } from '../types';
import { Button } from './Button';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

interface QuizProps {
  onComplete: (answers: ProfileType[]) => void;
}

export const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<ProfileType[]>([]);
  const [selectedOption, setSelectedOption] = useState<ProfileType | null>(null);

  const question = QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / QUESTIONS.length) * 100;

  const handleSelect = (tag: ProfileType) => {
    setSelectedOption(tag);
  };

  const handleNext = () => {
    if (!selectedOption) return;

    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedOption;
    setAnswers(newAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      onComplete(newAnswers);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      // Retrieve previous answer to show as selected
      setSelectedOption(answers[currentQuestionIndex - 1]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
          <span>Questão {currentQuestionIndex + 1}</span>
          <span>{QUESTIONS.length} Total</span>
        </div>
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-brand-primary transition-width duration-500 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-10 min-h-[400px] flex flex-col justify-between animate-fade-in">
        
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-8 leading-relaxed">
            {question.title}
          </h2>

          <div className="space-y-4">
            {question.options.map((option, idx) => {
              const isSelected = selectedOption === option.tag;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(option.tag)}
                  className={`w-full text-left p-4 md:p-5 rounded-xl border-2 transition-all duration-200 flex items-start gap-4 group
                    ${isSelected 
                      ? 'border-brand-primary bg-indigo-50/50 shadow-sm' 
                      : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  <div className={`mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors
                    ${isSelected ? 'border-brand-primary bg-brand-primary text-white' : 'border-gray-300 group-hover:border-gray-400'}`}>
                    {isSelected && <CheckCircle2 size={14} />}
                  </div>
                  <span className={`text-base md:text-lg ${isSelected ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                    {option.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between gap-4">
          <Button 
            variant="tertiary" 
            onClick={handleBack} 
            disabled={currentQuestionIndex === 0}
            className={currentQuestionIndex === 0 ? 'invisible' : ''}
          >
            <ArrowLeft size={20} />
            Voltar
          </Button>
          
          <Button 
            onClick={handleNext} 
            disabled={!selectedOption}
            className="px-8"
          >
            {currentQuestionIndex === QUESTIONS.length - 1 ? 'Finalizar' : 'Confirmar'}
          </Button>
        </div>

      </div>
    </div>
  );
};