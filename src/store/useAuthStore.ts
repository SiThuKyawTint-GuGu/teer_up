// import { createSelectorHooks } from 'auto-zustand-selectors-hook';
// import produce, { Draft } from 'immer';
// import create from 'zustand';

// import { UserData } from '@/types/User';

// interface AuthStoreType {
//   user: UserData | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   login: (user: UserData) => void;
//   logout: () => void;
//   stopLoading: () => void;
// }

// const useAuthStoreBase = create<AuthStoreType>(set => ({
//   user: null,
//   isAuthenticated: false,
//   isLoading: true,
//   login: user => {
//     setCookies(user)
//     set(state =>
//       produce(state, (draft: Draft<AuthStoreType>) => {
//         draft.isAuthenticated = true;
//         draft.user = user;
//       })
//     );
//   },
//   logout: () => {
//     localStorage.removeItem('token');
//     set(state =>
//       produce(state, (draft: Draft<AuthStoreType>) => {
//         draft.isAuthenticated = false;
//         draft.user = null;
//       })
//     );
//   },
//   stopLoading: () => {
//     set(state =>
//       produce(state, (draft: Draft<AuthStoreType>) => {
//         draft.isLoading = false;
//       })
//     );
//   },
// }));

// const useAuthStore = createSelectorHooks(useAuthStoreBase);

// export default useAuthStore;
