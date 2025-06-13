import {Box, Flex, Grid, ScrollArea, Text, TextArea} from "@radix-ui/themes";
import {ACard} from "@yanquer/browser";
import {MiniCard} from "../components/mini-card.tsx";
import {ArrowDownIcon, ArrowUpIcon, ChevronRightIcon} from "@radix-ui/react-icons";
import {AIconButton} from "../components/a-icon-button.tsx";
import Calendar from "../components/calender.tsx";

export const Home = () => {
    return <Box width="100%" height={"100%"}>
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
                        gap={"2"}
                        direction={"column"} width={"400px"} height={"400px"}
                        className={" rounded-xl"}
                    >
                        <Text color={"blue"} size={"3"}>记录新的手艺活</Text>
                        <Text color={"bronze"} size={"4"}>准备开始</Text>

                        <AIconButton
                            width={"72px"}
                            height={"48px"}
                        >
                            <ChevronRightIcon color={"white"} />
                            <Text color={"gray"} size={"4"}>开始</Text>
                        </AIconButton>

                        <Box maxWidth="300px">
                            <TextArea size="3" placeholder="备注(可选)" />
                        </Box>

                        <Flex gap={"2"}>
                            <AIconButton
                                width={"80px"}
                                height={"36px"}
                                className={"rounded-xl border-1 border-blue-500"}
                            >
                                <ArrowUpIcon color={"white"} />
                                <Text color={"gray"} size={"2"}>导出数据</Text>
                            </AIconButton>

                            <AIconButton
                                width={"80px"}
                                height={"36px"}
                                className={"rounded-xl border-1 border-blue-500"}
                            >
                                <ArrowDownIcon color={"white"} />
                                <Text color={"gray"} size={"2"}>导入数据</Text>
                            </AIconButton>
                        </Flex>
                    </Flex>
                </ACard>

                <Flex direction={"column"}
                      justify={"center"}
                      width={"400px"}
                      // height={"400px"}
                >
                    <Text color={"blue"} size={"3"}>统计数据</Text>

                    <Grid columns={"2"} gap={"2"}>
                        <MiniCard name={"总次数"} description={"1"} />
                        <MiniCard name={"平均持续时间"} description={"1分钟"} />
                        <MiniCard name={"本周次数"} description={"1"} />
                        <MiniCard name={"本月次数"} description={"1"} />
                    </Grid>

                </Flex>

                <ACard>
                    <Flex width={"400px"} height={"400px"}
                          // justify={"center"}
                          // align={"center"}
                          direction={"column"}
                    >
                        <Text color={"gray"} size={"3"}>发射日历</Text>
                        <Box flexGrow={"1"}>
                            <Flex
                                height={"100%"}
                                justify={"center"} align={"center"}>
                                <Calendar />
                            </Flex>
                        </Box>
                    </Flex>
                </ACard>
            </Flex>
        </ScrollArea>
    </Box>
}

