import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { User } from '../../domain/entities/User';
import { GoogleAuthService } from '../../application/services/GoogleAuthService';
import { JwtTokenService } from '../../application/services/JwtTokenService';

export class LoginWithGoogleUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly googleAuthService: GoogleAuthService,
    private readonly jwtTokenService: JwtTokenService
  ) { }

  async execute(idToken: string): Promise<{ token: string }> {

    // DEBUG: Verificando se o método verify existe
    console.log('[DEBUG] Tipo de googleAuthService:', typeof this.googleAuthService);
    console.log('[DEBUG] Métodos disponíveis:', Object.getOwnPropertyNames(Object.getPrototypeOf(this.googleAuthService)));


    const payload = await this.googleAuthService.verify(idToken);

    const { sub, name, email, picture } = payload;

    if (!email || !sub) {
      throw new Error('Google account missing essential data');
    }

    let user = await this.userRepository.findByProviderId(sub, 'google');

    if (!user) {
      user = await this.userRepository.create({
        name: name || 'Unknown',
        email,
        provider: 'google',
        providerId: sub,
        avatarUrl: picture,
      });
    } else {
      // Atualiza dados que possam ter mudado na conta Google
      user.name = name || user.name;
      user.avatarUrl = picture || user.avatarUrl;
      user.email = email || user.email;
      user = await this.userRepository.update(user);
    }

    const token = this.jwtTokenService.generateToken(user);

    return { token };
  }
}
