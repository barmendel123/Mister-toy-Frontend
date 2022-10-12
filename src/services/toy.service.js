// import { utilService } from '../services/util.service.js'
// import { storageService } from '../services/async-storage.service.js'
import { httpService } from '../services/http.service.js'

const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor"]
// const STORAGE_KEY = 'toy'
export const toyService = {
    query,
    getById,
    save,
    remove,
    getLabes
}

const BASE_URL = 'toy/'
const STORAGE_KEY = 'toys'
const gDefaulttoys = [
    {
        "_id": "t101",
        "name": "Running Doll",
        "price": 123,
        "labels": ["Doll", "Battery Powered", "Baby"],
        "createdAt": 1631031801011,
        "inStock": true,
        "img": 1
    },
    {
        "_id": "t102",
        "name": "Talking Doll",
        "price": 123,
        "labels": ["Doll", "Battery Powered", "Baby"],
        "createdAt": 1631031801011,
        "inStock": true,
        "img": 2
    },
    {
        "_id": "t103",
        "name": "Shouting Doll",
        "price": 123,
        "labels": ["Doll", "Battery Powered", "Baby"],
        "createdAt": 1631031801011,
        "inStock": true,
        "img": 3
    }
]

    async function query(filterBy) {
        // console.log('filterBy from front', filterBy);
        try{
            let queryParams = filterBy ?`?name=${filterBy.name || ''}&inStock=${filterBy.inStock || 'false'}&label=${filterBy.label || ''}&sortBy=${filterBy.sortBy || ''}`
                : ''
            const url = BASE_URL + queryParams
            return  httpService.get(url)
        } catch (err) {
            console.error('Error:')
        }
    }

    // return storageService.query(STORAGE_KEY).then(toys => {
        
    //     if (!toys || !toys.length) {
    //         storageService.postMany(STORAGE_KEY, gDefaulttoys)
    //         toys = gDefaulttoys
    //     }
    //     if (filterBy) {
    //         console.log('filterBy', filterBy);
           
    //         var { labels, maxPrice, minPrice, name, createdAt } = filterBy
    //         maxPrice = maxPrice || Infinity
    //         minPrice = minPrice || 0
    //         toys = toys.filter(toy => toy.name.toLowerCase().includes(name.toLowerCase()) && (toy.price < maxPrice) && (toy.price > minPrice)

    //         // && (toy.labels.every(lab => labels.includes(lab) ))
    //         )
    //         // console.log('toys', toys);    
    //         }
    //         return toys

    // })

    // }


async function getById(toyId) {
    try {
        return httpService.get(BASE_URL + toyId)
    } catch (err) {
        console.error('Error:')
    }
    // return storageService.get(STORAGE_KEY, toyId)
}

async function remove(toyId) {
    try {
        console.log(BASE_URL+toyId)
        return httpService.delete(BASE_URL+toyId)
    } catch (err) {
        console.error('Error:')
    }
    // return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    try {
        console.log(toy)
        if (toy._id) {
            return httpService.put(BASE_URL + toy._id, toy)
        } else {
    
            return httpService.post(BASE_URL, toy)
        }
    } catch (err) {
        console.error('Error:')
    }

    // console.log(toy)
    // if (toy._id) {
    //     return storageService.put(STORAGE_KEY, toy)
    // } else {
    //     // when switching to backend - remove the next line
    //     // toy.owner = userService.getLoggedinUser()
    //     return storageService.post(STORAGE_KEY, toy)
    // }
}
function getLabes() {
    return labels
}

// function getEmptyToy() {
//     return {
//         vendor: 'Susita-' + (Date.now() % 1000),
//         price: utilService.getRandomIntInclusive(1000, 9000),
//     }
// }

