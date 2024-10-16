// CircularProgress.js
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Progress = ({ percentage }) => {
  return (<>
    <div style={{ width: 150, height: 150 }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          textColor: '#fff',
          pathColor: '#23f7dd',
          trailColor: '#d6d6d6',
          textSize: '20px',
          textAlign: 'center'
        })}
      />

    </div>
    {/*   <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '16px', color: '#888' }}>
        Progress
      </div> */}
  </>
  );
};

export default Progress;
