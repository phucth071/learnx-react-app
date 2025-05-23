import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import PropTypes from 'prop-types';

export default function SubmissionHeader({ courseID, id, title, startDate, endDate }) {
    const formattedStartDate = format(new Date(startDate), "EEEE, dd 'tháng' MM yyyy, hh:mm a", { locale: vi });
    const formattedEndDate = format(new Date(endDate), "EEEE, dd 'tháng' MM yyyy, hh:mm a", { locale: vi });

    return (
        <div className="flex items-start gap-4 border-t py-1 border-slate-400">
            {/* Icon */}
            <div className="text-pink-500 mt-1 text-xl">
                <i className="fa-solid fa-file-arrow-up text-2xl"></i>
            </div>

            {/* Content */}
            <div className="flex-1">
                <h2 className="text-blue-600 text-sm font-bold hover:text-blue-700 cursor-pointer ">
                    <a href={`/submission/${courseID}/${id}`}>{title}</a>
                </h2>
                <div className="text-sm text-gray-600">
                    <div className="flex gap-1">
                        <span className="font-medium">Opened:</span>
                        <span>{formattedStartDate}</span>
                    </div>
                    <div className="flex gap-1">
                        <span className="font-medium">Due:</span>
                        <span>{formattedEndDate}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}


