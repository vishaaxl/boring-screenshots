import Head from "next/head";

import EditorLayout from "@/components/layouts/EditorLayout";
import ControlPanel from "@/components/edtior/controls/ControlPanel";
import Editor from "@/components/edtior/Editor/Editor";

export default function Home() {
  return (
    <>
      <Head>
        <title>Boring Screenshots | Editor</title>
        <meta name="description" content="No more boring screenshots" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EditorLayout>
        <Editor />
        <ControlPanel />
      </EditorLayout>
      <div className="hero bg-base-100 my-8 py-4">
        <div className="hero-content text-center">
          <p className="py-6 text-lg max-w-2xl">
            I was supposed to write something cool about this website but all
            this does is makes your screenshots look lovely.
          </p>
        </div>
      </div>
    </>
  );
}
