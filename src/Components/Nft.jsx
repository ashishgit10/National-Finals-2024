import React from 'react';
import n1 from '/nft/n7.webp'

export default function Nft({ img }) {
  return (
    <div
      className='!bg-transparent max-w-56 !rounded-xl'
    >
      <div className='bg-neutral-900 p-3 rounded-xl border border-cyan-300/40'>


        <div>
          <img srcSet={img} />
        </div>
        {/*   <CardContent>
        <Typography className='text-white' gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography className='text-white' variant="body2" sx={{ }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent> */}
        <div className='hover:bg-[#23f7dd] bg-neutral-900 border hover:border-none text-white hover:text-black transition-all px-4 mt-4 rounded-lg py-1 text-center w-[90%] m-auto' size="small">Claim <span>🔒</span></div>
      </div>
    </div>
  );
}

