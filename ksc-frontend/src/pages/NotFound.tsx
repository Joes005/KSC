import { ArrowRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center bg-slate-50 py-20">
      <div className="container-site text-center">
        <p className="section-kicker">404 error</p>
        <h1 className="mx-auto max-w-2xl text-4xl font-bold text-ksc-navy sm:text-5xl">This page could not be found</h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600">The address may have changed, or the page may no longer be available. Return home or browse our academic programmes.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/" className="btn-gold gap-2"><Home className="h-4 w-4" /> Back to home</Link>
          <Link to="/academic" className="btn-outline gap-2">View programmes <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  );
}
