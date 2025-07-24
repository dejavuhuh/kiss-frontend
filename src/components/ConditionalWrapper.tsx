import React from 'react'

interface ConditionalWrapperProps {
  /** The boolean condition that determines whether to apply the wrapper. */
  condition: boolean
  /** A function that receives the children and returns the wrapping React element. */
  wrapper: (children: React.ReactNode) => React.ReactElement
  /** The content to be conditionally wrapped. */
  children: React.ReactNode
}

const ConditionalWrapper: React.FC<ConditionalWrapperProps> = ({ condition, wrapper, children }) => {
  return condition ? wrapper(children) : <>{children}</>
}

export default ConditionalWrapper
