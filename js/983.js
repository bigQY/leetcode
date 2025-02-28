/**
 * @param {number[]} days
 * @param {number[]} costs
 * @return {number}
 */
var mincostTickets = function(days, costs) {
    let minCost = Infinity;
    const avgCost = [costs[0]/1, costs[1]/7, costs[2]/30];
    const minAvgCost = Math.min(...avgCost);
    const toNextDay=(currentDay, totalCost,currentIndex)=>{
        if (currentIndex > days.length-1 || currentIndex == -1) {
            minCost = Math.min(minCost, totalCost);
            return;
        }
        // 判断当前天是否需要出行
        if(days.includes(currentDay)) {
            //选择买1天的票
            let cost1 = costs[0];
            let nextDay1 = currentDay + 1;
            toNextDay(nextDay1, totalCost + cost1, currentIndex+1);
            //选择买7天的票
            let cost7 = costs[1];
            let nextDay7 = currentDay + 7;
            nextDaysIndex = days.findIndex((day)=>day>=nextDay7);
            toNextDay(nextDay7, totalCost + cost7,nextDaysIndex);
            //选择买30天的票
            let cost30 = costs[2];
            let nextDay30 = currentDay + 30;
            nextDaysIndex = days.findIndex((day)=>day>=nextDay30);
            toNextDay(nextDay30, totalCost + cost30,nextDaysIndex);
        } else {
            // 跳转到下一个需要出行的天
            toNextDay(days[currentIndex], totalCost, currentIndex);
        }
    }
    toNextDay(days[0], 0, 0);
    return minCost;
};

// let days = [1,2,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,20,21,24,25,27,28,29,30,31,34,37,38,39,41,43,44,45,47,48,49,54,57,60,62,63,66,69,70,72,74,76,78,80,81,82,83,84,85,88,89,91,93,94,97,99]
// let costs = [9,38,134]

let days = [1,4,6,7,8,20]
let costs = [2,7,15]
console.log(mincostTickets(days, costs))