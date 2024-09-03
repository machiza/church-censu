import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleMobileMenu } from "@/store/layoutReducer";

const useMobileMenu = () => {
  const dispatch = useDispatch();
  const mobileMenu = useSelector((state: any) => state.layout.mobileMenu);

  // ** Toggles Mobile Menu
  const setMobileMenu = (val: any) => dispatch(handleMobileMenu(val));

  return [mobileMenu, setMobileMenu];
};

export default useMobileMenu;
