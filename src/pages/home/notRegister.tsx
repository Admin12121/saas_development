import {Empty} from "@/pages/empty/empty"

const NotRegister = () => {
  return (
    <div className="flex justify-center items-center h-screen flex-col gap-4">
        <Empty/>
        <div className="text-center flex flex-col gap-2">
            <h1 className="text-2xl font-bold">Domain is not registered.</h1>
            <p className="text-sm text-gray-500">Please contact the administrator to register your domain</p>
        </div>
    </div>
  )
}

export default NotRegister