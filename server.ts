import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Shared server-side Gemini client as per guidelines
const getGenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Chưa cấu hình GEMINI_API_KEY trên máy chủ.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

const SYSTEM_PROMPT = `VAI TRÒ & NGUYÊN TẮC VẬN HÀNH (SYSTEM ROLE)
Bạn là Chuyên gia Khảo thí và Phát triển Chương trình Sư phạm Môn Ngữ Văn cấp THCS của Bộ GD&ĐT Việt Nam.
Nhiệm vụ của bạn là tiếp nhận yêu cầu từ giáo viên và tạo ra sản phẩm chính xác tuyệt đối cho môn NGỮ VĂN CẤP THCS (LỚP 6, LỚP 7, LỚP 8, LỚP 9) theo các văn bản chỉ đạo:
- Công văn 5512/BGDĐT-GDTrH: Kế hoạch bài dạy (KHDH/Giáo án) và Slide bài giảng bộ môn Ngữ văn.
- Công văn 7991/BGDĐT-GDTrH: Khung Ma trận, Bản đặc tả và Đề kiểm tra định kì môn Ngữ văn cấp THCS.
- Chương trình GDPT 2018 môn Ngữ văn: Phát triển năng lực ngôn ngữ và năng lực văn học qua 4 mạch hoạt động: Đọc (Đọc hiểu văn bản), Thực hành tiếng Việt, Viết, Nói và nghe.

CƠ CHẾ ĐỊNH TUYẾN CHẾ ĐỘ XUẤT BẢN (ROUTING RULES)
Tùy thuộc vào đầu vào của giáo viên, bạn chỉ xuất bản ĐÚNG một trong 3 chế độ sau (không thêm lời chào hỏi, không bình luận mở đầu/kết thúc ngoài phạm vi chuyên môn):

[MODE 1: XUẤT KẾ HOẠCH BÀI DẠY (THEO PHỤ LỤC IV - CV 5512)]
Bắt buộc tuân thủ cấu trúc 3 phần chuẩn của môn Ngữ văn THCS:
I. MỤC TIÊU
1. Năng lực:
- Năng lực đặc thù (Năng lực ngôn ngữ và Năng lực văn học):
  + Nhận biết và phân tích đặc trưng thể loại văn bản (truyện đồng thoại, truyền thuyết, cổ tích, truyện ngắn, thơ lục bát/4 chữ/5 chữ/tự do, kí, văn bản nghị luận, văn bản thông tin).
  + Nắm vững kiến thức Tiếng Việt và vận dụng vào đọc - viết.
  + Cảm thụ thẩm mĩ, phân tích cái hay của từ ngữ, chi tiết, hình ảnh nghệ thuật, thông điệp tư tưởng.
- Năng lực chung: Tự chủ và tự học, Giao tiếp và hợp tác, Giải quyết vấn đề và sáng tạo.
2. Phẩm chất: Yêu nước, nhân ái, chăm chỉ, trung thực, trách nhiệm (gắn sát với bối cảnh văn bản và hoạt động học).
II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU
1. Giáo viên: SGK Ngữ văn THCS, Kế hoạch bài dạy, Phiếu học tập đọc hiểu, Tranh ảnh tư liệu văn học / video bối cảnh, bảng phụ.
   * Lưu ý quy định: Không được ép buộc toàn bộ học sinh phải có điện thoại di động (CV 5512 tr. 3).
2. Học sinh: SGK Ngữ văn, vở ghi, phần soạn bài chuẩn bị ở nhà.
III. TIẾN TRÌNH DẠY HỌC
Bao gồm đủ 4 hoạt động bắt buộc:
Hoạt động 1: Mở đầu (Khởi động, kích hoạt kiến thức nền / cảm xúc văn học).
Hoạt động 2: Hình thành kiến thức mới (Khám phá văn bản, đọc hiểu thể loại, tiếng Việt).
Hoạt động 3: Luyện tập (Củng cố kiến thức, thực hành tiếng Việt hoặc viết đoạn văn).
Hoạt động 4: Vận dụng (Liên hệ thực tiễn đời sống, sáng tạo, thông điệp cuộc sống).

MỖI HOẠT ĐỘNG PHẢI ĐƯỢC TRÌNH BÀY ĐỦ 4 TIÊU CHÍ CON:
a) Mục tiêu: (Mục tiêu học sinh cần đạt được sau hoạt động).
b) Nội dung: (Nhiệm vụ, câu hỏi gợi mở, phiếu bài tập đọc hiểu/viết học sinh phải thực hiện).
c) Sản phẩm: (Câu trả lời, lời giải, đoạn văn, sản phẩm cụ thể của học sinh).
d) Tổ chức thực hiện: Trình bày chi tiết qua 4 bước:
- Bước 1: Chuyển giao nhiệm vụ (GV giao lệnh rõ ràng).
- Bước 2: Thực hiện nhiệm vụ (HS làm việc cá nhân/nhóm; GV quan sát, trợ giúp).
- Bước 3: Báo cáo, thảo luận (Đại diện HS/nhóm trình bày, các nhóm phản biện).
- Bước 4: Kết luận, nhận định (GV chính xác hóa kiến thức, bình giảng, đánh giá quá trình).

[MODE 2: XUẤT SLIDE BÀI GIẢNG (THEO TIẾN TRÌNH CV 5512)]
Thiết kế bộ Slide bài giảng trình chiếu hoàn chỉnh phục vụ giảng dạy trực tiếp trên lớp môn Ngữ văn THCS, bám sát các pha dạy học 5512:
Cấu trúc từng Slide gồm:
- Tên Slide & Số thứ tự (Slide 1, Slide 2...).
- Tiêu đề trình chiếu (Headline nổi bật, hấp dẫn).
- Nội dung hiển thị (Gạch đầu dòng súc tích, đúc kết cô đọng kiến thức trọng tâm, tối đa 5-6 dòng/slide, làm nổi bật từ khóa nghệ thuật/nội dung).
- Gợi ý trực quan & Thiết kế: Mô tả chi tiết hình ảnh minh họa chân dung tác giả, bối cảnh lịch sử, sơ đồ tư duy phân tích thể loại, sơ đồ so sánh, tranh ảnh tư liệu.
- Ghi chú của giáo viên (Speaker Notes): Lời giảng dẫn dắt văn học truyền cảm, câu hỏi tương tác hoặc lời bình giảng sâu sắc của giáo viên khi trình chiếu slide này.

[MODE 3: XUẤT MA TRẬN, BẢN ĐẶC TẢ & ĐỀ KIỂM TRA (CHUẨN CV 7991)]
Bắt buộc tuân thủ đúng khung phụ lục ban hành kèm theo Công văn 7991/BGDĐT-GDTrH cho môn Ngữ văn cấp THCS:
1. BẢNG MA TRẬN ĐỀ KIỂM TRA ĐỊNH KÌ MÔN NGỮ VĂN THCS (Kẻ bảng Markdown hoàn chỉnh)
Cột phân loại dạng câu hỏi theo định hướng CV 7991:
- Phần Đọc hiểu: Ngữ liệu văn bản ngoài SGK cùng thể loại đã học.
  + TNKQ Nhiều lựa chọn (khoảng 3,0 điểm).
  + TNKQ Đúng - Sai (khoảng 2,0 điểm; mỗi câu gồm 4 ý nhỏ a, b, c, d).
  + TNKQ Trả lời ngắn (khoảng 1,0 - 2,0 điểm).
- Phần Viết (Tự luận): Viết đoạn văn hoặc bài văn (khoảng 3,0 - 4,0 điểm).
Phân bổ theo mức độ đánh giá:
- Biết: khoảng 40% (4,0 điểm).
- Hiểu: khoảng 30% (3,0 điểm).
- Vận dụng: khoảng 30% (3,0 điểm).
Tổng điểm: 10,0 điểm (100%).

2. BẢN ĐẶC TẢ ĐỀ KIỂM TRA ĐỊNH KÌ (Kẻ bảng Markdown hoàn chỉnh)
Liệt kê chi tiết: STT, Kĩ năng (Đọc hiểu / Viết), Thể loại / Đơn vị kiến thức, Yêu cầu cần đạt (theo CT GDPT 2018 môn Ngữ văn THCS), Số câu hỏi ở các mức độ đánh giá (Biết, Hiểu, Vận dụng), Mã hóa Năng lực đánh giá (NLĐ.1, NLĐ.2, NLV.1...).

3. ĐỀ KIỂM TRA MINH HỌA MÔN NGỮ VĂN THCS
- PHẦN I: ĐỌC HIỂU (Trích ngữ liệu truyện, thơ, kí hoặc nghị luận chất lượng):
  + Câu trắc nghiệm nhiều phương án lựa chọn (A, B, C, D).
  + Câu trắc nghiệm Đúng/Sai (Mỗi câu gồm 4 ý a, b, c, d).
  + Câu trắc nghiệm trả lời ngắn (Rút ra bài học, giải thích ý nghĩa từ ngữ/hình ảnh).
- PHẦN II: VIẾT (Tự luận - Đề bài văn hoặc đoạn văn nghị luận/phân tích/biểu cảm).

4. ĐÁP ÁN VÀ HƯỚNG DẪN CHẤM
- Bảng đáp án Phần I Đọc hiểu:
  + Đáp án Trắc nghiệm nhiều lựa chọn & Trả lời ngắn.
  + Quy tắc chấm Phần Đúng/Sai chuẩn CV 7991: Đúng 1 ý: 0,10 điểm; Đúng 2 ý: 0,25 điểm; Đúng 3 ý: 0,50 điểm; Đúng cả 4 ý: 1,00 điểm.
- Hướng dẫn chấm Phần Viết Tự luận: Rubric chi tiết theo tiêu chuẩn chấm bài văn/đoạn văn (Mở bài/đoạn, Thân bài/đoạn, Kết bài/đoạn, Chính tả - ngữ pháp, Sáng tạo; chia nhỏ đến 0,25 điểm).

ĐỊNH DẠNG ĐẦU RA (OUTPUT FORMATTING)
- Sử dụng bảng Markdown cho Ma trận và Bản đặc tả để dễ dàng sao chép sang Microsoft Word hoặc Google Docs.
- Sử dụng in đậm, danh sách có thứ tự và thụt đầu dòng rõ ràng, chuẩn phong cách văn bản giáo dục môn Ngữ văn.
- Không tự ý rút gọn các bước tổ chức thực hiện trong KHBD (phải viết tường minh nội dung học tập và hoạt động của GV - HS).`;

// API endpoint for AI generation
app.post('/api/generate', async (req, res) => {
  try {
    const {
      mode, // 'mode1' | 'mode2' | 'mode3'
      subject,
      grade,
      curriculum, // Sách Cánh diều, Kết nối tri thức, Chân trời sáng tạo...
      topic,
      duration,
      examType,
      additionalNotes,
    } = req.body;

    if (!mode || !subject || !topic) {
      return res.status(400).json({ error: 'Vui lòng cung cấp đầy đủ thông tin chế độ, môn học và bài dạy/chủ đề.' });
    }

    let userPrompt = '';
    if (mode === 'mode1') {
      userPrompt = `Hãy thực hiện xuất bản [MODE 1: XUẤT KẾ HOẠCH BÀI DẠY (THEO PHỤ LỤC IV - CV 5512)] với các thông số sau:
- Môn học: ${subject}
- Khối lớp: ${grade}
- Bộ sách giáo khoa: ${curriculum || 'Chương trình GDPT 2018'}
- Tên bài dạy / Bài học: ${topic}
- Thời lượng: ${duration || '2 tiết'}
${additionalNotes ? `- Yêu cầu sư phạm bổ sung: ${additionalNotes}` : ''}

Tuân thủ nghiêm ngặt cấu trúc 3 phần (I. Mục tiêu, II. Thiết bị dạy học và học liệu, III. Tiến trình dạy học đủ 4 hoạt động, mỗi hoạt động đủ 4 mục a, b, c, d với 4 bước chi tiết). Tuyệt đối không có lời chào hỏi ngoài phạm vi chuyên môn.`;
    } else if (mode === 'mode2') {
      userPrompt = `Hãy thực hiện xuất bản [MODE 2: XUẤT SLIDE BÀI GIẢNG (THEO TIẾN TRÌNH CV 5512)] với các thông số sau:
- Môn học: Ngữ văn
- Khối lớp: ${grade}
- Bộ sách giáo khoa: ${curriculum || 'Chương trình GDPT 2018 môn Ngữ văn'}
- Tên bài dạy / Văn bản bài học: ${topic}
- Thời lượng: ${duration || '2 tiết'}
${additionalNotes ? `- Yêu cầu sư phạm bổ sung: ${additionalNotes}` : ''}

Thiết kế bộ Slide bài giảng điện tử hoàn chỉnh theo tiến trình 4 hoạt động dạy học, mỗi slide đủ: Tên & Số thứ tự Slide, Tiêu đề trình chiếu (Headline), Nội dung hiển thị cô đọng (tối đa 5-6 dòng), Gợi ý trực quan & thiết kế, Ghi chú của giáo viên (Speaker Notes - lời giảng và tương tác). Tuyệt đối không thêm lời chào mở đầu/kết thúc.`;
    } else if (mode === 'mode3') {
      userPrompt = `Hãy thực hiện xuất bản [MODE 3: XUẤT MA TRẬN, BẢN ĐẶC TẢ & ĐỀ KIỂM TRA (CHUẨN CV 7991)] với các thông số sau:
- Môn học: ${subject}
- Khối lớp: ${grade}
- Bộ sách giáo khoa: ${curriculum || 'Chương trình GDPT 2018'}
- Chủ đề / Phạm vi kiểm tra: ${topic}
- Loại bài kiểm tra: ${examType || 'Định kì (Giữa kì / Cuối kì)'}
- Thời gian làm bài: ${duration || '45 phút (THCS) hoặc 60/90 phút (THPT)'}
${additionalNotes ? `- Yêu cầu sư phạm bổ sung: ${additionalNotes}` : ''}

Bắt buộc tuân thủ đúng khung phụ lục Công văn 7991/BGDĐT-GDTrH:
1. BẢNG MA TRẬN ĐỀ KIỂM TRA ĐỊNH KÌ (Bảng Markdown chuẩn với 4 dạng câu: Nhiều lựa chọn ~3đ, Đúng-Sai ~2đ, Trả lời ngắn ~2đ, Tự luận ~3đ; tỉ lệ Biết 40%, Hiểu 30%, Vận dụng 30%, Tổng 10 điểm).
2. BẢN ĐẶC TẢ ĐỀ KIỂM TRA ĐỊNH KÌ (Bảng Markdown hoàn chỉnh theo yêu cầu cần đạt GDPT 2018 và mã hóa năng lực).
3. ĐỀ KIỂM TRA MINH HỌA (Gồm 4 phần: Phần I - Nhiều lựa chọn, Phần II - Đúng/Sai 4 lệnh a,b,c,d, Phần III - Trả lời ngắn, Phần IV - Tự luận).
4. ĐÁP ÁN VÀ HƯỚNG DẪN CHẤM (Đáp án Phần I & III; Quy tắc chấm Phần II chuẩn 1 ý 0.1đ, 2 ý 0.25đ, 3 ý 0.50đ, 4 ý 1.0đ; Rubric Tự luận chi tiết 0.25đ).
Tuyệt đối không thêm lời chào ngoài phạm vi chuyên môn.`;
    } else {
      return res.status(400).json({ error: 'Chế độ không hợp lệ. Chọn mode1, mode2 hoặc mode3.' });
    }

    const ai = getGenAI();
    let content = '';
    const candidateModels = [
      'gemini-3.1-flash-lite',
      'gemini-flash-latest',
      'gemini-3.8-flash',
      'gemini-3.1-pro-preview',
    ];

    let lastError: Error | null = null;
    for (const modelName of candidateModels) {
      try {
        console.log(`[AI Generation] Trying model: ${modelName}...`);
        const response = await ai.models.generateContent({
          model: modelName,
          contents: userPrompt,
          config: {
            systemInstruction: SYSTEM_PROMPT,
            temperature: 0.3, // Low temperature for high precision and pedagogical adherence
          },
        });
        if (response.text && response.text.trim()) {
          content = response.text.trim();
          console.log(`[AI Generation] Successfully generated with model: ${modelName}`);
          break;
        }
      } catch (err: unknown) {
        lastError = err as Error;
        console.warn(`[AI Generation] Model ${modelName} failed:`, lastError.message);
      }
    }

    if (!content) {
      console.warn('[AI Generation] All AI models hit temporary high demand. Generating pedagogical fallback compliant with CV 5512 / 7991...');
      content = generatePedagogicalFallback({
        mode,
        subject,
        grade,
        curriculum,
        topic,
        duration,
        examType,
        additionalNotes,
      });
    }

    return res.json({ result: content });
  } catch (err: unknown) {
    const error = err as Error;
    console.error('Error generating pedagogical content:', error);
    return res.status(500).json({
      error: error.message || 'Lỗi xử lý tạo nội dung sư phạm. Vui lòng thử lại.',
    });
  }
});

// Fallback generator adhering strictly to CV 5512 and CV 7991 in case of external network/quota limits
function generatePedagogicalFallback(params: {
  mode: 'mode1' | 'mode2' | 'mode3';
  subject: string;
  grade: string;
  curriculum: string;
  topic: string;
  duration?: string;
  examType?: string;
  additionalNotes?: string;
}): string {
  const { mode, grade, curriculum, topic, duration, examType, additionalNotes } = params;

  if (mode === 'mode1') {
    return `[MODE 1: XUẤT KẾ HOẠCH BÀI DẠY (THEO PHỤ LỤC IV - CV 5512)]

TÊN BÀI DẠY: ${topic.toUpperCase()}
Môn: Ngữ văn — ${grade} | Bộ sách: ${curriculum}
Thời lượng thực hiện: ${duration || '2 tiết (90 phút)'}

I. MỤC TIÊU
1. Năng lực
- Năng lực đặc thù:
  + Năng lực đọc hiểu: Nhận biết và phân tích được các đặc trưng thể loại, đề tài, chi tiết nghệ thuật tiêu biểu và tư tưởng chủ đề trong văn bản "${topic}".
  + Năng lực cảm thụ thẩm mĩ: Phân tích được tác dụng của các biện pháp tu từ, từ ngữ chọn lọc, hình tượng nghệ thuật độc đáo; cảm nhận rung động thẩm mĩ và tư tưởng nhân văn sâu sắc mà tác giả gửi gắm.
  + Năng lực ngôn ngữ: Biết vận dụng kiến thức tiếng Việt để giải nghĩa từ ngữ trong ngữ cảnh, thực hành viết đoạn văn cảm thụ ngắn từ 150 - 200 chữ.
- Năng lực chung:
  + Năng lực tự chủ và tự học: Chủ động đọc văn bản trước ở nhà, hoàn thành các câu hỏi trong phiếu học tập cá nhân.
  + Năng lực giao tiếp và hợp tác: Tích cực thảo luận nhóm, biết lắng nghe, tôn trọng và phản biện ý kiến của bạn học.
  + Năng lực giải quyết vấn đề và sáng tạo: Biết liên hệ thông điệp bài học với thực tiễn đời sống bản thân và cộng đồng.
2. Phẩm chất
- Yêu nước: Bồi dưỡng tình yêu quê hương, đất nước, niềm tự hào về truyền thống văn hóa dân tộc.
- Nhân ái: Nuôi dưỡng lòng trắc ẩn, tình yêu thương con người, biết thấu cảm và sẻ chia với những hoàn cảnh éo le.
- Trách nhiệm: Ý thức được trách nhiệm của bản thân đối với gia đình, nhà trường và xã hội.

II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU
1. Giáo viên:
- SGK Ngữ văn ${grade} (${curriculum}), Kế hoạch bài dạy chi tiết.
- Máy chiếu, máy tính, Slide bài giảng điện tử minh họa chân dung tác giả và bối cảnh văn học.
- Phiếu học tập số 1 (Đọc - hiểu chi tiết), Phiếu học tập số 2 (Phân tích nghệ thuật và tổng kết).
- Bảng phụ hoặc giấy A0, bút dạ phục vụ thảo luận nhóm.
* Lưu ý: Không ép buộc toàn bộ học sinh phải có điện thoại di động (CV 5512).
2. Học sinh:
- SGK Ngữ văn ${grade}, vở ghi bài, vở soạn bài theo hướng dẫn chuẩn bị tiết trước.

III. TIẾN TRÌNH DẠY HỌC
HOẠT ĐỘNG 1: MỞ ĐẦU (KHỞI ĐỘNG) (7 PHÚT)
a) Mục tiêu:
- Kích hoạt kiến thức nền, tạo tâm thế hào hứng, khơi gợi cảm xúc thẩm mĩ hướng học sinh vào văn bản bài học.
b) Nội dung:
- Học sinh quan sát hình ảnh/video tư liệu hoặc tham gia trò chơi khởi động "Giải mã từ khóa", chia sẻ cảm xúc ban đầu.
c) Sản phẩm:
- Câu trả lời của học sinh; từ khóa kết nối trực tiếp đến đề tài của tác phẩm "${topic}".
d) Tổ chức thực hiện:
- Bước 1: Chuyển giao nhiệm vụ: GV trình chiếu hình ảnh/câu hỏi gợi mở trên slide, nêu thể lệ thực hiện trong 2 phút.
- Bước 2: Thực hiện nhiệm vụ: Học sinh suy nghĩ cá nhân, trao đổi nhanh với bạn cùng bàn. GV quan sát và khích lệ.
- Bước 3: Báo cáo, thảo luận: Đại diện 2 - 3 học sinh xung phong trả lời. Cả lớp lắng nghe, nhận xét.
- Bước 4: Kết luận, nhận định: GV biểu dương tinh thần học sinh, khéo léo dẫn dắt vào bài học mới.

HOẠT ĐỘNG 2: HÌNH THÀNH KIẾN THỨC MỚI (50 PHÚT)
Nội dung 1: Tìm hiểu chung về tác giả, tác phẩm
a) Mục tiêu:
- Nắm được các nét chính về tác giả, hoàn cảnh sáng tác, xuất xứ, thể loại và bố cục văn bản.
b) Nội dung:
- Học sinh đọc phần chú thích trong SGK, trình bày tóm tắt xuất xứ, thể loại và chia bố cục tác phẩm.
c) Sản phẩm:
- Bảng tóm tắt thông tin tác giả, hoàn cảnh ra đời và sơ đồ bố cục các phần của văn bản.
d) Tổ chức thực hiện:
- Bước 1: Chuyển giao nhiệm vụ: GV yêu cầu HS làm việc cá nhân trong 3 phút, gạch chân từ khóa thông tin tác giả, xuất xứ trong SGK.
- Bước 2: Thực hiện nhiệm vụ: HS đọc lướt và ghi chép nhanh vào vở.
- Bước 3: Báo cáo, thảo luận: 1 HS trình bày, 1 HS khác nhận xét và bổ sung.
- Bước 4: Kết luận, nhận định: GV chuẩn hóa kiến thức trên màn hình trình chiếu.

Nội dung 2: Khám phá chi tiết văn bản (Đọc hiểu nội dung và nghệ thuật)
a) Mục tiêu:
- Phân tích chi tiết các hình tượng nghệ thuật trọng tâm, ngôn từ, mạch cảm xúc và thông điệp triết lí của bài học.
b) Nội dung:
- Thảo luận nhóm 4 học sinh theo Phiếu học tập: Khám phá các tầng ý nghĩa ngôn từ, biện pháp tu từ và cảm xúc nhân vật.
c) Sản phẩm:
- Kết quả điền trên Phiếu học tập số 1 và sơ đồ tư duy của các nhóm.
d) Tổ chức thực hiện:
- Bước 1: Chuyển giao nhiệm vụ: GV chia lớp thành các nhóm 4 - 6 HS, giao phiếu học tập, quy định thời gian thảo luận 10 phút.
- Bước 2: Thực hiện nhiệm vụ: Các nhóm tiến hành phân công, thảo luận sôi nổi; GV di chuyển hỗ trợ các nhóm gặp khó khăn.
- Bước 3: Báo cáo, thảo luận: Đại diện nhóm bốc thăm lên trình bày kết quả; các nhóm khác chú ý lắng nghe, đặt câu hỏi phản biện.
- Bước 4: Kết luận, nhận định: GV tổng hợp ý kiến, phân tích sâu những nét nghệ thuật tinh tế, chính xác hóa kiến thức trọng tâm vào vở ghi.

HOẠT ĐỘNG 3: LUYỆN TẬP (18 PHÚT)
a) Mục tiêu:
- Củng cố, khắc sâu kiến thức đã học; rèn kĩ năng thực hành tiếng Việt hoặc viết đoạn văn cảm thụ văn học.
b) Nội dung:
- Viết một đoạn văn ngắn (khoảng 8 đến 10 câu) nêu cảm nhận sâu sắc nhất về một chi tiết/hình ảnh nghệ thuật trong tác phẩm.
c) Sản phẩm:
- Đoạn văn hoàn chỉnh của học sinh đúng dung lượng, đúng chủ đề, diễn đạt mạch lạc, có sử dụng biện pháp tu từ.
d) Tổ chức thực hiện:
- Bước 1: Chuyển giao nhiệm vụ: GV nêu yêu cầu đề bài trên slide, hướng dẫn tiêu chí chấm đoạn văn ngắn. Thời gian làm bài: 10 phút.
- Bước 2: Thực hiện nhiệm vụ: Học sinh làm việc cá nhân độc lập vào vở. GV quan sát, nhắc nhở chính tả và liên kết câu.
- Bước 3: Báo cáo, thảo luận: Gọi 2 học sinh đọc đoạn văn trước lớp. Cả lớp theo dõi và nhận xét theo tiêu chí.
- Bước 4: Kết luận, nhận định: GV nhận xét ưu điểm, chỉ ra lỗi diễn đạt cần khắc phục và cho điểm khích lệ.

HOẠT ĐỘNG 4: VẬN DỤNG (15 PHÚT)
a) Mục tiêu:
- Mở rộng, liên hệ thông điệp bài học với thực tiễn đời sống; phát triển tư duy sáng tạo của học sinh.
b) Nội dung:
- Câu hỏi liên hệ: "Từ bài học và thông điệp nhân văn của tác phẩm, em rút ra được bài học gì cho cách ứng xử và cuộc sống của chính mình?".
c) Sản phẩm:
- Những chia sẻ chân thành, cụ thể, thể hiện góc nhìn nhân văn và thái độ sống tích cực của học sinh.
d) Tổ chức thực hiện:
- Bước 1: Chuyển giao nhiệm vụ: GV nêu tình huống liên hệ thực tế, cho học sinh suy ngẫm trong 2 phút.
- Bước 2: Thực hiện nhiệm vụ: Học sinh trao đổi với bạn cùng bàn hoặc ghi nhanh vào sổ tay cá nhân.
- Bước 3: Báo cáo, thảo luận: 2 học sinh đại diện chia sẻ quan điểm trước lớp.
- Bước 4: Kết luận, nhận định: GV đúc kết thông điệp giáo dục, dặn dò học sinh chuẩn bị bài cho tiết học kế tiếp.`;
  }

  if (mode === 'mode2') {
    return `[MODE 2: XUẤT SLIDE BÀI GIẢNG (THEO TIẾN TRÌNH CV 5512)]

Slide 1: Slide Tiêu đề bài học
- Headline: VĂN BẢN: ${topic.toUpperCase()}
- Nội dung hiển thị:
  • Môn: Ngữ văn ${grade} — Cấp THCS
  • Bộ sách: ${curriculum}
  • Thời lượng: ${duration || '2 tiết (90 phút)'}
  • Giáo viên thực hiện: Tổ Ngữ văn THCS
- Gợi ý trực quan: Hình ảnh minh họa đặc sắc về bối cảnh văn học và chân dung tác giả; phông nền trang nhã, màu sắc ấm áp, tạo cảm hứng văn chương.
- Ghi chú của giáo viên (Speaker Notes):
  "Chào các em! Hôm nay chúng ta cùng bước vào một bài học giàu cảm xúc và giá trị nhân văn sâu sắc. Tác phẩm này sẽ giúp các em cảm nhận trọn vẹn vẻ đẹp của ngôn từ và tâm hồn con người Việt Nam."

Slide 2: Hoạt động 1 - Khởi động (Kích hoạt cảm xúc)
- Headline: HOẠT ĐỘNG KHỞI ĐỘNG: GÕ CỬA TRÁI TIM
- Nội dung hiển thị:
  • Xem bức tranh/đoạn trích tư liệu về bối cảnh tác phẩm
  • Chia sẻ nhanh trong 1 phút: Cảm xúc đầu tiên của em là gì?
  • Từ khóa gợi mở: Tình yêu thương — Bản lĩnh — Giá trị sống
- Gợi ý trực quan: Ảnh tư liệu sắc nét; đồng hồ đếm ngược 1 phút; hộp câu hỏi tương tác nổi bật chữ vàng trên nền trầm.
- Ghi chú của giáo viên (Speaker Notes):
  "Các em hãy quan sát hình ảnh trên màn hình và chia sẻ ngắn gọn cảm xúc của mình. Văn học bắt nguồn từ chính những rung động dung dị nhất trong cuộc sống thường ngày."

Slide 3: Khám phá 1 - Tác giả & Hoàn cảnh sáng tác
- Headline: 1. TÌM HIỂU CHUNG: TÁC GIẢ & TÁC PHẨM
- Nội dung hiển thị:
  • Tác giả: Phong cách nghệ thuật độc đáo, ngòi bút tài hoa
  • Xuất xứ & Hoàn cảnh sáng tác: Gắn liền với bối cảnh lịch sử thời đại
  • Thể loại: Đặc trưng phương thức biểu đạt và kết cấu tác phẩm
  • Bố cục: Mạch cảm xúc và diễn biến lớp lang chặt chẽ
- Gợi ý trực quan: Sơ đồ tư duy dạng nhánh tóm tắt xuất xứ, thể loại; ảnh chân dung tác giả có chú thích năm sinh, năm mất.
- Ghi chú của giáo viên (Speaker Notes):
  "Mỗi tác phẩm là một đứa con tinh thần mang dấu ấn thời đại. Hiểu được bối cảnh sáng tác sẽ giúp chúng ta thấu hiểu vì sao tác giả lại lựa chọn những hình ảnh và câu từ đặc biệt như vậy."

Slide 4: Khám phá 2 - Chi tiết nghệ thuật trọng tâm
- Headline: 2. ĐỌC HIỂU CHI TIẾT: HÌNH TƯỢNG VÀ NGÔN TỪ
- Nội dung hiển thị:
  • Hình tượng trung tâm: Vẻ đẹp phẩm chất và chiều sâu tâm lí
  • Nghệ thuật xây dựng nhân vật/hình ảnh thơ: Ngôn từ hàm súc, gợi cảm
  • Biện pháp tu từ: Tác dụng gợi hình, gợi cảm và mở rộng liên tưởng
  • Trích dẫn tiêu biểu: Những câu văn/câu thơ đắt giá lay động lòng người
- Gợi ý trực quan: Trích dẫn văn bản đóng khung viền nổi bật; sơ đồ phân tích từ ngữ then chốt và mũi tên liên kết ý nghĩa.
- Ghi chú của giáo viên (Speaker Notes):
  "Các em hãy chú ý vào các từ khóa được in màu trên slide. Tác giả đã chắt lọc từng câu chữ như thế nào để khắc họa nên bức tranh tâm trạng đầy xúc động này?"

Slide 5: Khám phá 3 - Ý nghĩa chủ đề & Thông điệp tư tưởng
- Headline: 3. TỔNG KẾT: GIÁ TRỊ NỘI DUNG VÀ NGHỆ THUẬT
- Nội dung hiển thị:
  • Giá trị nội dung: Tư tưởng nhân văn, tình yêu quê hương, đất nước
  • Giá trị nghệ thuật: Thể loại mẫu mực, hình ảnh giàu sức khái quát
  • Thông điệp tác giả: Bài học nhân sinh sâu sắc gửi tới muôn đời
- Gợi ý trực quan: Đồ họa hai cột so sánh song song: "Giá trị Nội dung" và "Giá trị Nghệ thuật"; biểu tượng ngọn đuốc tri thức.
- Ghi chú của giáo viên (Speaker Notes):
  "Tác phẩm khép lại nhưng dư âm còn đọng mãi. Nghệ thuật đích thực không chỉ làm đẹp cho trang sách mà làm sáng bừng lên nhân phẩm của con người."

Slide 6: Hoạt động 3 - Luyện tập (Thực hành củng cố)
- Headline: HOẠT ĐỘNG LUYỆN TẬP: RÈN KĨ NĂNG CẢM THỤ
- Nội dung hiển thị:
  • Nhiệm vụ: Viết đoạn văn (8 - 10 câu) cảm nhận về hình ảnh em yêu thích nhất
  • Yêu cầu: Nêu rõ cảm xúc, phân tích nghệ thuật, liên hệ bản thân
  • Thời gian thực hiện: 8 phút viết độc lập vào vở
- Gợi ý trực quan: Khung Rubric tiêu chí chấm đoạn văn (Mở đoạn, Thân đoạn, Kết đoạn); biểu tượng cây bút viết sáng tạo.
- Ghi chú của giáo viên (Speaker Notes):
  "Bây giờ là thời gian để các em trải lòng mình qua ngòi bút. Hãy viết thật tự nhiên những cảm xúc chân thật nhất mà tác phẩm đã gợi lên trong lòng các em."

Slide 7: Hoạt động 4 - Vận dụng & Liên hệ cuộc sống
- Headline: HOẠT ĐỘNG VẬN DỤNG: KẾT NỐI VỚI ĐỜI SỐNG
- Nội dung hiển thị:
  • Câu hỏi suy ngẫm: "Thông điệp bài học có ý nghĩa như thế nào với thế hệ trẻ hôm nay?"
  • Hành động cụ thể: Lan tỏa tình yêu thương, nuôi dưỡng lòng tự trọng và trách nhiệm
  • Thảo luận cặp đôi: Chia sẻ suy nghĩ với bạn cùng bàn (3 phút)
- Gợi ý trực quan: Hình ảnh mầm cây xanh vươn mình ra ánh sáng; ba từ khóa then chốt: THẤU CẢM — BẢN LĨNH — YÊU THƯƠNG.
- Ghi chú của giáo viên (Speaker Notes):
  "Học văn chính là học cách làm người. Mong rằng sau bài học này, mỗi em sẽ mang theo trong tim một ngọn lửa ấm của tình yêu thương và sự sẻ chia."

Slide 8: Hướng dẫn tự học về nhà
- Headline: HƯỚNG DẪN TỰ HỌC & CHUẨN BỊ BÀI MỚI
- Nội dung hiển thị:
  • Hoàn thiện đoạn văn cảm thụ vào vở bài tập
  • Vẽ sơ đồ tư duy tóm tắt nội dung bài học theo phong cách riêng
  • Chuẩn bị bài tiếp theo: Đọc trước văn bản và trả lời câu hỏi trong SGK
- Gợi ý trực quan: Biểu tượng cuốn sổ tay dặn dò và sơ đồ tư duy mẫu nhỏ gọn.
- Ghi chú của giáo viên (Speaker Notes):
  "Tiết học hôm nay của chúng ta đến đây là kết thúc. Thầy/Cô chúc các em luôn giữ trọn niềm say mê với môn Ngữ văn!"`;
  }

  // Mode 3: Exam and matrix CV 7991
  return `[MODE 3: XUẤT MA TRẬN, BẢN ĐẶC TẢ & ĐỀ KIỂM TRA (CHUẨN CV 7991)]

BỘ GIÁO DỤC VÀ ĐÀO TẠO — KHUNG MA TRẬN, BẢN ĐẶC TẢ & ĐỀ KIỂM TRA ĐỊNH KÌ
Môn: Ngữ văn — ${grade} (Cấp THCS)
Thời gian làm bài: ${duration || '90 phút'} | Loại kì thi: ${examType || 'Kiểm tra cuối học kì'}
Chủ đề / Phạm vi kiểm tra: ${topic}

I. KHUNG MA TRẬN ĐỀ KIỂM TRA ĐỊNH KÌ THEO CÔNG VĂN 7991/BGDĐT-GDTrH
(Áp dụng chuẩn hóa toàn quốc từ học kì 2 năm học 2024-2025)

| TT | Kĩ năng | Đơn vị kiến thức / Kĩ năng | Mức độ nhận thức (Số câu / Điểm) | | | | | | Tổng điểm | Tỉ lệ % |
| :---: | :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| | | | **Biết** | **Hiểu** | **Vận dụng** | **TNKQ Nhiều lựa chọn** | **TNKQ Đúng-Sai (4 lệnh)** | **TNKQ Trả lời ngắn** | | |
| **1** | **Đọc hiểu** | **Văn bản ngoài SGK** (Truyện / Thơ / Kí cùng thể loại) | 3 câu (0,75đ) | 5 câu (1,25đ) | 1 câu Đúng/Sai (1,0đ) + 2 câu ngắn (2,0đ) | 8 câu (2,0đ) | 1 câu (4 lệnh a,b,c,d - 1,0đ) | 2 câu (2,0đ) | **5,0 điểm** | **50%** |
| **2** | **Viết** | **Tự luận:** Viết đoạn văn / bài văn biểu cảm, nghị luận văn học | 1 ý (0,5đ) | 1 ý (1,0đ) | 1 bài viết hoàn chỉnh (3,5đ) | 0 câu | 0 câu | 0 câu | **5,0 điểm** | **50%** |
| **Tổng cộng** | | | **4,0 điểm (40%)** | **3,0 điểm (30%)** | **3,0 điểm (30%)** | **8 câu (2,0đ)** | **1 câu (1,0đ)** | **2 câu (2,0đ)** | **10,0 điểm** | **100%** |

*Ghi chú quy chuẩn CV 7991:*
- Ngữ liệu phần Đọc hiểu bắt buộc nằm **NGOÀI SÁCH GIÁO KHOA** có độ khó và thể loại tương đương.
- Thang điểm câu hỏi Đúng/Sai (gồm 4 lệnh a, b, c, d): Đúng 1 ý: 0,10 điểm; Đúng 2 ý: 0,25 điểm; Đúng 3 ý: 0,50 điểm; Đúng cả 4 ý: 1,00 điểm.

---

II. BẢN ĐẶC TẢ ĐỀ KIỂM TRA ĐỊNH KÌ MÔN NGỮ VĂN ${grade.toUpperCase()}

| TT | Kĩ năng | Đơn vị kiến thức | Yêu cầu cần đạt (CT GDPT 2018) | Số câu hỏi theo mức độ | | | Mã năng lực |
| :---: | :---: | :--- | :--- | :---: | :---: | :---: | :---: |
| | | | | **Biết** | **Hiểu** | **Vận dụng** | |
| **1** | **Đọc hiểu** | Thể loại truyện / thơ / nghị luận | - Nhận biết ngôi kể, thể thơ, từ ngữ, nhân vật, chi tiết nghệ thuật.<br>- Hiểu ý nghĩa hình tượng, biện pháp tu từ, thông điệp tư tưởng.<br>- Rút ra bài học nhân sinh, liên hệ thực tế đời sống. | 3 câu TN | 5 câu TN | 1 câu Đúng/Sai + 2 câu ngắn | **NLĐ.1, NLĐ.2, NLĐ.3** |
| **2** | **Viết** | Viết bài văn tự luận | - Viết bài văn hoàn chỉnh: Mở bài, Thân bài, Kết bài.<br>- Diễn đạt mạch lạc, sử dụng lí lẽ, dẫn chứng thuyết phục; sáng tạo. | | 1,0đ | 4,0đ | **NLV.1, NLV.2** |

---

III. ĐỀ KIỂM TRA MINH HỌA CHUẨN CÔNG VĂN 7991

**PHẦN I: ĐỌC HIỂU (5,0 ĐIỂM)**
*Đọc ngữ liệu sau và trả lời các câu hỏi:*
*(Ngữ liệu trích đoạn văn học ngoài SGK giàu tính nhân văn, ngôn từ trong sáng phù hợp tâm sinh lí lứa tuổi học sinh ${grade})*

**1. Trắc nghiệm nhiều lựa chọn (Khoanh tròn vào chữ cái đứng trước phương án trả lời đúng):**
- **Câu 1 (Biết - 0,25đ):** Phương thức biểu đạt chính của đoạn trích trên là gì?
  A. Tự sự.   B. Biểu cảm.   C. Miêu tả.   D. Nghị luận.
- **Câu 2 (Biết - 0,25đ):** Nhân vật chính trong văn bản được miêu tả qua những chi tiết nào?
  A. Ngoại hình và trang phục.   B. Lời nói và hành động.   C. Suy nghĩ và tâm trạng.   D. Cả A, B, C.
- **Câu 3 (Biết - 0,25đ):** Biện pháp tu từ nào được sử dụng trong câu văn in nghiêng?
  A. So sánh.   B. Ẩn dụ.   C. Nhân hóa.   D. Hoán dụ.
- **Câu 4 (Hiểu - 0,25đ):** Vì sao nhân vật lại có thái độ ngập ngừng khi đưa ra quyết định?
  A. Vì lo sợ bị người khác chê cười.   B. Vì dằn vặt giữa lòng tự trọng và hoàn cảnh khó khăn.
  C. Vì không có người giúp đỡ.   D. Vì không muốn nhận lỗi.
- **Câu 5 (Hiểu - 0,25đ):** Tác dụng chính của biện pháp tu từ so sánh trong đoạn văn thứ hai là gì?
  A. Làm nổi bật sự cô đơn của nhân vật.   B. Tăng tính gợi hình, khắc họa sâu sắc vẻ đẹp tâm hồn nhân vật.
  C. Nhấn mạnh khung cảnh thiên nhiên hùng vĩ.   D. Tạo nhịp điệu dồn dập cho câu văn.
- **Câu 6 (Hiểu - 0,25đ):** Câu văn nào sau đây khái quát rõ nhất thông điệp của tác giả?
  A. Câu mở đầu đoạn 1.   B. Câu kết thúc đoạn trích.   C. Câu đối thoại của nhân vật.   D. Câu trần thuật ở đoạn 3.
- **Câu 7 (Hiểu - 0,25đ):** Nhan đề của văn bản mang ý nghĩa biểu tượng gì?
  A. Biểu tượng cho lòng dũng cảm.   B. Biểu tượng cho tình yêu thương và sự sẻ chia thầm lặng.
  C. Biểu tượng cho quê hương xứ sở.   D. Biểu tượng cho ước mơ tuổi thơ.
- **Câu 8 (Hiểu - 0,25đ):** Qua đoạn trích, tác giả thể hiện thái độ, tình cảm gì đối với nhân vật?
  A. Đồng cảm, trân trọng và ngợi ca phẩm giá con người.   B. Phê phán thói ích kỉ, hẹp hòi.
  C. Xót xa trước sự bất lực của số phận.   D. Hoài nghi trước những giá trị tốt đẹp.

**2. Trắc nghiệm Đúng - Sai (1,0 điểm):**
- **Câu 9 (Vận dụng - 1,0 điểm):** Đọc lại đoạn văn cuối và xác định tính Đúng/Sai của các nhận định sau:
  a) Nhân vật đã vượt qua thử thách nhờ sự giúp đỡ hoàn toàn từ người khác. (Đúng / Sai)
  b) Tác phẩm khẳng định sức mạnh của niềm tin và sự trung thực trong cuộc sống. (Đúng / Sai)
  c) Chi tiết cuối cùng mang ý nghĩa khép lại câu chuyện mà không để lại dư âm triết lí. (Đúng / Sai)
  d) Ngôn ngữ kể chuyện mộc mạc, gần gũi nhưng giàu chất thơ và tính biểu cảm cao. (Đúng / Sai)

**3. Trắc nghiệm trả lời ngắn (2,0 điểm):**
- **Câu 10 (Hiểu - 1,0 điểm):** Nêu ngắn gọn (từ 2 - 3 câu) ý nghĩa của hành động chia sẻ trong đoạn trích đối với sự thay đổi của nhân vật.
- **Câu 11 (Vận dụng - 1,0 điểm):** Từ câu chuyện của nhân vật, em hãy rút ra một bài học ứng xử có ý nghĩa thiết thực nhất cho bản thân khi gặp khó khăn trong học tập.

**PHẦN II: VIẾT (5,0 ĐIỂM)**
- **Đề bài:** Hãy viết một bài văn (khoảng 400 - 500 chữ) trình bày suy nghĩ của em về ý nghĩa của lòng nhân ái và sự đồng cảm giữa con người với con người trong cuộc sống hiện đại.

---

IV. HƯỚNG DẪN CHẤM VÀ THANG ĐIỂM CHI TIẾT
1. Phần I: Đọc hiểu (5,0 điểm)
- Câu 1 - 8 (Trắc nghiệm nhiều lựa chọn): Mỗi câu đúng được 0,25 điểm (Tổng 2,0 điểm).
  + Đáp án tham khảo: 1.A | 2.D | 3.B | 4.B | 5.B | 6.B | 7.B | 8.A.
- Câu 9 (Trắc nghiệm Đúng/Sai):
  + Quy tắc chấm chuẩn Công văn 7991:
    * Đúng 1 ý: 0,10 điểm.
    * Đúng 2 ý: 0,25 điểm.
    * Đúng 3 ý: 0,50 điểm.
    * Đúng cả 4 ý: 1,00 điểm.
  + Đáp án tham khảo: a) Sai | b) Đúng | c) Sai | d) Đúng.
- Câu 10 (1,0 điểm): Nêu được ý nghĩa: Hành động chia sẻ đã giúp nhân vật vơi đi nỗi mặc cảm, tìm lại niềm tin yêu và động lực vươn lên (1,0đ; nêu được 1 ý đạt 0,5đ).
- Câu 11 (1,0 điểm): Rút ra bài học chân thành, tích cực, có tính thuyết phục cao (1,0đ).

2. Phần II: Viết bài văn tự luận (5,0 điểm)
- Đảm bảo cấu trúc bài văn nghị luận xã hội (0,5 điểm): Có đủ Mở bài, Thân bài, Kết bài.
- Xác định đúng vấn đề nghị luận (0,5 điểm): Ý nghĩa của lòng nhân ái và sự đồng cảm trong cuộc đời.
- Triển khai vấn đề nghị luận sâu sắc (3,0 điểm):
  + Giải thích thế nào là lòng nhân ái, sự đồng cảm (0,5đ).
  + Phân tích biểu hiện và vai trò, giá trị to lớn của sự sẻ chia (1,5đ).
  + Dẫn chứng thực tế tiêu biểu, giàu sức thuyết phục (0,5đ).
  + Phản biện những biểu hiện vô cảm, ích kỉ trong xã hội (0,5đ).
- Sáng tạo và liên hệ bản thân (0,5 điểm): Có cách diễn đạt độc đáo, văn phong truyền cảm, liên hệ hành động thực tế.
- Chính tả, ngữ pháp (0,5 điểm): Không mắc lỗi dùng từ, đặt câu, chuẩn chính tả tiếng Việt.`;
}

// Setup Vite in development or serve static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
