import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  HeadingLevel,
  BorderStyle,
} from 'docx';

export interface ExportDocxOptions {
  title: string;
  subject: string;
  grade: string;
  curriculum: string;
  topic: string;
  mode: 'mode1' | 'mode2' | 'mode3';
  content: string;
}

export async function generateDocxBlob(options: ExportDocxOptions): Promise<Blob> {
  const { title, subject, grade, curriculum, topic, mode, content } = options;

  const lines = content.split('\n');
  const children: (Paragraph | Table)[] = [];

  // 1. National Emblem / Header (Tiêu ngữ hành chính giáo dục)
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: 'BỘ GIÁO DỤC VÀ ĐÀO TẠO',
          bold: true,
          size: 24, // 12pt
          font: 'Times New Roman',
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM',
          bold: true,
          size: 24,
          font: 'Times New Roman',
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: 'Độc lập - Tự do - Hạnh phúc',
          bold: true,
          underline: {},
          size: 24,
          font: 'Times New Roman',
        }),
      ],
      spacing: { after: 280 },
    }),
  );

  // 2. Document Title
  let mainTitle = '';
  let subDocReference = '';
  if (mode === 'mode1') {
    mainTitle = 'KẾ HOẠCH BÀI DẠY (GIÁO ÁN)';
    subDocReference = 'Căn cứ Phụ lục IV - Công văn số 5512/BGDĐT-GDTrH';
  } else if (mode === 'mode2') {
    mainTitle = 'SLIDE BÀI GIẢNG ĐIỆN TỬ (CV 5512)';
    subDocReference = 'Thiết kế theo tiến trình dạy học Công văn 5512/BGDĐT-GDTrH';
  } else {
    mainTitle = 'MA TRẬN, BẢN ĐẶC TẢ VÀ ĐỀ KIỂM TRA ĐỊNH KÌ';
    subDocReference = 'Căn cứ Công văn số 7991/BGDĐT-GDTrH ngày 17/12/2024 của Bộ GDĐT';
  }

  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      heading: HeadingLevel.TITLE,
      children: [
        new TextRun({
          text: mainTitle,
          bold: true,
          size: 32, // 16pt
          color: '1A365D',
          font: 'Times New Roman',
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: `Môn: ${subject} - Khối: ${grade} | Bộ sách: ${curriculum}`,
          bold: true,
          italics: true,
          size: 26,
          font: 'Times New Roman',
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: `Bài học / Chủ đề: ${topic}`,
          bold: true,
          size: 26,
          font: 'Times New Roman',
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: `(${subDocReference})`,
          italics: true,
          size: 22,
          font: 'Times New Roman',
        }),
      ],
      spacing: { after: 360 },
    }),
  );

  // Helper to parse markdown table blocks into docx Table
  let inTable = false;
  let tableRowsRaw: string[] = [];

  const flushTable = () => {
    if (tableRowsRaw.length === 0) return;

    // Filter out separator rows like |---|---|
    const parsedRows = tableRowsRaw
      .filter((r) => !r.match(/^\|?\s*[-:]+\s*\|[-:|\s]*$/))
      .map((r) => {
        // split by |
        const parts = r.split('|').map((c) => c.trim());
        // remove leading/trailing empty string if starts/ends with |
        if (parts.length > 0 && parts[0] === '') parts.shift();
        if (parts.length > 0 && parts[parts.length - 1] === '') parts.pop();
        return parts;
      })
      .filter((cols) => cols.length > 0);

    if (parsedRows.length > 0) {
      const maxCols = Math.max(...parsedRows.map((r) => r.length));
      const docxRows: TableRow[] = [];

      parsedRows.forEach((cols, rIndex) => {
        const isHeader = rIndex === 0;
        const cells: TableCell[] = [];

        for (let c = 0; c < maxCols; c++) {
          const rawText = cols[c] || '';
          // clean HTML or markdown tags like <br>, **
          const cleanedText = rawText.replace(/<br\s*\/?>/gi, '\n').replace(/\*\*/g, '');

          cells.push(
            new TableCell({
              children: cleanedText.split('\n').map(
                (subLine) =>
                  new Paragraph({
                    alignment: isHeader ? AlignmentType.CENTER : AlignmentType.LEFT,
                    children: [
                      new TextRun({
                        text: subLine.trim(),
                        bold: isHeader || rawText.includes('**'),
                        size: 20, // 10pt for dense tables
                        font: 'Times New Roman',
                      }),
                    ],
                    spacing: { before: 40, after: 40 },
                  }),
              ),
              shading: isHeader ? { fill: 'F0F4F8' } : undefined,
              borders: {
                top: { style: BorderStyle.SINGLE, size: 1, color: '888888' },
                bottom: { style: BorderStyle.SINGLE, size: 1, color: '888888' },
                left: { style: BorderStyle.SINGLE, size: 1, color: '888888' },
                right: { style: BorderStyle.SINGLE, size: 1, color: '888888' },
              },
            }),
          );
        }

        docxRows.push(
          new TableRow({
            children: cells,
            tableHeader: isHeader,
          }),
        );
      });

      children.push(
        new Table({
          rows: docxRows,
          width: { size: 100, type: WidthType.PERCENTAGE },
        }),
      );

      // add spacing after table
      children.push(new Paragraph({ spacing: { after: 200 } }));
    }

    tableRowsRaw = [];
    inTable = false;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Check table row
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      inTable = true;
      tableRowsRaw.push(trimmed);
      continue;
    } else if (inTable) {
      flushTable();
    }

    if (!trimmed) {
      // blank line
      children.push(new Paragraph({ spacing: { after: 120 } }));
      continue;
    }

    // Horizontal rule
    if (trimmed === '---' || trimmed === '***') {
      children.push(new Paragraph({ spacing: { after: 240 } }));
      continue;
    }

    // Heading 1: Roman numerals (I. MỤC TIÊU, II. THIẾT BỊ..., III. TIẾN TRÌNH..., PHẦN I...)
    const isHeading1 =
      /^(I|II|III|IV|V)\.\s+[A-ZÀ-Ỹ\s]+/.test(trimmed) ||
      /^PHẦN\s+(I|II|III|IV|V)/i.test(trimmed) ||
      trimmed.startsWith('# ');

    // Heading 2: HOẠT ĐỘNG 1, HOẠT ĐỘNG 2, Slide 1, 1. BẢNG MA TRẬN...
    const isHeading2 =
      /^HOẠT ĐỘNG\s+\d+/i.test(trimmed) ||
      /^Slide\s+\d+/i.test(trimmed) ||
      /^\d+\.\s+[A-ZÀ-Ỹ\s]+/.test(trimmed) ||
      trimmed.startsWith('## ');

    // Heading 3: a) Mục tiêu, b) Nội dung, c) Sản phẩm, d) Tổ chức thực hiện, Bước 1...
    const isHeading3 =
      /^[a-d]\)\s+[A-ZÀ-Ỹa-zà-ỹ\s]+:?/.test(trimmed) ||
      /^Bước\s+\d+:/i.test(trimmed) ||
      trimmed.startsWith('### ');

    const cleanLine = trimmed.replace(/^#+\s*/, '');

    if (isHeading1) {
      children.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [
            new TextRun({
              text: cleanLine,
              bold: true,
              size: 28, // 14pt
              color: '0F172A',
              font: 'Times New Roman',
            }),
          ],
          spacing: { before: 280, after: 140 },
        }),
      );
    } else if (isHeading2) {
      children.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [
            new TextRun({
              text: cleanLine,
              bold: true,
              size: 26, // 13pt
              color: '1E3A8A',
              font: 'Times New Roman',
            }),
          ],
          spacing: { before: 200, after: 100 },
        }),
      );
    } else if (isHeading3) {
      children.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          children: [
            new TextRun({
              text: cleanLine,
              bold: true,
              size: 24, // 12pt
              color: '2563EB',
              font: 'Times New Roman',
            }),
          ],
          spacing: { before: 140, after: 60 },
        }),
      );
    } else {
      // Normal text with bold inline formatting (**text**)
      const parts = cleanLine.split(/(\*\*.*?\*\*)/g);
      const runs = parts.map((part) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return new TextRun({
            text: part.slice(2, -2),
            bold: true,
            size: 24, // 12pt
            font: 'Times New Roman',
          });
        }
        return new TextRun({
          text: part,
          size: 24,
          font: 'Times New Roman',
        });
      });

      // Handle bullets
      const isBullet = cleanLine.startsWith('- ') || cleanLine.startsWith('+ ') || cleanLine.startsWith('• ');

      children.push(
        new Paragraph({
          children: runs,
          bullet: isBullet ? { level: 0 } : undefined,
          spacing: { after: 100, line: 360 }, // 1.5 line spacing (360 dxa)
        }),
      );
    }
  }

  // Ensure last table is flushed if document ended on a table
  if (inTable) {
    flushTable();
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440, // 1 inch = 1440 dxa (approx 2.54cm)
              bottom: 1440,
              left: 1700, // 3cm left margin for binding
              right: 1134, // 2cm right margin
            },
          },
        },
        children,
      },
    ],
  });

  return await Packer.toBlob(doc);
}
