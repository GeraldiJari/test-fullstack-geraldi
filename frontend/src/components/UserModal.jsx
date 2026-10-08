import { useEffect } from "react";

const UserModal = ({ user, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [onClose]);

    if (!user) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/85 p-4 backdrop-blur-md"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <div
                className="relative flex h-[calc(100vh-5rem)] w-full max-w-4xl flex-col overflow-hidden border border-zinc-700 bg-[#111111] shadow-2xl shadow-black/80"
                onMouseDown={(event) => event.stopPropagation()}
            >
                {/* Top accent */}
                <div className="absolute left-0 top-0 h-1 w-full bg-orange-500" />

                {/* Decorative corner */}
                <div className="absolute right-0 top-0 h-24 w-24 border-b border-l border-orange-400/20" />

                {/* Header */}
                <header className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
                    <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-orange-400">
                            RI // Personnel Database
                        </p>

                        <p className="mt-1 font-mono text-xs uppercase tracking-widest text-zinc-600">
                            Personnel Dossier // #
                            {String(user.id).padStart(3, "0")}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="group flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-zinc-500 transition hover:text-orange-400"
                    >
                        Close
                        <span className="border border-zinc-800 px-2 py-1 transition group-hover:border-orange-400">
                            ×
                        </span>
                    </button>
                </header>

                {/* Main content */}
                <div className="grid md:grid-cols-[42%_58%]">
                    {/* Visual */}
                    <div className="relative min-h-0 overflow-hidden border-b border-zinc-800 bg-[#0a0a0a] md:border-b-0 md:border-r">
                        {/* Geometric decorations */}
                        <div className="absolute left-5 top-5 z-10 font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-600">
                            Personnel Visual
                        </div>

                        <div className="absolute right-5 top-5 z-10 font-mono text-xs text-orange-400">
                            0{user.id}
                        </div>

                        {/* Background geometry */}
                        <div className="absolute -right-20 top-20 h-44 w-44 rotate-45 border border-zinc-800" />

                        <div className="absolute -left-24 bottom-10 h-72 w-72 rotate-12 border border-zinc-900" />

                        {/* Identity */}
                        <div className="relative flex h-full items-center justify-center">
                            <div className="relative flex h-44 w-44 items-center justify-center border border-zinc-700 bg-zinc-950">
                                <div className="absolute inset-4 border border-zinc-800" />

                                <span className="relative font-mono text-8xl font-black text-zinc-800">
                                    {user.name.charAt(0)}
                                </span>

                                <div className="absolute bottom-4 left-4 font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-600">
                                    ID // {String(user.id).padStart(3, "0")}
                                </div>
                            </div>
                        </div>

                        {/* Bottom status */}
                        <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between border-t border-zinc-800 pt-3">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-600">
                                Data Provided by JSONPlaceholder
                            </span>

                            <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-emerald-400">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                Active
                            </span>
                        </div>
                    </div>

                    {/* Information */}
                    <div className="min-h-0 p-6">
                        {/* Name */}
                        <div>
                            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-orange-400">
                                Identification
                            </p>

                            <h2 className="mt-2 text-3xl font-black uppercase leading-none tracking-tight text-white">
                                {user.name}
                            </h2>

                            <p className="mt-3 text-sm text-zinc-500">
                                {user.email}
                            </p>
                        </div>

                        {/* Information grid */}
                        <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-1">
                            <Info
                                label="City"
                                value={user.address.city}
                            />

                            <Info
                                label="Zip Code"
                                value={user.address.zipcode}
                            />

                            <Info
                                label="Street"
                                value={user.address.street}
                            />

                            <Info
                                label="Suite"
                                value={user.address.suite}
                            />

                            <Info
                                label="Company"
                                value={user.company.name}
                            />

                            <Info
                                label="Phone"
                                value={user.phone}
                            />
                        </div>

                        {/* Organization */}
                        <div className="mt-1 border-t border-zinc-800 pt-6">
                            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-orange-400">
                                Organization Profile
                            </p>

                            <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-zinc-300">
                                {user.company.name}
                            </p>

                            <p className="mt-1 text-xs leading-relaxed text-zinc-600">
                                {user.company.catchPhrase}
                            </p>
                        </div>

                        {/* Website */}
                        <div className="mt-1 flex items-end justify-between border-t border-zinc-800 pt-5">
                            <div>
                                <p className="font-mono text-[9px] uppercase tracking-widest text-zinc-600">
                                    Website
                                </p>

                                <p className="mt-1 text-sm text-zinc-300">
                                    {user.website}
                                </p>
                            </div>

                            <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-700">
                                RECORD VERIFIED
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="flex items-center justify-between border-t border-zinc-800 bg-[#0d0d0d] px-6 py-3">
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-700">
                        Personnel Management Interface
                    </span>

                    <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-600">
                        SYSTEM // ONLINE
                    </span>
                </footer>
            </div>
        </div>
    );
};

const Info = ({ label, value }) => {
    return (
        <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                {label}
            </p>

            <p className="mt-1.5 truncate text-sm text-zinc-300">
                {value}
            </p>
        </div>
    );
};

export default UserModal;