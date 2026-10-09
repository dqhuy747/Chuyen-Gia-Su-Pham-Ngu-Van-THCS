export interface PedagogicalPreset {
  id: string;
  mode: 'mode1' | 'mode2' | 'mode3';
  title: string;
  subject: string;
  grade: 'Lớp 6' | 'Lớp 7' | 'Lớp 8' | 'Lớp 9';
  curriculum: string;
  topic: string;
  duration: string;
  examType?: string;
  content: string;
}

export const SAMPLE_PRESETS: PedagogicalPreset[] = [
  {
    id: 'khbd-van-9-dong-chi',
    mode: 'mode1',
    title: 'Ngữ văn 9 - Bài thơ Đồng chí (CV 5512)',
    subject: 'Ngữ văn',
    grade: 'Lớp 9',
    curriculum: 'Kết nối tri thức với cuộc sống',
    topic: 'Bài 1: Khát vọng hoà bình - Văn bản: Đồng chí (Chính Hữu - Tiết 1)',
    duration: '2 tiết (90 phút)',
    content: `[MODE 1: XUẤT KẾ HOẠCH BÀI DẠY (THEO PHỤ LỤC IV - CV 5512)]

I. MỤC TIÊU
1. Năng lực
- Năng lực đặc thù (Năng lực ngôn ngữ và Năng lực văn học):
  + Nhận biết và phân tích được nét độc đáo về thể loại thơ tự do, ngôn ngữ mộc mạc, cô đọng, hình ảnh chân thực giàu sức gợi cảm trong bài thơ "Đồng chí".
  + Cảm nhận và phân tích sâu sắc vẻ đẹp bình dị mà cao cả của tình đồng chí, đồng đội keo sơn giữa những người lính nông dân thời kì đầu kháng chiến chống Pháp.
  + Nhận biết tác dụng của các biện pháp tu từ: điệp từ, hoán dụ, sóng đôi, câu thơ đặc biệt ("Đồng chí!").
  + Vận dụng kĩ năng viết đoạn văn cảm thụ văn học (dung lượng 150 - 200 chữ) thể hiện suy nghĩ về giá trị của tình đồng đội trong cuộc sống.
- Năng lực chung:
  + Tự chủ và tự học: Tự đọc hiểu văn bản, chủ động ghi chép kiến thức khám phá vào phiếu học tập.
  + Giao tiếp và hợp tác: Tương tác tích cực, biết lắng nghe và phối hợp hiệu quả trong nhóm khi thực hiện nhiệm vụ đọc - hiểu.
  + Giải quyết vấn đề và sáng tạo: Biết liên hệ vẻ đẹp anh bộ đội Cụ Hồ trong kháng chiến với phẩm chất người chiến sĩ quân đội nhân dân Việt Nam ngày nay.

2. Phẩm chất
- Yêu nước: Nuôi dưỡng niềm tự hào về truyền thống yêu nước, ý chí kiên cường bảo vệ Tổ quốc của dân tộc Việt Nam.
- Nhân ái, trách nhiệm: Trân trọng sự gắn kết, tinh thần sẻ chia gian khó với bạn bè và cộng đồng xung quanh.

II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU
1. Giáo viên:
- SGK Ngữ văn 9, Kế hoạch bài dạy (Giáo án CV 5512), bài trình chiếu PowerPoint.
- Phiếu học tập số 1 (Cơ sở hình thành tình đồng chí), Phiếu học tập số 2 (Những biểu hiện cao đẹp của tình đồng chí).
- Tư liệu lịch sử, tranh ảnh chân dung người lính vệ quốc đoàn trong chiến dịch Việt Bắc thu - đông 1947.
- Quy định học liệu: Học sinh sử dụng phiếu in sẵn và giấy A3; không yêu cầu toàn bộ học sinh phải có điện thoại thông minh theo đúng chỉ đạo tại CV 5512.
2. Học sinh:
- SGK Ngữ văn 9, vở ghi bài, phần soạn bài trước ở nhà theo hệ thống câu hỏi SGK.
- Bút màu, giấy ghi chú.

III. TIẾN TRÌNH DẠY HỌC

HOẠT ĐỘNG 1: MỞ ĐẦU (7 PHÚT)
a) Mục tiêu:
- Kích hoạt cảm xúc văn học, tạo tâm thế hứng thú và kết nối học sinh vào bối cảnh cuộc kháng chiến chống thực dân Pháp.
b) Nội dung:
- Học sinh lắng nghe một đoạn nhạc ca khúc "Tình đồng chí" (Nhạc sĩ Minh Quốc phổ thơ Chính Hữu) và quan sát hình ảnh hai người chiến sĩ đứng gác dưới trăng.
- GV nêu câu hỏi: "Khi nhắc đến cụm từ 'Đồng chí', em liên tưởng đến những điều gì xúc động và thiêng liêng nhất?".
c) Sản phẩm:
- Câu trả lời của học sinh: Sự cùng chung lí tưởng, sự chia sẻ gian lao hiểm nguy, tình anh em ruột thịt nơi chiến hào...
d) Tổ chức thực hiện:
- Bước 1: Chuyển giao nhiệm vụ
  + GV phát đoạn giai điệu và trình chiếu tranh tư liệu.
  + GV đặt lệnh: Học sinh suy ngẫm trong 1 phút và ghi nhanh 3 từ khóa định nghĩa "Đồng chí" vào vở nháp.
- Bước 2: Thực hiện nhiệm vụ
  + HS lắng nghe, quan sát và ghi chép từ khóa. GV quan sát lớp.
- Bước 3: Báo cáo, thảo luận
  + GV gọi 2 học sinh chia sẻ cảm xúc và từ khóa của mình trước lớp.
- Bước 4: Kết luận, nhận định
  + GV chính xác hóa: "Đồng chí" là một danh xưng thiêng liêng xuất hiện trong cách mạng, chỉ những người cùng chung chí hướng, lí tưởng. Nhà thơ Chính Hữu - một người lính trực tiếp tham gia chiến đấu đã chưng cất nên bài thơ tuyệt tác "Đồng chí". Chúng ta cùng bước vào bài học.

HOẠT ĐỘNG 2: HÌNH THÀNH KIẾN THỨC MỚI (50 PHÚT)
a) Mục tiêu:
- Phân tích được cơ sở hình thành tình đồng chí (7 câu thơ đầu).
- Hiểu ý nghĩa độc đáo của câu thơ bản lề "Đồng chí!".
- Cảm nhận và phân tích được những biểu hiện cao đẹp, ấm áp của tình đồng đội (10 câu thơ tiếp theo).
b) Nội dung:
- Nhiệm vụ 1: Hoàn thành Phiếu học tập số 1 (7 câu thơ đầu) về xuất thân, hoàn cảnh gặp gỡ và sự tương đồng của người lính.
- Nhiệm vụ 2: Thảo luận cặp đôi về nét đặc biệt trong cấu trúc câu thơ thứ 7: "Đồng chí!".
- Nhiệm vụ 3: Hoàn thành Phiếu học tập số 2 (10 câu thơ tiếp theo): Phân tích sự thấu hiểu nỗi lòng, sự chia sẻ gian lao thiếu thốn và cử chỉ "tay nắm lấy bàn tay".
c) Sản phẩm:
- Phiếu học tập số 1:
  + Xuất thân nghèo khó: "quê hương anh nước mặn đồng chua" sóng đôi với "làng tôi nghèo đất cày lên sỏi đá".
  + Lí tưởng chiến đấu: Từ "đôi người xa lạ", vì "súng bên súng, đầu sát bên đầu" mà hòa chung nhịp đập.
  + Trải nghiệm gắn bó: "Đêm rét chung chăn thành đôi tri kỉ".
- Ý nghĩa câu thơ "Đồng chí!":
  + Câu thơ ngắn nhất bài (chỉ gồm 2 tiếng và dấu chấm than), vang lên như một phát hiện sâu sắc, một bản lề khép lại cơ sở hình thành và mở ra những biểu hiện cảm động của tình đồng chí.
- Phiếu học tập số 2:
  + Thấu hiểu tâm tư: Gửi lại quê nhà "ruộng nương", "gian nhà không mặc kệ gió lung lay".
  + Cùng chia sẻ gian khổ: Căn bệnh sốt rét rừng ("sốt run người vầng trán ướt mồ hôi"), thiếu thốn trang phục ("áo rách vai", "quần có vài mảnh vá", "chân không giày").
  + Cử chỉ sưởi ấm: "Thương nhau tay nắm lấy bàn tay" - biểu tượng của sự cảm thông sâu sắc, truyền cho nhau hơi ấm và sức mạnh vượt qua cái rét buốt mùa đông.
d) Tổ chức thực hiện:
- Bước 1: Chuyển giao nhiệm vụ
  + GV chia lớp thành 4 nhóm. Nhóm 1 và 2 thực hiện Phiếu số 1 (7 phút); Nhóm 3 và 4 thực hiện Phiếu số 2 (8 phút).
- Bước 2: Thực hiện nhiệm vụ
  + Học sinh làm việc theo nhóm, tra cứu câu chữ trong SGK, ghi chép nội dung vào phiếu nhóm.
  + GV quan sát, hướng dẫn học sinh chú ý đến nghệ thuật sóng đôi và biện pháp hoán dụ.
- Bước 3: Báo cáo, thảo luận
  + Đại diện Nhóm 1 trình bày Phiếu 1; Nhóm 2 nhận xét, bổ sung về câu thơ "Đồng chí!".
  + Đại diện Nhóm 3 trình bày Phiếu 2; Nhóm 4 bổ sung phân tích hình ảnh "tay nắm lấy bàn tay".
- Bước 4: Kết luận, nhận định
  + GV chốt bảng kiến thức chuẩn hóa, giảng bình mở rộng về cái nắm tay ấm áp giữa đêm mùa đông Việt Bắc.

HOẠT ĐỘNG 3: LUYỆN TẬP (20 PHÚT)
a) Mục tiêu:
- Củng cố đặc sắc nghệ thuật bài thơ: Thể thơ tự do, ngôn từ giản dị, giàu sức khái quát.
- Rèn luyện kĩ năng viết đoạn văn cảm thụ văn học ngắn theo cấu trúc chuẩn.
b) Nội dung:
- Đề bài: Viết một đoạn văn (khoảng 8 đến 10 câu) phân tích ý nghĩa của hình ảnh "Thương nhau tay nắm lấy bàn tay" trong bài thơ "Đồng chí".
c) Sản phẩm:
- Đoạn văn hoàn chỉnh của học sinh đáp ứng tiêu chí:
  + Câu mở đoạn: Giới thiệu câu thơ và khái quát vẻ đẹp tình đồng chí.
  + Các câu thân đoạn: Phân tích bối cảnh rét mướt thiếu thốn; phân tích ý nghĩa hành động nắm tay (không lời nhưng ấm áp, truyền lửa niềm tin, gắn kết số phận).
  + Câu kết đoạn: Đánh giá giá trị biểu cảm và rung động của hình ảnh.
d) Tổ chức thực hiện:
- Bước 1: Chuyển giao nhiệm vụ
  + GV nêu đề bài trên slide, hướng dẫn tiêu chí chấm đoạn văn ngắn. Thời gian viết: 10 phút.
- Bước 2: Thực hiện nhiệm vụ
  + HS viết độc lập vào vở. GV đi theo dõi, nhắc nhở cách ngắt câu và diễn đạt.
- Bước 3: Báo cáo, thảo luận
  + GV gọi 2 học sinh đọc đoạn văn của mình. Cả lớp nhận xét theo các tiêu chí đã nêu.
- Bước 4: Kết luận, nhận định
  + GV nhận xét, sửa lỗi diễn đạt phổ biến và chấm điểm tượng trưng động viên tinh thần.

HOẠT ĐỘNG 4: VẬN DỤNG (13 PHÚT)
a) Mục tiêu:
- Liên hệ ý nghĩa tình bạn, tình đồng đội trong bài thơ vào đời sống học đường và xã hội hiện đại.
b) Nội dung:
- Câu hỏi thảo luận: "Từ tình cảm gắn bó của những người lính năm xưa, em rút ra bài học gì về cách đối xử với bạn bè trong lớp học khi gặp hoàn cảnh khó khăn?".
c) Sản phẩm:
- Học sinh nêu được những hành động cụ thể: Sẵn sàng giúp đỡ bạn trong học tập, không xa lánh bạn bè có hoàn cảnh éo le, xây dựng tập thể lớp đoàn kết và yêu thương.
d) Tổ chức thực hiện:
- Bước 1: Chuyển giao nhiệm vụ
  + GV nêu câu hỏi liên hệ thực tế, cho học sinh thảo luận cặp đôi trong 3 phút.
- Bước 2: Thực hiện nhiệm vụ
  + Học sinh chia sẻ quan điểm với bạn cùng bàn.
- Bước 3: Báo cáo, thảo luận
  + Mời đại diện 2 học sinh phát biểu.
- Bước 4: Kết luận, nhận định
  + GV tổng kết toàn bộ tiết dạy; giao nhiệm vụ chuẩn bị tiết 2: Đọc hiểu 3 câu thơ cuối ("Đêm nay rừng hoang sương muối...") và hình tượng "Đầu súng trăng treo".`,
  },
  {
    id: 'khbd-van-6-de-men',
    mode: 'mode1',
    title: 'Ngữ văn 6 - Bài học đường đời đầu tiên (CV 5512)',
    subject: 'Ngữ văn',
    grade: 'Lớp 6',
    curriculum: 'Kết nối tri thức với cuộc sống',
    topic: 'Bài 1: Tôi và các bạn - Văn bản: Bài học đường đời đầu tiên (Tô Hoài - Tiết 1)',
    duration: '2 tiết (90 phút)',
    content: `[MODE 1: XUẤT KẾ HOẠCH BÀI DẠY (THEO PHỤ LỤC IV - CV 5512)]

I. MỤC TIÊU
1. Năng lực
- Năng lực đặc thù (Năng lực ngôn ngữ và Năng lực văn học):
  + Nhận biết được các yếu tố của truyện đồng thoại: nhân vật loài vật được nhân hóa, người kể chuyện ngôi thứ nhất (Dế Mèn tự kể), cốt truyện và lời thoại.
  + Phân tích được ngoại hình, hành động, tính cách kiêu ngạo, hống hách của Dế Mèn và bài học đường đời đầu tiên sâu sắc sau cái chết của Dế Choắt.
  + Nhận biết và phân tích tác dụng của các từ láy miêu tả ngoại hình (cường tráng, phanh phách, bóng mỡ, nhọn hoắt...).
- Năng lực chung:
  + Tự chủ và tự học: Tự đọc văn bản, phân vai đọc diễn cảm, hoàn thành phiếu học tập cá nhân.
  + Giao tiếp và hợp tác: Tích cực thảo luận nhóm để nhận xét thái độ và tính cách nhân vật.
  + Giải quyết vấn đề và sáng tạo: Rút ra bài học ứng xử cho bản thân khi mắc sai lầm.

2. Phẩm chất
- Nhân ái: Biết thấu hiểu, yêu thương và giúp đỡ bạn bè yếu thế, không bắt nạt người khác.
- Trung thực, trách nhiệm: Dám dũng cảm nhìn nhận khuyết điểm của bản thân và có ý thức sửa chữa lỗi lầm.

II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU
1. Giáo viên: SGK Ngữ văn 6 tập 1, Kế hoạch bài dạy, Phiếu học tập số 1 (Vẻ đẹp ngoại hình và tính nết Dế Mèn), Tranh minh họa truyện "Dế Mèn phiêu lưu kí", video hoạt hình ngắn trích đoạn.
2. Học sinh: SGK Ngữ văn 6, vở ghi, tranh vẽ minh họa nhân vật tự chuẩn bị (nếu có).

III. TIẾN TRÌNH DẠY HỌC

HOẠT ĐỘNG 1: MỞ ĐẦU (8 PHÚT)
a) Mục tiêu: Kích hoạt trí tưởng tượng của học sinh về thế giới loài vật đồng thoại, dẫn dắt vào bài học.
b) Nội dung: HS quan sát một số hình ảnh về thế giới côn trùng và trả lời câu hỏi: "Nếu loài vật có thể nói năng và suy nghĩ như con người, em tưởng tượng một chú dế thanh niên sẽ như thế nào?".
c) Sản phẩm: Câu trả lời hào hứng của học sinh: Khỏe khoắn, nhanh nhẹn, thích đánh nhau hoặc ca hát...
d) Tổ chức thực hiện:
- Bước 1 (Chuyển giao): GV chiếu hình ảnh và đặt câu hỏi gợi mở.
- Bước 2 (Thực hiện): HS quan sát, trao đổi nhanh với bạn bên cạnh trong 1 phút.
- Bước 3 (Báo cáo): 2 HS phát biểu ý kiến.
- Bước 4 (Kết luận): GV giới thiệu nhà văn Tô Hoài và tác phẩm bất hủ "Dế Mèn phiêu lưu kí".

HOẠT ĐỘNG 2: HÌNH THÀNH KIẾN THỨC MỚI (48 PHÚT)
a) Mục tiêu:
- Nhận biết đặc trưng truyện đồng thoại và người kể chuyện ngôi thứ nhất xưng "tôi".
- Phân tích bức chân dung ngoại hình cường tráng và nét tính cách kiêu căng của Dế Mèn.
b) Nội dung:
- Nhiệm vụ 1: Đọc phân vai đoạn 1 và thực hiện Phiếu học tập số 1: Tìm các chi tiết miêu tả càng, vuốt, cánh, râu của Dế Mèn; chỉ ra các từ láy miêu tả.
- Nhiệm vụ 2: Thảo luận nhóm: Phân tích hành động và thái độ của Dế Mèn (cà khịa với chị Cào Cào, ghét anh Gọng Vó, coi thường Dế Choắt). Dế Mèn tự hào chính đáng hay đã biến thành thói tự kiêu?
c) Sản phẩm:
- Phiếu số 1: Vuốt cứng và nhọn hoắt; cánh dài kín đuôi màu nâu bóng mỡ; đầu to và nổi từng tảng; răng đen nhánh; râu uốn cong hùng dũng. Hệ thống từ láy tượng hình đặc sắc.
- Nhận xét tính cách: Dế Mèn có vẻ đẹp khỏe mạnh đáng tự hào nhưng lại mắc thói xấu: tự mãn, kiêu ngạo, hung hăng, coi thường mọi người xung quanh.
d) Tổ chức thực hiện:
- Bước 1 (Chuyển giao): GV giao phiếu học tập số 1 cho các nhóm, thời gian 7 phút.
- Bước 2 (Thực hiện): HS làm việc nhóm, gạch chân từ ngữ trong SGK, ghi vào bảng phụ.
- Bước 3 (Báo cáo): Đại diện nhóm 1 trình bày, nhóm 3 nhận xét.
- Bước 4 (Kết luận): GV chốt bảng so sánh giữa "vẻ đẹp ngoại hình" và "sự lệch lạc trong tính cách".

HOẠT ĐỘNG 3: LUYỆN TẬP (22 PHÚT)
a) Mục tiêu: Củng cố kĩ năng nhận diện từ láy và đặc trưng nghệ thuật miêu tả nhân vật đồng thoại.
b) Nội dung: Bài tập thực hành: Tìm 5 từ láy trong đoạn văn miêu tả Dế Mèn và đặt câu với 1 trong các từ láy đó.
c) Sản phẩm: Các từ láy: phanh phách, vun vút, ngoàm ngoạp, dềnh dàng, tợn... Đặt câu đúng ngữ pháp, diễn đạt sinh động.
d) Tổ chức thực hiện:
- Bước 1 (Chuyển giao): GV phát lệnh làm bài tập cá nhân trong 5 phút.
- Bước 2 (Thực hiện): HS làm vào vở.
- Bước 3 (Báo cáo): 3 HS đọc câu văn vừa đặt.
- Bước 4 (Kết luận): GV khen ngợi các câu văn sáng tạo, chuẩn hóa tác dụng của từ láy.

HOẠT ĐỘNG 4: VẬN DỤNG (12 PHÚT)
a) Mục tiêu: Rút ra bài học tự nhận thức về ranh giới giữa tự tin và tự kiêu.
b) Nội dung: Thảo luận: "Theo em, sự tự tin và thói kiêu ngạo khác nhau ở điểm nào?".
c) Sản phẩm: HS phân biệt: Tự tin là tin vào khả năng của bản thân nhưng tôn trọng người khác; Kiêu ngạo là tự cho mình hơn người và coi thường người xung quanh.
d) Tổ chức thực hiện:
- Bước 1 (Chuyển giao): GV nêu vấn đề.
- Bước 2 (Thực hiện): HS suy ngẫm và phát biểu.
- Bước 3 (Báo cáo): GV lắng nghe học sinh chia sẻ.
- Bước 4 (Kết luận): GV dặn dò học sinh đọc tiếp phần 2 ở nhà: Vụ trêu chị Cốc và bài học đắt giá của Dế Mèn.`,
  },
  {
    id: 'slide-van-8-lao-hac',
    mode: 'mode2',
    title: 'Ngữ văn 8 - Slide bài giảng Lão Hạc (CV 5512)',
    subject: 'Ngữ văn',
    grade: 'Lớp 8',
    curriculum: 'Kết nối tri thức với cuộc sống',
    topic: 'Bài 1: Gương mặt thân yêu - Văn bản: Lão Hạc (Nam Cao)',
    duration: '2 tiết (90 phút)',
    content: `[MODE 2: XUẤT SLIDE BÀI GIẢNG (THEO TIẾN TRÌNH CV 5512)]

Slide 1: Slide Tiêu đề bài học
- Headline: VĂN BẢN: LÃO HẠC - NAM CAO
- Nội dung hiển thị:
  • Môn: Ngữ văn 8 - Cấp THCS
  • Chủ đề: Những gương mặt thân yêu (Truyện ngắn hiện thực)
  • Trọng tâm tiết 1: Bi kịch bán chó & Nhân cách cao đẹp của Lão Hạc
  • Giáo viên: Tổ Ngữ văn THCS
- Gợi ý trực quan: Bức tranh chân dung Lão Hạc già nua khắc khổ bên con chó Vàng, tông màu nâu trầm ấm gợi không gian làng quê Việt Nam trước 1945.
- Speaker Notes (Lời giảng giáo viên):
  "Chào các em! Có những tác phẩm văn học vượt qua thời gian để lay động hàng triệu trái tim. Truyện ngắn 'Lão Hạc' của nhà văn Nam Cao chính là một tượng đài như thế về vẻ đẹp tâm hồn của người nông dân nghèo khổ."

Slide 2: Hoạt động 1 - Khởi động (Chia sẻ cảm xúc)
- Headline: KHỞI ĐỘNG: TÌNH CẢM VỚI THÚ CƯNG
- Nội dung hiển thị:
  • Em đã từng nuôi một con vật cưng trong gia đình chưa?
  • Nếu phải xa cách một con vật đã gắn bó lâu năm, cảm xúc của em sẽ ra sao?
  • Nhà văn Nam Cao viết: "Lão yêu nó như yêu một đứa con..."
- Gợi ý trực quan: Ảnh chú chó trung thành nhìn người chủ; câu trích dẫn của Nam Cao được đóng khung trang trọng.
- Speaker Notes (Lời giảng giáo viên):
  "Chắc hẳn nhiều em ở đây từng gắn bó với một chú cún cưng. Nhưng với Lão Hạc, con Vàng không đơn thuần là một vật nuôi, mà là kỷ vật duy nhất của đứa con trai đi phu đồn điền cao su chưa về."

Slide 3: Khám phá 1 - Tác giả Nam Cao và hoàn cảnh nhân vật
- Headline: 1. TÁC GIẢ NAM CAO VÀ HOÀN CẢNH LÃO HẠC
- Nội dung hiển thị:
  • Nam Cao (1915 - 1951): Cây bút hiện thực xuất sắc, ngòi bút nhân đạo sâu sắc
  • Hoàn cảnh Lão Hạc:
    - Vợ mất sớm, con trai phẫn chí đi đồn điền cao su vì nghèo không có tiền cưới vợ
    - Lão già yếu, ốm một trận thập tử nhất sinh, tài sản chỉ còn mảnh vườn và con Vàng
    - Lão dằn vặt khôn nguôi trước nguy cơ phải bán con chó
- Gợi ý trực quan: Ảnh tư liệu chân dung nhà văn Nam Cao; sơ đồ tóm tắt hoàn cảnh cô độc, cùng quẫn của Lão Hạc.
- Speaker Notes (Lời giảng giáo viên):
  "Nam Cao có biệt tài đi sâu vào nội tâm nhân vật. Ông không chỉ kể chuyện đói rách mà mổ xẻ từng cơn đau giằng xé của danh dự và tình thương."

Slide 4: Khám phá 2 - Nỗi đau đớn tột cùng khi bán Cậu Vàng
- Headline: 2. TÂM TRẠNG CỦA LÃO HẠC SAU KHI BÁN CHÓ
- Nội dung hiển thị:
  • Diện mạo biến dạng vì đau đớn:
    - "Mặt lão đột nhiên co rúm lại, những vết nhăn xô lại với nhau..."
    - "Đầu lão ngoẹo về một bên, cái miệng móm mém mếu máo như con nít..."
    - "Lão hu hu khóc..."
  • Cảm xúc tự xỉn vặt: "Khốn nạn... Mình già bằng này tuổi đầu rồi mà còn đánh lừa một con chó!"
- Gợi ý trực quan: Trích đoạn văn bản nổi bật chữ nghiêng màu vàng; đồ họa biểu thị nỗi dằn vặt lương tâm của người cha già nghèo khổ.
- Speaker Notes (Lời giảng giáo viên):
  "Các em hãy chú ý từng từ ngữ miêu tả của Nam Cao: 'co rúm', 'mếu máo', 'hu hu khóc'. Lão Hạc khóc không chỉ vì tiếc con chó, mà lão khóc vì cảm thấy lương tâm mình có tội khi nỡ lừa một con vật vô tội."

Slide 5: Khám phá 3 - Nhân cách trong sạch và tình phụ tử thiêng liêng
- Headline: 3. VẺ ĐẸP NHÂN CÁCH VÀ TÌNH PHỤ TỬ
- Nội dung hiển thị:
  • Lão gửi ông Giáo:
    - Ba mươi đồng bạc tiền bán chó và dành dụm (để lo ma chay, không phiền hàng xóm)
    - Mảnh vườn hương hỏa (giữ trọn vẹn cho đứa con trai trở về)
  • Sự hi sinh cao cả:
    - Nhận cái chết đau đớn bằng bả chó để bảo vệ danh dự và mảnh vườn cho con
    - Thà chết trong sạch chứ không chịu tha hóa hay làm phiền xóm giềng
- Gợi ý trực quan: Sơ đồ đối lập: Cảnh ngộ khốn cùng vs Phẩm giá trong sạch sáng ngời như ngọc.
- Speaker Notes (Lời giảng giáo viên):
  "Dưới đáy cùng của sự bần cùng, nhân cách của Lão Hạc vẫn tỏa sáng rực rỡ. Một người cha sẵn sàng ăn củ ráy, bữa sung bữa rau, và cuối cùng tìm đến cái chết khốc liệt nhất để giữ trọn mảnh đất cho đứa con."

Slide 6: Hoạt động 3 - Luyện tập (Thảo luận cặp đôi)
- Headline: LUYỆN TẬP: ĐÁNH GIÁ CỦA ÔNG GIÁO VỀ LÃO HẠC
- Nội dung hiển thị:
  • Câu hỏi thảo luận:
    - Ban đầu khi nghe Lão Hạc xin bả chó của Binh Tư, ông Giáo đã nghĩ gì?
    - Khi chứng kiến cái chết của Lão Hạc, ông Giáo rút ra triết lí gì về con người?
  • Thời gian: 5 phút thảo luận cặp đôi
- Gợi ý trực quan: Đồng hồ đếm ngược 5 phút; biểu tượng hai cuốn sách mở ra trao đổi góc nhìn.
- Speaker Notes (Lời giảng giáo viên):
  "Cái chết của Lão Hạc khiến ông Giáo bàng hoàng đau đớn. Các em hãy thảo luận xem: Vì sao ông Giáo lại nói: 'Cuộc đời chưa hẳn đã đáng buồn, hay vẫn đáng buồn nhưng lại đáng buồn theo một nghĩa khác'?"

Slide 7: Hoạt động 4 - Vận dụng & Thông điệp nhân văn
- Headline: VẬN DỤNG: BÀI HỌC VỀ CÁCH NHÌN NHẬN CON NGƯỜI
- Nội dung hiển thị:
  • Thông điệp của nhà văn Nam Cao:
    - Phải biết quan sát, lắng nghe và thấu cảm sâu sắc trước nỗi đau của người khác
    - Đừng vội vàng phán xét bề ngoài để rồi nghi ngờ những phẩm chất tốt đẹp
  • Bài học thực tế: Luôn giữ gìn lòng tự trọng và sự trung thực trong mọi hoàn cảnh
- Gợi ý trực quan: Hình ảnh mầm cây vươn lên giữa sỏi đá; từ khóa: "THẤU CẢM - TỰ TRỌNG - NHÂN ÁI".
- Speaker Notes (Lời giảng giáo viên):
  "Học văn chính là học cách làm người. Bài học từ Lão Hạc dạy chúng ta biết cúi mình trước những mảnh đời bất hạnh và trân trọng vẻ đẹp tiềm ẩn của người lao động quanh mình."

Slide 8: Hướng dẫn tự học về nhà
- Headline: NHIỆM VỤ VỀ NHÀ
- Nội dung hiển thị:
  • Tóm tắt truyện ngắn Lão Hạc trong khoảng 10-12 dòng
  • Viết đoạn văn (khoảng 150 chữ) nêu suy nghĩ về đức hi sinh của cha mẹ
  • Chuẩn bị bài mới: Thực hành tiếng Việt (Từ tượng hình và từ tượng thanh)
- Gợi ý trực quan: Biểu tượng cuốn sổ tay dặn dò và sơ đồ tư duy tóm tắt bài học.
- Speaker Notes (Lời giảng giáo viên):
  "Tiết học hôm nay kết thúc. Các em về nhà hoàn thành đoạn văn và chuẩn bị bài Thực hành tiếng Việt cho tiết sau nhé. Thầy/Cô chúc các em học tốt!"`,
  },
  {
    id: 'de-kiem-tra-van-7-hk1',
    mode: 'mode3',
    title: 'Ngữ văn 7 - Ma trận, Bản đặc tả & Đề thi HK1 (CV 7991)',
    subject: 'Ngữ văn',
    grade: 'Lớp 7',
    curriculum: 'Kết nối tri thức với cuộc sống',
    topic: 'Kiểm tra cuối học kì I (Đọc hiểu thơ 4, 5 chữ & Viết bài văn biểu cảm)',
    duration: '90 phút',
    examType: 'Kiểm tra cuối học kì I',
    content: `[MODE 3: XUẤT MA TRẬN, BẢN ĐẶC TẢ & ĐỀ KIỂM TRA (CHUẨN CV 7991)]

1. BẢNG MA TRẬN ĐỀ KIỂM TRA ĐỊNH KÌ MÔN NGỮ VĂN LỚP 7 (CẤP THCS)
(Căn cứ Công văn số 7991/BGDĐT-GDTrH ngày 17/12/2024 của Bộ Giáo dục và Đào tạo)

| TT | Kĩ năng | Đơn vị kiến thức / Thể loại | TNKQ Nhiều lựa chọn | | | TNKQ Đúng - Sai (4 ý) | | | TNKQ Trả lời ngắn | | | Tự luận (Viết) | | | Tổng số câu/ý | | | Tổng điểm | Tỉ lệ % điểm |
| :---: | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| | | | **Biết** | **Hiểu** | **VD** | **Biết** | **Hiểu** | **VD** | **Biết** | **Hiểu** | **VD** | **Biết** | **Hiểu** | **VD** | **Biết** | **Hiểu** | **VD** | | |
| 1 | **ĐỌC HIỂU** | **Thơ bốn chữ, năm chữ**<br>(Ngữ liệu ngoài SGK: bài thơ *Hạt gạo làng ta* hoặc tương đương) | C1, C2, C3 | C4, C5 | C6 | C1.a | C1.b, C1.c | C1.d | C1 | C2 | C3 | 0 | 0 | 0 | 5 câu/ý | 5 câu/ý | 3 câu/ý | **6,0** | **60%** |
| 2 | **VIẾT** | **Viết bài văn biểu cảm** về con người hoặc sự việc giàu cảm xúc | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 (1,0đ) | 1 (1,5đ) | 1 (1,5đ) | 1 | 1 | 1 | **4,0** | **40%** |
| **TỔNG** | | | **3 câu** | **2 câu** | **1 câu** | **1 ý** | **2 ý** | **1 ý** | **1 câu** | **1 câu** | **1 câu** | | | **1 bài** | **5** | **5** | **3** | **10,0** | **100%** |
| **Tổng điểm theo dạng** | | | **1,5 đ** (6 câu x 0,25) | | | **1,5 đ** (1 câu x 4 ý) | | | **3,0 đ** (3 câu x 1,0) | | | **4,0 đ** (Bài văn tự luận) | | | | | | **10,0** | |
| **Tổng điểm theo mức độ** | | | | | | | | | | | | | | | **4,0 đ** | **3,0 đ** | **3,0 đ** | **10,0** | **100%** |
| **Tỉ lệ %** | | | **40% (Biết)** | | | **30% (Hiểu)** | | | **30% (Vận dụng)** | | | | | | | | | **10,0** | **100%** |

*Ghi chú chuyên môn Ngữ văn THCS chuẩn CV 7991:*
- Phần Đọc hiểu chiếm 6,0 điểm (gồm 6 câu trắc nghiệm nhiều lựa chọn: 1,5đ; 1 câu đúng sai 4 ý: 1,5đ; 3 câu trả lời ngắn: 3,0đ).
- Phần Viết chiếm 4,0 điểm (Bài văn biểu cảm tự luận).
- Tỉ lệ phân bổ mức độ nhận thức đảm bảo đúng chuẩn: Biết 40% (4,0đ), Hiểu 30% (3,0đ), Vận dụng 30% (3,0đ).

---

2. BẢN ĐẶC TẢ ĐỀ KIỂM TRA ĐỊNH KÌ MÔN NGỮ VĂN LỚP 7
(Theo chuẩn Công văn 7991/BGDĐT-GDTrH)

| TT | Kĩ năng | Nội dung / Đơn vị kiến thức | Yêu cầu cần đạt (theo CT GDPT 2018 môn Ngữ văn THCS) | Số câu hỏi ở các mức độ đánh giá | | | | | | | | | | | | Mã hóa năng lực |
| :---: | :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| | | | | **Nhiều lựa chọn** | | | **Đúng - Sai (ý)** | | | **Trả lời ngắn** | | | **Tự luận (Viết)** | | | |
| | | | | **B** | **H** | **VD** | **B** | **H** | **VD** | **B** | **H** | **VD** | **B** | **H** | **VD** | |
| 1 | **Đọc hiểu** | Thơ bốn chữ, năm chữ | **Nhận biết:**<br>- Nhận biết thể thơ bốn chữ hoặc năm chữ.<br>- Nhận biết phương thức biểu đạt, vần, nhịp, từ ngữ, hình ảnh trong bài thơ.<br>- Nhận diện biện pháp tu từ so sánh, nhân hóa, điệp từ.<br>**Thông hiểu:**<br>- Hiểu ý nghĩa các hình ảnh độc đáo trong bài thơ.<br>- Phân tích tác dụng của biện pháp tu từ đối với việc bộc lộ cảm xúc.<br>- Hiểu được tình cảm, cảm xúc của tác giả thể hiện qua bài thơ.<br>**Vận dụng:**<br>- Rút ra thông điệp, bài học cuộc sống từ bài thơ.<br>- Thể hiện thái độ, tình cảm đối với vấn đề được gợi ra từ văn bản. | 3 (C1, C2, C3) | 2 (C4, C5) | 1 (C6) | 1 (C1a) | 2 (C1b, C1c) | 1 (C1d) | 1 (C1) | 1 (C2) | 1 (C3) | 0 | 0 | 0 | NLĐ.1 (Nhận biết thể loại & ngôn ngữ)<br>NLĐ.2 (Hiểu nội dung & thông điệp)<br>NLĐ.3 (Vận dụng & đánh giá) |
| 2 | **Viết** | Viết bài văn biểu cảm | **Vận dụng:**<br>- Viết được bài văn biểu cảm về một người thân yêu (ông bà, cha mẹ, thầy cô) hoặc một kỷ niệm sâu sắc.<br>- Bố cục 3 phần rõ ràng, kết hợp nhuần nhuyễn giữa tự sự, miêu tả để bộc lộ cảm xúc chân thành, trong sáng.<br>- Không mắc lỗi chính tả, dùng từ, đặt câu; có lời văn gợi cảm, sáng tạo. | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 1 | 1 | NLV.1 (Tạo lập văn bản biểu cảm)<br>NLV.2 (Biểu đạt cảm xúc sáng tạo) |

---

3. ĐỀ KIỂM TRA MINH HỌA

PHÒNG GD&ĐT ....................
TRƯỜNG THCS ....................
ĐỀ KIỂM TRA ĐỊNH KÌ CUỐI HỌC KÌ I
MÔN: NGỮ VĂN - LỚP 7 (CẤP THCS)
Thời gian làm bài: 90 phút (Không kể thời gian phát đề)

I. PHẦN ĐỌC HIỂU (6,0 điểm)
Đọc đoạn trích bài thơ sau và thực hiện các yêu cầu:

"Hạt gạo làng ta
Có vị phù sa
Của sông Kinh Thầy
Có hương sen thơm
Trong hồ nước đầy
Có lời mẹ hát
Ngọt bùi đắng cay...

Hạt gạo làng ta
Có bão tháng bảy
Có mưa tháng ba
Giọt mồ hôi sa
Những trưa tháng sáu
Nước như ai nấu
Chết cả cá cờ
Cua ngoi lên bờ
Mẹ em xuống cấy..."
(Trích *Hạt gạo làng ta* - Trần Đăng Khoa)

1. Câu trắc nghiệm nhiều phương án lựa chọn (1,5 điểm - Mỗi câu trả lời đúng được 0,25 điểm)

Câu 1 (Biết): Đoạn trích bài thơ trên được viết theo thể thơ nào?
A. Thơ bốn chữ.
B. Thơ năm chữ.
C. Thơ lục bát.
D. Thơ tự do.

Câu 2 (Biết): Phương thức biểu đạt chính của đoạn trích là gì?
A. Tự sự.
B. Miêu tả.
C. Biểu cảm.
D. Nghị luận.

Câu 3 (Biết): Trong khổ thơ thứ nhất, hạt gạo làng ta được kết tinh từ những hương vị nào sau đây?
A. Nắng gió miền Trung, mưa lũ miền Nam.
B. Vị phù sa sông Kinh Thầy, hương sen hồ nước đầy và lời ru ngọt ngào của mẹ.
C. Mùi hương lúa non và tiếng sáo diều trên triền đê.
D. Sương sớm đầu cành và giọt mồ hôi của người cha.

Câu 4 (Hiểu): Biện pháp tu từ nào được sử dụng nổi bật trong hai câu thơ: "Nước như ai nấu / Chết cả cá cờ"?
A. Nhân hóa.
B. So sánh và nói quá.
C. Điệp ngữ.
D. Ẩn dụ chuyển đổi cảm giác.

Câu 5 (Hiểu): Hình ảnh đối lập "Cua ngoi lên bờ / Mẹ em xuống cấy" có tác dụng gì?
A. Miêu tả sự phong phú của hệ sinh thái đồng quê trong mùa vụ.
B. Làm nổi bật sự vất vả, lam lũ, đức hi sinh kiên cường của người mẹ trên đồng ruộng giữa trưa hè nắng gắt.
C. Thể hiện niềm vui say mê lao động bất chấp thời tiết của người nông dân.
D. Nhấn mạnh hiện tượng nước sông dâng cao làm tôm cua hoảng sợ.

Câu 6 (Vận dụng): Tình cảm của tác giả Trần Đăng Khoa đối với người mẹ và hạt gạo quê hương thể hiện qua đoạn trích là:
A. Tình yêu mến thiên nhiên sông nước quê hương.
B. Sự tò mò khám phá các mùa trong năm của đồng bằng Bắc Bộ.
C. Lòng biết ơn sâu sắc, niềm trân trọng nâng niu từng hạt gạo và sự cảm phục trước đức hi sinh của mẹ.
D. Nỗi buồn thương da diết trước cảnh đói nghèo của làng quê xưa.

2. Câu trắc nghiệm Đúng/Sai (1,5 điểm)
Câu 1: Thí sinh đọc nhận định và chọn Đúng hoặc Sai cho mỗi ý a), b), c), d):
(Quy tắc chấm CV 7991: Đúng 1 ý được 0,10đ; đúng 2 ý được 0,25đ; đúng 3 ý được 0,50đ; đúng 4 ý được 1,00đ).
a) Cụm từ "Hạt gạo làng ta" được điệp lại ở đầu mỗi khổ thơ có tác dụng nhấn mạnh chủ thể trữ tình và tạo nhịp điệu tha thiết.
b) Từ "đắng cay" trong câu "Ngọt bùi đắng cay" chỉ vị giác thuần túy của thức ăn chứ không mang ý nghĩa ẩn dụ về cuộc đời gian truân của mẹ.
c) Câu thơ "Giọt mồ hôi sa / Những trưa tháng sáu" khắc họa sinh động nỗi nhọc nhằn, cay đắng của người nông dân để làm ra hạt thóc.
d) Tác giả Trần Đăng Khoa sáng tác bài thơ khi ông đã trưởng thành và trở thành người lính trải qua nhiều chiến dịch.

3. Câu trắc nghiệm trả lời ngắn (3,0 điểm)
Thí sinh ghi câu trả lời ngắn gọn, chính xác vào giấy thi:
Câu 1 (1,0 điểm - Biết): Chỉ ra 2 từ ngữ chỉ thời tiết khắc nghiệt được nhắc tới trong khổ thơ thứ hai.
Câu 2 (1,0 điểm - Hiểu): Qua hai dòng thơ "Có lời mẹ hát / Ngọt bùi đắng cay", em hiểu lời hát của mẹ đã bồi đắp cho tâm hồn đứa con những điều gì? (Trả lời trong khoảng 2 - 3 câu).
Câu 3 (1,0 điểm - Vận dụng): Từ hình ảnh người mẹ "lội xuống cấy" giữa trưa hè bỏng rát, em rút ra bài học gì về thái độ của bản thân đối với thức ăn và công sức của người lao động hằng ngày? (Viết từ 3 - 4 câu).

---

II. PHẦN VIẾT (4,0 điểm - TỰ LUẬN)
Đề bài: Viết một bài văn biểu cảm (khoảng 400 - 500 chữ) bày tỏ tình cảm, cảm xúc chân thành của em đối với một người thân yêu nhất trong gia đình (ông, bà, cha hoặc mẹ).

---

4. ĐÁP ÁN VÀ HƯỚNG DẪN CHẤM

A. PHẦN I: ĐỌC HIỂU (6,0 ĐIỂM)
1. Đáp án nhiều phương án lựa chọn (1,5 điểm - 0,25đ/câu):
- Câu 1: A (Thơ bốn chữ)
- Câu 2: C (Biểu cảm)
- Câu 3: B (Vị phù sa, hương sen và lời ru ngọt ngào)
- Câu 4: B (So sánh và nói quá)
- Câu 5: B (Làm nổi bật sự vất vả, đức hi sinh kiên cường của mẹ)
- Câu 6: C (Lòng biết ơn sâu sắc và trân trọng hạt gạo, yêu mẹ)

2. Hướng dẫn chấm câu Đúng/Sai (1,5 điểm):
- a) Đúng: Điệp ngữ tạo điệp khúc ngân vang, nhấn mạnh nguồn gốc hạt gạo.
- b) Sai: "Đắng cay" ở đây mang nghĩa ẩn dụ chỉ những gian truân, vất vả, thăng trầm của đời mẹ.
- c) Đúng: Khắc họa giọt mồ hôi mặn mòi đổ xuống luống cày.
- d) Sai: Trần Đăng Khoa sáng tác bài thơ này vào năm 1968 khi ông mới 10 tuổi (thời niên thiếu).
*Thang điểm CV 7991: Đúng 1 ý: 0,10đ | Đúng 2 ý: 0,25đ | Đúng 3 ý: 0,50đ | Đúng cả 4 ý: 1,00đ (hoặc quy đổi trên thang điểm 1,5đ: đúng 4 ý đạt 1,5đ, đúng 3 ý đạt 0,75đ, đúng 2 ý đạt 0,4đ, đúng 1 ý đạt 0,15đ).*

3. Đáp án câu trả lời ngắn (3,0 điểm):
- Câu 1 (1,0 đ): Hai từ ngữ chỉ thời tiết khắc nghiệt: "bão tháng bảy", "mưa tháng ba", hoặc "nắng trưa tháng sáu" (Nêu đúng 2 cụm từ: 1,0 điểm; nêu 1 cụm: 0,5 điểm).
- Câu 2 (1,0 đ): Lời mẹ hát vừa chứa đựng tình mẫu tử ngọt ngào, vừa thấm thía nỗi nhọc nhằn, nuôi dưỡng tâm hồn con lòng biết ơn, sự bao dung và tình yêu thương nguồn cội (Đạt ý: 1,0 điểm).
- Câu 3 (1,0 đ): Bài học rút ra: Biết trân quý hạt cơm, không lãng phí thức ăn; biết ơn sâu sắc công lao cha mẹ và người nông dân; có ý thức giúp đỡ gia đình những việc vừa sức (Diễn đạt trôi chảy, sâu sắc: 1,0 điểm).

B. PHẦN II: VIẾT (4,0 ĐIỂM - TỰ LUẬN)
Rubric chấm bài văn biểu cảm theo chuẩn GDPT 2018:
- Mở bài (0,5 điểm): Giới thiệu được người thân và ấn tượng, tình cảm chung sâu đậm dành cho người đó.
- Thân bài (2,5 điểm):
  + Biểu cảm về đặc điểm ngoại hình, nụ cười, ánh mắt, bàn tay tảo tần của người thân (0,75 điểm).
  + Kể lại 1 - 2 kỉ niệm xúc động gắn bó sâu sắc, qua đó bộc lộ tình yêu thương, sự kính trọng, lòng biết ơn (1,25 điểm).
  + Thể hiện suy nghĩ về vai trò, sự chở che của người thân đối với sự trưởng thành của bản thân (0,5 điểm).
- Kết bài (0,5 điểm): Khẳng định lại tình cảm thiêng liêng và lời hứa, mong ước dành cho người thân.
- Chính tả, ngữ pháp, sáng tạo (0,5 điểm):
  + Đảm bảo chuẩn chính tả tiếng Việt, câu văn giàu hình ảnh, cảm xúc chân thành, có cách diễn đạt mới mẻ (0,5 điểm).
  + Sai từ 3 - 4 lỗi chính tả/ngữ pháp trừ 0,25 điểm; sai nhiều trừ 0,5 điểm.`,
  },
];
