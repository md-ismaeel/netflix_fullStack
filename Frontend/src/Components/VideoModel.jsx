import ReactPlayer from 'react-player/lazy';

export const VideoModal = ({ videoKey, onClose }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="relative flex w-[100%] max-w-[800px] h-[80%] max-h-[600px] mt-40">
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videoKey}`}
                    className='absolute top-0 left-0 w-full h-full'
                    controls
                    playing
                />
                <button onClick={onClose} className="absolute top-0 right-28 text-white w-[30px] h-[30px] flex justify-center items-center hover:text-pink-700 hover:bg-black">X</button>
            </div>
        </div>
    );
};