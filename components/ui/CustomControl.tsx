// CustomControl.tsx

import React from "react";
import styled from "styled-components";
import { components } from "react-select";

export const Control = (props: any) => {
  return (
    <>
      <Label isFloating={props.isFocused || props.hasValue}>Select</Label>
      <components.Control {...props} />
    </>
  );
};

const Label = styled.label<{ isFloating?: boolean }>`
  left: 10px;
  pointer-events: none;
  position: absolute;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;

  top: ${(props) => (props.isFloating ? `5px` : `35%`)};
  font-size: ${(props) => (props.isFloating ? `0.5rem` : `1rem`)};
`;