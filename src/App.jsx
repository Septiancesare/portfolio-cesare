import { useEffect } from "react";
import DinoCompanion from "./components/DinoCompanion";
import Footer from "./components/Footer";
import TopBar from "./components/TopBar";
import { useHashRoute } from "./lib/router";
import About from "./pages/About";
import Academic from "./pages/Academic";
import Landing from "./pages/Landing";
import Play from "./pages/Play";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";

const PAGES = {
  "/": Landing,
  "/play": Play,
  "/about": About,
  "/academic": Academic,
  "/skills": Skills,
  "/projects": Projects,
};

export default function App() {
  const [route, navigate] = useHashRoute();
  const Page = PAGES[route] || Landing;
  const isPlay = route === "/play";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-void">
      <TopBar route={route} navigate={navigate} />

      <main key={route} className="page-enter">
        <Page navigate={navigate} />
      </main>

      <Footer navigate={navigate} withCompanion={!isPlay} />

      {!isPlay ? (
        <DinoCompanion route={route} navigate={navigate} />
      ) : null}

      <div className="crt-overlay" aria-hidden="true" />
    </div>
  );
}
