export default class UserSession {
  private static readonly CURRENT_USER_NAME_KEY = "currentUserName";
  private static readonly CURRENT_USER_ID_KEY = "currentUserId";

  public static getCurrentUserName(): string {
    return localStorage.getItem(UserSession.CURRENT_USER_NAME_KEY) || "";
  }

  public static setCurrentUserName(userName: string): void {
    localStorage.setItem(UserSession.CURRENT_USER_NAME_KEY, userName);
  }

  public static getCurrentUserId(): string {
    return localStorage.getItem(UserSession.CURRENT_USER_ID_KEY) || "";
  }

  public static setCurrentUserId(userId: string): void {
    localStorage.setItem(UserSession.CURRENT_USER_ID_KEY, userId);
  }
}
