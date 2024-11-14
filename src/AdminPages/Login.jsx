import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Label, Input, Button } from "@windmill/react-ui";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      navigate("/admin/administration-dashboard");
    }
  }, [navigate]);

  const handleLogin = () => {
    // Define hardcoded credentials
    const adminUsername = "admintest";
    const adminPassword = "test_145";

    if (username === adminUsername && password === adminPassword) {
      // Set login status in localStorage
      localStorage.setItem("isLoggedIn", true);
      navigate("/admin/administration-dashboard");
    } else {
      setError("Nom d'utilisateur ou mot de passe incorrect");
    }
  };

  return (
    <div className="flex items-center p-6 bg-gray-50">
      <div className="flex-1  max-w-xl mx-auto overflow-hidden py-6 sm:py-12 bg-white rounded-lg shadow-xl">
        <h1 className="mb-4 text-4xl font-bold text-center text-gray-700">
          ADMINISTRATION
        </h1>
        <div className="w-full p-6 sm:p-12">
          {error && <p className="mb-4 text-red-600 text-center">{error}</p>}
          <Label>
            <span>Nom Utilisateur</span>
            <Input
              className="mt-1"
              type="text"
              placeholder="ADMIN"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Label>

          <Label className="mt-4">
            <span>Mot de Passe</span>
            <Input
              className="mt-1"
              type="password"
              placeholder="***************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Label>

          <Button className="mt-4" block onClick={handleLogin}>
            Connexion
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
