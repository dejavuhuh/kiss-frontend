import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  ignores: [
    'src/api/__generated',
    'src/routeTree.gen.ts',
  ],
})
