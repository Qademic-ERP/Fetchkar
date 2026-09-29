import { useState, useEffect, useRef } from 'react';
import { UploadCloud, Check, MessageSquare, Send, CheckCircle2, Star, Mic, Video, Type, Square, RotateCcw,  } from 'lucide-react';

function TestimonialInput({ item }: { item: any }) {
  const [stars, setStars] = useState(0);
  const [hoverStar, setHoverStar] = useState(0);
  
  const [mode, setMode] = useState<'select' | 'text' | 'audio' | 'video'>('select');
  const [textVal, setTextVal] = useState('');
  
  // Media Recorder State
  const [isRecording, setIsRecording] = useState(false);
  const [mediaBlobUrl, setMediaBlobUrl] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoPreviewRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopTracks = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
    }
  };

  const startRecording = async (type: 'audio' | 'video') => {
    setMode(type);
    setMediaBlobUrl(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true, 
        video: type === 'video' 
      });
      streamRef.current = stream;

      if (type === 'video' && videoPreviewRef.current) {
        videoPreviewRef.current.srcObject = stream;
        videoPreviewRef.current.play();
      }

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      const chunks: BlobPart[] = [];
      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: type === 'video' ? 'video/webm' : 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setMediaBlobUrl(url);
        stopTracks();
      };

      recorder.start();
      setIsRecording(true);

      // Auto stop at 60s
      setTimeout(() => {
        if (mediaRecorderRef.current?.state === 'recording') {
          stopRecording();
        }
      }, 60000);
      
    } catch (err) {
      console.error(err);
      alert("Microphone/Camera permission denied.");
      setMode('select');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const discardRecording = () => {
    setMediaBlobUrl(null);
    setMode('select');
    stopTracks();
  };

  useEffect(() => {
    return () => stopTracks(); // cleanup
  }, []);

  return (
    <div className="space-y-6">
      {/* Star Rating */}
      {item.config?.stars !== 'hidden' && (
        <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-5 flex flex-col items-center justify-center gap-3">
          <div className="text-sm font-bold text-amber-900">How would you rate your experience?</div>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                onMouseEnter={() => setHoverStar(s)}
                onMouseLeave={() => setHoverStar(0)}
                onClick={() => setStars(s)}
                className="p-1 transition-transform hover:scale-110 focus:outline-none"
              >
                <Star 
                  size={32} 
                  className={`transition-colors ${
                    (hoverStar || stars) >= s 
                      ? 'text-amber-400 fill-amber-400' 
                      : 'text-slate-200 fill-slate-100'
                  }`} 
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Response Modes */}
      {mode === 'select' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button onClick={() => setMode('text')} className="flex flex-col items-center justify-center gap-3 p-6 border-2 border-slate-200 bg-white rounded-xl hover:border-indigo-400 hover:bg-brand-50 hover:shadow-sm transition-all group">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center group-hover:scale-110 transition-transform"><Type size={20} className="text-accent" /></div>
            <span className="font-bold text-slate-700">Write Text</span>
          </button>
          <button onClick={() => startRecording('audio')} className="flex flex-col items-center justify-center gap-3 p-6 border-2 border-slate-200 bg-white rounded-xl hover:border-indigo-400 hover:bg-brand-50 hover:shadow-sm transition-all group">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center group-hover:scale-110 transition-transform"><Mic size={20} className="text-accent" /></div>
            <span className="font-bold text-slate-700">Record Audio</span>
          </button>
          <button onClick={() => startRecording('video')} className="flex flex-col items-center justify-center gap-3 p-6 border-2 border-slate-200 bg-white rounded-xl hover:border-indigo-400 hover:bg-brand-50 hover:shadow-sm transition-all group">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center group-hover:scale-110 transition-transform"><Video size={20} className="text-accent" /></div>
            <span className="font-bold text-slate-700">Record Video (60s)</span>
          </button>
        </div>
      )}

      {mode === 'text' && (
        <div className="space-y-3 animate-in fade-in zoom-in-95 duration-300">
          <textarea 
            value={textVal}
            onChange={e => setTextVal(e.target.value)}
            className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-5 min-h-[160px] text-lg focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 shadow-inner resize-y"
            placeholder="Type your testimonial here..."
            autoFocus
          />
          <div className="flex justify-end gap-3">
            <button onClick={() => setMode('select')} className="px-5 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors">Cancel</button>
            <button className="btn-primary px-6 py-2.5 shadow-md hover:-translate-y-0.5 transition-all text-sm">Save Text</button>
          </div>
        </div>
      )}

      {(mode === 'audio' || mode === 'video') && (
        <div className="bg-slate-900 rounded-2xl overflow-hidden relative shadow-lg border border-slate-800 animate-in fade-in zoom-in-95 duration-300 flex flex-col items-center justify-center min-h-[300px]">
          
          {mode === 'video' && !mediaBlobUrl && (
            <video ref={videoPreviewRef} muted className="absolute inset-0 w-full h-full object-cover opacity-80" />
          )}

          {mode === 'video' && mediaBlobUrl && (
            <video src={mediaBlobUrl} controls className="absolute inset-0 w-full h-full object-contain bg-black" />
          )}

          {mode === 'audio' && !mediaBlobUrl && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-10">
              <div className="w-24 h-24 rounded-full bg-brand-500/20 flex items-center justify-center animate-pulse">
                <div className="w-16 h-16 rounded-full bg-brand-500 flex items-center justify-center shadow-lg shadow-indigo-500/50">
                  <Mic size={32} className="text-white" />
                </div>
              </div>
              <span className="text-white font-medium tracking-wide">Recording Audio...</span>
            </div>
          )}

          {mode === 'audio' && mediaBlobUrl && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-slate-900">
              <audio src={mediaBlobUrl} controls className="w-3/4 max-w-md" />
            </div>
          )}

          {/* Controls overlay */}
          <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center gap-4 z-20">
            {isRecording ? (
              <button 
                onClick={stopRecording}
                className="w-14 h-14 bg-rose-500 rounded-full flex items-center justify-center shadow-lg shadow-rose-500/40 hover:scale-105 transition-transform"
              >
                <Square size={20} className="text-white fill-white" />
              </button>
            ) : mediaBlobUrl ? (
              <>
                <button onClick={discardRecording} className="px-5 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-xl font-bold backdrop-blur-md transition-colors flex items-center gap-2">
                  <RotateCcw size={18} /> Retake
                </button>
                <button className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/30 transition-all hover:-translate-y-0.5 flex items-center gap-2">
                  <Check size={18} /> Looks Good, Save
                </button>
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ClientPage() {
  const [completed] = useState(2);
  const total = 6;

  const agencyName = "Aditi Design Co.";
  const items = [
    { id: '1', type: 'text', label: 'Company Name', status: 'completed', value: 'Acme Corp' },
    { id: '2', type: 'file', label: 'Company Logo (High-Res PNG or SVG)', status: 'completed', value: 'acme-logo.svg' },
    { id: '3', type: 'text', label: 'About Us / Brand Story', status: 'pending', value: '' },
    { id: '7', type: 'testimonial', label: 'Could you share a quick review of your experience working with us?', status: 'pending', config: { stars: 'required' } },
    { id: '4', type: 'yes_no', label: 'Do you have an existing domain name?', status: 'pending', value: null },
    { id: '6', type: 'dropdown', label: 'What is your preferred project timeline?', status: 'pending', value: null }
  ];

  const percentage = (completed / total) * 100;

  // Simulate smooth progress bar animation on load
  const [visualPercentage, setVisualPercentage] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setVisualPercentage(percentage), 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="min-h-screen bg-white/40 font-sans">
      
      {/* Decorative Background Blob */}
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-br from-indigo-500/5 to-purple-500/10 -z-10"></div>
      
      <div className="max-w-3xl mx-auto pt-16 px-6 pb-32">
        {/* Header Card */}
        <header className="bg-white/60 backdrop-blur-md border border-slate-200/60 rounded-3xl p-8 md:p-10 shadow-lg shadow-slate-200/40 mb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
          
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-sm flex items-center justify-center text-white text-[11px] font-bold">A</div>
            <span className="text-[15px] font-medium text-slate-500 tracking-wide">{agencyName}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Website Onboarding Pack
          </h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl leading-relaxed">
            Please provide the details below so we can start building your project. <strong className="font-medium text-slate-700">Your progress is saved automatically.</strong>
          </p>

          {/* Premium Progress Bar */}
          <div className="mt-12 bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center gap-6">
            <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center shrink-0">
              <CheckCircle2 size={24} className="text-accent" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-slate-900">Completion Progress</span>
                <span className="text-sm font-bold text-accent">{Math.round(percentage)}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-accent h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${visualPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Checklist */}
        <main className="space-y-6">
          {items.map((item, idx) => (
            <div key={item.id} className={`bg-white border rounded-2xl p-6 md:p-8 transition-all duration-300 ${
              item.status === 'completed' 
                ? 'border-emerald-100 bg-emerald-50/10 shadow-sm' 
                : 'border-slate-200 shadow-card hover:shadow-md'
            }`}>
              
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold transition-colors ${
                  item.status === 'completed' 
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' 
                    : 'bg-slate-100 text-slate-400'
                }`}>
                  {item.status === 'completed' ? <Check size={16} strokeWidth={3} /> : idx + 1}
                </div>
                <div className="flex-1 pt-1">
                  <label className="text-lg md:text-xl font-bold text-slate-900 leading-snug">
                    {item.label}
                  </label>
                  {item.type === 'testimonial' && (
                    <p className="text-sm text-slate-500 mt-2">You can type it out, or record a quick voice or video note below.</p>
                  )}
                </div>
              </div>

              <div className="pl-0 md:pl-12">
                {item.type === 'text' && (
                  <textarea 
                    className={`w-full border rounded-xl p-4 text-[15px] focus:outline-none transition-all min-h-[120px] resize-y ${
                      item.status === 'completed' 
                        ? 'bg-transparent border-transparent text-emerald-900 font-medium' 
                        : 'bg-white/40 border-slate-200 text-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 shadow-inner'
                    }`}
                    placeholder="Type your answer here..."
                    defaultValue={item.value || ''}
                    readOnly={item.status === 'completed'}
                  />
                )}

                {item.type === 'file' && (
                  item.status === 'completed' ? (
                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 rounded-lg"><Check size={16} className="text-emerald-600" /></div>
                        <span className="text-[15px] text-emerald-900 font-medium">{item.value}</span>
                      </div>
                      <button className="text-sm text-emerald-600 hover:text-emerald-700 transition-colors font-bold underline" onClick={() => document.getElementById(`file-upload-${item.id}`)?.click()}>Replace</button>
                      <input 
                        type="file" 
                        id={`file-upload-${item.id}`} 
                        className="hidden" 
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            alert(`File ${file.name} uploaded successfully!`);
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <div 
                      onClick={() => document.getElementById(`file-upload-${item.id}`)?.click()}
                      className="border-2 border-dashed border-border bg-white/40 rounded-xl p-10 flex flex-col items-center justify-center text-center hover:border-accent hover:bg-brand-50/50 cursor-pointer transition-all group relative overflow-hidden"
                    >
                      <input 
                        type="file" 
                        id={`file-upload-${item.id}`} 
                        className="hidden" 
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            alert(`File ${file.name} uploaded successfully!`);
                          }
                        }}
                      />
                      <div className="w-14 h-14 bg-white shadow-sm rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <UploadCloud size={24} className="text-accent" />
                      </div>
                      <span className="text-base font-bold text-foreground">Click to upload a file</span>
                      <span className="text-sm text-muted-foreground mt-1">or drag and drop it here</span>
                    </div>
                  )
                )}

                {item.type === 'yes_no' && (
                  <div className="flex items-center gap-4">
                    <button className="flex-1 py-4 px-4 bg-white/40 border border-slate-200 shadow-sm rounded-xl text-base font-bold text-slate-700 hover:border-indigo-500 hover:text-accent hover:bg-brand-50 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition-all">
                      Yes
                    </button>
                    <button className="flex-1 py-4 px-4 bg-white/40 border border-slate-200 shadow-sm rounded-xl text-base font-bold text-slate-700 hover:border-indigo-500 hover:text-accent hover:bg-brand-50 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition-all">
                      No
                    </button>
                  </div>
                )}

                {item.type === 'dropdown' && (
                  <div className="relative">
                    <select className="w-full appearance-none bg-white/40 border border-slate-200 shadow-sm rounded-xl px-5 py-4 text-base font-medium text-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all cursor-pointer hover:border-slate-300">
                      <option value="" disabled selected>Select an option...</option>
                      <option value="1">Option 1</option>
                      <option value="2">Option 2</option>
                    </select>
                    <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                      <svg width="14" height="10" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1.5L6 6.5L11 1.5" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                )}
                
                {item.type === 'testimonial' && (
                  <TestimonialInput item={item} />
                )}

                <div className="mt-6">
                  <div className="group/note">
                    <button className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-accent transition-colors">
                      <MessageSquare size={16} />
                      Leave a note or question
                    </button>
                    <div className="hidden group-focus-within:block mt-3">
                      <textarea 
                        className="w-full bg-white border border-slate-200 rounded-xl p-4 text-[15px] text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all min-h-[100px] resize-y placeholder:text-slate-400 shadow-sm"
                        placeholder="Ask a question or explain your upload..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="pt-12 flex justify-end">
            <button className="btn-primary px-10 py-4 text-lg rounded-2xl shadow-lg shadow-indigo-600/20 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-600/30 transition-all">
              Submit Everything <Send size={20} className="ml-2 inline" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
