import { useState, useEffect, useRef } from "react";
import { MovieCard } from "../../Components/MovieCard";
import { useDispatch, useSelector } from "react-redux";
import { setSearchInput } from "../../Redux/Slices/movieSlice";
import axios from "axios";
import { getRequestOptions } from "../../utils/endPoints";
import { NavLink } from "react-router-dom";

export const SearchResults = () => {
    const inputRef = useRef(null);
    const { searchInput } = useSelector((state) => state.movieSlice);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(null);

    const performSearch = async (pageNum = 1) => {
        const inputValue = inputRef.current.value.trim();
        if (!inputValue) return;

        setIsLoading(true);
        setError(null);

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
            setHasMore(pageNum < response.data.total_pages);
            setPage(pageNum);
        } catch (error) {
            console.error("Error performing search:", error);
            setError("An error occurred while searching. Please try again.");
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
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - 100 &&
                !isLoading &&
                hasMore
            ) {
                performSearch(page + 1);
            }
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isLoading, hasMore, page]);

    return (
        <>
            <div className="w-full min-h-screen flex justify-center items-start pt-32 text-white">
                <input
                    type="text"
                    ref={inputRef}
                    placeholder="Enter Movies Name"
                    className="w-1/2 h-12 bg-slate-700 rounded-md px-10"
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
                <button
                    onClick={handleSearch}
                    className="h-12 bg-pink-700 px-8 rounded-md font-semibold ml-6"
                >
                    Search
                </button>
            </div>

            <div className="w-full flex flex-col justify-center py-4 px-6 mt-20">
                {inputRef.current?.value && (
                    <div className="w-full flex justify-between items-center mt-4 mb-1 px-3">
                        <h1 className="w-full text-2xl text-white">
                            Search results for "{inputRef.current.value}"
                        </h1>
                    </div>
                )}

                <div className="w-full min-h-screen flex flex-wrap justify-start items-center">
                    {error ? (
                        <div className="text-red-500">{error}</div>
                    ) : isLoading && page === 1 ? (
                        <div>Loading.....</div>
                    ) : (
                        <div className="w-full flex flex-wrap justify-start items-center gap-11">
                            {searchInput.length > 0 ? (
                                searchInput.map((item) => (
                                    <NavLink
                                        key={item.id}
                                        to={`/movie/${item.id}`}
                                        className="w-1/6 flex"
                                    >
                                        <MovieCard item={item} />
                                    </NavLink>
                                ))
                            ) : (
                                <div>No results found.</div>
                            )}
                        </div>
                    )}
                    {isLoading && page > 1 && <div>Loading more results...</div>}
                    {!hasMore && searchInput.length > 0 && (
                        <div>No more results to load.</div>
                    )}
                </div>
            </div>
        </>
    );
};
