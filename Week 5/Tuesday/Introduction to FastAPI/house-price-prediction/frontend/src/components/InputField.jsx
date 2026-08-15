const InputField = ({ label, name, value, onChange, placeholder, helper, min, max, step }) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={name} className="text-xs font-semibold text-ink-700 dark:text-ink-400 tracking-wide uppercase">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type="number"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min={min}
      max={max}
      step={step ?? 'any'}
      className="w-full px-3.5 py-3 rounded-lg border border-ink-300 dark:border-dark-700 bg-white dark:bg-dark-800 text-ink-900 dark:text-white placeholder-ink-300 dark:placeholder-dark-600 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 hover:border-ink-500 dark:hover:border-dark-600 transition-colors duration-150"
      required
    />
    {helper && (
      <p className="text-[11px] text-ink-400 dark:text-dark-600 leading-snug">{helper}</p>
    )}
  </div>
)

export default InputField
