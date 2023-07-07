import React from "react";

export default function useComponentLogic(props) {
  const { value = "", disabled = false } = props;

  const timeoutRef = React.useRef();

  const [S_instance, S_setInstance] = React.useState(null);
  const [S_value, S_setValue] = React.useState(value);

  React.useEffect(() => {
    if (S_instance === null || value === S_value) {
      return;
    }

    S_setValue(value);
    S_instance.setData(value);
  }, [S_instance, props.value]);

  function onChange(event) {
    if (disabled) {
      return;
    }

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      const editorValue = event.editor.getData();

      S_setValue(editorValue);
      props.onChange?.(editorValue);
    }, 1000);
  }

  return {
    setInstance: S_setInstance,
    disabled: disabled,
    onChange: onChange,
  };
}
