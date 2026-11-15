export function Section({ id, children, className = "", background = "bg-[#F4EFE5]" }) {
  return (
    <section
      id={id}
      className={`relative z-10 scroll-mt-20 py-20 sm:py-28 ${background} ${className}`}
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  highlightTitle = "",
  description,
  action,
}) {
  return (
    <div className="mb-12 border-b border-[#D8CDBB] pb-6 sm:mb-16">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-[#777064]">
            <span className="font-bold text-[#183D2B]">{index}</span>
            <span className="text-[#D8CDBB]">/</span>
            <span>{eyebrow}</span>
          </div>

          <h2 className="mt-4 font-serif text-3xl font-bold uppercase tracking-tight text-[#191919] sm:text-5xl lg:text-6xl">
            {title}{" "}
            {highlightTitle && (
              <span className="text-[#183D2B]">
                {highlightTitle}
              </span>
            )}
          </h2>
        </div>

        {action && <div className="shrink-0">{action}</div>}
      </div>

      {description && (
        <p className="mt-4 max-w-2xl font-sans text-sm sm:text-base leading-relaxed text-[#777064]">
          {description}
        </p>
      )}
    </div>
  );
}
