import {Box, Flex, ScrollArea, Text, TextArea} from "@radix-ui/themes";
import {ACard} from "@yanquer/browser";
import {ArrowDownIcon, ArrowUpIcon} from "@radix-ui/react-icons";
import {AIconButton} from "../components/a-icon-button.tsx";
import {Calendar} from "../components/calender.tsx";
import classNames from "classnames";
import {BiuManager} from "../manager/biu-manager.ts";
import {StartStopButton} from "../components/start-stop-button.tsx";
import {StatisticsData} from "../components/statistics-data.tsx";
import {CacheManager} from "../manager/cache-manager.ts";


export const Home = () => {
    return <Box width="100%" height={"100%"}
                className={"pt-0 md:pt-10"}
    >
        <ScrollArea>
            <Flex
                width={"100%"}
                height={"100%"}
                direction={"column"}
                align={"center"}
                gap={"2"}
                p={"2"}
            >
                <ACard>
                    <Flex
                        justify={"center"}
                        align={"center"}
                        gap={"4"}
                        direction={"column"}
                        className={classNames(
                            " rounded-xl",
                            "w-[300px] h-[300px]",
                            "md:w-[400px] md:h-[400px]",
                        )}
                    >
                        <Text color={"blue"} size={"3"}>记录新的手艺活</Text>
                        <Text color={"bronze"} size={"4"}>准备开始</Text>

                        <StartStopButton />

                        <Box maxWidth="300px">
                            <TextArea size="3" placeholder="备注(可选)"
                                      onChange={e => {
                                          const v = e.target.value;
                                          BiuManager.shared()?.setNote(v)
                                      }}
                            />
                        </Box>

                        <Flex gap={"5"}>
                            <AIconButton
                                width={"80px"}
                                height={"36px"}
                                className={"rounded-xl border-1 border-blue-500"}
                                // @ts-ignore
                                onClick={e => CacheManager.shared()?.exportOut()}
                            >
                                <ArrowUpIcon color={"white"} />
                                <Text color={"gray"} size={"2"}>导出数据</Text>
                            </AIconButton>

                            <AIconButton
                                width={"80px"}
                                height={"36px"}
                                className={"rounded-xl border-1 border-blue-500"}
                                // @ts-ignore
                                onClick={e => CacheManager.shared()?.exportIn()}
                            >
                                <ArrowDownIcon color={"white"} />
                                <Text color={"gray"} size={"2"}>导入数据</Text>
                            </AIconButton>
                        </Flex>
                    </Flex>
                </ACard>

                <Flex direction={"column"}
                      justify={"center"}
                      className={classNames(
                          " rounded-xl",
                          "w-[300px]",
                          "md:w-[400px]",
                      )}
                >
                    <Text color={"blue"} size={"3"}>统计数据</Text>

                    <StatisticsData />

                </Flex>

                <ACard>
                    <Flex className={classNames(
                        "w-[300px] h-[300px]",
                        "md:w-[400px] md:h-[400px]",
                    )}
                          justify={"center"}
                          align={"center"}
                          direction={"column"}
                    >
                        <Text color={"gray"} size={"3"}>发射日历</Text>
                        <Box flexGrow={"1"}>
                            <Calendar />
                        </Box>
                    </Flex>
                </ACard>
            </Flex>
        </ScrollArea>
    </Box>
}

