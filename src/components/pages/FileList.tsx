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
    console.log("doing");
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
              <div className="w-full flex flex-row p-0.5 border-2 border-zinc-500">
                <button className="ml-1 text-zinc-200"
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