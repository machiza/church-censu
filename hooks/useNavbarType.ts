import { useSelector, useDispatch } from "react-redux";
import { handleNavBarType } from "@/store/layoutReducer";

const useNavbarType = () => {
  const dispatch = useDispatch();
  const navbarType = useSelector((state: any) => state.layout.navBarType);
  const setNavbarType = (val: any) => dispatch(handleNavBarType(val));
  return [navbarType, setNavbarType];
};

export default useNavbarType;
