// Use Got library to make async HTTP requests to fetch data from WordPress REST API
// npm install got
import got from 'got';

// Define URL for WordPress REST API endpoint
const dataURL = "https://dev-srjc-f2025-cs-55-13.pantheonsite.io/wp-json/wp/v2/console";

// Returns an array of objects with params containing console IDs, used for dynamic routing in Next.js
export async function getAllIds() {
    let jsonString;
    try {
        // Fetch all consoles from WordPress REST API asynchronously
        jsonString = await got(dataURL);
        console.log(jsonString.body);
    } catch (error) {
        console.error(error);
        return [];
    }
    
    // Parse the JSON response from WordPress REST API
    // jsonObject is an array of console objects from WordPress, each containing id, title, date, and ACF fields
    const jsonObject = JSON.parse(jsonString.body);

    // Return an array of objects, each with a `params` property containing an `id` string.
    // This is used by Next.js dynamic routing to generate paths for each console.
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


// Return consoles from WordPress REST API, sorted by title and normalized for display
export async function getSortedList() {
    let jsonString;
    try {
        // Fetch all consoles from WordPress REST API asynchronously
        jsonString = await got(dataURL);
        console.log(jsonString.body);
    } catch (error) {
        console.error(error);
        return [];
    }
    
    // Parse the JSON response from WordPress REST API into a JavaScript array of console objects
    const jsonObject = JSON.parse(jsonString.body);

    // Sort consoles by title using locale-aware string comparison
    jsonObject.sort(function(a, b){
        return a.title.rendered.localeCompare(b.title.rendered);
    }); 
    
    // Normalize and shape the objects returned to the rest of the app
    return jsonObject.map(item =>{
        return{
            id: item.id.toString(),
            title: item.title.rendered,
            manufacturer: item.acf.manufacturer,
            model: item.acf.model,
            release_year: item.acf.release_year,
            years_owned: item.acf.years_owned,
            console_review: item.acf.console_review,
            date: item.date ? item.date.split(' ')[0] : ''
        }
    });
}
// The getData function retrieves a single console object from WordPress REST API by matching the given id.
// If a console with the specified id is found, it returns the console object; otherwise, it returns a default "Not Found" object.
export async function getData (id) {
    let jsonString;
    try {
        // Fetch all consoles from WordPress REST API asynchronously
        // Note: This fetches all consoles and filters by id. For better performance, consider using a direct endpoint like `${dataURL}/${id}`
        jsonString = await got(dataURL);
        console.log(jsonString.body);
    } catch (error) {
        console.error(error);
        return {
            id: id,
            title: 'Not Found',
            manufacturer: '',
            model: '',
            release_year: '',   
            years_owned: '',
            console_review: '',
            date: ''
        };
    }

    // Parse the JSON response from WordPress REST API
    const jsonObject = JSON.parse(jsonString.body);

    // Filter the array to find the console matching the given id
    const objReturned = jsonObject.filter(obj => {
        return obj.id.toString() === id;
    });
    
    if (objReturned.length === 0) {
        return {
            id: id,
            title: 'Not Found',
            manufacturer: '',
            model: '',
            release_year: '',
            years_owned: '',
            console_review: '',
            date: ''
        }
    } else {
        // Normalize the WordPress response
        return {
            id: objReturned[0].id.toString(),
            title: objReturned[0].title.rendered || 'Not Found',
            date: objReturned[0].date ? objReturned[0].date.split(' ')[0] : '', // Extract date portion (YYYY-MM-DD)
            manufacturer: objReturned[0].acf.manufacturer,
            model: objReturned[0].acf.model,
            release_year: objReturned[0].acf.release_year,
            years_owned: objReturned[0].acf.years_owned,
            console_review: objReturned[0].acf.console_review
        };
    }
}
