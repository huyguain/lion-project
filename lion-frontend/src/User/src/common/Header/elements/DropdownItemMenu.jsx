import React, { Component } from 'react';
import DropdownCoursesMenu from './DropdownCoursesMenu';

class DropdownItemMenu extends Component {
    render() {
        const { learningPath, courseIds, _id } = this.props.item;
        const { history } = this.props
        return (
            <li className='item-menu'>
                <div className='item-info'>
                    <b className='menu-left'></b>
                    <span className='menu-title'>{learningPath}</span>
                    <span className='menu-arrow'>&#10095;</span>
                    <div className='arrow-right'></div>
                </div>
                <div className='dropdown-submenu'>
                    <div className='menu-category'>
                        <p>Courses</p>
                    </div>
                    <div className="scrollbar" id="style-scrollbar">
                        <ul className='submenu-list'>
                            {
                                courseIds.map(course =>
                                    <DropdownCoursesMenu
                                        history={history}
                                        learningPath={learningPath}
                                        course={course}
                                        key={courseIds._id}
                                        idPath={_id}
                                        change={JSON.stringify(courseIds)}
                                    />
                                )
                            }
                        </ul>
                    </div>
                </div>
            </li>
        )
    }
}
export default DropdownItemMenu;