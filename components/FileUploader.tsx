import React from 'react';
import { UploadIcon } from './icons/UploadIcon';
import { FileAudioIcon } from './icons/FileAudioIcon';

interface FileUploaderProps {
  file: File | null;
  isLoading: boolean;
  error: string | null;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onProcess: () => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ file, isLoading, error, onFileChange, onProcess }) => {
  return (
    <div className="w-full text-center flex flex-col items-center justify-center">
        <label
            htmlFor="audio-upload"
            className="w-full max-w-lg cursor-pointer bg-brand-primary border-2 border-dashed border-brand-border rounded-lg p-8 flex flex-col items-center justify-center hover:bg-gray-800 hover:border-brand-accent transition-colors"
        >
            <UploadIcon className="w-12 h-12 text-brand-text-secondary mb-4" />
            <span className="text-lg font-semibold text-brand-text">파일을 선택하거나 여기에 드래그하세요</span>
            <span className="text-sm text-brand-text-secondary mt-1">음성 및 영상 파일을 지원합니다</span>
            <input id="audio-upload" type="file" accept="audio/*,video/*" className="hidden" onChange={onFileChange} />
        </label>

        {error && <p className="mt-4 text-red-400">{error}</p>}
        
        {file && (
            <div className="mt-6 p-4 bg-brand-primary rounded-md w-full max-w-lg flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <FileAudioIcon className="w-6 h-6 text-brand-accent" />
                    <span className="text-brand-text font-medium truncate">{file.name}</span>
                </div>
            </div>
        )}

        <button
            onClick={onProcess}
            disabled={!file || isLoading}
            className="mt-8 px-8 py-3 bg-brand-accent text-white font-bold rounded-lg shadow-lg hover:bg-brand-accent-hover disabled:bg-brand-border disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100"
        >
            분석 시작하기
        </button>
    </div>
  );
};