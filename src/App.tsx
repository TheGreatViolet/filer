import Headbar from "./components/Headbar";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <>
      <div className='flex flex-col bg-zinc-900 w-screen h-screen'>
        <Headbar />

        <div className="flex flex-row h-full w-screen">
          <Sidebar />
        </div>
      </div>
    </>
  )
}

export default App;