import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Collapse, IconButton } from '@mui/material';
import { ExpandMore, ExpandLess, School, Menu, ChevronLeft } from '@mui/icons-material';
import PropTypes from 'prop-types';

const CourseSidebar = ({ modules, expandedSections, toggleSection, scrollToModule, expandAll, collapseAll }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={` p-2 transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-8'} bg-gray-200 h-screen overflow-y-auto relative`}>
            <IconButton
                onClick={toggleSidebar}
                className="absolute top-0 right-2 "
                size="small"
            >
                {isOpen ? <ChevronLeft /> : <Menu />}
            </IconButton>
            {isOpen && (
                <div className={`${isOpen ? '' : 'hidden'} bg-slate-200 rounded-lg`}>
                    <div className="flex justify-evenly">
                        <button className=" w-full bg-[#02a189] text-white px-4 py-2 rounded-lg mr-1  hover:bg-[#14919B] transition-colors"
                            onClick={expandAll}>
                            Mở rộng
                        </button>
                        <button className="w-full  bg-[#02a189] text-white px-4 py-2 rounded-lg ml-1 hover:bg-[#14919B] transition-colors"
                            onClick={collapseAll}>
                            Thu nhỏ
                        </button>
                    </div>
                    <List component="nav">
                        {modules.map((module) => (
                            <React.Fragment key={module.id}>
                                <ListItem
                                    button={true}
                                    onClick={() => {
                                        toggleSection(module);
                                        scrollToModule(module.id);
                                    }}
                                >
                                    <ListItemIcon>
                                        <School />
                                    </ListItemIcon>
                                    <ListItemText primary={module.name} />
                                    {expandedSections.includes(module.id) ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                <Collapse in={expandedSections.includes(module.id)} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {module.lectures && module.lectures.map((lecture) => (
                                            <ListItem button key={lecture.id} className="pl-8">
                                                <ListItemText primary={lecture.name} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Collapse>
                            </React.Fragment>
                        ))}
                    </List>
                </div>
            )}
            {!isOpen && (
                <div className="flex flex-col items-center pt-16">
                    {modules.map((module) => (
                        <IconButton
                            key={module.id}
                            onClick={() => {
                                toggleSection(module);
                                scrollToModule(module.id);
                            }}
                            className="my-2"
                        >
                            <School />
                        </IconButton>
                    ))}
                </div>
            )}
        </div>
    );
};

CourseSidebar.propTypes = {
    modules: PropTypes.array.isRequired,
    expandedSections: PropTypes.array.isRequired,
    toggleSection: PropTypes.func.isRequired,
    scrollToModule: PropTypes.func.isRequired,
    expandAll: PropTypes.func.isRequired,
    collapseAll: PropTypes.func.isRequired,
}

export default CourseSidebar;

