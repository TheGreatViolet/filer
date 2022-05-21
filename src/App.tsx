import { useEffect } from "react";
import Headbar from "./components/Headbar";
import Sidebar from "./components/Sidebar";
import { getFavFolders } from "./functions/data";

const App = () => {
  useEffect(() => {
    getFavFolders().then(console.log);
  }, []);

  return (
    <>
      <div className='flex flex-col bg-zinc-900 w-screen h-screen'>
        <Headbar />

        <div className="flex flex-row h-full w-screen">
          <Sidebar />
        </div>
      </div>
    </>
  )
}

export default App;