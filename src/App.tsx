import { useEffect, useState } from "react";
import Headbar from "./components/Headbar";
import Sidebar from "./components/Sidebar";
import FileList from './components/pages/FileList';
import { getFavFolders } from "./functions/data";
import { FileEntry } from "@tauri-apps/api/fs";

const App = () => {
  const [folder, setFolder] = useState<FileEntry>({name: "Documents", path: "~/Documents"});

  return (
    <>
      <div className='flex flex-col bg-zinc-900 w-screen h-screen'>
        <Headbar />

        <div className="flex flex-row h-full w-screen">
          <Sidebar setFolder={setFolder}/>

          <div className="flex-grow">
            <FileList
              folderName={folder.name || ""}
              folderPath={folder.path}
              activeState={setFolder}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;