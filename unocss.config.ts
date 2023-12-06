import { defineConfig, presetAttributify, presetIcons, presetUno, presetWebFonts } from 'unocss'

export default defineConfig({
  shortcuts: [
    {
      'bg-base': 'bg-white dark:bg-black',
      'border-base': 'border-[#8884]',
    },
    [/^btn-(\w+)$/, ([_, color]) => `op50 px2.5 py1 transition-all duration-200 ease-out no-underline! hover:(op100 text-${color} bg-${color}/10) border border-base! rounded`],
    [/^btn-sincere-((rose|pink|fuchsia|purple|violet|indigo|blue|sky|cyan|teal|emerald|green|lime|yellow|amber|orange|red|gray|slate|zinc|neutral|stone|light|dark|lightblue|warmgray|truegray|coolgray|bluegray))$/, ([, color]) => `focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 px-2.5 py-1.5 shadow-sm text-${color === 'light' ? 'gray-900' : 'white'} dark:text-gray-900 bg-${color}-500 hover:bg-${color}-600 disabled:bg-${color}-500 disabled:hover:bg-${color}-500 dark:bg-${color}-400 dark:hover:bg-${color}-500 dark:disabled:bg-${color}-400 dark:disabled:hover:bg-${color}-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-${color}-500 dark:focus-visible:outline-${color}-400 inline-flex items-center`],
    [/^badge-((rose|pink|fuchsia|purple|violet|indigo|blue|sky|cyan|teal|emerald|green|lime|yellow|amber|orange|red|gray|slate|zinc|neutral|stone|light|dark|lightblue|warmgray|truegray|coolgray|bluegray))$/, ([, color]) => `inline-flex items-center font-medium rounded-md text-xs px-2 py-1 bg-${color}-50 dark:bg-${color}-400 dark:bg-opacity-10 text-${color}-500 dark:text-${color}-400 ring-1 ring-inset ring-${color}-500 dark:ring-${color}-400 ring-opacity-10 dark:ring-opacity-20`],
    [/^badge-((xs|sm|md|lg))$/, ([, size]) => {
      if (size === 'xs')
        return 'text-xs px-1.5 py-0.5'

      else if (size === 'sm')
        return 'text-xs px-2 py-1'

      else if (size === 'md')
        return 'text-sm px-2 py-1'

      else
        return 'text-sm px-2.5 py-1.5'
    }],
    [/^input-((none|rose|pink|fuchsia|purple|violet|indigo|blue|sky|cyan|teal|emerald|green|lime|yellow|amber|orange|red|gray|slate|zinc|neutral|stone|light|dark|lightblue|warmgray|truegray|coolgray|bluegray))$/, ([, color]) => {
      if (color === 'none')
        return 'relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 rounded-md placeholder-gray-400 dark:placeholder-gray-500 text-sm px-2.5 py-1.5 bg-transparent focus:ring-0 focus:shadow-none'

      else
        return `relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 rounded-md placeholder-gray-400 dark:placeholder-gray-500 text-sm px-2.5 py-1.5 shadow-sm bg-white dark:bg-dark-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-${color}-500 dark:focus:ring-${color}-400`
    }],
  ],
  rules: [
    [/^slide-enter-(\d+)$/, ([_, n]) => ({
      '--enter-stage': n,
    })],
    ['progress', { background: 'repeating-linear-gradient(to right, rgba(0, 220, 130,0.8) 0%, rgba(52, 205, 254,0.8) 50%, rgba(0, 71, 225,0.8) 100%)' }],
  ],
  presets: [
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'height': '1.2em',
        'width': '1.2em',
        'vertical-align': 'text-bottom',
      },
    }),
    presetAttributify(),
    presetUno(),
    presetWebFonts({
      fonts: {
        sans: 'Inter:400,600,800',
        mono: 'DM Mono',
      },
    }),
  ],
})
