import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, TextArea, TreeView } from "devextreme-react";
import { updateScreen } from "../config/configSlice";

const Result = () => {
  let dispatch = useDispatch();
  const ScreenConfig = useSelector((s) => s.config);
  const [textBoxRef, setTextBoxRef] = React.useState(null);
  const [state, setState] = React.useState({
    copySuccess: ""
  });

  function onCopy() {
    dispatch(updateScreen({ screen: Screen, name: state.name }));

    let textBox = textBoxRef;
    setTimeout(() => {
      //textBox._input()[0].select();
      //textBox._instance._input()[0].select();
      //document.execCommand("copy");
      //setState({ ...state, copySuccess: "Copied!" });
    }, 100);
    setTimeout(() => {
      setState({ ...state, copySuccess: null });
    }, 2000);
  }
  return (
    <React.Fragment>
      {" "}
      <div className="options">
        <div className="option">
          <Button
            width={120}
            text={state.copySuccess ? state.copySuccess : "Update Json"}
            type="default"
            stylingMode="contained"
            onClick={onCopy}
          />
        </div>
      </div>
      <div className="options">
        <TextArea
          // ref={(ref) => {
          //   console.log("textBox", ref);
          //   setTextBoxRef(ref);
          // }}
          height={500}
          value={JSON.stringify({ ScreenConfig: ScreenConfig }, null, 2)}
          style={{
            fontFamily: "'MonoLisa', 'Courier New'"
          }}
        />
        {/* <pre>{JSON.stringify({ ScreenConfig: ScreenConfig }, null, 2)}</pre> */}
      </div>
    </React.Fragment>
  );
};

export default Result;
