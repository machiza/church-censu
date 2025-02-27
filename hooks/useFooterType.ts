import { useSelector, useDispatch } from "react-redux";
import { handleFooterType } from "@/store/layoutReducer";

const useFooterType = () => {
  const dispatch = useDispatch();
  const footerType = useSelector((state: any) => state.layout.footerType);
  const setFooterType = (val: any) => dispatch(handleFooterType(val));
  return [footerType, setFooterType];
};

export default useFooterType;
