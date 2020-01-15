import React, { Component } from 'react';

import DropdownItemMenu from './DropdownItemMenu';

class DropdownMenu extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { listMenus, history } = this.props;
        return (
            <div className="dropdown-header1">
                {/* <button className='dropbtn' onClick={() => this.props.history.push('/course')}> */}
                <button className='dropbtn'>
                    <div className="nav-title1">
                        Learning Path
                            <i className="fa fa-bars"></i>
                    </div>
                </button>
                <div className='drop-menu-content'>
                    <div className='menu-category'>
                        <p onClick={() => history.push('/course')}>
                            Category
                        </p>
                    </div>
                    <ul className='drop-menu-list'>
                        {
                            listMenus.map(item =>
                                <DropdownItemMenu
                                    history={history}
                                    key={item._id}
                                    item={item}
                                    change={JSON.stringify(item)}
                                />
                            )
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default DropdownMenu;