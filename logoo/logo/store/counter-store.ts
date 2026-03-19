// // store/counter-store.ts
// import { create } from "zustand"

// interface CounterState {
//   count: number
//   users:any[]
//   increment: () => void
//   decrement: () => void
// }

// export const useCounterStore = create<CounterState>((set,get) => ({
//   count: 0,
//   users:[],
//   increment: () => set((state) => ({ count: state.count + 1 })),
//   decrement: () => set((state) => ({ count: state.count - 1 })),
//   addUser:(user:any) =>set((state)=>({users:[...state.users,user]}))
// }))