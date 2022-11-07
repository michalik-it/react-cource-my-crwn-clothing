import { createContext, useEffect, useReducer } from 'react'
import { onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null
})

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const INITIAL_STATE = {
  currentUser: null
}

const userReducer = (state, action) => {
  const { type, payload } = action;
  console.log('userReducer action:', action);
  switch (type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: payload
      }
    default:
      throw new Error(`Unhandled type ${type} in the UserReducer`)
  }
};

export const UserProvider = ({ children }) => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE); // Why is there error about 3 args ?
  const setCurrentUser = (user) => {
    dispatch({type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user});
  }
  const value = { currentUser, setCurrentUser };
  console.log('UserProvider currentUser:', currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      // console.log('UserProvider onAuthStateChangedListener user:', user);
      setCurrentUser(user);
    })
    return unsubscribe;
  }, [])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
