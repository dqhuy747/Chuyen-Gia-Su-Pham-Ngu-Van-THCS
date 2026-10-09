import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen,
  FileText,
  Presentation,
  Table as TableIcon,
  Download,
  Copy,
  Printer,
  Clock,
  Sparkles,
  RefreshCw,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit3,
  Save,
  History,
  ShieldCheck,
  Feather,
  HelpCircle,
  X,
  Check,
  RotateCcw,
  PlayCircle,
  Award,
  PanelLeftClose,
  PanelLeftOpen,
  Maximize2,
  Minimize2,
  CheckCircle2,
  AlertCircle,
  Grid,
  Mic,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { SAMPLE_PRESETS, PedagogicalPreset } from './data/samplePresets';
import { generateDocxBlob } from './utils/docxExport';
import { MarkdownRenderer } from './components/MarkdownRenderer';
import { NormsModal } from './components/NormsModal';
import { TextbookModal } from './components/TextbookModal';
import { TEXTBOOK_REPOSITORY, TextbookLesson } from './data/textbookData';

interface HistoryItem {
  id: string;
  timestamp: number;
  mode: 'mode1' | 'mode2' | 'mode3';
  title: string;
  grade: string;
  topic: string;
  content: string;
}

interface ParsedSlide {
  num: number;
  title: string;
  headline: string;
  bullets: string[];
  visual: string;
  notes: string;
  raw: string;
}

const THCS_GRADES: ('Lớp 6' | 'Lớp 7' | 'Lớp 8' | 'Lớp 9')[] = ['Lớp 6', 'Lớp 7', 'Lớp 8', 'Lớp 9'];

const CURRICULUM_OPTIONS = [
  'Kết nối tri thức với cuộc sống',
];

const SUGGESTED_OBJECTIVES = [
  'Nhận biết và phân tích đặc trưng thể loại, phương thức biểu đạt chính',
  'Cảm thụ vẻ đẹp ngôn từ, hình ảnh nghệ thuật và biện pháp tu từ',
  'Rút ra thông điệp triết lí nhân sinh và bài học ứng xử trong cuộc sống',
  'Rèn luyện kĩ năng viết đoạn văn cảm thụ văn học từ 150 - 200 chữ',
  'Phát triển năng lực ngôn ngữ, vốn từ vựng và kĩ năng diễn đạt mạch lạc',
  'Bồi dưỡng phẩm chất nhân ái, lòng yêu nước và trách nhiệm cộng đồng',
];

export default function App() {
  // Navigation & View state
  const [currentMode, setCurrentMode] = useState<'mode1' | 'mode2' | 'mode3'>('mode1');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [fullscreenPreview, setFullscreenPreview] = useState(false);
  const [isNormsModalOpen, setIsNormsModalOpen] = useState(false);
  const [isTextbookModalOpen, setIsTextbookModalOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<string>('');
  const [selectedTextbookId, setSelectedTextbookId] = useState<string>('');
  const [previewTab, setPreviewTab] = useState<'preview' | 'slideshow' | 'grid' | 'edit' | 'interactive'>('preview');
  const [isPresentationFullScreen, setIsPresentationFullScreen] = useState(false);

  // Form State - Removed subject dropdown as requested
  const [grade, setGrade] = useState<'Lớp 6' | 'Lớp 7' | 'Lớp 8' | 'Lớp 9'>('Lớp 9');
  const [curriculum, setCurriculum] = useState('Kết nối tri thức với cuộc sống');
  const [topic, setTopic] = useState('Văn bản: Đồng chí (Chính Hữu) - Bài 2: Những cung bậc tâm trạng');
  const [duration, setDuration] = useState('2 tiết (90 phút)');
  const [examType, setExamType] = useState('Kiểm tra cuối học kì I');
  const [objectives, setObjectives] = useState(
    'Học sinh nhận biết đặc trưng thể thơ tự do; cảm nhận vẻ đẹp mộc mạc, cao cả của tình đồng chí nơi chiến hào; phân tích tác dụng biện pháp tu từ và câu thơ đặc biệt Đồng chí!.',
  );
  const [additionalNotes, setAdditionalNotes] = useState(
    'Kết hợp phiếu học tập đọc hiểu, sơ đồ tư duy; phát triển năng lực cảm thụ văn học; không ép buộc học sinh phải có điện thoại.',
  );
  const [showAdvancedParams, setShowAdvancedParams] = useState(false);

  // CV 7991 Matrix Weight Customizer
  const [matrixWeights] = useState({
    mcq: 30, // 30% TN nhiều lựa chọn (3.0đ)
    tf: 20, // 20% TN đúng sai (2.0đ)
    sa: 20, // 20% TN trả lời ngắn (2.0đ)
    essay: 30, // 30% Tự luận (3.0đ)
    know: 40, // 40% Biết (4.0đ)
    understand: 30, // 30% Hiểu (3.0đ)
    apply: 30, // 30% Vận dụng (3.0đ)
  });

  // Active Output & Generation State
  const [content, setContent] = useState<string>(SAMPLE_PRESETS[0]?.content || '');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [autoSavedTime, setAutoSavedTime] = useState<string>('');

  // Interactive Test State (Part I, II, III for student test practice in Mode 3)
  const [studentMCQ, setStudentMCQ] = useState<Record<number, string>>({});
  const [studentTF, setStudentTF] = useState<Record<string, 'Đúng' | 'Sai'>>({});
  const [studentSA, setStudentSA] = useState<Record<number, string>>({});
  const [calculatedScore, setCalculatedScore] = useState<number | null>(null);

  // Slide Deck Carousel State (for Mode 2)
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Filter lessons from textbook repository matching chosen grade & curriculum
  const availableLessons = useMemo(() => {
    return TEXTBOOK_REPOSITORY.filter(
      (l) => l.grade === grade && (l.curriculum.includes(curriculum) || curriculum.includes(l.curriculum)),
    );
  }, [grade, curriculum]);

  // Extract distinct units from available lessons in natural numerical order (Bài 1 -> Bài 10)
  const availableUnits = useMemo(() => {
    const unitsSet = new Set<string>();
    availableLessons.forEach((l) => unitsSet.add(l.unit));
    return Array.from(unitsSet).sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)?.[0] || '0', 10);
      const numB = parseInt(b.match(/\d+/)?.[0] || '0', 10);
      return numA - numB;
    });
  }, [availableLessons]);

  // Lessons inside the selected unit (or all if none selected)
  const unitLessons = useMemo(() => {
    if (!selectedUnit) return availableLessons;
    return availableLessons.filter((l) => l.unit === selectedUnit);
  }, [availableLessons, selectedUnit]);

  // Reset or initialize selected unit when grade or curriculum changes
  useEffect(() => {
    if (availableUnits.length > 0) {
      if (!availableUnits.includes(selectedUnit)) {
        setSelectedUnit(availableUnits[0]);
      }
    } else {
      setSelectedUnit('');
    }
  }, [grade, curriculum, availableUnits]);

  // When switching modes, set appropriate default preview tab
  useEffect(() => {
    if (currentMode === 'mode2') {
      setPreviewTab('slideshow');
    } else {
      setPreviewTab('preview');
    }
  }, [currentMode]);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('ngu_van_thcs_history');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
      const savedDraft = localStorage.getItem('ngu_van_thcs_draft');
      if (savedDraft) {
        const draft = JSON.parse(savedDraft);
        if (draft.content) setContent(draft.content);
        if (draft.topic) setTopic(draft.topic);
        if (draft.grade) setGrade(draft.grade);
        if (draft.mode) setCurrentMode(draft.mode);
        if (draft.objectives) setObjectives(draft.objectives);
      }
    } catch {
      // Ignore local storage error
    }
  }, []);

  // Auto-save draft on changes
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const draft = {
          content,
          topic,
          grade,
          mode: currentMode,
          objectives,
          curriculum,
          duration,
        };
        localStorage.setItem('ngu_van_thcs_draft', JSON.stringify(draft));
        const now = new Date();
        setAutoSavedTime(
          `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`,
        );
      } catch {
        //
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [content, topic, grade, currentMode, objectives, curriculum, duration]);

  // Stepper steps for visual progress
  const STEPS = [
    'Phân tích Yêu cầu cần đạt & Thể loại văn bản...',
    'Thiết lập cấu trúc hoạt động sư phạm & Ma trận chuẩn...',
    'Biên soạn nội dung chi tiết theo Công văn chỉ đạo...',
    'Kiểm định bảng biểu, thang điểm & hoàn thiện...',
  ];

  // Save to history helper
  const saveToHistory = (newContent: string) => {
    const item: HistoryItem = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      mode: currentMode,
      title: `Ngữ văn - ${grade}`,
      grade,
      topic,
      content: newContent,
    };
    const updated = [item, ...history.filter((h) => h.topic !== topic)].slice(0, 10);
    setHistory(updated);
    try {
      localStorage.setItem('ngu_van_thcs_history', JSON.stringify(updated));
    } catch {
      //
    }
  };

  // Switch Mode Handler
  const handleSelectMode = (newMode: 'mode1' | 'mode2' | 'mode3') => {
    setCurrentMode(newMode);
    setErrorMessage(null);
    setCalculatedScore(null);
    setActiveSlideIndex(0);

    // Switch default preset matching the new mode
    const preset = SAMPLE_PRESETS.find((p) => p.mode === newMode);
    if (preset) {
      setGrade(preset.grade);
      setTopic(preset.topic);
      setDuration(preset.duration);
      setContent(preset.content);
    }
  };

  // Quick Preset Loader
  const handleLoadPreset = (preset: PedagogicalPreset) => {
    setCurrentMode(preset.mode);
    setGrade(preset.grade);
    setCurriculum(preset.curriculum);
    setTopic(preset.topic);
    setDuration(preset.duration);
    if (preset.examType) setExamType(preset.examType);
    setContent(preset.content);
    setErrorMessage(null);
    setCalculatedScore(null);
    setActiveSlideIndex(0);
  };

  // Direct Textbook Lesson Selector
  const handleSelectTextbookLesson = (lesson: TextbookLesson) => {
    setGrade(lesson.grade);
    setCurriculum(lesson.curriculum);
    setTopic(lesson.title);
    setDuration(lesson.duration);
    setObjectives(lesson.objectives);
    setSelectedTextbookId(lesson.id);
    setSelectedUnit(lesson.unit);
    if (lesson.keyPassage) {
      setAdditionalNotes(`Ngữ liệu / Tác giả tham khảo: ${lesson.keyPassage}`);
    }
  };

  // Generation Handler
  const handleGenerate = async () => {
    if (!topic.trim()) {
      setErrorMessage('Vui lòng nhập tên bài học hoặc chọn từ Kho SGK.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setCurrentStep(0);
    setCalculatedScore(null);

    // Step simulation
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 2500);

    try {
      const fullNotes = [
        objectives ? `Yêu cầu cần đạt (YCCĐ): ${objectives}` : '',
        additionalNotes ? `Ghi chú chuyên môn: ${additionalNotes}` : '',
        currentMode === 'mode3'
          ? `Tỉ lệ ma trận: Nhiều lựa chọn ${matrixWeights.mcq}%, Đúng/Sai ${matrixWeights.tf}%, Trả lời ngắn ${matrixWeights.sa}%, Tự luận ${matrixWeights.essay}%; Mức độ Biết ${matrixWeights.know}%, Hiểu ${matrixWeights.understand}%, Vận dụng ${matrixWeights.apply}%.`
          : '',
      ]
        .filter(Boolean)
        .join('. ');

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: currentMode,
          subject: 'Ngữ văn',
          grade,
          curriculum,
          topic,
          duration,
          examType: currentMode === 'mode3' ? examType : undefined,
          additionalNotes: fullNotes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Có lỗi xảy ra khi tạo tài liệu sư phạm.');
      }

      if (data.result) {
        setContent(data.result);
        saveToHistory(data.result);
        if (currentMode === 'mode2') {
          setPreviewTab('slideshow');
        } else {
          setPreviewTab('preview');
        }
      } else {
        throw new Error('Máy chủ không trả về nội dung.');
      }
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMessage(error.message || 'Lỗi kết nối với máy chủ AI Studio. Vui lòng thử lại.');
    } finally {
      clearInterval(stepInterval);
      setIsLoading(false);
    }
  };

  // Export to Word .docx
  const handleDownloadDocx = async () => {
    try {
      setIsExporting(true);
      const blob = await generateDocxBlob({
        title: `NguVanTHCS_${currentMode}_${grade}_${topic}`,
        subject: 'Ngữ văn',
        grade,
        curriculum,
        topic,
        mode: currentMode,
        content,
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const filePrefix = currentMode === 'mode1' ? 'KHBD_5512' : currentMode === 'mode2' ? 'Slide_BaiGiang_5512' : 'DeKiemTra_7991';
      a.download = `${filePrefix}_NguVan_${grade}_${topic.slice(0, 30).replace(/[^a-zA-Z0-9_-]/g, '_')}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setErrorMessage('Không thể tạo file Word. Vui lòng thử sao chép văn bản.');
    } finally {
      setIsExporting(false);
    }
  };

  // Copy to Clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      //
    }
  };

  // Parse slides for Mode 2 Slide Deck presentation
  const parseSlides = (): ParsedSlide[] => {
    const chunks = content.split(/(?=Slide\s+\d+:)/i);
    const valid = chunks.filter((c) => c.trim().match(/^Slide\s+\d+:/i));

    if (valid.length > 0) {
      return valid.map((c, i) => {
        const lines = c.trim().split('\n');
        const headline = lines.find((l) => l.toLowerCase().includes('headline') || l.toLowerCase().includes('tiêu đề')) || lines[0];
        const visual = lines.find((l) => l.toLowerCase().includes('gợi ý trực quan') || l.toLowerCase().includes('trực quan')) || '';
        const notes = lines.find((l) => l.toLowerCase().includes('speaker notes') || l.toLowerCase().includes('ghi chú')) || '';
        const bullets = lines.filter(
          (l) =>
            l.trim().startsWith('•') ||
            l.trim().startsWith('-') ||
            (l.trim().startsWith('+') && !l.toLowerCase().includes('headline')),
        );
        return {
          num: i + 1,
          title: lines[0] || `Slide ${i + 1}`,
          headline: headline.replace(/[-*•]?\s*(Headline|Tiêu đề):?\s*/i, '').trim(),
          bullets: bullets.map((b) => b.replace(/^[-*•+]\s*/, '').trim()),
          visual: visual.replace(/[-*•]?\s*Gợi ý trực quan:?\s*/i, '').trim(),
          notes: notes.replace(/[-*•]?\s*(Ghi chú của giáo viên|Speaker Notes|Lời giảng):?\s*/i, '').trim(),
          raw: c,
        };
      });
    }

    // Fallback: If content doesn't have "Slide X:", split by major headers
    const sectionChunks = content.split(/(?=#{1,3}\s+|[I|V|X]+\.\s+|Hoạt động\s+\d+:)/i).filter((c) => c.trim().length > 20);
    if (sectionChunks.length > 0) {
      return sectionChunks.slice(0, 12).map((c, i) => {
        const lines = c.trim().split('\n');
        return {
          num: i + 1,
          title: lines[0]?.replace(/[#*]/g, '').trim() || `Slide ${i + 1}`,
          headline: lines[0]?.replace(/[#*]/g, '').trim() || `Nội dung phần ${i + 1}`,
          bullets: lines.slice(1, 6).filter((l) => l.trim().length > 0).map((l) => l.replace(/^[-*•+]\s*/, '').trim()),
          visual: 'Sơ đồ tư duy và hình ảnh minh họa bài học Ngữ văn.',
          notes: 'Giáo viên phân tích, dẫn dắt học sinh khai thác nội dung.',
          raw: c,
        };
      });
    }

    return [];
  };

  const parsedSlides = parseSlides();
  const currentSlide = parsedSlides[activeSlideIndex] || parsedSlides[0];

  // Keyboard navigation for presentation mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentMode === 'mode2' && (previewTab === 'slideshow' || isPresentationFullScreen)) {
        if (e.key === 'ArrowRight' || e.key === 'Space') {
          setActiveSlideIndex((prev) => Math.min(parsedSlides.length - 1, prev + 1));
        } else if (e.key === 'ArrowLeft') {
          setActiveSlideIndex((prev) => Math.max(0, prev - 1));
        } else if (e.key === 'Escape') {
          setIsPresentationFullScreen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentMode, previewTab, isPresentationFullScreen, parsedSlides.length]);

  // Mode 3 Student Score Simulator
  const handleScoreSimulate = () => {
    let score = 0;
    // MCQ: 6 questions (0.25đ each = 1.5đ)
    Object.keys(studentMCQ).forEach(() => {
      score += 0.25;
    });

    // TF: 4 sub-questions rule of CV 7991 (0.1, 0.25, 0.5, 1.0)
    const tfCount = Object.values(studentTF).filter((v) => v === 'Đúng').length;
    if (tfCount === 1) score += 0.1;
    else if (tfCount === 2) score += 0.25;
    else if (tfCount === 3) score += 0.5;
    else if (tfCount === 4) score += 1.0;

    // Short answers: 3 questions (1.0đ each = 3.0đ)
    Object.values(studentSA).forEach((val) => {
      if (val.trim()) score += 1.0;
    });

    setCalculatedScore(Math.min(6.0, Number(score.toFixed(2))));
  };

  return (
    <div className="min-h-screen bg-slate-100/80 flex flex-col font-sans text-slate-800 antialiased">
      {/* ================= TOP GOVERNMENT ADMINISTRATIVE HEADER ================= */}
      <div className="bg-red-800 text-amber-100 text-[11px] sm:text-xs py-1.5 px-4 text-center tracking-wider font-semibold flex items-center justify-center gap-2 border-b border-red-950 shrink-0">
        <span className="text-yellow-300">★</span>
        <span>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM — Độc lập - Tự do - Hạnh phúc</span>
        <span className="text-yellow-300">★</span>
      </div>

      {/* ================= APP NAVIGATION NAVBAR ================= */}
      <header className="bg-white border-b border-slate-200 shadow-2xs sticky top-0 z-30 shrink-0">
        <div className="max-w-7xl mx-auto px-3 sm:px-5 py-2.5 flex items-center justify-between gap-3">
          {/* Logo & Brand Title */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors md:hidden"
              title="Mở thanh điều hướng"
            >
              {sidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
            </button>

            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-700 via-rose-800 to-indigo-900 text-white flex items-center justify-center shadow-xs shadow-red-500/20 shrink-0">
              <BookOpen className="w-5 h-5 text-yellow-300" />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                  CHUYÊN GIA SƯ PHẠM NGỮ VĂN THCS
                </h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  Lớp 6 — Lớp 9
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Chuẩn CV 5512 & CV 7991
                </span>
              </div>
            </div>
          </div>

          {/* Quick Help & Norms Guide Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsNormsModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-300 transition-colors shadow-2xs"
            >
              <HelpCircle className="w-3.5 h-3.5 text-sky-700" />
              <span className="hidden sm:inline">Quy chuẩn CV 5512 & 7991</span>
              <span className="sm:hidden">Quy chuẩn</span>
            </button>
          </div>
        </div>
      </header>

      {/* ================= 3-COLUMN SPLIT-VIEW DASHBOARD ================= */}
      <div className="flex-1 flex overflow-hidden">
        {/* ================= COLUMN A: SIDEBAR ================= */}
        <aside
          className={`${
            sidebarOpen ? 'w-64 sm:w-72' : 'w-0'
          } shrink-0 bg-white border-r border-slate-200 flex flex-col transition-all duration-300 ease-in-out overflow-hidden z-20 print:hidden`}
        >
          <div className="p-4 border-b border-slate-100 space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              CHỨC NĂNG SOẠN THẢO CHÍNH
            </span>

            {/* Mode Tab 1: KHBD 5512 */}
            <button
              onClick={() => handleSelectMode('mode1')}
              className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl text-left transition-all border ${
                currentMode === 'mode1'
                  ? 'bg-sky-50/80 text-sky-950 border-sky-300 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 border-transparent'
              }`}
            >
              <FileText className={`w-4 h-4 mt-0.5 shrink-0 ${currentMode === 'mode1' ? 'text-sky-600' : 'text-slate-400'}`} />
              <div>
                <span className="text-xs sm:text-sm block font-bold">1. Kế hoạch bài dạy</span>
                <span className="text-[11px] text-slate-500 block font-normal">Giáo án Phụ lục IV - CV 5512</span>
              </div>
            </button>

            {/* Mode Tab 2: Slide bài giảng (CV 5512) - Updated per instruction */}
            <button
              onClick={() => handleSelectMode('mode2')}
              className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl text-left transition-all border ${
                currentMode === 'mode2'
                  ? 'bg-sky-50/80 text-sky-950 border-sky-300 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 border-transparent'
              }`}
            >
              <Presentation className={`w-4 h-4 mt-0.5 shrink-0 ${currentMode === 'mode2' ? 'text-indigo-600' : 'text-slate-400'}`} />
              <div>
                <span className="text-xs sm:text-sm block font-bold">2. Slide bài giảng</span>
                <span className="text-[11px] text-slate-500 block font-normal">Slide trình chiếu (CV 5512)</span>
              </div>
            </button>

            {/* Mode Tab 3: Exam 7991 */}
            <button
              onClick={() => handleSelectMode('mode3')}
              className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl text-left transition-all border ${
                currentMode === 'mode3'
                  ? 'bg-teal-50/80 text-teal-950 border-teal-300 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 border-transparent'
              }`}
            >
              <TableIcon className={`w-4 h-4 mt-0.5 shrink-0 ${currentMode === 'mode3' ? 'text-teal-600' : 'text-slate-400'}`} />
              <div>
                <span className="text-xs sm:text-sm block font-bold">3. Ma trận & Đề kiểm tra</span>
                <span className="text-[11px] text-teal-700 block font-normal font-semibold">Công văn 7991 Mới nhất</span>
              </div>
            </button>
          </div>

          {/* Quick Presets for Literature Grades 6-9 */}
          <div className="p-4 border-b border-slate-100 flex-1 overflow-y-auto space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                MẪU CHUẨN NGỮ VĂN
              </span>
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <div className="space-y-1.5">
              {SAMPLE_PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleLoadPreset(p)}
                  className={`w-full text-left p-2 rounded-lg text-xs transition-colors border ${
                    topic === p.topic && currentMode === p.mode
                      ? 'bg-amber-50 text-amber-950 border-amber-300 font-medium'
                      : 'hover:bg-slate-50 text-slate-700 border-slate-200/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800">{p.grade}</span>
                    <span className="text-[10px] px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded">
                      {p.mode === 'mode1' ? 'CV 5512' : p.mode === 'mode2' ? 'Slide' : 'CV 7991'}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{p.title}</span>
                </button>
              ))}
            </div>

            {/* Recent History */}
            {history.length > 0 && (
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <History className="w-3 h-3" />
                    LỊCH SỬ TẠO GẦN ĐÂY
                  </span>
                  <button
                    onClick={() => {
                      setHistory([]);
                      localStorage.removeItem('ngu_van_thcs_history');
                    }}
                    className="text-[10px] text-rose-500 hover:underline"
                  >
                    Xóa
                  </button>
                </div>
                <div className="space-y-1">
                  {history.slice(0, 5).map((h) => (
                    <button
                      key={h.id}
                      onClick={() => {
                        setCurrentMode(h.mode);
                        setGrade(h.grade as 'Lớp 6' | 'Lớp 7' | 'Lớp 8' | 'Lớp 9');
                        setTopic(h.topic);
                        setContent(h.content);
                      }}
                      className="w-full text-left p-1.5 rounded hover:bg-slate-50 text-[11px] text-slate-600 truncate block border border-transparent hover:border-slate-200"
                    >
                      • {h.grade}: {h.topic}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Secure Server Proxy Indicator */}
          <div className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Kết nối Máy chủ Gemini An toàn</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-tight">
              Tạo tự động bám sát Công văn 5512 & 7991 của Bộ Giáo dục và Đào tạo.
            </p>
          </div>
        </aside>

        {/* ================= COLUMN B: FORM INPUT PANEL ================= */}
        <section
          className={`${
            fullscreenPreview ? 'hidden' : 'w-full md:w-[420px] lg:w-[450px]'
          } shrink-0 bg-white border-r border-slate-200 flex flex-col overflow-y-auto print:hidden`}
        >
          {/* Form Header */}
          <div className="p-3.5 border-b border-slate-100 bg-gradient-to-r from-slate-50 via-sky-50/40 to-slate-50">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-sky-600" />
                THÔNG SỐ SOẠN THẢO
              </span>
              <span className="text-[11px] text-sky-700 font-semibold bg-sky-100 px-2 py-0.5 rounded-full">
                {currentMode === 'mode1' && 'Giáo án (CV 5512)'}
                {currentMode === 'mode2' && 'Slide bài giảng (CV 5512)'}
                {currentMode === 'mode3' && 'Đề thi (CV 7991)'}
              </span>
            </div>
          </div>

          {/* Form Fields */}
          <div className="p-4 space-y-3.5 flex-1">
            {/* 1. SELECT GRADE & CURRICULUM */}
            <div className="space-y-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Khối lớp THCS:
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {THCS_GRADES.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGrade(g)}
                      className={`py-1.5 px-1 text-center text-xs font-bold rounded-lg border transition-all ${
                        grade === g
                          ? 'bg-sky-700 text-white border-sky-800 shadow-2xs'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Bộ sách giáo khoa:
                </label>
                <div className="flex items-center justify-between p-2 rounded-lg bg-sky-50 border border-sky-300">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-5 h-5 rounded-full bg-sky-700 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-sky-950 truncate">
                        Kết nối tri thức với cuộc sống
                      </div>
                      <div className="text-[10px] text-sky-700 font-medium truncate">
                        NXB Giáo dục Việt Nam (Bộ GD&ĐT ban hành)
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-sky-200 text-sky-900 shrink-0">
                    Chính thức
                  </span>
                </div>
              </div>
            </div>

            {/* 2. KHO SÁCH GIÁO KHOA CHUẨN: CHỌN TRỰC TIẾP CHỦ ĐỀ & BÀI DẠY */}
            <div className="p-3 bg-amber-50/80 border border-amber-300 rounded-xl space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                  KHO SGK: CHỌN CHỦ ĐỀ & BÀI DẠY
                </span>
                <button
                  type="button"
                  onClick={() => setIsTextbookModalOpen(true)}
                  className="text-[11px] font-bold text-amber-900 hover:text-amber-950 bg-white px-2 py-0.5 rounded-md border border-amber-300 shadow-2xs hover:bg-amber-100 transition-colors"
                >
                  Tra cứu chi tiết »
                </button>
              </div>

              {/* Dropdown 1: Chủ đề / Bài lớn trong SGK */}
              {availableUnits.length > 0 && (
                <div>
                  <label className="block text-[11px] font-semibold text-amber-900 mb-1">
                    Chọn Bài / Chủ đề lớn trong SGK:
                  </label>
                  <select
                    value={selectedUnit}
                    onChange={(e) => {
                      const u = e.target.value;
                      setSelectedUnit(u);
                      const matching = availableLessons.filter((l) => l.unit === u);
                      if (matching.length > 0) {
                        handleSelectTextbookLesson(matching[0]);
                      }
                    }}
                    className="w-full text-xs rounded-lg border border-amber-300 bg-white px-2.5 py-2 text-slate-800 font-medium focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  >
                    {availableUnits.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Dropdown 2: Văn bản / Bài dạy chính xác */}
              <div>
                <label className="block text-[11px] font-semibold text-amber-900 mb-1">
                  Chọn Văn bản / Bài dạy chính xác:
                </label>
                <select
                  value={selectedTextbookId}
                  onChange={(e) => {
                    const found = TEXTBOOK_REPOSITORY.find((l) => l.id === e.target.value);
                    if (found) handleSelectTextbookLesson(found);
                  }}
                  className="w-full text-xs rounded-lg border border-amber-300 bg-white px-2.5 py-2 text-slate-800 font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                >
                  <option value="">-- Chọn bài dạy từ kho SGK ({grade}) --</option>
                  {unitLessons.map((l) => (
                    <option key={l.id} value={l.id}>
                      [{l.lessonType}] {l.title.replace(/^Văn bản:\s*/, '')}
                    </option>
                  ))}
                  {/* Fallback to other lessons in grade if none in selected unit */}
                  {unitLessons.length === 0 &&
                    availableLessons.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.unit}: {l.title.replace(/^Văn bản:\s*/, '')}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* 3. TÊN BÀI HỌC / VĂN BẢN ĐÃ CHỌN (CHO PHÉP CHỈNH SỬA) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {currentMode === 'mode3' ? 'Tên bài học / Phạm vi ngữ liệu kiểm tra' : 'Tên bài học / Văn bản dạy học'}:
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Ví dụ: Đồng chí (Chính Hữu) hoặc Bài học đường đời đầu tiên..."
                className="w-full text-xs sm:text-sm font-semibold rounded-lg border border-slate-300 px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-white shadow-2xs"
              />
            </div>

            {/* ================= 4. PRIMARY ACTION BUTTON: PLACED PROMINENTLY RIGHT HERE! ================= */}
            <div className="pt-1 pb-1 space-y-2">
              <button
                onClick={handleGenerate}
                disabled={isLoading || !topic.trim()}
                className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-red-700 via-rose-700 to-indigo-800 hover:from-red-800 hover:to-indigo-900 shadow-md shadow-red-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-yellow-300" />
                    <span>Đang khởi tạo theo chuẩn Bộ GD&ĐT...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                    <span>
                      {currentMode === 'mode1' && 'Tạo Kế hoạch bài dạy ngay (CV 5512)'}
                      {currentMode === 'mode2' && 'Tạo Slide bài giảng ngay (CV 5512)'}
                      {currentMode === 'mode3' && 'Tạo Ma trận & Đề kiểm tra ngay (CV 7991)'}
                    </span>
                  </>
                )}
              </button>

              {/* Progress Stepper when loading */}
              {isLoading && (
                <div className="p-3 bg-sky-50 rounded-xl border border-sky-300 shadow-2xs space-y-2 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-sky-900 flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-sky-600" />
                      ĐANG TẠO SẢN PHẨM SƯ PHẠM
                    </span>
                    <span className="font-mono text-[11px] text-slate-500">
                      Bước {currentStep + 1}/{STEPS.length}
                    </span>
                  </div>

                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-red-600 to-indigo-600 h-full transition-all duration-500 rounded-full"
                      style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-slate-600 italic">{STEPS[currentStep]}</p>
                </div>
              )}

              {/* Error Message */}
              {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-300 rounded-lg text-xs text-rose-800 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>

            {/* ================= 5. COLLAPSIBLE ADVANCED PARAMETERS (BELOW BUTTON) ================= */}
            <div className="border-t border-slate-200/80 pt-2">
              <button
                type="button"
                onClick={() => setShowAdvancedParams(!showAdvancedParams)}
                className="w-full py-1.5 px-2 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center justify-between transition-colors bg-slate-50 hover:bg-slate-100 rounded-lg"
              >
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-slate-500" />
                  Tùy chỉnh thời lượng, YCCĐ & ghi chú (nâng cao)
                </span>
                {showAdvancedParams ? (
                  <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>

              {showAdvancedParams && (
                <div className="mt-2.5 space-y-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  {/* Duration & Exam Type */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        {currentMode === 'mode3' ? 'Thời gian làm bài' : 'Thời lượng tiết dạy'}
                      </label>
                      <input
                        type="text"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="Ví dụ: 2 tiết (90 phút)"
                        className="w-full text-xs rounded-lg border border-slate-300 px-2.5 py-1.5 text-slate-800 bg-white focus:outline-hidden focus:ring-1 focus:ring-sky-500"
                      />
                    </div>

                    {currentMode === 'mode3' ? (
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Kì thi</label>
                        <select
                          value={examType}
                          onChange={(e) => setExamType(e.target.value)}
                          className="w-full text-xs rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-sky-500"
                        >
                          <option value="Kiểm tra thường xuyên">Thường xuyên</option>
                          <option value="Kiểm tra giữa học kì I">Giữa HK1</option>
                          <option value="Kiểm tra cuối học kì I">Cuối HK1</option>
                          <option value="Kiểm tra giữa học kì II">Giữa HK2</option>
                          <option value="Kiểm tra cuối học kì II">Cuối HK2</option>
                        </select>
                      </div>
                    ) : (
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Hình thức</label>
                        <input
                          type="text"
                          defaultValue="Dạy học trực tiếp tại lớp"
                          className="w-full text-xs rounded-lg border border-slate-300 px-2.5 py-1.5 text-slate-700 bg-slate-100 focus:outline-hidden"
                        />
                      </div>
                    )}
                  </div>

                  {/* Special Section: CV 7991 Matrix Weight Customizer (Only in Mode 3) */}
                  {currentMode === 'mode3' && (
                    <div className="p-2.5 bg-teal-50 border border-teal-200 rounded-lg space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-bold text-teal-900">
                        <span>TỈ LỆ MA TRẬN ĐỀ THI (CV 7991):</span>
                        <span className="font-mono">10,0 điểm (100%)</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                        <div className="bg-white p-1.5 rounded border border-teal-200">
                          <span className="text-slate-500">TNKQ Nhiều lựa chọn:</span>
                          <span className="font-bold text-teal-800 block">30% (3,0 điểm)</span>
                        </div>
                        <div className="bg-white p-1.5 rounded border border-teal-200">
                          <span className="text-slate-500">TNKQ Đúng/Sai (4 ý):</span>
                          <span className="font-bold text-teal-800 block">20% (Thang 0.1-1.0đ)</span>
                        </div>
                        <div className="bg-white p-1.5 rounded border border-teal-200">
                          <span className="text-slate-500">TNKQ Trả lời ngắn:</span>
                          <span className="font-bold text-teal-800 block">20% (2,0 điểm)</span>
                        </div>
                        <div className="bg-white p-1.5 rounded border border-teal-200">
                          <span className="text-slate-500">Tự luận (Bài viết):</span>
                          <span className="font-bold text-teal-800 block">30% (Rubric 0,25đ)</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Yêu cầu cần đạt (YCCĐ) */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Yêu cầu cần đạt (YCCĐ - CT GDPT 2018):
                    </label>
                    <textarea
                      rows={2}
                      value={objectives}
                      onChange={(e) => setObjectives(e.target.value)}
                      placeholder="Nhập yêu cầu cần đạt về năng lực đặc thù, phẩm chất..."
                      className="w-full text-xs rounded-lg border border-slate-300 p-2 text-slate-800 bg-white focus:outline-hidden focus:ring-1 focus:ring-sky-500"
                    />

                    {/* Quick suggestion tags */}
                    <div className="mt-1 flex flex-wrap gap-1">
                      {SUGGESTED_OBJECTIVES.slice(0, 2).map((obj, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setObjectives((prev) => (prev ? `${prev}; ${obj}` : obj))}
                          className="text-[10px] px-1.5 py-0.5 bg-slate-200/80 hover:bg-slate-300 text-slate-700 rounded transition-colors truncate max-w-[200px]"
                        >
                          + {obj.slice(0, 26)}...
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Ghi chú sư phạm */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Ghi chú sư phạm & Thiết bị dạy học:
                    </label>
                    <input
                      type="text"
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      placeholder="Phiếu học tập, tranh ảnh bối cảnh, phân hóa học sinh..."
                      className="w-full text-xs rounded-lg border border-slate-300 px-2.5 py-1.5 text-slate-800 bg-white focus:outline-hidden focus:ring-1 focus:ring-sky-500"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ================= COLUMN C: PREVIEW & INTERACTION PANEL ================= */}
        <main className="flex-1 flex flex-col bg-slate-100/60 overflow-hidden relative">
          {/* Preview Toolbar */}
          <div className="bg-white border-b border-slate-200 px-4 py-2 flex flex-wrap items-center justify-between gap-2.5 print:hidden">
            {/* View Tab Switchers */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
              {currentMode === 'mode2' ? (
                <>
                  <button
                    onClick={() => setPreviewTab('slideshow')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                      previewTab === 'slideshow' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Presentation className="w-3.5 h-3.5" />
                    <span>Trình chiếu Slide ({parsedSlides.length})</span>
                  </button>

                  <button
                    onClick={() => setPreviewTab('grid')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                      previewTab === 'grid' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Grid className="w-3.5 h-3.5" />
                    <span>Lưới toàn cảnh</span>
                  </button>

                  <button
                    onClick={() => setPreviewTab('preview')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                      previewTab === 'preview' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Nội dung chi tiết</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setPreviewTab('preview')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                    previewTab === 'preview' ? 'bg-white text-sky-800 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Xem văn bản chuẩn</span>
                </button>
              )}

              <button
                onClick={() => setPreviewTab('edit')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  previewTab === 'edit' ? 'bg-white text-sky-800 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Chỉnh sửa trực tiếp</span>
              </button>

              {currentMode === 'mode3' && (
                <button
                  onClick={() => setPreviewTab('interactive')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                    previewTab === 'interactive' ? 'bg-teal-700 text-white shadow-2xs' : 'text-teal-800 hover:bg-slate-200/60'
                  }`}
                >
                  <PlayCircle className="w-3.5 h-3.5" />
                  <span>Làm thử & Chấm 7991</span>
                </button>
              )}
            </div>

            {/* Document Export Actions */}
            <div className="flex items-center gap-1.5">
              {currentMode === 'mode2' && (
                <button
                  onClick={() => setIsPresentationFullScreen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-md transition-colors"
                  title="Phóng to trình chiếu trên màn hình lớp học"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Toàn màn hình</span>
                </button>
              )}

              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-md transition-colors"
                title="Sao chép toàn bộ văn bản để dán vào Microsoft Word hoặc Docs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Đã sao chép!' : currentMode === 'mode2' ? 'Sao chép Slide' : 'Sao chép'}</span>
              </button>

              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-md transition-colors"
                title="In văn bản hoặc lưu dưới dạng PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{currentMode === 'mode2' ? 'In Slide' : 'In / PDF'}</span>
              </button>

              <button
                onClick={handleDownloadDocx}
                disabled={isExporting}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-700 hover:bg-indigo-800 rounded-md shadow-2xs transition-colors disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isExporting ? 'Đang tạo...' : 'Xuất Word (.docx)'}</span>
              </button>

              <button
                onClick={() => setFullscreenPreview(!fullscreenPreview)}
                className="p-1.5 text-slate-500 hover:text-slate-800 rounded-md hover:bg-slate-100 transition-colors hidden sm:block"
                title={fullscreenPreview ? 'Thu nhỏ cửa sổ' : 'Phóng to toàn màn hình'}
              >
                {fullscreenPreview ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Preview Canvas Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto space-y-4">
              {/* TAB: SLIDESHOW PRESENTATION (FOR MODE 2) */}
              {currentMode === 'mode2' && previewTab === 'slideshow' && currentSlide && (
                <div className="space-y-4">
                  {/* Presentation Slide Canvas */}
                  <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl shadow-xl overflow-hidden border border-slate-700 aspect-16/10 sm:aspect-16/9 flex flex-col justify-between p-6 sm:p-10 relative">
                    {/* Top slide bar */}
                    <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-300 text-xs font-mono font-bold border border-indigo-400/30">
                          SLIDE {currentSlide.num} / {parsedSlides.length}
                        </span>
                        <span className="text-xs text-slate-300 truncate max-w-xs sm:max-w-md">
                          {currentSlide.title}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">
                        Ngữ văn {grade} • {curriculum.split(' ')[0]}
                      </span>
                    </div>

                    {/* Headline and bullets */}
                    <div className="my-auto py-4">
                      <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight text-yellow-300 mb-6 drop-shadow-xs">
                        {currentSlide.headline}
                      </h2>

                      <div className="space-y-3 max-w-3xl">
                        {currentSlide.bullets.length > 0 ? (
                          currentSlide.bullets.map((b, idx) => (
                            <div key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-100 leading-relaxed">
                              <span className="w-2 h-2 rounded-full bg-indigo-400 shrink-0 mt-2"></span>
                              <span>{b}</span>
                            </div>
                          ))
                        ) : (
                          <p className="text-slate-300 text-sm italic">
                            Nội dung slide: {currentSlide.raw.slice(0, 160)}...
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Visual suggestion */}
                    {currentSlide.visual && (
                      <div className="bg-slate-800/80 rounded-lg p-3 border border-slate-700 flex items-start gap-2.5 text-xs text-slate-300">
                        <ImageIcon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-emerald-300">Gợi ý trực quan:</strong> {currentSlide.visual}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Navigation Controls */}
                  <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                    <button
                      onClick={() => setActiveSlideIndex((prev) => Math.max(0, prev - 1))}
                      disabled={activeSlideIndex === 0}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:pointer-events-none"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Slide trước</span>
                    </button>

                    {/* Slide thumbnails / numbers */}
                    <div className="flex items-center gap-1.5 overflow-x-auto max-w-md py-1 px-2">
                      {parsedSlides.map((s, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveSlideIndex(idx)}
                          className={`w-7 h-7 rounded-md text-xs font-mono font-bold transition-all shrink-0 ${
                            activeSlideIndex === idx
                              ? 'bg-indigo-700 text-white ring-2 ring-indigo-400 ring-offset-1'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {s.num}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setActiveSlideIndex((prev) => Math.min(parsedSlides.length - 1, prev + 1))}
                      disabled={activeSlideIndex === parsedSlides.length - 1}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:pointer-events-none"
                    >
                      <span>Slide sau</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Teacher Speaker Notes Tray */}
                  <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 shadow-2xs">
                    <div className="flex items-center gap-2 text-amber-900 font-bold text-sm mb-1.5">
                      <Mic className="w-4 h-4 text-amber-700" />
                      <span>Ghi chú của giáo viên (Speaker Notes - Lời giảng tương tác trên lớp):</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-serif italic pl-5 border-l-2 border-amber-400">
                      {currentSlide.notes || 'Giáo viên dẫn dắt, đặt câu hỏi gợi mở cho học sinh.'}
                    </p>
                  </div>
                </div>
              )}

              {/* TAB: GRID VIEW OF ALL SLIDES (FOR MODE 2) */}
              {currentMode === 'mode2' && previewTab === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {parsedSlides.map((s, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setActiveSlideIndex(idx);
                        setPreviewTab('slideshow');
                      }}
                      className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 hover:border-indigo-500 cursor-pointer transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-mono font-bold text-xs">
                            Slide {s.num}
                          </span>
                          <span className="text-[11px] text-slate-400">{s.title}</span>
                        </div>
                        <h4 className="text-base font-bold text-slate-900 mb-3">{s.headline}</h4>

                        <div className="space-y-1.5 mb-4">
                          {s.bullets.map((b, bIdx) => (
                            <div key={bIdx} className="text-xs text-slate-700 flex items-start gap-1.5">
                              <span className="text-indigo-500">•</span>
                              <span>{b}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                        {s.visual && (
                          <p className="text-slate-600">
                            <strong className="text-emerald-700">Trực quan:</strong> {s.visual}
                          </p>
                        )}
                        {s.notes && (
                          <p className="text-amber-900 bg-amber-50/60 p-2 rounded italic">
                            <strong>Lời giảng:</strong> {s.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB: STANDARD DOCUMENT / PAPER PREVIEW (FOR MODE 1, 3, AND MODE 2 DETAILED TEXT) */}
              {previewTab === 'preview' && (
                <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 sm:p-10 font-serif leading-relaxed text-slate-900 min-h-[800px]">
                  {/* Administrative Letterhead Header */}
                  <div className="border-b border-slate-300 pb-5 mb-6 text-center font-sans">
                    <div className="flex flex-col sm:flex-row justify-between text-xs sm:text-sm mb-3 text-slate-600">
                      <div className="text-left">
                        <span className="font-bold uppercase block text-slate-800">
                          PHÒNG GD&ĐT ....................
                        </span>
                        <span className="block text-slate-700">TRƯỜNG THCS ....................</span>
                        <span>Tổ chuyên môn: Ngữ văn</span>
                      </div>
                      <div className="text-center sm:text-right mt-2 sm:mt-0">
                        <span className="font-bold uppercase block text-slate-800">
                          CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                        </span>
                        <span className="font-semibold underline">Độc lập - Tự do - Hạnh phúc</span>
                      </div>
                    </div>

                    <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-4 tracking-tight">
                      {currentMode === 'mode1' && 'KẾ HOẠCH BÀI DẠY (GIÁO ÁN)'}
                      {currentMode === 'mode2' && 'BỘ SLIDE BÀI GIẢNG ĐIỆN TỬ'}
                      {currentMode === 'mode3' && 'MA TRẬN, BẢN ĐẶC TẢ VÀ ĐỀ KIỂM TRA ĐỊNH KÌ'}
                    </h1>
                    <p className="text-sm font-semibold text-sky-900 mt-1">
                      Môn: Ngữ văn — {grade} | Bộ sách: {curriculum}
                    </p>
                    <p className="text-xs text-slate-600 italic">
                      {currentMode === 'mode1' && 'Căn cứ Phụ lục IV, Công văn số 5512/BGDĐT-GDTrH'}
                      {currentMode === 'mode2' && 'Thiết kế theo tiến trình 4 hoạt động Công văn 5512/BGDĐT-GDTrH'}
                      {currentMode === 'mode3' && 'Căn cứ Công văn số 7991/BGDĐT-GDTrH ngày 17/12/2024 của Bộ GDĐT'}
                    </p>
                  </div>

                  {/* Rendered Document Body */}
                  <div className="text-sm sm:text-base">
                    <MarkdownRenderer content={content} />
                  </div>
                </div>
              )}

              {/* TAB: INLINE DIRECT TEXT EDITOR */}
              {previewTab === 'edit' && (
                <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Edit3 className="w-4 h-4 text-sky-600" />
                      <span>Chỉnh sửa văn bản trực tiếp (Tự động cập nhật vào bản in và file Word):</span>
                    </div>
                    <button
                      onClick={() => setPreviewTab(currentMode === 'mode2' ? 'slideshow' : 'preview')}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-md shadow-2xs inline-flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Lưu & Xem kết quả</span>
                    </button>
                  </div>
                  <textarea
                    rows={28}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full font-mono text-xs sm:text-sm p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-hidden leading-relaxed"
                  />
                </div>
              )}

              {/* TAB: INTERACTIVE CV 7991 STUDENT PRACTICE TEST SIMULATOR */}
              {previewTab === 'interactive' && currentMode === 'mode3' && (
                <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 space-y-6 font-sans">
                  <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl flex items-start gap-3">
                    <PlayCircle className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm text-teal-950">
                      <strong className="block text-sm font-bold">
                        Mô phỏng làm bài & Chấm điểm tự động theo chuẩn Công văn 7991/BGDĐT-GDTrH:
                      </strong>
                      Hệ thống tự động áp dụng công thức tính điểm chính xác tuyệt đối: câu trắc nghiệm nhiều lựa chọn (0,25đ/câu), trắc nghiệm Đúng/Sai (Đúng 1 ý: 0.1đ; 2 ý: 0.25đ; 3 ý: 0.5đ; 4 ý: 1.0đ) và trắc nghiệm trả lời ngắn.
                    </div>
                  </div>

                  {/* Part I: MCQ practice 1-6 */}
                  <div className="border border-slate-200 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="font-bold text-sm text-slate-800">
                        1. Trắc nghiệm nhiều lựa chọn (6 câu - 1,5 điểm)
                      </span>
                      <span className="text-xs text-slate-500">0,25 đ/câu</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {Array.from({ length: 6 }, (_, i) => i + 1).map((qNum) => (
                        <div key={qNum} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                          <span className="font-semibold block mb-1.5 text-slate-700">Câu {qNum}:</span>
                          <div className="flex gap-1.5">
                            {['A', 'B', 'C', 'D'].map((opt) => (
                              <button
                                key={opt}
                                onClick={() => setStudentMCQ((prev) => ({ ...prev, [qNum]: opt }))}
                                className={`w-7 h-7 rounded text-xs font-bold transition-colors ${
                                  studentMCQ[qNum] === opt
                                    ? 'bg-sky-700 text-white'
                                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Part II: True/False practice */}
                  <div className="border border-slate-200 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="font-bold text-sm text-slate-800">
                        2. Trắc nghiệm Đúng/Sai (1 câu 4 lệnh - 1,0 điểm)
                      </span>
                      <span className="text-xs text-teal-700 font-semibold">
                        Thang điểm: 1 ý = 0.1đ | 2 ý = 0.25đ | 3 ý = 0.5đ | 4 ý = 1.0đ
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      {(['a', 'b', 'c', 'd'] as const).map((sub) => (
                        <div
                          key={sub}
                          className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200"
                        >
                          <span className="text-slate-800 font-medium">Ý lệnh {sub})</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setStudentTF((prev) => ({ ...prev, [sub]: 'Đúng' }))}
                              className={`px-3 py-1 rounded text-xs font-semibold ${
                                studentTF[sub] === 'Đúng'
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                              }`}
                            >
                              Đúng
                            </button>
                            <button
                              onClick={() => setStudentTF((prev) => ({ ...prev, [sub]: 'Sai' }))}
                              className={`px-3 py-1 rounded text-xs font-semibold ${
                                studentTF[sub] === 'Sai'
                                    ? 'bg-rose-600 text-white'
                                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                              }`}
                            >
                              Sai
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Part III: Short answer practice */}
                  <div className="border border-slate-200 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="font-bold text-sm text-slate-800">
                        3. Trắc nghiệm trả lời ngắn (3 câu - 3,0 điểm)
                      </span>
                      <span className="text-xs text-slate-500">1,0 đ/câu</span>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      {[1, 2, 3].map((qNum) => (
                        <div key={qNum} className="space-y-1">
                          <label className="font-semibold text-slate-700">Câu {qNum} (Điền kết quả / câu trả lời ngắn):</label>
                          <input
                            type="text"
                            value={studentSA[qNum] || ''}
                            onChange={(e) => setStudentSA((prev) => ({ ...prev, [qNum]: e.target.value }))}
                            placeholder="Nhập nội dung trả lời ngắn..."
                            className="w-full p-2 border border-slate-300 rounded-lg text-xs text-slate-800 bg-white focus:ring-1 focus:ring-sky-500 focus:outline-hidden"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Simulator Action Buttons */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => {
                        setStudentMCQ({});
                        setStudentTF({});
                        setStudentSA({});
                        setCalculatedScore(null);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800 font-medium"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Làm lại từ đầu</span>
                    </button>

                    <button
                      onClick={handleScoreSimulate}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs sm:text-sm rounded-lg shadow-2xs transition-colors"
                    >
                      <Award className="w-4 h-4 text-yellow-300" />
                      <span>Chấm điểm Phần Đọc hiểu (CV 7991)</span>
                    </button>
                  </div>

                  {/* Calculated Score Result Box */}
                  {calculatedScore !== null && (
                    <div className="p-5 bg-teal-50 border-2 border-teal-500 rounded-xl text-center space-y-2 animate-in fade-in duration-300">
                      <span className="text-xs uppercase font-bold text-teal-800 tracking-wider">
                        KẾT QUẢ ĐÁNH GIÁ PHẦN ĐỌC HIỂU
                      </span>
                      <div className="text-3xl sm:text-4xl font-black text-teal-900">
                        {calculatedScore} <span className="text-base font-normal text-slate-600">/ 5,5 điểm</span>
                      </div>
                      <p className="text-xs text-slate-600 max-w-md mx-auto">
                        (Phần II Viết chiếm 4,5 điểm được giáo viên chấm theo Rubric biểu điểm chia nhỏ 0,25đ chuẩn CT GDPT 2018).
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* ================= FULL-SCREEN PRESENTATION MODE FOR CLASSROOM (MODE 2) ================= */}
      {isPresentationFullScreen && currentSlide && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between p-8 sm:p-14 text-white">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded bg-indigo-600 font-bold font-mono text-sm">
                SLIDE {currentSlide.num} / {parsedSlides.length}
              </span>
              <span className="text-slate-300 text-sm font-medium">{currentSlide.title}</span>
            </div>
            <button
              onClick={() => setIsPresentationFullScreen(false)}
              className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors"
              title="Thoát trình chiếu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="max-w-5xl mx-auto my-auto w-full py-8">
            <h1 className="text-3xl sm:text-5xl font-black text-yellow-300 mb-8 leading-tight">
              {currentSlide.headline}
            </h1>
            <div className="space-y-5">
              {currentSlide.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-4 text-xl sm:text-2xl text-slate-100 font-medium">
                  <span className="w-3 h-3 rounded-full bg-indigo-400 shrink-0 mt-3"></span>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-800 pt-4 text-sm text-slate-400">
            <span>Dùng phím [←] và [→] hoặc phím Cách để chuyển Slide. Nhấn [ESC] để thoát.</span>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveSlideIndex((prev) => Math.max(0, prev - 1))}
                disabled={activeSlideIndex === 0}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded font-semibold disabled:opacity-30"
              >
                Trước
              </button>
              <button
                onClick={() => setActiveSlideIndex((prev) => Math.min(parsedSlides.length - 1, prev + 1))}
                disabled={activeSlideIndex === parsedSlides.length - 1}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded font-semibold disabled:opacity-30"
              >
                Tiếp theo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODALS ================= */}
      {/* Norms & Guidelines Modal */}
      <NormsModal isOpen={isNormsModalOpen} onClose={() => setIsNormsModalOpen(false)} />

      {/* Textbook Repository Modal */}
      <TextbookModal
        isOpen={isTextbookModalOpen}
        onClose={() => setIsTextbookModalOpen(false)}
        onSelectLesson={handleSelectTextbookLesson}
        currentCurriculum={curriculum}
        currentGrade={grade}
      />
    </div>
  );
}
