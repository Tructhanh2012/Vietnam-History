import React from "react";
import { CKEditor } from "ckeditor4-react";

import useComponentLogic from "./component.logic";
import styles from "./style.module.scss";

const Component = (props) => {
  const { className = "" } = props;

  const uniqueId = React.useId();
  const { disabled, setInstance, onChange } = useComponentLogic(props);

  const ContentEditor = () => {
    return (
      <CKEditor
        name={`content-editor-${uniqueId}`}
        editorUrl="/ckeditor/ckeditor.js"
        config={{
          height: 300,
          removePlugins: "language, exportpdf, uploadimage",
          entities: false,
          allowedContent: true,
        }}
        onChange={onChange}
        onInstanceReady={({ editor }) => setInstance(editor)}
      />
    );
  };

  /* Render **************************************************************************************************************************************************/
  return ContentEditor();
};

export default React.memo(Component, (prev, next) => {
  const className = prev.className === next.className;
  const value = prev.value === next.value;
  const disabled = prev.disabled === next.disabled;

  return className && value && disabled;
});
