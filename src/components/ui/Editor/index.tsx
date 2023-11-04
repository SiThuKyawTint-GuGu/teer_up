import { usePostFile } from "@/services/content";
import { Editor } from "@tinymce/tinymce-react";

interface Props {
  init?: any;
  value?: string;
  onEditorChange?: any;
}
const HtmlEditor = (props: Props) => {
  const { trigger } = usePostFile();
  const uploadHandler = (blobInfo: any): any => {
    return trigger({ file: blobInfo.blob() }).then(res => {
      return res?.data?.data?.file_path;
    });
  };

  return (
    <>
      <Editor
        // apiKey="bsxh9v4j0on90mglp1mrf5dkvif8md64ftfegm3v1bz5pgws"
        apiKey="jtn7ui8m0oeo96qzgled3rctiz00b4p5itohc5uf5pfdwyrf"
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
          images_upload_handler: uploadHandler,
        }}
      />
    </>
  );
};

export default HtmlEditor;
