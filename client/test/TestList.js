import React from "react";
import PropTypes from "prop-types";
import Test from "./Test";

export default function TestList(props) {
  return (
    <div style={{ marginTop: "24px" }}>
      {props.tests.map((item, i) => {
        return <Test test={item} key={i} onRemove={props.removeUpdate} />;
      })}
    </div>
  );
}
TestList.propTypes = {
  tests: PropTypes.array.isRequired,
  removeUpdate: PropTypes.func.isRequired,
};
