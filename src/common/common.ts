/**
 * 统计日期数组中本周、本月和本年的日期数量
 * @param dateStrings 日期字符串数组，格式为 (new Date()).toLocaleString()
 * @returns 包含本周、本月和本年数量的对象
 */
export function countDatesInPeriods(dateStrings: string[]): {
    thisWeekCount: number;
    thisMonthCount: number;
    thisYearCount: number;
    thisDayCount: number;
} {
    // 获取当前日期
    const now = new Date();

    // 今日
    const todayStart = new Date(now.getTime());
    todayStart.setHours(0, 0, 0, 0)
    const todayEnd = new Date(now.getTime());
    todayEnd.setHours(23, 59, 59, 999);

    // 获取本周的开始日期（周一）和结束日期（周日）
    const currentWeekStart = new Date(now);
    currentWeekStart.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1)); // 调整为周一
    currentWeekStart.setHours(0, 0, 0, 0);

    const currentWeekEnd = new Date(currentWeekStart);
    currentWeekEnd.setDate(currentWeekStart.getDate() + 6);
    currentWeekEnd.setHours(23, 59, 59, 999);

    // 获取本月的开始和结束日期
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    currentMonthEnd.setHours(23, 59, 59, 999);

    // 获取本年的开始和结束日期
    const currentYearStart = new Date(now.getFullYear(), 0, 1);
    const currentYearEnd = new Date(now.getFullYear(), 11, 31);
    currentYearEnd.setHours(23, 59, 59, 999);

    let thisDayCount = 0;
    let thisWeekCount = 0;
    let thisMonthCount = 0;
    let thisYearCount = 0;

    dateStrings.forEach(dateStr => {
        // 尝试解析日期字符串
        let date: Date;

        // 尝试直接解析
        date = new Date(dateStr);

        // 如果解析失败，尝试处理常见的toLocaleString格式
        if (isNaN(date.getTime())) {
            // 尝试去除可能存在的星期几信息（如"2023/6/15 星期四 下午4:00:00"）
            const cleanedStr = dateStr.replace(/星期[一二三四五六日]/, '').trim();
            date = new Date(cleanedStr);

            // 如果仍然失败，跳过该日期
            if (isNaN(date.getTime())) {
                console.warn(`无法解析的日期字符串: ${dateStr}`);
                return;
            }
        }

        const timestamp = date.getTime();

        // 检查是否在本年
        if (timestamp >= currentYearStart.getTime() && timestamp <= currentYearEnd.getTime()) {
            thisYearCount++;

            // 检查是否在本月
            if (timestamp >= currentMonthStart.getTime() && timestamp <= currentMonthEnd.getTime()) {
                thisMonthCount++;

                // 检查是否在本周
                if (timestamp >= currentWeekStart.getTime() && timestamp <= currentWeekEnd.getTime()) {
                    thisWeekCount++;

                    // 是否在今日
                    if (timestamp >= todayStart.getTime() &&  timestamp <= todayEnd.getTime()) {
                        thisDayCount++;
                    }
                }
            }
        }
    });

    return { thisWeekCount, thisMonthCount, thisYearCount, thisDayCount };
}
