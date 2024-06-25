import { DNA, RotatingLines } from 'react-loader-spinner';

export const LoadingSpinner = () => {
  return (
    <>
      <div className="z-20 flex justify-center items-center">
        <RotatingLines
          visible={true}
          height="25"
          width="25"
          color="white"
          outerCircleColor="white"
          innerCircleColor="white"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </>
  );
};

export const CirclesWithBarSpinner = () => {
  return (
    <>
      <div className='w-full flex justify-center'>
        <DNA
          visible={true}
          height="100"
          width="100"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    </>
  )
}