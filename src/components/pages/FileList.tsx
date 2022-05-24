import { FileEntry } from "@tauri-apps/api/fs";
import { useEffect, useState } from "react";
import { getItemsInFolder } from "../../functions/files";
import NoFiles from "./NoFiles";

interface FileListProps {
  folderPath: string,
  folderName: string,
}

const ActualFileList = (props: FileListProps) => {
  return (
    <>
      <h1>Placeholder</h1>
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