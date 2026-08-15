import { useState } from 'react'
import InputField from './InputField'
import ResultCard from './ResultCard'
import DarkToggle from './DarkToggle'

const FIELDS = [
  { name: 'MedInc',    label: 'Median Income',    placeholder: '3.87',    helper: 'Median household income in the block group (units: tens of thousands of USD).', min: 0, step: 0.01 },
  { name: 'HouseAge',  label: 'House Age (yrs)',   placeholder: '28',      helper: 'Median age of houses within the block group.', min: 0, max: 100, step: 1 },
  { name: 'AveRooms',  label: 'Avg Rooms',         placeholder: '5.2',     helper: 'Average number of rooms per household.', min: 0, step: 0.01 },
  { name: 'AveBedrms', label: 'Avg Bedrooms',      placeholder: '1.1',     helper: 'Average number of bedrooms per household.', min: 0, step: 0.01 },
  { name: 'Population',label: 'Population',        placeholder: '1425',    helper: 'Total population of the block group.', min: 0, step: 1 },
  { name: 'AveOccup',  label: 'Avg Occupancy',     placeholder: '3.1',     helper: 'Average number of household members.', min: 0, step: 0.01 },
  { name: 'Latitude',  label: 'Latitude',          placeholder: '37.88',   helper: 'Block group latitude. California: 32.5° – 42.0°.', min: 32, max: 42, step: 0.0001 },
  { name: 'Longitude', label: 'Longitude',         placeholder: '-122.23', helper: 'Block group longitude. California: -124.5° – -114.1°.', min: -125, max: -114, step: 0.0001 },
]

const EXAMPLE = [
  ['MedInc', '4.15'], ['HouseAge', '25'], ['AveRooms', '5.64'],
  ['AveBedrms', '1.07'], ['Population', '1200'], ['AveOccup', '2.9'],
  ['Latitude', '37.34'], ['Longitude', '-121.89'],
]

const initialValues = Object.fromEntries(FIELDS.map(({ name }) => [name, '']))

const PredictPage = ({ onBack, darkMode, toggleDark }) => {
  const [values, setValues]   = useState(initialValues)
  const [result, setResult]   = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    const payload = Object.fromEntries(
      Object.entries(values).map(([k, v]) => [k, parseFloat(v)])
    )

    try {
      const res = await fetch('/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`Server responded with ${res.status}`)
      const data = await res.json()
      setResult(data)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-ink-50 dark:bg-dark-950 flex flex-col transition-colors duration-200">

      {/* Nav */}
      <nav className="bg-white dark:bg-dark-950 border-b border-ink-100 dark:border-dark-800 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-navy-900 dark:bg-teal-600 flex items-center justify-center flex-shrink-0">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 1L13 5.5V13H9.5V8.5H4.5V13H1V5.5L7 1Z" fill="white" />
              </svg>
            </div>
            <span className="font-serif text-ink-900 dark:text-white text-base">PriceIQ</span>
          </div>

          <div className="flex items-center gap-3">
            <DarkToggle darkMode={darkMode} toggleDark={toggleDark} />
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-ink-500 dark:text-dark-600 hover:text-ink-900 dark:hover:text-white text-sm font-medium transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 md:px-10 py-10 page-enter">
        <div className="flex flex-col lg:flex-row gap-10 lg:items-start">

          {/* Left: form */}
          <div className="flex-1 min-w-0">
            <div className="mb-7">
              <h1 className="font-serif text-ink-900 dark:text-white text-2xl md:text-3xl">Price Estimator</h1>
              <p className="text-ink-500 dark:text-dark-600 text-sm mt-1.5">
                Enter block group data from the U.S. Census to generate a predicted median home value.
              </p>
            </div>

            <div className="bg-white dark:bg-dark-900 rounded-xl border border-ink-200 dark:border-dark-800 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-ink-100 dark:border-dark-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-ink-700 dark:text-ink-400 tracking-widest uppercase">Block Group Inputs</span>
                <span className="text-xs text-ink-400 dark:text-dark-600">All 8 fields required</span>
              </div>

              <form onSubmit={handleSubmit} className="px-6 py-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {FIELDS.map((field) => (
                    <InputField
                      key={field.name}
                      {...field}
                      value={values[field.name]}
                      onChange={handleChange}
                    />
                  ))}
                </div>

                {error && (
                  <div className="mt-5 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <div className="mt-6 pt-5 border-t border-ink-100 dark:border-dark-800">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-navy-900 hover:bg-navy-700 dark:bg-teal-600 dark:hover:bg-teal-500 disabled:opacity-50 text-white font-semibold text-sm py-3.5 rounded-lg transition-colors duration-150 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Calculating…
                      </>
                    ) : (
                      'Predict Price'
                    )}
                  </button>
                </div>
              </form>
            </div>

            {result && <ResultCard result={result} />}
          </div>

          {/* Right: sidebar */}
          <aside className="lg:w-64 xl:w-72 flex-shrink-0 flex flex-col gap-5">
            <div className="bg-white dark:bg-dark-900 rounded-xl border border-ink-200 dark:border-dark-800 shadow-sm p-5">
              <p className="text-xs font-semibold text-ink-700 dark:text-ink-400 tracking-widest uppercase mb-3">About the Model</p>
              <p className="text-sm text-ink-500 dark:text-dark-600 leading-relaxed">
                A Random Forest regressor trained on the{' '}
                <span className="text-ink-700 dark:text-ink-300">1990 California Census</span>{' '}
                housing survey, covering 20,640 block groups across the state.
              </p>
              <div className="mt-4 pt-4 border-t border-ink-100 dark:border-dark-800 grid grid-cols-2 gap-3">
                {[
                  ['Algorithm', 'Random Forest'],
                  ['Library', 'scikit-learn'],
                  ['Samples', '20,640'],
                  ['Features', '8'],
                ].map(([k, v]) => (
                  <div key={k}>
                    <p className="text-ink-400 dark:text-dark-600 uppercase tracking-wide text-[10px] mb-0.5">{k}</p>
                    <p className="text-ink-700 dark:text-ink-300 font-medium text-xs">{v}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-dark-900 rounded-xl border border-ink-200 dark:border-dark-800 shadow-sm p-5">
              <p className="text-xs font-semibold text-ink-700 dark:text-ink-400 tracking-widest uppercase mb-1">Example Values</p>
              <p className="text-[11px] text-ink-400 dark:text-dark-600 mb-3">Typical block group in San Jose, CA:</p>
              {EXAMPLE.map(([k, v]) => (
                <div key={k} className="flex justify-between py-1.5 border-b border-ink-50 dark:border-dark-800 last:border-0">
                  <span className="text-[11px] text-ink-400 dark:text-dark-600 font-mono">{k}</span>
                  <span className="text-[11px] text-ink-700 dark:text-ink-300 font-medium">{v}</span>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-900/20 p-4">
              <p className="text-[11px] text-amber-800 dark:text-amber-400 leading-relaxed">
                <span className="font-semibold">Note:</span> Predictions reflect 1990 price levels. Apply a regional appreciation index for current valuations.
              </p>
            </div>
          </aside>
        </div>
      </main>

      <footer className="border-t border-ink-100 dark:border-dark-800 bg-white dark:bg-dark-950">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
          <p className="text-ink-400 dark:text-dark-700 text-xs">Powered by scikit-learn · California Housing Dataset (1990)</p>
          <p className="text-ink-300 dark:text-dark-700 text-xs">For demonstration purposes only</p>
        </div>
      </footer>
    </div>
  )
}

export default PredictPage
