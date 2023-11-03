import { Editor } from "@tinymce/tinymce-react";

interface Props {
  init?: any;
  value?: string;
  onEditorChange?: any;
}
const HtmlEditor = (props: Props) => {
  return (
    <>
      <Editor
        apiKey="bsxh9v4j0on90mglp1mrf5dkvif8md64ftfegm3v1bz5pgws"
        onInit={props.init}
        value={props.value}
        onEditorChange={props.onEditorChange}
        init={{
          // height: 500,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent table | " +
            "code | removeformat | help",
          content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </>
  );
};

export default HtmlEditor;
