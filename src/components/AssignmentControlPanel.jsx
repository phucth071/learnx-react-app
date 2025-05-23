import { useEffect, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react'
import { axiosPrivate } from '@/axios/axios.js';
import { toast } from 'react-toastify';
import SubmissionHeader from '@components/SubmissionHeader.jsx';
import { t } from 'i18next';
export default function AssignmentControlPanel() {
  let [timeFilter, setTimeFilter] = useState('7')
  let [sortBy, setSortBy] = useState('Sắp xếp theo ngày')
  let [searchQuery, setSearchQuery] = useState('')

  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      const urlParams = new URLSearchParams();
      const date = new Date();
      urlParams.append('day', timeFilter);
      urlParams.append('month', (date.getMonth() + 1).toString());
      urlParams.append('year', date.getFullYear().toString());
      const url = `/assignments/get-by-next-x-day?${urlParams.toString()}`;
      await axiosPrivate.get(`${url}`)
        .then((res) => {
          setAssignments(res.data.data);
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
          toast(err.response.data.message, { type: 'error' });
        });
    }

    fetchAssignments();
  }, [timeFilter]);

  return (
    <div className="bg-white m-4 px-6 py-2  rounded-md">
      <h2 className="text-lg font-semibold text-slate-800 mb-2">{t('time')}</h2>
      <div className="flex flex-wrap gap-4">
        <div className="relative">
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="appearance-none bg-white border border-slate-400 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:ring-1 focus:ring-primaryDark focus:border-primaryDark"
          >
            <option value="7">7 ngày tiếp theo</option>
            <option value="30">30 ngày tiếp theo</option>

          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
        </div>


        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search by activity type or name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-400 rounded-md py-2 pl-10 pr-3 text-sm leading-5 focus:outline-none focus:ring-1 focus:ring-primaryDark focus:border-primaryDark"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
        </div>
      </div>

      {assignments.map((assignment) => (
        <SubmissionHeader courseID={assignment.courseId} key={assignment.id} id={assignment.id} title={`${assignment.courseName} - ${assignment.title}`} startDate={assignment.startDate} endDate={assignment.endDate} />
      ))}

    </div>
  )
}
