import { useNavigate } from "react-router-dom"

export const SettingTool = () => {
    const navigation = useNavigate();

  return (
    <div>
        <div className="m-5 flex-1 overflow-y-auto">
            <div>
                <ul className="list-none">
                    <li className="font-semibold text-xl">Cơ bản</li>
                    <li className="mt-3 mb-5">Tiêu đề</li>
                    <li className=" mb-5">Mô tả</li>
                    <li className=" mb-5">Ngôn ngữ</li>
                </ul>
            </div> <hr className="w-full"/>
            <div className="mt-5">
                <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => navigation("/login")}
                >
                    Đăng xuất
                </button>
            </div>
        </div>
    </div>
  )
}
