import {Flex, Text} from "@radix-ui/themes";
import {ACard} from "@yanquer/browser";
import {ReactNode} from "react";

interface IMiniCardProps {
    name: string;
    description: ReactNode;
}
export const MiniCard = (props: IMiniCardProps) => {
    const {name, description} = props;

    return <ACard>
        <Flex direction={"column"}>
            <Text color={"gray"} size={"2"}>{name}</Text>
            <Text color={"blue"} size={"4"}>{description}</Text>
        </Flex>
    </ACard>
}


