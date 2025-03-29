import { Link, Navigate, NavLink, Route, Routes, useNavigate } from "react-router-dom"
import Login from "./components/Login"
import AddTicket from "./components/AddTicket"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react";
import TicketIndex from "./components/TicketIndex";
import NotFound from "./components/NotFound";
import Reference from "./components/Reference";
import Button from "./form/button";

function App() {
  const [openMenu, setOpenMenu] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState(false);
  const navigate = useNavigate();
  
  // Check User Authenticated or not
  useEffect(()=>{
    const token = localStorage.getItem("jwttoken");
    setAuthenticatedUser(!!token);
  });

  const handleLogout = ()=>{
    localStorage.removeItem("jwttoken");
    setAuthenticatedUser(false);
    navigate('/login');
  }

  return (
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-400 text-white p-2 shadow-md">
          <div className="container mx-auto flex justify-between items-center flex-wrap">
            {/*Logo*/}
            <h1 className="font-bold">Support Service</h1>

            {/* Desktop menu */}
            <ul className="hidden sm:flex space-x-6">
              {
                authenticatedUser ? (
                  <li>
                    <Button onClick={handleLogout}>
                      Logout
                    </Button>
                  </li>
                ) :(
                    <>
                      <li>
                        <NavLink to="/login">Login</NavLink>
                      </li>
                      <li>
                        <NavLink to="/add_ticket">Add Ticket</NavLink>
                      </li>
                      <li>
                        <NavLink to="/reference">Reference Page</NavLink>
                      </li>
                    </>
                )}
            </ul>

            {/* Mobile menu button*/}
            <button className="sm:hidden" onClick={()=>setOpenMenu(!openMenu)}>
              {openMenu ? <X size={28}/> : <Menu size={28}/>}
            </button>

          </div>
          
            {/* Mobile menu */}
            {
              openMenu && (
                <ul className="sm:hidden mt-2 space-y-2 text-center bg-blue-500 p-4 rounded-md">
                  {
                    authenticatedUser ? (
                      <li>
                        <Button className="block px-4 py-2 rounded-md hover:bg-blue-400" onClick={handleLogout}>
                          Logout
                        </Button>
                      </li>
                    ):(
                        <>
                          <li>
                            <NavLink to="/login" className="block px-4 py-2 rounded-md hover:bg-blue-400" onClick={()=>setOpenMenu(false)}>Login</NavLink>
                          </li>
                          <li>
                            <NavLink to="/add_ticket" className="block px-4 py-2 rounded-md hover:bg-blue-400" onClick={()=>setOpenMenu(false)}>Add Ticket</NavLink>
                          </li>
                          <li>
                            <NavLink to="/reference" className="block px-4 py-2 rounded-md hover:bg-blue-400" onClick={()=>setOpenMenu(false)}>Reference Page</NavLink>
                          </li>
                        </>
                    )}
                </ul>
              )
            }
            </nav>

            {/* Hero Section */}

            <div className="flex justify-center items-center min-h-[60vh] sm:min-h-[85vh] px-4 py-2 sm:px-0">
              {/* Routes */}
              <Routes>
                <Route path="/" element={<h1 className="text-5xl font-bold text-gray-700">WELCOME TO SUPPORT SYSTEM</h1>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/add_ticket" element={<AddTicket/>}/>
                {/* Support routes */}
                {
                  authenticatedUser ? (
                    <Route path="/ticket_index" element={authenticatedUser ? <TicketIndex/> : <Navigate to="/login" replace />}/>
                  ): null
                }
                
                <Route path="/reference" element={<Reference/>}/>
                <Route path="*" element={<NotFound/>}/>
              </Routes>
            </div>
      </div>
  )
}

export default App
