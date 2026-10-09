import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Search,
  Filter,
  Check,
  Sparkles,
  Layers,
  GraduationCap,
  Clock,
  Feather,
} from 'lucide-react';
import { TEXTBOOK_REPOSITORY, TextbookLesson } from '../data/textbookData';

interface TextbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLesson: (lesson: TextbookLesson) => void;
  currentCurriculum: string;
  currentGrade: string;
}

export const TextbookModal: React.FC<TextbookModalProps> = ({
  isOpen,
  onClose,
  onSelectLesson,
  currentCurriculum,
  currentGrade,
}) => {
  const [selectedCurriculum, setSelectedCurriculum] = useState<string>(currentCurriculum);
  const [selectedGrade, setSelectedGrade] = useState<string>(currentGrade);
  const [selectedTerm, setSelectedTerm] = useState<string>('Tất cả');
  const [selectedType, setSelectedType] = useState<string>('Tất cả');
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!isOpen) return null;

  // Filter lessons based on criteria
  const filteredLessons = TEXTBOOK_REPOSITORY.filter((item) => {
    if (selectedCurriculum !== 'Tất cả' && item.curriculum !== selectedCurriculum) {
      return false;
    }
    if (selectedGrade !== 'Tất cả' && item.grade !== selectedGrade) {
      return false;
    }
    if (selectedTerm !== 'Tất cả' && item.term !== selectedTerm) {
      return false;
    }
    if (selectedType !== 'Tất cả' && item.lessonType !== selectedType) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchUnit = item.unit.toLowerCase().includes(q);
      const matchObjectives = item.objectives.toLowerCase().includes(q);
      const matchGenre = item.genre.toLowerCase().includes(q);
      const matchPassage = item.keyPassage?.toLowerCase().includes(q);
      return matchTitle || matchUnit || matchObjectives || matchGenre || matchPassage;
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-sky-700 via-blue-800 to-indigo-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-yellow-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight">
                KHO SÁCH GIÁO KHOA NGỮ VĂN THCS (CHƯƠNG TRÌNH GDPT 2018)
              </h2>
              <p className="text-xs text-sky-200">
                Tra cứu và chọn trực tiếp chủ đề, văn bản, yêu cầu cần đạt (YCCĐ) chuẩn xác
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters and Search Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm tác phẩm, tác giả hoặc chủ đề (ví dụ: Thánh Gióng, Dế Mèn, Thơ 5 chữ, Lão Hạc, Đồng chí...)..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-500 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
              >
                Xóa
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Bộ sách chính thức Bộ GD&ĐT */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-sky-100/80 border border-sky-300 rounded-lg text-sky-900 font-bold text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-sky-700" />
              <span>Bộ sách: Kết nối tri thức với cuộc sống (Bộ GD&ĐT)</span>
            </div>

            {/* Khối lớp */}
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-semibold text-slate-500">Khối:</span>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-slate-800 font-bold focus:outline-hidden focus:ring-1 focus:ring-sky-500"
              >
                <option value="Tất cả">Tất cả lớp (6-9)</option>
                <option value="Lớp 6">Lớp 6</option>
                <option value="Lớp 7">Lớp 7</option>
                <option value="Lớp 8">Lớp 8</option>
                <option value="Lớp 9">Lớp 9</option>
              </select>
            </div>

            {/* Học kì */}
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-semibold text-slate-500">Kì:</span>
              <select
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
                className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-sky-500"
              >
                <option value="Tất cả">Cả năm</option>
                <option value="Học kì I">Học kì I</option>
                <option value="Học kì II">Học kì II</option>
              </select>
            </div>

            {/* Phân loại bài */}
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-semibold text-slate-500">Kĩ năng:</span>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-sky-500"
              >
                <option value="Tất cả">Tất cả kĩ năng</option>
                <option value="Đọc hiểu văn bản">Đọc hiểu văn bản</option>
                <option value="Thực hành tiếng Việt">Thực hành tiếng Việt</option>
                <option value="Viết">Kĩ năng Viết</option>
                <option value="Nói và nghe">Nói và nghe</option>
              </select>
            </div>

            <span className="text-[11px] text-slate-500 ml-auto font-medium">
              Tìm thấy: <strong>{filteredLessons.length}</strong> bài học
            </span>
          </div>
        </div>

        {/* Lessons List Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 bg-slate-100/60">
          {filteredLessons.length === 0 ? (
            <div className="p-12 text-center text-slate-400 bg-white rounded-xl border border-dashed border-slate-300">
              <BookOpen className="w-10 h-10 mx-auto mb-2 text-slate-300" />
              <p className="text-sm font-semibold text-slate-600">Không tìm thấy bài học phù hợp</p>
              <p className="text-xs text-slate-400 mt-1">
                Hãy thử chọn bộ lọc &ldquo;Tất cả&rdquo; hoặc tìm kiếm với từ khóa khác.
              </p>
            </div>
          ) : (
            filteredLessons.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:border-sky-400 hover:shadow-xs transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 group"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-sky-100 text-sky-800">
                      {item.grade}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-100 text-amber-900">
                      {item.curriculum.split(' ')[0]} {item.curriculum.split(' ')[1] || ''}
                    </span>
                    <span className="text-[11px] text-slate-400">•</span>
                    <span className="text-xs font-semibold text-slate-600">{item.unit}</span>
                    <span className="text-[11px] text-slate-400">•</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                      {item.lessonType}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    <strong>YCCĐ:</strong> {item.objectives}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1">
                    <span className="flex items-center gap-1 text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {item.duration}
                    </span>
                    {item.keyPassage && (
                      <span className="text-slate-500 italic truncate max-w-xs sm:max-w-md">
                        {item.keyPassage}
                      </span>
                    )}
                  </div>
                </div>

                <div className="shrink-0 self-end md:self-center">
                  <button
                    onClick={() => {
                      onSelectLesson(item);
                      onClose();
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold rounded-lg shadow-2xs transition-colors group-hover:scale-105"
                  >
                    <Check className="w-3.5 h-3.5 text-yellow-300" />
                    <span>Sử dụng bài này</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Kho tài liệu cập nhật chuẩn theo Chương trình GDPT 2018 (SGK tái bản 2024 - 2025)</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
