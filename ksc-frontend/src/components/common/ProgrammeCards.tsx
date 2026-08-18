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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center rounded-xl bg-ksc-mist/50 p-4 border border-ksc-green/10 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ksc-ink/50" />
          <input
            type="text"
            placeholder="Search programmes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-ksc-green/20 bg-white py-2 pl-9 pr-4 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        
        <div className="flex gap-4 sm:w-auto w-full">
          {mediums.length > 1 && (
            <div className="flex-1 sm:flex-none">
              <select
                value={mediumFilter}
                onChange={(e) => setMediumFilter(e.target.value)}
                className="w-full rounded-lg border border-ksc-green/20 bg-white py-2 px-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
                style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right .7em top 50%', backgroundSize: '.65em auto' }}
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
                className="w-full rounded-lg border border-ksc-green/20 bg-white py-2 px-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
                style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right .7em top 50%', backgroundSize: '.65em auto' }}
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
        <div className="rounded-xl border border-dashed border-ksc-green/30 py-12 text-center text-ksc-ink">
          <Filter className="mx-auto h-8 w-8 opacity-50 mb-3" />
          <p>No programmes found matching your filters.</p>
          <button onClick={() => { setSearchTerm(""); setMediumFilter("All"); setPatternFilter("All"); }} className="mt-3 text-sm text-primary font-bold hover:underline">
            Clear all filters
          </button>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm text-ksc-ink">
              <thead className="bg-ksc-mist/50 text-xs uppercase text-ksc-dark">
                <tr>
                  <th className="px-6 py-4 font-bold border-b border-gray-200">Programme Name</th>
                  <th className="px-6 py-4 font-bold border-b border-gray-200">Eligibility</th>
                  <th className="px-6 py-4 font-bold border-b border-gray-200 whitespace-nowrap">Medium & Pattern</th>
                  <th className="px-6 py-4 font-bold border-b border-gray-200 text-right">Syllabus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProgrammes.map((p, idx) => (
                  <tr key={`${p.name}-${idx}`} className="hover:bg-primary/5 transition-colors group cursor-pointer animate-fade-in-up" style={{ animationDelay: `${idx * 50}ms` }}>
                    <td className="px-6 py-4 font-bold text-ksc-dark align-top min-w-[200px] transition-colors group-hover:text-primary">
                      {p.name}
                    </td>
                    <td className="px-6 py-4 align-top max-w-sm text-xs leading-relaxed text-gray-600">
                      {p.eligibility || '—'}
                    </td>
                    <td className="px-6 py-4 align-top whitespace-nowrap">
                      <div className="flex flex-col gap-2">
                        {p.medium && (
                          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-primary shadow-sm transition-transform group-hover:scale-105">
                            <BookOpen className="h-3 w-3" /> {p.medium}
                          </span>
                        )}
                        {p.pattern && (
                          <span className="inline-flex w-fit items-center rounded-full bg-secondary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-secondary shadow-sm border border-secondary/20 transition-transform group-hover:scale-105">
                            {p.pattern}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top text-right">
                      {p.syllabusUrl ? (
                        <a href={p.syllabusUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5 transition-all whitespace-nowrap">
                          <Download className="h-3 w-3 animate-bounce" /> Download
                        </a>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
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
              <div key={`mobile-${p.name}-${idx}`} className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-secondary/10 hover:border-secondary/30 animate-fade-in-up" style={{ animationDelay: `${idx * 50}ms` }}>
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <div>
                  <h3 className="text-lg font-bold text-ksc-dark leading-tight transition-colors group-hover:text-primary">{p.name}</h3>
                  {p.eligibility && (
                    <p className="mt-3 text-xs text-ksc-ink/80 leading-relaxed border-t border-gray-100 pt-3">
                      <span className="font-semibold text-primary block mb-1">Eligibility:</span>
                      {p.eligibility}
                    </p>
                  )}
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-gray-100">
                  {p.medium && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-primary shadow-sm transition-transform group-hover:scale-105">
                      <BookOpen className="h-3 w-3" /> {p.medium}
                    </span>
                  )}
                  {p.pattern && (
                    <span className="inline-flex items-center rounded-full bg-secondary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-secondary shadow-sm border border-secondary/20 transition-transform group-hover:scale-105">
                      {p.pattern}
                    </span>
                  )}
                  {p.syllabusUrl && (
                    <a href={p.syllabusUrl} target="_blank" rel="noopener noreferrer" className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-md shadow-primary/20 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                      <Download className="h-3 w-3 animate-bounce" /> Syllabus
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
