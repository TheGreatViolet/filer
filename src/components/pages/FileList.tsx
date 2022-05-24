import { FileEntry } from "@tauri-apps/api/fs";
import { useEffect, useState } from "react";
import { getItemsInFolder } from "../../functions/files";
import NoFiles from "./NoFiles";

interface FileListProps {
  folderPath: string,
  folderName: string,
}

const ActualFileList = (props: FileListProps) => {
  const [fileList, setFileList] = useState<FileEntry[]>([]);

  const refreshFileList = () => {
    getItemsInFolder(props.folderPath).then((files) => {
      console.log(files);
      
      setFileList(files);
    });
  }

  useEffect(() => {
    refreshFileList();
  }, []);

  return (
    <>
      <div className="flex flex-col border-2 border-zinc-900">
        {fileList.map((file) => {
          return (
            <>
              <div className="flex flex-row p-0.5 border-2 border-zinc-500">
                <p className="ml-1 text-zinc-200">{file.name}</p>
              </div>

              <div className="w-fit"/>
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
      <ActualFileList folderPath={props.folderPath} folderName={props.folderName}/>}
    </>
  )
}

export default FileList;