import { useEffect, useState } from "react";
import Headbar from "./components/Headbar";
import Sidebar from "./components/Sidebar";
import { getFavFolders } from "./functions/data";

const App = () => {
  const [activeWindow, setActiveWindow] = useState(<></>);

  useEffect(() => {
    getFavFolders().then(console.log);
  }, []);

  return (
    <>
      <div className='flex flex-col bg-zinc-900 w-screen h-screen'>
        <Headbar />

        <div className="flex flex-row h-full w-screen">
          <Sidebar activeWindowState={setActiveWindow}/>

          <div className="flex-grow">
            {activeWindow}
          </div>
        </div>
      </div>
    </>
  )
}

export default App;