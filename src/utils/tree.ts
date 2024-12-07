interface TreeNode<T extends TreeNode<T>> {
  [key: string]: any
  children?: T[]
}

export function map<S extends TreeNode<S>, T extends TreeNode<T>>(nodes: S[], transform: (node: S) => T): T[] {
  return nodes.map((source) => {
    const target = transform(source)
    if (source.children) {
      target.children = map(source.children, transform)
    }
    return target
  })
}
