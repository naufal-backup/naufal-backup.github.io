
export default function ThirdSection({ portfolioItems }) {
    const livePreviewItems = portfolioItems.filter(item => !item.url || !item.url.includes("github.com"));
    const githubItems = portfolioItems.filter(item => item.url && item.url.includes("github.com"));
    return (
            <section id="portfolio" className="min-h-screen py-12 px-6 md:px-12 bg-[#1f1f1f]">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
                        Portfolio
                    </h2>
                    {livePreviewItems.length > 0 && (
                        <div className="mb-16">
                            <h3 className="text-2xl md:text-3xl font-bold mb-12 text-center text-[#9ca3af]">
                                Live Preview
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {livePreviewItems.map((item) => (
                                    <a
                                        key={item.id}
                                        href={item.url || "#"}
                                        target={item.url ? "_blank" : "_self"}
                                        rel={item.url ? "noopener noreferrer" : ""}
                                        className="block group"
                                    >
                                        <div
                                            className="bg-[#2a2a2a] rounded-lg p-6 hover:bg-[#3a3a3a] transition-all duration-300 hover:transform hover:scale-105 cursor-pointer h-full"
                                        >
                                            <div className="aspect-video bg-[#3a3a3a] rounded-md mb-4 flex items-center justify-center text-4xl group-hover:bg-[#4a4a4a] transition-colors duration-300 overflow-hidden">
                                                {item.image ? (
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                    />
                                                ) : (
                                                    "📁"
                                                )}
                                            </div>
                                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                            <p className="text-sm text-[#9ca3af] mb-3">{item.category}</p>
                                            <p className="text-[#6b7280] text-sm">{item.description}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}

                    {githubItems.length > 0 && (
                        <div className="mb-12">
                            <h3 className="text-2xl md:text-3xl font-bold mb-12 text-center text-[#9ca3af]">
                                GitHub Repository
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {githubItems.map((item) => (
                                    <a
                                        key={item.id}
                                        href={item.url || "#"}
                                        target={item.url ? "_blank" : "_self"}
                                        rel={item.url ? "noopener noreferrer" : ""}
                                        className="block group"
                                    >
                                        <div
                                            className="bg-[#2a2a2a] rounded-lg p-6 hover:bg-[#3a3a3a] transition-all duration-300 hover:transform hover:scale-105 cursor-pointer h-full"
                                        >
                                            <div className="aspect-video bg-[#3a3a3a] rounded-md mb-4 flex items-center justify-center text-4xl group-hover:bg-[#4a4a4a] transition-colors duration-300 overflow-hidden">
                                                {item.image ? (
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                    />
                                                ) : (
                                                    "📁"
                                                )}
                                            </div>
                                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                            <p className="text-sm text-[#9ca3af] mb-3">{item.category}</p>
                                            <p className="text-[#6b7280] text-sm">{item.description}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
    );
}