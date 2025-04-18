import { useState } from 'react'
import { Navigate } from "react-router-dom";
import { Routes, Route  } from 'react-router-dom'
import Home from './Home'
import Details from './Details'
import AdminAllBlogs from './AdminAllBlogs'
import AdminDelete from './AdminDelete'
import AdminEdit from './AdminEdit'
import AdminNew from './adminNew'
import AdminCategories from './AdminCategories'
import AdminEditCategories from './AdminEditCategories'
import AdminDeleteCategories from './AdminDeleteCategories'
import AdminNewCategories from './AdminNewCategories'
import Logout from './Logout'
import Signin from './Signin'
import Signup from './Signup'
import ProtectedRoutes from '../constants/ProtectedRoutes'
import Subscribe from './Subscribe';
import AuthenticatedRoutes from '../constants/AuthenticatedRoutes';
import SearchByCategory from "./SearchByCategory"
import './App.css'
import AdminFeedback from './AdminFeedback';
import Feedback from './Feedback';
import SavedBlogs from './SavedBlogs';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Routes>
      <Route path='/' element={ <Navigate to="/blogs" replace />} />
        <Route path='/blogs' element={<Home/>} />
        <Route path='/bycategory' element={<SearchByCategory/>} />
            <Route element={<AuthenticatedRoutes />}> 
                <Route path='/admin/allblogs' element={<AdminAllBlogs />} />
                <Route path='/admin/allblogs' element={<AdminAllBlogs />} />
                <Route path='/admin/:id/delete' element={<AdminDelete />} />
                <Route path='/admin/:id/edit' element={<AdminEdit />} />
                <Route path='/admin/blogs/new' element={<AdminNew />} />
                <Route path='/admin/categories' element={ <AdminCategories />} />
                <Route path='/admin/:id/categories/edit' element={ <AdminEditCategories />}/>
                <Route path='/admin/:id/categories/delete' element={<AdminDeleteCategories />} />
                <Route path='/admin/categories/new' element={ <AdminNewCategories />} />
                <Route path='/admin/feedbacks' element={ <AdminFeedback />} />
            </Route>
            <Route element={<ProtectedRoutes />}>
               <Route path='/logout' element={<Logout /> }/>
               <Route path='/subscribe' element={<Subscribe />} />
               <Route path='/feedback' element={<Feedback />} />
               <Route path='/savedblogs' element={<SavedBlogs />} />
           </Route>
         <Route path='/signin' element={<Signin />} />
         <Route path='/signup' element={<Signup />} />
         <Route path='/:title' element={<Details />} />
      </Routes>   


   
    </div>
  )
}

export default App
