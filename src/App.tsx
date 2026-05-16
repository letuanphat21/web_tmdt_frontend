import { RouterProvider } from "react-router-dom";
import router from "@/routes";
import { useEffect } from "react";
import { useGetProfile } from "@/hooks/useGetProfile";

function App() {
  const getProfile = useGetProfile();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getProfile(token);
    }
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
