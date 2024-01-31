export enum ActionType {
  BUTTON = 0,
  LINK = 1
}

export type Label = {
  label: string;
};

export type Icon = {
  icon: string;
};

export type Function = (Label | Icon) & { function: () => void };

export type Link = (Label | Icon) & { to: string };

export type BaseAction = { id: string, type?: number };

export type Action = (Function | Link) & BaseAction;

export type FunctionAction = Function & BaseAction;

export type LinkAction = Link & BaseAction;