import { useState, useMemo } from "react";
import { Search, Filter, BookOpen, Download } from "lucide-react";
import type { Programme } from "../../data/universities";
import { cn } from "../../utils/cn";

interface ProgrammeCardsProps {
  programmes: Programme[];
  className?: string;
}

export function ProgrammeCards({ programmes, className }: ProgrammeCardsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [mediumFilter, setMediumFilter] = useState("All");
  const [patternFilter, setPatternFilter] = useState("All");

  const hasPattern = programmes.some((p) => p.pattern);
  const mediums = Array.from(new Set(programmes.map((p) => p.medium).filter(Boolean)));
  const patterns = Array.from(new Set(programmes.map((p) => p.pattern).filter(Boolean)));

  const filteredProgrammes = useMemo(() => {
    return programmes.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesMedium = mediumFilter === "All" || p.medium === mediumFilter;
      const matchesPattern = patternFilter === "All" || p.pattern === patternFilter;
      return matchesSearch && matchesMedium && matchesPattern;
    });
  }, [programmes, searchTerm, mediumFilter, patternFilter]);

  return (
    <div className={cn("space-y-6", className)}>
      {/* Filters */}
      <div className="flex flex-col gap-4 rounded-2xl border border-white/40 bg-white/70 p-5 shadow-soft backdrop-blur-md sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search programmes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white/80 py-3 pl-11 pr-4 text-base sm:text-sm font-bold text-slate-900 placeholder:text-slate-500 outline-none shadow-xs transition focus:border-ksc-royal focus:bg-white focus:ring-2 focus:ring-ksc-royal/20"
          />
        </div>
        
        <div className="flex gap-3 sm:w-auto w-full">
          {mediums.length > 1 && (
            <div className="flex-1 sm:flex-none">
              <select
                value={mediumFilter}
                onChange={(e) => setMediumFilter(e.target.value)}
                className="w-full cursor-pointer appearance-none rounded-xl border border-slate-300 bg-white/80 px-4 py-3 text-base sm:text-sm font-bold text-slate-900 outline-none shadow-xs transition focus:border-ksc-royal focus:bg-white focus:ring-2 focus:ring-ksc-royal/20"
                style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23071B4A%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right .7em top 50%', backgroundSize: '.65em auto' }}
              >
                <option value="All">All Mediums</option>
                {mediums.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          )}
          {hasPattern && patterns.length > 1 && (
            <div className="flex-1 sm:flex-none">
              <select
                value={patternFilter}
                onChange={(e) => setPatternFilter(e.target.value)}
                className="w-full cursor-pointer appearance-none rounded-xl border border-slate-300 bg-white/80 px-4 py-3 text-base sm:text-sm font-bold text-slate-900 outline-none shadow-xs transition focus:border-ksc-royal focus:bg-white focus:ring-2 focus:ring-ksc-royal/20"
                style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23071B4A%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right .7em top 50%', backgroundSize: '.65em auto' }}
              >
                <option value="All">All Patterns</option>
                {patterns.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      {filteredProgrammes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center text-slate-600">
          <Filter className="mx-auto h-10 w-10 opacity-40 mb-4" />
          <p className="text-lg font-bold">No programmes found matching your filters.</p>
          <button onClick={() => { setSearchTerm(""); setMediumFilter("All"); setPatternFilter("All"); }} className="mt-4 text-sm font-extrabold text-ksc-royal hover:underline">
            Clear all filters
          </button>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="relative hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-lift sm:block">
            <table className="w-full min-w-[780px] table-fixed text-left text-sm text-slate-800">
              <colgroup><col className="w-[34%]" /><col className="w-[36%]" /><col className="w-[20%]" /><col className="w-[10%]" /></colgroup>
              <thead className="bg-gradient-to-r from-ksc-navy to-ksc-royal text-xs uppercase tracking-[.12em] text-white">
                <tr>
                  <th className="border-b border-white/10 px-5 py-4 font-black">Programme</th>
                  <th className="border-b border-white/10 px-5 py-4 font-black">Eligibility</th>
                  <th className="whitespace-nowrap border-b border-white/10 px-5 py-4 font-black">Medium &amp; Pattern</th>
                  <th className="border-b border-white/10 px-5 py-4 text-center font-black">Syllabus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredProgrammes.map((p, idx) => (
                  <tr key={`${p.name}-${idx}`} className={cn("group animate-fade-in-up transition-all duration-300 hover:bg-slate-50/80 hover:shadow-soft", idx % 2 === 1 && "bg-slate-50/50")} style={{ animationDelay: `${idx * 35}ms` }}>
                    <td className="border-l-4 border-transparent px-5 py-4 align-middle text-base font-extrabold leading-6 text-ksc-navy transition-colors group-hover:border-ksc-red group-hover:text-ksc-red">
                      {p.name}
                    </td>
                    <td className="px-5 py-4 align-middle text-xs sm:text-sm font-bold leading-relaxed text-slate-700">
                      {p.eligibility || '—'}
                    </td>
                    <td className="px-5 py-4 align-middle">
                      <div className="flex flex-wrap gap-1.5">
                        {p.medium && (
                          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-sky-300 bg-sky-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-sky-900 shadow-2xs">
                            <BookOpen className="h-3 w-3 text-sky-700" /> {p.medium}
                          </span>
                        )}
                        {p.pattern && (
                          <span className="inline-flex w-fit items-center rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-amber-950 shadow-2xs">
                            {p.pattern}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center align-middle">
                      {p.syllabusUrl ? (
                        <a href={p.syllabusUrl} target="_blank" rel="noopener noreferrer" aria-label={`Download syllabus for ${p.name}`} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border-2 border-ksc-navy text-ksc-navy transition-all hover:bg-ksc-navy hover:text-white font-bold">
                          <Download className="h-4 w-4" />
                        </a>
                      ) : (
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-400" title="Syllabus not available">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Mobile Card View */}
          <div className="grid gap-4 sm:hidden">
            {filteredProgrammes.map((p, idx) => (
              <div key={`mobile-${p.name}-${idx}`} className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-slate-200/90 bg-white p-5 shadow-sm transition-all duration-300 hover:border-ksc-royal hover:shadow-md animate-fade-in-up" style={{ animationDelay: `${idx * 35}ms` }}>
                <div>
                  <h3 className="text-lg font-black leading-tight text-ksc-navy transition-colors group-hover:text-ksc-red">{p.name}</h3>
                  {p.eligibility && (
                    <div className="mt-3.5 border-t border-slate-100 pt-3.5 text-xs sm:text-sm font-bold leading-relaxed text-slate-700">
                      <span className="mb-1 block font-black uppercase text-[11px] tracking-wider text-slate-900">Eligibility:</span>
                      {p.eligibility}
                    </div>
                  )}
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3.5">
                  {p.medium && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-300 bg-sky-50 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-sky-900">
                      <BookOpen className="h-3 w-3 text-sky-700" /> {p.medium}
                    </span>
                  )}
                  {p.pattern && (
                    <span className="inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-amber-950">
                      {p.pattern}
                    </span>
                  )}
                  {p.syllabusUrl && (
                    <a href={p.syllabusUrl} target="_blank" rel="noopener noreferrer" className="ml-auto inline-flex items-center gap-1.5 rounded-lg border-2 border-ksc-navy px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-ksc-navy transition-colors hover:bg-ksc-navy hover:text-white">
                      <Download className="h-3 w-3" /> Syllabus
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
