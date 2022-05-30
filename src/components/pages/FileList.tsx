import { FileEntry } from "@tauri-apps/api/fs";
import { useEffect, useState } from "react";
import { getItemsInFolder, isDir, openFile } from "../../functions/files";
import NoFiles from "./NoFiles";

interface FileListProps {
  folderPath: string,
  folderName: string,
  activeState: Function
}

const ActualFileList = (props: FileListProps) => {
  const [fileList, setFileList] = useState<FileEntry[]>([]);

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

  return (
    <>
      <div className="flex flex-col border-2 border-zinc-900">
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