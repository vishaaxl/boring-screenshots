import { User as FirebaseUser } from "firebase/auth";

export interface GradientProps {
  id?: number;
  direction: string;
  background: string;
  color1: string;
  color2: string;
  color3?: string;
}

export enum BackgroundType {
  "gradient",
  "solid",
  "custom",
}

export interface EditorProps {
  resetChanges?: () => void;
  updateBackground?: (value: GradientProps) => void;
  updateData?: (name: string, value: any) => void;
  currentBackground: GradientProps;
  currentBackgroundType: BackgroundType;
  selectedImage: string | null;
  scale: number;
  borderRadius: number;
  canvasRoundness: number;
  padding: number;
  tilt: {
    name: string;
    value: string;
  };
  aspectRatio: {
    name: string;
    value: string;
  };
  currentBoxShadow: {
    name: string;
    value: string;
  };
  noise: boolean;
  watermark: {
    visible: boolean;
    value: string;
  };
}

export interface UserDetails {
  displayName: string | null | undefined;
  email: string | null | undefined;
  photoUrl: string | null | undefined;
}

export interface UserAuthProps {
  currentUser: UserDetails | null;
  loginWithGoogle: () => void;
  logout: () => void;
}
