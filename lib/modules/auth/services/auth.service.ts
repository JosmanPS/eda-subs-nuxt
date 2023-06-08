import { User } from "../../users/entities/user.entity";
import { JWTToken, RefreshToken } from "../entities/tokens.entity";
import { IAuthStorage } from "./auth-storage.service";

type TokenType = "access-token" | "refresh-token";

export interface IAuthService {
  isAuthenticated(): boolean;
  getToken(tokenType: TokenType): JWTToken | RefreshToken;
  setToken(tokenType: TokenType, token: JWTToken | RefreshToken): void;
  removeToken(tokenType: TokenType): void;
  getCurrentUser(): User | undefined;
  setCurrentUser(user: User): void;
  removeCurrentUser(): void;
}

export class AuthService implements IAuthService {
  public static accessTokenName = "access-token";
  public static refreshTokenName = "refresh-token";

  public accessToken: JWTToken;
  public refreshToken: RefreshToken;

  private authStorage: IAuthStorage;

  constructor(authStorage: IAuthStorage) {
    this.authStorage = authStorage;
    this.accessToken = this.getToken("access-token");
    this.refreshToken = this.getToken("refresh-token");
  }

  private getTokenName(tokenType: TokenType): string {
    return tokenType === "access-token"
      ? AuthService.accessTokenName
      : AuthService.refreshTokenName;
  }

  public getToken(tokenType: TokenType): JWTToken | RefreshToken {
    const tokenName: string = this.getTokenName(tokenType);

    const token = this.authStorage.getItem(tokenName);
    // const token = stringToken ? JSON.parse(stringToken) : null;
    return token ? token.token : null;
  }

  public setToken(tokenType: TokenType, token: JWTToken | RefreshToken): void {
    const d = new Date();
    d.setTime(d.getTime() + 30 * 60 * 1000); // set cookie to last 30 mins

    const tokenName: string = this.getTokenName(tokenType);

    this.authStorage.setItem(
      tokenName,
      JSON.stringify({
        token,
        expires: d,
      })
    );
  }

  public setCurrentUser(user: User): void {
    const d = new Date();
    d.setTime(d.getTime() + 30 * 60 * 1000); // set cookie to last 30 mins

    this.authStorage.setItem(
      "currentUser",
      JSON.stringify({ user, expires: d })
    );
  }

  public getCurrentUser(): User | undefined {
    const data = this.authStorage.getItem("currentUser");
    if (!data) {
      return undefined;
    }
    const user = JSON.parse(data).user;
    return user;
  }

  public removeCurrentUser(): void {
    this.authStorage.removeItem("currentUser");
  }

  public removeToken(tokenType: TokenType): void {
    const tokenName: string = this.getTokenName(tokenType);
    this.authStorage.removeItem(tokenName);
  }

  isAuthenticated(): boolean {
    return this.getToken("access-token") !== null;
  }
}
