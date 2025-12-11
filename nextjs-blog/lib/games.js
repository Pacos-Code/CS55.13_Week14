// Use Got library to make async HTTP requests to fetch data from WordPress REST API
// npm install got
import got from 'got';

// Define URLs for WordPress REST API endpoints
const dataURL = "https://dev-srjc-f2025-cs-55-13.pantheonsite.io/wp-json/wp/v2/video-game";
const mediaBaseUrl = "https://dev-srjc-f2025-cs-55-13.pantheonsite.io/wp-json/wp/v2/media";

// Resolve media ID to source URL from WP REST API
export const getMediaUrl = async (imageId) => {
    if (!imageId) return '';
    try {
      const res = await got(`${mediaBaseUrl}/${imageId}`);
      const media = JSON.parse(res.body);
      return media.source_url || '';
    } catch (err) {
      console.error('media fetch error', err);
      return '';
    }
};

// Returns an array of objects with params containing game IDs, used for dynamic routing in Next.js
export async function getAllIds() {
    let jsonString;
    try {
        // Fetch all games from WordPress REST API asynchronously
        jsonString = await got(dataURL);
        console.log(jsonString.body);
    } catch (error) {
        console.error(error);
        return [];
    }
    
    // Parse the JSON response from WordPress REST API
    // jsonObject is an array of game objects from WordPress, each containing id, title, date, and ACF fields
    const jsonObject = JSON.parse(jsonString.body);

    // Return an array of objects, each with a `params` property containing an `id` string.
    // This is used by Next.js dynamic routing to generate paths for each game.
    // For example, if WordPress returns [{id: 1}, {id: 2}], the result will be:
    // [ { params: { id: "1" } }, { params: { id: "2" } } ]
    return jsonObject.map(item => {
        return {
            params: {
                id: item.id.toString()
          }
        }
      });
}


// Return games from WordPress REST API, sorted by title and normalized for display
export async function getSortedList() {
    let jsonString;
    try {
        // Fetch all games from WordPress REST API asynchronously
        jsonString = await got(dataURL);
        console.log(jsonString.body);
    } catch (error) {
        console.error(error);
        return [];
    }
    
    // Parse the JSON response from WordPress REST API into a JavaScript array of game objects
    const jsonObject = JSON.parse(jsonString.body);

    // Sort games by title using locale-aware string comparison
    jsonObject.sort(function(a, b){
        return a.title.rendered.localeCompare(b.title.rendered);
    }); 
    
    // Normalize and shape the objects returned to the rest of the app, resolving image URLs
    // Each game's cover image URL is fetched asynchronously from the WordPress media endpoint
    const mapped = await Promise.all(jsonObject.map(async (item) => {
        const image_id = item.acf.game_cover;
        const image_url = await getMediaUrl(image_id);
        return{
            id: item.id.toString(),
            title: item.title.rendered,
            game_title: item.acf.title,
            developer: item.acf.developer,
            release_year: item.acf.release_date,
            genre: item.acf.genre,
            game_review: item.acf.review,
            image_id,
            image_url,
            date: item.date ? item.date.split(' ')[0] : ''
        }
    }));
    return mapped;
}
// The getData function retrieves a single game object from WordPress REST API by matching the given id.
// If a game with the specified id is found, it returns the game object; otherwise, it returns a default "Not Found" object.
export async function getData (id) {
    let jsonString;
    try {
        // Fetch all games from WordPress REST API asynchronously
        // Note: This fetches all games and filters by id. For better performance, consider using a direct endpoint like `${dataURL}/${id}`
        jsonString = await got(dataURL);
        console.log(jsonString.body);
    } catch (error) {
        console.error(error);
        return {
            id: id,
            title: 'Not Found',
            game_title: '',
            developer: '',
            release_year: '',   
            genre: '',
            game_review: '',
            image_id: '',
            image_url: '',
            date: ''
        };
    }

    // Parse the JSON response from WordPress REST API
    const jsonObject = JSON.parse(jsonString.body);

    // Filter the array to find the game matching the given id
    const objReturned = jsonObject.filter(obj => {
        return obj.id.toString() === id;
    });
    
    if (objReturned.length === 0) {
        return {
            id: id,
            title: 'Not Found',
            game_title: '',
            developer: '',
            release_year: '',
            genre: '',
            game_review: '',
            image_id: '',
            image_url: '',
            date: ''
        }
    } else {
        // Normalize the WordPress response and resolve the image URL
        const image_id = objReturned[0].acf.game_cover;
        const image_url = await getMediaUrl(image_id);
        return {
            id: objReturned[0].id.toString(),
            title: objReturned[0].title.rendered || 'Not Found',
            date: objReturned[0].date ? objReturned[0].date.split(' ')[0] : '', // Extract date portion (YYYY-MM-DD)
            game_title: objReturned[0].acf.title,
            developer: objReturned[0].acf.developer,
            release_year: objReturned[0].acf.release_date,
            genre: objReturned[0].acf.genre,
            game_review: objReturned[0].acf.review,
            image_id,
            image_url
        };
    }
}