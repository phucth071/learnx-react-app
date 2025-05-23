import { useEffect, useState, useRef } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import SubmissionHeader from '../components/SubmissionHeader';
import QuizzHeader from '../components/QuizzHeader';
import CourseService from '@/services/courses/course.service.js';
import Loader from './Loader';
import { useParams, useNavigate } from 'react-router-dom';
import Lecture from './LectureComponent';
import Resource from './ResourceComponent';
import ModuleService from '@/services/modules/module.service.js';
import CourseSidebar from './CourseSidebar.jsx';
import { useAuth } from '@hooks/useAuth.js';
import { parseJavaLocalDateTime } from '@/utils/date.js';

const CourseContent = () => {
    const [expandedSections, setExpandedSections] = useState([]);
    const [modules, setModules] = useState([]);
    const [moduleData, setModuleData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const moduleRefs = useRef({});
    const { courseId } = useParams();
    const navigate = useNavigate();
    const { authUser } = useAuth();

    useEffect(() => {
        const fetchModules = async () => {
            setIsLoading(true);
            try {
                const response = await CourseService.getModulesByCourseId(courseId);
                setModules(response);
            } catch (err) {
                console.error('Failed to fetch modules:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchModules();
    }, [courseId]);

    const fetchModuleContents = async (moduleId) => {
        try {
            const [lectures, resources, assignments, quizzes] = await Promise.all([
                ModuleService.getLecturesByModuleId(moduleId),
                ModuleService.getResourcesByModuleId(moduleId),
                ModuleService.getAssignmentsByModuleId(moduleId),
                ModuleService.getQuizzesByModuleId(moduleId),
            ]);

            const allContents = [
                ...(lectures || []).map((item) => ({ ...item, type: 'lecture' })),
                ...(resources || []).map((item) => ({ ...item, type: 'resource' })),
                ...(assignments || []).map((item) => ({ ...item, type: 'assignment' })),
                ...(quizzes || []).map((item) => ({ ...item, type: 'quiz' })),
            ];

            const sortedContents = allContents.sort((a, b) => {
                const dateA = parseJavaLocalDateTime(a.createdAt);
                const dateB = parseJavaLocalDateTime(b.createdAt);
                return dateA - dateB;
            });

            return sortedContents;
        } catch (error) {
            console.error(`Failed to fetch module contents: ${error}`);
            return [];
        }
    };

    const toggleSection = async (module) => {
        if (expandedSections.includes(module.id)) {
            setExpandedSections((prev) => prev.filter((id) => id !== module.id));
        } else {
            setExpandedSections((prev) => [...prev, module.id]);

            if (!moduleData[module.id]) {
                const contents = await fetchModuleContents(module.id);
                setModuleData((prev) => ({
                    ...prev,
                    [module.id]: contents,
                }));
            }

        }
    };

    const scrollToModule = (moduleId) => {
        const element = moduleRefs.current[moduleId];
        if (element) {
            const offset = -120;
            const bodyTop = document.body.getBoundingClientRect().top;
            const elemTop = element.getBoundingClientRect().top;
            const position = elemTop - bodyTop + offset;

            window.scrollTo({ top: position, behavior: 'smooth' });
        }
    };

    const expandAll = () => setExpandedSections(modules.map((m) => m.id));
    const collapseAll = () => setExpandedSections([]);

    return (
        <div className="flex">
            <CourseSidebar
                modules={modules}
                expandedSections={expandedSections}
                toggleSection={toggleSection}
                scrollToModule={scrollToModule}
                expandAll={expandAll}
                collapseAll={collapseAll}
            />

            <div className="flex-1 px-4 flex flex-col gap-2">
                {authUser?.role === 'TEACHER' && (
                    <div className="flex justify-end">
                        <button
                            onClick={() => navigate(`/course-detail/${courseId}/edit`)}
                            className="py-2 px-4 bg-primaryDark text-white rounded-lg hover:bg-secondary transition-colors">
                            Chỉnh sửa
                        </button>
                    </div>
                )}

                <Loader isLoading={isLoading} />

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {modules.map((module) => (
                        <div
                            key={module.id}
                            ref={(el) => (moduleRefs.current[module.id] = el)}
                            className="border-b last:border-b-0">
                            <button
                                onClick={() => toggleSection(module)}
                                className="w-full px-4 py-2 bg-blue-50 flex justify-between items-center hover:bg-opacity-80 focus:outline-none">
                                <span className="text-base font-semibold text-slate-600">
                                    {module.name}
                                </span>
                                {expandedSections.includes(module.id) ? (
                                    <ChevronDown className="h-5 w-5 text-slate-400" />
                                ) : (
                                    <ChevronRight className="h-5 w-5 text-slate-400" />
                                )}
                            </button>

                            {expandedSections.includes(module.id) && (
                                <div className="px-4 pb-2">
                                    {module.description && <p>{module.description}</p>}
                                    {moduleData[module.id]?.map((item) => {
                                        switch (item.type) {
                                            case 'lecture':
                                                return (
                                                    <Lecture
                                                        key={item.id}
                                                        name={item.title}
                                                        content={item.content}
                                                    />
                                                );
                                            case 'resource': {
                                                const ext = item.urlDocument?.split('.').pop();
                                                const type = ['pdf', 'ppt', 'xlsx'].includes(ext) ? ext : 'word';
                                                return (
                                                    <Resource
                                                        key={item.id}
                                                        type={type}
                                                        title={item.title}
                                                        link={item.urlDocument}
                                                    />
                                                );
                                            }
                                            case 'assignment':
                                                return (
                                                    <SubmissionHeader
                                                        key={item.id}
                                                        courseID={courseId}
                                                        id={item.id}
                                                        title={item.title}
                                                        startDate={item.startDate}
                                                        endDate={item.endDate}
                                                    />
                                                );
                                            case 'quiz':
                                                return (
                                                    <QuizzHeader
                                                        key={item.id}
                                                        courseID={courseId}
                                                        id={item.id}
                                                        title={item.title}
                                                        startDate={item.startDate}
                                                        endDate={item.endDate}
                                                    />
                                                );
                                            default:
                                                return null;
                                        }
                                    })}

                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CourseContent;
