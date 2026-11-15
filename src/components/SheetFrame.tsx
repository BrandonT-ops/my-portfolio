/**
 * The border of the drawing sheet, fixed around the window, with zone
 * letters and numbers in the margin like a real drafting sheet.
 */
export default function SheetFrame() {
  const letters = ["A", "B", "C", "D"];
  const numbers = ["1", "2", "3", "4", "5", "6"];
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-30 hidden md:block">
      <div className="absolute inset-[14px] border border-line/25" />
      {(["left-0", "right-0"] as const).map((side) => (
        <div key={side} className={`absolute ${side} inset-y-[14px] flex w-[14px] flex-col`}>
          {letters.map((l) => (
            <span key={l} className="flex flex-1 items-center justify-center border-b border-line/25 font-mono text-[8px] text-muted last:border-b-0">
              {l}
            </span>
          ))}
        </div>
      ))}
      <div className="absolute inset-x-[14px] bottom-0 flex h-[14px]">
        {numbers.map((n) => (
          <span key={n} className="flex flex-1 items-center justify-center border-r border-line/25 font-mono text-[8px] text-muted last:border-r-0">
            {n}
          </span>
        ))}
      </div>
    </div>
  );
}
