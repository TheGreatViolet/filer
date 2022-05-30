import { useState } from "react";
import Headbar from "./components/Headbar";
import Sidebar from "./components/Sidebar";
import FileList from './components/pages/FileList';
import { FileEntry } from "@tauri-apps/api/fs";

const App = () => {
  const [folder, setFolder] = useState<FileEntry>({name: "Documents", path: "~/Documents"});

  return (
    <>
      <div className='flex flex-col bg-zinc-900 w-screen h-screen overflow-hidden'>
        <Headbar />

        <div className="flex flex-row h-full w-screen">
          <Sidebar setFolder={setFolder}/>

          <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 overflow-y-scroll">
              <FileList
                folderName={folder.name || ""}
                folderPath={folder.path}
                activeState={setFolder}/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;