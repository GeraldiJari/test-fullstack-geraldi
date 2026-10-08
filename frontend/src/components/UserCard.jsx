const UserCard = ({ user, index, onClick }) => {
    return (
        <button
            type="button"
            onClick={() => onClick(user)}
            className="group relative w-full overflow-hidden border border-zinc-700 bg-zinc-900 text-left transition-all duration-300 hover:-translate-y-1 hover:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
            {/* Decorative background */}
            <div className="absolute -right-12 -top-12 h-32 w-32 rotate-45 border border-zinc-700 transition-colors duration-300 group-hover:border-orange-400/50" />

            <div className="absolute bottom-0 right-0 h-1 w-24 bg-orange-500 transition-all duration-300 group-hover:w-full" />

            <div className="relative p-5">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-widest text-zinc-500">
                        #{String(index + 1).padStart(3, "0")}
                    </span>

                    <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Active
                    </span>
                </div>

                {/* Avatar */}
                <div className="mt-6 flex h-32 items-center justify-center border border-zinc-800 bg-zinc-950">
                    <div className="flex h-20 w-20 items-center justify-center border border-zinc-700 bg-zinc-900 font-mono text-2xl font-bold text-zinc-400 transition-colors group-hover:border-orange-400 group-hover:text-orange-400">
                        {user.name.charAt(0)}
                    </div>
                </div>

                {/* User information */}
                <div className="mt-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-orange-400">
                        Personnel
                    </p>

                    <h2 className="mt-1 truncate text-xl font-bold uppercase tracking-wide text-white">
                        {user.name}
                    </h2>

                    <p className="mt-2 truncate text-sm text-zinc-500">
                        {user.company.name}
                    </p>
                </div>

                {/* Footer */}
                <div className="mt-5 flex items-center justify-between border-t border-zinc-800 pt-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
                        {user.address.city}
                    </span>

                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 transition-colors group-hover:text-orange-400">
                        View Profile →
                    </span>
                </div>
            </div>
        </button>
    );
};

export default UserCard;