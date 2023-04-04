import Head from "next/head";

import EditorLayout from "@/components/layouts/EditorLayout";
import ControlPanel from "@/components/edtior/controls/ControlPanel";
import Editor from "@/components/edtior/Editor/Editor";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EditorLayout>
        <Editor />
        <ControlPanel />
      </EditorLayout>
    </>
  );
}
