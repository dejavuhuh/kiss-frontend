interface TreeNode<T extends TreeNode<T>> {
  children?: T[]
}

export function traverseTree<T extends TreeNode<T>>(
  tree: T[],
  callback: (node: T) => void,
) {
  for (const node of tree) {
    callback(node)
    if (node.children) {
      traverseTree(node.children, callback)
    }
  }
}

export function mapTree<T extends TreeNode<T>, U>(
  tree: T[],
  mapper: (node: Omit<T, 'children'>, parent?: U) => U,
  parent?: U,
): U[] {
  return tree.map(({ children, ...props }) => {
    const current = mapper(props, parent)
    return {
      ...current,
      children: children ? mapTree(children, mapper, current) : undefined,
    }
  })
}

export function findTreeNode<T extends TreeNode<T>>(
  tree: T[],
  predicate: (node: T) => boolean,
): T | undefined {
  for (const node of tree) {
    if (predicate(node)) {
      return node
    }
    if (node.children) {
      const result = findTreeNode(node.children, predicate)
      if (result) {
        return result
      }
    }
  }
}

export function filterTree<T extends TreeNode<T>>(
  tree: T[],
  predicate: (node: T) => boolean,
): T[] {
  return tree.filter((node) => {
    if (node.children) {
      node.children = filterTree(node.children, predicate)
    }
    return predicate(node)
  })
}
