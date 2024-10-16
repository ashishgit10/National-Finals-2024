import React, { useState, useEffect } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import n1 from '/nft/n7.webp';

export default function Nft({ img }) {
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Simulate loading for 3 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer); // Clean up timer on unmount
  }, []);

  return (
    <div className='!bg-transparent max-w-56 !rounded-xl'>
      <div className='bg-neutral-900 p-3 rounded-xl border border-cyan-300/40'>
        {loading ? (
          // Render skeleton when loading
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Skeleton height={150} width={150} />
          </SkeletonTheme>
        ) : (
          <div>
            <img srcSet={img} alt="NFT" />
          </div>
        )}

        {/* Uncomment if you want to add content below the image */}
        {/* <CardContent>
          <Typography className='text-white' gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography className='text-white' variant="body2" sx={{ }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent> */}

        <div className='hover:bg-[#23f7dd] bg-neutral-900 border hover:border-none text-white hover:text-black transition-all px-4 mt-4 rounded-lg py-1 text-center w-[90%] m-auto' size="small">
          Claim <span>🔒</span>
        </div>
      </div>
    </div>
  );
}
