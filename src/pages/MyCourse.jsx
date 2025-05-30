import { useEffect, useState } from 'react';
import Header from '@layout/Header';
import Footer from '@layout/Footer.jsx';
import CourseCard from '../components/CourseCard';
import CourseFilter from '../components/CourseFilter';
import Navbar from '@layout/NavBar.jsx';
import CourseService from '../services/courses/course.service';
import { useAuth } from '@hooks/useAuth.js';
import DocumentTitle from '@components/DocumentTitle';
import Loader from '../components/Loader';
import { Pagination } from '@mui/material';
import { useTranslation } from 'react-i18next';

const MyCourse = () => {
    const { authUser } = useAuth();

    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();
    const pageSize = 12;
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        setIsLoading(true);
        const pageable = {
            page,
            size: pageSize,
        };

        const fetchCourses = async () => {
            try {
                const res = await CourseService.getMyCourses(authUser.role, pageable);

                setCourses(res.content);
                setPage(res.number);
                setTotalPages(res.totalPages);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourses();
    }, [authUser.role, page, pageSize]);

    const handlePageChange = (event, value) => {
        setPage(value - 1);
    };

    return (
        <div className="flex flex-col min-h-[calc(100vh-217px)] m-4">
            <DocumentTitle title="Khóa học của tôi" />
            <div className="flex-grow p-3 rounded-lg bg-white shadow-sm">
                <div className='flex justify-end'>
                    <CourseFilter />
                </div>
                {!(courses.length > 0) && <div className="text-center justify-center">Bạn chưa đăng ký khóa học nào!</div>}
                <div className="grid grid-cols-4 gap-4 mt-4">
                    {Array.isArray(courses) &&
                        courses.length > 0 &&
                        courses.map((course) => (
                            <CourseCard
                                key={course.id}
                                id={course.id}
                                name={course.name}
                                description={course.description}
                                thumbnail={course.thumbnail}
                            />
                        ))}
                </div>
            </div>
            <Pagination
                count={totalPages}
                page={page + 1}
                color="primaryDark"
                className="flex justify-center mt-2"
                onChange={handlePageChange}
            />
        </div>
    );
};
export default MyCourse;
