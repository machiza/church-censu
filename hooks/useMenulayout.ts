import { useSelector, useDispatch } from "react-redux";
import { handleType } from "@/store/layoutReducer";

const useMenuLayout = () => {
  const dispatch = useDispatch();
  const menuType = useSelector((state: any) => state.layout.type);

  const setMenuLayout = (value: any) => {
    dispatch(handleType(value));
  };

  return [menuType, setMenuLayout];
};

export default useMenuLayout;
