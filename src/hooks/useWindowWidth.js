import { useState, useEffect } from "react";

//an example of a custom hook
//taken from https://dev.to/damcosset/how-to-create-custom-hooks-in-react-44nd

const useWindowWidth = () => {
  const [ isScreenSmall, setIsScreenSmall ] = useState(false);

  let checkScreenSize = () => {
    setIsScreenSmall(window.innerWidth < 600);
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return isScreenSmall;
}

export default useWindowWidth;