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
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search programmes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-ksc-royal focus:bg-white focus:ring-2 focus:ring-ksc-royal/10"
          />
        </div>
        
        <div className="flex gap-4 sm:w-auto w-full">
          {mediums.length > 1 && (
            <div className="flex-1 sm:flex-none">
              <select
                value={mediumFilter}
                onChange={(e) => setMediumFilter(e.target.value)}
                className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-ksc-royal focus:ring-2 focus:ring-ksc-royal/10"
                style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23ffffff%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right .7em top 50%', backgroundSize: '.65em auto' }}
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
                className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-ksc-royal focus:ring-2 focus:ring-ksc-royal/10"
                style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23ffffff%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right .7em top 50%', backgroundSize: '.65em auto' }}
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
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center text-slate-500">
          <Filter className="mx-auto h-10 w-10 opacity-30 mb-4" />
          <p className="text-lg">No programmes found matching your filters.</p>
          <button onClick={() => { setSearchTerm(""); setMediumFilter("All"); setPatternFilter("All"); }} className="mt-4 text-sm font-bold text-ksc-royal hover:underline">
            Clear all filters
          </button>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm sm:block">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-ksc-navy text-xs uppercase tracking-wider text-white">
                <tr>
                  <th className="px-6 py-5 font-bold border-b border-white/10">Programme Name</th>
                  <th className="px-6 py-5 font-bold border-b border-white/10">Eligibility</th>
                  <th className="px-6 py-5 font-bold border-b border-white/10 whitespace-nowrap">Medium & Pattern</th>
                  <th className="px-6 py-5 font-bold border-b border-white/10 text-right">Syllabus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProgrammes.map((p, idx) => (
                  <tr key={`${p.name}-${idx}`} className="group animate-fade-in-up transition-colors hover:bg-slate-50" style={{ animationDelay: `${idx * 35}ms` }}>
                    <td className="min-w-[220px] px-6 py-5 align-top text-base font-bold text-ksc-navy transition-colors group-hover:text-ksc-red">
                      {p.name}
                    </td>
                    <td className="max-w-sm px-6 py-5 align-top text-xs leading-relaxed text-slate-500">
                      {p.eligibility || '—'}
                    </td>
                    <td className="px-6 py-5 align-top whitespace-nowrap">
                      <div className="flex flex-col gap-2">
                        {p.medium && (
                          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                            <BookOpen className="h-3 w-3" /> {p.medium}
                          </span>
                        )}
                        {p.pattern && (
                          <span className="inline-flex w-fit items-center rounded-full border border-ksc-sky/20 bg-ksc-sky/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-ksc-royal">
                            {p.pattern}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5 align-top text-right">
                      {p.syllabusUrl ? (
                        <a href={p.syllabusUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-ksc-royal px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-ksc-royal transition-colors hover:bg-ksc-royal hover:text-white">
                          <Download className="h-4 w-4" /> Download
                        </a>
                      ) : (
                        <span className="text-xs text-white/30">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Mobile Card View */}
          <div className="grid gap-5 sm:hidden">
            {filteredProgrammes.map((p, idx) => (
              <div key={`mobile-${p.name}-${idx}`} className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:border-ksc-sky/50 animate-fade-in-up" style={{ animationDelay: `${idx * 35}ms` }}>
                <div>
                  <h3 className="text-lg font-bold leading-tight text-ksc-navy transition-colors group-hover:text-ksc-red">{p.name}</h3>
                  {p.eligibility && (
                    <p className="mt-4 border-t border-slate-100 pt-4 text-xs leading-relaxed text-slate-500">
                      <span className="mb-1 block font-semibold text-slate-700">Eligibility:</span>
                      {p.eligibility}
                    </p>
                  )}
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
                  {p.medium && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                      <BookOpen className="h-3 w-3" /> {p.medium}
                    </span>
                  )}
                  {p.pattern && (
                    <span className="inline-flex items-center rounded-full border border-ksc-sky/20 bg-ksc-sky/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ksc-royal">
                      {p.pattern}
                    </span>
                  )}
                  {p.syllabusUrl && (
                    <a href={p.syllabusUrl} target="_blank" rel="noopener noreferrer" className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-ksc-royal px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-ksc-royal transition-colors hover:bg-ksc-royal hover:text-white">
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
