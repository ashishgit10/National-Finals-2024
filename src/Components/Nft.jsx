import React from 'react';


export default function Nft({ data }) {
  return (
    <div
      className='!bg-transparent max-w-56 !rounded-xl'
    >
      <div className='bg-neutral-900 p-3 rounded-xl border border-cyan-300/40'>


        <div>
          <img srcSet={data} />
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
        <div className='bg-[#23f7dd] text-black px-4 mt-4 rounded-xl py-1 text-center w-[90%] m-auto' size="small">Unlock Reward</div>
      </div>
    </div>
  );
}

