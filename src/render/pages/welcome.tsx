import {Flex} from "@radix-ui/themes"
import {RouterLink, RouterPath} from "../router.tsx";
import {ArrowRightIcon} from "@radix-ui/react-icons";
import {AIconButton} from "../components/a-icon-button.tsx";

export const Welcome = () => {

    return <Flex
        justify={"center"}
        align={"center"}
        width={"100%"}
        height={"100%"}
    >
        <AIconButton
            width={"56px"}
            height={"56px"}
        >
            {/*<a href={RouterPath.HOME}> <ArrowRightIcon/> </a>*/}
            <RouterLink
                name={<ArrowRightIcon
                    width={"24px"}
                    height={"24px"}
                    color={"rgb(32, 200, 219)"}
                />}
                path={RouterPath.HOME} />
        </AIconButton>
    </Flex>
}
