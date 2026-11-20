const basePath = process.env.BASE_PATH || '' // '/zim-reference' on GitHub Pages

export default {
  output: 'export',
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
}
