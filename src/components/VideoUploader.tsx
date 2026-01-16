import { Upload, Video, Loader2 } from 'lucide-react';
import { useRef } from 'react';

interface VideoUploaderProps {
  videoFile: File | null;
  onVideoUpload: (file: File) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

export function VideoUploader({
  videoFile,
  onVideoUpload,
  onAnalyze,
  isAnalyzing
}: VideoUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      onVideoUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('video/')) {
      onVideoUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
      {!videoFile ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-white/30 rounded-xl p-12 text-center cursor-pointer hover:border-purple-400 hover:bg-white/5 transition-all"
        >
          <Upload className="w-16 h-16 mx-auto mb-4 text-purple-400" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Upload Video
          </h3>
          <p className="text-slate-300 mb-4">
            Drag and drop or click to select a video file
          </p>
          <p className="text-slate-400 text-sm">
            Supported formats: MP4, MOV, AVI, WebM
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
            <Video className="w-8 h-8 text-purple-400 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">
                {videoFile.name}
              </p>
              <p className="text-slate-400 text-sm">
                {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-purple-400 hover:text-purple-300 text-sm font-medium"
            >
              Change
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <button
            onClick={onAnalyze}
            disabled={isAnalyzing}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing Video...
              </>
            ) : (
              'Analyze for Deepfakes'
            )}
          </button>

          {isAnalyzing && (
            <div className="text-center">
              <div className="inline-block">
                <div className="flex gap-2 mb-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <p className="text-slate-300 text-sm">Processing video frames and audio...</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
