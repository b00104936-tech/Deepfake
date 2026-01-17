import { AlertTriangle, CheckCircle, AlertCircle, RotateCcw, FileText, Clock, Database } from 'lucide-react';
import { AnalysisResult } from '../App';

interface ResultsPanelProps {
  results: AnalysisResult;
  onReset: () => void;
}

export function ResultsPanel({ results, onReset }: ResultsPanelProps) {
  const getVerdictConfig = () => {
    switch (results.verdict) {
      case 'authentic':
        return {
          icon: <CheckCircle className="w-16 h-16" />,
          color: '#2D7A3E',
          bgColor: '#E8F5E9',
          borderColor: '#2D7A3E',
          label: 'AUTHENTIC CONTENT',
          description: 'Video analysis indicates genuine, unmanipulated media'
        };
      case 'suspicious':
        return {
          icon: <AlertCircle className="w-16 h-16" />,
          color: '#C5A059',
          bgColor: '#FFF9E6',
          borderColor: '#C5A059',
          label: 'REQUIRES REVIEW',
          description: 'Anomalies detected — manual expert verification recommended'
        };
      case 'synthetic':
        return {
          icon: <AlertTriangle className="w-16 h-16" />,
          color: '#B91C1C',
          bgColor: '#FEE2E2',
          borderColor: '#B91C1C',
          label: 'SYNTHETIC CONTENT',
          description: 'High probability of AI-generated or manipulated media detected'
        };
    }
  };

  const verdictConfig = getVerdictConfig();

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header with Reset */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#0A1F35] tracking-tight">
            Forensic Analysis Report
          </h2>
          <p className="text-[#0A1F35]/60 mt-1">
            Generated {new Date(results.metadata.timestamp).toLocaleString()}
          </p>
        </div>
        <button
          onClick={onReset}
          className="px-6 py-3 bg-white border border-[#0A1F35]/20 rounded-full font-semibold text-[#0A1F35] hover:bg-[#F7F7F5] transition-colors flex items-center gap-2 shadow-sm"
        >
          <RotateCcw className="w-5 h-5" />
          New Analysis
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Results Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Verdict Card */}
          <div
            className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(10,31,53,0.08)] overflow-hidden"
            style={{ borderTop: `4px solid ${verdictConfig.borderColor}` }}
          >
            <div className="p-8">
              <div className="flex items-start gap-6">
                <div
                  className="w-24 h-24 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: verdictConfig.bgColor }}
                >
                  <div style={{ color: verdictConfig.color }}>
                    {verdictConfig.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <div
                    className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider mb-3"
                    style={{
                      backgroundColor: verdictConfig.bgColor,
                      color: verdictConfig.color
                    }}
                  >
                    {verdictConfig.label}
                  </div>
                  <h3 className="text-2xl font-bold text-[#0A1F35] mb-2">
                    {verdictConfig.description}
                  </h3>
                  <p className="text-[#0A1F35]/60 text-sm">
                    Analysis confidence: <span className="font-semibold text-[#0A1F35]">{results.confidence}%</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Score Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Technical Feasibility */}
            <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(10,31,53,0.08)] p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#0A1F35] flex items-center justify-center">
                  <Database className="w-5 h-5 text-[#C5A059]" />
                </div>
                <h4 className="text-sm font-bold text-[#0A1F35] tracking-wide uppercase">
                  Technical Feasibility
                </h4>
              </div>
              <div className="mb-4">
                <div className="text-5xl font-bold text-[#0A1F35] mb-2">
                  {results.technicalFeasibility}%
                </div>
                <p className="text-xs text-[#0A1F35]/60">
                  Probability that current AI models could generate this content
                </p>
              </div>
              <div className="relative w-full h-3 bg-[#F7F7F5] rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-[#0A1F35] transition-all duration-1000 rounded-full"
                  style={{ width: `${results.technicalFeasibility}%` }}
                ></div>
              </div>
            </div>

            {/* AI Probability */}
            <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(10,31,53,0.08)] p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#C5A059] flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#0A1F35]" />
                </div>
                <h4 className="text-sm font-bold text-[#0A1F35] tracking-wide uppercase">
                  AI Probability Score
                </h4>
              </div>
              <div className="mb-4">
                <div className="text-5xl font-bold text-[#0A1F35] mb-2">
                  {results.aiProbability}%
                </div>
                <p className="text-xs text-[#0A1F35]/60">
                  Likelihood of AI generation based on ensemble model analysis
                </p>
              </div>
              <div className="relative w-full h-3 bg-[#F7F7F5] rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#C5A059] to-[#0A1F35] transition-all duration-1000 rounded-full"
                  style={{ width: `${results.aiProbability}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Detection Metrics */}
          <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(10,31,53,0.08)] p-8">
            <h4 className="text-xl font-bold text-[#0A1F35] mb-6 tracking-tight">
              Detailed Detection Metrics
            </h4>
            <div className="space-y-4">
              {results.detectionMetrics.map((metric, index) => {
                const statusConfig = {
                  pass: { color: '#2D7A3E', bg: '#E8F5E9', label: 'PASS' },
                  warning: { color: '#C5A059', bg: '#FFF9E6', label: 'WARNING' },
                  fail: { color: '#B91C1C', bg: '#FEE2E2', label: 'FAIL' }
                };
                const config = statusConfig[metric.status];

                return (
                  <details
                    key={index}
                    className="group border border-[#0A1F35]/10 rounded-xl overflow-hidden"
                  >
                    <summary className="px-6 py-4 cursor-pointer hover:bg-[#F7F7F5] transition-colors flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h5 className="font-bold text-[#0A1F35]">{metric.label}</h5>
                          <span
                            className="px-3 py-0.5 rounded-full text-xs font-bold tracking-wider"
                            style={{ backgroundColor: config.bg, color: config.color }}
                          >
                            {config.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <div className="relative w-full h-2 bg-[#F7F7F5] rounded-full overflow-hidden">
                              <div
                                className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
                                style={{
                                  width: `${metric.score}%`,
                                  backgroundColor: config.color
                                }}
                              ></div>
                            </div>
                          </div>
                          <span className="text-sm font-bold text-[#0A1F35] w-12 text-right">
                            {metric.score}%
                          </span>
                        </div>
                      </div>
                    </summary>
                    <div className="px-6 py-4 bg-[#F7F7F5] border-t border-[#0A1F35]/10">
                      <p className="text-sm text-[#0A1F35]/80 leading-relaxed">
                        {metric.detail}
                      </p>
                    </div>
                  </details>
                );
              })}
            </div>
          </div>
        </div>

        {/* Metadata Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-[#0A1F35] rounded-2xl shadow-[0_4px_24px_rgba(10,31,53,0.08)] p-8 sticky top-24">
            <h4 className="text-[#C5A059] font-bold tracking-wide uppercase text-sm mb-6">
              Analysis Metadata
            </h4>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-[#C5A059]" />
                  <span className="text-white/60 text-xs uppercase tracking-wide">Processing Time</span>
                </div>
                <p className="text-white text-xl font-bold">
                  {results.metadata.processingTime.toFixed(2)}s
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-[#C5A059]" />
                  <span className="text-white/60 text-xs uppercase tracking-wide">Frames Analyzed</span>
                </div>
                <p className="text-white text-xl font-bold">
                  {results.metadata.framesAnalyzed.toLocaleString()}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Database className="w-4 h-4 text-[#C5A059]" />
                  <span className="text-white/60 text-xs uppercase tracking-wide">Model Version</span>
                </div>
                <p className="text-white text-sm font-semibold">
                  {results.metadata.modelVersion}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10">
                <h5 className="text-[#C5A059] text-xs uppercase tracking-wide mb-3">
                  Analysis Methods
                </h5>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-[#C5A059] mt-1">•</span>
                    <span>Convolutional Neural Networks (ResNet-50)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C5A059] mt-1">•</span>
                    <span>Temporal LSTM Analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C5A059] mt-1">•</span>
                    <span>FFT Frequency Domain</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C5A059] mt-1">•</span>
                    <span>rPPG Physiological Detection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C5A059] mt-1">•</span>
                    <span>Multi-Modal Ensemble Voting</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-white/10">
                <div className="bg-[#C5A059]/10 border border-[#C5A059]/20 rounded-lg p-4">
                  <p className="text-white/80 text-xs leading-relaxed">
                    <span className="text-[#C5A059] font-semibold">Audit Trail:</span> This analysis 
                    report is cryptographically signed and can be independently verified through 
                    our certification portal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
