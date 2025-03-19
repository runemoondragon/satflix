import { NextResponse } from 'next/server';

const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:3001/api';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title');

    console.log('1. Received request for title:', title);
    console.log('2. BACKEND_API_URL:', BACKEND_API_URL);

    if (!title) {
        console.log('3. No title provided');
        return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    try {
        const backendUrl = `${BACKEND_API_URL}/movies?q=${encodeURIComponent(title)}`;
        console.log('4. Attempting to fetch from:', backendUrl);

        const backendResponse = await fetch(backendUrl, {
            headers: {
                'Accept': 'application/json'
            }
        });
        
        console.log('5. Backend response status:', backendResponse.status);
        
        if (!backendResponse.ok) {
            const errorText = await backendResponse.text();
            console.log('6. Backend error text:', errorText);
            throw new Error(`Backend API Error: ${backendResponse.status}`);
        }

        const movies = await backendResponse.json();
        console.log('7. Received movies array length:', Array.isArray(movies) ? movies.length : 'not an array');
        
        const movie = Array.isArray(movies) ?
            movies.find(m => m.title.toLowerCase() === title.toLowerCase()) : null;

        console.log('8. Found exact match:', movie ? 'yes' : 'no');

        if (!movie) {
            return NextResponse.json({ error: "Movie not found" }, { status: 404 });
        }

        const transformedMovie = {
            ...movie,
            thumbnailUrl: movie.thumbnailurl || movie.thumbnailUrl,
            backgroundUrl: movie.backgroundurl || movie.backgroundUrl,
            watchLink: movie.watchlink || movie.watchLink
        };

        console.log('9. Sending transformed movie');
        return NextResponse.json(transformedMovie);
    } catch (error) {
        console.log('10. Error:', error);
        return NextResponse.json({ error: "Failed to fetch movie" }, { status: 500 });
    }
}
