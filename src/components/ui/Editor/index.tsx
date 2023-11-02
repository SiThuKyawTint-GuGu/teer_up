import { Editor } from "@tinymce/tinymce-react";

interface Props {
  handleEditorInit: any;
}
const HtmlEditor = (props: Props) => {
  return (
    <>
      <Editor onInit={props.handleEditorInit} />
    </>
  );
};

export default HtmlEditor;
