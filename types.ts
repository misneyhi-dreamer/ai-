
export interface SpeakerSummary {
  speaker: string;
  points: string[];
}

export interface MeetingAnalysis {
  transcription: string;
  summary: SpeakerSummary[];
}
