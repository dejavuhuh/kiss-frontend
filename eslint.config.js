import antfu from '@antfu/eslint-config'
import pluginQuery from '@tanstack/eslint-plugin-query'

export default [
  ...await antfu({
    react: {
      overrides: {
        'react-refresh/only-export-components': ['off'],
      },
    },
  }),
  ...pluginQuery.configs['flat/recommended'],
]
