import { AlertTriangle, CheckCircle, Info, RotateCcw } from 'lucide-react';
import { AnalysisResult } from '../App';

interface AnalysisResultsProps {
  results: AnalysisResult;
  onReset: () => void;
}

export function AnalysisResults({ results, onReset }: AnalysisResultsProps) {
  const isHighRisk = results.score > 70;
  const isMediumRisk = results.score > 40 && results.score <= 70;
  const isLowRisk = results.score <= 40;

  const getRiskColor = () => {
    if (isHighRisk) return 'from-red-500 to-orange-500';
    if (isMediumRisk) return 'from-yellow-500 to-orange-500';
    return 'from-green-500 to-emerald-500';
  };

  const getRiskLabel = () => {
    if (isHighRisk) return 'High Likelihood';
    if (isMediumRisk) return 'Moderate Likelihood';
    return 'Low Likelihood';
  };

  const getRiskIcon = () => {
    if (isHighRisk) return <AlertTriangle className="w-12 h-12" />;
    if (isMediumRisk) return <Info className="w-12 h-12" />;
    return <CheckCircle className="w-12 h-12" />;
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 space-y-8">
      {/* Score Display */}
      <div className="text-center">
        <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br ${getRiskColor()} text-white mb-4`}>
          {getRiskIcon()}
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">
          {results.score}% Deepfake Likelihood
        </h2>
        <p className={`text-lg font-semibold mb-1 ${
          isHighRisk ? 'text-red-400' : isMediumRisk ? 'text-yellow-400' : 'text-green-400'
        }`}>
          {getRiskLabel()}
        </p>
        <p className="text-slate-300 text-sm">
          Confidence: {results.confidence}%
        </p>
      </div>

      {/* Explanation */}
      <div className="bg-white/5 rounded-lg p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-3">Analysis Summary</h3>
        <p className="text-slate-300 leading-relaxed">
          {results.explanation}
        </p>
      </div>

      {/* Indicators */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Detection Indicators</h3>
        <div className="grid gap-3">
          {results.indicators.map((indicator, index) => {
            const indicatorColor = 
              indicator.risk === 'high' ? 'bg-red-500/20 border-red-500/50 text-red-300' :
              indicator.risk === 'medium' ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300' :
              'bg-green-500/20 border-green-500/50 text-green-300';

            return (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
              >
                <span className="text-slate-300 font-medium">{indicator.label}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${indicatorColor}`}>
                  {indicator.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={onReset}
          className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-lg transition-all border border-white/20 flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Analyze Another Video
        </button>
      </div>

      {/* Disclaimer */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-blue-300 text-sm">
              <span className="font-semibold">Note:</span> This analysis is based on mock data for demonstration purposes. 
              In production, this would use advanced AI models to detect deepfakes with real-time analysis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
