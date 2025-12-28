import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroSection } from '../components/HomePage/HeroSection';
import { FeaturesGrid } from '../components/HomePage/FeaturesGrid';
import { KnowledgeGraphShowcase } from '../components/HomePage/KnowledgeGraphShowcase';
import { SuggestedPrompts } from '../components/HomePage/SuggestedPrompts';
import { ChatInputBox } from '../components/chat/ChatInputBox';

export const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const handleSearch = (text: string) => {
        if (!text.trim()) return;
        navigate(`/chat?q=${encodeURIComponent(text)}`);
    };

    return (
        <div className="min-h-screen bg-background text-text-primary selection:bg-primary/30">

            {/* Header Placeholder - To be replaced with real header */}
            <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50">
                <div className="text-xl font-bold tracking-tight">Vidwaan AI</div>
                <div className="flex gap-4">
                    {/* Add language/menu later */}
                </div>
            </header>

            <main>
                <HeroSection>
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-6 tracking-tight">
                            Ask <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-DEFAULT to-secondary">Vedwaan</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-text-secondary font-light max-w-2xl mx-auto">
                            Explore ancient wisdom through modern AI insights.
                        </p>
                    </div>

                    <div className="w-full max-w-2xl mx-auto space-y-8">
                        <ChatInputBox
                            onSubmit={handleSearch}
                            placeholder="Ask anything about Vedic wisdom..."
                            size="large"
                        />

                        <SuggestedPrompts
                            prompts={[
                                "What is Dharma?",
                                "Relationship between Rama and Krishna",
                                "Meaning of Karma",
                                "Explain the concept of Atman"
                            ]}
                        />
                    </div>
                </HeroSection>

                <FeaturesGrid />

                <KnowledgeGraphShowcase />
            </main>

            {/* Simple Footer */}
            <footer className="py-8 border-t border-text-tertiary/10 text-center text-text-tertiary text-sm">
                <p>© 2024 Vidwaan AI. Preserving Knowledge.</p>
            </footer>
        </div>
    );
};

export default HomePage;
