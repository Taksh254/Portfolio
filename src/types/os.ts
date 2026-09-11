export type WindowId = "work" | "lab" | "notes" | "about" | "contact";

export interface WindowState {
  id: WindowId;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position?: { x: number; y: number };
}

export type CursorMode = "default" | "open" | "inspect" | "read" | "transmit" | "pointer" | "drag";
