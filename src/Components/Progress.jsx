// CircularProgress.js
import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Progress = ({ percentage }) => {
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Simulate loading for 3 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer); // Clean up timer on unmount
  }, []);

  return (
    <>
      <div style={{ width: 150, height: 150 }}>
        {loading ? (
          // Render skeleton when loading
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Skeleton circle height={150} width={150} />
          </SkeletonTheme>
        ) : (
          // Render CircularProgressbar when not loading
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
        )}
      </div>
      {/* Optionally add a label or description */}
      {/* <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '16px', color: '#888' }}>
          Progress
      </div> */}
    </>
  );
};

export default Progress;
