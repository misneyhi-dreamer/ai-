
import React from 'react';

export const Spinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-brand-accent"></div>
      <h2 className="mt-6 text-xl font-semibold text-brand-text">오디오 분석 중...</h2>
      <p className="mt-2 text-brand-text-secondary">파일 크기에 따라 몇 분 정도 소요될 수 있습니다.</p>
    </div>
  );
};
