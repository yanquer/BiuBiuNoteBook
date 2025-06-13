
import {FC, useState} from 'react';
import {Flex, Grid} from "@radix-ui/themes";
import {AIconButton} from "./a-icon-button.tsx";
import {ChevronLeftIcon, ChevronRightIcon} from "@radix-ui/react-icons";
import classNames from "classnames";
import {ACard} from "@yanquer/browser";


interface CalendarProps {
    initialDate?: Date;
    onDateSelect?: (date: Date) => void;
}

const Calendar: FC<CalendarProps> = ({ initialDate = new Date(), onDateSelect }) => {
    const [currentDate, setCurrentDate] = useState<Date>(initialDate);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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

        setSelectedDate(date);
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
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
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
                        {day}
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
            const isSelected = selectedDate &&
                date.getDate() === selectedDate.getDate() &&
                date.getMonth() === selectedDate.getMonth() &&
                date.getFullYear() === selectedDate.getFullYear();

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
                        isSelected ? "bg-blue-600" : "",
                        isToday ? "bg-blue-500" : "",
                    )}
                    onClick={() => handleDateClick(date)}
                >
                    {day}
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

export default Calendar;


