import { useState, useEffect, useRef } from "react";
import { MovieCard } from "../../Components/MovieCard";
import { useDispatch, useSelector } from "react-redux";
import { setSearchInput } from "../../Redux/Slices/movieSlice";
import { getRequestOptions } from "../../utils/endPoints";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "../SearchResults/SearchResults.css"
import { CirclesWithBarSpinner } from "../../Components/Loader";

export const SearchResults = () => {
    const inputRef = useRef(null);
    const { searchInput } = useSelector((state) => state.movieSlice);
    console.log(searchInput);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);

    const performSearch = async (pageNum = 1) => {
        const inputValue = inputRef.current.value.trim();
        if (!inputValue) return;

        setIsLoading(true);

        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/search/multi?query=${inputValue}&page=${pageNum}`,
                getRequestOptions
            );

            if (pageNum === 1) {
                dispatch(setSearchInput(response.data.results));
            } else {
                dispatch(setSearchInput([...searchInput, ...response.data.results]));
            }

            setTotalPages(response.data.total_pages);
            setPage(pageNum);
        } catch (error) {
            console.error("Error performing search:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = () => {
        setPage(1);
        performSearch(1);
    };

    useEffect(() => {
        function handleScroll() {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 && !isLoading && page < totalPages) {
                performSearch(page + 1);
            }
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);

    }, [isLoading, page, totalPages]);

    return (
        <>
            <div className="search w-full min-h-[150px] flex justify-center items-start pt-24 text-white">
                <input
                    type="text"
                    ref={inputRef}
                    placeholder="Enter Movies Name"
                    className="input-sec w-1/2 h-12 bg-slate-700 rounded-md px-10"
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button
                    onClick={handleSearch}
                    className="btn-sec h-12 bg-pink-700 px-8 rounded-md font-semibold ml-6"
                >
                    Search
                </button>
            </div>

            <div className="w-full flex flex-col justify-center py-4 px-6 mt-6">
                {inputRef.current?.value && (
                    <div className="w-full flex justify-between items-center mt-4 mb-1 px-3">
                        <h1 className="w-full text-2xl text-white">
                            Search results for "{inputRef.current.value}"
                        </h1>
                    </div>
                )}

                <div className="w-full min-h-screen flex flex-wrap justify-start items-center">
                    {isLoading && page === 1 ? (
                        <CirclesWithBarSpinner />
                    ) : (
                        <div className="card-box w-full flex flex-wrap justify-between items-center">
                            {searchInput && searchInput.length > 0 ? (
                                searchInput.map((item) => (
                                    <NavLink key={item.id} to={`/movie/${item.id}`} className="">
                                        <MovieCard item={item} />
                                    </NavLink>
                                ))
                            ) : (
                                <div className="text-3xl to-white">No results found!!</div>
                            )}
                        </div>
                    )}
                    {isLoading && page > 1 && <div className="text-3xl to-white">Loading more results...</div>}
                    {page >= totalPages && searchInput && searchInput.length > 0 && (
                        <div className="text-3xl to-white">No more results to load!!</div>
                    )}
                </div>
            </div>
        </>
    );
};
