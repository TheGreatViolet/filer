import { FileEntry } from "@tauri-apps/api/fs";
import React, { useEffect, useRef, useState } from "react";
import { getItemsInFolder, isDir, openFile } from "../../functions/files";
import FolderContext from "../Context/FolderContext";
import NoFiles from "./NoFiles";

interface FileListProps {
  folderPath: string,
  folderName: string,
  activeState: Function
}

enum ContextMenuType {
  File,
  Folder
}

const ActualFileList = (props: FileListProps) => {
  const [fileList, setFileList] = useState<FileEntry[]>([]);

  const [contextMenuActive, setContextMenuActive] = useState(false);
  const [contextMenuLoc, setContextMenuLoc] = useState({x: 0, y: 0});
  const [contextMenuType, setContextMenuType] = useState<ContextMenuType>(ContextMenuType.File);

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>, type: ContextMenuType) => {
    event.preventDefault();

    const adjustedLoc = {
      x: event.clientX,
      y: event.clientY
    }

    setContextMenuActive(true);
    setContextMenuLoc(adjustedLoc);
    setContextMenuType(type);
  }

  const refreshFileList = (path: string) => {
    getItemsInFolder(path).then((files) => {
      setFileList(files);
    });
  }

  useEffect(() => {
    refreshFileList(props.folderPath);
  }, []);

  useEffect(() => {
    refreshFileList(props.folderPath);
  }, [props.folderPath]);

  const setActiveWindow = (folder: FileEntry) => {
    props.activeState(folder);
  }

  const contextSwitch = (type: ContextMenuType): React.ReactNode => {
    switch (type) {
      case ContextMenuType.File:
        return (
          <>

          </>
        )

      case ContextMenuType.Folder:
        console.log("folder");
        
        return (
          <FolderContext />
        )
    }
  }

  return (
    <>
      <div className='absolute bg-zinc-800 z-10
        rounded-md w-80
        motion-safe:ease-in-out duration-75'
        style={{
          position: "absolute",
          top: contextMenuLoc.y,
          left: contextMenuLoc.x,
          opacity: contextMenuActive ? 1 : 0
        }}>
          {contextSwitch(contextMenuType)}
      </div>

      <div className="flex flex-col border-2 border-zinc-900 h-full z-0"
        onContextMenu={(e) => {
          handleContextMenu(e, ContextMenuType.Folder);
        }} onClick={() => {
          setContextMenuActive(false);
        }}>
        {fileList.map((file) => {
          return (
            <>
              <div className="file-item">
                <button className="pl-1 flex-1 text-left text-zinc-200
                focus:bg-zinc-700 motion-safe:ease-in-out motion-safe:duration-150"
                onDoubleClick={async () => {
                  if (await isDir(file.path)) {
                    setActiveWindow({
                      name: file.name,
                      path: file.path
                    })

                    return;
                  }
                  openFile(file.path);
                }}>{file.name}</button>
              </div>
            </>
          )
        })}
      </div>
    </>
  )
}

const FileList = (props: FileListProps) => {
  const [fileList, setFileList] = useState<FileEntry[]>([]);

  const refreshFileList = () => {
    getItemsInFolder(props.folderPath).then((files) => {
      setFileList(files);
    });
  }

  useEffect(() => {
    refreshFileList();
  }, []);

  return (
    <>
      {fileList.length === 0 ?
      <NoFiles /> :
      <ActualFileList folderPath={props.folderPath} folderName={props.folderName} activeState={props.activeState}/>}
    </>
  )
}

export default FileList;