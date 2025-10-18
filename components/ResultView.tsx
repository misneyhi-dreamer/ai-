
import React, { useState, useCallback } from 'react';
import type { MeetingAnalysis } from '../types';
import { SpeakerIcon } from './icons/SpeakerIcon';
import { CopyIcon } from './icons/CopyIcon';
import { ResetIcon } from './icons/ResetIcon';
import { CheckIcon } from './icons/CheckIcon';

interface ResultViewProps {
  result: MeetingAnalysis;
  onReset: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ result, onReset }) => {
  const [isCopied, setIsCopied] = useState(false);

  const formatResultForCopy = useCallback(() => {
    let text = "## 회의록\n\n";
    text += result.transcription + "\n\n";
    text += "## 발언자별 요약\n\n";
    result.summary.forEach(s => {
      text += `### ${s.speaker}\n`;
      s.points.forEach(point => {
        text += `- ${point}\n`;
      });
      text += "\n";
    });
    return text;
  }, [result]);

  const handleCopy = useCallback(() => {
    const textToCopy = formatResultForCopy();
    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  }, [formatResultForCopy]);

  return (
    <div className="w-full animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transcription Section */}
        <div className="bg-brand-primary rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-brand-text">회의록</h2>
          <div className="prose prose-invert max-h-96 overflow-y-auto bg-gray-900 p-4 rounded-md border border-brand-border">
            <p className="text-brand-text-secondary whitespace-pre-wrap">{result.transcription}</p>
          </div>
        </div>
        
        {/* Summary Section */}
        <div className="bg-brand-primary rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-brand-text">요점 정리</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {result.summary.map((s, index) => (
              <div key={index} className="p-4 bg-gray-900 rounded-md border border-brand-border">
                <h3 className="flex items-center text-lg font-semibold text-brand-accent mb-2">
                  <SpeakerIcon className="w-5 h-5 mr-2" />
                  {s.speaker}
                </h3>
                <ul className="list-disc list-inside space-y-1 text-brand-text-secondary">
                  {s.points.map((point, pIndex) => (
                    <li key={pIndex}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="mt-8 flex justify-end space-x-4">
        <button
          onClick={handleCopy}
          className="flex items-center px-6 py-2 bg-brand-accent text-white font-semibold rounded-lg shadow-md hover:bg-brand-accent-hover disabled:bg-brand-border transition-colors"
        >
          {isCopied ? <CheckIcon className="w-5 h-5 mr-2" /> : <CopyIcon className="w-5 h-5 mr-2" />}
          {isCopied ? '복사 완료!' : '결과 복사하기'}
        </button>
        <button
          onClick={onReset}
          className="flex items-center px-6 py-2 bg-brand-border text-brand-text font-semibold rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ResetIcon className="w-5 h-5 mr-2" />
          초기화
        </button>
      </div>
    </div>
  );
};
