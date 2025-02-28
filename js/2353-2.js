var FoodRatings = function(foods, cuisines, ratings) {
    this.foods = {};
    this.cuisineData = {};

    for (let i = 0; i < foods.length; i++) {
        const food = foods[i];
        const cuisine = cuisines[i];
        const rating = ratings[i];
        this.foods[food] = { cuisine: cuisine, rating: rating };

        if (!this.cuisineData[cuisine]) {
            this.cuisineData[cuisine] = {
                maxRating: -Infinity,
                ratings: {}
            };
        }
        const cData = this.cuisineData[cuisine];

        if (!cData.ratings[rating]) {
            cData.ratings[rating] = { foods: [], sorted: true };
        }
        const ratingEntry = cData.ratings[rating];

        if (ratingEntry.foods.length === 0) {
            ratingEntry.foods.push(food);
        } else {
            const lastFood = ratingEntry.foods[ratingEntry.foods.length - 1];
            if (food.localeCompare(lastFood) >= 0) {
                ratingEntry.foods.push(food);
            } else {
                ratingEntry.foods.push(food);
                ratingEntry.sorted = false;
            }
        }

        if (rating > cData.maxRating) {
            cData.maxRating = rating;
        }
    }
};

FoodRatings.prototype.changeRating = function(food, newRating) {
    const foodInfo = this.foods[food];
    const oldRating = foodInfo.rating;
    if (oldRating === newRating) return;

    const cuisine = foodInfo.cuisine;
    const cData = this.cuisineData[cuisine];
    if (!cData) return;

    // Remove from old rating
    const oldEntry = cData.ratings[oldRating];
    if (oldEntry) {
        const index = oldEntry.foods.indexOf(food);
        if (index !== -1) {
            oldEntry.foods.splice(index, 1);
            if (oldEntry.foods.length === 0) {
                delete cData.ratings[oldRating];
                if (oldRating === cData.maxRating) {
                    const ratings = Object.keys(cData.ratings).map(Number);
                    cData.maxRating = ratings.length > 0 ? Math.max(...ratings) : -Infinity;
                }
            }
        }
    }

    // Update to new rating
    foodInfo.rating = newRating;

    if (!cData.ratings[newRating]) {
        cData.ratings[newRating] = { foods: [], sorted: true };
    }
    const newEntry = cData.ratings[newRating];

    if (newEntry.foods.length === 0) {
        newEntry.foods.push(food);
    } else {
        const lastFood = newEntry.foods[newEntry.foods.length - 1];
        if (food.localeCompare(lastFood) >= 0) {
            newEntry.foods.push(food);
        } else {
            newEntry.foods.push(food);
            newEntry.sorted = false;
        }
    }

    if (newRating > cData.maxRating) {
        cData.maxRating = newRating;
    }
};

FoodRatings.prototype.highestRated = function(cuisine) {
    const cData = this.cuisineData[cuisine];
    if (!cData || cData.maxRating === -Infinity) return "";
    const ratingEntry = cData.ratings[cData.maxRating];
    if (!ratingEntry || ratingEntry.foods.length === 0) return "";

    if (!ratingEntry.sorted) {
        ratingEntry.foods.sort((a, b) => a.localeCompare(b));
        ratingEntry.sorted = true;
    }

    return ratingEntry.foods[0];
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

test(10000); //44ms
