import { Button } from '@/components/common/Button';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-full bg-cream">
            {/* Hero Section */}
            <section className="relative bg-cream py-20 px-6 text-center text-charcoal overflow-hidden border-b border-silver/30">
                <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-pulse-ring"></div>
                <div className="relative z-10 max-w-4xl mx-auto space-y-6">
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white border-2 border-gold shadow-lg mb-8">
                        <Sparkles className="h-12 w-12 text-saffron" />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-saffron drop-shadow-sm tracking-tight">
                        Vidwaan AI
                    </h1>
                    <p className="text-xl md:text-2xl font-light text-charcoal/80 max-w-2xl mx-auto font-body leading-relaxed">
                        Your <span className="text-saffron font-medium">Vedic Wisdom</span> Agent. Explore the depths of Indian scripture with modern AI.
                    </p>
                    <div className="pt-8 flex justify-center gap-4">
                        <Button size="lg" onClick={() => navigate('/chat')} className="bg-saffron hover:bg-saffron/90 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all px-8 py-3 text-lg">
                            Start Chat
                        </Button>
                        <Button variant="outline" size="lg" className="border-saffron text-saffron hover:bg-saffron/10 px-8 py-3 text-lg">
                            Explore Scriptures
                        </Button>
                    </div>
                </div>
            </section>

            {/* Daily Wisdom Section */}
            <section className="py-16 px-6 max-w-5xl mx-auto w-full">
                <div className="text-center mb-12">
                    <span className="text-saffron font-bold tracking-widest uppercase text-sm">Daily Wisdom</span>
                    <h2 className="text-3xl font-display text-charcoal mt-2">Verse of the Day</h2>
                    <div className="h-1 w-20 bg-saffron mx-auto mt-4 rounded-full"></div>
                </div>

                <div className="bg-white rounded-xl p-10 shadow-xl border-l-4 border-l-saffron relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <svg width="120" height="120" viewBox="0 0 100 100" className="text-saffron fill-current">
                            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" />
                        </svg>
                    </div>
                    <blockquote className="text-center space-y-6 relative z-10">
                        <p className="text-2xl md:text-3xl font-serif italic text-petal leading-relaxed">
                            "Karmanye vadhikaraste Ma Phaleshu Kadachana, <br />
                            Ma Karma Phala Hetur Bhur Ma Te Sangostva Akarmani."
                        </p>
                        <footer className="text-charcoal/70 font-medium font-body">
                            — Bhagavad Gita, Chapter 2, Verse 47
                        </footer>
                    </blockquote>
                </div>
            </section>

            {/* Categories Placeholder */}
            <section className="bg-cream/50 py-16 px-6 border-t border-silver/30">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-display text-center mb-12 text-charcoal">Explore Sacred Texts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {['Bhagavad Gita', 'Vedas', 'Upanishads'].map((item) => (
                            <div key={item} className="bg-white p-8 rounded-lg shadow-sm border border-silver/50 hover:shadow-md hover:border-saffron/50 transition-all cursor-pointer group text-center">
                                <h3 className="text-xl font-bold text-charcoal group-hover:text-saffron transition-colors mb-2">{item}</h3>
                                <p className="text-charcoal/60 text-sm">Discover ancient wisdom and teachings.</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
