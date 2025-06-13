import {Box, Flex} from "@radix-ui/themes"
import {RouterLink, RouterPath} from "../router.tsx";
import {ArrowRightIcon} from "@radix-ui/react-icons";
import {IconButton} from "@yanquer/browser";

export const Welcome = () => {

    return <Flex
        justify={"center"}
        align={"center"}
        width={"100%"}
        height={"100%"}
    >
        <Box
            width={"48px"}
            height={"48px"}
            className={"animate-bounce rounded-full bg-blue-500"}
        >
            <IconButton
                className={"h-full"}
            >
                <Flex justify={"center"} align={"center"} height={"100%"}>
                    {/*<a href={RouterPath.HOME}> <ArrowRightIcon/> </a>*/}
                    <RouterLink name={<ArrowRightIcon color={"white"}/>} path={RouterPath.HOME} />
                </Flex>
            </IconButton>
        </Box>
    </Flex>
}
