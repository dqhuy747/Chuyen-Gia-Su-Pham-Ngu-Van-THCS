import React from 'react';
import { X, FileText, CheckCircle2, AlertTriangle, ShieldCheck, Bookmark } from 'lucide-react';

interface NormsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NormsModal: React.FC<NormsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Bookmark className="w-5 h-5 text-yellow-300" />
            <h2 className="text-base sm:text-lg font-bold">
              CẨM NANG VĂN BẢN CHỈ ĐẠO BỘ GD&ĐT: CV 5512 & CV 7991
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700 leading-relaxed font-sans">
          {/* Section 1: Cong van 5512 */}
          <div className="border border-blue-200 rounded-lg p-5 bg-blue-50/40 space-y-3">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-base">
              <FileText className="w-5 h-5 text-blue-700" />
              <span>CÔNG VĂN SỐ 5512/BGDĐT-GDTrH (KẾ HOẠCH BÀI DẠY & SLIDE)</span>
            </div>
            <p className="text-xs text-slate-600 italic">
              Ban hành ngày 18/12/2020 của Bộ GD&ĐT hướng dẫn xây dựng và tổ chức thực hiện kế hoạch giáo dục của nhà trường.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <div className="bg-white p-3.5 rounded-md border border-blue-200 shadow-2xs">
                <span className="font-bold text-blue-900 block mb-1">I. MỤC TIÊU</span>
                <ul className="text-xs space-y-1 list-disc list-inside text-slate-600">
                  <li><strong>Năng lực đặc thù:</strong> Nêu rõ biểu hiện gắn với bài học.</li>
                  <li><strong>Năng lực chung:</strong> Tự chủ & tự học, Giao tiếp & hợp tác, Giải quyết vấn đề & sáng tạo.</li>
                  <li><strong>Phẩm chất:</strong> Yêu nước, nhân ái, chăm chỉ, trung thực, trách nhiệm (chọn phẩm chất phù hợp).</li>
                </ul>
              </div>

              <div className="bg-white p-3.5 rounded-md border border-blue-200 shadow-2xs">
                <span className="font-bold text-blue-900 block mb-1">II. THIẾT BỊ & HỌC LIỆU</span>
                <ul className="text-xs space-y-1 list-disc list-inside text-slate-600">
                  <li><strong>Giáo viên:</strong> Thiết bị, phiếu học tập, ứng dụng.</li>
                  <li><strong>Học sinh:</strong> SGK, vở ghi, đồ dùng chuẩn bị.</li>
                  <li><strong>Quy định điện thoại:</strong> <em>Không được ép buộc toàn bộ học sinh phải có điện thoại</em> (CV 5512 tr. 3).</li>
                </ul>
              </div>

              <div className="bg-white p-3.5 rounded-md border border-blue-200 shadow-2xs">
                <span className="font-bold text-blue-900 block mb-1">III. TIẾN TRÌNH (4 HOẠT ĐỘNG)</span>
                <ul className="text-xs space-y-1 list-disc list-inside text-slate-600">
                  <li><strong>HĐ 1:</strong> Mở đầu / Khởi động.</li>
                  <li><strong>HĐ 2:</strong> Hình thành kiến thức mới.</li>
                  <li><strong>HĐ 3:</strong> Luyện tập.</li>
                  <li><strong>HĐ 4:</strong> Vận dụng.</li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded p-3 text-xs text-amber-900 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Cấu trúc chuẩn từng hoạt động:</strong> Mỗi hoạt động bắt buộc có đủ <strong>4 tiêu chí con</strong>:
                a) Mục tiêu, b) Nội dung, c) Sản phẩm, d) Tổ chức thực hiện (chi tiết qua 4 bước: <em>Bước 1: Chuyển giao; Bước 2: Thực hiện; Bước 3: Báo cáo, thảo luận; Bước 4: Kết luận, nhận định</em>).
              </div>
            </div>
          </div>

          {/* Section 2: Cong van 7991 */}
          <div className="border border-emerald-200 rounded-lg p-5 bg-emerald-50/40 space-y-3">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-base">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              <span>CÔNG VĂN SỐ 7991/BGDĐT-GDTrH (MA TRẬN & ĐỀ KIỂM TRA ĐỊNH KÌ)</span>
            </div>
            <p className="text-xs text-slate-600 italic">
              Ban hành ngày 17/12/2024 của Bộ GD&ĐT hướng dẫn kiểm tra, đánh giá cấp THCS, THPT từ học kì 2 năm học 2024-2025.
            </p>

            {/* Matrix table info */}
            <div className="bg-white p-4 rounded-md border border-emerald-200">
              <span className="font-bold text-emerald-900 block mb-2">1. Khung phân bổ Ma trận chuẩn 10,0 điểm</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="font-semibold block text-slate-800">TNKQ Nhiều lựa chọn</span>
                  <span className="text-emerald-700 font-bold text-sm">3,0 điểm (30%)</span>
                  <span className="text-slate-500 block">12 câu x 0,25đ</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="font-semibold block text-slate-800">TNKQ Đúng - Sai</span>
                  <span className="text-emerald-700 font-bold text-sm">2,0 điểm (20%)</span>
                  <span className="text-slate-500 block">2 câu lớn (mỗi câu 4 ý a,b,c,d)</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="font-semibold block text-slate-800">TNKQ Trả lời ngắn</span>
                  <span className="text-emerald-700 font-bold text-sm">2,0 điểm (20%)</span>
                  <span className="text-slate-500 block">4 câu x 0,5đ (hoặc theo môn)</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="font-semibold block text-slate-800">Tự luận</span>
                  <span className="text-emerald-700 font-bold text-sm">3,0 điểm (30%)</span>
                  <span className="text-slate-500 block">Lập luận, giải toán, bài viết</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-200 flex flex-wrap gap-4 text-xs">
                <div>
                  Tỉ lệ mức độ đánh giá:
                  <span className="font-bold text-slate-900 ml-1">Biết ~40% (4,0đ)</span> |
                  <span className="font-bold text-slate-900 ml-1">Hiểu ~30% (3,0đ)</span> |
                  <span className="font-bold text-slate-900 ml-1">Vận dụng ~30% (3,0đ)</span>
                </div>
              </div>

              {/* Special Literature THCS box */}
              <div className="mt-3 pt-3 border-t border-emerald-200 bg-rose-50/70 p-3 rounded text-rose-950">
                <span className="font-bold block mb-1">Quy định đặc thù môn Ngữ văn cấp THCS theo CV 7991:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-700">
                  <li><strong>Ngữ liệu Đọc hiểu:</strong> Bắt buộc sử dụng ngữ liệu <em>nằm ngoài SGK</em> có cùng thể loại hoặc độ khó tương đương để tránh học sinh học vẹt.</li>
                  <li><strong>Tỉ lệ cấu trúc bài thi:</strong> Phần Đọc hiểu chiếm <strong>5,0 — 6,0 điểm</strong> (gồm trắc nghiệm nhiều lựa chọn, đúng-sai, trả lời ngắn); Phần Viết chiếm <strong>4,0 — 5,0 điểm</strong> (tự luận).</li>
                  <li><strong>Bài viết tự luận:</strong> Chấm theo Rubric chi tiết chia nhỏ đến 0,25 điểm (Mở bài, Thân bài, Kết bài, Chính tả - ngữ pháp, Sáng tạo).</li>
                </ul>
              </div>
            </div>

            {/* True/False Scoring Rule */}
            <div className="bg-emerald-100/70 border border-emerald-300 rounded-md p-4 text-xs text-emerald-950">
              <span className="font-bold text-sm block mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                Quy tắc tính điểm dạng Đúng/Sai (Phần II) bắt buộc theo CV 7991:
              </span>
              <p className="mb-2">Trong 1 câu hỏi có 4 ý lệnh nhỏ a, b, c, d:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono font-medium">
                <div className="bg-white p-2 rounded border border-emerald-200">Đúng 1 ý: <strong>0,10 điểm</strong></div>
                <div className="bg-white p-2 rounded border border-emerald-200">Đúng 2 ý: <strong>0,25 điểm</strong></div>
                <div className="bg-white p-2 rounded border border-emerald-200">Đúng 3 ý: <strong>0,50 điểm</strong></div>
                <div className="bg-white p-2 rounded border border-emerald-300 bg-emerald-50 text-emerald-800 font-bold">
                  Đúng cả 4 ý: <strong>1,00 điểm</strong>
                </div>
              </div>
              <p className="mt-2 text-slate-600 italic">
                *Thang điểm này áp dụng chuẩn hóa toàn quốc nhằm hạn chế việc học sinh khoanh bừa và đánh giá sâu năng lực phân tích logic.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-100 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-medium text-xs sm:text-sm rounded-md transition-colors shadow-xs"
          >
            Đã hiểu & Tiếp tục làm việc
          </button>
        </div>
      </div>
    </div>
  );
};
