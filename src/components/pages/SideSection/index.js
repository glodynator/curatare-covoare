import React from 'react';

import SubscriptionSection from './SubscriptionSection';
import ReservationSection from './ReservationSection';
import CommentsSection from './CommentsSection';

export default function SideSection() {
    return (
        <div className='col-12 col-lg-4'>
            <div className='page-aside'>
                <ReservationSection/>
                <SubscriptionSection/>
                {/*<CommentsSection/>*/}
            </div>
        </div>
    );
}