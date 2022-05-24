import React, { useState, useEffect } from "react";
import { getFavFolders } from "../functions/data";
import { Favorite } from "../types";
import FileList from "./pages/FileList";

interface SidebarProps {
  activeWindowState: Function
}

const Sidebar = (props: SidebarProps) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    // Placeholder for favorites
    setFavorites([{ name: "Documents", path: "~/Documents" }]);
  }, []);

  const setActiveWindow = (window: JSX.Element) => {
    props.activeWindowState(window);
  }

  return (
    <div className="border-r-2 border-zinc-800 flex flex-col h-full w-1/6 p-4">
      <p className="text-lg text-zinc-200">Quick Access</p>

      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-zinc-400"></div>
      </div>

      <div className="pl-2 flex flex-col space-y-2">
        {favorites.map((folder) => {
          return (
            <button className="bg-zinc-700 rounded-md" onClick={() => {
              setActiveWindow(<>
                <FileList folderName={folder.name} folderPath={folder.path}/>
              </>);
            }}>{folder.name}</button>
          );
        })}
      </div>
    </div>
  )
}

export default Sidebar;