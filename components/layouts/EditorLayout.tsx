import { ReactNode } from "react";
// local
import Navigation from "../common/Navigation";

interface Props {
  children: ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <main className="min-h-[100vh] h-fit">
      <Navigation />
      <section className="container mx-auto px-[1rem] lg:px-0">
        <div className="grid gap-4 lg:grid-cols-[3fr_1.5fr]">{children}</div>
      </section>
    </main>
  );
};

export default MainLayout;
