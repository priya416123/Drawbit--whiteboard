import {
  PointerType,
  DrawbitLinearElement,
  NonDeletedDrawbitElement,
  NonDeleted,
  TextAlign,  
  DrawbitElement,
  FontFamily,
  GroupId,
  DrawbitBindableElement
} from "./element/types";
import {SHAPES} from "./shapes"
import {Point as RoughPoint} from "roughjs/bin/geometry"
import {SocketUpdateDataSource} from "./data"
import { LinearElementEditor} from "./element/linearElementEditor"
import { SuggestedBinding } from "./element/binding"
import { ImportedDataState } from "./data/types"
import { DrawbitImperativeAPI } from "./components/App"

export type FlooredNumber = number & { _brand: "FlooredNumber"}
export type Point = Readonly<RoughPoint>

export type Collaborator = {
    pointer?: {
        x: number
        y: number
    }
    button?: "up" | "down"
    selectedElementIds?: AppState["selectedElementIds"]
    username?: string | null
}

export type AppState = {
    isLoading: boolean
    errorMessage: string | null
    draggingElement: NonDeletedDrawbitElement | null
    resizingElement: NonDeletedDrawbitElement | null
    multiElement: NonDeleted<DrawbitLinearElement> | null
    selectionElement: NonDeletedDrawbitElement | null
    isBindingEnabled: boolean
    startBoundElement: NonDeleted<DrawbitBindableElement> | null
    suggestedBindings: SuggestedBinding[]
    //element being edited, but not necessarily added to elements array yet
    // (e.g. text element when typing into the input)
    editingElement: NonDeletedDrawbitElement | null
    editingLinearElement: LinearElementEditor | null
    elementType: typeof SHAPES[number]["value"]
    elementLocked: boolean;
    exportBackground: boolean
    exportEmbedScene: boolean
    shouldAddWatermark: boolean
    currentItemStrokeColor: string
    currentItemBackgroundColor: string
    currentItemFillStyle: string
    currentItemStrokeWidth: number
    currentItemStrokeStyle: DrawbitElement["strokeStyle"]
    currentItemRoughness: number
    currentItemOpacity: number
    currentItemFontFamily: FontFamily
    currentItemFontSize: number
    currentItemTextAlign: TextAlign
    currentItemStrokeSharpness: DrawbitElement["strokeSharpness"]
    currentItemLinearStrokeSharpness: DrawbitElement["strokeSharpness"]
    viewBackgroundColor: string
    scrollX: FlooredNumber
    scrollY: FlooredNumber
    cursorX: number
    cursorY: number
    cursorButton: "up" | "down"
    scrolledOutside: boolean
    name: string
    username: string
    isCollaborating: boolean
    isResizing: boolean
    isRotating: boolean
    zoom: Zoom
    openMenu: "canvas" | "shape" | null
    lastPointerDownWith: PointerType
    selectedElementIds: {[id: string]: boolean}
    previousSelectedElementIds: {[id: string]: boolean}
    collaborators: Map<string,Collaborator>
    shouldCacheIgnoreZoom: boolean
    showShortcutDialog: boolean
    zenModeEnabled: boolean
    appearance: "light" | "dark"
    gridSize: number | null

    /**top-most selected groups(i.e. does not include nested groups) */
    selectedGroupIds: {[groupdId: string]: boolean}
    /**group being edited when you drill down to its constituent element
     * (e.g. when you double click on a group's element)
     */
    editingGroupId: GroupId | null
    width: number
    height: number
    offsetTop: number
    offsetLeft: number
    isLibraryOpen: boolean
    fileHandle: import("browser-nativefs").FileSystemHandle | null
}

export type NormalizedZoomValue = number & {_brand: "normalizedZoom"}

export type Zoom = Readonly<{
    value: NormalizedZoomValue
    translation: Readonly<{
        x: number
        y: number
    }>
}>

export type PointerCoords = Readonly<{
    x: number
    y: number
}>

export type Gesture = {
    pointers: Map<number,PointerCoords>
    lastCenter: { x: number; y: number} | null
    initialDistance: number | null
    initialScale: number | null
}

export declare class GestureEvent extends UIEvent{
    readonly rotation: number
    readonly scale: number
}

export type SocketUpdateData = SocketUpdateDataSource[keyof SocketUpdateDataSource] & {
    _brand: "socketUpdateData"
}

export type LibraryItem = readonly NonDeleted<DrawbitElement>[]
export type LibraryItems= readonly LibraryItem[]

export interface DrawbitProps{
    width: number;
    height: number;
    /**if not supplied, calculated by Drawbit */
    offsetLeft?: number;
    /**if not supplied, calculated by Drawbit */
    offsetTop?: number;
    onChange?: (
        elements: readonly DrawbitElement[],
        appState: AppState
    ) => void;
    initialData?: ImportedDataState;
    user?: {
        name?: string | null;
    };
    onUsernameChange?: (username: string)=> void;
    forwardedRef: ForwardRef<DrawbitImperativeAPI>
}