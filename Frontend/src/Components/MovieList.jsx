import { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'
import ReactSimplyCarousel from 'react-simply-carousel';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { MovieCard } from './MovieCard'

export const MovieList = ({ title, movies }) => {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false)

    return (
        <>
            <div className=''>
                {/* {movies.map((item) => <MovieCard title={title} item={item} />)} */}
                <h1 className='text-white text-2xl font-semibold ml-10'>{title}</h1>
                <div className="w-full ">

                    <div className='w-full relative'>
                        <ReactSimplyCarousel
                            activeSlideIndex={activeSlideIndex}
                            onRequestChange={setActiveSlideIndex}
                            itemsToShow={1}
                            itemsToScroll={1}
                            forwardBtnProps={{

                                style: {
                                    position: 'absolute',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'start',
                                    background: 'black',
                                    border: 'none',
                                    borderRadius: '50%',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontSize: '20px',
                                    height: 30,
                                    lineHeight: 1,
                                    textAlign: 'center',
                                    width: 30,
                                    right: '20px',
                                    top: '147px',
                                    zIndex: '1'

                                },
                                children: <span>{<FaLongArrowAltRight />}</span>,
                            }}
                            backwardBtnProps={{

                                style: {
                                    position: 'absolute',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                    background: 'black',
                                    border: 'none',
                                    borderRadius: '50%',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontSize: '20px',
                                    height: 30,
                                    lineHeight: 1,
                                    textAlign: 'center',
                                    width: 30,
                                    left: '20px',
                                    zIndex: '1',
                                    top: '147px'

                                },
                                children: <span>{<FaLongArrowAltLeft />}</span>,
                            }}
                            responsiveProps={[
                                {
                                    itemsToShow: 5,
                                    itemsToScroll: 2,
                                    minWidth: 768,
                                },
                            ]}
                            speed={400}
                            easing="linear"
                        >
                            {isLoading ? (
                                <Skeleton count={5} height={200} width={150} />
                            ) : (
                                movies.map((item) => (
                                    <div key={item.id} className='w-full h-[500px] px-2'>
                                        <NavLink to={`/movie/${item.id}`} className='w-1/4 h-40'>
                                            <MovieCard item={item} />
                                        </NavLink>
                                    </div>
                                )))}

                        </ReactSimplyCarousel>
                    </div>

                </div>
            </div>
        </>
    )
}

