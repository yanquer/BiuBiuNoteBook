import {Box, Flex, Text} from "@radix-ui/themes";
import {memo, ReactNode, useCallback, useEffect, useMemo, useState} from "react";
import classNames from "classnames";
import {InfoCircledIcon} from "@radix-ui/react-icons";
import {Logger} from "@yanquer/common";
import {CloseCard} from "@yanquer/browser";
import {IMessageContent} from "../manager/models.ts";
import {MessageManager} from "../manager/message-manager.ts";


const CircleIconButton = (props: {hasBorder: boolean, children: ReactNode}) => {
    const {children, hasBorder=true} = props;

    return <Box width={"20px"} height={"20px"}
                className={classNames("rounded-full border-1 ",
                    hasBorder ? "border-amber-200" : "border-transparent",
                    "p-[2px]")}
    >
        <Flex align={"center"} justify={"center"}>
            {children}
        </Flex>
    </Box>
}

interface ITipOneProps {
    tip?: IMessageContent
    tipIdx: number,
    top: number,
    clearOne?: (idx?: number) => void,
}
const TipOne = (props: ITipOneProps) => {

    const {tip, top=0, clearOne, tipIdx} = props;

    const levelIcon: ReactNode = useMemo(
        () => {
            let _icon = undefined
            switch (tip?.level) {
                case "error":
                    _icon = <InfoCircledIcon color={"red"} />
                    break
                case "warning":
                    _icon = <InfoCircledIcon color={"gray"} />
                    break
                case "info":
                default:
                    // _icon = <SewingPinIcon color={"gold"} />
                    _icon = <InfoCircledIcon color={"gold"} />
            }
            // return _icon
            return <CircleIconButton hasBorder={false}>
                {_icon}
            </CircleIconButton>
        },
        [tip?.level]
    )

    return tip ?
        <Flex className={classNames(
            "w-full h-full mt-[14vh] absolute ",
        )}
              align={"start"}
              justify={"center"}
              style={{
                  paddingTop: top,
                  transition: "padding 0.1s ease",
              }}
        >

            <CloseCard
                closeHandler={() => clearOne?.(tipIdx)}
                autoCloseTime={5000}
                lineHeight={"3px"}
            >
                <Flex gap={"2"}
                      height={"50px"}
                      width={"280px"}
                      align={"center"}
                      justify={"between"}
                      direction={"row"}
                >
                    <Box>
                        {levelIcon}
                    </Box>

                    {/* body */}
                    <Box
                        flexGrow={"1"}
                        className={""}
                        minWidth={"0"}
                    >
                        <Box className={tip?.level === "error" ? "text-red-400" : ""}>
                            <Text size={"1"}>{tip?.content}</Text>
                        </Box>
                    </Box>

                </Flex>
            </CloseCard>

        </Flex>
        :
        undefined
}

export const GlobalTips = memo(
    () => {
        const [showTips, setShowTips] = useState<IMessageContent[]|undefined>(undefined)

        useEffect(() => {
            const clear_ = MessageManager.shared()?.didOpenTipEvent(v => {
                setShowTips(v)
            })

            return () => {
                clear_?.()
            }
        }, []);

        const clearCall = useCallback(
            (valIdx?: number) => {
                MessageManager.shared()?.closeOneTipByTime(valIdx)
            },
            []
        )

        Logger.debug(`GlobalTips render len: ${showTips?.length}`)
        return (showTips && showTips.length > 0) ?
            <Box
                className={classNames(
                    // 允许后面的点击行为
                    "pointer-events-none",
                    "w-full h-full p-5 overflow-hidden rounded-xl",
                )}
                position={"absolute"} top={"0"}>
                {
                    showTips?.map((v, id) =>
                        <TipOne
                            tipIdx={v.timeId ?? id}
                            key={v.timeId ?? id} tip={v} clearOne={clearCall} top={id * 65} />
                    )
                }
            </Box>
            : undefined
    }
)

