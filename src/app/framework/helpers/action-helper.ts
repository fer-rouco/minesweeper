import { ActionType, BaseAction, Label, Icon, FunctionAction, LinkAction, Action } from '../generic/generic-interface';
export class ActionHelper {

  private static buildBaseAction(id: string, type: ActionType = ActionType.BUTTON): BaseAction {
    return { id, type };
  }

  private static buildLabel(label: string): Label {
    return { label } as Label;
  }

  private static buildIcon(icon: string): Icon {
    return { icon } as Icon;
  }

  private static buildLabelOrIcon(action: { label?: string, icon?: string }): Label | Icon {
    let labelOrIcon: Label | Icon = ActionHelper.buildLabel('');

    if (action.label) {
      labelOrIcon = ActionHelper.buildLabel(action.label);
    }
    if (action.icon) {
      labelOrIcon = ActionHelper.buildIcon(action.icon);
    }

    return labelOrIcon;
  }

  public static buildFuctionAction(action: { id: string, type?: ActionType, fn: () => void, label?: string, icon?: string }): FunctionAction {
    return {
      ...ActionHelper.buildBaseAction(action.id, action.type),
      ...ActionHelper.buildLabelOrIcon(action),
      function: action.fn
    }
  }

  public static buildLinkAction(action: { id: string, type?: ActionType, to: string, label?: string, icon?: string }): LinkAction {
    return {
      ...ActionHelper.buildBaseAction(action.id, action.type),
      ...ActionHelper.buildLabelOrIcon(action),
      to: action.to
    }
  }

  public static buildBoardAction(): Action {
    return ActionHelper.buildLinkAction({ id: 'board', icon: 'bomb.png', to: '/board' });
  }

  public static buildFinishedGameListAction(action: { label?: string, icon?: string, type?: ActionType }): Action {
    return ActionHelper.buildLinkAction({ id: 'finished-games-list', icon: action.icon, label: action.label, type: action.type, to: '/finished-games-list' });
  }
  
  public static buildFinishedGameListIconAction(): Action {
    return ActionHelper.buildFinishedGameListAction({ icon: 'list.svg' });
  }
  
  public static buildSetupAction(): Action {
    return ActionHelper.buildLinkAction({ id: 'setup', icon: 'settings.svg', to: '/setup' });
  }

  public static buildBoardActions(): Action[] {
    return [
      ActionHelper.buildFinishedGameListIconAction(), 
      ActionHelper.buildSetupAction()
    ];
  }

  public static buildFinishedGameListActions(): Action[] {
    return [
      ActionHelper.buildBoardAction(), 
      ActionHelper.buildSetupAction()
    ];
  }
  
}