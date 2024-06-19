import { Audio } from 'react-loader-spinner';

export const LoadingSpinner = () => {
  return (
    <>
      <div className="z-20">
        <Audio type="Audio" color="green" height={80} width={80} />
      </div>
    </>
  );
};