import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-primary py-4">
      {/* Flex Container */}
      <div className="container flex flex-col-reverse justify-between px-6 py-10 mx-auto space-y-8 md:flex-row md:space-y-0">
        {/* Logo and social links container */}
        <div className="flex flex-col-reverse items-center justify-between space-y-12 md:flex-col md:space-y-0 md:items-start">
          <div className="mx-auto my-6 text-center text-white md:hidden">
            Copyright © 2022, All Rights Reserved
          </div>
          {/* Logo */}
          <div>
            <span className="font-bold font-serif text-secondary text-xl">
              SLEEPWELL
            </span>
          </div>
          {/* Social Links Container */}
          <div className="flex justify-center space-x-4">
            {/* Link 1 */}
            <Link to="#" className="text-secondary-dark">
              <svg
                fill="currentColor"
                viewBox="0 0 16 16"
                height="1.75em"
                width="1.75em"
              >
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
              </svg>
            </Link>
            <Link to="#" className="text-secondary-dark">
              <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                height="1.75em"
                width="1.75em"
              >
                <path d="M512 378.7c-73.4 0-133.3 59.9-133.3 133.3S438.6 645.3 512 645.3 645.3 585.4 645.3 512 585.4 378.7 512 378.7zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zM512 717.1c-113.5 0-205.1-91.6-205.1-205.1S398.5 306.9 512 306.9 717.1 398.5 717.1 512 625.5 717.1 512 717.1zm213.5-370.7c-26.5 0-47.9-21.4-47.9-47.9s21.4-47.9 47.9-47.9 47.9 21.4 47.9 47.9a47.84 47.84 0 01-47.9 47.9z" />
              </svg>
            </Link>
            {/* Link 4 */}
            <Link to="#" className="text-secondary-dark">
              <svg
                viewBox="0 0 512 512"
                fill="currentColor"
                height="1.75em"
                width="1.75em"
              >
                <path d="M412.19 118.66a109.27 109.27 0 01-9.45-5.5 132.87 132.87 0 01-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14 23.9 350 16 350.13 16h-82.44v318.78c0 4.28 0 8.51-.18 12.69 0 .52-.05 1-.08 1.56 0 .23 0 .47-.05.71v.18a70 70 0 01-35.22 55.56 68.8 68.8 0 01-34.11 9c-38.41 0-69.54-31.32-69.54-70s31.13-70 69.54-70a68.9 68.9 0 0121.41 3.39l.1-83.94a153.14 153.14 0 00-118 34.52 161.79 161.79 0 00-35.3 43.53c-3.48 6-16.61 30.11-18.2 69.24-1 22.21 5.67 45.22 8.85 54.73v.2c2 5.6 9.75 24.71 22.38 40.82A167.53 167.53 0 00115 470.66v-.2l.2.2c39.91 27.12 84.16 25.34 84.16 25.34 7.66-.31 33.32 0 62.46-13.81 32.32-15.31 50.72-38.12 50.72-38.12a158.46 158.46 0 0027.64-45.93c7.46-19.61 9.95-43.13 9.95-52.53V176.49c1 .6 14.32 9.41 14.32 9.41s19.19 12.3 49.13 20.31c21.48 5.7 50.42 6.9 50.42 6.9v-81.84c-10.14 1.1-30.73-2.1-51.81-12.61z" />
              </svg>
            </Link>
          </div>
        </div>
        {/* List Container */}
        <div className="flex justify-around space-x-32">
          <div className="flex flex-col space-y-3 text-white">
            <Link to="#" className="hover:text-secondary">
              Accueil
            </Link>
            <Link to="#" className="hover:text-secondary">
              Produits
            </Link>
            <Link to="#" className="hover:text-secondary">
              Categories
            </Link>
          </div>
          <div className="flex flex-col space-y-3 text-white">
            <Link to="#" className="hover:text-secondary">
              A propos
            </Link>
            <Link to="#" className="hover:text-secondary">
              Rejoignez-nous
            </Link>
            <Link to="#" className="hover:text-secondary">
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Input Container */}
        <div className="flex flex-col justify-between">
          <form>
            <div className="flex space-x-3">
              <input
                type="text"
                className="flex-1 px-4 rounded-full focus:outline-none"
                placeholder="Abonne Newsletter"
              />
              <button className="px-6 py-2 text-primary rounded-full bg-secondary-dark hover:bg-secondary focus:outline-none">
                Envoyer
              </button>
            </div>
          </form>
          <div className="hidden text-white md:block">
            Copyright © All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
