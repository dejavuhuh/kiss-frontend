import { create } from 'zustand/index'

interface LoadingState {
  counter: number
  start: () => void
  end: () => void
}

export const useLoading = create<LoadingState>()(
  set => ({
    counter: 0,
    start: () => set(state => ({ counter: state.counter + 1 })),
    end: () => set(state => ({ counter: state.counter - 1 })),
  }),
)
