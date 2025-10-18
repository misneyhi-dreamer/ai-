import React, { useState, useEffect } from 'react';
import type { MeetingAnalysis } from './types';
import { analyzeMeetingAudio } from './services/geminiService';
import { FileUploader } from './components/FileUploader';
import { ResultView } from './components/ResultView';
import { Spinner } from './components/Spinner';

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<MeetingAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "AI 회의록 요약기 | 음성 및 영상 파일 자동 정리";
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
        if (selectedFile.type.startsWith('audio/') || selectedFile.type.startsWith('video/')) {
            setFile(selectedFile);
            setResult(null);
            setError(null);
        } else {
            setError('지원되는 오디오 또는 비디오 파일을 업로드해주세요.');
            setFile(null);
        }
    }
  };

  const handleProcess = async () => {
    if (!file) return;
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const analysis = await analyzeMeetingAudio(file);
      if (analysis) {
        setResult(analysis);
      } else {
        throw new Error('분석 결과가 비어있습니다.');
      }
    } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.';
        setError(`분석 중 오류가 발생했습니다: ${errorMessage}`);
        console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setError(null);
    setIsLoading(false);
    const fileInput = document.getElementById('audio-upload') as HTMLInputElement;
    if (fileInput) {
        fileInput.value = '';
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <Spinner />;
    }
    if (result) {
      return <ResultView result={result} onReset={handleReset} />;
    }
    return (
      <FileUploader
        file={file}
        isLoading={isLoading}
        error={error}
        onFileChange={handleFileChange}
        onProcess={handleProcess}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <main className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-brand-text mb-2">AI 회의록 요약기</h1>
            <p className="text-lg text-brand-text-secondary">음성 및 영상 파일을 업로드하여 회의 내용을 자동으로 정리하세요.</p>
        </header>
        <div className="bg-brand-secondary rounded-xl shadow-2xl p-6 sm:p-8 transition-all duration-300 min-h-[300px] flex items-center justify-center">
            {renderContent()}
        </div>
        <footer className="text-center mt-8 text-brand-text-secondary text-sm">
            <p>Powered by Google Gemini</p>
            <p className="mt-2">Created by misneyhi@gmail.com</p>
        </footer>
      </main>
    </div>
  );
};

export default App;