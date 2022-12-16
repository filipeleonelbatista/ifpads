
import React from "react";
import { useLocation } from "react-router-dom";
import DrawerComponent from "../components/DrawerComponent";
import PadButton from "../components/PadButton";

function Pads() {
  let { state } = useLocation();

  React.useEffect(() => {
    console.log("pad_id", state)
  }, [state])
  
  return (
    <DrawerComponent title="Pads">
      <PadButton title="Teste" onClick={() => alert("Teste")} />
    </DrawerComponent>
  )
}

export default Pads
