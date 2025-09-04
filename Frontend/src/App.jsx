import { BrowserRouter, useLocation } from "react-router-dom";
import Layout from "./Layout";
import UserProvider, { UserContext } from "./components/userContext";
import { useEffect, useContext } from "react";


// Wrap Layout with a component that reads user from URL
function AppWrapper() {
  const location = useLocation();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const userParam = queryParams.get("user");

    if (userParam) {
      try {
        const user = JSON.parse(userParam);
        setUser(user);
        // Clean up URL
        window.history.replaceState({}, document.title, "/");
      } catch (err) {
        console.error("Invalid user in URL", err);
      }
    }
  }, [location.search, setUser]);

  return <Layout />;
}

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <AppWrapper />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
