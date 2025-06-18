import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { fetchQuestionsStart, fetchQuestionsSuccess, fetchQuestionsFailure } from '../store/slices/questionSlice';
import { axiosInstance } from '../api/axios';
import { API_ENDPOINTS } from '../api/endpoints';
import { TabSidebar } from '../components/TabSidebar';
import { Loading } from '../components/Loading';
import { SettingTool } from '../components/SettingTool';
import avatar from '../assets/img/avatar.svg'
import up from '../assets/img/up.svg'
// import upSlt from '../assets/img/upSlt.svg'
import down from '../assets/img/down.svg'
// import downSlt from '../assets/img/downSlt.svg'
import appendix from '../assets/img/appendix.svg'
import comment from '../assets/img/comment.svg'

type user = {
    "Email": string,
    "Username": string,
    "Password": string,
    "Point": number,
    "CreatedAt": string,
    "UpdatedAt": string,
    // "Questions": null,
    // "Answers": null,
    // "Votes": null
}


export const Home = () => {
  const dispatch = useDispatch();
  const { questions, loading, error } = useSelector((state: RootState) => state.questions);
  // const { user } = useSelector((state: RootState) => state.auth);
  const [content, setContent] = useState("post");
  const [account, setAccount] = useState<user | null>(null);
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  

  const handleTool = (value: string) => {
    setContent(value);
  }

  useEffect(() => {
    const fetchQuestions = async () => {
      dispatch(fetchQuestionsStart());
      try {
        const response = await axiosInstance.get(API_ENDPOINTS.QUESTION.GET_ALL);
        console.log("API Response Data:", response.data);
        dispatch(fetchQuestionsSuccess(response.data.data));
      } catch (err) {
        dispatch(fetchQuestionsFailure(err instanceof Error ? err.message : 'Failed to fetch questions'));
      }
    };

    fetchQuestions();
  }, [dispatch]);

  /**
   * Vấn đề: Tại sao phải reload lại trang thì mới post được cái đầu tiên, còn cái thứ 2 thì server trả về 400?
   * 
   * Giải thích:
   * - Có thể do state (title, content) không được reset sau khi post thành công, nên lần post thứ 2 gửi lên dữ liệu rỗng hoặc trùng lặp.
   * - Hoặc do API yêu cầu dữ liệu không được trùng lặp, hoặc có validate phía backend.
   * - Ngoài ra, headers Authorization đã được axiosInstance tự động thêm qua interceptor, không cần truyền lại ở đây.
   * 
   * Cách khắc phục:
   * - Reset lại state title và question sau khi post thành công.
   * - Không cần truyền headers Authorization ở đây.
   * - Xử lý lỗi rõ ràng hơn để biết lý do server trả về 400.
   */

  const handleAddQuestion = async (title: string, content: string) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.QUESTION.CREATE,
        {
          title: title,
          content: content,
        }
      );
      console.log("Post question response:", response.data);
      // Reset lại state sau khi post thành công (nếu muốn)
      setTitle("");
      setQuestion("");
      // Có thể fetch lại danh sách câu hỏi nếu muốn cập nhật UI
      // Hoặc dispatch(fetchQuestionsStart())...
    } catch (error: any) {
      if (error.response) {
        // Lỗi từ phía server
        console.error("Server error:", error.response.data);
      } else {
        // Lỗi khác (network, v.v.)
        console.error("Error posting question:", error.message || error);
      }
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(API_ENDPOINTS.USER.GET_PROFILE);
        setAccount(response.data);
      } catch (err) {
        console.error(err instanceof Error ? err.message : 'Failed to fetch questions');
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen"><Loading/></div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100 w-full">
      {/* Left Sidebar */}
      <TabSidebar content={handleTool} username={account?.Username}/>

      {/* Right Content Area */}
      {content === 'post' ? (
        <div className="flex-1 p-8 overflow-y-auto">
        {/* Post Question Section */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <input 
              type="text" 
              className='w-full p-1 font-bold mb-3 border border-gray-300 rounded-md mb-4 focus:ring-blue-500 focus:border-blue-500'
              placeholder='Title...'
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              placeholder="Any thoughts..."
              onChange={(e) => setQuestion(e.target.value)}
            ></textarea>
            <div className="flex justify-between items-center">
              <div className="flex space-x-3 text-gray-600">
                <button
                  className="p-2 rounded-full hover:bg-gray-100 relative group"
                  type="button"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path></svg>
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                    Format
                  </span>
                </button>
                <button
                  className="p-2 rounded-full hover:bg-gray-100 relative group"
                  type="button"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                    Checklist
                  </span>
                </button>
                <button
                  className="p-2 rounded-full hover:bg-gray-100 relative group"
                  type="button"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101m-.757 4.898l-4 4"></path></svg>
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                    Link
                  </span>
                </button>
                <button
                  className="p-2 rounded-full hover:bg-gray-100 relative group"
                  type="button"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                    More
                  </span>
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <select className="border border-gray-300 rounded-md py-1 px-2 text-sm text-gray-700">
                  <option>Private</option>
                  <option>Public</option>
                </select>
                <button 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  onClick={() => handleAddQuestion(title, question)}
                >
                  Save
                </button>
              </div>
            </div>
          </div>

          {/* Display Questions Section */}
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Posts</h1>
          <div className="space-y-6">
            {questions.map((question) => (
              <div key={question.id} className="bg-white p-6 rounded-lg shadow">
                <div className='flex justify-between'>
                  <div className="flex items-center mb-4">
                    <img src={avatar} alt="User Avatar" className="w-10 h-10 rounded-full mr-3" />
                    <div>
                      <span className="font-semibold text-lg text-gray-800">{question.User.Username || 'Guest'}</span>  <br />
                      <span className='text-gray-500 text-sm'>{new Date(question.CreatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <button><img src={appendix} alt="" className='img-fluid mb-5' style={{maxHeight: "30px"}}/></button>
                </div>
                <h2 className="text-xl font-semibold mb-2 text-gray-900">{question.Title}</h2>
                <p className="text-gray-700 mb-4">{question.Content}</p>
                <div className='flex'>
                  <button><img src={up} alt="" className='img-fluid' style={{maxHeight: "30px"}}/></button>
                  <p className='font-bold text-sm mt-1'>12</p>
                  <button><img src={down} alt="" className='img-fluid me-4' style={{maxHeight: "30px"}}/></button>
                  <button><img src={comment} alt="" className='img-fluid' style={{maxHeight: "20px"}}/></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <SettingTool/>
        </div>
      )}
    </div>
  );
}; 