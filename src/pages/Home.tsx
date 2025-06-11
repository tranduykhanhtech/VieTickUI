import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { fetchQuestionsStart, fetchQuestionsSuccess, fetchQuestionsFailure } from '../store/slices/questionSlice';
import { axiosInstance } from '../api/axios';
import { API_ENDPOINTS } from '../api/endpoints';

export const Home = () => {
  const dispatch = useDispatch();
  const { questions, loading, error } = useSelector((state: RootState) => state.questions);
  const { user } = useSelector((state: RootState) => state.auth);

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

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-64 bg-white p-6 shadow-md flex flex-col">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <img src="/path/to/avatar.png" alt="User Avatar" className="w-10 h-10 rounded-full mr-3" />
            <span className="font-semibold text-lg text-gray-800">{user?.username || 'Guest'}</span>
          </div>
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search memos..."
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 pl-10"
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md transition-colors">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001 1h3v-3m0 0h6m-6 0v3a1 1 0 001 1h3v-3"></path></svg>
                Home <span className="ml-auto bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">3</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md transition-colors">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                Explore
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md transition-colors">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                Notifications
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md transition-colors">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.562.472 1.137.942 1.724 1.066z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                Settings
              </a>
            </li>
          </ul>
        </div>

        {/* Calendar - Simplified for now */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">March 2025</h3>
          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            <div className="font-medium text-gray-500">Sun</div>
            <div className="font-medium text-gray-500">Mon</div>
            <div className="font-medium text-gray-500">Tue</div>
            <div className="font-medium text-gray-500">Wed</div>
            <div className="font-medium text-gray-500">Thu</div>
            <div className="font-medium text-gray-500">Fri</div>
            <div className="font-medium text-gray-500">Sat</div>
            {/* Dummy dates for March 2025 - simplified */}
            {[...Array(30).keys()].map(i => {
              const day = i + 1;
              const isToday = day === 31; // Example for 31st
              return (
                <div key={day} className={`p-1 rounded-full ${isToday ? 'bg-blue-600 text-white' : 'text-gray-700'}`}>
                  {day}
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Links / To-Do / Code */}
        <div className="mb-6 space-y-2 text-sm text-gray-700">
          <div className="flex items-center"><svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg> Links 0</div>
          <div className="flex items-center"><svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg> To-do 0/1</div>
          <div className="flex items-center"><svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg> Code 0</div>
        </div>

        {/* Tags */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">#features</span>
            <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">#hello</span>
            <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">#todo</span>
          </div>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Post Question Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            placeholder="Any thoughts..."
          ></textarea>
          <div className="flex justify-between items-center">
            <div className="flex space-x-3 text-gray-600">
              <button className="p-2 rounded-full hover:bg-gray-100"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path></svg></button>
              <button className="p-2 rounded-full hover:bg-gray-100"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></button>
              <button className="p-2 rounded-full hover:bg-gray-100"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101m-.757 4.898l-4 4"></path></svg></button>
              <button className="p-2 rounded-full hover:bg-gray-100"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg></button>
            </div>
            <div className="flex items-center space-x-3">
              <select className="border border-gray-300 rounded-md py-1 px-2 text-sm text-gray-700">
                <option>Private</option>
                <option>Public</option>
              </select>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                Save
              </button>
            </div>
          </div>
        </div>

        {/* Display Questions Section */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Memos</h1>
        <div className="space-y-6">
          {questions.map((question) => (
            <div key={question.id} className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2 text-gray-900">{question.title}</h2>
              <p className="text-gray-700 mb-4">{question.content}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Posted by {question.userId}</span>
                <span>{new Date(question.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 