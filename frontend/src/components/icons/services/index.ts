import type {ComponentType, SVGProps} from "react";
import {PlaneIcon} from "@/components/icons/services/PlaneIcon.tsx";
import {WalkingIcon} from "@/components/icons/services/WalkingIcon.tsx";
import {BikeIcon} from "@/components/icons/services/BikeIcon.tsx";
import {CarIcon} from "@/components/icons/services/CarIcon.tsx";
import {BoatIcon} from "@/components/icons/services/BoatIcon.tsx";

type ServiceIcon = ComponentType<SVGProps<SVGSVGElement> & { filled?: boolean }>

export const SERVICE_ICONS: Record<string, ServiceIcon> = {
    plane: PlaneIcon,
    hiking: WalkingIcon,
    bike: BikeIcon,
    car: CarIcon,
    boat: BoatIcon,
}
