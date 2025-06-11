import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { axiosInstance } from '../api/axios';
import { API_ENDPOINTS } from '../api/endpoints';

export const Profile = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { questions } = useSelector((state: RootState) => state.questions);
  const { answers } = useSelector((state: RootState) => state.answers);

  const userQuestions = questions.filter(q => q.userId === user?.id);
  const userAnswers = answers.filter(a => a.userId === user?.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h1 className="text-3xl font-bold mb-4">Profile</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <p className="mt-1 text-lg">{user?.username}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-lg">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">My Questions</h2>
            <div className="space-y-4">
              {userQuestions.map(question => (
                <div key={question.id} className="border-b pb-4">
                  <h3 className="font-semibold">{question.title}</h3>
                  <p className="text-gray-600 text-sm">{question.content}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">My Answers</h2>
            <div className="space-y-4">
              {userAnswers.map(answer => (
                <div key={answer.id} className="border-b pb-4">
                  <p className="text-gray-600">{answer.content}</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <span className="mr-4">Votes: {answer.voteCount}</span>
                    <span>{answer.isVerified ? '✓ Verified' : ''}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 