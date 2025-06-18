import {GhostIconButton} from "@yanquer/browser";
import {Flex,} from "@radix-ui/themes";
import React, {ReactNode} from "react";


interface IAIconButtonProps {
    width?: string
    height?: string
    className?: string
    children: ReactNode;
    onClick?: (event?: React.MouseEvent<HTMLElement>) => void;
}

export const AIconButton = (props: IAIconButtonProps) => {
    const {width="24px", height="24px",
        children,
        className="rounded-[12px] bg-blue-500",
        onClick,
    } = props;

    return <GhostIconButton
        onClick={() => onClick?.()}
        style={{
            borderRadius: "12px",
            // border: "1px solid",
            padding: "2px",
            overflow: "hidden",
        }}
        color={"blue"}
    >
        <Flex justify={"center"} align={"center"}
              height={height}
              width={width}
              className={className}
        >
            {children}
        </Flex>
    </GhostIconButton>
}