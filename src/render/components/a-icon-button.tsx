import {IconButton} from "@yanquer/browser";
import {Box, Flex,} from "@radix-ui/themes";
import {ReactNode} from "react";

interface IAIconButtonProps {
    width?: string
    height?: string
    className?: string
    children: ReactNode;
}

export const AIconButton = (props: IAIconButtonProps) => {
    const {width="24px", height="24px",
        children,
        className="rounded-full bg-blue-500",
    } = props;

    return <Box
        width={width}
        height={height}
        className={className}
    >
        <IconButton
            className={"h-full w-full"}
        >
            <Flex justify={"center"} align={"center"} height={"100%"} width={"100%"}>
                {children}
            </Flex>
        </IconButton>
    </Box>
}