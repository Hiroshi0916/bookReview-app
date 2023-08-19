export interface User {
  id?: string; // ユーザーID (データベース上での一意識別子、必要に応じて)
  name: string; 
  email: string; 
  iconUrl: string; 
  password?: string; 
  token?: string; // 認証トークン (JWTなど)
}