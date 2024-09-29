import React, {createContext, useState} from 'react'

export const AuthContext = createContext({});

function AuthProvider({children}){

  const [user, setUser] = useState({});

  function login(email, senha){
    /*
    setUser({
      email: "email@mail.com",
      status: 'Logado'
    })
    */
    if(email !== '' && senha !== ''){
      setUser({
        email: email,
        status: 'Logado'
      })
    }
  }

  function logout(){
    setUser({});
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;