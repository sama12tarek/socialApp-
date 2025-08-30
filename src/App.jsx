
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import "./App.css";
import Profile from './Components/Profile/Profile';
import Layout from "./Components/Layout/Layout";
import NotFound from "./Components/NotFound/NotFound";
import ProtectedRoute from "./Components/protectedRoute/ProtectedRoute";
import PostContextProvider from "./Context/PostContext";
import UserContextProvider from "./Context/UserContext";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PostDetails from "./Components/PostDetails/PostDetails";
const query = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      // ✅ Profile route
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },

      // ✅ PostDetails route
      {
        path: "PostDetails/:id",
        element: (
          <ProtectedRoute>
            <PostDetails />
          </ProtectedRoute>
        ),
      },

      // Not Found route
      { path: "notfound", element: <NotFound /> },
    ],
  },
]);


function App() {
  return (
    <div className="text-dark">
      <UserContextProvider>
    
        
            <QueryClientProvider client={query}>
              <RouterProvider router={router} />
              <Toaster/>
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
      
      
      </UserContextProvider>
    </div>
  );
}

export default App;
