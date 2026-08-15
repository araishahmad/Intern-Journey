import DarkToggle from './DarkToggle'

const STATS = [
  { value: '$567,400', label: 'Median CA home price', sub: 'Q4 2024' },
  { value: '20,640',   label: 'Census block groups',  sub: 'Training data' },
  { value: '8',        label: 'Input features',       sub: 'per estimate' },
]

const HomePage = ({ onNavigate, darkMode, toggleDark }) => (
  <div className="min-h-screen bg-white dark:bg-dark-950 flex flex-col transition-colors duration-200">

    {/* Nav */}
    <nav className="border-b border-ink-100 dark:border-dark-800 bg-white dark:bg-dark-950">
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-navy-900 dark:bg-teal-600 flex items-center justify-center flex-shrink-0">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 1L13 5.5V13H9.5V8.5H4.5V13H1V5.5L7 1Z" fill="white" />
            </svg>
          </div>
          <span className="font-serif text-ink-900 dark:text-white text-base">PriceIQ</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-ink-400 dark:text-dark-600 text-xs">California Housing Estimator</span>
          <DarkToggle darkMode={darkMode} toggleDark={toggleDark} />
        </div>
      </div>
    </nav>

    {/* Hero */}
    <div className="flex-1 flex flex-col lg:flex-row max-w-6xl mx-auto w-full px-6 md:px-10 py-16 lg:py-0 gap-12 lg:gap-20 lg:items-center">

      {/* Left */}
      <div className="flex-1 lg:py-24">
        <p className="page-enter text-teal-600 dark:text-teal-400 text-xs font-semibold tracking-widest uppercase mb-5">
          ML-Powered · California Housing Dataset
        </p>

        <h1 className="page-enter stagger-1 font-serif text-ink-900 dark:text-white leading-[1.08] tracking-tight mb-6"
            style={{ fontSize: 'clamp(2.6rem, 4.5vw, 4rem)' }}>
          Estimate any California home's market value in seconds.
        </h1>

        <p className="page-enter stagger-2 text-ink-500 dark:text-dark-600 text-base leading-relaxed max-w-md mb-10">
          Enter eight census-derived metrics about a block group — income, density, location, housing age — and receive an instant predicted median home value from a trained regression model.
        </p>

        <div className="page-enter stagger-3 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onNavigate}
            className="bg-navy-900 hover:bg-navy-700 dark:bg-teal-600 dark:hover:bg-teal-500 text-white font-semibold text-sm px-7 py-3.5 rounded-lg transition-colors duration-150 cursor-pointer"
          >
            Get an estimate
          </button>
          <button
            onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
            className="text-ink-700 dark:text-ink-400 hover:text-ink-900 dark:hover:text-white font-semibold text-sm px-7 py-3.5 rounded-lg border border-ink-300 dark:border-dark-700 hover:border-ink-500 dark:hover:border-dark-600 transition-colors duration-150 cursor-pointer"
          >
            How it works
          </button>
        </div>

        {/* Stats */}
        <div className="page-enter stagger-4 mt-14 grid grid-cols-3 gap-6 border-t border-ink-100 dark:border-dark-800 pt-10">
          {STATS.map(({ value, label, sub }) => (
            <div key={label}>
              <p className="font-serif text-ink-900 dark:text-white text-2xl">{value}</p>
              <p className="text-ink-500 dark:text-dark-600 text-xs mt-1 leading-tight">{label}</p>
              <p className="text-ink-300 dark:text-dark-700 text-[10px] mt-0.5 uppercase tracking-wide">{sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right: photo */}
      <div className="hidden lg:block w-[440px] xl:w-[500px] flex-shrink-0 lg:py-16">
        <div className="relative rounded-2xl overflow-hidden bg-ink-100 dark:bg-dark-800 aspect-[4/5]">
          <img
            src="https://images.unsplash.com/photo-1554107136-57b138ea99df?w=900&h=1100&fit=crop&auto=format"
            alt="San Francisco residential neighbourhood"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent p-6">
            <p className="text-white/80 text-xs font-medium">San Francisco, CA</p>
            <p className="text-white/50 text-[10px] mt-0.5">Typical block group — 1,400 residents</p>
          </div>
        </div>
      </div>
    </div>

    {/* How it works */}
    <div id="how-it-works" className="border-t border-ink-100 dark:border-dark-800 bg-ink-50 dark:bg-dark-900">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-14 grid grid-cols-1 sm:grid-cols-3 gap-10">
        {[
          { n: '01', heading: 'Enter block group data', body: 'Provide eight numeric features drawn from the U.S. Census — the same inputs the model was trained on.' },
          { n: '02', heading: 'Model inference', body: 'A scikit-learn Random Forest regressor returns a predicted median home value within milliseconds.' },
          { n: '03', heading: 'Review your estimate', body: 'See the predicted price and a ±9% confidence interval based on model validation error.' },
        ].map(({ n, heading, body }) => (
          <div key={n} className="flex flex-col gap-3">
            <span className="font-serif text-ink-300 dark:text-dark-700 text-3xl leading-none">{n}</span>
            <p className="font-semibold text-ink-900 dark:text-white text-sm">{heading}</p>
            <p className="text-ink-500 dark:text-dark-600 text-sm leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Footer */}
    <footer className="border-t border-ink-100 dark:border-dark-800 bg-white dark:bg-dark-950">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
        <p className="text-ink-400 dark:text-dark-700 text-xs">Powered by scikit-learn · California Housing Dataset (1990)</p>
        <p className="text-ink-300 dark:text-dark-700 text-xs">For demonstration purposes only</p>
      </div>
    </footer>
  </div>
)

export default HomePage
