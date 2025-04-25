import { Button } from "@mui/material";
import Image from "next/image";

export default function EditButton(){
    return (
        <Button>
            <Image
                src={"/img/edit.png"}
                alt="logo"
                width={25}
                height={25}
            />
        </Button>
    )
}