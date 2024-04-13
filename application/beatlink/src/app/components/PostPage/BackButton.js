import { IconButton } from "../IconButton";
import { useRouter } from "next/navigation"

export default function BackButton({ width, height }) {
    const router = useRouter();

    function handleClick() {
        router.back();
    }

    return (
        <IconButton icon={<BackButtonIcon width={width} height={height} />} onClick={handleClick} />
    )
}

function BackButtonIcon({ width, height }) {
    return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_6_16)">
                <path d="M5 12H19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 5L5 12L12 19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_6_16">
                    <rect width="24" height="24" fill="white" />
                </clipPath>
            </defs>
        </svg>

    )
}