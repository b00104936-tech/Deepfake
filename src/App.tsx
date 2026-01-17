import { useState } from 'react';
import { Header } from './components/Header';
import { UploadCard } from './components/UploadCard';
import { ResultsPanel } from './components/ResultsPanel';
import { TechnicalSidebar } from './components/TechnicalSidebar';

export interface AnalysisResult {
  score: number;
  confidence: number;
  verdict: 'authentic' | 'suspicious' | 'synthetic';
  technicalFeasibility: number;
  aiProbability: number;
  detectionMetrics: {
    label: string;
    score: number;
    status: 'pass' | 'warning' | 'fail';
    detail: string;
  }[];
  metadata: {
    framesAnalyzed: number;
    processingTime: number;
    modelVersion: string;
    timestamp: string;
  };
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
    
    // Simulate sophisticated analysis
    await new Promise(resolve => setTimeout(resolve, 4000));

    const aiProbability = Math.floor(Math.random() * 100);
    const technicalFeasibility = Math.floor(Math.random() * 100);
    
    let verdict: 'authentic' | 'suspicious' | 'synthetic';
    if (aiProbability >= 75) verdict = 'synthetic';
    else if (aiProbability >= 40) verdict = 'suspicious';
    else verdict = 'authentic';

    const mockResult: AnalysisResult = {
      score: aiProbability,
      confidence: Math.floor(Math.random() * 15) + 85,
      verdict,
      technicalFeasibility,
      aiProbability,
      detectionMetrics: [
        {
          label: 'Facial Biometric Coherence',
          score: verdict === 'synthetic' ? 34 : 92,
          status: verdict === 'synthetic' ? 'fail' : 'pass',
          detail: verdict === 'synthetic' 
            ? 'Inconsistent facial landmark positioning across temporal sequences. Deviation: -2.8σ from baseline.'
            : 'Facial landmarks demonstrate natural variance and temporal consistency within acceptable parameters.'
        },
        {
          label: 'Frequency Domain Analysis',
          score: verdict === 'synthetic' ? 41 : 87,
          status: verdict === 'synthetic' ? 'fail' : 'pass',
          detail: verdict === 'synthetic'
            ? 'FFT analysis reveals upsampling artifacts characteristic of GAN-based synthesis (StyleGAN2 fingerprint detected).'
            : 'Frequency spectrum analysis shows organic noise distribution without synthetic generation markers.'
        },
        {
          label: 'Audio-Visual Synchronization',
          score: verdict === 'synthetic' ? 58 : 94,
          status: verdict === 'synthetic' ? 'warning' : 'pass',
          detail: verdict === 'synthetic'
            ? 'Phoneme-viseme correlation: 0.67 (threshold: 0.85). Audio overlay detected with 142ms average lag.'
            : 'Lip-sync correlation score: 0.96. Natural audio-visual alignment confirmed via phoneme mapping.'
        },
        {
          label: 'Compression Artifact Profile',
          score: verdict === 'synthetic' ? 62 : 89,
          status: verdict === 'synthetic' ? 'warning' : 'pass',
          detail: verdict === 'synthetic'
            ? 'Irregular codec fingerprints suggest multi-stage processing and re-encoding typical of deepfake pipelines.'
            : 'Single-pass compression profile consistent with authentic camera capture and standard video encoding.'
        },
        {
          label: 'Physiological Signal Detection',
          score: verdict === 'synthetic' ? 28 : 91,
          status: verdict === 'synthetic' ? 'fail' : 'pass',
          detail: verdict === 'synthetic'
            ? 'rPPG analysis failed to extract consistent cardiovascular signal. No detectable pulse in facial ROI.'
            : 'Remote photoplethysmography confirms physiological pulse at 68 BPM with normal heart rate variability.'
        }
      ],
      metadata: {
        framesAnalyzed: Math.floor(Math.random() * 200) + 180,
        processingTime: 3.84,
        modelVersion: 'DeepScan Pro v3.2.1',
        timestamp: new Date().toISOString()
      }
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
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        {!results ? (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 mt-8">
              <h1 className="text-5xl font-bold text-[#0A1F35] tracking-tight mb-4">
                AI Forensic Analysis Platform
              </h1>
              <p className="text-lg text-[#0A1F35]/70 max-w-2xl mx-auto leading-relaxed">
                Enterprise-grade deepfake detection utilizing multi-modal ensemble learning 
                and advanced biometric verification protocols.
              </p>
            </div>

            <UploadCard
              videoFile={videoFile}
              onVideoUpload={handleVideoUpload}
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
            />

            <TechnicalSidebar />
          </div>
        ) : (
          <ResultsPanel results={results} onReset={handleReset} />
        )}
      </main>

      <footer className="border-t border-[#0A1F35]/10 mt-16 py-8">
        <div className="container mx-auto px-6">
          <div className="text-center text-sm text-[#0A1F35]/60">
            <p className="mb-2">
              DeepScan Pro™ — Institutional-Grade Media Verification
            </p>
            <p className="text-xs">
              Demonstration platform utilizing simulated analysis • Production deployments integrate 
              certified forensic pipelines with audit trail generation
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
