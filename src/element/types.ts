import { Point } from "../types";
import { FONT_FAMILY } from "../constants"

export type GroupId= string;

type _DrawbitElementBase = Readonly<{
    id: string;
    x: number;
    y: number;
    strokeColor: string;
    backgroundColor: string;
    fillStyle: string;
    strokeWidth: number;
    strokeStyle: "solid" | "dashed" | "dotted";
    strokeSharpness: "round" | "sharp";
    roughness: number;
    opacity: number;
    width: number;
    height: number;
    angle: number;
    seed: number;
    version: number;
    versionNonce: number;
    isDeleted: boolean;
    groupIds: readonly GroupId[];
    boundElementIds: readonly DrawbitLinearElement["id"][] | null;
}>;

export type DrawbitSelectionElement= _DrawbitElementBase & {
    type: "selection"
};

export type DrawbitRectangleElement= _DrawbitElementBase & {
    type: "rectangle"
}

export type DrawbitDiamondElement= _DrawbitElementBase & {
    type: "diamond"
}

export type DrawbitEllipseElement= _DrawbitElementBase & {
    type: "ellipse"
}

/**
 * These are elements that dont have any additional properties
 */
export type DrawbitGenericElement= 
    | DrawbitSelectionElement
    | DrawbitRectangleElement
    | DrawbitDiamondElement
    | DrawbitEllipseElement;

/**
 * DrawbitElement should be JSON serializable and (eventually) contain
 * no computed data. The list of all DrawbitElements should be shareable
 * between peers and contain no state local to the peer */

 export type DrawbitElement = 
    | DrawbitGenericElement
    | DrawbitTextElement
    | DrawbitLinearElement;

export type NonDeleted<TElement extends DrawbitElement> = TElement & {
    isDeleted: false;
}    

export type NonDeletedDrawbitElement= NonDeleted<DrawbitElement>;

export type DrawbitTextElement= _DrawbitElementBase & 
        Readonly<{
            type: "text";
            fontSize: number;
            fontFamily: FontFamily;
            text: string;
            baseline: number;
            textAlign: TextAlign;
            verticalAlign: VerticalAlign;
        }>;

export type DrawbitBindableElement= 
    | DrawbitRectangleElement
    | DrawbitDiamondElement
    | DrawbitEllipseElement
    | DrawbitTextElement;
    
export type PointBinding = {
    elementId: DrawbitBindableElement["id"];
    focus: number;
    gap: number;
};

export type DrawbitLinearElement = _DrawbitElementBase & 
    Readonly<{
        type: "arrow" | "line" | "draw";
        points: readonly Point[];
        lastCommittedPoint: Point | null;
        startBinding: PointBinding | null;
        endBinding: PointBinding | null;
    }>;

export type PointerType= "mouse" | "pen" | "touch";

export type TextAlign = "left" | "center" | "right";
export type VerticalAlign= "top" | "middle";

export type FontFamily = keyof typeof FONT_FAMILY;
export type FontString= string & {_brand: "fontString"};