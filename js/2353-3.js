var FoodRatings = function(foods, cuisines, ratings) {
    this.foodMap = {}; // Maps food to { cuisine, rating }
    this.cuisineMap = {}; // Maps cuisine to { ratingMap, maxRating }

    for (let i = 0; i < foods.length; i++) {
        const food = foods[i];
        const cuisine = cuisines[i];
        const rating = ratings[i];
        this.foodMap[food] = { cuisine, rating };

        if (!this.cuisineMap[cuisine]) {
            this.cuisineMap[cuisine] = {
                ratingMap: new Map(),
                maxRating: -Infinity
            };
        }
        const cuisineData = this.cuisineMap[cuisine];
        if (!cuisineData.ratingMap.has(rating)) {
            cuisineData.ratingMap.set(rating, []);
        }
        const ratingArray = cuisineData.ratingMap.get(rating);
        const insertIndex = this.findInsertionPoint(ratingArray, food);
        ratingArray.splice(insertIndex, 0, food);

        if (rating > cuisineData.maxRating) {
            cuisineData.maxRating = rating;
        }
    }
};

FoodRatings.prototype.findInsertionPoint = function(arr, target) {
    let low = 0, high = arr.length;
    while (low < high) {
        const mid = (low + high) >>> 1;
        if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    return low;
};

/** 
 * @param {string} food 
 * @param {number} newRating
 * @return {void}
 */
FoodRatings.prototype.changeRating = function(food, newRating) {
    const info = this.foodMap[food];
    const oldRating = info.rating;
    if (oldRating === newRating) return;

    const cuisine = info.cuisine;
    info.rating = newRating;

    const cuisineData = this.cuisineMap[cuisine];
    // Remove from old rating
    const oldRatingArray = cuisineData.ratingMap.get(oldRating);
    if (oldRatingArray) {
        const index = this.binarySearch(oldRatingArray, food);
        if (index !== -1) {
            oldRatingArray.splice(index, 1);
            if (oldRatingArray.length === 0) {
                cuisineData.ratingMap.delete(oldRating);
                if (oldRating === cuisineData.maxRating) {
                    let max = -Infinity;
                    for (const r of cuisineData.ratingMap.keys()) {
                        if (r > max) max = r;
                    }
                    cuisineData.maxRating = max !== -Infinity ? max : undefined;
                }
            }
        }
    }

    // Add to new rating
    if (!cuisineData.ratingMap.has(newRating)) {
        cuisineData.ratingMap.set(newRating, []);
    }
    const newRatingArray = cuisineData.ratingMap.get(newRating);
    const insertIndex = this.findInsertionPoint(newRatingArray, food);
    newRatingArray.splice(insertIndex, 0, food);

    // Update maxRating if new rating is higher or current max is undefined
    if (cuisineData.maxRating === undefined || newRating > cuisineData.maxRating) {
        cuisineData.maxRating = newRating;
    }
};

FoodRatings.prototype.binarySearch = function(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
};

/** 
 * @param {string} cuisine
 * @return {string}
 */
FoodRatings.prototype.highestRated = function(cuisine) {
    const cuisineData = this.cuisineMap[cuisine];
    if (!cuisineData || cuisineData.maxRating === undefined) return null;
    const maxRating = cuisineData.maxRating;
    const foods = cuisineData.ratingMap.get(maxRating);
    return foods && foods.length > 0 ? foods[0] : null;
};


// ["FoodRatings","highestRated","highestRated","changeRating","highestRated","changeRating","highestRated"]
// [[["kimchi","miso","sushi","moussaka","ramen","bulgogi"],["korean","japanese","japanese","greek","japanese","korean"],[9,12,8,15,14,7]],["korean"],["japanese"],["sushi",16],["japanese"],["ramen",16],["japanese"]]

const obj=new FoodRatings(["kimchi","miso","sushi","moussaka","ramen","bulgogi"],["korean","japanese","japanese","greek","japanese","korean"],[9,12,8,15,14,7])
console.log(obj.highestRated("korean"))
console.log(obj.highestRated("japanese"))
obj.changeRating("sushi",16)
console.log(obj.highestRated("japanese"))
obj.changeRating("ramen",16)
console.log(obj.highestRated("japanese"))

// kimchi
// ramen
// sushi
// ramen

// 大量数据测试，统计时间

let randomSeed = 0;
const random = () => {
    let x = Math.sin(randomSeed++) * 10000;
    return x - Math.floor(x);
};

const randomInt = (min, max) => {
    return Math.floor(random() * (max - min + 1)) + min;
};

const randomString = (length) => {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    let str = "";
    for (let i = 0; i < length; i++) {
        str += chars[randomInt(0, chars.length - 1)];
    }
    return str;
};

const randomData = (n) => {
    const foods = [];
    const cuisines = [];
    const ratings = [];
    for (let i = 0; i < n; i++) {
        foods.push(randomString(10));
        cuisines.push(randomString(10));
        ratings.push(randomInt(1, 100));
    }
    return [foods, cuisines, ratings];
};

const test = (n) => {
    const [foods, cuisines, ratings] = randomData(n);
    const obj = new FoodRatings(foods, cuisines, ratings);

    const start = Date.now();
    for (let i = 0; i < n; i++) {
        const food = foods[i];
        const rating = randomInt(1, 100);
        obj.changeRating(food, rating);
    }
    const end = Date.now();
    console.log(`n=${n}, time=${end - start}ms`);
};

test(1000000); //2906ms
