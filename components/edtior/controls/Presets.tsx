import { useAuthContext } from "@/context/User";
import { db } from "@/firebase.config";
import {
  DocumentData,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import BackgroundTile from "./BackgroundTile";
import { useEditorContext } from "@/context/Editor";
import { EditorProps, PresetProps } from "@/interface";
import {
  BsTrash,
  BsTrash2Fill,
  BsTrash3,
  BsTrash3Fill,
  BsTrashFill,
} from "react-icons/bs";

interface Props {}

const Presets: React.FC<Props> = () => {
  const [presetsData, setPresetsData] = useState<DocumentData>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuthContext();
  const { updatePreset } = useEditorContext();
  const isMounted = useRef<boolean>(true);

  const getUserPresets = useCallback(async () => {
    try {
      if (currentUser) {
        const presetRef = collection(db, "presets");
        const q = query(presetRef, where("user", "==", currentUser.uid));

        //   fetch data and save in state
        await getDocs(q).then((snapshot) => setPresetsData(snapshot.docs));
        setLoading(false);
      }
    } catch (error) {
      toast.error("oops, cannot get your presets right now");
      setLoading(false);
    }
  }, [currentUser]);

  const deletePreset = (id: string) => {
    const docRef = doc(db, "presets", id);

    deleteDoc(docRef)
      .then(() => {
        toast("Deleted Successfully");
        setPresetsData(presetsData.filter((e: any) => e.id != id));
      })
      .catch(() => {
        toast("oops! something went wrong");
      });
  };

  useEffect(() => {
    if (isMounted.current) getUserPresets();

    return () => {
      isMounted.current = false;
    };
  }, [getUserPresets]);

  const LoadingBlock = ({ title }: { title: string }) => {
    return (
      <div className="h-[90px] flex items-center justify-center w-full">
        <span className="text-primary-content capitalize">{title}</span>
      </div>
    );
  };

  const PresetBlock = ({
    title,
    children,
  }: {
    title: string;
    children?: ReactNode;
  }) => {
    return (
      <div>
        <div className="h-[90px] relative cursor-pointer">{children}</div>
        <div className="flex items-center justify-center w-full">
          <span className="bg-base-100 px-4 py-2 text-primary-content rounded-md capitalize text-center">
            {title}
          </span>
        </div>
      </div>
    );
  };

  if (loading) {
    return <LoadingBlock title="Loading" />;
  }

  return (
    <>
      {presetsData.length > 0 ? (
        <div className="grid sm:grid-cols-2 w-full p-2 gap-2">
          {presetsData.map((e: DocumentData) => {
            const data: PresetProps = e.data();

            return (
              <PresetBlock key={e.id} title={data.presetName}>
                <>
                  <BackgroundTile
                    onTap={() => updatePreset && updatePreset(data)}
                    background={data.currentBackground.background || "white"}
                    size={"100%"}
                  />
                  <button
                    className="absolute bottom-2 right-2 bg-base-100 p-2 rounded-md hover:scale-110 transition-transform"
                    onClick={() => deletePreset(e.id)}
                  >
                    <BsTrash3Fill className="text-error text-lg" />
                  </button>
                </>
              </PresetBlock>
            );
          })}
        </div>
      ) : (
        <LoadingBlock title="No Presets Found" />
      )}
    </>
  );
};

export default Presets;
