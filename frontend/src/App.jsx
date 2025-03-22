import { useState } from 'react'

import './App.css'
//changes from the laptop 
function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/signup" elememt={<Signup/>}></Route>
      <Route path="/signin" elememt={<Signin/>}></Route>
      <Route path="/dashboard" elememt={<Dashboard/>}></Route>
      <Route path="/send" element={<SendMoney/>}></Route>
    </Routes> 
    </BrowserRouter>
    </>
  )
}

export default App
