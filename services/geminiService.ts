
import { GoogleGenAI, Type } from "@google/genai";
import type { MeetingAnalysis } from '../types';

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(',')[1]);
    };
    reader.onerror = (error) => reject(error);
  });
};

export const analyzeMeetingAudio = async (audioFile: File): Promise<MeetingAnalysis> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const base64Audio = await fileToBase64(audioFile);

  const audioPart = {
    inlineData: {
      mimeType: audioFile.type,
      data: base64Audio,
    },
  };
  
  const prompt = `You are an expert meeting analyst. Please process the provided audio file of a meeting recording.
1. Transcribe the entire meeting into Korean text.
2. Analyze the transcription and identify each speaker (e.g., '발언자 A', '김팀장').
3. For each speaker, create a bulleted list summarizing their key discussion points and decisions.
4. Format the final output as a single JSON object that strictly adheres to the provided schema. Do not include any markdown formatting like \`\`\`json.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-pro',
    contents: [{ parts: [audioPart, {text: prompt}] }],
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          transcription: {
            type: Type.STRING,
            description: 'The full transcription of the meeting in Korean.'
          },
          summary: {
            type: Type.ARRAY,
            description: 'An array of objects, each representing a speaker and their key points.',
            items: {
              type: Type.OBJECT,
              properties: {
                speaker: {
                  type: Type.STRING,
                  description: 'The name or identifier of the speaker (e.g., "발언자 A", "김팀장").'
                },
                points: {
                  type: Type.ARRAY,
                  description: 'A list of key points made by the speaker.',
                  items: {
                    type: Type.STRING,
                  }
                }
              },
              required: ['speaker', 'points']
            }
          }
        },
        required: ['transcription', 'summary']
      }
    }
  });

  const jsonText = response.text.trim();
  return JSON.parse(jsonText) as MeetingAnalysis;
};
