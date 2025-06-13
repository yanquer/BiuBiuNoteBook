
import {FC, useEffect, useState} from 'react';
import {Flex, Grid, Text} from "@radix-ui/themes";
import {AIconButton} from "./a-icon-button.tsx";
import {ChevronLeftIcon, ChevronRightIcon} from "@radix-ui/react-icons";
import classNames from "classnames";
import {ACard} from "@yanquer/browser";
import {BiuManager} from "../manager/biu-manager.ts";


interface CalendarProps {
    initialDate?: Date;
    initSelectData?: Date[];
    onDateSelect?: (date: Date) => void;
}

const Calendar_: FC<CalendarProps> = ({ initialDate = new Date(), onDateSelect, initSelectData }) => {
    const [currentDate, setCurrentDate] = useState<Date>(initialDate);
    const [selectedDate, setSelectedDate] = useState<Date[] | undefined>(initSelectData);

    useEffect(() => {
        setSelectedDate(initSelectData)
    }, [initSelectData]);

    // 获取月份
    const getDaysInMonth = (year: number, month: number): number => {
        return new Date(year, month + 1, 0).getDate();
    };

    // 获取天
    const getFirstDayOfMonth = (year: number, month: number): number => {
        return new Date(year, month, 1).getDay();
    };

    const handleDateClick = (date: Date): void => {
        // 暂时取消手动选中
        return

        // // @ts-ignore
        // setSelectedDate(date);
        onDateSelect?.(date);
    };

    const goToPreviousMonth = (): void => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const goToNextMonth = (): void => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const renderHeader = (): JSX.Element => {
        const monthNames = [
            '一月', '二月', '三月', '四月', '五月', '六月',
            '七月', '八月', '九月', '十月', '十一月', '十二月'
        ];

        return (
            <Flex
                align={"center"}
                justify={"center"}
                gap={"2"}
            >
                <AIconButton className={""}>
                    <ChevronLeftIcon onClick={goToPreviousMonth}/>
                </AIconButton>
                <h2>
                    <Text size={"1"}>
                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </Text>
                </h2>
                <AIconButton className={""}>
                    <ChevronRightIcon onClick={goToNextMonth} />
                </AIconButton>
            </Flex>
        );
    };

    const renderDays = (): JSX.Element => {
        const dayNames = ['日', '一', '二', '三', '四', '五', '六'];
        return (
            <Grid columns={"7"}
                  gap={"2"}
            >
                {dayNames.map((day) => (
                    <Flex key={day} justify={"center"} align={"center"}>
                        <Text size={"1"}>{day}</Text>
                    </Flex>
                ))}
            </Grid>
        );
    };

    const renderCells = (): JSX.Element => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDayOfMonth = getFirstDayOfMonth(year, month);

        const cells = [];
        let day = 1;

        // 创建空白格子，直到月份的第一天
        for (let i = 0; i < firstDayOfMonth; i++) {
            cells.push(<div key={`empty-${i}`} className="empty-cell"></div>);
        }

        // 创建日期格子
        for (let i = firstDayOfMonth; i < 42; i++) {
            if (day > daysInMonth) {
                cells.push(<div key={`empty-${i}`} className="empty-cell"></div>);
                continue;
            }

            const date = new Date(year, month, day);
            const dateStr = date.toLocaleDateString()
            const isSelected = selectedDate &&
                !!(selectedDate.find(v => v.toLocaleDateString() === dateStr))

            const isToday =
                date.getDate() === new Date().getDate() &&
                date.getMonth() === new Date().getMonth() &&
                date.getFullYear() === new Date().getFullYear();

            cells.push(
                <Flex
                    key={`day-${day}`}
                    width={"24px"}
                    height={"24px"}
                    justify={"center"}
                    align={"center"}
                    className={classNames(
                        "rounded-md",
                        isToday ? "border-1 border-blue-500" : "",
                        isSelected ? "bg-amber-500" : "",
                    )}
                    onClick={() => handleDateClick(date)}
                >
                    <Text size={"1"}>{day}</Text>
                </Flex>
            );
            day++;
        }

        return <Grid columns={"7"}
                     gap={"2"}
                     className={"items-center"}
        >{cells}</Grid>;
    };

    return (
        <ACard>
            <Flex
                direction={"column"}
                gap={"2"}
                className="cursor-pointer"
            >
                {renderHeader()}
                {renderDays()}
                {renderCells()}
            </Flex>
        </ACard>
    );
};

export const Calendar = (props: CalendarProps) => {
    const [allDates, setAllDates] = useState<string[]>([]);

    useEffect(() => {
        const biu = BiuManager.shared()
        setAllDates(biu?.allRecord?.map(a => a.recordTime!) ?? [])

        return biu?.biuDataChangeEvent(v => setAllDates(v.map(a => a.recordTime!)))
    }, []);

    const filterThisMonth = () => {
        // 获取当前日期
        const now = new Date();

        // 获取本月的开始和结束日期
        const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        currentMonthEnd.setHours(23, 59, 59, 999);

        return allDates.map(dt => {
            const curDt = new Date(dt);
            const timestamp = curDt.getTime()
            if (
                timestamp >= currentMonthStart.getTime() && timestamp <= currentMonthEnd.getTime()
            ){
                return curDt
            }
            return false
        }).filter(v => typeof v !== "boolean")
    }

    return <Calendar_ {...props} initSelectData={filterThisMonth()} />
}


