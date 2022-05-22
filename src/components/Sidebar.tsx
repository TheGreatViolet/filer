import { useState, useEffect } from "react";
import { getFavFolders } from "../functions/data";
import { Favorite } from "../types";

const Sidebar = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    // Placeholder for favorites
    setFavorites([{ name: "Documents", path: "~/Documents" }]);
  }, []);

  return (
    <div className="border-r-2 border-zinc-800 flex flex-col h-full w-1/6 p-4">
      <p className="text-lg text-zinc-200">Quick Access</p>

      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-zinc-400"></div>
      </div>

      <div className="pl-2 flex flex-col space-y-2">
        {favorites.map((folder) => {
          return (
            <button className="bg-zinc-700 rounded-md">{folder.name}</button>
          );
        })}
      </div>
    </div>
  )
}

export default Sidebar;