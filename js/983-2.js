/**
 * @param {number[]} days
 * @param {number[]} costs
 * @return {number}
 */
var mincostTickets = function(days, costs) {
    const n = days.length;
    const dp = new Array(days[n - 1] + 1).fill(0);
    const daySet = new Set(days);

    for (let i = 1; i <= days[n - 1]; i++) {
        if (!daySet.has(i)) {
            dp[i] = dp[i - 1];
        } else {
            dp[i] = Math.min(
                dp[Math.max(0, i - 1)] + costs[0],
                dp[Math.max(0, i - 7)] + costs[1],
                dp[Math.max(0, i - 30)] + costs[2]
            );
        }
    }

    return dp[days[n - 1]];
};

// 示例测试
let days = [1, 4, 6, 7, 8, 20];
let costs = [2, 7, 15];
console.log(mincostTickets(days, costs)); // 输出应为11