import React from 'react'
import './ComissionList.css'

import home from '../../assest/home.png';
import downarrow from '../../assest/downarrow.png';
import PercentCard from '../../Components/PercentCard/PercentCard';

const ComissionList = () => {
    return (
        <>
            <div className="comission_list_container">
                <div className="comission_list_bar">
                    {/* <div className="list_home_icon"><img src={home} alt="" /></div> */}
                    <div className="comission_list_page">
                        <p>Admin Page</p>
                        <p className='active'>Comission List</p>
                    </div>
                </div>
                <div className="comission_list">
                    <div className="comission_percentwise">
                        <p>Select Comission Percentage wise</p>
                        <img src={downarrow} alt="" />
                    </div>


                    <div className="cards">
                        <PercentCard />
                    </div>




                    {/* <div className="view_more">
                    <p>View More</p>
                    <img src={downarrow} alt="" />
                </div> */}
                </div>
            </div>
        </>
    )
}

export default ComissionList