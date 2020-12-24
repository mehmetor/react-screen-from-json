import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, TextArea } from "devextreme-react";
import { updateScreen } from "../config/configSlice";

const SubModelConfig = () => {
  let dispatch = useDispatch();
  const { Names, Screens, Lists } = useSelector((s) => s.config);
  const ScreenConfig = useSelector((s) => s.config);
  const Screen = useSelector((s) => s.screen);

  return <pre>{JSON.stringify(Screen.subModels, null, 2)}</pre>;
};

export default SubModelConfig;
