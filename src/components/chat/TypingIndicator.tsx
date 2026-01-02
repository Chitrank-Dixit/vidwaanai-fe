

export function TypingIndicator() {
    return (
        <div className="flex gap-3 mb-4">
            {/* Avatar Placeholder - Matches Assistant Avatar Style */}
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold ring-1 ring-primary/20">
                AI
            </div>

            {/* Bubble */}
            <div className="bg-surface-hover rounded-2xl rounded-tl-none px-4 py-3 flex gap-1 items-center shadow-sm border border-surface-hover">
                <div className="w-2 h-2 bg-text-tertiary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-text-tertiary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-text-tertiary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
        </div>
    );
}
