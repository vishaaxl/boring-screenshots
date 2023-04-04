import { useEditorContext } from "@/context/Editor";
import { useAuthContext } from "@/context/User";
import { db } from "@/firebase.config";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface Props {}

const SavePresetModal: React.FC<Props> = () => {
  const { currentUser } = useAuthContext();
  const [presetName, setPresetName] = useState("");
  const { getCurrentPreset } = useEditorContext();

  const savePreset = async () => {
    if (!currentUser) {
      toast.error("You need to logged in to save preset!");
      return;
    }

    if (!presetName) {
      toast.error("Name can't be empty!");
      return;
    }

    // @ts-ignore
    const { selectedImage, ...data } = getCurrentPreset();

    try {
      await fetch("/api/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, user: currentUser.uid, presetName }),
      })
        .then((response) => response.json())
        .then((data) => toast(data.message))
        .catch(() => {
          toast.error("oops! preset can't be saved");
        });
    } catch (error) {
      toast.error("oops! something went wrong");
    }
  };

  return (
    <>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer ">
        <label className="modal-box relative rounded-md" htmlFor="">
          <h3 className="font-bold text-xl mb-4">
            What should we name your masterpiece!
          </h3>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Example: Instagram Post</span>
            </label>
            <input
              onChange={(e) => setPresetName(e.target.value)}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
          </div>
          <div className="modal-action">
            <label
              htmlFor="my-modal-4"
              className="btn rounded-md font-medium"
              onClick={savePreset}
            >
              Save your preset
            </label>
            <label
              htmlFor="my-modal-4"
              className="btn btn-outline font-medium rounded-md"
            >
              Cancel
            </label>
          </div>
        </label>
      </label>
    </>
  );
};
export default SavePresetModal;
