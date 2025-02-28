/**
 * @param {string[]} foods
 * @param {string[]} cuisines
 * @param {number[]} ratings
 */
var FoodRatings = function(foods, cuisines, ratings) {
    this.foods=[]
    for(let i=0;i<foods.length;i++){
        this.foods.push({
            name:foods[i],
            cuisine:cuisines[i],
            rating:ratings[i]
        })
    }
};

/** 
 * @param {string} food 
 * @param {number} newRating
 * @return {void}
 */
FoodRatings.prototype.changeRating = function(food, newRating) {
    this.foods.find(f=>f.name===food).rating=newRating
};

/** 
 * @param {string} cuisine
 * @return {string}
 */
FoodRatings.prototype.highestRated = function(cuisine) {
    const filtered=this.foods.filter(f=>f.cuisine===cuisine)
    // sort by rating and name
    filtered.sort((a,b)=>{
        if(a.rating===b.rating){
            return a.name.localeCompare(b.name)
        }
        return b.rating-a.rating
    })

    return filtered[0].name
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


// overtime
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

test(10000); //239ms