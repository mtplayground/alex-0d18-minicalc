function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center px-6 py-16 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
          MiniCalc
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Vite, React, and Tailwind are ready.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
          This placeholder page verifies the MiniCalc frontend scaffold,
          Tailwind styling, and Inter/system-ui font stack.
        </p>
        <div className="mt-10 grid w-full max-w-2xl gap-3 sm:grid-cols-3">
          {['Vite dev server', 'React client', 'Tailwind CSS'].map((item) => (
            <div
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-100"
              key={item}
            >
              {item}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
