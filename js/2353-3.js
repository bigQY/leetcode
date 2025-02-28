var FoodRatings = function(foods, cuisines, ratings) {
    this.foods = {}; // 存储食物信息：{ cuisine, rating }
    this.cuisineMap = {}; // 按菜系组织食物，结构为 { sortedRatings: 降序评分数组, foodsMap: { 评分: 升序食物数组 } }

    for (let i = 0; i < foods.length; i++) {
        const name = foods[i], cuisine = cuisines[i], rating = ratings[i];
        this.foods[name] = { cuisine, rating };

        // 初始化菜系结构
        if (!this.cuisineMap[cuisine]) {
            this.cuisineMap[cuisine] = { sortedRatings: [], foodsMap: {} };
        }
        const c = this.cuisineMap[cuisine];

        // 插入评分到sortedRatings的正确位置（降序）
        if (!c.foodsMap[rating]) {
            let idx = 0;
            while (idx < c.sortedRatings.length && c.sortedRatings[idx] > rating) idx++;
            if (c.sortedRatings[idx] !== rating) {
                c.sortedRatings.splice(idx, 0, rating);
            }
            c.foodsMap[rating] = [];
        }

        // 插入食物到对应评级的正确位置（升序）
        const arr = c.foodsMap[rating];
        let pos = 0;
        while (pos < arr.length && arr[pos].localeCompare(name) < 0) pos++;
        arr.splice(pos, 0, name);
    }
};

FoodRatings.prototype.changeRating = function(food, newRating) {
    const info = this.foods[food];
    if (!info || info.rating === newRating) return;

    const oldRating = info.rating;
    const cuisine = info.cuisine;
    const c = this.cuisineMap[cuisine];
    if (!c) return;

    // 从旧评分中移除食物
    const oldArr = c.foodsMap[oldRating];
    const idx = oldArr.indexOf(food);
    if (idx !== -1) {
        oldArr.splice(idx, 1);
        if (oldArr.length === 0) {
            delete c.foodsMap[oldRating];
            // 从sortedRatings中移除旧评分
            const rIdx = c.sortedRatings.indexOf(oldRating);
            if (rIdx !== -1) c.sortedRatings.splice(rIdx, 1);
        }
    }

    // 更新食物评分
    info.rating = newRating;

    // 插入到新评分
    if (!c.foodsMap[newRating]) {
        // 插入评分到sortedRatings
        let insertIdx = 0;
        while (insertIdx < c.sortedRatings.length && c.sortedRatings[insertIdx] > newRating) insertIdx++;
        c.sortedRatings.splice(insertIdx, 0, newRating);
        c.foodsMap[newRating] = [];
    }

    // 插入食物到新评级的正确位置
    const newArr = c.foodsMap[newRating];
    let pos = 0;
    while (pos < newArr.length && newArr[pos].localeCompare(food) < 0) pos++;
    newArr.splice(pos, 0, food);
};

FoodRatings.prototype.highestRated = function(cuisine) {
    const c = this.cuisineMap[cuisine];
    if (!c) return "";

    // 遍历sortedRatings找到第一个存在的食物数组
    for (const r of c.sortedRatings) {
        const arr = c.foodsMap[r];
        if (arr && arr.length > 0) return arr[0];
    }
    return "";
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
