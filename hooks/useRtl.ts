import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleRtl } from "@/store/layoutReducer";

const useRtl = () => {
  const dispatch = useDispatch();
  const isRtl = useSelector((state: any) => state.layout.isRTL);

  const setRtl = (val: any) => dispatch(handleRtl(val));

  return [isRtl, setRtl];
};

export default useRtl;
