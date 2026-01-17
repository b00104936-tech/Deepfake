import { Upload, FileVideo, Loader2, Play } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

interface UploadCardProps {
  videoFile: File | null;
  onVideoUpload: (file: File) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

export function UploadCard({
  videoFile,
  onVideoUpload,
  onAnalyze,
  isAnalyzing
}: UploadCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      onVideoUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('video/')) {
      onVideoUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processingStages = [
    'Initializing forensic pipeline',
    'Extracting frame sequences',
    'Running CNN facial analysis',
    'Computing spectral signatures',
    'Analyzing temporal coherence',
    'Finalizing verification report'
  ];

  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    if (isAnalyzing) {
      const interval = setInterval(() => {
        setCurrentStage((prev) => (prev + 1) % processingStages.length);
      }, 700);
      return () => clearInterval(interval);
    } else {
      setCurrentStage(0);
    }
  }, [isAnalyzing]);

  return (
    <div className="mb-12">
      <div 
        className={`bg-white rounded-2xl shadow-[0_4px_24px_rgba(10,31,53,0.08)] transition-all duration-300 ${
          isDragging ? 'shadow-[0_8px_32px_rgba(197,160,89,0.2)] scale-[1.01]' : ''
        }`}
      >
        {!videoFile ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`relative border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-all ${
              isDragging 
                ? 'border-[#C5A059] bg-[#C5A059]/5' 
                : 'border-[#C5A059]/30 hover:border-[#C5A059]/60 hover:bg-[#C5A059]/5'
            }`}
          >
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-[#0A1F35] flex items-center justify-center mb-6 shadow-lg">
                <Upload className="w-10 h-10 text-[#C5A059]" />
              </div>
              
              <h3 className="text-2xl font-bold text-[#0A1F35] mb-2 tracking-tight">
                Upload Video Evidence
              </h3>
              <p className="text-[#0A1F35]/60 mb-6 max-w-md">
                Drag and drop your video file here, or click to browse
              </p>
              
              <div className="inline-flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 text-[#0A1F35]/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]"></span>
                  <span>Supported: MP4, MOV, AVI, WebM, MKV</span>
                </div>
                <div className="flex items-center gap-2 text-[#0A1F35]/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]"></span>
                  <span>Maximum size: 500 MB</span>
                </div>
                <div className="flex items-center gap-2 text-[#0A1F35]/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]"></span>
                  <span>Optimal duration: 5-60 seconds</span>
                </div>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        ) : (
          <div className="p-8">
            {/* File Info */}
            <div className="bg-[#F7F7F5] border border-[#0A1F35]/10 rounded-xl p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#0A1F35] flex items-center justify-center flex-shrink-0">
                  <FileVideo className="w-6 h-6 text-[#C5A059]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-bold text-[#0A1F35] mb-1 truncate">
                    {videoFile.name}
                  </h4>
                  <div className="flex items-center gap-4 text-sm text-[#0A1F35]/60">
                    <span>{(videoFile.size / (1024 * 1024)).toFixed(2)} MB</span>
                    <span>•</span>
                    <span>{videoFile.type.split('/')[1].toUpperCase()}</span>
                  </div>
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 text-sm font-semibold text-[#0A1F35] border border-[#0A1F35]/20 rounded-lg hover:bg-[#0A1F35]/5 transition-colors"
                >
                  Replace
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Analyze Button */}
            <button
              onClick={onAnalyze}
              disabled={isAnalyzing}
              className="w-full bg-[#C5A059] hover:bg-[#B39050] text-[#0A1F35] font-bold text-lg py-5 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:hover:bg-[#C5A059]"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Running Forensic Analysis...</span>
                </>
              ) : (
                <>
                  <Play className="w-6 h-6" />
                  <span>Initiate Analysis</span>
                </>
              )}
            </button>

            {/* Processing Status */}
            {isAnalyzing && (
              <div className="mt-6 bg-[#0A1F35] rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-[#C5A059] font-semibold tracking-wide uppercase text-sm">
                    Processing Pipeline
                  </h4>
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-2 h-2 rounded-full bg-[#C5A059]"
                        style={{
                          animation: 'pulse 1.5s ease-in-out infinite',
                          animationDelay: `${i * 0.2}s`
                        }}
                      ></div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  {processingStages.map((stage, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                        index === currentStage
                          ? 'bg-[#C5A059]/20 border border-[#C5A059]/40'
                          : index < currentStage
                          ? 'bg-white/5'
                          : 'opacity-40'
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {index < currentStage ? (
                          <div className="w-5 h-5 rounded-full bg-[#C5A059] flex items-center justify-center">
                            <span className="text-[#0A1F35] text-xs font-bold">✓</span>
                          </div>
                        ) : index === currentStage ? (
                          <Loader2 className="w-5 h-5 text-[#C5A059] animate-spin" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-white/20"></div>
                        )}
                      </div>
                      <span className="text-white/90 text-sm">{stage}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
