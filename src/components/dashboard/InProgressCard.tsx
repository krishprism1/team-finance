import React from 'react'

const InProgressCard = () => {
  return (
    <div className="admin-token-vesting-container">
              <div className="token-vesting-column1">
                <h3>Admin token vestings</h3>
                <div className="token-section1">
                  <div className="svg-div">
                    <svg>
                      <path cx="56" cy="56" name="In progress" stroke="#37298D" fill="#37298D" focusable="false" d="M 107,56 A 51,51,0, 1,0, 106.99999999223226,56.00089011791847 L 88.99999999497382,56.00057595865313 A 33,33,0, 1,1, 89,56 Z" role="img" ></path>
                    </svg>
                  </div>
                  <div>
                    <p>In progress</p>
                    <span>1</span>
                    <p>Upcoming</p>
                    <span>0</span>
                  </div>
                  <div>
                    <p>Ended</p>
                    <span>0</span>
                  </div>
                </div>
              </div>
              <div className="token-vesting-column2">
                <a href="#">Manage vesting contracts <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="links-right-arrows" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg></a>
                <h4>Available vestings</h4>
                <div className="token-section2">
                  <div>
                    <p>wallet</p>
                    <span>0x6E61...5B38</span>
                  </div>
                  <div>
                    <p>Allocation</p>
                    <span>1000 CDS</span>
                  </div>
                  <div>
                    <p>Start date</p>
                    <span>10 Aug 2024</span>
                  </div>
                </div>
              </div>
            </div>
  )
}

export default InProgressCard
