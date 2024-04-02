export async function install(app: any) {
  const components = import.meta.glob('./*.vue')
  for (const path in components) {
    const componentName = path.split('/').pop()?.split('.')[0] ?? ''
    const componentConfig = await components[path]()
    app.component(componentName, componentConfig.default)
  }
}
