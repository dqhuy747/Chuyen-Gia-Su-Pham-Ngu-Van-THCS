import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Parse content into blocks: tables, headings, lists, paragraphs
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];

  let inTable = false;
  let tableRows: string[] = [];

  const renderTable = (rows: string[], keyIndex: number) => {
    // Filter separator row
    const dataRows = rows.filter((r) => !r.match(/^\|?\s*[-:]+\s*\|[-:|\s]*$/));
    if (dataRows.length === 0) return null;

    const parsed = dataRows.map((r) => {
      const parts = r.split('|').map((c) => c.trim());
      if (parts.length > 0 && parts[0] === '') parts.shift();
      if (parts.length > 0 && parts[parts.length - 1] === '') parts.pop();
      return parts;
    });

    const header = parsed[0] || [];
    const body = parsed.slice(1);

    return (
      <div key={`table-${keyIndex}`} className="my-6 overflow-x-auto shadow-sm rounded-lg border border-slate-300">
        <table className="min-w-full divide-y divide-slate-300 text-xs sm:text-sm text-left">
          <thead className="bg-slate-100 text-slate-800 font-semibold">
            <tr>
              {header.map((col, idx) => (
                <th
                  key={idx}
                  className="px-3 py-2.5 border-r border-slate-300 last:border-r-0 text-center"
                  dangerouslySetInnerHTML={{
                    __html: col.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/<br\s*\/?>/gi, '<br/>'),
                  }}
                />
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {body.map((row, rIdx) => (
              <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50 hover:bg-amber-50/40'}>
                {row.map((cell, cIdx) => (
                  <td
                    key={cIdx}
                    className={`px-3 py-2 border-r border-slate-200 last:border-r-0 align-top ${
                      cIdx === 0 ? 'text-center font-medium' : ''
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: cell.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/<br\s*\/?>/gi, '<br/>'),
                    }}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const flushTable = (index: number) => {
    if (tableRows.length > 0) {
      elements.push(renderTable(tableRows, index));
      tableRows = [];
    }
    inTable = false;
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      inTable = true;
      tableRows.push(trimmed);
      continue;
    } else if (inTable) {
      flushTable(i);
    }

    if (!trimmed) {
      continue;
    }

    if (trimmed === '---' || trimmed === '***') {
      elements.push(<hr key={i} className="my-6 border-slate-300" />);
      continue;
    }

    // Heading 1 (I. MỤC TIÊU, PHẦN I...)
    if (
      /^(I|II|III|IV|V)\.\s+[A-ZÀ-Ỹ\s]+/i.test(trimmed) ||
      /^PHẦN\s+(I|II|III|IV|V)/i.test(trimmed) ||
      trimmed.startsWith('# ')
    ) {
      const clean = trimmed.replace(/^#+\s*/, '');
      elements.push(
        <h2
          key={i}
          className="mt-8 mb-3 text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-blue-600 pb-1.5 flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 bg-blue-600 rounded-sm inline-block"></span>
          {clean}
        </h2>,
      );
      continue;
    }

    // Heading 2 (HOẠT ĐỘNG 1, Slide 1, 1. BẢNG MA TRẬN...)
    if (
      /^HOẠT ĐỘNG\s+\d+/i.test(trimmed) ||
      /^Slide\s+\d+/i.test(trimmed) ||
      /^\d+\.\s+[A-ZÀ-Ỹ\s]+/.test(trimmed) ||
      trimmed.startsWith('## ')
    ) {
      const clean = trimmed.replace(/^#+\s*/, '');
      elements.push(
        <h3
          key={i}
          className="mt-6 mb-2 text-base sm:text-lg font-bold text-blue-900 bg-blue-50/80 px-3 py-1.5 rounded border-l-4 border-blue-700"
        >
          {clean}
        </h3>,
      );
      continue;
    }

    // Heading 3 (a) Mục tiêu, b) Nội dung, Bước 1...)
    if (
      /^[a-d]\)\s+[A-ZÀ-Ỹa-zà-ỹ\s]+:?/.test(trimmed) ||
      /^Bước\s+\d+:/i.test(trimmed) ||
      trimmed.startsWith('### ')
    ) {
      const clean = trimmed.replace(/^#+\s*/, '');
      elements.push(
        <h4 key={i} className="mt-4 mb-1.5 text-sm sm:text-base font-semibold text-slate-800 flex items-center gap-1.5">
          <span className="text-blue-600 font-bold">›</span>
          <span
            dangerouslySetInnerHTML={{
              __html: clean.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
            }}
          />
        </h4>,
      );
      continue;
    }

    // Bullets (- or + or •)
    if (trimmed.startsWith('- ') || trimmed.startsWith('+ ') || trimmed.startsWith('• ')) {
      const clean = trimmed.replace(/^[-+•]\s+/, '');
      elements.push(
        <li
          key={i}
          className="ml-5 list-disc text-sm sm:text-base text-slate-700 my-1 leading-relaxed pl-1"
          dangerouslySetInnerHTML={{
            __html: clean.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
          }}
        />,
      );
      continue;
    }

    // Normal paragraph
    elements.push(
      <p
        key={i}
        className="my-2 text-sm sm:text-base text-slate-700 leading-relaxed"
        dangerouslySetInnerHTML={{
          __html: trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
        }}
      />,
    );
  }

  if (inTable) {
    flushTable(lines.length);
  }

  return <div className="space-y-1 font-sans text-slate-800 leading-relaxed">{elements}</div>;
};
