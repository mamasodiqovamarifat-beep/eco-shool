import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Key, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  Send, 
  RefreshCw, 
  BookOpen, 
  Save, 
  Eye, 
  EyeOff,
  Bot
} from 'lucide-react';
import { Slide } from '../types/slide';
import { 
  getGeminiApiKey, 
  setGeminiApiKey, 
  testGeminiConnection, 
  generateSpeakerNotes, 
  askGeminiEcoAdvisor,
  DEFAULT_GEMINI_KEY
} from '../utils/gemini';

interface GeminiAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSlide: Slide;
  schoolName: string;
  onUpdateSlideNotes?: (notes: string) => void;
}

export const GeminiAIModal: React.FC<GeminiAIModalProps> = ({
  isOpen,
  onClose,
  currentSlide,
  schoolName,
  onUpdateSlideNotes,
}) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [showKey, setShowKey] = useState<boolean>(true);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'status' | 'speech' | 'advisor'>('status');

  // Test state
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  // Speech generation state
  const [isGeneratingSpeech, setIsGeneratingSpeech] = useState<boolean>(false);
  const [generatedSpeech, setGeneratedSpeech] = useState<string>('');
  const [speechSaved, setSpeechSaved] = useState<boolean>(false);

  // Advisor state
  const [question, setQuestion] = useState<string>('');
  const [isAsking, setIsAsking] = useState<boolean>(false);
  const [advisorAnswer, setAdvisorAnswer] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setApiKey(getGeminiApiKey());
      setTestResult(null);
      setGeneratedSpeech(currentSlide.speakerNotes || '');
      setSpeechSaved(false);
    }
  }, [isOpen, currentSlide]);

  if (!isOpen) return null;

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSaveCustomKey = () => {
    setGeminiApiKey(apiKey);
    setTestResult({ success: true, message: 'Yangi API kalit saqlandi!' });
  };

  const handleResetDefaultKey = () => {
    setApiKey(DEFAULT_GEMINI_KEY);
    setGeminiApiKey(DEFAULT_GEMINI_KEY);
    setTestResult({ success: true, message: 'Asosiy Gemini kaliti tiklandi!' });
  };

  const handleRunTest = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await testGeminiConnection(apiKey);
      setTestResult(res);
    } catch (err: any) {
      setTestResult({ success: false, message: err.message || 'Xatolik yuz berdi' });
    } finally {
      setIsTesting(false);
    }
  };

  const handleGenerateSpeech = async () => {
    setIsGeneratingSpeech(true);
    setSpeechSaved(false);
    try {
      const result = await generateSpeakerNotes({
        slideTitle: currentSlide.title,
        slideSubtitle: currentSlide.subtitle,
        slideDescription: currentSlide.description,
        bulletPoints: currentSlide.bulletPoints,
        schoolName,
      });
      setGeneratedSpeech(result);
    } catch (err: any) {
      setGeneratedSpeech(`Xatolik: ${err.message || 'Nutq generatsiya qilinmadi'}`);
    } finally {
      setIsGeneratingSpeech(false);
    }
  };

  const handleApplyNotesToSlide = () => {
    if (onUpdateSlideNotes && generatedSpeech) {
      onUpdateSlideNotes(generatedSpeech);
      setSpeechSaved(true);
      setTimeout(() => setSpeechSaved(false), 3000);
    }
  };

  const handleAskAdvisor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setIsAsking(true);
    setAdvisorAnswer('');
    try {
      const ans = await askGeminiEcoAdvisor(question, schoolName);
      setAdvisorAnswer(ans);
    } catch (err: any) {
      setAdvisorAnswer(`Xatolik: ${err.message || 'Javob olishda muammo yuz berdi'}`);
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-950/70 via-slate-900 to-indigo-950/70 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Google Gemini AI Eko-Tizimi</h3>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Faol & Ulangan
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Maktab: <span className="text-emerald-300 font-medium">{schoolName}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-4">
          <button
            type="button"
            onClick={() => setActiveTab('status')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'status'
                ? 'border-emerald-500 text-emerald-400 bg-slate-900/50'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>API Kalit & Holat</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('speech')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'speech'
                ? 'border-emerald-500 text-emerald-400 bg-slate-900/50'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Slayd Nutqi Generatori</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('advisor')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'advisor'
                ? 'border-emerald-500 text-emerald-400 bg-slate-900/50'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>Eko-Maslahatchi AI</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5 text-slate-200 text-sm">
          {/* TAB 1: API STATUS & MANAGEMENT */}
          {activeTab === 'status' && (
            <div className="space-y-4">
              {/* Notice Card */}
              <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-4 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-semibold text-emerald-300">
                    Gemini API kaliti dasturga muvaffaqiyatli saqlangan!
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    Ushbu kalit loyiha sozlamalarida (`.env`, `.env.production` va `vite.config.ts`) mustahkamlangan bo'lib, **Netlify**, **Vercel** yoki boshqa joylarga deploy qilingandan keyin ham to'liq saqlanadi va ishlaydi.
                  </p>
                </div>
              </div>

              {/* API Key Box */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-emerald-400" />
                    Amaldagi Gemini API Kaliti:
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowKey(!showKey)}
                      className="text-slate-400 hover:text-white p-1 rounded transition-colors text-xs flex items-center gap-1"
                      title={showKey ? "Yashirish" : "Ko'rsatish"}
                    >
                      {showKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span className="text-[11px]">{showKey ? "Yashirish" : "Ko'rsatish"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleCopyKey}
                      className="text-emerald-400 hover:text-emerald-300 p-1 rounded transition-colors text-xs flex items-center gap-1 bg-emerald-950/50 border border-emerald-800/40 px-2 py-0.5"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span className="text-[11px]">{isCopied ? "Nusxalandi!" : "Nusxa olish"}</span>
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type={showKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 font-mono text-xs text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 select-all"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={handleResetDefaultKey}
                    className="text-xs text-slate-400 hover:text-slate-300 underline underline-offset-2"
                  >
                    Asosiy kalitni tiklash
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveCustomKey}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-colors"
                  >
                    Kalitni Yangilash
                  </button>
                </div>
              </div>

              {/* Test Connection Button */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleRunTest}
                  disabled={isTesting}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium text-xs rounded-xl shadow-lg shadow-emerald-900/30 transition-all disabled:opacity-60"
                >
                  <RefreshCw className={`w-4 h-4 ${isTesting ? 'animate-spin' : ''}`} />
                  <span>{isTesting ? 'Tekshirilmoqda...' : 'Gemini AI Aloqasini Jonli Sinash'}</span>
                </button>
              </div>

              {/* Test Result Feedback */}
              {testResult && (
                <div
                  className={`p-3.5 rounded-xl border text-xs leading-relaxed flex items-start gap-2.5 ${
                    testResult.success
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                      : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                  }`}
                >
                  {testResult.success ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div>{testResult.message}</div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SLIDE SPEECH GENERATION */}
          {activeTab === 'speech' && (
            <div className="space-y-4">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5">
                <div className="text-xs text-slate-400 mb-1">Tanlangan slayd:</div>
                <div className="font-semibold text-emerald-300 text-sm">
                  {currentSlide.stepBadge ? `${currentSlide.stepBadge}: ` : ''}{currentSlide.title}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">
                  Ushbu slayd uchun hakamlar va jamoaga taqdim etiladigan professional nutq:
                </p>
                <button
                  type="button"
                  onClick={handleGenerateSpeech}
                  disabled={isGeneratingSpeech}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium transition-colors shadow-sm disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isGeneratingSpeech ? 'Generatsiya qilinmoqda...' : 'Nutq Yaratish'}</span>
                </button>
              </div>

              <textarea
                value={generatedSpeech}
                onChange={(e) => setGeneratedSpeech(e.target.value)}
                placeholder="Nutq matni bu yerda paydo bo'ladi..."
                rows={8}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-y"
              />

              {generatedSpeech && onUpdateSlideNotes && (
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-400">
                    Ushbu nutqni slaydning ma'ruzachi eslatmalariga (Speaker Notes) qo'shish:
                  </span>
                  <button
                    type="button"
                    onClick={handleApplyNotesToSlide}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    {speechSaved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                    <span>{speechSaved ? 'Slaydga Saqlandi!' : 'Slaydga Biriktirish'}</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: AI ECO-ADVISOR */}
          {activeTab === 'advisor' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-400">
                Eco-Schools loyihasini rivojlantirish, o'quvchilarni jalb qilish yoki eko-aksiyalar o'tkazish bo'yicha Gemini AI'ga savol bering:
              </p>

              <form onSubmit={handleAskAdvisor} className="flex gap-2">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Masalan: Maktabimizda suv isrofgarchiligini qanday kamaytirish mumkin?"
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
                <button
                  type="submit"
                  disabled={isAsking || !question.trim()}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 disabled:opacity-50 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isAsking ? '...' : 'So‘rash'}</span>
                </button>
              </form>

              {/* Quick suggestions */}
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                <button
                  type="button"
                  onClick={() => setQuestion("Maktab uchun eng yaxshi Eko-kod shiorlaridan 5 ta namuna ber")}
                  className="px-2.5 py-1 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700/50"
                >
                  🌱 5 ta Eko-kod shiori
                </button>
                <button
                  type="button"
                  onClick={() => setQuestion("Maktab oshxonasida plastikni kamaytirish bo'yicha amaliy reja")}
                  className="px-2.5 py-1 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700/50"
                >
                  ♻️ Plastikni kamaytirish rejasi
                </button>
                <button
                  type="button"
                  onClick={() => setQuestion("Yashil Bayroq hakamlari eng ko'p nimaga e'tibor qaratadi?")}
                  className="px-2.5 py-1 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700/50"
                >
                  🏆 Yashil Bayroq mezonlari
                </button>
              </div>

              {advisorAnswer && (
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-200 leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
                  <div className="font-semibold text-emerald-400 mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Gemini AI Javobi:
                  </div>
                  {advisorAnswer}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-[11px]">
            <Key className="w-3 h-3 text-emerald-400" />
            <span>Model: <span className="text-emerald-300 font-mono">gemini-3.8-flash</span></span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium transition-colors"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
};
