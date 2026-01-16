import { useState } from 'react';
import { VideoUploader } from './components/VideoUploader';
import { AnalysisResults } from './components/AnalysisResults';

export interface AnalysisResult {
  score: number;
  confidence: number;
  explanation: string;
  indicators: {
    label: string;
    value: string;
    risk: 'low' | 'medium' | 'high';
  }[];
}

export default function App() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);

  const handleVideoUpload = (file: File) => {
    setVideoFile(file);
    setResults(null);
  };

  const handleAnalyze = async () => {
    if (!videoFile) return;

    setIsAnalyzing(true);
    
    // Simulate analysis processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock analysis results
    const mockScore = Math.floor(Math.random() * 100);
    const isLikelyDeepfake = mockScore > 60;

    const mockResult: AnalysisResult = {
      score: mockScore,
      confidence: Math.floor(Math.random() * 20) + 80,
      explanation: isLikelyDeepfake 
        ? "Our analysis detected several anomalies consistent with AI-generated or manipulated content. Facial features show inconsistent lighting patterns and unnatural micro-expressions. Audio analysis reveals slight misalignment with lip movements."
        : "The video appears to be authentic. Facial features show consistent lighting and natural expressions. No significant manipulation artifacts were detected. Audio synchronization is within normal parameters.",
      indicators: [
        {
          label: "Facial Consistency",
          value: isLikelyDeepfake ? "Irregular" : "Normal",
          risk: isLikelyDeepfake ? "high" : "low"
        },
        {
          label: "Lighting Artifacts",
          value: isLikelyDeepfake ? "Detected" : "None detected",
          risk: isLikelyDeepfake ? "medium" : "low"
        },
        {
          label: "Audio-Visual Sync",
          value: isLikelyDeepfake ? "Misaligned" : "Synchronized",
          risk: isLikelyDeepfake ? "high" : "low"
        },
        {
          label: "Temporal Coherence",
          value: isLikelyDeepfake ? "Inconsistent" : "Consistent",
          risk: isLikelyDeepfake ? "medium" : "low"
        }
      ]
    };

    setResults(mockResult);
    setIsAnalyzing(false);
  };

  const handleReset = () => {
    setVideoFile(null);
    setResults(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Deepfake Detector
          </h1>
          <p className="text-slate-300 text-lg">
            Upload a video to analyze for AI-generated or manipulated content
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          {!results ? (
            <VideoUploader
              videoFile={videoFile}
              onVideoUpload={handleVideoUpload}
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
            />
          ) : (
            <AnalysisResults results={results} onReset={handleReset} />
          )}
        </div>

        <footer className="text-center mt-16 text-slate-400 text-sm">
          <p>This is a demonstration tool using mock analysis. For production use, integrate with a real deepfake detection API.</p>
        </footer>
      </div>
    </div>
  );
}
