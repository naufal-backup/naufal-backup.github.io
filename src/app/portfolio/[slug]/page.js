import GameClient from './GameClient';

export function generateStaticParams() {
    return [
        { slug: 'project-a' },
        { slug: 'brutal-rush' },
    ];
}

export default async function GamePage({ params }) {
    const { slug } = await params;

    return <GameClient slug={slug} />;
}