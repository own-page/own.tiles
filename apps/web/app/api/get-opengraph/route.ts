import { type NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

/**
 * API endpoint to extract OpenGraph data from a URL
 *
 * @param req - The Next.js request object
 * @returns JSON with image URL and title
 */
export async function GET(req: NextRequest) {
  try {
    // Get URL from query parameter
    const url = req.nextUrl.searchParams.get('url');

    if (!url) {
      return NextResponse.json(
        { error: 'URL parameter is required' },
        { status: 400 }
      );
    }

    // Fetch the HTML content
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; OwnPageBot/1.0; +https://own.page)'
      }
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch URL: ${response.status}` },
        { status: 502 }
      );
    }

    const html = await response.text();

    // Parse HTML with cheerio
    const $ = cheerio.load(html);

    // Extract OpenGraph data
    const result: { imageUrl?: string; title?: string; date?: string } = {};

    // Get title (in priority order)
    const title =
      $('meta[property="og:title"]').attr('content') ||
      $('meta[name="og:title"]').attr('content') ||
      $('meta[property="twitter:title"]').attr('content') ||
      $('title').text() ||
      '';

    if (title) {
      result.title = title.trim();
    }

    // Try to find event date (common in event pages)
    const eventDate =
      $('meta[property="event:start_time"]').attr('content') ||
      $('time').attr('datetime') ||
      '';

    if (eventDate) {
      result.date = eventDate;
    }

    // Try to find OpenGraph image tags in priority order
    const ogImage =
      $('meta[property="og:image"]').attr('content') ||
      $('meta[name="og:image"]').attr('content') ||
      $('meta[property="og:image:url"]').attr('content') ||
      $('meta[name="twitter:image"]').attr('content') ||
      $('meta[name="twitter:image:src"]').attr('content');

    if (ogImage) {
      // If URL is relative, convert to absolute
      result.imageUrl = new URL(ogImage, url).toString();
    } else {
      // Fallback to look for the first large image
      const images = $('img')
        .map((_, img) => {
          const src = $(img).attr('src');
          const width = parseInt($(img).attr('width') || '0', 10);
          const height = parseInt($(img).attr('height') || '0', 10);

          if (src && (width > 200 || height > 200)) {
            return new URL(src, url).toString();
          }
          return null;
        })
        .get()
        .filter(Boolean);

      if (images.length > 0) {
        result.imageUrl = images[0];
      }
    }

    if (Object.keys(result).length === 0) {
      return NextResponse.json({ error: 'No metadata found' }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error extracting OpenGraph data:', error);
    return NextResponse.json(
      { error: 'Failed to extract data' },
      { status: 500 }
    );
  }
}
