import React from "react";
import { Link } from "react-router-dom";

import { Label, Input, Button } from "@windmill/react-ui";

function Login() {
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 ">
      <div className="flex-1 h-full max-w-xl mx-auto overflow-hidden py-6 sm:py-12  bg-white rounded-lg shadow-xl ">
        <h1 className="mb-4 text-4xl font-bold text-center  text-gray-700 ">
          Connexion SLEEPWELL Admin Dashboard
        </h1>
        <div className="w-full p-6 sm:p-12 ">
          <Label>
            <span>Nom Utilisateur</span>
            <Input className="mt-1" type="email" placeholder="ADMIN" />
          </Label>

          <Label className="mt-4">
            <span>Mot de Passe</span>
            <Input
              className="mt-1"
              type="password"
              placeholder="***************"
            />
          </Label>

          <Button
            className="mt-4"
            block
            tag={Link}
            to="/admin/administration-dashboard"
          >
            Connexion
          </Button>

          <hr className="my-8" />
        </div>
      </div>
    </div>
  );
}

export default Login;
