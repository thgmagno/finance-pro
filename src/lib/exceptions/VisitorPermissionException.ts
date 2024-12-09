export class VisitorPermissionException extends Error {
  constructor() {
    super('Usuário visitante não tem permissão para executar esta ação')
    this.name = 'VisitorPermissionError'
  }
}
