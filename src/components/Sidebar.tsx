import { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react';
import { Favorite } from "../types";
import { getFavFolders, addFolder } from "../functions/data";

interface SidebarProps {
  setFolder: Function
}

const Sidebar = (props: SidebarProps) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [addFolderVal, setAddFolderVal] = useState<string>('');

  const updateFolderVal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddFolderVal(e.target.value);
  }

  const addFavorite = async (folderPath: string) => {
    const name = folderPath.split(/.+\/(.+)$/)[1];

    addFolder(name, folderPath, true);
  }

  const fetchFavorites = async () => {
    const favs = await getFavFolders();
    const typedFavs = favs.map((fav): Favorite => {
      return {
        path: fav,
        name: fav.split(/.+\/(.+)$/)[1],
      }
    });

    console.log(typedFavs);
    

    setFavorites(typedFavs);
  }

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <>
      <div className="border-r-2 border-zinc-800 flex flex-col h-full w-1/6 p-4">
        <div className="flex flex-row">
          <p className="text-lg text-zinc-200">Quick Access</p>

          <div className="grow"/>

          <button className="mt-2 ml-1" onClick={() => {
            setIsOpen(true);
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-zinc-200"
              fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        <div className="relative flex py-2 items-center">
          <div className="divider"></div>
        </div>

        <div className="pl-2 flex flex-col space-y-2">
          {favorites.map((folder) => {
            return (
              <button className="btn-main" onClick={() => {
                props.setFolder({ name: folder.name, path: folder.path });
              }}>{folder.name}</button>
            );
          })}
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {
          setIsOpen(false);
        }}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-zinc-900 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-zinc-200"
                  >
                    Add a new quick access folder
                  </Dialog.Title>

                  <div className="mt-4 flex flex-col space-y-2">
                    <p className="text-zinc-200 text-xl">Path:</p>

                    <input type='text' value={addFolderVal} onChange={updateFolderVal}
                      className="bg-zinc-800 rounded-md text-zinc-200 p-0.5"/>

                    <button
                      className="text-zinc-200"
                      onClick={() => {
                        addFavorite(addFolderVal).then(() => {
                          setFavorites([...favorites, {
                            name: addFolderVal.split(/.+\/(.+)$/)[1],
                            path: addFolderVal
                          }]);

                          setIsOpen(false);
                          setAddFolderVal('');
                        });
                      }}>
                      Add
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Sidebar;