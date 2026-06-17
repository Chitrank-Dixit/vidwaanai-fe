import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { HeroSection } from '../components/HomePage/HeroSection';
import { FeaturesGrid } from '../components/HomePage/FeaturesGrid';
import { KnowledgeGraphShowcase } from '../components/HomePage/KnowledgeGraphShowcase';
import { SuggestedPrompts } from '../components/HomePage/SuggestedPrompts';
import { ChatInputBox } from '../components/chat/ChatInputBox';

import { ThemeToggle } from '../components/ui/ThemeToggle';
import { Logo } from '../components/common/Logo';
import { Footer } from '../components/layout/Footer';

export const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/chat');
        }
    }, [isAuthenticated, navigate]);

    const handleSearch = (text: string) => {
        if (!text.trim()) return;
        navigate(`/chat?q=${encodeURIComponent(text)}`);
    };

    return (
        <div className="min-h-screen bg-background text-text-primary selection:bg-primary/30 flex flex-col justify-between">

            {/* Header */}
            <header className="relative h-[102px] bg-[#faf8f5] dark:bg-[#1c1814] flex items-center justify-between px-6 z-50 flex-shrink-0">
                {/* Decorative Background Image */}
                <div className="absolute inset-0 bg-[url('/assets/header-light.png')] dark:bg-[url('/assets/header-dark.png')] bg-[length:100%_100%] bg-no-repeat pointer-events-none z-0" />
                
                <div className="relative z-10 flex-1 flex items-center justify-between w-full pr-16 lg:pr-24">
                    <div className="flex items-center gap-2">
                        <Logo className="h-8 w-8 object-contain" />
                        <span className="text-xl font-display font-bold text-primary">Vidwaan</span>
                    </div>
                    
                    <div className="flex gap-4">
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            <main className="flex-grow">
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

            <Footer />
        </div>
    );
};

export default HomePage;
