import { useMemo, useState } from "react";
import UserCard from "./components/UserCard";
import UserModal from "./components/UserModal";
import useUsers from "./hooks/useUsers";
import { playSelectSound } from "./utils/uiSound";

const USERS_PER_PAGE = 4;

function App() {
    const { users, loading, error } = useUsers();

    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredUsers = useMemo(() => {
        const keyword = search.toLowerCase().trim();

        if (!keyword) {
            return users;
        }

        return users.filter((user) => {
            return (
                user.name.toLowerCase().includes(keyword) ||
                user.email.toLowerCase().includes(keyword) ||
                user.company.name.toLowerCase().includes(keyword)
            );
        });
    }, [users, search]);

    const totalPages = Math.ceil(
        filteredUsers.length / USERS_PER_PAGE
    );

    const currentUsers = useMemo(() => {
        const startIndex =
            (currentPage - 1) * USERS_PER_PAGE;

        return filteredUsers.slice(
            startIndex,
            startIndex + USERS_PER_PAGE
        );
    }, [filteredUsers, currentPage]);

    const handleSearch = (event) => {
        setSearch(event.target.value);
        setCurrentPage(1);
    };

    const handleUserClick = (user) => {
        playSelectSound();
        setSelectedUser(user);
    };

    const goToPage = (page) => {
        if (page < 1 || page > totalPages) {
            return;
        }

        setCurrentPage(page);
    };

    return (
        <main className="min-h-screen bg-[#0b0b0b] text-white">
            {/* Header */}
            <header className="border-b border-zinc-800">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                    <div>
                        <p className="font-mono text-xs tracking-[0.3em] text-orange-400">
                            RI // PERSONNEL DATABASE
                        </p>

                        <h1 className="mt-1 text-2xl font-bold uppercase tracking-wider">
                            Personnel
                        </h1>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-500">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        System Online
                    </div>
                </div>
            </header>

            {/* Content */}
            <section className="mx-auto max-w-7xl px-6 py-5">
                {/* Title */}
                <div className="mb-2">
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-600">
                        Database / Personnel
                    </p>

                    <div className="mt-2 flex items-end justify-between">
                        <div>
                            <h2 className="text-3xl font-bold uppercase">
                                User Directory
                            </h2>

                            <p className="mt-2 text-sm text-zinc-500">
                                Personnel records and identification data.
                            </p>
                        </div>

                        <span className="font-mono text-xs text-zinc-600">
                            RECORDS // {filteredUsers.length} / {users.length}
                        </span>
                    </div>
                </div>

                {/* Search */}
                <div className="mb-8">
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        placeholder="SEARCH PERSONNEL..."
                        className="w-full border border-zinc-800 bg-zinc-950 px-5 py-4 font-mono text-sm uppercase tracking-wider text-white outline-none placeholder:text-zinc-700 focus:border-orange-400"
                    />
                </div>

                {/* Loading */}
                {loading && (
                    <div className="border border-zinc-800 bg-zinc-950 px-6 py-12 text-center">
                        <p className="font-mono text-sm uppercase tracking-widest text-orange-400">
                            Loading Personnel Data...
                        </p>
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="border border-red-900 bg-red-950/20 px-6 py-12 text-center">
                        <p className="font-mono text-sm uppercase tracking-widest text-red-400">
                            Failed to load personnel data
                        </p>

                        <p className="mt-2 text-sm text-zinc-500">
                            {error}
                        </p>
                    </div>
                )}

                {/* Empty */}
                {!loading &&
                    !error &&
                    filteredUsers.length === 0 && (
                        <div className="border border-zinc-800 bg-zinc-950 px-6 py-12 text-center">
                            <p className="font-mono text-sm uppercase tracking-widest text-zinc-500">
                                No personnel found
                            </p>
                        </div>
                    )}

                {/* Cards */}
                {!loading &&
                    !error &&
                    filteredUsers.length > 0 && (
                        <>
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                                {currentUsers.map((user, index) => {
                                    const globalIndex =
                                        (currentPage - 1) *
                                            USERS_PER_PAGE +
                                        index;

                                    return (
                                        <UserCard
                                            key={user.id}
                                            user={user}
                                            index={globalIndex}
                                            onClick={handleUserClick}
                                        />
                                    );
                                })}
                            </div>

                            {/* Pagination */}
                            <div className="mt-8 flex items-center justify-between border-t border-zinc-800 pt-5">
                                <p className="font-mono text-xs uppercase tracking-widest text-zinc-600">
                                    Page{" "}
                                    <span className="text-zinc-300">
                                        {currentPage}
                                    </span>{" "}
                                    / {totalPages}
                                </p>

                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            goToPage(
                                                currentPage - 1
                                            )
                                        }
                                        disabled={currentPage === 1}
                                        className="border border-zinc-800 px-4 py-2 font-mono text-xs uppercase tracking-widest text-zinc-500 transition hover:border-orange-400 hover:text-orange-400 disabled:cursor-not-allowed disabled:opacity-30"
                                    >
                                        ← Prev
                                    </button>

                                    {Array.from(
                                        { length: totalPages },
                                        (_, index) => index + 1
                                    ).map((page) => (
                                        <button
                                            key={page}
                                            type="button"
                                            onClick={() =>
                                                goToPage(page)
                                            }
                                            className={`h-9 w-9 border font-mono text-xs transition ${
                                                currentPage === page
                                                    ? "border-orange-400 bg-orange-400 text-black"
                                                    : "border-zinc-800 text-zinc-500 hover:border-orange-400 hover:text-orange-400"
                                            }`}
                                        >
                                            {String(page).padStart(
                                                2,
                                                "0"
                                            )}
                                        </button>
                                    ))}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            goToPage(
                                                currentPage + 1
                                            )
                                        }
                                        disabled={
                                            currentPage === totalPages
                                        }
                                        className="border border-zinc-800 px-4 py-2 font-mono text-xs uppercase tracking-widest text-zinc-500 transition hover:border-orange-400 hover:text-orange-400 disabled:cursor-not-allowed disabled:opacity-30"
                                    >
                                        Next →
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
            </section>
            {selectedUser && (
                <UserModal
                    user={selectedUser}
                    onClose={() => setSelectedUser(null)}
                />
            )}
        </main>
    );
}

export default App;